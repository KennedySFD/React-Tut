'use client';

import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Button } from '@/components/ui';
import BurnCarousel from '@/canvas/components/burn-carousel';
import CloudRevealPlane from '@/canvas/components/cloud-reveal-plane';
import CubeLab from '@/canvas/components/cube-lab';
import CylinderImagePlane from '@/canvas/components/cylinder-image-plane';
import MediaPlane from '@/canvas/components/media-plane';
import MosaicPlane from '@/canvas/components/mosaic-plane';
import ScrollPlane from '@/canvas/components/scroll-plane';
import ShaderStage from './ShaderStage';
import styles from './ShaderStage.module.scss';

/** Square crops of the lab slides — most of these shaders stretch the texture to the plane. */
const SQUARES = [
  '/shader-lab/square-1.jpg',
  '/shader-lab/square-2.jpg',
  '/shader-lab/square-3.jpg',
];

const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });

/**
 * The full-page cylinder normally runs on a capture of the whole page. Here
 * the squares are stacked into one tall texture and scrolled on a loop.
 */
function ScrollDrum() {
  const [texture, setTexture] = useState(null);
  const progressRef = useRef(0);

  useEffect(() => {
    let cancelled = false;
    let built = null;

    Promise.all(SQUARES.map(loadImage))
      .then((images) => {
        if (cancelled) return;
        const size = images[0].naturalWidth;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size * images.length;
        const context = canvas.getContext('2d');
        images.forEach((image, index) => context.drawImage(image, 0, index * size, size, size));
        built = new THREE.CanvasTexture(canvas);
        setTexture(built);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      built?.dispose();
    };
  }, []);

  useFrame(({ clock }) => {
    progressRef.current = 0.5 - 0.5 * Math.cos(clock.elapsedTime * 0.5);
  });

  if (!texture) return null;

  return (
    <ScrollPlane
      texture={texture}
      scrollProgressRef={progressRef}
      contentRatio={SQUARES.length}
      curvature={60}
      curveStart={0.15}
      scrollSpeed={1}
      shading={0.85}
      srgb
    />
  );
}

export default function ShaderGallery() {
  return (
    <div className={styles.grid}>
      <ShaderStage
        name="Cloud reveal"
        description="Move across the image: a drifting cloud mask swaps in a second photo along your path, with ripples where you pass."
        meta="shaders/cloud-reveal"
        src={SQUARES[0]}
        revealSrc={SQUARES[1]}
      >
        {(element) => <CloudRevealPlane element={element} radius={0.3} />}
      </ShaderStage>

      <ShaderStage
        name="Media warp"
        description="Hover: the image bulges toward the cursor and splits into RGB fringes."
        meta="shaders/media-warp"
        src={SQUARES[1]}
      >
        {(element) => <MediaPlane element={element} dispersion={0.8} />}
      </ShaderStage>

      <ShaderStage
        name="Mosaic bulge"
        description="Hover: pixels under the cursor quantise into blocks that extrude toward the camera."
        meta="shaders/mosaic-bulge"
        src={SQUARES[2]}
      >
        {(element) => <MosaicPlane element={element} pixelCount={40} />}
      </ShaderStage>

      <ShaderStage
        name="Paper burn"
        description="A noise-driven burn line eats one slide to reveal the next, with a glowing edge."
        meta="shaders/paper-burn"
        overlay={
          <>
            <Button size="sm" variant="secondary" data-carousel="prev">
              Previous
            </Button>
            <Button size="sm" variant="secondary" data-carousel="next">
              Next
            </Button>
          </>
        }
      >
        {() => <BurnCarousel slides={SQUARES} />}
      </ShaderStage>

      <ShaderStage
        name="Cylinder image"
        description="A single photo bent around a vertical drum, shaded as it curves away."
        meta="shaders/cylinder-image"
        src={SQUARES[0]}
      >
        {(element) => <CylinderImagePlane element={element} curvature={45} />}
      </ShaderStage>

      <ShaderStage
        name="Cylinder image, horizontal"
        description="The same drum on the other axis, for sideways scrolling rows."
        meta="shaders/cylinder-image · horizontal"
        src={SQUARES[2]}
      >
        {(element) => <CylinderImagePlane element={element} curvature={50} horizontal />}
      </ShaderStage>

      <ShaderStage
        name="Cylinder scroll"
        description="Content scrolls over a drum, as the full-page version does with a capture of the page."
        meta="shaders/cylinder-scroll"
      >
        {() => <ScrollDrum />}
      </ShaderStage>

      <ShaderStage
        name="Cube"
        description="The baseline scene: a lit standard-material cube, no custom shader."
        meta="canvas/components/cube-lab"
        pixelCamera={false}
        clearColor="#1a1a1a"
      >
        {() => <CubeLab autoRotate />}
      </ShaderStage>
    </div>
  );
}
