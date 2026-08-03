'use client';

import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import vertexShader from './vertex.glsl';
import fragmentShader from './fragment.glsl';

const PaperBurnMaterial = shaderMaterial(
  {
    uTextureA: new THREE.Texture(),
    uTextureB: new THREE.Texture(),
    uProgress: 0,
    uTime: 0,
    uNoiseScale: 4.5,
    uNoiseStrength: 0.55,
    uEdgeWidth: 0.06,
    uEdgeSharpness: 4,
    uEmber: 0,
  },
  vertexShader,
  fragmentShader
);

export default PaperBurnMaterial;
