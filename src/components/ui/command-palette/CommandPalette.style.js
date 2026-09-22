import styled from 'styled-components';
import { glassPanelStrong, focusRingOnly, typography } from '@/theme/mixins';

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.global.zIndex.modal};
  display: flex;
  justify-content: center;
  padding-top: 20vh;
  background: ${({ theme }) => theme.semantic.colors.background.scrim};
`;

export const PalettePanel = styled.div`
  ${glassPanelStrong};
  width: min(36rem, 90vw);
  max-height: 24rem;
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.global.radii.xl};
  overflow: hidden;
`;

export const PaletteInput = styled.input`
  ${typography('body')};
  width: 100%;
  padding: ${({ theme }) => theme.global.spacing.lg} ${({ theme }) => theme.global.spacing.xl};
  border: none;
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.semantic.colors.text.primary};
  font-size: ${({ theme }) => theme.global.fontSizes.md};

  &::placeholder {
    color: ${({ theme }) => theme.semantic.colors.text.muted};
  }
`;

export const ResultList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.global.spacing.xs};
  border-top: ${({ theme }) => theme.global.borderWidths.thin} solid
    ${({ theme }) => theme.semantic.colors.border.subtle};
`;

export const GroupLabel = styled.span`
  ${typography('caption')};
  display: block;
  padding: ${({ theme }) => theme.global.spacing.sm} ${({ theme }) => theme.global.spacing.md};
  color: ${({ theme }) => theme.semantic.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.global.letterSpacings.wide};
`;

export const ResultItem = styled.button`
  ${typography('body')};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.global.spacing.sm};
  width: 100%;
  padding: ${({ theme }) => theme.global.spacing.sm} ${({ theme }) => theme.global.spacing.md};
  border: none;
  background: ${({ $active, theme }) =>
    $active ? theme.semantic.colors.state.hoverSurface : 'transparent'};
  color: ${({ theme }) => theme.semantic.colors.text.primary};
  font-size: ${({ theme }) => theme.global.fontSizes.sm};
  text-align: left;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.global.radii.md};
  transition: background ${({ theme }) => theme.semantic.motion.fast};

  &:hover {
    background: ${({ theme }) => theme.semantic.colors.state.hoverSurface};
  }

  &:focus-visible { ${focusRingOnly}; }

  svg {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
    color: ${({ theme }) => theme.semantic.colors.text.muted};
  }
`;

export const Shortcut = styled.kbd`
  ${typography('caption')};
  margin-left: auto;
  padding: 0.125rem 0.375rem;
  font-family: ${({ theme }) => theme.global.fontFamilies.mono};
  font-size: ${({ theme }) => theme.global.fontSizes.xs};
  background: ${({ theme }) => theme.semantic.colors.background.subtle};
  border: ${({ theme }) => theme.global.borderWidths.thin} solid
    ${({ theme }) => theme.semantic.colors.border.subtle};
  border-radius: ${({ theme }) => theme.global.radii.sm};
  color: ${({ theme }) => theme.semantic.colors.text.muted};
`;
