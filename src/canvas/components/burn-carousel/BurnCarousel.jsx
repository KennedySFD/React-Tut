'use client';

import { useEffect, useRef, useState } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import * as THREE from 'three';
import PaperBurnMaterial from '@/canvas/shaders/paper-burn';
import BurnEmbers from './BurnEmbers';

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
 * Full-viewport paper-burn carousel + optional ember particles.
 * Listens on `document` for `[data-carousel]` / `[data-carousel-to]`.
 */
export default function BurnCarousel({
  burnSpeed = 1,
  noiseScale = 4.5,
  noiseStrength = 0.55,
  edgeWidth = 0.06,
  ember = 0,
  embersEnabled = true,
  emberSpawnRate = 140,
  emberSize = 2.2,
  emberLift = 1.2,
}) {
  const meshRef = useRef();
  const stateRef = useRef({
    active: false,
    progress: 1,
    elapsed: 0,
    width: 1,
    height: 1,
  });

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
    stateRef.current.width = size.width;
    stateRef.current.height = size.height;
  }, [size]);

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
      progressRef.current = Math.min(
        1,
        progressRef.current + delta * Math.max(burnSpeed, 0.05) * 0.55
      );

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

    // Shared with ember system (must stay in sync every frame).
    stateRef.current.active = activeRef.current;
    stateRef.current.progress = progressRef.current;
    stateRef.current.elapsed = elapsedRef.current;
    stateRef.current.width = size.width;
    stateRef.current.height = size.height;

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
      u.uProgress.value = activeRef.current ? progressRef.current : 1;
    }
    if (u.uTime) u.uTime.value = elapsedRef.current;
    if (u.uNoiseScale) u.uNoiseScale.value = noiseScale;
    if (u.uNoiseStrength) u.uNoiseStrength.value = noiseStrength;
    if (u.uEdgeWidth) u.uEdgeWidth.value = edgeWidth;
    if (u.uEmber) u.uEmber.value = ember;
  });

  if (!textures) return null;

  return (
    <group>
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
          uEmber={ember}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <BurnEmbers
        stateRef={stateRef}
        enabled={embersEnabled}
        spawnRate={emberSpawnRate}
        emberSize={emberSize}
        emberLift={emberLift}
        noiseScale={noiseScale}
        noiseStrength={noiseStrength}
        edgeWidth={edgeWidth}
      />
    </group>
  );
}
