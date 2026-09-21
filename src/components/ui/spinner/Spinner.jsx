'use client';

import { StyledSpinner } from './Spinner.style';

/**
 * Indeterminate loading indicator. Inherits `currentColor`, so it works on any
 * surface and inside any button variant without extra props.
 *
 * @param {'sm'|'md'|'lg'} size
 * @param {string} label - accessible description of what is loading
 */
export default function Spinner({ size = 'md', label = 'Loading', ...props }) {
  return <StyledSpinner $size={size} role="status" aria-label={label} {...props} />;
}
