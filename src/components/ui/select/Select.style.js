import styled from 'styled-components';
import { fieldBase, focusKeyline, glassPanel, truncate } from '@/theme/mixins';

export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

/**
 * The closed dropdown. Same `fieldBase` as Input, which is the point: a user
 * should not be able to tell a closed Select from a text field — including
 * the keyline that draws in when it takes focus.
 */
export const SelectTrigger = styled.button`
  ${fieldBase};
  position: relative;
  ${focusKeyline};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.components.field.gap};
  height: ${({ theme, $size }) => theme.components.field.sizes[$size || 'md'].height};
  padding: 0 ${({ theme, $size }) => theme.components.field.sizes[$size || 'md'].paddingX};
  text-align: left;
  cursor: pointer;
`;

export const TriggerValue = styled.span`
  ${truncate};
  color: ${({ theme, $isPlaceholder }) =>
    $isPlaceholder ? theme.semantic.colors.text.placeholder : theme.semantic.colors.text.primary};
`;

export const Chevron = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  color: ${({ theme }) => theme.semantic.colors.text.muted};
  transition: transform ${({ theme }) => theme.semantic.motion.fast};
  transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});

  svg {
    width: ${({ theme, $size }) => theme.components.field.sizes[$size || 'md'].iconSize};
    height: ${({ theme, $size }) => theme.components.field.sizes[$size || 'md'].iconSize};
  }
`;

/**
 * The open menu: a frosted pane. Its entrance is a GSAP reveal rather than a
 * CSS keyframe, so it shares one curve and one travel distance with the modal
 * and the tooltip. See useRevealMotion.
 */
export const Menu = styled.ul`
  ${glassPanel};
  position: absolute;
  top: calc(100% + ${({ theme }) => theme.global.spacing.xs});
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.global.zIndex.dropdown};
  max-height: ${({ theme }) => theme.components.menu.maxHeight};
  overflow-y: auto;
  padding: ${({ theme }) => theme.components.menu.padding};
  margin: 0;
  list-style: none;
  border-radius: ${({ theme }) => theme.components.menu.radius};
  /* The reveal animates opacity; without this the first frame would flash. */
  opacity: 0;
`;

export const Option = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.global.spacing.sm};
  padding: ${({ theme }) => theme.components.menu.option.paddingY}
    ${({ theme }) => theme.components.menu.option.paddingX};
  font-size: ${({ theme }) => theme.components.menu.option.fontSize};
  color: ${({ theme }) => theme.semantic.colors.text.primary};
  border-radius: ${({ theme }) => theme.components.menu.option.radius};
  cursor: pointer;
  transition: background ${({ theme }) => theme.semantic.motion.fast},
    color ${({ theme }) => theme.semantic.motion.fast};

  /* Keyboard-highlighted option — same hover token used across the library */
  &[data-active='true'] {
    background: ${({ theme }) => theme.semantic.colors.state.hoverSurface};
  }

  &:hover:not([aria-disabled='true']) {
    background: ${({ theme }) => theme.semantic.colors.state.hoverSurface};
  }

  /* Selected option — shares selectedSurface with Tabs, Checkbox and Radio */
  &[aria-selected='true'] {
    background: ${({ theme }) => theme.semantic.colors.state.selectedSurface};
    color: ${({ theme }) => theme.semantic.colors.state.selectedText};
    font-weight: ${({ theme }) => theme.global.fontWeights.medium};
  }

  &[aria-disabled='true'] {
    color: ${({ theme }) => theme.semantic.colors.text.disabled};
    cursor: not-allowed;
  }

  svg {
    width: ${({ theme }) => theme.global.sizes.icon.md};
    height: ${({ theme }) => theme.global.sizes.icon.md};
    flex-shrink: 0;
  }
`;

export const EmptyState = styled.li`
  padding: ${({ theme }) => theme.components.menu.option.paddingY}
    ${({ theme }) => theme.components.menu.option.paddingX};
  font-size: ${({ theme }) => theme.components.menu.option.fontSize};
  color: ${({ theme }) => theme.semantic.colors.text.muted};
`;
