'use client';

import { useEffect, useRef, useState } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import * as THREE from 'three';
import MosaicBulgeMaterial from '@/canvas/shaders/mosaic-bulge';

extend({ MosaicBulgeMaterial });

/** Dense grid so vertex extrusion can keep up with high pixelCount. */
const GRID = 160;

/**
 * Full-bleed / tracked image plane: hover bulge + pixel mosaic extruding
 * toward the camera. No RGB dispersion.
 */
export default function MosaicPlane({
  element,
  warpStrength = 1,
  hoverBrighten = 0,
  followSpeed = 0.1,
  pixelCount = 28,
  mosaicRadius = 0.35,
  cubeDepth = 36,
}) {
  const meshRef = useRef();
  const hoverRef = useRef(0);
  const hoverTargetRef = useRef(0);
  const mouseTargetRef = useRef(new THREE.Vector2(0.5, 0.5));
  const mouseSmoothRef = useRef(new THREE.Vector2(0.5, 0.5));
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    if (!element) return undefined;

    const src = element.currentSrc || element.src;
    if (!src) return undefined;

    let cancelled = false;
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = 'anonymous';

    loader.load(
      src,
      (tex) => {
        if (cancelled) {
          tex.dispose();
          return;
        }
        tex.colorSpace = THREE.SRGBColorSpace;
        // Nearest filtering keeps mosaic blocks crisp after UV quantise.
        tex.minFilter = THREE.NearestFilter;
        tex.magFilter = THREE.NearestFilter;
        tex.generateMipmaps = false;
        setTexture(tex);
      },
      undefined,
      () => {
        if (!cancelled) setTexture(null);
      }
    );

    return () => {
      cancelled = true;
    };
  }, [element]);

  useEffect(() => {
    return () => {
      texture?.dispose();
    };
  }, [texture]);

  useEffect(() => {
    if (!element) return undefined;

    const previousOpacity = element.style.opacity;
    const previousTransition = element.style.transition;
    element.style.opacity = '0';
    element.style.transition = 'none';

    const onPointerMove = (event) => {
      const rect = element.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) {
        hoverTargetRef.current = 0;
        return;
      }

      const x = event.clientX;
      const y = event.clientY;
      const inside =
        x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;

      hoverTargetRef.current = inside ? 1 : 0;

      if (inside) {
        mouseTargetRef.current.set(
          (x - rect.left) / rect.width,
          1 - (y - rect.top) / rect.height
        );
      }
    };

    const onPointerLeaveWindow = () => {
      hoverTargetRef.current = 0;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('blur', onPointerLeaveWindow);

    return () => {
      element.style.opacity = previousOpacity;
      element.style.transition = previousTransition;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('blur', onPointerLeaveWindow);
    };
  }, [element]);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh || !element) return;

    const rect = element.getBoundingClientRect();
    const width = Math.max(rect.width, 1);
    const height = Math.max(rect.height, 1);

    mesh.position.x = rect.left + width / 2 - window.innerWidth / 2;
    mesh.position.y = -(rect.top + height / 2 - window.innerHeight / 2);
    mesh.position.z = 0;
    mesh.scale.set(width, height, 1);

    hoverRef.current += (hoverTargetRef.current - hoverRef.current) * 0.12;

    const speed = THREE.MathUtils.clamp(followSpeed, 0.005, 1);
    mouseSmoothRef.current.x +=
      (mouseTargetRef.current.x - mouseSmoothRef.current.x) * speed;
    mouseSmoothRef.current.y +=
      (mouseTargetRef.current.y - mouseSmoothRef.current.y) * speed;

    const mat = mesh.material;
    const u = mat?.uniforms;
    if (!u) return;

    const set = (name, value) => {
      if (u[name]) u[name].value = value;
    };

    set('uHover', hoverRef.current);
    set('uHoverBrighten', hoverBrighten);
    set('uWarpStrength', warpStrength);
    set('uPixelCount', pixelCount);
    set('uMosaicRadius', mosaicRadius);
    set('uCubeDepth', cubeDepth);
    if (u.uMouse) u.uMouse.value.copy(mouseSmoothRef.current);
    if (u.uTexture && texture) u.uTexture.value = texture;
  });

  if (!texture) return null;

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1, 1, GRID, GRID]} />
      <mosaicBulgeMaterial
        uTexture={texture}
        uHover={0}
        uHoverBrighten={hoverBrighten}
        uWarpStrength={warpStrength}
        uPixelCount={pixelCount}
        uMosaicRadius={mosaicRadius}
        uCubeDepth={cubeDepth}
        uMouse={new THREE.Vector2(0.5, 0.5)}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}
