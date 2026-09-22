'use client';

import { useState } from 'react';
import { Button } from '@/components/ui';
import Drawer from '@/components/ui/drawer';
import { PropsTable, Row, Story } from '../kit';

export function Hero() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>Open drawer</Button>
      <Drawer open={open} onClose={() => setOpen(false)} title="Settings">
        <p>Drawer body content goes here.</p>
      </Drawer>
    </>
  );
}

export default function DrawerStories() {
  return (
    <>
      <Story title="Right side" description="Default — slides in from the right edge.">
        {(() => {
          const [open, setOpen] = useState(false);
          return (
            <>
              <Button size="sm" variant="secondary" onClick={() => setOpen(true)}>Right drawer</Button>
              <Drawer open={open} onClose={() => setOpen(false)} title="Right drawer">
                <p>This drawer slides from the right.</p>
              </Drawer>
            </>
          );
        })()}
      </Story>

      <Story title="Left side" description="Pass side='left' for navigation drawers.">
        {(() => {
          const [open, setOpen] = useState(false);
          return (
            <>
              <Button size="sm" variant="secondary" onClick={() => setOpen(true)}>Left drawer</Button>
              <Drawer open={open} onClose={() => setOpen(false)} side="left" title="Navigation">
                <p>This drawer slides from the left.</p>
              </Drawer>
            </>
          );
        })()}
      </Story>

      <PropsTable
        rows={[
          { name: 'open', type: 'boolean', description: 'Whether the drawer is visible.' },
          { name: 'onClose', type: '() => void', description: 'Called on scrim click or Escape key.' },
          { name: 'side', type: "'left' | 'right'", default: "'right'", description: 'Which edge it slides from.' },
          { name: 'title', type: 'string', description: 'Header title text.' },
          { name: 'children', type: 'ReactNode', description: 'Body content.' },
        ]}
      />
    </>
  );
}
