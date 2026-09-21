import styled from 'styled-components';
import { focusRingOnly, interactiveGlass } from '@/theme/mixins';

/**
 * Every variant resolves to the same three slots on a feedback family
 * (surface / border / text), so adding a variant is a token lookup rather
 * than a new block of CSS.
 */
const resolveFamily = (theme, variant) => {
  if (variant === 'accent') {
    return {
      surface: theme.semantic.colors.accent.subtle,
      border: theme.semantic.colors.accent.border,
      text: theme.semantic.colors.accent.text,
      solid: theme.semantic.colors.accent.default,
      onSolid: theme.semantic.colors.accent.onAccent,
    };
  }
  return theme.semantic.colors.feedback[variant] ?? theme.semantic.colors.feedback.neutral;
};

export const StyledTag = styled.span`
  ${interactiveGlass};
  display: inline-flex;
  align-items: center;
  gap: ${({ theme, $size }) => theme.components.tag.sizes[$size || 'md'].gap};
  height: ${({ theme, $size }) => theme.components.tag.sizes[$size || 'md'].height};
  padding: 0 ${({ theme, $size }) => theme.components.tag.sizes[$size || 'md'].paddingX};
  font-size: ${({ theme, $size }) => theme.components.tag.sizes[$size || 'md'].fontSize};
  font-weight: ${({ theme }) => theme.components.tag.fontWeight};
  line-height: 1;
  white-space: nowrap;
  border-radius: ${({ theme }) => theme.components.tag.radius};
  border: ${({ theme }) => theme.components.tag.borderWidth} solid
    ${({ theme, $variant, $solid }) =>
      $solid ? 'transparent' : resolveFamily(theme, $variant).border};
  background: ${({ theme, $variant, $solid }) => {
    const family = resolveFamily(theme, $variant);
    return $solid ? family.solid : family.surface;
  }};
  color: ${({ theme, $variant, $solid }) => {
    const family = resolveFamily(theme, $variant);
    return $solid ? family.onSolid : family.text;
  }};
`;

export const Dot = styled.span`
  width: 0.375rem;
  height: 0.375rem;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.global.radii.full};
  background: currentColor;
`;

export const RemoveButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin-right: -0.125rem;
  border: none;
  border-radius: ${({ theme }) => theme.global.radii.full};
  background: transparent;
  color: currentColor;
  opacity: ${({ theme }) => theme.global.opacities.muted};
  cursor: pointer;
  transition: opacity ${({ theme }) => theme.semantic.motion.fast};

  &:hover {
    opacity: 1;
  }

  &:focus-visible {
    ${focusRingOnly};
  }

  svg {
    width: 0.75em;
    height: 0.75em;
    stroke-width: 2.5;
  }
`;
