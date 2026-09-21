'use client';

import { useState } from 'react';
import { Alert, Button } from '@/components/ui';
import { PropsTable, Stack, Story } from '../kit';

export const heroControls = {
  variant: {
    type: 'select',
    options: ['info', 'success', 'warning', 'danger'],
    default: 'info',
  },
  title: { type: 'boolean', default: true },
  dismissible: { type: 'boolean', default: false },
};

export function Hero({ variant, title, dismissible }) {
  return (
    <div style={{ width: '100%' }}>
      <Alert
        variant={variant}
        title={title ? 'Heads up' : undefined}
        onDismiss={dismissible ? () => {} : undefined}
      >
        This library ships light and dark modes from one set of semantic tokens.
      </Alert>
    </div>
  );
}

export default function AlertStories() {
  const [visible, setVisible] = useState(true);

  return (
    <>
      <Story title="Variants" description="The four feedback families.">
        <Stack>
          <Alert variant="info" title="Heads up">
            This library ships light and dark modes from one set of semantic tokens.
          </Alert>
          <Alert variant="success" title="Saved">
            Your changes have been published.
          </Alert>
          <Alert variant="warning" title="Approaching limit">
            You have used 90% of your monthly quota.
          </Alert>
          <Alert variant="danger" title="Payment failed">
            We could not charge the card on file.
          </Alert>
        </Stack>
      </Story>

      <Story
        title="Dismissible"
        description="Passing onDismiss renders a close button. The danger variant uses role='alert'; the others use role='status'."
      >
        <Stack>
          {visible ? (
            <Alert variant="info" title="Dismissible" onDismiss={() => setVisible(false)}>
              Click the × to remove this one.
            </Alert>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => setVisible(true)}>
              Restore dismissed alert
            </Button>
          )}
        </Stack>
      </Story>

      <Story title="Without a title" description="The message alone, for shorter notices.">
        <Stack>
          <Alert variant="success">Your export is ready to download.</Alert>
        </Stack>
      </Story>

      <PropsTable
        rows={[
          {
            name: 'variant',
            type: "'info' | 'success' | 'warning' | 'danger'",
            default: "'info'",
            description: 'Colour family and default icon.',
          },
          { name: 'title', type: 'string', description: 'Bold first line.' },
          {
            name: 'onDismiss',
            type: '() => void',
            description: 'Renders a close button when provided.',
          },
          {
            name: 'icon',
            type: 'ReactNode',
            description: 'Replaces the default variant icon.',
          },
        ]}
      />
    </>
  );
}
