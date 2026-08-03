'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import CubeOrbitCamera from './CubeOrbitCamera';

/**
 * Minimal R3F lab: white cube + lights.
 * Optional scroll-driven camera orbit (see CubeOrbitCamera).
 */
export default function CubeLab({
  scrollProgressRef,
  lightIntensity = 1.2,
  ambientIntensity = 0.45,
  autoRotate = false,
  orbitRadius = 600,
  orbitTurns = 1,
  orbitElevation = 80,
}) {
  const meshRef = useRef();

  useFrame((_, delta) => {
    if (!autoRotate || !meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.35;
    meshRef.current.rotation.y += delta * 0.55;
  });

  return (
    <>
      <CubeOrbitCamera
        scrollProgressRef={scrollProgressRef}
        radius={orbitRadius}
        orbitTurns={orbitTurns}
        elevation={orbitElevation}
      />
      <ambientLight intensity={ambientIntensity} />
      <directionalLight
        position={[220, 320, 400]}
        intensity={lightIntensity}
        castShadow={false}
      />
      <mesh ref={meshRef}>
        <boxGeometry args={[180, 180, 180]} />
        <meshStandardMaterial color="#ffffff" roughness={0.35} metalness={0.05} />
      </mesh>
    </>
  );
}
