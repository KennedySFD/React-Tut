'use client';

import { useCounter } from '@/hooks/useCounter';
import { Button } from '@/components/ui';

export default function TestHooksPage() {
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h1>Hooks Test</h1>

      <p style={{ fontSize: '3rem', fontWeight: 700 }}>{count}</p>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button variant="primary" onClick={increment}>+ Increment</Button>
        <Button variant="secondary" onClick={decrement}>- Decrement</Button>
        <Button variant="tertiary" onClick={reset}>Reset</Button>
      </div>
    </div>
  );
}
