'use client';

import Footer from '@/components/layout/footer';
import { PropsTable, Story } from '../kit';

const sampleColumns = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Changelog', href: '/changelog' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'GitHub', href: 'https://github.com', external: true },
      { label: 'Community', href: '/community' },
    ],
  },
];

const sampleSocial = [
  { label: 'GitHub', href: 'https://github.com' },
];

export const heroSurface = 'default';
export const heroWide = true;

export function Hero() {
  return (
    <Footer
      brand="Acme Inc"
      columns={sampleColumns}
      social={sampleSocial}
    />
  );
}

export default function FooterStories() {
  return (
    <>
      <Story title="Full footer" description="Link columns, social icons and copyright." padding="none">
        <Footer
          brand="Acme Inc"
          columns={sampleColumns}
          social={sampleSocial}
        />
      </Story>

      <Story title="Minimal" description="Just the bottom bar." padding="none">
        <Footer brand="My App" />
      </Story>

      <PropsTable
        rows={[
          { name: 'brand', type: 'string', default: "'Project'", description: 'Site or company name.' },
          { name: 'copyright', type: 'string', description: 'Override the default copyright line.' },
          { name: 'columns', type: '{title, links[]}[]', default: '[]', description: 'Link column groups.' },
          { name: 'social', type: '{label, href, icon?}[]', default: '[]', description: 'Social media icons.' },
        ]}
      />
    </>
  );
}
