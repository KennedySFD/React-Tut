'use client';

import HeroScreen1 from '@/components/feature/hero';

export default function HeroPage() {
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
      <HeroScreen1 />
    </div>
  );
}
