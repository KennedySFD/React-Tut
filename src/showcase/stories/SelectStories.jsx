'use client';

import { useState } from 'react';
import { Select } from '@/components/ui';
import { Grid, Hint, PropsTable, Story } from '../kit';

const countryOptions = [
  { value: 'uk', label: 'United Kingdom' },
  { value: 'us', label: 'United States' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'au', label: 'Australia', disabled: true },
];

export const heroControls = {
  size: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md' },
  error: { type: 'boolean', default: false },
  disabled: { type: 'boolean', default: false },
};

export function Hero({ size, error, disabled }) {
  // Selection stays internal so the dropdown is genuinely usable
  const [value, setValue] = useState('uk');

  return (
    <Select
      label="Country"
      options={countryOptions}
      value={value}
      onChange={setValue}
      size={size}
      disabled={disabled}
      error={error ? 'Please choose a country.' : undefined}
    />
  );
}

export default function SelectStories() {
  const [country, setCountry] = useState('');

  return (
    <>
      <Story
        title="Default"
        description="A custom listbox, not the native select, so its menu and option states can be themed."
      >
        <Grid>
          <Select
            label="Country"
            options={countryOptions}
            value={country}
            onChange={setCountry}
            placeholder="Choose a country"
            helperText="Australia is disabled as an example."
          />
        </Grid>
        <Hint>
          <span>
            Keyboard: <kbd>Enter</kbd> or <kbd>↓</kbd> opens, <kbd>↑</kbd> <kbd>↓</kbd> moves,{' '}
            <kbd>Home</kbd> <kbd>End</kbd> jump, <kbd>Esc</kbd> closes. Focus stays on the trigger
            and the active option is announced via <code>aria-activedescendant</code>.
          </span>
        </Hint>
      </Story>

      <Story title="States">
        <Grid>
          <Select label="Pre-selected" options={countryOptions} value="de" onChange={() => {}} />
          <Select
            label="Error"
            options={countryOptions}
            value=""
            onChange={() => {}}
            error="Please choose a country."
          />
          <Select label="Disabled" options={countryOptions} value="uk" disabled />
          <Select label="Empty" options={[]} value="" onChange={() => {}} />
        </Grid>
      </Story>

      <Story title="Sizes" description="Closed, a Select is the same object as an Input.">
        <Grid>
          <Select size="sm" options={countryOptions} value="uk" onChange={() => {}} />
          <Select size="md" options={countryOptions} value="uk" onChange={() => {}} />
          <Select size="lg" options={countryOptions} value="uk" onChange={() => {}} />
        </Grid>
      </Story>

      <PropsTable
        rows={[
          {
            name: 'options',
            type: '{ value, label, disabled? }[]',
            default: '[]',
            description: 'The options to render.',
          },
          { name: 'value', type: 'string', description: 'Selected option value.' },
          {
            name: 'onChange',
            type: '(value: string) => void',
            description: 'Fired with the new value.',
          },
          {
            name: 'placeholder',
            type: 'string',
            default: "'Select an option'",
            description: 'Shown when nothing is selected.',
          },
          {
            name: 'emptyMessage',
            type: 'string',
            default: "'No options'",
            description: 'Shown when options is empty.',
          },
          { name: 'error', type: 'string', description: 'Error message; turns the field red.' },
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            default: "'md'",
            description: 'Height, padding and font size.',
          },
        ]}
      />
    </>
  );
}
