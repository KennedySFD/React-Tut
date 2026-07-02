'use client';

import { TestDis } from '@/components/layout';

export default function TestDisPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f5f5f5',
        padding: '2rem',
      }}
    >
      <TestDis />
    </div>
  );
}
