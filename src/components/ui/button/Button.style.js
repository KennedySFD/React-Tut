import styled, { css } from 'styled-components';
import { disabledState, focusRingOnly, interactiveGlass } from '@/theme/mixins';

/**
 * Variant lookup. Each entry is a `css` block rather than a flat object
 * because a variant owns its rest / hover / active colours together — keeping
 * them in one place is what makes adding a new variant a single edit.
 *
 * Every colour below is a semantic token, so a rebrand happens in semantic.js
 * and never in this file.
 */
const variants = {
  primary: css`
    background: ${({ theme }) => theme.semantic.colors.accent.default};
    color: ${({ theme }) => theme.semantic.colors.accent.onAccent};
    border-color: ${({ theme }) => theme.semantic.colors.accent.default};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.semantic.colors.accent.hover};
      border-color: ${({ theme }) => theme.semantic.colors.accent.hover};
    }

    &:active:not(:disabled) {
      background: ${({ theme }) => theme.semantic.colors.accent.active};
      border-color: ${({ theme }) => theme.semantic.colors.accent.active};
    }
  `,

  secondary: css`
    background: ${({ theme }) => theme.semantic.colors.background.raised};
    color: ${({ theme }) => theme.semantic.colors.text.primary};
    border-color: ${({ theme }) => theme.semantic.colors.border.default};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.semantic.colors.background.subtle};
      border-color: ${({ theme }) => theme.semantic.colors.state.hoverBorder};
    }

    &:active:not(:disabled) {
      background: ${({ theme }) => theme.semantic.colors.background.sunken};
    }
  `,

  tertiary: css`
    background: ${({ theme }) => theme.semantic.colors.accent.subtle};
    color: ${({ theme }) => theme.semantic.colors.accent.text};
    border-color: transparent;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.semantic.colors.accent.muted};
    }

    &:active:not(:disabled) {
      background: ${({ theme }) => theme.semantic.colors.accent.muted};
      color: ${({ theme }) => theme.semantic.colors.accent.active};
    }
  `,

  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.semantic.colors.text.secondary};
    border-color: transparent;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.semantic.colors.state.hoverSurface};
      color: ${({ theme }) => theme.semantic.colors.text.primary};
    }

    &:active:not(:disabled) {
      background: ${({ theme }) => theme.semantic.colors.state.activeSurface};
    }
  `,

  danger: css`
    background: ${({ theme }) => theme.semantic.colors.feedback.danger.solid};
    color: ${({ theme }) => theme.semantic.colors.feedback.danger.onSolid};
    border-color: ${({ theme }) => theme.semantic.colors.feedback.danger.solid};

    &:hover:not(:disabled) {
      filter: brightness(0.92);
    }

    &:active:not(:disabled) {
      filter: brightness(0.85);
    }
  `,
};

export const StyledButton = styled.button`
  /* Dispersion keyline + sheen layers; driven by useInteractiveMotion */
  ${interactiveGlass};

  /* --- Geometry: component tokens --- */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: ${({ theme, $size }) => theme.components.button.sizes[$size || 'md'].height};
  padding: 0
    ${({ theme, $size, $iconOnly }) =>
      $iconOnly ? '0' : theme.components.button.sizes[$size || 'md'].paddingX};
  width: ${({ $fullWidth, $iconOnly, theme, $size }) => {
    if ($fullWidth) return '100%';
    if ($iconOnly) return theme.components.button.sizes[$size || 'md'].height;
    return 'auto';
  }};
  font-size: ${({ theme, $size }) => theme.components.button.sizes[$size || 'md'].fontSize};
  font-weight: ${({ theme }) => theme.components.button.fontWeight};
  line-height: 1;
  white-space: nowrap;
  border-radius: ${({ theme }) => theme.components.button.radius};
  border: ${({ theme }) => theme.components.button.borderWidth} solid transparent;
  cursor: pointer;
  user-select: none;
  /* Colour only — GSAP owns transform, so it must not appear here or the two
     would interpolate against each other. */
  transition: background ${({ theme }) => theme.semantic.motion.fast},
    border-color ${({ theme }) => theme.semantic.motion.fast},
    color ${({ theme }) => theme.semantic.motion.fast},
    box-shadow ${({ theme }) => theme.semantic.motion.fast},
    filter ${({ theme }) => theme.semantic.motion.fast};

  /* --- Colour: variant block --- */
  ${({ $variant }) => variants[$variant] ?? variants.primary};

  /* --- States --- */
  /* Same focus token as every field and menu option in the library */
  &:focus-visible {
    ${focusRingOnly};
  }

  &:disabled {
    ${disabledState};
  }

  /* svg icons track the button's text size */
  svg {
    width: ${({ theme, $size }) => theme.components.button.sizes[$size || 'md'].iconSize};
    height: ${({ theme, $size }) => theme.components.button.sizes[$size || 'md'].iconSize};
    flex-shrink: 0;
  }
`;

/**
 * The button's content, wrapped so it can lift independently of the surface.
 * Marked `data-motion-label`, which is the attribute useInteractiveMotion
 * looks for when applying the shared text lift.
 */
export const Label = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.components.button.gap};
  white-space: nowrap;
`;
