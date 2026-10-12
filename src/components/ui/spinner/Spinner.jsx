'use client';

import { cx } from '@/lib/cx';
import styles from './Spinner.module.scss';

/**
 * Indeterminate loading indicator. Inherits `currentColor`, so it works on any
 * surface and inside any button variant without extra props.
 *
 * @param {'sm'|'md'|'lg'} size
 * @param {string} label - accessible description of what is loading
 */
export default function Spinner({ size = 'md', label = 'Loading', className, ...props }) {
  return (
    <span
      className={cx(styles.root, styles[size] || styles.md, className)}
      role="status"
      aria-label={label}
      {...props}
    />
  );
}
