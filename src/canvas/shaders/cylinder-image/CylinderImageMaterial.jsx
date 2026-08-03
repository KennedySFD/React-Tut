'use client';

import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import vertexShader from './vertex.glsl';
import fragmentShader from './fragment.glsl';

const CylinderImageMaterial = shaderMaterial(
  {
    uTexture: new THREE.Texture(),
    uCurvature: 55,
    uCurveStart: 0.15,
    uShading: 0.55,
  },
  vertexShader,
  fragmentShader
);

export default CylinderImageMaterial;
