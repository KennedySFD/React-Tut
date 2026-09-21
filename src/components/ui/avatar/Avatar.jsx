'use client';

import { useState } from 'react';
import { Fallback, StyledAvatar, StyledImage, StatusDot } from './Avatar.style';

/**
 * Avatar — user or entity image with an initials fallback.
 *
 * @param {string} src        - image URL
 * @param {string} alt        - accessible alt text
 * @param {string} name       - used to derive initials when no image loads
 * @param {'sm'|'md'|'lg'|'xl'} size
 * @param {'neutral'|'accent'} variant
 * @param {'online'|'offline'|'busy'|'away'} status - renders a status dot
 */
export default function Avatar({
  src,
  alt,
  name = '',
  size = 'md',
  variant = 'neutral',
  status,
  ...props
}) {
  const [imgError, setImgError] = useState(false);
  const showImage = src && !imgError;

  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <StyledAvatar $size={size} $variant={variant} {...props}>
      {showImage ? (
        <StyledImage
          src={src}
          alt={alt || name}
          onError={() => setImgError(true)}
        />
      ) : (
        <Fallback $size={size} aria-label={alt || name}>
          {initials || '?'}
        </Fallback>
      )}
      {status && <StatusDot $status={status} $size={size} aria-label={status} />}
    </StyledAvatar>
  );
}
