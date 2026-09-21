'use client';

import Spinner from '@/components/ui/spinner';
import { useInteractiveMotion } from '@/hooks/useInteractiveMotion';
import { Label, StyledButton } from './Button.style';

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
 * Motion: lifts and sheens on hover, presses on the committed curve — all
 * from the shared `control` amplitude, so it matches every other control.
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
  const { ref, handlers } = useInteractiveMotion({ preset: 'control', disabled: isInert });

  const spinnerSize = size === 'lg' ? 'md' : 'sm';

  return (
    <StyledButton
      ref={ref}
      type="button"
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $iconOnly={iconOnly}
      disabled={isInert}
      aria-busy={loading || undefined}
      {...handlers}
      {...props}
    >
      <Label data-motion-label>
        {loading ? <Spinner size={spinnerSize} label="" /> : iconLeft}
        {children}
        {!loading && iconRight}
      </Label>
    </StyledButton>
  );
}
