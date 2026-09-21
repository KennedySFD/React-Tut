import { css } from 'styled-components';

/**
 * GLASS & DISPERSION
 *
 * The visual half of the motion system. Two effect layers are attached to a
 * component as pseudo-elements and driven entirely by CSS custom properties:
 *
 *   --ring-angle    rotation of the chromatic keyline   (deg, unitless)
 *   --ring-opacity  visibility of the keyline           (0–1)
 *   --sheen-x       position of the light streak        (%, unitless)
 *   --sheen-opacity visibility of the streak            (0–1)
 *
 * GSAP animates those four variables. Because the layers are pseudo-elements,
 * no component has to render extra markup to receive the effect — it applies
 * through a mixin alone. See hooks/useInteractiveMotion.js for the driver.
 *
 * Both layers sit at `z-index: -1` inside an `isolation: isolate` stacking
 * context, which paints them above the element's own background and border but
 * below its text. That is what keeps labels legible under a sheen without
 * wrapping every component's children in a positioned span.
 */

/** Values the layers read before any tween runs — also the SSR state. */
export const glassVars = css`
  --ring-angle: 0;
  --ring-opacity: 0;
  /* 100 parks the highlight off the left edge, ready to sweep right */
  --sheen-x: 100;
  --sheen-opacity: 0;
`;

/**
 * The chromatic keyline: a 1px gradient ring carrying the split colours of
 * light through a glass edge. Drawn with a masked gradient rather than a
 * border, so it can hold a gradient at all.
 */
export const dispersionRing = css`
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: inherit;
    padding: 1.5px;
    pointer-events: none;
    opacity: var(--ring-opacity, 0);
    background: conic-gradient(
      from calc(var(--ring-angle, 0) * 1deg),
      ${({ theme }) => theme.semantic.colors.dispersion.cyan} 0deg,
      ${({ theme }) => theme.semantic.colors.dispersion.violet} 90deg,
      ${({ theme }) => theme.semantic.colors.dispersion.rose} 180deg,
      ${({ theme }) => theme.semantic.colors.dispersion.amber} 270deg,
      ${({ theme }) => theme.semantic.colors.dispersion.cyan} 360deg
    );
    /* Punch out the middle, leaving only the 1px padding band. */
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    mask-composite: exclude;
  }
`;

/**
 * A soft diagonal highlight that travels across the surface.
 *
 * The layer itself never moves — it stays pinned at `inset: 0` and the
 * *gradient inside it* slides via `background-position`. Translating the
 * element instead would carry its box outside the component, where nothing
 * clips it, and the streak would be visible to the left and right of the
 * component as it passed through.
 *
 * Because the layer stays within the border box, `border-radius: inherit`
 * clips the highlight to the component's exact shape, with no need for
 * `overflow: hidden` on the parent — which would also clip focus rings and
 * any menu the component opens.
 *
 * The gradient is 3x the box width, so at `--sheen-x: 100` the bright band
 * sits fully off the left edge and at `0` fully off the right. Sweeping
 * 100 -> 0 carries it left to right.
 */
export const sheenLayer = css`
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: inherit;
    pointer-events: none;
    opacity: var(--sheen-opacity, 0);
    background-image: linear-gradient(
      105deg,
      transparent 38%,
      ${({ theme }) => theme.semantic.colors.dispersion.sheen} 50%,
      transparent 62%
    );
    background-size: 300% 100%;
    background-repeat: no-repeat;
    background-position: calc(var(--sheen-x, 100) * 1%) 0;
  }
`;

/**
 * Everything an interactive component needs to receive the motion system.
 * Pair with the `useInteractiveMotion` hook.
 */
export const interactiveGlass = css`
  position: relative;
  isolation: isolate;
  ${glassVars};
  ${dispersionRing};
  ${sheenLayer};
`;

/**
 * A translucent pane: modal dialogs, dropdown menus, tooltips, and any card
 * asking for the premium treatment.
 *
 * `saturate` is what stops a blurred backdrop turning grey — it is the
 * difference between frosted glass and frosted plastic.
 */
export const glassPanel = css`
  position: relative;
  isolation: isolate;
  background: ${({ theme }) => theme.semantic.colors.glass.surface};
  backdrop-filter: blur(${({ theme }) => theme.global.blurs.glass}) saturate(180%);
  -webkit-backdrop-filter: blur(${({ theme }) => theme.global.blurs.glass}) saturate(180%);
  border: ${({ theme }) => theme.global.borderWidths.thin} solid
    ${({ theme }) => theme.semantic.colors.border.subtle};
  box-shadow: inset 0 1px 0 ${({ theme }) => theme.semantic.colors.glass.highlight},
    inset 0 -1px 0 ${({ theme }) => theme.semantic.colors.glass.shade},
    ${({ theme }) => theme.semantic.shadows.lg};
  ${glassVars};
  ${dispersionRing};
`;

/** A denser pane for surfaces that must stay readable over busy content. */
export const glassPanelStrong = css`
  ${glassPanel};
  background: ${({ theme }) => theme.semantic.colors.glass.surfaceStrong};
  backdrop-filter: blur(${({ theme }) => theme.global.blurs.strong}) saturate(180%);
  -webkit-backdrop-filter: blur(${({ theme }) => theme.global.blurs.strong}) saturate(180%);
`;

/**
 * The focus keyline for form controls: a 1px chromatic line that draws out
 * from the centre of the lower edge when the field takes focus.
 *
 * Driven by `--keyline-scale` (0–1) and `--keyline-opacity`.
 */
export const keylineVars = css`
  --keyline-scale: 0;
  --keyline-opacity: 0;
`;

export const focusKeyline = css`
  ${keylineVars};

  &::after {
    content: '';
    position: absolute;
    left: ${({ theme }) => theme.global.radii.md};
    right: ${({ theme }) => theme.global.radii.md};
    bottom: -1px;
    height: ${({ theme }) => theme.global.borderWidths.thin};
    z-index: 1;
    pointer-events: none;
    border-radius: ${({ theme }) => theme.global.radii.full};
    opacity: var(--keyline-opacity, 0);
    transform: scaleX(var(--keyline-scale, 0));
    transform-origin: center;
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${({ theme }) => theme.semantic.colors.dispersion.cyan} 22%,
      ${({ theme }) => theme.semantic.colors.dispersion.violet} 50%,
      ${({ theme }) => theme.semantic.colors.dispersion.rose} 78%,
      transparent 100%
    );
  }
`;
