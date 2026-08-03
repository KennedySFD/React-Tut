'use client';

import { useEffect, useRef, useState } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import * as THREE from 'three';
import MediaWarpMaterial from '@/canvas/shaders/media-warp';

extend({ MediaWarpMaterial });

/**
 * One textured plane locked to a DOM media element's getBoundingClientRect().
 * Geometry is 1×1; scale is set in pixel units to match the matched-FOV camera.
 */
export default function MediaPlane({
  element,
  warpStrength = 1,
  hoverBrighten = 0,
  dispersion = 0,
  followSpeed = 0.1,
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

    // Hide the DOM bitmap so only the WebGL plane shows; keep layout space.
    const previousOpacity = element.style.opacity;
    const previousTransition = element.style.transition;
    element.style.opacity = '0';
    element.style.transition = 'none';

    // Hit-test against the element's rect on the window. Listening on the img
    // itself fails when a full-viewport WebGL canvas sits above it — even if
    // the canvas is meant to be pointer-events: none.
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

    // Tracking lag: ease the shader mouse toward the real cursor.
    const speed = THREE.MathUtils.clamp(followSpeed, 0.01, 1);
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
    set('uDispersion', dispersion);
    set('uWarpStrength', warpStrength);
    if (u.uMouse) u.uMouse.value.copy(mouseSmoothRef.current);
    if (u.uTexture && texture) u.uTexture.value = texture;

    if (process.env.NODE_ENV === 'development') {
      element.dataset.hover = hoverRef.current.toFixed(2);
    }
  });

  if (!texture) return null;

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <mediaWarpMaterial
        uTexture={texture}
        uHover={0}
        uHoverBrighten={hoverBrighten}
        uDispersion={dispersion}
        uWarpStrength={warpStrength}
        uMouse={new THREE.Vector2(0.5, 0.5)}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}
