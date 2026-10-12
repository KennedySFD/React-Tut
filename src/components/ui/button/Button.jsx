'use client';

import Spinner from '@/components/ui/spinner';
import { useInteractiveMotion } from '@/hooks/useInteractiveMotion';
import { cx } from '@/lib/cx';
import ButtonGlowLayer from './ButtonGlowLayer';
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
 * @param {boolean} shader - adds the WebGL light layer on top of the CSS ones
 *
 * States: hover, active, focus-visible, disabled, loading.
 *
 * Motion: lifts and sheens on hover, presses on the committed curve — all
 * from the shared `control` amplitude, so it matches every other control. A
 * plain-text label additionally ripples character by character; anything else
 * as children keeps the flat label lift, since only a string can be split.
 *
 * With `shader`, a WebGL layer joins the same stack: light pools under the
 * cursor and a ring leaves the point of contact on press. It is opt-in
 * because it costs a GL context while the control is being touched, and it
 * runs on the same gesture tokens as the CSS layers, so the two read as one
 * gesture rather than two effects that happen to fire together.
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
  shader = false,
  children,
  ...props
}) {
  const isInert = disabled || loading;
  const { ref, amp, handlers } = useInteractiveMotion({
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
      {shader && !isInert ? (
        <ButtonGlowLayer hostRef={ref} glow={amp.glow} />
      ) : null}

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
