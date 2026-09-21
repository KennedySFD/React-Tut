'use client';

import Header from '@/components/layout/header';
import { Button } from '@/components/ui';
import { UserIcon } from '@/components/icons';
import { PropsTable, Story } from '../kit';

const sampleLinks = [
  { label: 'Home', href: '/', active: true },
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const heroSurface = 'default';
export const heroWide = true;

export function Hero() {
  return (
    <Header
      brand="Acme Inc"
      links={sampleLinks}
      actions={
        <Button variant="ghost" size="sm" iconOnly><UserIcon /></Button>
      }
    />
  );
}

export default function HeaderStories() {
  return (
    <>
      <Story title="Basic" description="Brand, links and an actions slot." padding="none">
        <Header
          brand="Acme Inc"
          links={sampleLinks}
          actions={<Button variant="ghost" size="sm" iconOnly><UserIcon /></Button>}
        />
      </Story>

      <Story title="Minimal" description="Brand only, no links." padding="none">
        <Header brand="Dashboard" />
      </Story>

      <PropsTable
        rows={[
          { name: 'brand', type: 'string', default: "'Project'", description: 'Site or app name.' },
          { name: 'links', type: '{label, href, active?}[]', default: '[]', description: 'Navigation links.' },
          { name: 'actions', type: 'ReactNode', description: 'Slot for buttons, avatar, theme toggle, etc.' },
        ]}
      />
    </>
  );
}
