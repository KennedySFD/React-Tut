'use client';

import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import vertexShader from './vertex.glsl';
import fragmentShader from './fragment.glsl';

const MosaicBulgeMaterial = shaderMaterial(
  {
    uTexture: new THREE.Texture(),
    uHover: 0,
    uHoverBrighten: 0,
    uWarpStrength: 1,
    uPixelCount: 64,
    uMosaicRadius: 0.35,
    uCubeDepth: 36,
    uMouse: new THREE.Vector2(0.5, 0.5),
  },
  vertexShader,
  fragmentShader
);

export default MosaicBulgeMaterial;
