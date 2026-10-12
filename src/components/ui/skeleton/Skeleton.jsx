'use client';

import { cx } from '@/lib/cx';
import styles from './Skeleton.module.scss';

/**
 * Skeleton — a pulsing placeholder for content that is still loading.
 *
 * @param {'text'|'circle'|'rect'} variant
 * @param {string} width   - CSS width (default: '100%')
 * @param {string} height  - CSS height (default depends on variant)
 * @param {number} lines   - for variant="text", render multiple lines
 */
function SkeletonBar({ variant = 'text', width, height, className, style, ...props }) {
  return (
    <div
      className={cx(styles.root, styles[variant] || styles.text, className)}
      style={{
        ...(width ? { width } : null),
        ...(height ? { height } : null),
        ...style,
      }}
      {...props}
    />
  );
}

export default function Skeleton({
  variant = 'text',
  width,
  height,
  lines = 1,
  className,
  style,
  ...props
}) {
  if (variant === 'text' && lines > 1) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: width || '100%' }}>
        {Array.from({ length: lines }, (_, i) => (
          <SkeletonBar
            key={i}
            variant="text"
            width={i === lines - 1 ? '75%' : '100%'}
            height={height}
            className={className}
            style={style}
            {...props}
          />
        ))}
      </div>
    );
  }

  return (
    <SkeletonBar
      variant={variant}
      width={width}
      height={height}
      className={className}
      style={style}
      {...props}
    />
  );
}
