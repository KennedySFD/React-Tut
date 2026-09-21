'use client';

import { useEffect, useRef } from 'react';
import gsap, { prefersReducedMotion } from '@/lib/gsap';
import { gesture } from '@/theme/motion';

/**
 * The focus keyline for form controls.
 *
 * When a field takes focus, a 1px chromatic line draws outward from the
 * centre of its lower edge; on blur it retracts, faster and on the committed
 * curve. Input, Textarea, Select and SearchBar all use it, so focusing any
 * field in a form produces the same gesture.
 *
 * Pair with the `focusKeyline` mixin, which provides the line this drives.
 *
 * @param {boolean} focused
 */
export function useFieldMotion(focused) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const vars = {
      '--keyline-scale': focused ? 1 : 0,
      '--keyline-opacity': focused ? 1 : 0,
    };

    if (prefersReducedMotion()) {
      gsap.set(el, vars);
      return;
    }

    // Draws out on the travelling curve, retracts on the committed one
    gsap.to(el, {
      ...vars,
      duration: focused ? gesture.travel.duration : gesture.press.duration,
      ease: focused ? gesture.travel.ease : gesture.press.ease,
    });
  }, [focused]);

  return ref;
}

export default useFieldMotion;
