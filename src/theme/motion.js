/**
 * MOTION TOKENS — the single source of truth for how this library moves.
 *
 * Uniformity is enforced structurally rather than by convention:
 *
 *   1. A curve is defined ONCE as four cubic-bezier control points.
 *   2. `css` renders those points as a CSS `cubic-bezier(...)`.
 *   3. `path` renders the *same* points as an SVG path for GSAP's CustomEase.
 *
 * A CSS transition and a GSAP tween using the same curve name are therefore
 * running the mathematically identical easing — not two curves that merely
 * look similar. See src/lib/gsap.js, which registers these with GSAP.
 *
 * Nothing in the library should invent a duration or an ease. If a component
 * needs a gesture that is not here, add it here first.
 */

/** Renders control points as a CSS timing function. */
const toCss = ([x1, y1, x2, y2]) => `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;

/** Renders the same control points as the SVG path CustomEase expects. */
const toPath = ([x1, y1, x2, y2]) => `M0,0 C${x1},${y1} ${x2},${y2} 1,1`;

const points = {
  /** The signature curve: a fast departure that settles softly, like glass coming to rest. */
  glass: [0.22, 1, 0.36, 1],
  /** Committed, quick — for a press going down. */
  glassIn: [0.55, 0, 1, 0.45],
  /** Symmetrical — for travelling elements: sheens, indicators, thumbs. */
  glassInOut: [0.65, 0, 0.35, 1],
};

export const curves = Object.fromEntries(
  Object.entries(points).map(([name, value]) => [
    name,
    { points: value, css: toCss(value), path: toPath(value) },
  ]),
);

/** Seconds — GSAP's native unit. */
export const durations = {
  press: 0.12,
  hover: 0.28,
  settle: 0.42,
  reveal: 0.34,
  sheen: 0.72,
  travel: 0.46,
};

/** The same durations as CSS strings, so transitions match tweens exactly. */
export const cssDurations = Object.fromEntries(
  Object.entries(durations).map(([name, value]) => [name, `${Math.round(value * 1000)}ms`]),
);

/**
 * GESTURES — named duration + ease pairs.
 * Components reference a gesture, never a raw number.
 */
export const gesture = {
  hover: { duration: durations.hover, ease: 'glass' },
  press: { duration: durations.press, ease: 'glassIn' },
  release: { duration: durations.settle, ease: 'glass' },
  reveal: { duration: durations.reveal, ease: 'glass' },
  dismiss: { duration: durations.press, ease: 'glassIn' },
  sheen: { duration: durations.sheen, ease: 'glassInOut' },
  travel: { duration: durations.travel, ease: 'glassInOut' },
};

/**
 * AMPLITUDE — how far a given family of component moves.
 *
 * This is the one thing that varies between components. The curve and the
 * duration stay constant, so a Tag and a Card feel like the same system
 * moving at different scales — which is what makes it read as uniform.
 */
export const amplitude = {
  /** Buttons, select triggers — the standard interactive control. */
  control: { lift: -1.5, press: 0.975, sheen: 0.5, ring: 1, label: -1 },
  /** Cards, panels — larger surfaces lift further and press less. */
  surface: { lift: -4, press: 0.995, sheen: 0.35, ring: 0.8, label: 0 },
  /** Tags and other small chips — little lift, noticeable press. */
  chip: { lift: -1, press: 0.94, sheen: 0, ring: 0.55, label: 0 },
  /** Tabs, menu options, accordion triggers — flat, but responsive. */
  subtle: { lift: 0, press: 0.985, sheen: 0, ring: 0.45, label: -1 },
  /** Checkbox / radio / switch — the control is small, so the press is proportional. */
  choice: { lift: 0, press: 0.9, sheen: 0, ring: 0.7, label: 0 },
};

/** Distance overlays travel as they reveal. */
export const travel = {
  menu: 8,
  modal: 14,
  tooltip: 6,
};

export const motion = { curves, durations, cssDurations, gesture, amplitude, travel };

export default motion;
