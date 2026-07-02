'use client';

import { Button } from '@/components/ui';

export default function TestPage() {
  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h1>Button Test</h1>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button variant="primary" disabled>Primary Disabled</Button>
        <Button variant="secondary" disabled>Secondary Disabled</Button>
        <Button variant="tertiary" disabled>Tertiary Disabled</Button>
      </div>
    </div>
  );
}
