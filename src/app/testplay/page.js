'use client';

import { DisplayBoxPlay } from '@/components/layout';

export default function TestPlayPage() {
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
      <DisplayBoxPlay />
    </div>
  );
}
