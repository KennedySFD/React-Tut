'use client';

import { cx } from '@/lib/cx';
import styles from './Divider.module.scss';

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
  className,
  ...props
}) {
  const tone = styles[weight] || styles.default;

  if (label && orientation === 'horizontal') {
    return (
      <div
        role="separator"
        className={cx(styles.root, styles.hasLabel, tone, className)}
        {...props}
      >
        <span>{label}</span>
      </div>
    );
  }

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cx(
        styles.root,
        orientation === 'vertical' ? styles.vertical : styles.horizontal,
        tone,
        className,
      )}
      {...props}
    />
  );
}
