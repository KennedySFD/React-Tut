'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Field from '@/components/ui/field';
import { useFieldMotion } from '@/hooks/useFieldMotion';
import { useRevealMotion } from '@/hooks/useRevealMotion';
import { CheckIcon, ChevronDownIcon } from '@/components/icons';
import {
  Chevron,
  EmptyState,
  Menu,
  Option,
  SelectTrigger,
  SelectWrapper,
  TriggerValue,
} from './Select.style';

/** Walks to the next non-disabled option, wrapping at either end. */
function getNextEnabledIndex(options, from, direction) {
  const count = options.length;
  if (count === 0) return -1;

  let next = from;
  for (let step = 0; step < count; step += 1) {
    next = (next + direction + count) % count;
    if (!options[next].disabled) return next;
  }
  return from;
}

/**
 * Select — a custom dropdown (not the native `<select>`), so its menu, hover
 * and selected states can be themed with the same tokens as everything else.
 *
 * @param {{value: string, label: string, disabled?: boolean}[]} options
 * @param {string} value
 * @param {(value: string) => void} onChange
 *
 * States: hover, focus, open, option-hover, option-selected, disabled, error.
 *
 * Keyboard: Enter/Space/Arrows open, Arrows move, Home/End jump,
 * Enter selects, Escape closes. Focus stays on the trigger and the active
 * option is announced via `aria-activedescendant`.
 */
export default function Select({
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  helperText,
  error,
  size = 'md',
  disabled = false,
  required = false,
  fullWidth = true,
  emptyMessage = 'No options',
  className,
  ...props
}) {
  const generatedId = useId();
  const selectId = generatedId;
  const describedById = `${selectId}-description`;
  const listboxId = `${selectId}-listbox`;

  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const wrapperRef = useRef(null);
  const triggerRef = useRef(null);
  const listRef = useRef(null);

  // Two hooks each want a ref on the same node, so the refs are merged by hand
  const { ref: keylineRef, handlers: motionHandlers } = useFieldMotion(open || focused, {
    disabled,
  });
  const revealRef = useRevealMotion({ distance: 'menu', active: open });

  const setTriggerRef = (node) => {
    triggerRef.current = node;
    keylineRef.current = node;
  };

  const setListRef = (node) => {
    listRef.current = node;
    revealRef.current = node;
  };

  const hasError = Boolean(error);
  const selectedIndex = options.findIndex((option) => option.value === value);
  const selectedOption = selectedIndex >= 0 ? options[selectedIndex] : null;

  // Close when the user clicks anywhere outside the component
  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event) => {
      if (!wrapperRef.current?.contains(event.target)) setOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [open]);

  // Keep the highlighted option in view while arrowing through a long list
  useEffect(() => {
    if (!open || activeIndex < 0) return;
    listRef.current?.children[activeIndex]?.scrollIntoView({ block: 'nearest' });
  }, [open, activeIndex]);

  const openMenu = () => {
    if (disabled) return;
    const startIndex =
      selectedIndex >= 0 && !options[selectedIndex]?.disabled
        ? selectedIndex
        : getNextEnabledIndex(options, -1, 1);
    setActiveIndex(startIndex);
    setOpen(true);
  };

  const closeMenu = ({ restoreFocus = true } = {}) => {
    setOpen(false);
    setActiveIndex(-1);
    if (restoreFocus) triggerRef.current?.focus();
  };

  const selectIndex = (index) => {
    const option = options[index];
    if (!option || option.disabled) return;
    onChange?.(option.value);
    closeMenu();
  };

  const handleKeyDown = (event) => {
    if (disabled) return;

    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
        event.preventDefault();
        openMenu();
      }
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveIndex((current) => getNextEnabledIndex(options, current, 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex((current) => getNextEnabledIndex(options, current, -1));
        break;
      case 'Home':
        event.preventDefault();
        setActiveIndex(getNextEnabledIndex(options, -1, 1));
        break;
      case 'End':
        event.preventDefault();
        setActiveIndex(getNextEnabledIndex(options, 0, -1));
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        selectIndex(activeIndex);
        break;
      case 'Escape':
        event.preventDefault();
        closeMenu();
        break;
      case 'Tab':
        closeMenu({ restoreFocus: false });
        break;
      default:
        break;
    }
  };

  return (
    <Field
      label={label}
      helperText={helperText}
      error={error}
      required={required}
      disabled={disabled}
      fullWidth={fullWidth}
      as="span"
      describedById={describedById}
      className={className}
    >
      <SelectWrapper ref={wrapperRef}>
        <SelectTrigger
          type="button"
          ref={setTriggerRef}
          {...motionHandlers}
          id={selectId}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={open ? listboxId : undefined}
          aria-activedescendant={
            open && activeIndex >= 0 ? `${selectId}-option-${activeIndex}` : undefined
          }
          aria-invalid={hasError || undefined}
          aria-describedby={helperText || error ? describedById : undefined}
          disabled={disabled}
          $size={size}
          $hasError={hasError}
          data-focused={open}
          onClick={() => (open ? closeMenu() : openMenu())}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        >
          <TriggerValue $isPlaceholder={!selectedOption}>
            {selectedOption ? selectedOption.label : placeholder}
          </TriggerValue>
          <Chevron $open={open} $size={size}>
            <ChevronDownIcon />
          </Chevron>
        </SelectTrigger>

        {open && (
          <Menu ref={setListRef} id={listboxId} role="listbox" aria-labelledby={selectId}>
            {options.length === 0 && <EmptyState>{emptyMessage}</EmptyState>}

            {options.map((option, index) => (
              <Option
                key={option.value}
                id={`${selectId}-option-${index}`}
                role="option"
                aria-selected={option.value === value}
                aria-disabled={option.disabled || undefined}
                data-active={index === activeIndex}
                onMouseEnter={() => !option.disabled && setActiveIndex(index)}
                onClick={() => selectIndex(index)}
              >
                {option.label}
                {option.value === value && <CheckIcon />}
              </Option>
            ))}
          </Menu>
        )}
      </SelectWrapper>
    </Field>
  );
}
