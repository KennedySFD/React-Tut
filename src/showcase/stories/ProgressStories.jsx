'use client';

import Progress from '@/components/ui/progress';
import { PropsTable, Row, Story } from '../kit';

export const heroControls = {
  value: { type: 'select', options: ['0', '25', '50', '75', '100'], default: '65' },
  size: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md' },
};

export function Hero({ value, size }) {
  return <Progress value={Number(value)} size={size} label="Upload" showValue style={{ width: '16rem' }} />;
}

export default function ProgressStories() {
  return (
    <>
      <Story title="Sizes" description="Small, medium and large track heights.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '24rem' }}>
          <Progress value={40} size="sm" label="Small" showValue />
          <Progress value={60} size="md" label="Medium" showValue />
          <Progress value={80} size="lg" label="Large" showValue />
        </div>
      </Story>

      <Story title="Indeterminate" description="No known progress — use a shimmer animation.">
        <div style={{ maxWidth: '24rem' }}>
          <Progress indeterminate label="Loading…" />
        </div>
      </Story>

      <PropsTable
        rows={[
          { name: 'value', type: 'number', default: '0', description: 'Progress percentage 0–100.' },
          { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Track height.' },
          { name: 'label', type: 'string', description: 'Text label above the bar.' },
          { name: 'showValue', type: 'boolean', default: 'false', description: 'Display the percentage number.' },
          { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Infinite shimmer animation.' },
        ]}
      />
    </>
  );
}
