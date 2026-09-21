import styled from 'styled-components';
import { fieldBase, focusKeyline } from '@/theme/mixins';

/**
 * A textarea is focusable itself, so `fieldBase` can sit directly on the
 * element — no shell wrapper needed. Same mixin as Input, so the two match.
 *
 * The focus keyline needs a positioned parent it can attach to, which a bare
 * textarea cannot provide (replaced elements have no pseudo-elements), so the
 * wrapper below carries it.
 */
export const TextareaShell = styled.div`
  position: relative;
  width: 100%;
  ${focusKeyline};
`;

export const StyledTextarea = styled.textarea`
  ${fieldBase};
  display: block;
  padding: ${({ theme }) => theme.global.spacing.md}
    ${({ theme, $size }) => theme.components.field.sizes[$size || 'md'].paddingX};
  line-height: ${({ theme }) => theme.semantic.typography.body.lineHeight};
  resize: ${({ $resize }) => $resize};
  min-height: 5rem;
`;
