'use client';

import { useId, useState } from 'react';
import Field from '@/components/ui/field';
import { useFieldMotion } from '@/hooks/useFieldMotion';
import { StyledTextarea, TextareaShell } from './Textarea.style';

/**
 * Textarea — multi-line text field.
 *
 * @param {'sm'|'md'|'lg'} size
 * @param {number} rows
 * @param {'none'|'vertical'|'horizontal'|'both'} resize
 *
 * States: hover, focus, error, disabled, read-only.
 * Motion: the same focus keyline as Input and Select.
 */
export default function Textarea({
  label,
  helperText,
  error,
  size = 'md',
  rows = 4,
  resize = 'vertical',
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
  const textareaId = id ?? generatedId;
  const describedById = `${textareaId}-description`;
  const hasError = Boolean(error);

  const [focused, setFocused] = useState(false);
  const keylineRef = useFieldMotion(focused);

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
      htmlFor={textareaId}
      describedById={describedById}
      className={className}
    >
      <TextareaShell ref={keylineRef}>
        <StyledTextarea
          id={textareaId}
          rows={rows}
          disabled={disabled}
          required={required}
          $size={size}
          $hasError={hasError}
          $resize={resize}
          aria-invalid={hasError || undefined}
          aria-describedby={helperText || error ? describedById : undefined}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
      </TextareaShell>
    </Field>
  );
}
