import styled from 'styled-components';
import { focusRingOnly, interactiveGlass } from '@/theme/mixins';

export const AccordionRoot = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: ${({ theme }) => theme.components.accordion.borderWidth} solid
    ${({ theme }) => theme.semantic.colors.border.subtle};
  border-radius: ${({ theme }) => theme.components.accordion.radius};
  background: ${({ theme }) => theme.semantic.colors.background.raised};
  overflow: hidden;
`;

export const Item = styled.div`
  & + & {
    border-top: ${({ theme }) => theme.components.accordion.borderWidth} solid
      ${({ theme }) => theme.semantic.colors.border.subtle};
  }
`;

export const Trigger = styled.button`
  ${interactiveGlass};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.global.spacing.md};
  width: 100%;
  padding: ${({ theme }) => theme.components.accordion.trigger.paddingY}
    ${({ theme }) => theme.components.accordion.trigger.paddingX};
  font-size: ${({ theme }) => theme.components.accordion.trigger.fontSize};
  font-weight: ${({ theme }) => theme.components.accordion.trigger.fontWeight};
  text-align: left;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.semantic.colors.text.primary};
  cursor: pointer;
  transition: background ${({ theme }) => theme.semantic.motion.fast};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.semantic.colors.state.hoverSurface};
  }

  &:focus-visible {
    ${focusRingOnly};
    /* ring sits inside the rounded container */
    box-shadow: inset 0 0 0 ${({ theme }) => theme.global.borderWidths.ring}
      ${({ theme }) => theme.semantic.colors.state.focusRing};
  }

  &:disabled {
    color: ${({ theme }) => theme.semantic.colors.text.disabled};
    cursor: not-allowed;
  }
`;

export const TriggerIcon = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  color: ${({ theme }) => theme.semantic.colors.text.muted};
  transition: transform ${({ theme }) => theme.semantic.motion.base};
  transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});

  svg {
    width: ${({ theme }) => theme.global.sizes.icon.md};
    height: ${({ theme }) => theme.global.sizes.icon.md};
  }
`;

/**
 * Height animation without a fixed max-height: the grid row animates from
 * 0fr to 1fr, so the panel expands to exactly its content height whatever
 * that turns out to be.
 */
export const PanelOuter = styled.div`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? '1fr' : '0fr')};
  transition: grid-template-rows ${({ theme }) => theme.semantic.motion.base};
`;

export const PanelInner = styled.div`
  overflow: hidden;
`;

export const PanelContent = styled.div`
  padding: 0 ${({ theme }) => theme.components.accordion.panel.paddingX}
    ${({ theme }) => theme.components.accordion.panel.paddingBottom};
  font-size: ${({ theme }) => theme.global.fontSizes.sm};
  line-height: ${({ theme }) => theme.global.lineHeights.relaxed};
  color: ${({ theme }) => theme.semantic.colors.text.secondary};
`;
