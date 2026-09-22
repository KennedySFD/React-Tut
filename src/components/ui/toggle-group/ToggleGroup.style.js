import styled from 'styled-components';
import { focusRingOnly, typography } from '@/theme/mixins';

export const ToggleGroupRoot = styled.div`
  display: inline-flex;
  align-items: center;
  border: ${({ theme }) => theme.global.borderWidths.thin} solid
    ${({ theme }) => theme.semantic.colors.border.default};
  border-radius: ${({ theme }) => theme.global.radii.lg};
  overflow: hidden;
  background: ${({ theme }) => theme.semantic.colors.background.subtle};
  padding: 0.125rem;
  gap: 0.125rem;
`;

export const ToggleItem = styled.button`
  ${typography('label')};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.global.spacing.xs};
  padding: ${({ theme }) => theme.global.spacing.sm} ${({ theme }) => theme.global.spacing.lg};
  border: none;
  background: ${({ $active, theme }) =>
    $active ? theme.semantic.colors.background.raised : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? theme.semantic.colors.text.primary : theme.semantic.colors.text.muted};
  font-size: ${({ theme }) => theme.global.fontSizes.sm};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.global.radii.md};
  transition: background ${({ theme }) => theme.semantic.motion.fast},
    color ${({ theme }) => theme.semantic.motion.fast},
    box-shadow ${({ theme }) => theme.semantic.motion.fast};

  ${({ $active, theme }) =>
    $active && `box-shadow: ${theme.semantic.shadows.sm};`}

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.semantic.colors.text.primary};
  }

  &:focus-visible { ${focusRingOnly}; }

  &:disabled {
    opacity: ${({ theme }) => theme.global.opacities.disabled};
    cursor: default;
  }

  svg {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
  }
`;
