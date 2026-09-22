import styled from 'styled-components';
import { glassPanelStrong, typography } from '@/theme/mixins';

export const Scrim = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.global.zIndex.overlay};
  background: ${({ theme }) => theme.semantic.colors.background.scrim};
`;

const sides = {
  left: 'left: 0; top: 0; bottom: 0; transform: translateX(-100%);',
  right: 'right: 0; top: 0; bottom: 0; transform: translateX(100%);',
};

export const Panel = styled.aside`
  ${glassPanelStrong};
  position: fixed;
  ${({ $side }) => sides[$side] ?? sides.right};
  z-index: ${({ theme }) => theme.global.zIndex.modal};
  width: min(24rem, 85vw);
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 0;
  border: none;
  border-left: ${({ theme, $side }) =>
    $side === 'right'
      ? `${theme.global.borderWidths.thin} solid ${theme.semantic.colors.border.subtle}`
      : 'none'};
  border-right: ${({ theme, $side }) =>
    $side === 'left'
      ? `${theme.global.borderWidths.thin} solid ${theme.semantic.colors.border.subtle}`
      : 'none'};
`;

export const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.global.spacing.lg} ${({ theme }) => theme.global.spacing.xl};
  border-bottom: ${({ theme }) => theme.global.borderWidths.thin} solid
    ${({ theme }) => theme.semantic.colors.border.subtle};
`;

export const DrawerTitle = styled.h2`
  ${typography('subheading')};
  color: ${({ theme }) => theme.semantic.colors.text.primary};
  margin: 0;
`;

export const DrawerBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.global.spacing.xl};
`;

export const DrawerCloseBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.semantic.colors.text.muted};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.global.radii.md};
  transition: color ${({ theme }) => theme.semantic.motion.fast},
    background ${({ theme }) => theme.semantic.motion.fast};

  &:hover {
    color: ${({ theme }) => theme.semantic.colors.text.primary};
    background: ${({ theme }) => theme.semantic.colors.state.hoverSurface};
  }
`;
