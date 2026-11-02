'use client';

import { useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import styles from './ShaderStage.module.scss';

const CAMERA_Z = 600;

/** One world unit per CSS pixel of the stage — the scale the plane components are written in. */
function PixelCamera() {
  const get = useThree((state) => state.get);
  const height = useThree((state) => state.size.height);

  useEffect(() => {
    const { camera } = get();
    camera.position.set(0, 0, CAMERA_Z);
    camera.fov = 2 * Math.atan(height / 2 / CAMERA_Z) * (180 / Math.PI);
    camera.updateProjectionMatrix();
  }, [get, height]);

  return null;
}

/**
 * A square WebGL stage with its own canvas.
 *
 * With `src`, an image fills the stage and is handed to `children` as the
 * element a tracked plane should cover (the plane hides it once its texture
 * is up). Without `src`, `children` draws straight into the canvas.
 *
 * @param {string} name
 * @param {string} description
 * @param {string} meta - where the code lives, shown in mono
 * @param {string} src
 * @param {string} revealSrc - second image, for effects that swap between two
 * @param {boolean} pixelCamera - false when the children bring their own camera
 * @param {string} clearColor - opaque background; omit for a transparent canvas
 * @param {React.ReactNode} overlay - DOM controls drawn over the stage
 * @param {(element: HTMLImageElement | null) => React.ReactNode} children
 */
export default function ShaderStage({
  name,
  description,
  meta,
  src,
  revealSrc,
  pixelCamera = true,
  clearColor,
  overlay,
  children,
}) {
  const [element, setElement] = useState(null);
  const ready = !src || element;

  return (
    <figure className={styles.tile}>
      <div className={styles.stage}>
        {src && (
          // eslint-disable-next-line @next/next/no-img-element -- the plane reads this node's src and rect
          <img
            ref={setElement}
            className={styles.media}
            src={src}
            data-reveal-src={revealSrc}
            alt=""
          />
        )}

        <div className={styles.canvasLayer}>
          <Canvas
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: !clearColor }}
            camera={{ near: 10, far: 2000, position: [0, 0, CAMERA_Z] }}
            onCreated={({ gl }) => {
              if (clearColor) gl.setClearColor(clearColor, 1);
            }}
          >
            {pixelCamera && <PixelCamera />}
            {ready && children(element)}
          </Canvas>
        </div>

        {overlay && <div className={styles.overlay}>{overlay}</div>}
      </div>

      <figcaption className={styles.caption}>
        <span className={styles.name}>{name}</span>
        <span className={styles.description}>{description}</span>
        {meta && <span className={styles.meta}>{meta}</span>}
      </figcaption>
    </figure>
  );
}
