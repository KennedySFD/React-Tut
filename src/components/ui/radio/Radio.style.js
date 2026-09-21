import styled from 'styled-components';
import { interactiveGlass, typography, visuallyHidden } from '@/theme/mixins';

export const HiddenInput = styled.input`
  ${visuallyHidden};
`;

export const RadioRoot = styled.label`
  display: inline-flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.components.choice.gap};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ theme, $disabled }) => ($disabled ? theme.global.opacities.disabled : 1)};

  input:focus-visible + [data-box] {
    border-color: ${({ theme }) => theme.semantic.colors.state.focusBorder};
    box-shadow: 0 0 0 ${({ theme }) => theme.global.borderWidths.ring}
      ${({ theme }) => theme.semantic.colors.state.focusRing};
  }

  &:hover [data-box] {
    border-color: ${({ theme, $disabled, $checked }) => {
      if ($disabled) return theme.semantic.colors.state.disabledBorder;
      if ($checked) return theme.semantic.colors.accent.hover;
      return theme.semantic.colors.state.hoverBorder;
    }};
  }
`;

/** Same tokens as the Checkbox box — only the radius and the mark differ. */
export const Circle = styled.span`
  ${interactiveGlass};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: ${({ theme, $size }) => theme.components.choice.sizes[$size || 'md'].box};
  height: ${({ theme, $size }) => theme.components.choice.sizes[$size || 'md'].box};
  margin-top: 0.0625rem;
  border: ${({ theme }) => theme.components.choice.borderWidth} solid
    ${({ theme, $checked, $hasError }) => {
      if ($hasError) return theme.semantic.colors.state.errorBorder;
      if ($checked) return theme.semantic.colors.accent.default;
      return theme.semantic.colors.border.default;
    }};
  border-radius: ${({ theme }) => theme.global.radii.full};
  background: ${({ theme }) => theme.semantic.colors.background.raised};
  transition: border-color ${({ theme }) => theme.semantic.motion.fast},
    box-shadow ${({ theme }) => theme.semantic.motion.fast};
`;

/** Scale is driven by useStateMotion, matching the Checkbox tick exactly. */
export const Dot = styled.span`
  width: 50%;
  height: 50%;
  border-radius: ${({ theme }) => theme.global.radii.full};
  background: ${({ theme }) => theme.semantic.colors.accent.default};
  opacity: 0;
  transform: scale(0.3);
`;

export const LabelText = styled.span`
  ${typography('body')};
  font-size: ${({ theme, $size }) => theme.components.choice.sizes[$size || 'md'].font};
  color: ${({ theme }) => theme.semantic.colors.text.primary};
`;

export const Description = styled.span`
  ${typography('caption')};
  display: block;
  color: ${({ theme }) => theme.semantic.colors.text.muted};
`;

export const TextGroup = styled.span`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.global.spacing.xxs};
`;

export const RadioGroupRoot = styled.div`
  display: flex;
  flex-direction: ${({ $orientation }) => ($orientation === 'horizontal' ? 'row' : 'column')};
  flex-wrap: wrap;
  gap: ${({ theme, $orientation }) =>
    $orientation === 'horizontal' ? theme.global.spacing.xl : theme.global.spacing.md};
`;
