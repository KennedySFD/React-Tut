'use client';

import { useId, useState } from 'react';
import Field from '@/components/ui/field';
import { useFieldMotion } from '@/hooks/useFieldMotion';
import { BareInput, IconSlot, InputShell } from './Input.style';

/**
 * Input — standard single-line text field.
 *
 * @param {string} label
 * @param {string} helperText - hint shown under the field
 * @param {string} error      - message shown instead of helperText; turns the field red
 * @param {'sm'|'md'|'lg'} size
 * @param {React.ReactNode} iconLeft
 * @param {React.ReactNode} iconRight
 *
 * States: hover, focus, error, disabled, read-only.
 *
 * Focus is tracked in state and published to the shell as `data-focused`
 * rather than relying on `:has()`, so the shared focus ring works in every
 * browser the project targets.
 */
export default function Input({
  label,
  helperText,
  error,
  size = 'md',
  iconLeft,
  iconRight,
  required = false,
  disabled = false,
  fullWidth = true,
  id,
  className,
  onFocus,
  onBlur,
  ...props
}) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const describedById = `${inputId}-description`;
  const [focused, setFocused] = useState(false);
  const { ref: shellRef, handlers: motionHandlers } = useFieldMotion(focused, { disabled });

  const hasError = Boolean(error);

  const handleFocus = (event) => {
    setFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (event) => {
    setFocused(false);
    onBlur?.(event);
  };

  return (
    <Field
      label={label}
      helperText={helperText}
      error={error}
      required={required}
      disabled={disabled}
      fullWidth={fullWidth}
      htmlFor={inputId}
      describedById={describedById}
      className={className}
    >
      <InputShell
        ref={shellRef}
        {...motionHandlers}
        $size={size}
        $hasError={hasError}
        data-focused={focused}
        aria-disabled={disabled || undefined}
      >
        {iconLeft && <IconSlot $size={size}>{iconLeft}</IconSlot>}

        <BareInput
          id={inputId}
          disabled={disabled}
          required={required}
          aria-invalid={hasError || undefined}
          aria-describedby={helperText || error ? describedById : undefined}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />

        {iconRight && <IconSlot $size={size}>{iconRight}</IconSlot>}
      </InputShell>
    </Field>
  );
}
