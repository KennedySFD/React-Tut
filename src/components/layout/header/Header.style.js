import styled, { css } from 'styled-components';
import { focusRingOnly, typography } from '@/theme/mixins';

export const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.global.zIndex.sticky};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.global.spacing.lg};
  width: 100%;
  height: 3.5rem;
  padding: 0 ${({ theme }) => theme.global.spacing.xl};
  background: ${({ theme }) => theme.semantic.colors.background.canvas};
  border-bottom: ${({ theme }) => theme.global.borderWidths.thin} solid
    ${({ theme }) => theme.semantic.colors.border.subtle};
  backdrop-filter: blur(${({ theme }) => theme.global.blurs.glass});
`;

export const HeaderBrand = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.global.spacing.sm};
  ${typography('subheading')};
  color: ${({ theme }) => theme.semantic.colors.text.primary};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.global.fontWeights.bold};
  margin-right: auto;

  &:focus-visible {
    ${focusRingOnly};
    border-radius: ${({ theme }) => theme.global.radii.sm};
  }
`;

export const HeaderLogo = styled.span`
  display: inline-flex;
  color: ${({ theme }) => theme.semantic.colors.accent.default};
`;

export const HeaderNav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.global.spacing.xs};

  @media (max-width: 640px) {
    display: none;
  }
`;

export const HeaderNavLink = styled.a`
  ${typography('label')};
  padding: ${({ theme }) => theme.global.spacing.sm} ${({ theme }) => theme.global.spacing.md};
  border-radius: ${({ theme }) => theme.global.radii.md};
  color: ${({ theme, $active }) =>
    $active ? theme.semantic.colors.accent.text : theme.semantic.colors.text.secondary};
  background: ${({ theme, $active }) =>
    $active ? theme.semantic.colors.accent.subtle : 'transparent'};
  text-decoration: none;
  transition: background ${({ theme }) => theme.semantic.motion.fast},
    color ${({ theme }) => theme.semantic.motion.fast};

  &:hover {
    background: ${({ theme }) => theme.semantic.colors.state.hoverSurface};
    color: ${({ theme }) => theme.semantic.colors.text.primary};
  }

  &:focus-visible {
    ${focusRingOnly};
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.global.spacing.sm};
`;

export const MobileMenuButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: ${({ theme }) => theme.global.radii.md};
  color: ${({ theme }) => theme.semantic.colors.text.secondary};
  cursor: pointer;
  transition: background ${({ theme }) => theme.semantic.motion.fast};

  &:hover {
    background: ${({ theme }) => theme.semantic.colors.state.hoverSurface};
  }

  &:focus-visible {
    ${focusRingOnly};
  }

  @media (max-width: 640px) {
    display: inline-flex;
  }
`;

export const MobileNav = styled.div`
  display: none;

  @media (max-width: 640px) {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    padding: ${({ theme }) => theme.global.spacing.sm};
    background: ${({ theme }) => theme.semantic.colors.background.canvas};
    border-bottom: ${({ theme }) => theme.global.borderWidths.thin} solid
      ${({ theme }) => theme.semantic.colors.border.subtle};
    box-shadow: ${({ theme }) => theme.semantic.shadows.md};
  }
`;
