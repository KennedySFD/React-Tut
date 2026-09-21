'use client';

import dynamic from 'next/dynamic';
import ShaderTest, {
  ShaderTestMediaPlanes,
  ShaderTestCylinderImages,
  ShaderTestCylinderHorizontal,
  ShaderTestMosaic,
  ShaderTestBurnCarousel,
  ShaderTestCube,
} from '@/components/features/shader-test';

const ShaderScrollScene = dynamic(
  () => import('@/canvas/scenes/shader-scroll'),
  { ssr: false }
);

/**
 * Shader lab — Leva → architecture:
 * - Cylinder scroll (full page)
 * - Cylinder on images
 * - Cylinder horizontal (images)
 * - Media planes (hover)
 * - Mosaic bulge (hover)
 * - Burn carousel
 * - Cube lab
 */
export default function ShaderTestPage() {
  return (
    <ShaderScrollScene
      captureScale="device"
      anisotropy
      mipmaps
      qualityControls
      cylinderContent={<ShaderTest />}
      cylinderImagesContent={<ShaderTestCylinderImages />}
      cylinderHorizontalContent={<ShaderTestCylinderHorizontal />}
      mediaPlanesContent={<ShaderTestMediaPlanes />}
      mosaicContent={<ShaderTestMosaic />}
      burnCarouselContent={<ShaderTestBurnCarousel />}
      cubeContent={<ShaderTestCube />}
    />
  );
}
