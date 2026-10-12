'use client';

import { cx } from '@/lib/cx';
import styles from './Progress.module.scss';

const sizeClass = {
  sm: styles.sm,
  lg: styles.lg,
};

/**
 * Progress
 *
 * Determinate or indeterminate linear progress bar.
 *
 * @param {number} value - 0–100
 * @param {'sm'|'md'|'lg'} size
 * @param {string} label
 * @param {boolean} showValue
 * @param {boolean} indeterminate
 */
export default function Progress({
  value = 0,
  size = 'md',
  label,
  showValue = false,
  indeterminate = false,
  className,
  ...props
}) {
  const clamped = Math.min(Math.max(value, 0), 100);

  return (
    <div
      className={cx(styles.root, className)}
      role="progressbar"
      aria-valuenow={indeterminate ? undefined : clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label || 'Progress'}
      {...props}
    >
      {(label || showValue) && (
        <div className={styles.labelRow}>
          {label && <span className={styles.label}>{label}</span>}
          {showValue && !indeterminate && <span className={styles.value}>{clamped}%</span>}
        </div>
      )}
      <div className={cx(styles.track, sizeClass[size])}>
        <div
          className={cx(styles.fill, indeterminate && styles.indeterminate)}
          style={indeterminate ? undefined : { width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
