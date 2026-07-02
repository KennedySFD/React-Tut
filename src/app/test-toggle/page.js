'use client';

import { useToggle } from '@/hooks/useToggle';
import { Button } from '@/components/ui';

export default function TestTogglePage() {
  const modal = useToggle(false);
  const darkMode = useToggle(false);

  return (
    <div style={{
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      background: darkMode.isOn ? '#171717' : '#FFFFFF',
      color: darkMode.isOn ? '#FFFFFF' : '#171717',
      minHeight: '100vh',
      transition: 'all 0.3s ease',
    }}>
      <h1>Toggle Hook Test</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h2>Dark Mode: {darkMode.isOn ? 'ON' : 'OFF'}</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button variant="primary" onClick={darkMode.toggle}>Toggle Dark Mode</Button>
          <Button variant="secondary" onClick={darkMode.turnOff}>Force Light</Button>
          <Button variant="tertiary" onClick={darkMode.turnOn}>Force Dark</Button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h2>Modal: {modal.isOn ? 'OPEN' : 'CLOSED'}</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button variant="primary" onClick={modal.toggle}>Toggle Modal</Button>
        </div>

        {modal.isOn && (
          <div style={{
            padding: '1.5rem',
            background: darkMode.isOn ? '#333' : '#F5F5F5',
            borderRadius: '0.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}>
            <p>This is a modal-like box controlled by useToggle.</p>
            <Button variant="secondary" onClick={modal.turnOff}>Close</Button>
          </div>
        )}
      </div>
    </div>
  );
}
