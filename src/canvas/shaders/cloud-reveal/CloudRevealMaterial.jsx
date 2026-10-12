'use client';

import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import vertexShader from './vertex.glsl';
import fragmentShader from './fragment.glsl';

/** Cursor-path samples fed to the mask. Must match `#define TRAIL` in fragment.glsl. */
export const TRAIL_LENGTH = 16;

/** Concurrent pebble ripples. Must match `#define DROPS` in fragment.glsl. */
export const DROP_COUNT = 6;

const CloudRevealMaterial = shaderMaterial(
  {
    uTextureA: new THREE.Texture(),
    uTextureB: new THREE.Texture(),
    uTrail: Array.from({ length: TRAIL_LENGTH }, () => new THREE.Vector2(0.5, 0.5)),
    // xy = impact point, z = age (s), w = strength; w 0 means an empty slot.
    uDrops: Array.from({ length: DROP_COUNT }, () => new THREE.Vector4(0, 0, 0, 0)),
    uHover: 0,
    uTime: 0,
    uPlaneAspect: 1,
    uAspectA: 1,
    uAspectB: 1,
    uRadius: 0.35,
    uEdgeSoftness: 0.12,
    uCloudScale: 4.5,
    uTurbulence: 0.18,
    uCloudSpeed: 0.6,
    uDetail: 0.6,
    uEdgeGlow: 0.15,
    uTrailReach: 0.5,
    uTrailTaper: 1.2,
    uRipple: 0.5,
    uRippleScale: 38,
    uRippleSpeed: 3,
  },
  vertexShader,
  fragmentShader
);

export default CloudRevealMaterial;
