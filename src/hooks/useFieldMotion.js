'use client';

import { useCallback, useEffect, useRef } from 'react';
import gsap, { prefersReducedMotion } from '@/lib/gsap';
import { amplitude, gesture } from '@/theme/motion';

/**
 * The motion every form control shares: Input, Textarea, Select and SearchBar.
 *
 * Two gestures, both reading the same tokens the rest of the library uses:
 *
 *   - HOVER. The chromatic keyline fades in while its gradient rotates once —
 *     the same ring a Button or a Card carries, at the `field` amplitude. The
 *     field itself never lifts or scales: it is somewhere you place a cursor,
 *     not a surface you strike.
 *   - FOCUS. A 1px chromatic line draws outward from the centre of the lower
 *     edge, and retracts on blur, faster and on the committed curve.
 *
 * The keyline stays lit for as long as the field is focused, whether or not
 * the pointer is still over it — so tabbing through a form and mousing through
 * one arrive at the same picture.
 *
 * Pair with the `fieldGlass` and `focusKeyline` mixins, which provide the two
 * layers this drives. Spread `handlers` onto the same element the ref is on.
 *
 * @param {boolean} focused
 * @param {{disabled?: boolean}} options - a disabled field stays dark
 * @returns {{ref, handlers}}
 */
export function useFieldMotion(focused, { disabled = false } = {}) {
  const ref = useRef(null);
  const hovered = useRef(false);
  const focusedRef = useRef(focused);
  const disabledRef = useRef(disabled);

  const amp = amplitude.field;

  /**
   * One writer for `--ring-opacity`, reading both inputs. Hover and focus
   * arrive from different places — a pointer event and a React render — and
   * without a single resolver, leaving a focused field with the mouse would
   * darken a keyline that should still be lit.
   */
  const applyRing = useCallback(
    (gestureToken) => {
      const el = ref.current;
      if (!el) return;

      const lit = !disabledRef.current && (focusedRef.current || hovered.current);
      const vars = { '--ring-opacity': lit ? amp.ring : 0 };

      if (prefersReducedMotion()) {
        gsap.set(el, vars);
        return;
      }

      gsap.to(el, { ...vars, duration: gestureToken.duration, ease: gestureToken.ease });
    },
    [amp],
  );

  // Turning disabled mid-interaction must put the keyline out
  useEffect(() => {
    disabledRef.current = disabled;
    applyRing(gesture.press);
  }, [disabled, applyRing]);

  // The focus keyline, plus the ring's share of the focus state
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    focusedRef.current = focused;

    const vars = {
      '--keyline-scale': focused ? 1 : 0,
      '--keyline-opacity': focused ? 1 : 0,
    };

    if (prefersReducedMotion()) {
      gsap.set(el, vars);
      applyRing(gesture.hover);
      return;
    }

    // Draws out on the travelling curve, retracts on the committed one
    gsap.to(el, {
      ...vars,
      duration: focused ? gesture.travel.duration : gesture.press.duration,
      ease: focused ? gesture.travel.ease : gesture.press.ease,
    });

    applyRing(focused ? gesture.hover : gesture.release);
  }, [focused, applyRing]);

  // Never leave a tween running against an unmounted node
  useEffect(() => {
    const el = ref.current;
    return () => {
      if (el) gsap.killTweensOf(el);
    };
  }, []);

  const enter = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    hovered.current = true;
    applyRing(gesture.hover);

    if (prefersReducedMotion()) return;

    // One full rotation of the dispersion gradient, then it rests — the same
    // spin the interactive components run on hover.
    gsap.fromTo(
      el,
      { '--ring-angle': 0 },
      { '--ring-angle': 360, duration: gesture.sheen.duration, ease: gesture.sheen.ease },
    );
  }, [applyRing]);

  const leave = useCallback(() => {
    hovered.current = false;
    applyRing(gesture.release);
  }, [applyRing]);

  return {
    ref,
    handlers: {
      onPointerEnter: enter,
      onPointerLeave: leave,
    },
  };
}

export default useFieldMotion;
