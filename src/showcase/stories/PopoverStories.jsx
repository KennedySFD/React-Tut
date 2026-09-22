'use client';

import { Button, Input } from '@/components/ui';
import Popover from '@/components/ui/popover';
import { PropsTable, Story } from '../kit';

export function Hero() {
  return (
    <Popover
      trigger={(props) => <Button size="sm" {...props}>Open popover</Button>}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <strong>Quick settings</strong>
        <Input label="Display name" placeholder="Joe" />
        <Button size="sm">Save</Button>
      </div>
    </Popover>
  );
}

export default function PopoverStories() {
  return (
    <>
      <Story title="Placements" description="Top, bottom, left and right positioning.">
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', padding: '3rem 0' }}>
          {['top', 'bottom', 'left', 'right'].map((p) => (
            <Popover
              key={p}
              placement={p}
              trigger={(props) => <Button size="sm" variant="secondary" {...props}>{p}</Button>}
            >
              <p style={{ margin: 0 }}>Content for <strong>{p}</strong> popover.</p>
            </Popover>
          ))}
        </div>
      </Story>

      <PropsTable
        rows={[
          { name: 'trigger', type: 'ReactNode | (props) => ReactNode', description: 'The element that toggles the popover.' },
          { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", default: "'bottom'", description: 'Where the panel appears relative to trigger.' },
          { name: 'children', type: 'ReactNode', description: 'Content rendered inside the panel.' },
        ]}
      />
    </>
  );
}
