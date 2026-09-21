'use client';

import { FieldLabel, FieldRoot, HelpText } from './Field.style';

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

  return (
    <FieldRoot $fullWidth={fullWidth} className={className}>
      {label && (
        <FieldLabel as={as} htmlFor={htmlFor} $disabled={disabled}>
          {label}
          {required && (
            <span data-required aria-hidden="true">
              *
            </span>
          )}
        </FieldLabel>
      )}

      {children}

      {message && (
        <HelpText
          id={describedById}
          $isError={hasError}
          role={hasError ? 'alert' : undefined}
        >
          {message}
        </HelpText>
      )}
    </FieldRoot>
  );
}
