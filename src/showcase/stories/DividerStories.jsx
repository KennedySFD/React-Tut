'use client';

import { Divider } from '@/components/ui';
import { PropsTable, Stack, Story } from '../kit';

export const heroControls = {
  weight: { type: 'select', options: ['subtle', 'default', 'strong'], default: 'default' },
  label: { type: 'boolean', default: false },
};

export function Hero({ weight, label }) {
  return (
    <div style={{ width: '100%' }}>
      <Divider weight={weight} label={label ? 'or' : undefined} />
    </div>
  );
}

export default function DividerStories() {
  return (
    <>
      <Story title="Weights" description="Three border weights mapping to the border tokens.">
        <Stack style={{ gap: '1.5rem' }}>
          <Divider weight="subtle" />
          <Divider weight="default" />
          <Divider weight="strong" />
        </Stack>
      </Story>

      <Story title="With label" description="An inline label centred between the rules.">
        <Stack style={{ gap: '1.5rem' }}>
          <Divider label="or" />
          <Divider label="Section 2" weight="strong" />
        </Stack>
      </Story>

      <Story title="Vertical" description="Set orientation to use as a column separator.">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', height: '3rem' }}>
          <span>Left</span>
          <Divider orientation="vertical" />
          <span>Right</span>
        </div>
      </Story>

      <PropsTable
        rows={[
          { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Direction of the line.' },
          { name: 'weight', type: "'subtle' | 'default' | 'strong'", default: "'default'", description: 'Border weight.' },
          { name: 'label', type: 'string', description: 'Centred label (horizontal only).' },
        ]}
      />
    </>
  );
}
