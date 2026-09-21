'use client';

import { useState } from 'react';
import { Switch } from '@/components/ui';
import { PropsTable, Row, Story } from '../kit';

export const heroControls = {
  size: { type: 'select', options: ['sm', 'md'], default: 'md' },
  label: { type: 'boolean', default: true },
  disabled: { type: 'boolean', default: false },
};

export function Hero({ size, label, disabled }) {
  const [checked, setChecked] = useState(true);

  return (
    <Switch
      label={label ? 'Email notifications' : undefined}
      checked={checked}
      onChange={(event) => setChecked(event.target.checked)}
      size={size}
      disabled={disabled}
      aria-label={label ? undefined : 'Email notifications'}
    />
  );
}

export default function SwitchStories() {
  const [notifications, setNotifications] = useState(true);
  const [compact, setCompact] = useState(false);

  return (
    <>
      <Story
        title="Interactive"
        description="Use a Switch for settings that apply immediately; use a Checkbox for values submitted with a form."
      >
        <Row $gap="xl">
          <Switch
            label="Email notifications"
            checked={notifications}
            onChange={(event) => setNotifications(event.target.checked)}
          />
          <Switch
            label="Compact mode"
            checked={compact}
            onChange={(event) => setCompact(event.target.checked)}
          />
        </Row>
      </Story>

      <Story title="States">
        <Row $gap="xl">
          <Switch label="Off" onChange={() => {}} />
          <Switch label="On" checked onChange={() => {}} />
          <Switch label="Disabled" disabled onChange={() => {}} />
          <Switch label="Disabled on" checked disabled onChange={() => {}} />
        </Row>
      </Story>

      <Story title="Sizes">
        <Row $gap="xl">
          <Switch size="sm" label="Small" checked onChange={() => {}} />
          <Switch size="md" label="Medium" checked onChange={() => {}} />
        </Row>
      </Story>

      <PropsTable
        rows={[
          { name: 'label', type: 'string', description: 'Label text beside the track.' },
          { name: 'checked', type: 'boolean', default: 'false', description: 'On/off state.' },
          { name: 'onChange', type: '(event) => void', description: 'Standard change handler.' },
          {
            name: 'size',
            type: "'sm' | 'md'",
            default: "'md'",
            description: 'Track and thumb size.',
          },
          {
            name: 'disabled',
            type: 'boolean',
            default: 'false',
            description: 'Disables the control.',
          },
        ]}
      />
    </>
  );
}
