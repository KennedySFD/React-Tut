import styled from 'styled-components';
import { interactiveGlass, typography, visuallyHidden } from '@/theme/mixins';

/**
 * The native input stays in the DOM (hidden) so the control keeps real
 * keyboard, form and screen-reader behaviour; the visible box is drawn beside
 * it and driven by React props.
 */
export const HiddenInput = styled.input`
  ${visuallyHidden};
`;

export const CheckboxRoot = styled.label`
  display: inline-flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.components.choice.gap};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ theme, $disabled }) => ($disabled ? theme.global.opacities.disabled : 1)};

  /* Focus ring is applied to the visible box when the hidden input is focused,
     using the same token every other control uses. */
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

export const Box = styled.span`
  ${interactiveGlass};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: ${({ theme, $size }) => theme.components.choice.sizes[$size || 'md'].box};
  height: ${({ theme, $size }) => theme.components.choice.sizes[$size || 'md'].box};
  /* optical alignment with the first line of the label */
  margin-top: 0.0625rem;
  border: ${({ theme }) => theme.components.choice.borderWidth} solid
    ${({ theme, $checked, $hasError }) => {
      if ($hasError) return theme.semantic.colors.state.errorBorder;
      if ($checked) return theme.semantic.colors.accent.default;
      return theme.semantic.colors.border.default;
    }};
  border-radius: ${({ theme }) => theme.components.choice.radius};
  background: ${({ theme, $checked }) =>
    $checked ? theme.semantic.colors.accent.default : theme.semantic.colors.background.raised};
  color: ${({ theme }) => theme.semantic.colors.accent.onAccent};
  transition: background ${({ theme }) => theme.semantic.motion.fast},
    border-color ${({ theme }) => theme.semantic.motion.fast},
    box-shadow ${({ theme }) => theme.semantic.motion.fast};

  /* Push the dispersion ring outward so it overlays the border instead of
     nesting inside it — prevents the "box in a box" double-border. */
  &::before {
    inset: calc(-1 * ${({ theme }) => theme.components.choice.borderWidth});
  }

  svg {
    width: 80%;
    height: 80%;
    stroke-width: 3;
  }
`;

/**
 * Wraps the tick so it can scale in on its own, independently of the box.
 * Kept mounted at zero scale so it has something to animate out from.
 */
export const Mark = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
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
