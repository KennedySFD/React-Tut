import styled from 'styled-components';
import { typography, visuallyHidden } from '@/theme/mixins';

export const HiddenInput = styled.input`
  ${visuallyHidden};
`;

export const SwitchRoot = styled.label`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.components.switchControl.gap};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ theme, $disabled }) => ($disabled ? theme.global.opacities.disabled : 1)};

  input:focus-visible + [data-track] {
    box-shadow: 0 0 0 ${({ theme }) => theme.global.borderWidths.ring}
      ${({ theme }) => theme.semantic.colors.state.focusRing};
  }

  &:hover [data-track] {
    background: ${({ theme, $checked, $disabled }) => {
      if ($disabled) {
        return $checked
          ? theme.semantic.colors.accent.default
          : theme.semantic.colors.border.default;
      }
      return $checked
        ? theme.semantic.colors.accent.hover
        : theme.semantic.colors.border.strong;
    }};
  }
`;

export const Track = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  width: ${({ theme, $size }) => theme.components.switchControl.sizes[$size || 'md'].width};
  height: ${({ theme, $size }) => theme.components.switchControl.sizes[$size || 'md'].height};
  padding: ${({ theme }) => theme.components.switchControl.padding};
  border-radius: ${({ theme }) => theme.components.switchControl.radius};
  background: ${({ theme, $checked }) =>
    $checked ? theme.semantic.colors.accent.default : theme.semantic.colors.border.default};
  transition: background ${({ theme }) => theme.semantic.motion.base},
    box-shadow ${({ theme }) => theme.semantic.motion.fast};
`;

export const Thumb = styled.span`
  width: ${({ theme, $size }) => theme.components.switchControl.sizes[$size || 'md'].thumb};
  height: ${({ theme, $size }) => theme.components.switchControl.sizes[$size || 'md'].thumb};
  border-radius: ${({ theme }) => theme.global.radii.full};
  background: ${({ theme }) => theme.global.colors.white};
  box-shadow: ${({ theme }) => theme.global.shadows.light.sm};
  /* Travel = track width − thumb − both sides of padding */
  transform: translateX(
    ${({ theme, $size, $checked }) => {
      if (!$checked) return '0px';
      const control = theme.components.switchControl;
      const size = control.sizes[$size || 'md'];
      return `calc(${size.width} - ${size.thumb} - 2 * ${control.padding})`;
    }}
  );
  transition: transform ${({ theme }) => theme.semantic.motion.base};
`;

export const LabelText = styled.span`
  ${typography('body')};
  font-size: ${({ theme }) => theme.global.fontSizes.sm};
  color: ${({ theme }) => theme.semantic.colors.text.primary};
`;
