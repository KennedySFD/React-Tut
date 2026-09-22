import { css } from 'styled-components';

/**
 * The glass and dispersion layers live in their own file but are re-exported
 * here, so `@/theme/mixins` stays the single import site for shared styling.
 */
export {
  dispersionRing,
  fieldGlass,
  focusKeyline,
  glassPanel,
  glassPanelStrong,
  glassVars,
  interactiveGlass,
  keylineVars,
  sheenLayer,
} from './glass';

/**
 * SHARED STYLE MIXINS
 *
 * Reusable CSS fragments built on semantic tokens. These are the practical
 * half of the token system: tokens make the *values* shared, mixins make the
 * *treatment* shared.
 *
 * Example from the brief: an input's focus ring and a dropdown's focus ring
 * are not "two blue outlines that happen to match" — they are one call to
 * `focusRing` reading one token. Change `state.focusRing` in semantic.js and
 * every control in the library updates together.
 */

/** The single focus treatment used by every focusable control. */
export const focusRing = css`
  outline: none;
  border-color: ${({ theme }) => theme.semantic.colors.state.focusBorder};
  box-shadow: 0 0 0 ${({ theme }) => theme.global.borderWidths.ring}
    ${({ theme }) => theme.semantic.colors.state.focusRing};
`;

/** Focus ring in its error colourway — same geometry, different token. */
export const errorFocusRing = css`
  outline: none;
  border-color: ${({ theme }) => theme.semantic.colors.state.errorBorder};
  box-shadow: 0 0 0 ${({ theme }) => theme.global.borderWidths.ring}
    ${({ theme }) => theme.semantic.colors.state.errorRing};
`;

/**
 * Focus ring for controls that have no border of their own (tabs, icon
 * buttons, menu options) — ring only, no border colour change.
 */
export const focusRingOnly = css`
  outline: none;
  box-shadow: 0 0 0 ${({ theme }) => theme.global.borderWidths.ring}
    ${({ theme }) => theme.semantic.colors.state.focusRing};
`;

/** Standard disabled treatment. */
export const disabledState = css`
  cursor: not-allowed;
  opacity: ${({ theme }) => theme.global.opacities.disabled};
`;

/**
 * The shared skin for every text-entry surface: Input, Textarea, Select
 * trigger and SearchBar. Guarantees they are indistinguishable from each
 * other, which is exactly what a design system should enforce.
 *
 * Consumers pass `$size` and optionally `$hasError`.
 */
export const fieldBase = css`
  width: 100%;
  font-family: ${({ theme }) => theme.semantic.typography.body.family};
  font-size: ${({ theme, $size }) => theme.components.field.sizes[$size || 'md'].fontSize};
  color: ${({ theme }) => theme.semantic.colors.text.primary};
  background: ${({ theme }) => theme.semantic.colors.background.raised};
  border: ${({ theme }) => theme.components.field.borderWidth} solid
    ${({ theme, $hasError }) =>
      $hasError
        ? theme.semantic.colors.state.errorBorder
        : theme.semantic.colors.border.default};
  border-radius: ${({ theme }) => theme.components.field.radius};
  transition: border-color ${({ theme }) => theme.semantic.motion.fast},
    box-shadow ${({ theme }) => theme.semantic.motion.fast},
    background ${({ theme }) => theme.semantic.motion.fast};

  &::placeholder {
    color: ${({ theme }) => theme.semantic.colors.text.placeholder};
  }

  &:hover:not(:disabled):not([aria-disabled='true']) {
    border-color: ${({ theme, $hasError }) =>
      $hasError
        ? theme.semantic.colors.state.errorBorder
        : theme.semantic.colors.state.hoverBorder};
  }

  &:focus-visible,
  &[data-focused='true'] {
    ${({ $hasError }) => ($hasError ? errorFocusRing : focusRing)};
  }

  &:disabled,
  &[aria-disabled='true'] {
    background: ${({ theme }) => theme.semantic.colors.state.disabledSurface};
    border-color: ${({ theme }) => theme.semantic.colors.state.disabledBorder};
    color: ${({ theme }) => theme.semantic.colors.text.disabled};
    cursor: not-allowed;
  }
`;

/** Hides an element visually but keeps it available to screen readers. */
export const visuallyHidden = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
`;

/** Single-line truncation with an ellipsis. */
export const truncate = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

/** Applies a semantic typography role in one line. */
export const typography = (role) => css`
  font-family: ${({ theme }) => theme.semantic.typography[role].family};
  font-size: ${({ theme }) => theme.semantic.typography[role].size};
  font-weight: ${({ theme }) => theme.semantic.typography[role].weight};
  line-height: ${({ theme }) => theme.semantic.typography[role].lineHeight};
  letter-spacing: ${({ theme }) => theme.semantic.typography[role].letterSpacing};
`;
