'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import emberVertexShader from '@/canvas/shaders/burn-embers/vertex.glsl';
import emberFragmentShader from '@/canvas/shaders/burn-embers/fragment.glsl';
import {
  burnFront,
  expectedFrontV,
  findFrontV,
  frontBandHalf,
  hash,
} from '@/canvas/shaders/paper-burn/burnMap';

/** Dense ribbon that *is* the ember edge (re-seeded every frame). */
const EDGE_COUNT = 560;
/** Extra rising sparks born from the edge. */
const SPARK_COUNT = 320;
const MAX_PARTICLES = EDGE_COUNT + SPARK_COUNT;
/** How many staggered layers thicken the ribbon. */
const EDGE_LAYERS = 3;

/**
 * Particle ember edge — ribbon locked to the burn iso-contour,
 * plus optional rising sparks.
 */
export default function BurnEmbers({
  stateRef,
  enabled = true,
  spawnRate = 140,
  emberSize = 2.2,
  emberLift = 1.2,
  noiseScale = 4.5,
  noiseStrength = 0.55,
  edgeWidth = 0.06,
}) {
  const pointsRef = useRef();
  const materialRef = useRef();
  const { gl } = useThree();
  const spawnAccRef = useRef(0);

  const { geometry, pools } = useMemo(() => {
    const positions = new Float32Array(MAX_PARTICLES * 3);
    const ages = new Float32Array(MAX_PARTICLES);
    const lives = new Float32Array(MAX_PARTICLES);
    const sizes = new Float32Array(MAX_PARTICLES);
    const heats = new Float32Array(MAX_PARTICLES);

    for (let i = 0; i < MAX_PARTICLES; i += 1) {
      positions[i * 3 + 2] = -9999;
      lives[i] = 0;
      ages[i] = 1;
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('aAge', new THREE.BufferAttribute(ages, 1));
    geom.setAttribute('aLife', new THREE.BufferAttribute(lives, 1));
    geom.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geom.setAttribute('aHeat', new THREE.BufferAttribute(heats, 1));
    geom.setDrawRange(0, MAX_PARTICLES);

    return {
      geometry: geom,
      pools: { positions, ages, lives, sizes, heats },
    };
  }, []);

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  useEffect(() => {
    if (materialRef.current?.uniforms?.uPixelRatio) {
      materialRef.current.uniforms.uPixelRatio.value = gl.getPixelRatio();
    }
  }, [gl]);

  useFrame((_, delta) => {
    if (!enabled || !pointsRef.current || !stateRef?.current) return;

    const { active, progress, elapsed, width, height } = stateRef.current;
    const w = Math.max(width, 1);
    const h = Math.max(height, 1);
    const dt = Math.min(delta, 0.05);

    const { positions, ages, lives, sizes, heats } = pools;
    const posAttr = geometry.getAttribute('position');
    const ageAttr = geometry.getAttribute('aAge');
    const lifeAttr = geometry.getAttribute('aLife');
    const sizeAttr = geometry.getAttribute('aSize');
    const heatAttr = geometry.getAttribute('aHeat');

    const markDirty = () => {
      posAttr.needsUpdate = true;
      ageAttr.needsUpdate = true;
      lifeAttr.needsUpdate = true;
      sizeAttr.needsUpdate = true;
      heatAttr.needsUpdate = true;
    };

    const killSlot = (i) => {
      const i3 = i * 3;
      positions[i3] = 0;
      positions[i3 + 1] = 0;
      positions[i3 + 2] = -9999;
      ages[i] = 1;
      lives[i] = 0;
      sizes[i] = 0;
      heats[i] = 0;
    };

    const killAll = () => {
      for (let i = 0; i < MAX_PARTICLES; i += 1) killSlot(i);
      spawnAccRef.current = 0;
    };

    // Burn finished / idle — wipe + hide so nothing additive lingers.
    if (!active || progress >= 0.96) {
      killAll();
      markDirty();
      pointsRef.current.visible = false;
      if (materialRef.current?.uniforms?.uMaxSize) {
        materialRef.current.uniforms.uMaxSize.value = emberSize;
      }
      return;
    }

    pointsRef.current.visible = true;

    const front = burnFront(progress);
    const band = Math.max(edgeWidth, 0.02);
    // Main advancing front band — ignore stray noise islands outside this.
    const vCenter = expectedFrontV(progress, noiseStrength);
    const vBand = frontBandHalf(noiseStrength, edgeWidth);
    // Fade the ribbon out before the hard cutoff so the top doesn't flash a line.
    const edgeFade = 1 - smoothstep(0.82, 0.95, progress);

    // --- Edge ribbon: re-place every frame along the noise contour ---
    const perLayer = Math.floor(EDGE_COUNT / EDGE_LAYERS);

    for (let layer = 0; layer < EDGE_LAYERS; layer += 1) {
      const layerBias =
        (layer / Math.max(EDGE_LAYERS - 1, 1) - 0.5) * band * 1.6;
      const target = front + layerBias;
      const layerCenter = clamp01(vCenter + layerBias * 0.35);

      // Contour left the UV domain — skip this layer (avoids a stuck top line).
      if (target < -0.02 || target > 1.05) {
        for (let i = 0; i < perLayer; i += 1) {
          killSlot(layer * perLayer + i);
        }
        continue;
      }

      for (let i = 0; i < perLayer; i += 1) {
        const slot = layer * perLayer + i;
        const u =
          (i + 0.5) / perLayer +
          (hash(i * 0.37 + layer, elapsed * 0.2) - 0.5) * (0.9 / perLayer);

        const v = findFrontV(
          clamp01(u),
          target,
          elapsed,
          noiseScale,
          noiseStrength,
          layerCenter,
          vBand
        );

        if (v < 0 || edgeFade < 0.02) {
          killSlot(slot);
          continue;
        }

        const i3 = slot * 3;
        const jx = (hash(u * 11.3, layer + 1) - 0.5) * 3;
        const jy = (hash(v * 8.9, layer + 2) - 0.5) * 3;
        positions[i3] = (clamp01(u) - 0.5) * w + jx;
        positions[i3 + 1] = (v - 0.5) * h + jy;
        positions[i3 + 2] = 5 + layer * 1.5 + hash(slot, 3.1) * 4;

        // Keep edge particles "alive" and bright (shader fades by age/life).
        ages[slot] = 0.04 + hash(slot, elapsed) * 0.08;
        lives[slot] = 1;
        const core = layer === 1 ? 1.35 : 0.95;
        sizes[slot] = (core + hash(slot, 4.2) * 0.55) * edgeFade;
        heats[slot] = 0.7 + hash(slot, 5.5) * 0.3;
      }
    }

    for (let i = perLayer * EDGE_LAYERS; i < EDGE_COUNT; i += 1) {
      killSlot(i);
    }

    // --- Rising sparks (secondary) ---
    for (let i = EDGE_COUNT; i < MAX_PARTICLES; i += 1) {
      if (lives[i] <= 0) continue;

      ages[i] += dt;
      if (ages[i] >= lives[i]) {
        killSlot(i);
        continue;
      }

      const t = ages[i] / lives[i];
      const i3 = i * 3;
      positions[i3] += (hash(i, 1.7) - 0.5) * 22 * dt * emberLift;
      positions[i3 + 1] += (45 + heats[i] * 60) * dt * emberLift;
      positions[i3 + 2] += 8 * dt;
      sizes[i] = (0.9 + heats[i] * 1.1) * (1.0 - t * 0.45) * edgeFade;
    }

    // Stop birthing sparks as the front exits; prevents end-of-burn trails.
    if (progress < 0.88) {
      spawnAccRef.current += spawnRate * dt;
      let toSpawn = Math.floor(spawnAccRef.current);
      spawnAccRef.current -= toSpawn;
      toSpawn = Math.min(toSpawn, 28);

      for (let n = 0; n < toSpawn; n += 1) {
        let slot = -1;
        for (let i = EDGE_COUNT; i < MAX_PARTICLES; i += 1) {
          if (lives[i] <= 0) {
            slot = i;
            break;
          }
        }
        if (slot < 0) break;

        const edgeSlot = Math.floor(Math.random() * (EDGE_COUNT - 1));
        if (lives[edgeSlot] <= 0) continue;

        const e3 = edgeSlot * 3;
        const i3 = slot * 3;
        positions[i3] = positions[e3] + (Math.random() - 0.5) * 6;
        positions[i3 + 1] = positions[e3 + 1] + (Math.random() - 0.5) * 4;
        positions[i3 + 2] = positions[e3 + 2] + Math.random() * 4;

        ages[slot] = 0;
        lives[slot] = 0.35 + Math.random() * 0.45;
        sizes[slot] = 0.8 + Math.random() * 1.2;
        heats[slot] = 0.5 + Math.random() * 0.5;
      }
    } else {
      spawnAccRef.current = 0;
    }

    markDirty();

    if (materialRef.current?.uniforms?.uMaxSize) {
      materialRef.current.uniforms.uMaxSize.value = emberSize;
    }
  });

  if (!enabled) return null;

  return (
    <points ref={pointsRef} frustumCulled={false} geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={emberVertexShader}
        fragmentShader={emberFragmentShader}
        transparent
        depthWrite={false}
        depthTest
        blending={THREE.AdditiveBlending}
        toneMapped={false}
        uniforms={{
          uPixelRatio: { value: gl.getPixelRatio() },
          uMaxSize: { value: emberSize },
        }}
      />
    </points>
  );
}

function clamp01(x) {
  return Math.min(1, Math.max(0, x));
}

function smoothstep(edge0, edge1, x) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}
