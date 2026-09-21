import styled from 'styled-components';
import { focusRingOnly, typography } from '@/theme/mixins';

/** Resolves the feedback family once, then reuses it for all three slots. */
const family = (theme, variant) =>
  theme.semantic.colors.feedback[variant] ?? theme.semantic.colors.feedback.info;

export const StyledAlert = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.components.alert.gap};
  padding: ${({ theme }) => theme.components.alert.padding};
  background: ${({ theme, $variant }) => family(theme, $variant).surface};
  border: ${({ theme }) => theme.components.alert.borderWidth} solid
    ${({ theme, $variant }) => family(theme, $variant).border};
  border-radius: ${({ theme }) => theme.components.alert.radius};
  color: ${({ theme }) => theme.semantic.colors.text.primary};
`;

export const AlertIcon = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  /* icon carries the family colour; the text stays high-contrast */
  color: ${({ theme, $variant }) => family(theme, $variant).text};

  svg {
    width: ${({ theme }) => theme.components.alert.iconSize};
    height: ${({ theme }) => theme.components.alert.iconSize};
  }
`;

export const AlertBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.global.spacing.xs};
  flex: 1;
  min-width: 0;
`;

export const AlertTitle = styled.strong`
  ${typography('label')};
  color: ${({ theme, $variant }) => family(theme, $variant).text};
`;

export const AlertMessage = styled.div`
  ${typography('body')};
  font-size: ${({ theme }) => theme.global.fontSizes.sm};
  color: ${({ theme }) => theme.semantic.colors.text.secondary};
`;

export const DismissButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: ${({ theme }) => theme.global.spacing.xxs};
  border: none;
  border-radius: ${({ theme }) => theme.global.radii.sm};
  background: transparent;
  color: ${({ theme }) => theme.semantic.colors.text.muted};
  cursor: pointer;
  transition: background ${({ theme }) => theme.semantic.motion.fast},
    color ${({ theme }) => theme.semantic.motion.fast};

  &:hover {
    background: ${({ theme }) => theme.semantic.colors.state.hoverSurface};
    color: ${({ theme }) => theme.semantic.colors.text.primary};
  }

  &:focus-visible {
    ${focusRingOnly};
  }

  svg {
    width: ${({ theme }) => theme.global.sizes.icon.md};
    height: ${({ theme }) => theme.global.sizes.icon.md};
  }
`;
