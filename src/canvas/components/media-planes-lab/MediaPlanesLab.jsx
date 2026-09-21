'use client';

import { useEffect, useState } from 'react';
import MediaPlane from '@/canvas/components/media-plane';

/**
 * Finds `[data-canvas]` media nodes under `root` and mounts a tracking plane
 * for each. Architecture A lab layer — DOM owns layout/text, WebGL owns FX.
 */
export default function MediaPlanesLab({
  root,
  warpStrength = 1,
  hoverBrighten = 0,
  dispersion = 0,
  followSpeed = 0.1,
}) {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    if (!root) {
      setElements([]);
      return undefined;
    }

    const collect = () => {
      const nodes = Array.from(root.querySelectorAll('[data-canvas]'));
      setElements(nodes);
    };

    collect();

    const observer = new MutationObserver(collect);
    observer.observe(root, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [root]);

  return (
    <>
      {elements.map((element, index) => (
        <MediaPlane
          key={element.currentSrc || element.src || index}
          element={element}
          warpStrength={warpStrength}
          hoverBrighten={hoverBrighten}
          dispersion={dispersion}
          followSpeed={followSpeed}
        />
      ))}
    </>
  );
}
