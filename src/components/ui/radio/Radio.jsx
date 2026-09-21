'use client';

import { useId } from 'react';
import { useInteractiveMotion } from '@/hooks/useInteractiveMotion';
import { useStateMotion } from '@/hooks/useStateMotion';
import {
  Circle,
  Description,
  Dot,
  HiddenInput,
  LabelText,
  RadioRoot,
  TextGroup,
} from './Radio.style';

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
    <RadioRoot
      htmlFor={inputId}
      $disabled={disabled}
      $checked={checked}
      className={className}
      {...handlers}
    >
      <HiddenInput
        id={inputId}
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

      <Circle
        ref={circleRef}
        data-box
        $checked={checked}
        $size={size}
        $hasError={error}
        aria-hidden="true"
      >
        <Dot ref={dotRef} />
      </Circle>

      {(label || description) && (
        <TextGroup>
          {label && <LabelText $size={size}>{label}</LabelText>}
          {description && (
            <Description id={`${inputId}-description`}>{description}</Description>
          )}
        </TextGroup>
      )}
    </RadioRoot>
  );
}
