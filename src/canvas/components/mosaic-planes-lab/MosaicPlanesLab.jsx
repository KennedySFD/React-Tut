'use client';

import { useEffect, useState } from 'react';
import MosaicPlane from '@/canvas/components/mosaic-plane';

export default function MosaicPlanesLab({
  root,
  warpStrength = 1,
  hoverBrighten = 0,
  followSpeed = 0.1,
  pixelCount = 28,
  mosaicRadius = 0.35,
  cubeDepth = 36,
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
        <MosaicPlane
          key={element.currentSrc || element.src || index}
          element={element}
          warpStrength={warpStrength}
          hoverBrighten={hoverBrighten}
          followSpeed={followSpeed}
          pixelCount={pixelCount}
          mosaicRadius={mosaicRadius}
          cubeDepth={cubeDepth}
        />
      ))}
    </>
  );
}
