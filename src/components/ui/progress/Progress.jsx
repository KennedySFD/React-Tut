'use client';

import { ProgressRoot, Track, Fill, LabelRow, ProgressLabel, ProgressValue } from './Progress.style';

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
  ...props
}) {
  const clamped = Math.min(Math.max(value, 0), 100);

  return (
    <ProgressRoot
      role="progressbar"
      aria-valuenow={indeterminate ? undefined : clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label || 'Progress'}
      {...props}
    >
      {(label || showValue) && (
        <LabelRow>
          {label && <ProgressLabel>{label}</ProgressLabel>}
          {showValue && !indeterminate && <ProgressValue>{clamped}%</ProgressValue>}
        </LabelRow>
      )}
      <Track $size={size}>
        <Fill $value={clamped} $indeterminate={indeterminate} />
      </Track>
    </ProgressRoot>
  );
}
