'use client';

import Spinner from '@/components/ui/spinner';
import { useInteractiveMotion } from '@/hooks/useInteractiveMotion';
import { cx } from '@/lib/cx';
import ButtonLabelWave from './ButtonLabelWave';
import styles from './Button.module.scss';

/**
 * Button
 *
 * @param {'primary'|'secondary'|'tertiary'|'ghost'|'danger'} variant
 * @param {'sm'|'md'|'lg'} size
 * @param {boolean} fullWidth - stretch to the width of the container
 * @param {boolean} loading   - swaps the leading icon for a spinner and blocks input
 * @param {boolean} iconOnly  - square button, `children` should then be an icon
 * @param {React.ReactNode} iconLeft
 * @param {React.ReactNode} iconRight
 *
 * States: hover, active, focus-visible, disabled, loading.
 *
 * Motion: lifts on hover, presses on the committed curve — all from the
 * shared `control` amplitude, so it matches every other control. A
 * plain-text label additionally ripples character by character; anything else
 * as children keeps the flat label lift, since only a string can be split.
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  iconOnly = false,
  iconLeft,
  iconRight,
  disabled = false,
  children,
  ...props
}) {
  const isInert = disabled || loading;
  const { ref, handlers } = useInteractiveMotion({
    preset: 'control',
    disabled: isInert,
  });

  const spinnerSize = size === 'lg' ? 'md' : 'sm';

  return (
    <button
      ref={ref}
      type="button"
      className={cx(
        styles.root,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        iconOnly && styles.iconOnly,
      )}
      disabled={isInert}
      aria-busy={loading || undefined}
      {...handlers}
      {...props}
    >
      <span className={styles.label} data-motion-label>
        {loading ? <Spinner size={spinnerSize} label="" /> : iconLeft}
        {typeof children === 'string' && !isInert ? (
          <ButtonLabelWave text={children} hostRef={ref} />
        ) : (
          children
        )}
        {!loading && iconRight}
      </span>
    </button>
  );
}
