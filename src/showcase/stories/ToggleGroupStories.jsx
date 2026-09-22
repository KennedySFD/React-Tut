'use client';

import { useState } from 'react';
import ToggleGroup from '@/components/ui/toggle-group';
import { SunIcon, MoonIcon, MenuIcon } from '@/components/icons';
import { PropsTable, Row, Story } from '../kit';

const viewItems = [
  { value: 'grid', label: 'Grid' },
  { value: 'list', label: 'List' },
  { value: 'board', label: 'Board' },
];

export function Hero() {
  const [val, setVal] = useState('grid');
  return <ToggleGroup value={val} onChange={setVal} items={viewItems} />;
}

export default function ToggleGroupStories() {
  return (
    <>
      <Story title="Basic" description="Three-way segmented control.">
        {(() => {
          const [v, setV] = useState('grid');
          return <ToggleGroup value={v} onChange={setV} items={viewItems} />;
        })()}
      </Story>

      <Story title="With icons" description="Each segment can have a leading icon.">
        {(() => {
          const [v, setV] = useState('light');
          return (
            <ToggleGroup
              value={v}
              onChange={setV}
              items={[
                { value: 'light', label: 'Light', icon: SunIcon },
                { value: 'dark', label: 'Dark', icon: MoonIcon },
              ]}
            />
          );
        })()}
      </Story>

      <Story title="Disabled" description="Entire group can be disabled.">
        <ToggleGroup value="list" items={viewItems} disabled />
      </Story>

      <PropsTable
        rows={[
          { name: 'value', type: 'string', description: 'Currently selected value.' },
          { name: 'onChange', type: '(value: string) => void', description: 'Called when selection changes.' },
          { name: 'items', type: 'Array<{value, label, icon?}>', description: 'Segment definitions.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables all segments.' },
        ]}
      />
    </>
  );
}
