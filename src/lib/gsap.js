'use client';

import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { curves, gesture } from '@/theme/motion';

/**
 * Central GSAP setup.
 *
 * Every curve declared in theme/motion.js is registered with GSAP under the
 * same name it uses in CSS, built from the same control points. A tween
 * written as `ease: 'glass'` and a transition written with
 * `theme.motion.curves.glass.css` are the identical easing function.
 *
 * Import gsap from here rather than from 'gsap' directly, so the eases are
 * guaranteed to be registered before any tween runs.
 */
let registered = false;

function register() {
  if (registered || typeof window === 'undefined') return;

  gsap.registerPlugin(CustomEase);

  Object.entries(curves).forEach(([name, curve]) => {
    CustomEase.create(name, curve.path);
  });

  // Nothing in the library should animate slower than this by accident.
  gsap.defaults({ duration: gesture.hover.duration, ease: 'glass', overwrite: 'auto' });

  registered = true;
}

register();

let reducedMotionQuery = null;

/**
 * True when the visitor has asked for reduced motion.
 *
 * Every hook in the motion system checks this and falls back to setting the
 * end state directly, so the interface still reflects what is happening — it
 * just stops moving to get there.
 */
export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;

  if (!reducedMotionQuery) {
    reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  }
  return reducedMotionQuery.matches;
}

export { gsap, CustomEase };
export default gsap;
