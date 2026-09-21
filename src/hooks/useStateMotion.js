'use client';

import { useEffect, useRef } from 'react';
import gsap, { prefersReducedMotion } from '@/lib/gsap';
import { gesture } from '@/theme/motion';

/**
 * Animates a small element between two states on a boolean.
 *
 * The library's popping check marks and radio dots are the same gesture with
 * different properties — routing them through one hook is what stops each
 * from drifting onto its own timing.
 *
 * Call sites pass `on`/`off` as object literals, which are a fresh reference
 * every render and so cannot be used as effect dependencies directly. They
 * are serialised instead: the dependency then changes only when the *values*
 * change, without writing to a ref during render.
 *
 * @param {boolean} active
 * @param {object} on   - GSAP vars for the active state
 * @param {object} off  - GSAP vars for the rest state
 * @param {'hover'|'press'|'release'|'travel'|'reveal'} motion - which gesture to use
 */
export function useStateMotion(active, { on, off, motion = 'travel' } = {}) {
  const ref = useRef(null);

  const onVars = JSON.stringify(on ?? null);
  const offVars = JSON.stringify(off ?? null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const vars = JSON.parse(active ? onVars : offVars);
    if (!vars) return;

    if (prefersReducedMotion()) {
      gsap.set(el, vars);
      return;
    }

    const preset = gesture[motion] ?? gesture.travel;
    gsap.to(el, { ...vars, duration: preset.duration, ease: preset.ease });
  }, [active, onVars, offVars, motion]);

  return ref;
}

export default useStateMotion;
