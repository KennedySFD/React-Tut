'use client';

import { ToggleGroupRoot, ToggleItem } from './ToggleGroup.style';

/**
 * ToggleGroup
 *
 * Segmented mutually-exclusive buttons — like tabs without panels.
 *
 * @param {string} value - the currently selected value
 * @param {(value: string) => void} onChange
 * @param {Array<{value: string, label: string, icon?: Component}>} items
 */
export default function ToggleGroup({
  value,
  onChange,
  items = [],
  disabled = false,
  ...props
}) {
  return (
    <ToggleGroupRoot role="group" {...props}>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <ToggleItem
            key={item.value}
            $active={value === item.value}
            onClick={() => onChange?.(item.value)}
            disabled={disabled}
            aria-pressed={value === item.value}
          >
            {Icon && <Icon />}
            {item.label}
          </ToggleItem>
        );
      })}
    </ToggleGroupRoot>
  );
}
