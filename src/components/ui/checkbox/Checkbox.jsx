'use client';

import { useEffect, useId, useRef } from 'react';
import { CheckIcon, MinusIcon } from '@/components/icons';
import { useInteractiveMotion } from '@/hooks/useInteractiveMotion';
import { useStateMotion } from '@/hooks/useStateMotion';
import { cx } from '@/lib/cx';
import styles from './Checkbox.module.scss';

/**
 * Checkbox
 *
 * @param {string} label
 * @param {string} description - optional second line under the label
 * @param {boolean} checked
 * @param {boolean} indeterminate - the "some selected" state
 * @param {'sm'|'md'} size
 *
 * States: hover, focus, checked, indeterminate, disabled, error.
 *
 * Motion: the box takes the shared hover and press gestures at the `choice`
 * amplitude; the tick pops in separately so the mark reads as landing in the
 * box rather than appearing with it.
 */
export default function Checkbox({
  label,
  description,
  checked = false,
  indeterminate = false,
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
  const inputRef = useRef(null);

  const isMarked = checked || indeterminate;

  // `indeterminate` is a DOM property, not an attribute — it can only be set
  // imperatively.
  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  // Hover/press live on the box; the label is the trigger surface
  const { ref: boxRef, handlers } = useInteractiveMotion({ preset: 'choice', disabled });
  const markRef = useStateMotion(isMarked, {
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
        isMarked && styles.checked,
        className,
      )}
      {...handlers}
    >
      <input
        ref={inputRef}
        id={inputId}
        className={styles.hidden}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        aria-invalid={error || undefined}
        aria-describedby={description ? `${inputId}-description` : undefined}
        {...props}
      />

      <span
        ref={boxRef}
        data-box
        data-invalid={error || undefined}
        className={styles.box}
        aria-hidden="true"
      >
        <span className={styles.mark} ref={markRef}>
          {indeterminate ? <MinusIcon /> : <CheckIcon />}
        </span>
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
