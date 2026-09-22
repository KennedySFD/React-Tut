import styled from 'styled-components';
import { fieldBase, fieldGlass, focusKeyline } from '@/theme/mixins';

/**
 * A textarea is focusable itself, so `fieldBase` can sit directly on the
 * element — no shell wrapper needed. Same mixin as Input, so the two match.
 *
 * The focus keyline needs a positioned parent it can attach to, which a bare
 * textarea cannot provide (replaced elements have no pseudo-elements), so the
 * wrapper below carries it.
 */
export const TextareaShell = styled.div`
  width: 100%;
  ${fieldGlass};
  /* The border lives on the textarea, not on this wrapper, so the wrapper's
     box already *is* the border box the keyline has to trace — nothing to
     pull outward. It does need the radius, which it has none of its own. */
  --ring-inset: 0px;
  border-radius: ${({ theme }) => theme.components.field.radius};
  ${focusKeyline};

  /*
   * Everywhere else the keyline can sit behind the content, because the shell
   * is what paints the surface. Here the textarea paints its own opaque
   * background on top of the wrapper, so the keyline has to go above it or it
   * is never seen. It is pointer-events: none, so it still never comes between
   * the cursor and the text.
   */
  &::before {
    z-index: 1;
  }
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
