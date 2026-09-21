import styled from 'styled-components';
import { fieldBase, focusKeyline } from '@/theme/mixins';

/**
 * The bordered surface. Carries `fieldBase`, so its rest / hover / focus /
 * error / disabled treatment is the same one Select, SearchBar and Textarea
 * use — there is no second definition of "what a focused field looks like".
 */
export const InputShell = styled.div`
  ${fieldBase};
  /* The dispersion keyline that draws in on focus; driven by useFieldMotion */
  position: relative;
  ${focusKeyline};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.components.field.gap};
  height: ${({ theme, $size }) => theme.components.field.sizes[$size || 'md'].height};
  padding: 0 ${({ theme, $size }) => theme.components.field.sizes[$size || 'md'].paddingX};
`;

/** The native input, stripped bare — the shell owns all the visuals. */
export const BareInput = styled.input`
  flex: 1;
  min-width: 0;
  height: 100%;
  padding: 0;
  border: none;
  outline: none;
  background: transparent;
  color: inherit;
  font: inherit;

  &::placeholder {
    color: ${({ theme }) => theme.semantic.colors.text.placeholder};
  }

  &:disabled {
    cursor: not-allowed;
    color: ${({ theme }) => theme.semantic.colors.text.disabled};
    -webkit-text-fill-color: ${({ theme }) => theme.semantic.colors.text.disabled};
  }
`;

export const IconSlot = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${({ theme }) => theme.semantic.colors.text.muted};

  svg {
    width: ${({ theme, $size }) => theme.components.field.sizes[$size || 'md'].iconSize};
    height: ${({ theme, $size }) => theme.components.field.sizes[$size || 'md'].iconSize};
  }
`;
