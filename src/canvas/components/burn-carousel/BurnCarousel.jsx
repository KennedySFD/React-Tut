'use client';

import { useEffect, useRef, useState } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import * as THREE from 'three';
import PaperBurnMaterial from '@/canvas/shaders/paper-burn';
import { evaluateBezier } from './bezierEase';

extend({ PaperBurnMaterial });

/** Local public assets — avoids Unsplash 404s breaking Promise.all. */
const SLIDE_URLS = [
  '/shader-lab/slide-1.jpg',
  '/shader-lab/slide-2.jpg',
  '/shader-lab/slide-3.jpg',
];

function loadTexture(url) {
  return new Promise((resolve, reject) => {
    const loader = new THREE.TextureLoader();
    loader.load(
      url,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.needsUpdate = true;
        resolve(tex);
      },
      undefined,
      () => reject(new Error(`Failed to load texture: ${url}`))
    );
  });
}

/**
 * Full-viewport paper-burn carousel.
 * Listens on `document` for `[data-carousel]` / `[data-carousel-to]`.
 */
export default function BurnCarousel({
  burnSpeed = 1,
  noiseScale = 4.5,
  noiseStrength = 0.55,
  edgeWidth = 0.06,
  edgeSharpness = 4,
  ember = 0,
  easeCurve = null,
}) {
  const meshRef = useRef();
  // Refs so useFrame always sees the latest Leva values (no stale closures).
  const burnSpeedRef = useRef(burnSpeed);
  const easeCurveRef = useRef(easeCurve);
  const noiseScaleRef = useRef(noiseScale);
  const noiseStrengthRef = useRef(noiseStrength);
  const edgeWidthRef = useRef(edgeWidth);
  const edgeSharpnessRef = useRef(edgeSharpness);
  const emberRef = useRef(ember);

  burnSpeedRef.current = burnSpeed;
  easeCurveRef.current = easeCurve;
  noiseScaleRef.current = noiseScale;
  noiseStrengthRef.current = noiseStrength;
  edgeWidthRef.current = edgeWidth;
  edgeSharpnessRef.current = edgeSharpness;
  emberRef.current = ember;

  const [textures, setTextures] = useState(null);
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1,
    height: typeof window !== 'undefined' ? window.innerHeight : 1,
  });

  const indexRef = useRef(0);
  const fromRef = useRef(0);
  const toRef = useRef(0);
  const progressRef = useRef(1);
  const activeRef = useRef(false);
  const queuedRef = useRef(null);
  const elapsedRef = useRef(0);

  useEffect(() => {
    let cancelled = false;
    const loaded = [];

    Promise.all(SLIDE_URLS.map(loadTexture))
      .then((texs) => {
        if (cancelled) {
          texs.forEach((t) => t.dispose());
          return;
        }
        loaded.push(...texs);
        setTextures(texs);
      })
      .catch((err) => {
        console.error(
          '[BurnCarousel] texture load failed',
          err?.message || err
        );
        if (!cancelled) setTextures(null);
      });

    return () => {
      cancelled = true;
      loaded.forEach((t) => t.dispose());
    };
  }, []);

  useEffect(() => {
    const onResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!textures) return undefined;

    const syncDots = (current) => {
      document.querySelectorAll('[data-carousel-to]').forEach((btn) => {
        const i = Number(btn.getAttribute('data-carousel-to'));
        btn.setAttribute('aria-current', i === current ? 'true' : 'false');
      });
    };

    const begin = (target) => {
      const count = textures.length;
      const next = ((target % count) + count) % count;
      if (activeRef.current) {
        queuedRef.current = next;
        return;
      }
      if (next === indexRef.current && progressRef.current >= 1) return;

      fromRef.current = indexRef.current;
      toRef.current = next;
      progressRef.current = 0;
      activeRef.current = true;
      syncDots(next);
    };

    const onClick = (event) => {
      const btn = event.target.closest(
        '[data-carousel], [data-carousel-to]'
      );
      if (!btn) return;

      if (btn.hasAttribute('data-carousel-to')) {
        begin(Number(btn.getAttribute('data-carousel-to')));
        return;
      }

      const action = btn.getAttribute('data-carousel');
      if (action === 'next') begin(indexRef.current + 1);
      if (action === 'prev') begin(indexRef.current - 1);
    };

    document.addEventListener('click', onClick);
    syncDots(indexRef.current);

    return () => document.removeEventListener('click', onClick);
  }, [textures]);

  useFrame((_, delta) => {
    elapsedRef.current += delta;

    if (activeRef.current) {
      const speed = Math.max(Number(burnSpeedRef.current) || 1, 0.05);
      progressRef.current = Math.min(1, progressRef.current + delta * speed * 0.55);

      if (progressRef.current >= 1) {
        indexRef.current = toRef.current;
        fromRef.current = toRef.current;
        activeRef.current = false;

        if (
          queuedRef.current !== null &&
          queuedRef.current !== indexRef.current
        ) {
          const next = queuedRef.current;
          queuedRef.current = null;
          fromRef.current = indexRef.current;
          toRef.current = next;
          progressRef.current = 0;
          activeRef.current = true;
        } else {
          queuedRef.current = null;
          progressRef.current = 1;
        }
      }
    }

    // Shared transition state for uniforms.
    const mesh = meshRef.current;
    if (!mesh || !textures) return;

    const mat = mesh.material;
    const u = mat?.uniforms;
    if (!u) return;

    const from = textures[fromRef.current];
    const to = textures[toRef.current];
    if (u.uTextureA) u.uTextureA.value = from;
    if (u.uTextureB) u.uTextureB.value = to;
    if (u.uProgress) {
      if (!activeRef.current) {
        u.uProgress.value = 1;
      } else {
        u.uProgress.value = evaluateBezier(
          easeCurveRef.current,
          progressRef.current
        );
      }
    }
    if (u.uTime) u.uTime.value = elapsedRef.current;
    if (u.uNoiseScale) u.uNoiseScale.value = noiseScaleRef.current;
    if (u.uNoiseStrength) u.uNoiseStrength.value = noiseStrengthRef.current;
    if (u.uEdgeWidth) u.uEdgeWidth.value = edgeWidthRef.current;
    if (u.uEdgeSharpness) u.uEdgeSharpness.value = edgeSharpnessRef.current;
    if (u.uEmber) u.uEmber.value = emberRef.current;
  });

  if (!textures) return null;

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[size.width, size.height, 1, 1]} />
      <paperBurnMaterial
        uTextureA={textures[0]}
        uTextureB={textures[0]}
        uProgress={1}
        uTime={0}
        uNoiseScale={noiseScale}
        uNoiseStrength={noiseStrength}
        uEdgeWidth={edgeWidth}
        uEdgeSharpness={edgeSharpness}
        uEmber={ember}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}
