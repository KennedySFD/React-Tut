'use client';

import { Tabs } from '@/components/ui';
import { Hint, PropsTable, Story } from '../kit';

const items = [
  {
    id: 'overview',
    label: 'Overview',
    content: 'Tabs keep related views in one place. Use the arrow keys to move between them.',
  },
  {
    id: 'activity',
    label: 'Activity',
    content: 'The active tab is the only one in the tab order — a roving tabindex.',
  },
  {
    id: 'settings',
    label: 'Settings',
    content: 'Each panel is linked to its tab for screen readers.',
  },
  { id: 'billing', label: 'Billing', content: 'Not reachable.', disabled: true },
];

export const heroControls = {
  variant: { type: 'select', options: ['underline', 'pill'], default: 'underline' },
  panel: { type: 'boolean', default: true },
};

export function Hero({ variant, panel }) {
  const shown = panel ? items : items.map(({ content, ...rest }) => rest);

  return (
    <div style={{ width: '100%' }}>
      {/* Remount on variant change so the indicator measures the new strip */}
      <Tabs key={variant} items={shown} variant={variant} />
    </div>
  );
}

export default function TabsStories() {
  return (
    <>
      <Story
        title="Underline"
        description="The indicator carries the dispersion gradient, which ties the tab strip to the keylines elsewhere in the library."
      >
        <Tabs items={items} variant="underline" />
        <Hint>
          <span>
            One indicator travels to the selected tab rather than each tab drawing its own, on the
            shared <code>travel</code> gesture. Keyboard: <kbd>←</kbd> <kbd>→</kbd> move,{' '}
            <kbd>Home</kbd> <kbd>End</kbd> jump.
          </span>
        </Hint>
      </Story>

      <Story title="Pill" description="The same travelling indicator, rendered as a raised pill.">
        <Tabs items={items} variant="pill" />
      </Story>

      <Story
        title="Controlled"
        description="Pass value and onChange to drive the selection from outside."
      >
        <Tabs items={items} value="activity" onChange={() => {}} />
      </Story>

      <PropsTable
        rows={[
          {
            name: 'items',
            type: '{ id, label, content?, disabled? }[]',
            default: '[]',
            description: 'The tabs and their panels.',
          },
          {
            name: 'variant',
            type: "'underline' | 'pill'",
            default: "'underline'",
            description: 'Indicator treatment.',
          },
          { name: 'value', type: 'string', description: 'Controlled active tab id.' },
          {
            name: 'defaultValue',
            type: 'string',
            description: 'Starting tab id when uncontrolled. Defaults to the first enabled tab.',
          },
          {
            name: 'onChange',
            type: '(id: string) => void',
            description: 'Fired with the newly selected tab id.',
          },
        ]}
      />
    </>
  );
}
