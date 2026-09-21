'use client';

import { Button, Spinner } from '@/components/ui';
import { PropsTable, Row, Story } from '../kit';

export const heroControls = {
  size: { type: 'select', options: ['sm', 'md', 'lg'], default: 'lg' },
};

export function Hero({ size }) {
  return <Spinner size={size} />;
}

export default function SpinnerStories() {
  return (
    <>
      <Story title="Sizes" description="Inherits currentColor, so it works on any surface.">
        <Row $gap="xl">
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </Row>
      </Story>

      <Story
        title="Inside a button"
        description="Button's loading prop swaps the leading icon for a spinner and blocks input."
      >
        <Row>
          <Button loading>Saving</Button>
          <Button variant="secondary" loading>
            Loading
          </Button>
          <Button variant="danger" loading>
            Deleting
          </Button>
          <Button size="lg" loading>
            Large
          </Button>
        </Row>
      </Story>

      <PropsTable
        rows={[
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            default: "'md'",
            description: 'Diameter of the ring.',
          },
          {
            name: 'label',
            type: 'string',
            default: "'Loading'",
            description: 'Accessible description. Pass an empty string inside a labelled button.',
          },
        ]}
      />
    </>
  );
}
