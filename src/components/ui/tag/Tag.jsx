'use client';

import { CloseIcon } from '@/components/icons';
import { useInteractiveMotion } from '@/hooks/useInteractiveMotion';
import { cx } from '@/lib/cx';
import styles from './Tag.module.scss';

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
  className,
  children,
  ...props
}) {
  const { ref, handlers } = useInteractiveMotion({ preset: 'chip' });

  return (
    <span
      ref={ref}
      className={cx(
        styles.root,
        styles[variant] || styles.neutral,
        styles[size] || styles.md,
        solid && styles.solid,
        className,
      )}
      {...handlers}
      {...props}
    >
      {dot && <span className={styles.dot} aria-hidden="true" />}
      {children}
      {onRemove && (
        <button
          type="button"
          className={styles.remove}
          onClick={onRemove}
          aria-label={typeof children === 'string' ? `Remove ${children}` : 'Remove'}
        >
          <CloseIcon />
        </button>
      )}
    </span>
  );
}
