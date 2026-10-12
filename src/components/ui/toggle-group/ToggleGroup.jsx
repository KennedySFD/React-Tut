'use client';

import { cx } from '@/lib/cx';
import styles from './ToggleGroup.module.scss';

/**
 * ToggleGroup
 *
 * Segmented mutually-exclusive buttons — like tabs without panels.
 *
 * @param {string} value - the currently selected value
 * @param {(value: string) => void} onChange
 * @param {Array<{value: string, label: string, icon?: Component}>} items
 */
export default function ToggleGroup({
  value,
  onChange,
  items = [],
  disabled = false,
  className,
  ...props
}) {
  return (
    <div role="group" className={cx(styles.root, className)} {...props}>
      {items.map((item) => {
        const Icon = item.icon;
        const active = value === item.value;
        return (
          <button
            key={item.value}
            className={cx(styles.item, active && styles.active)}
            onClick={() => onChange?.(item.value)}
            disabled={disabled}
            aria-pressed={active}
          >
            {Icon && <Icon />}
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
