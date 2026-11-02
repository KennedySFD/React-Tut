'use client';

import { useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

/**
 * Perspective camera locked to orbit-zone scroll progress (0→1 = full turns).
 * Anticlockwise from above while scrubbing; freezes at the end angle once the
 * page scrolls past the orbit spacer into normal document content.
 */
export default function CubeOrbitCamera({
  scrollProgressRef,
  radius = 600,
  orbitTurns = 1,
  elevation = 80,
}) {
  const get = useThree((state) => state.get);
  const height = useThree((state) => state.size.height);

  useEffect(() => {
    const { camera } = get();
    camera.fov = 2 * Math.atan(height / 2 / radius) * (180 / Math.PI);
    camera.updateProjectionMatrix();
  }, [get, radius, height]);

  useFrame(({ camera }) => {
    const progress = scrollProgressRef?.current ?? 0;
    // Anticlockwise when viewed from +Y: angle increases with scroll-down.
    const angle = progress * orbitTurns * Math.PI * 2;

    camera.position.x = Math.sin(angle) * radius;
    camera.position.y = elevation;
    camera.position.z = Math.cos(angle) * radius;
    camera.lookAt(0, 0, 0);
  });

  return null;
}
