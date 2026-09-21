'use client';

import { StyledDivider } from './Divider.style';

/**
 * Divider — a visual separator between sections of content.
 *
 * @param {'horizontal'|'vertical'} orientation
 * @param {'subtle'|'default'|'strong'} weight - maps to border tokens
 * @param {string} label - optional centred label (only for horizontal)
 */
export default function Divider({
  orientation = 'horizontal',
  weight = 'default',
  label,
  ...props
}) {
  if (label && orientation === 'horizontal') {
    return (
      <StyledDivider
        role="separator"
        $orientation={orientation}
        $weight={weight}
        $hasLabel
        {...props}
      >
        <span>{label}</span>
      </StyledDivider>
    );
  }

  return (
    <StyledDivider
      role="separator"
      aria-orientation={orientation}
      $orientation={orientation}
      $weight={weight}
      {...props}
    />
  );
}
