'use client';

import { StyledSkeleton } from './Skeleton.style';

/**
 * Skeleton — a pulsing placeholder for content that is still loading.
 *
 * @param {'text'|'circle'|'rect'} variant
 * @param {string} width   - CSS width (default: '100%')
 * @param {string} height  - CSS height (default depends on variant)
 * @param {number} lines   - for variant="text", render multiple lines
 */
export default function Skeleton({
  variant = 'text',
  width,
  height,
  lines = 1,
  ...props
}) {
  if (variant === 'text' && lines > 1) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: width || '100%' }}>
        {Array.from({ length: lines }, (_, i) => (
          <StyledSkeleton
            key={i}
            $variant="text"
            $width={i === lines - 1 ? '75%' : '100%'}
            $height={height}
            {...props}
          />
        ))}
      </div>
    );
  }

  return <StyledSkeleton $variant={variant} $width={width} $height={height} {...props} />;
}
