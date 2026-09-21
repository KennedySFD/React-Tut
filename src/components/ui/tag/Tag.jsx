'use client';

import { CloseIcon } from '@/components/icons';
import { useInteractiveMotion } from '@/hooks/useInteractiveMotion';
import { Dot, RemoveButton, StyledTag } from './Tag.style';

/**
 * Tag — compact status or category label (also known as a badge or chip).
 *
 * @param {'neutral'|'accent'|'info'|'success'|'warning'|'danger'} variant
 * @param {'sm'|'md'} size
 * @param {boolean} solid   - filled treatment instead of the tinted surface
 * @param {boolean} dot     - leading status dot
 * @param {() => void} onRemove - renders a dismiss button when provided
 */
export default function Tag({
  variant = 'neutral',
  size = 'md',
  solid = false,
  dot = false,
  onRemove,
  children,
  ...props
}) {
  const { ref, handlers } = useInteractiveMotion({ preset: 'chip' });

  return (
    <StyledTag ref={ref} $variant={variant} $size={size} $solid={solid} {...handlers} {...props}>
      {dot && <Dot aria-hidden="true" />}
      {children}
      {onRemove && (
        <RemoveButton
          type="button"
          onClick={onRemove}
          aria-label={typeof children === 'string' ? `Remove ${children}` : 'Remove'}
        >
          <CloseIcon />
        </RemoveButton>
      )}
    </StyledTag>
  );
}
