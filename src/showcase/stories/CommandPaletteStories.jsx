'use client';

import { useState } from 'react';
import { Button } from '@/components/ui';
import CommandPalette from '@/components/ui/command-palette';
import { SearchIcon, FileIcon, UserIcon, HomeIcon, MailIcon } from '@/components/icons';
import { PropsTable, Story } from '../kit';

const sampleItems = [
  { id: '1', label: 'Go to Dashboard', icon: HomeIcon, group: 'Navigation', shortcut: '⌘D' },
  { id: '2', label: 'Go to Profile', icon: UserIcon, group: 'Navigation', shortcut: '⌘P' },
  { id: '3', label: 'New File', icon: FileIcon, group: 'Actions', shortcut: '⌘N' },
  { id: '4', label: 'Send Message', icon: MailIcon, group: 'Actions' },
  { id: '5', label: 'Search docs', icon: SearchIcon, group: 'Actions', shortcut: '⌘/' },
];

export function Hero() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>⌘K — Open palette</Button>
      <CommandPalette open={open} onClose={() => setOpen(false)} items={sampleItems} />
    </>
  );
}

export default function CommandPaletteStories() {
  return (
    <>
      <Story title="Interactive" description="Click to open, then type to filter. Arrow keys + Enter to select.">
        {(() => {
          const [open, setOpen] = useState(false);
          return (
            <>
              <Button size="sm" variant="secondary" onClick={() => setOpen(true)}>Open command palette</Button>
              <CommandPalette open={open} onClose={() => setOpen(false)} items={sampleItems} />
            </>
          );
        })()}
      </Story>

      <PropsTable
        rows={[
          { name: 'open', type: 'boolean', description: 'Whether the palette is visible.' },
          { name: 'onClose', type: '() => void', description: 'Called on backdrop click or Escape.' },
          { name: 'items', type: 'Array<{id, label, icon?, group?, shortcut?, onSelect?}>', description: 'Searchable action items.' },
        ]}
      />
    </>
  );
}
