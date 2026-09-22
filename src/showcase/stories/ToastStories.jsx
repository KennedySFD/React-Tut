'use client';

import { Button } from '@/components/ui';
import { ToastProvider, useToast } from '@/components/ui/toast';
import { PropsTable, Row, Story } from '../kit';

export const heroControls = {
  variant: { type: 'select', options: ['info', 'success', 'warning', 'danger', 'neutral'], default: 'success' },
};

function ToastTrigger({ variant }) {
  const { toast } = useToast();
  return (
    <Button
      size="sm"
      onClick={() =>
        toast({
          variant,
          title: 'Action completed',
          description: 'Your changes have been saved.',
        })
      }
    >
      Show toast
    </Button>
  );
}

export function Hero({ variant }) {
  return (
    <ToastProvider>
      <ToastTrigger variant={variant} />
    </ToastProvider>
  );
}

function VariantDemo() {
  const { toast } = useToast();
  return (
    <Row style={{ gap: '0.5rem', flexWrap: 'wrap' }}>
      {['info', 'success', 'warning', 'danger', 'neutral'].map((v) => (
        <Button
          key={v}
          size="sm"
          variant="secondary"
          onClick={() => toast({ variant: v, title: `${v.charAt(0).toUpperCase() + v.slice(1)} toast`, description: `This is a ${v} notification.` })}
        >
          {v}
        </Button>
      ))}
    </Row>
  );
}

export default function ToastStories() {
  return (
    <ToastProvider>
      <Story title="Variants" description="Trigger all five toast variants.">
        <VariantDemo />
      </Story>

      <PropsTable
        rows={[
          { name: 'variant', type: "'info' | 'success' | 'warning' | 'danger' | 'neutral'", default: "'neutral'", description: 'Colour family of the toast.' },
          { name: 'title', type: 'string', description: 'Bold heading line.' },
          { name: 'description', type: 'string', description: 'Supporting description text.' },
          { name: 'duration', type: 'number', default: '4000', description: 'Auto-dismiss delay in ms. Infinity to keep open.' },
        ]}
      />
    </ToastProvider>
  );
}
