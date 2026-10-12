'use client';

import { useId } from 'react';
import { cx } from '@/lib/cx';
import styles from './Switch.module.scss';

/**
 * Switch — an on/off toggle. Use for settings that apply immediately;
 * use Checkbox for values submitted with a form.
 *
 * @param {'sm'|'md'} size
 *
 * States: hover, focus, checked, disabled.
 */
export default function Switch({
  label,
  checked = false,
  onChange,
  size = 'md',
  disabled = false,
  id,
  className,
  ...props
}) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <label
      htmlFor={inputId}
      className={cx(
        styles.root,
        styles[size],
        disabled && styles.disabled,
        checked && styles.checked,
        className,
      )}
    >
      <input
        id={inputId}
        className={styles.hidden}
        type="checkbox"
        role="switch"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        {...props}
      />

      <span className={styles.track} data-track aria-hidden="true">
        <span className={styles.thumb} />
      </span>

      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
}
