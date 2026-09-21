import styled, { css } from 'styled-components';

const variantColors = ($variant) => css`
  background: ${({ theme }) => {
    const map = {
      accent: theme.semantic.colors.accent.default,
      danger: theme.semantic.colors.feedback.danger.solid,
      success: theme.semantic.colors.feedback.success.solid,
      warning: theme.semantic.colors.feedback.warning.solid,
      neutral: theme.semantic.colors.feedback.neutral.solid,
    };
    return map[$variant] || map.danger;
  }};
  color: ${({ theme }) => {
    const map = {
      accent: theme.semantic.colors.accent.onAccent,
      danger: theme.semantic.colors.feedback.danger.onSolid,
      success: theme.semantic.colors.feedback.success.onSolid,
      warning: theme.semantic.colors.feedback.warning.onSolid,
      neutral: theme.semantic.colors.feedback.neutral.onSolid,
    };
    return map[$variant] || map.danger;
  }};
`;

export const Wrapper = styled.span`
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  flex-shrink: 0;
`;

export const StyledBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  min-width: 1.25rem;
  height: 1.25rem;
  padding: 0 ${({ theme }) => theme.global.spacing.xs};
  border-radius: ${({ theme }) => theme.global.radii.full};
  font-size: ${({ theme }) => theme.global.fontSizes.xs};
  font-weight: ${({ theme }) => theme.global.fontWeights.semibold};
  line-height: 1.25rem;
  text-align: center;
  white-space: nowrap;
  border: 2px solid ${({ theme }) => theme.semantic.colors.background.canvas};
  ${({ $variant }) => variantColors($variant)};
`;

export const BadgeDot = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(30%, -30%);
  width: 0.625rem;
  height: 0.625rem;
  border-radius: ${({ theme }) => theme.global.radii.full};
  border: 2px solid ${({ theme }) => theme.semantic.colors.background.canvas};
  ${({ $variant }) => variantColors($variant)};
`;
