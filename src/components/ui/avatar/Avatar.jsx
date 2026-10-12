'use client';

import { useState } from 'react';
import { cx } from '@/lib/cx';
import styles from './Avatar.module.scss';

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
  className,
  ...props
}) {
  const [imgError, setImgError] = useState(false);
  const showImage = src && !imgError;
  const sizeClass = styles[size] || styles.md;

  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={cx(styles.root, sizeClass, styles[variant] || styles.neutral, className)}
      {...props}
    >
      {showImage ? (
        <img
          className={styles.image}
          src={src}
          alt={alt || name}
          onError={() => setImgError(true)}
        />
      ) : (
        <span className={cx(styles.fallback, sizeClass)} aria-label={alt || name}>
          {initials || '?'}
        </span>
      )}
      {status && (
        <span
          className={cx(styles.status, sizeClass, styles[status] || styles.offline)}
          aria-label={status}
        />
      )}
    </div>
  );
}
