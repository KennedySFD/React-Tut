'use client';

import { Input } from '@/components/ui';

export default function InputTest() {
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '2rem',
        padding: '2rem',
      }}
    >
      <div style={{ width: '100%', maxWidth: '28rem', display: 'grid', gap: '1.5rem' }}>
        <Input label="Email" type="email" placeholder="you@company.com" />
        <Input label="Full name" placeholder="Ada Lovelace" helperText="As it appears on your ID." />
      </div>
    </div>
  );
}
