'use client';

import { useEffect, useId, useRef } from 'react';
import { CheckIcon, MinusIcon } from '@/components/icons';
import { useInteractiveMotion } from '@/hooks/useInteractiveMotion';
import { useStateMotion } from '@/hooks/useStateMotion';
import {
  Box,
  CheckboxRoot,
  Description,
  HiddenInput,
  LabelText,
  Mark,
  TextGroup,
} from './Checkbox.style';

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
    <CheckboxRoot
      htmlFor={inputId}
      $disabled={disabled}
      $checked={isMarked}
      className={className}
      {...handlers}
    >
      <HiddenInput
        ref={inputRef}
        id={inputId}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        aria-invalid={error || undefined}
        aria-describedby={description ? `${inputId}-description` : undefined}
        {...props}
      />

      <Box
        ref={boxRef}
        data-box
        $checked={isMarked}
        $size={size}
        $hasError={error}
        aria-hidden="true"
      >
        <Mark ref={markRef}>{indeterminate ? <MinusIcon /> : <CheckIcon />}</Mark>
      </Box>

      {(label || description) && (
        <TextGroup>
          {label && <LabelText $size={size}>{label}</LabelText>}
          {description && (
            <Description id={`${inputId}-description`}>{description}</Description>
          )}
        </TextGroup>
      )}
    </CheckboxRoot>
  );
}
