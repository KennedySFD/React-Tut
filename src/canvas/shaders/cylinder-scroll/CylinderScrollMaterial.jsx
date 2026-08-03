'use client';

import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import vertexShader from './vertex.glsl';
import fragmentShader from './fragment.glsl';

const CylinderScrollMaterial = shaderMaterial(
  {
    uTexture: new THREE.Texture(),
    uScrollProgress: 0,
    uContentRatio: 1,
    uOverscan: 1.35,
    uCurvature: 260.0,
    uCurveStart: 0.15,
    uShading: 0.85,
    uOutputEncode: 0,
  },
  vertexShader,
  fragmentShader
);

export default CylinderScrollMaterial;
