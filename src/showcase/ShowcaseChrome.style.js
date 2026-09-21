import styled from 'styled-components';
import { typography } from '@/theme/mixins';

export const Shell = styled.div`
  /* Shared layout metrics. The hero stage sizes itself against these, so a
     change to the top bar or the gutter cannot leave it mismatched. */
  --showcase-topbar: 3.5rem;
  --showcase-gutter: ${({ theme }) => theme.global.spacing.xxl};

  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  /* The page sits one step back so each story canvas reads as raised */
  background: ${({ theme }) => theme.semantic.colors.background.subtle};

  @media (max-width: 900px) {
    --showcase-gutter: ${({ theme }) => theme.global.spacing.lg};
  }
`;

export const TopBar = styled.header`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.global.zIndex.sticky};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.global.spacing.lg};
  padding: ${({ theme }) => theme.global.spacing.md}
    ${({ theme }) => theme.global.spacing.xl};
  background: ${({ theme }) => theme.semantic.colors.background.canvas};
  border-bottom: ${({ theme }) => theme.global.borderWidths.thin} solid
    ${({ theme }) => theme.semantic.colors.border.subtle};
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.global.spacing.md};
`;

export const BrandMark = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: ${({ theme }) => theme.global.radii.md};
  background: ${({ theme }) => theme.semantic.colors.accent.default};
  color: ${({ theme }) => theme.semantic.colors.accent.onAccent};
  font-size: ${({ theme }) => theme.global.fontSizes.xs};
  font-weight: ${({ theme }) => theme.global.fontWeights.bold};
`;

export const BrandName = styled.span`
  ${typography('label')};
  color: ${({ theme }) => theme.semantic.colors.text.primary};
`;

export const TopBarActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.global.spacing.md};
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 15rem minmax(0, 1fr);
  align-items: start;
  flex: 1;

  /* No padding or max-width here: the hero stage spans the full content
     width, and the documentation below it is constrained by DocColumn. */
  > main {
    display: flex;
    flex-direction: column;
    min-width: 0;
    width: 100%;
  }

  @media (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Sidebar = styled.nav`
  position: sticky;
  top: var(--showcase-topbar);
  align-self: start;
  max-height: calc(100vh - var(--showcase-topbar));
  overflow-y: auto;
  border-right: ${({ theme }) => theme.global.borderWidths.thin} solid
    ${({ theme }) => theme.semantic.colors.border.subtle};

  @media (max-width: 900px) {
    position: static;
    max-height: none;
    border-right: none;
    border-bottom: ${({ theme }) => theme.global.borderWidths.thin} solid
      ${({ theme }) => theme.semantic.colors.border.subtle};
  }
`;

export const SidebarInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.global.spacing.lg};
  padding: ${({ theme }) => theme.global.spacing.xl}
    ${({ theme }) => theme.global.spacing.md};

  > div {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.global.spacing.xxs};
  }
`;

export const GroupLabel = styled.span`
  ${typography('caption')};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.global.letterSpacings.wide};
  color: ${({ theme }) => theme.semantic.colors.text.muted};
  padding: 0 ${({ theme }) => theme.global.spacing.md}
    ${({ theme }) => theme.global.spacing.xs};
`;

export const NavLink = styled.a`
  display: block;
  padding: ${({ theme }) => theme.global.spacing.sm}
    ${({ theme }) => theme.global.spacing.md};
  font-size: ${({ theme }) => theme.global.fontSizes.sm};
  font-weight: ${({ theme, $active }) =>
    $active ? theme.global.fontWeights.medium : theme.global.fontWeights.regular};
  border-radius: ${({ theme }) => theme.global.radii.md};
  /* Selected nav item uses the same selected tokens as a dropdown option */
  color: ${({ theme, $active }) =>
    $active ? theme.semantic.colors.state.selectedText : theme.semantic.colors.text.secondary};
  background: ${({ theme, $active }) =>
    $active ? theme.semantic.colors.state.selectedSurface : 'transparent'};
  transition: background ${({ theme }) => theme.semantic.motion.fast},
    color ${({ theme }) => theme.semantic.motion.fast};

  &:hover {
    background: ${({ theme, $active }) =>
      $active
        ? theme.semantic.colors.state.selectedSurface
        : theme.semantic.colors.state.hoverSurface};
    color: ${({ theme, $active }) =>
      $active ? theme.semantic.colors.state.selectedText : theme.semantic.colors.text.primary};
  }
`;
