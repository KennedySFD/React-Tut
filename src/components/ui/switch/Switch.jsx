'use client';

import { useId } from 'react';
import { HiddenInput, LabelText, SwitchRoot, Thumb, Track } from './Switch.style';

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
    <SwitchRoot htmlFor={inputId} $disabled={disabled} $checked={checked} className={className}>
      <HiddenInput
        id={inputId}
        type="checkbox"
        role="switch"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        {...props}
      />

      <Track data-track $checked={checked} $size={size} aria-hidden="true">
        <Thumb $checked={checked} $size={size} />
      </Track>

      {label && <LabelText>{label}</LabelText>}
    </SwitchRoot>
  );
}
