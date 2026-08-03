'use client';

import { useEffect, useState } from 'react';
import CylinderImagePlane from '@/canvas/components/cylinder-image-plane';

/** Mounts a bent plane for every `[data-canvas]` image under `root`. */
export default function CylinderImagesLab({
  root,
  curvature = 55,
  curveStart = 0.15,
  shading = 0.55,
}) {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    if (!root) {
      setElements([]);
      return undefined;
    }

    const collect = () => {
      setElements(Array.from(root.querySelectorAll('[data-canvas]')));
    };

    collect();
    const observer = new MutationObserver(collect);
    observer.observe(root, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [root]);

  return (
    <>
      {elements.map((element, index) => (
        <CylinderImagePlane
          key={element.currentSrc || element.src || index}
          element={element}
          curvature={curvature}
          curveStart={curveStart}
          shading={shading}
        />
      ))}
    </>
  );
}
