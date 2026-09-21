import styled, { css } from 'styled-components';
import { focusRingOnly, glassPanel, interactiveGlass, typography } from '@/theme/mixins';

const variants = {
  elevated: css`
    background: ${({ theme }) => theme.semantic.colors.background.raised};
    border-color: ${({ theme }) => theme.semantic.colors.border.subtle};
    box-shadow: ${({ theme }) => theme.semantic.shadows.sm};
  `,
  outlined: css`
    background: ${({ theme }) => theme.semantic.colors.background.raised};
    border-color: ${({ theme }) => theme.semantic.colors.border.default};
    box-shadow: none;
  `,
  filled: css`
    background: ${({ theme }) => theme.semantic.colors.background.subtle};
    border-color: transparent;
    box-shadow: none;
  `,
  /** Frosted pane — translucent, blurred and lit along its top edge. */
  glass: css`
    ${glassPanel};
  `,
};

export const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.global.spacing.md};
  padding: ${({ theme, $padding }) => theme.components.card.paddings[$padding || 'md']};
  border: ${({ theme }) => theme.components.card.borderWidth} solid transparent;
  border-radius: ${({ theme }) => theme.components.card.radius};
  /* No transform property here — GSAP drives the lift. */
  transition: box-shadow ${({ theme }) => theme.semantic.motion.base},
    border-color ${({ theme }) => theme.semantic.motion.base};

  ${({ $variant }) => variants[$variant] ?? variants.elevated};

  /* Only clickable cards get hover, press and focus affordances */
  ${({ $interactive }) =>
    $interactive &&
    css`
      ${interactiveGlass};
      cursor: pointer;
      text-align: left;
      width: 100%;

      &:hover {
        border-color: ${({ theme }) => theme.semantic.colors.state.hoverBorder};
        box-shadow: ${({ theme }) => theme.semantic.shadows.md};
      }

      &:focus-visible {
        ${focusRingOnly};
      }
    `};
`;

export const CardTitle = styled.h3`
  ${typography('subheading')};
  color: ${({ theme }) => theme.semantic.colors.text.primary};
`;

export const CardDescription = styled.p`
  ${typography('body')};
  font-size: ${({ theme }) => theme.global.fontSizes.sm};
  color: ${({ theme }) => theme.semantic.colors.text.secondary};
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.global.spacing.sm};
  margin-top: ${({ theme }) => theme.global.spacing.xs};
`;
