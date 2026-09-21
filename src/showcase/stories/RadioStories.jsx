'use client';

import { useState } from 'react';
import { Radio, RadioGroup } from '@/components/ui';
import { Grid, PropsTable, Row, Story } from '../kit';

const planOptions = [
  { value: 'starter', label: 'Starter', description: 'For side projects and prototypes.' },
  { value: 'pro', label: 'Professional', description: 'For small teams shipping to production.' },
  { value: 'enterprise', label: 'Enterprise', description: 'SSO, audit logs and support.' },
  { value: 'legacy', label: 'Legacy', description: 'No longer available.', disabled: true },
];

export const heroControls = {
  size: { type: 'select', options: ['sm', 'md'], default: 'md' },
  description: { type: 'boolean', default: false },
  error: { type: 'boolean', default: false },
  disabled: { type: 'boolean', default: false },
};

export function Hero({ size, description, error, disabled }) {
  const [checked, setChecked] = useState(true);

  return (
    <Radio
      name="hero-radio"
      label="Professional"
      description={description ? 'For small teams shipping to production.' : undefined}
      checked={checked}
      onChange={() => setChecked((current) => !current)}
      size={size}
      error={error}
      disabled={disabled}
    />
  );
}

export default function RadioStories() {
  const [plan, setPlan] = useState('pro');
  const [layout, setLayout] = useState('grid');

  return (
    <>
      <Story
        title="RadioGroup"
        description="Renders a set of options and reports the selected value up, so you manage one piece of state instead of one per radio."
      >
        <RadioGroup
          label="Plan"
          options={planOptions}
          value={plan}
          onChange={setPlan}
          helperText="Legacy is disabled as an example."
        />
      </Story>

      <Story title="Horizontal" description="For short option sets.">
        <RadioGroup
          label="Layout"
          orientation="horizontal"
          options={[
            { value: 'grid', label: 'Grid' },
            { value: 'list', label: 'List' },
            { value: 'board', label: 'Board' },
          ]}
          value={layout}
          onChange={setLayout}
        />
      </Story>

      <Story
        title="Individual radios"
        description="Radios sharing a name are mutually exclusive — the browser handles that natively."
      >
        <Grid $min="14rem">
          <Radio name="demo-states" label="Unchecked" onChange={() => {}} />
          <Radio name="demo-states-2" label="Checked" checked onChange={() => {}} />
          <Radio name="demo-states-3" label="Error" error onChange={() => {}} />
          <Radio name="demo-states-4" label="Disabled" disabled onChange={() => {}} />
          <Radio name="demo-states-5" label="Disabled checked" checked disabled onChange={() => {}} />
        </Grid>
      </Story>

      <Story title="Sizes">
        <Row $gap="xl">
          <Radio name="demo-size-sm" size="sm" label="Small" checked onChange={() => {}} />
          <Radio name="demo-size-md" size="md" label="Medium" checked onChange={() => {}} />
        </Row>
      </Story>

      <PropsTable
        rows={[
          {
            name: 'options',
            type: '{ value, label, description?, disabled? }[]',
            description: 'RadioGroup only — the options to render.',
          },
          {
            name: 'value',
            type: 'string',
            description: 'RadioGroup only — the selected option value.',
          },
          {
            name: 'orientation',
            type: "'vertical' | 'horizontal'",
            default: "'vertical'",
            description: 'RadioGroup only — layout direction.',
          },
          {
            name: 'name',
            type: 'string',
            description: 'Groups radios together. RadioGroup generates one if omitted.',
          },
          { name: 'label', type: 'string', description: 'Label text beside the circle.' },
          { name: 'description', type: 'string', description: 'Second line under the label.' },
          {
            name: 'size',
            type: "'sm' | 'md'",
            default: "'md'",
            description: 'Circle and label size.',
          },
        ]}
      />
    </>
  );
}
