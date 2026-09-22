import styled from 'styled-components';
import { focusRingOnly, typography } from '@/theme/mixins';

export const PaginationRoot = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.global.spacing.xs};
`;

const baseBtn = `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  user-select: none;
`;

export const PageButton = styled.button`
  ${baseBtn};
  ${typography('label')};
  min-width: 2rem;
  height: 2rem;
  padding: 0 ${({ theme }) => theme.global.spacing.sm};
  border-radius: ${({ theme }) => theme.global.radii.md};
  background: ${({ theme, $active }) =>
    $active ? theme.semantic.colors.accent.default : 'transparent'};
  color: ${({ theme, $active }) =>
    $active ? theme.semantic.colors.accent.onAccent : theme.semantic.colors.text.secondary};
  transition: background ${({ theme }) => theme.semantic.motion.fast},
    color ${({ theme }) => theme.semantic.motion.fast};

  &:hover:not(:disabled) {
    background: ${({ theme, $active }) =>
      $active ? theme.semantic.colors.accent.hover : theme.semantic.colors.state.hoverSurface};
  }

  &:focus-visible { ${focusRingOnly}; }

  &:disabled {
    opacity: ${({ theme }) => theme.global.opacities.disabled};
    cursor: default;
  }
`;

export const Ellipsis = styled.span`
  ${typography('caption')};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  color: ${({ theme }) => theme.semantic.colors.text.muted};
`;
