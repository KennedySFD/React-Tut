'use client';

import { cx } from '@/lib/cx';
import styles from './Field.module.scss';

/**
 * Field — the shared chrome around a form control: label, the control itself,
 * and one line of helper or error text.
 *
 * Input, Textarea, Select and SearchBar all compose this, so the label
 * typography, the spacing and the error colour are defined exactly once.
 * (Equivalent to FormControl in MUI / Chakra.)
 *
 * @param {string} label
 * @param {string} helperText
 * @param {string} error       - when present, replaces helperText and turns red
 * @param {string} htmlFor     - id of the control this label points at
 * @param {string} describedById - id given to the help text for aria-describedby
 */
export default function Field({
  label,
  helperText,
  error,
  required = false,
  disabled = false,
  fullWidth = true,
  htmlFor,
  describedById,
  as,
  className,
  children,
}) {
  const hasError = Boolean(error);
  const message = error || helperText;
  const LabelTag = as || 'label';

  return (
    <div className={cx(styles.root, fullWidth && styles.fullWidth, className)}>
      {label && (
        <LabelTag
          className={cx(styles.label, disabled && styles.disabled)}
          htmlFor={htmlFor}
        >
          {label}
          {required && (
            <span data-required aria-hidden="true">
              *
            </span>
          )}
        </LabelTag>
      )}

      {children}

      {message && (
        <span
          id={describedById}
          className={cx(styles.help, hasError && styles.error)}
          role={hasError ? 'alert' : undefined}
        >
          {message}
        </span>
      )}
    </div>
  );
}
