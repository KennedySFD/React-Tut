import styled, { css } from 'styled-components';
import { glassPanelStrong } from '@/theme/mixins';

export const TooltipWrapper = styled.span`
  position: relative;
  display: inline-flex;
`;

/**
 * Placement is CSS-only — no positioning library. That keeps the component
 * dependency-free; the trade-off is no automatic flipping near a viewport
 * edge, which is fine for the short labels a tooltip should carry.
 *
 * The anchor owns the placement (including the `translate(-50%)` centring)
 * and the gap, expressed as padding. The bubble inside it is left with a
 * clean transform for GSAP to animate — the two must not share one, or the
 * reveal would wipe out the centring.
 */
const placements = {
  top: css`
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding-bottom: ${({ theme }) => theme.components.tooltip.offset};
  `,
  bottom: css`
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding-top: ${({ theme }) => theme.components.tooltip.offset};
  `,
  left: css`
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    padding-right: ${({ theme }) => theme.components.tooltip.offset};
  `,
  right: css`
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    padding-left: ${({ theme }) => theme.components.tooltip.offset};
  `,
};

export const TooltipAnchor = styled.span`
  position: absolute;
  z-index: ${({ theme }) => theme.global.zIndex.tooltip};
  pointer-events: none;

  ${({ $placement }) => placements[$placement] ?? placements.top};
`;

export const Bubble = styled.span`
  ${glassPanelStrong};
  display: block;
  width: max-content;
  max-width: ${({ theme }) => theme.components.tooltip.maxWidth};
  padding: ${({ theme }) => theme.components.tooltip.paddingY}
    ${({ theme }) => theme.components.tooltip.paddingX};
  font-size: ${({ theme }) => theme.components.tooltip.fontSize};
  line-height: ${({ theme }) => theme.global.lineHeights.snug};
  text-align: center;
  color: ${({ theme }) => theme.semantic.colors.text.primary};
  border-radius: ${({ theme }) => theme.components.tooltip.radius};
  /* The reveal tween brings this in; see useRevealMotion */
  opacity: 0;
`;
