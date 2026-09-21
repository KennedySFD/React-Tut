import styled from 'styled-components';
import { typography } from '@/theme/mixins';

export const StyledBreadcrumb = styled.nav`
  ol {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.global.spacing.xs};
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;

export const BreadcrumbItem = styled.li`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.global.spacing.xs};
  ${typography('caption')};
  color: ${({ theme }) => theme.semantic.colors.text.muted};

  &:last-child {
    color: ${({ theme }) => theme.semantic.colors.text.primary};
    font-weight: ${({ theme }) => theme.global.fontWeights.medium};
  }
`;

export const BreadcrumbLink = styled.a`
  color: ${({ theme }) => theme.semantic.colors.text.secondary};
  text-decoration: none;
  transition: color ${({ theme }) => theme.semantic.motion.fast};

  &:hover {
    color: ${({ theme }) => theme.semantic.colors.text.primary};
    text-decoration: underline;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 ${({ theme }) => theme.global.borderWidths.ring}
      ${({ theme }) => theme.semantic.colors.state.focusRing};
    border-radius: ${({ theme }) => theme.global.radii.sm};
  }
`;

export const Separator = styled.span`
  display: inline-flex;
  color: ${({ theme }) => theme.semantic.colors.text.muted};
  opacity: 0.6;
`;
