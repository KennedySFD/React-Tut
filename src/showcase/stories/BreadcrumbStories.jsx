'use client';

import { Breadcrumb } from '@/components/ui';
import { PropsTable, Stack, Story } from '../kit';

export function Hero() {
  return (
    <Breadcrumb
      items={[
        { label: 'Home', href: '/' },
        { label: 'Components', href: '/showcase' },
        { label: 'Breadcrumb' },
      ]}
    />
  );
}

export default function BreadcrumbStories() {
  return (
    <>
      <Story title="Basic" description="A simple navigation trail.">
        <Stack>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' },
              { label: 'Widget Pro' },
            ]}
          />
        </Stack>
      </Story>

      <Story title="Deep nesting" description="Longer paths work the same way.">
        <Stack>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Settings', href: '/settings' },
              { label: 'Team', href: '/settings/team' },
              { label: 'Members', href: '/settings/team/members' },
              { label: 'Joe Fowler' },
            ]}
          />
        </Stack>
      </Story>

      <Story title="Custom separator" description="Pass any ReactNode as the separator.">
        <Stack>
          <Breadcrumb
            separator="/"
            items={[
              { label: 'docs', href: '/' },
              { label: 'shaders', href: '/docs/shaders' },
              { label: 'ARCHITECTURE.md' },
            ]}
          />
        </Stack>
      </Story>

      <PropsTable
        rows={[
          { name: 'items', type: '{label, href?}[]', description: 'Ordered crumbs. The last is marked as current.' },
          { name: 'separator', type: 'ReactNode', description: 'Override the default chevron separator.' },
        ]}
      />
    </>
  );
}
