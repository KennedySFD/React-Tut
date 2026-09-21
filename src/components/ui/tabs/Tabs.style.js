import styled, { css } from 'styled-components';
import { focusRingOnly, interactiveGlass } from '@/theme/mixins';

export const TabsRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.global.spacing.lg};
  width: 100%;
`;

export const TabList = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${({ theme, $variant }) =>
    $variant === 'pill' ? theme.components.tabs.gap : '0'};
  padding: ${({ theme, $variant }) => ($variant === 'pill' ? theme.global.spacing.xs : '0')};
  background: ${({ theme, $variant }) =>
    $variant === 'pill' ? theme.semantic.colors.background.sunken : 'transparent'};
  border-radius: ${({ theme, $variant }) =>
    $variant === 'pill' ? theme.global.radii.lg : '0'};
  border-bottom: ${({ theme, $variant }) =>
    $variant === 'underline'
      ? `${theme.global.borderWidths.thin} solid ${theme.semantic.colors.border.subtle}`
      : 'none'};
  overflow-x: auto;
`;

/**
 * A single indicator that travels to the selected tab, rather than each tab
 * drawing its own. GSAP animates its x and width on the shared `travel`
 * gesture — the same one the switch thumb and focus keyline use.
 *
 * In the underline variant it carries the dispersion gradient, which is what
 * visually ties the tab strip to the keylines elsewhere in the library.
 */
export const Indicator = styled.span`
  position: absolute;
  pointer-events: none;
  z-index: 0;
  /* Positioned by GSAP; hidden until it has been measured. */
  opacity: 0;
  left: 0;

  ${({ $variant, theme }) =>
    $variant === 'pill'
      ? css`
          top: ${theme.global.spacing.xs};
          bottom: ${theme.global.spacing.xs};
          border-radius: ${theme.components.tabs.tab.radius};
          background: ${theme.semantic.colors.background.raised};
          box-shadow: ${theme.semantic.shadows.xs};
        `
      : css`
          bottom: -${theme.global.borderWidths.thin};
          height: ${theme.components.tabs.indicatorWidth};
          border-radius: ${theme.global.radii.full};
          background: linear-gradient(
            90deg,
            ${theme.semantic.colors.dispersion.cyan} 0%,
            ${theme.semantic.colors.state.selectedBorder} 50%,
            ${theme.semantic.colors.dispersion.rose} 100%
          );
        `};
`;

export const Tab = styled.button`
  ${interactiveGlass};
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.global.spacing.sm};
  padding: ${({ theme }) => theme.components.tabs.tab.paddingY}
    ${({ theme }) => theme.components.tabs.tab.paddingX};
  font-size: ${({ theme }) => theme.components.tabs.tab.fontSize};
  font-weight: ${({ theme }) => theme.components.tabs.tab.fontWeight};
  white-space: nowrap;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.semantic.colors.text.secondary};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.components.tabs.tab.radius};
  transition: color ${({ theme }) => theme.semantic.motion.fast};

  &:hover:not(:disabled):not([aria-selected='true']) {
    color: ${({ theme }) => theme.semantic.colors.text.primary};
  }

  /* The selected tab only changes colour — the moving indicator does the rest */
  &[aria-selected='true'] {
    color: ${({ theme, $variant }) =>
      $variant === 'pill'
        ? theme.semantic.colors.text.primary
        : theme.semantic.colors.state.selectedText};
  }

  &:focus-visible {
    ${focusRingOnly};
  }

  &:disabled {
    color: ${({ theme }) => theme.semantic.colors.text.disabled};
    cursor: not-allowed;
  }
`;

export const Panel = styled.div`
  color: ${({ theme }) => theme.semantic.colors.text.secondary};
  font-size: ${({ theme }) => theme.global.fontSizes.sm};
  line-height: ${({ theme }) => theme.global.lineHeights.relaxed};

  &:focus-visible {
    ${focusRingOnly};
    border-radius: ${({ theme }) => theme.global.radii.md};
  }
`;
