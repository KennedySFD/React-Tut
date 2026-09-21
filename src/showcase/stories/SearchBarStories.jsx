'use client';

import { useState } from 'react';
import { SearchBar } from '@/components/ui';
import { Grid, Hint, PropsTable, Stack, StateName, Story } from '../kit';

export const heroControls = {
  size: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md' },
  disabled: { type: 'boolean', default: false },
};

export function Hero({ size, disabled }) {
  return <SearchBar placeholder="Search…" size={size} disabled={disabled} />;
}

export default function SearchBarStories() {
  const [search, setSearch] = useState('');
  const [lastSearch, setLastSearch] = useState(null);

  return (
    <>
      <Story
        title="Controlled"
        description="Type to reveal the clear button. Enter searches, Escape clears."
      >
        <Stack>
          <SearchBar
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onClear={() => setSearch('')}
            onSearch={(term) => setLastSearch(term)}
            placeholder="Search components…"
          />
          <StateName>
            Value: <code>{search || '(empty)'}</code>
            {' · '}
            Last search: <code>{lastSearch ?? '(none)'}</code>
          </StateName>
        </Stack>
        <Hint>
          <span>
            SearchBar is composed from Input rather than restyled, so it inherits the same border,
            hover and focus tokens automatically.
          </span>
        </Hint>
      </Story>

      <Story title="Uncontrolled" description="Pass defaultValue and let it manage its own state.">
        <Grid>
          <SearchBar defaultValue="Clearable" />
          <SearchBar placeholder="Empty" />
        </Grid>
      </Story>

      <Story title="Sizes and disabled">
        <Grid>
          <SearchBar size="sm" placeholder="Small" />
          <SearchBar size="md" placeholder="Medium" />
          <SearchBar size="lg" placeholder="Large" />
          <SearchBar placeholder="Disabled" disabled />
        </Grid>
      </Story>

      <PropsTable
        rows={[
          { name: 'value', type: 'string', description: 'Controlled value. Pair with onChange.' },
          {
            name: 'defaultValue',
            type: 'string',
            default: "''",
            description: 'Starting value when uncontrolled.',
          },
          {
            name: 'onSearch',
            type: '(term: string) => void',
            description: 'Fired when the user presses Enter.',
          },
          {
            name: 'onClear',
            type: '() => void',
            description: 'Fired by the clear button and by Escape.',
          },
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
