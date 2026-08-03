'use client';

import { useEffect, useRef, useState } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import * as THREE from 'three';
import CylinderImageMaterial from '@/canvas/shaders/cylinder-image';

extend({ CylinderImageMaterial });

/**
 * Tracks a DOM `[data-canvas]` image and bends only that photo (Architecture A
 * + cylinder vertex). Text around the image stays real HTML.
 *
 * Unit plane + XY scale: uCurvature is in world/pixel units (z is not scaled).
 */
export default function CylinderImagePlane({
  element,
  curvature = 55,
  curveStart = 0.15,
  shading = 0.55,
}) {
  const meshRef = useRef();
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
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
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

    return () => {
      element.style.opacity = previousOpacity;
      element.style.transition = previousTransition;
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

    const mat = mesh.material;
    const u = mat?.uniforms;
    if (!u) return;

    const set = (name, value) => {
      if (u[name]) u[name].value = value;
    };

    set('uCurvature', curvature);
    set('uCurveStart', curveStart);
    set('uShading', shading);
    if (u.uTexture && texture) u.uTexture.value = texture;
  });

  if (!texture) return null;

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1, 1, 1, 48]} />
      <cylinderImageMaterial
        uTexture={texture}
        uCurvature={curvature}
        uCurveStart={curveStart}
        uShading={shading}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}
