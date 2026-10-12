'use client';

import { useEffect, useState } from 'react';
import CloudRevealPlane from '@/canvas/components/cloud-reveal-plane';

/** Collects `[data-canvas][data-reveal-src]` images and gives each a plane. */
export default function CloudRevealLab({
  root,
  radius = 0.35,
  edgeSoftness = 0.12,
  cloudScale = 4.5,
  turbulence = 0.18,
  cloudSpeed = 0.6,
  detail = 0.6,
  edgeGlow = 0.15,
  drag = 0.55,
  trailTaper = 1.2,
  followSpeed = 0.12,
  ripple = 0.5,
  rippleScale = 38,
  rippleSpeed = 3,
  idleFade = true,
  idleDelay = 0.35,
  idleFadeTime = 2.5,
}) {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    if (!root) {
      setElements([]);
      return undefined;
    }

    const collect = () => {
      setElements(
        Array.from(root.querySelectorAll('[data-canvas][data-reveal-src]'))
      );
    };

    collect();
    const observer = new MutationObserver(collect);
    observer.observe(root, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [root]);

  return (
    <>
      {elements.map((element, index) => (
        <CloudRevealPlane
          key={element.currentSrc || element.src || index}
          element={element}
          radius={radius}
          edgeSoftness={edgeSoftness}
          cloudScale={cloudScale}
          turbulence={turbulence}
          cloudSpeed={cloudSpeed}
          detail={detail}
          edgeGlow={edgeGlow}
          drag={drag}
          trailTaper={trailTaper}
          followSpeed={followSpeed}
          ripple={ripple}
          rippleScale={rippleScale}
          rippleSpeed={rippleSpeed}
          idleFade={idleFade}
          idleDelay={idleDelay}
          idleFadeTime={idleFadeTime}
        />
      ))}
    </>
  );
}
