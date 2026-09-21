'use client';

import { useId } from 'react';
import Field from '@/components/ui/field';
import Radio from './Radio';
import { RadioGroupRoot } from './Radio.style';

/**
 * RadioGroup — renders a set of mutually exclusive options and reports the
 * selected value up, so callers manage one piece of state instead of one per
 * radio.
 *
 * @param {{value: string, label: string, description?: string, disabled?: boolean}[]} options
 * @param {'vertical'|'horizontal'} orientation
 */
export default function RadioGroup({
  options = [],
  value,
  onChange,
  label,
  helperText,
  error,
  name,
  orientation = 'vertical',
  size = 'md',
  disabled = false,
  required = false,
  className,
}) {
  const generatedId = useId();
  const groupName = name ?? generatedId;
  const describedById = `${generatedId}-description`;

  return (
    <Field
      label={label}
      helperText={helperText}
      error={error}
      required={required}
      disabled={disabled}
      as="span"
      describedById={describedById}
      className={className}
    >
      <RadioGroupRoot
        role="radiogroup"
        aria-label={label}
        aria-describedby={helperText || error ? describedById : undefined}
        $orientation={orientation}
      >
        {options.map((option) => (
          <Radio
            key={option.value}
            name={groupName}
            value={option.value}
            label={option.label}
            description={option.description}
            checked={value === option.value}
            disabled={disabled || option.disabled}
            error={Boolean(error)}
            size={size}
            onChange={() => onChange?.(option.value)}
          />
        ))}
      </RadioGroupRoot>
    </Field>
  );
}
