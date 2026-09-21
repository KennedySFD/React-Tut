'use client';

import { useEffect, useRef } from 'react';
import gsap, { prefersReducedMotion } from '@/lib/gsap';
import { gesture, travel } from '@/theme/motion';

/**
 * The entrance for anything that appears over the page — dropdown menus,
 * modal dialogs, tooltips.
 *
 * All three rise, scale up very slightly and fade in on the same `glass`
 * curve; only the distance differs, taken from `travel` in the motion tokens.
 * That is why a tooltip and a modal feel like the same system despite being
 * wildly different in size.
 *
 * Replaces the per-component CSS `@keyframes` these used to each declare
 * separately.
 *
 * @param {'menu'|'modal'|'tooltip'|number} distance - travel distance, or a raw px value
 * @param {boolean} active - run the entrance
 */
export function useRevealMotion({ distance = 'menu', active = true, scale = 0.98 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !active) return undefined;

    const y = typeof distance === 'number' ? distance : (travel[distance] ?? travel.menu);

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, y: 0, scale: 1 });
      return undefined;
    }

    const tween = gsap.fromTo(
      el,
      { opacity: 0, y, scale },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: gesture.reveal.duration,
        ease: gesture.reveal.ease,
      },
    );

    return () => tween.kill();
  }, [active, distance, scale]);

  return ref;
}

export default useRevealMotion;
