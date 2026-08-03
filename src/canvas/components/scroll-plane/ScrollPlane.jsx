'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree, extend } from '@react-three/fiber';
import * as THREE from 'three';
import CylinderScrollMaterial from '@/canvas/shaders/cylinder-scroll/CylinderScrollMaterial';

extend({ CylinderScrollMaterial });

// The vertex shader anchors the plane's edges at z = 0 and bulges the centre
// forward, so the silhouette already matches the viewport exactly and no
// oversizing is needed to avoid gaps.
const OVERSCAN = 1.0;

export default function ScrollPlane({
  texture,
  scrollProgressRef,
  contentRatio,
  curvature,
  curveStart,
  scrollSpeed,
  shading,
  anisotropy = false,
  mipmaps = false,
  srgb = false,
}) {
  const meshRef = useRef();
  const gl = useThree((state) => state.gl);
  const [size, setSize] = useState(null);

  useEffect(() => {
    const read = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });

    read();
    window.addEventListener('resize', read);
    return () => window.removeEventListener('resize', read);
  }, []);

  // Filtering has to be configured in here rather than where the texture is
  // built: the capture happens outside the <Canvas>, so no renderer exists yet
  // and the anisotropy ceiling is unknown.
  useEffect(() => {
    if (!texture) return;

    texture.anisotropy = anisotropy ? gl.capabilities.getMaxAnisotropy() : 1;
    texture.generateMipmaps = mipmaps;
    texture.minFilter = mipmaps
      ? THREE.LinearMipmapLinearFilter
      : THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;

    // generateMipmaps and colorSpace are baked in at upload time, so the
    // existing GPU copy has to be thrown away for a change to take effect.
    texture.dispose();
    texture.needsUpdate = true;

    if (process.env.NODE_ENV === 'development') {
      window.__scrollTextureInfo = {
        anisotropy: texture.anisotropy,
        maxAnisotropy: gl.capabilities.getMaxAnisotropy(),
        maxTextureSize: gl.capabilities.maxTextureSize,
        mipmaps: texture.generateMipmaps,
        colorSpace: texture.colorSpace,
        webgl2: gl.getContext() instanceof WebGL2RenderingContext,
      };
      console.info('[ScrollPlane] texture', window.__scrollTextureInfo);
    }
  }, [texture, gl, anisotropy, mipmaps, srgb]);

  useFrame(() => {
    const mat = meshRef.current?.material;
    if (!mat) return;

    const progress = scrollProgressRef.current * scrollSpeed;

    // Write through uniforms defensively: a hot reload can leave a material
    // instance in the scene that predates a newly added uniform.
    const u = mat.uniforms;
    const set = (name, value) => {
      if (u?.[name]) u[name].value = value;
    };

    set('uScrollProgress', Math.min(1, Math.max(0, progress)));
    set('uCurvature', curvature);
    set('uCurveStart', curveStart);
    set('uContentRatio', contentRatio);
    set('uOverscan', OVERSCAN);
    set('uShading', shading);
    set('uOutputEncode', srgb ? 1 : 0);

    if (process.env.NODE_ENV === 'development') {
      window.__scrollMat = mat;
    }
  });

  if (!size) return null;

  return (
    <mesh ref={meshRef}>
      <planeGeometry
        args={[size.width, size.height * OVERSCAN, 1, 200]}
      />
      <cylinderScrollMaterial
        uTexture={texture}
        uScrollProgress={0}
        uContentRatio={contentRatio}
        uOverscan={OVERSCAN}
        uCurvature={curvature}
        uCurveStart={curveStart}
        uShading={shading}
        uOutputEncode={srgb ? 1 : 0}
        side={THREE.FrontSide}
      />
    </mesh>
  );
}
