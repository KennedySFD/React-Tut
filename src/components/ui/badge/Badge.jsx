'use client';

import { BadgeDot, StyledBadge, Wrapper } from './Badge.style';

/**
 * Badge — a small count or status indicator, typically overlaid on another element.
 *
 * @param {number|string} count - the number to display; hidden when 0 unless showZero is true
 * @param {number} max          - counts above this show "max+" (e.g. "99+")
 * @param {boolean} dot         - renders a dot instead of a count
 * @param {boolean} showZero    - show the badge when count is 0
 * @param {'accent'|'danger'|'success'|'warning'|'neutral'} variant
 * @param {React.ReactNode} children - the element the badge attaches to
 */
export default function Badge({
  count = 0,
  max = 99,
  dot = false,
  showZero = false,
  variant = 'danger',
  children,
  ...props
}) {
  const num = typeof count === 'number' ? count : parseInt(count, 10) || 0;
  const hidden = !dot && num === 0 && !showZero;
  const label = num > max ? `${max}+` : `${num}`;

  return (
    <Wrapper {...props}>
      {children}
      {dot && !hidden ? (
        <BadgeDot $variant={variant} aria-label="notification" />
      ) : !hidden ? (
        <StyledBadge $variant={variant}>{label}</StyledBadge>
      ) : null}
    </Wrapper>
  );
}
