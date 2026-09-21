'use client';

import { useState } from 'react';
import { Checkbox } from '@/components/ui';
import { Grid, Hint, PropsTable, Story } from '../kit';

export const heroControls = {
  size: { type: 'select', options: ['sm', 'md'], default: 'md' },
  description: { type: 'boolean', default: false },
  indeterminate: { type: 'boolean', default: false },
  error: { type: 'boolean', default: false },
  disabled: { type: 'boolean', default: false },
};

export function Hero({ size, description, indeterminate, error, disabled }) {
  // Checked stays internal so the box is genuinely clickable
  const [checked, setChecked] = useState(true);

  return (
    <Checkbox
      label="Accept terms"
      description={description ? 'You can withdraw consent at any time.' : undefined}
      checked={checked}
      onChange={(event) => setChecked(event.target.checked)}
      size={size}
      indeterminate={indeterminate}
      error={error}
      disabled={disabled}
    />
  );
}

export default function CheckboxStories() {
  const [terms, setTerms] = useState(false);
  const [marketing, setMarketing] = useState(true);

  return (
    <>
      <Story title="Interactive" description="Click the label or the box.">
        <Grid $min="14rem">
          <Checkbox
            label="Accept terms"
            checked={terms}
            onChange={(event) => setTerms(event.target.checked)}
          />
          <Checkbox
            label="Product updates"
            description="No more than once a month."
            checked={marketing}
            onChange={(event) => setMarketing(event.target.checked)}
          />
        </Grid>
        <Hint>
          <span>
            The tick scales in separately from the box, so the mark reads as landing in the box
            rather than appearing with it.
          </span>
        </Hint>
      </Story>

      <Story title="States">
        <Grid $min="14rem">
          <Checkbox label="Unchecked" onChange={() => {}} />
          <Checkbox label="Checked" checked onChange={() => {}} />
          <Checkbox label="Indeterminate" indeterminate onChange={() => {}} />
          <Checkbox label="Error" error onChange={() => {}} />
          <Checkbox label="Disabled" disabled onChange={() => {}} />
          <Checkbox label="Disabled checked" checked disabled onChange={() => {}} />
        </Grid>
      </Story>

      <Story title="Sizes">
        <Grid $min="14rem">
          <Checkbox size="sm" label="Small" checked onChange={() => {}} />
          <Checkbox size="md" label="Medium" checked onChange={() => {}} />
        </Grid>
      </Story>

      <PropsTable
        rows={[
          { name: 'label', type: 'string', description: 'Label text beside the box.' },
          { name: 'description', type: 'string', description: 'Second line under the label.' },
          { name: 'checked', type: 'boolean', default: 'false', description: 'Checked state.' },
          {
            name: 'indeterminate',
            type: 'boolean',
            default: 'false',
            description: 'The "some selected" state. Set as a DOM property, not an attribute.',
          },
          {
            name: 'onChange',
            type: '(event) => void',
            description: 'Standard change handler.',
          },
          {
            name: 'error',
            type: 'boolean',
            default: 'false',
            description: 'Red border and aria-invalid.',
          },
          {
            name: 'size',
            type: "'sm' | 'md'",
            default: "'md'",
            description: 'Box and label size.',
          },
        ]}
      />
    </>
  );
}
