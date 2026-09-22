import styled from 'styled-components';
import { glassPanelStrong, focusRingOnly, typography } from '@/theme/mixins';

export const MenuRoot = styled.div`
  position: relative;
  display: inline-flex;
`;

export const MenuPanel = styled.div`
  ${glassPanelStrong};
  position: absolute;
  top: calc(100% + ${({ theme }) => theme.global.spacing.xs});
  ${({ $align }) => ($align === 'right' ? 'right: 0;' : 'left: 0;')};
  z-index: ${({ theme }) => theme.global.zIndex.dropdown};
  min-width: 12rem;
  max-height: ${({ theme }) => theme.components.menu.maxHeight};
  overflow-y: auto;
  padding: ${({ theme }) => theme.components.menu.padding};
  border-radius: ${({ theme }) => theme.components.menu.radius};
`;

export const MenuItem = styled.button`
  ${typography('body')};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.global.spacing.sm};
  width: 100%;
  padding: ${({ theme }) => theme.components.menu.option.paddingY}
    ${({ theme }) => theme.components.menu.option.paddingX};
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.semantic.colors.text.primary};
  font-size: ${({ theme }) => theme.global.fontSizes.sm};
  text-align: left;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.components.menu.option.radius};
  transition: background ${({ theme }) => theme.semantic.motion.fast},
    color ${({ theme }) => theme.semantic.motion.fast};

  &:hover {
    background: ${({ theme }) => theme.semantic.colors.state.hoverSurface};
  }

  &:focus-visible {
    ${focusRingOnly};
  }

  &[data-danger] {
    color: ${({ theme }) => theme.semantic.colors.feedback.danger.text};

    &:hover {
      background: ${({ theme }) => theme.semantic.colors.feedback.danger.surface};
    }
  }

  &:disabled {
    opacity: ${({ theme }) => theme.global.opacities.disabled};
    pointer-events: none;
  }

  svg {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
  }
`;

export const MenuSeparator = styled.div`
  height: 1px;
  margin: ${({ theme }) => theme.global.spacing.xs} 0;
  background: ${({ theme }) => theme.semantic.colors.border.subtle};
`;

export const MenuLabel = styled.span`
  ${typography('caption')};
  display: block;
  padding: ${({ theme }) => theme.global.spacing.sm}
    ${({ theme }) => theme.components.menu.option.paddingX};
  color: ${({ theme }) => theme.semantic.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.global.letterSpacings.wide};
`;
