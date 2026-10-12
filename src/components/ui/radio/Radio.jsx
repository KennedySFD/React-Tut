'use client';

import { useId } from 'react';
import { useInteractiveMotion } from '@/hooks/useInteractiveMotion';
import { useStateMotion } from '@/hooks/useStateMotion';
import { cx } from '@/lib/cx';
import styles from './Radio.module.scss';

/**
 * Radio — one option within a group. Radios sharing a `name` are mutually
 * exclusive, which the browser handles natively.
 *
 * States: hover, focus, checked, disabled, error.
 */
export default function Radio({
  label,
  description,
  name,
  value,
  checked = false,
  onChange,
  size = 'md',
  disabled = false,
  error = false,
  id,
  className,
  ...props
}) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const { ref: circleRef, handlers } = useInteractiveMotion({ preset: 'choice', disabled });
  const dotRef = useStateMotion(checked, {
    on: { scale: 1, opacity: 1 },
    off: { scale: 0.3, opacity: 0 },
    motion: 'hover',
  });

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
      {...handlers}
    >
      <input
        id={inputId}
        className={styles.hidden}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        aria-invalid={error || undefined}
        aria-describedby={description ? `${inputId}-description` : undefined}
        {...props}
      />

      <span
        ref={circleRef}
        data-box
        data-invalid={error || undefined}
        className={styles.circle}
        aria-hidden="true"
      >
        <span className={styles.dot} ref={dotRef} />
      </span>

      {(label || description) && (
        <span className={styles.text}>
          {label && <span className={styles.label}>{label}</span>}
          {description && (
            <span className={styles.description} id={`${inputId}-description`}>
              {description}
            </span>
          )}
        </span>
      )}
    </label>
  );
}
