import styled from 'styled-components';
import { typography } from '@/theme/mixins';

export const FieldRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.components.field.label.gap};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
`;

export const FieldLabel = styled.label`
  ${typography('label')};
  color: ${({ theme, $disabled }) =>
    $disabled ? theme.semantic.colors.text.disabled : theme.semantic.colors.text.secondary};

  span[data-required] {
    color: ${({ theme }) => theme.semantic.colors.state.errorText};
    margin-left: ${({ theme }) => theme.global.spacing.xxs};
  }
`;

export const HelpText = styled.span`
  ${typography('caption')};
  color: ${({ theme, $isError }) =>
    $isError ? theme.semantic.colors.state.errorText : theme.semantic.colors.text.muted};
`;
