'use client';

import { useState } from 'react';
import Input from '@/components/ui/input';
import { CloseIcon, SearchIcon } from '@/components/icons';
import { ClearButton } from './SearchBar.style';

/**
 * SearchBar — a search-shaped Input.
 *
 * Deliberately composed from `Input` rather than restyled from scratch: it
 * inherits the same border, hover and focus tokens, so a change to the field
 * treatment reaches the search bar for free.
 *
 * Works controlled (`value` + `onChange`) or uncontrolled (`defaultValue`).
 *
 * @param {(term: string) => void} onSearch - fired on Enter and on the search icon
 * @param {() => void} onClear
 */
export default function SearchBar({
  value,
  defaultValue = '',
  onChange,
  onSearch,
  onClear,
  placeholder = 'Search…',
  size = 'md',
  disabled = false,
  ...props
}) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = isControlled ? value : internalValue;

  const handleChange = (event) => {
    if (!isControlled) setInternalValue(event.target.value);
    onChange?.(event);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onSearch?.(currentValue);
    }
    if (event.key === 'Escape' && currentValue) {
      event.preventDefault();
      handleClear();
    }
  };

  const handleClear = () => {
    if (!isControlled) setInternalValue('');
    onClear?.();
  };

  return (
    <Input
      type="search"
      role="searchbox"
      value={currentValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      size={size}
      disabled={disabled}
      iconLeft={<SearchIcon />}
      iconRight={
        currentValue ? (
          <ClearButton type="button" onClick={handleClear} aria-label="Clear search">
            <CloseIcon size="0.875rem" />
          </ClearButton>
        ) : null
      }
      {...props}
    />
  );
}
