import styled from 'styled-components';
import { focusRingOnly, glassPanelStrong, typography } from '@/theme/mixins';

/**
 * The scrim also carries a light blur, so the page behind the dialog reads as
 * out-of-focus depth rather than as a flat dark sheet. Both the overlay fade
 * and the dialog reveal are GSAP tweens — see useRevealMotion.
 */
export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.global.zIndex.modal};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.global.spacing.xl};
  background: ${({ theme }) => theme.semantic.colors.background.scrim};
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  opacity: 0;
`;

export const Dialog = styled.div`
  ${glassPanelStrong};
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${({ theme, $size }) => theme.components.modal.widths[$size || 'md']};
  max-height: calc(100vh - ${({ theme }) => theme.global.spacing.xxxl});
  border-radius: ${({ theme }) => theme.components.modal.radius};
  outline: none;
  opacity: 0;
`;

export const Header = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.global.spacing.lg};
  padding: ${({ theme }) => theme.components.modal.padding};
  padding-bottom: ${({ theme }) => theme.global.spacing.md};
`;

export const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.global.spacing.xs};
`;

export const Title = styled.h2`
  ${typography('subheading')};
  color: ${({ theme }) => theme.semantic.colors.text.primary};
`;

export const Subtitle = styled.p`
  ${typography('caption')};
  color: ${({ theme }) => theme.semantic.colors.text.muted};
`;

export const Body = styled.div`
  padding: 0 ${({ theme }) => theme.components.modal.padding};
  overflow-y: auto;
  color: ${({ theme }) => theme.semantic.colors.text.secondary};
  font-size: ${({ theme }) => theme.global.fontSizes.sm};
  line-height: ${({ theme }) => theme.global.lineHeights.relaxed};
`;

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.global.spacing.sm};
  padding: ${({ theme }) => theme.components.modal.padding};
  padding-top: ${({ theme }) => theme.global.spacing.lg};
`;

export const CloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: ${({ theme }) => theme.global.spacing.xs};
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
    width: ${({ theme }) => theme.global.sizes.icon.lg};
    height: ${({ theme }) => theme.global.sizes.icon.lg};
  }
`;
