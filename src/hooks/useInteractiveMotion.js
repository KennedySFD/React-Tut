'use client';

import { useCallback, useEffect, useRef } from 'react';
import gsap, { prefersReducedMotion } from '@/lib/gsap';
import { amplitude, gesture } from '@/theme/motion';

/**
 * The hover and press behaviour for every interactive component in the
 * library. One implementation means one feel — a Tag and a Card are the same
 * gesture at different amplitudes, never two people's idea of a hover.
 *
 * On hover the element lifts on the Y axis; the colour change itself is the
 * shared CSS hover state from the `hover-*` mixins.
 *
 * On press it scales down on the committed `glassIn` curve, and releases on
 * the softer `glass` curve — down fast, back slow, which is what makes a
 * press feel physical rather than mechanical.
 *
 * Any descendant marked `data-motion-label` gets the uniform text lift.
 *
 * @param {'control'|'surface'|'chip'|'subtle'|'choice'} preset - amplitude family
 * @param {boolean} disabled - skip all motion and reset
 * @returns {{ref, amp, handlers}} spread `handlers` onto the element; `amp`
 *   is the resolved amplitude, for components driving a layer of their own
 */
export function useInteractiveMotion({ preset = 'control', disabled = false } = {}) {
  const ref = useRef(null);
  const pressed = useRef(false);

  const amp = amplitude[preset] ?? amplitude.control;

  /** The text node(s) that ride along with the surface. */
  const getLabel = () => ref.current?.querySelector('[data-motion-label]') ?? null;

  const settle = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.set(el, { y: 0, scale: 1 });

    const label = getLabel();
    if (label) {
      gsap.killTweensOf(label);
      gsap.set(label, { y: 0 });
    }
  }, []);

  // Reset immediately if the control becomes disabled mid-interaction
  useEffect(() => {
    if (disabled) settle();
  }, [disabled, settle]);

  // Never leave a tween running against an unmounted node
  useEffect(() => {
    const el = ref.current;
    return () => {
      if (el) gsap.killTweensOf(el);
    };
  }, []);

  const enter = useCallback(() => {
    const el = ref.current;
    if (!el || disabled || prefersReducedMotion()) return;

    gsap.to(el, {
      y: amp.lift,
      duration: gesture.hover.duration,
      ease: gesture.hover.ease,
    });

    const label = getLabel();
    if (label && amp.label) {
      gsap.to(label, { y: amp.label, duration: gesture.hover.duration, ease: gesture.hover.ease });
    }
  }, [amp, disabled]);

  const leave = useCallback(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    pressed.current = false;

    gsap.to(el, {
      y: 0,
      scale: 1,
      duration: gesture.release.duration,
      ease: gesture.release.ease,
    });

    const label = getLabel();
    if (label && amp.label) {
      gsap.to(label, { y: 0, duration: gesture.release.duration, ease: gesture.release.ease });
    }
  }, [amp]);

  const press = useCallback(() => {
    const el = ref.current;
    if (!el || disabled || prefersReducedMotion()) return;

    pressed.current = true;
    gsap.to(el, {
      scale: amp.press,
      duration: gesture.press.duration,
      ease: gesture.press.ease,
    });
  }, [amp, disabled]);

  const release = useCallback(() => {
    const el = ref.current;
    if (!el || !pressed.current || prefersReducedMotion()) return;

    pressed.current = false;
    gsap.to(el, {
      scale: 1,
      duration: gesture.release.duration,
      ease: gesture.release.ease,
    });
  }, []);

  return {
    ref,
    amp,
    handlers: {
      onPointerEnter: enter,
      onPointerLeave: leave,
      onPointerDown: press,
      onPointerUp: release,
    },
  };
}

export default useInteractiveMotion;
