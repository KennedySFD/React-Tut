'use client';

import { Button, Tooltip } from '@/components/ui';
import { PlusIcon } from '@/components/icons';
import { Hint, PropsTable, Row, Story } from '../kit';

export const heroControls = {
  placement: {
    type: 'select',
    options: ['top', 'bottom', 'left', 'right'],
    default: 'top',
  },
  delay: { type: 'select', options: [0, 150, 600], default: 150 },
};

export function Hero({ placement, delay }) {
  return (
    <Tooltip
      content="Appears on hover and on keyboard focus."
      placement={placement}
      delay={delay}
    >
      <Button variant="secondary">Hover or focus me</Button>
    </Tooltip>
  );
}

export default function TooltipStories() {
  return (
    <>
      <Story
        title="Placements"
        description="Four positions. Placement is CSS-only — no positioning library — so there is no automatic flipping near a viewport edge."
      >
        <Row $gap="xl">
          <Tooltip content="Appears above" placement="top">
            <Button variant="secondary">Top</Button>
          </Tooltip>
          <Tooltip content="Appears below" placement="bottom">
            <Button variant="secondary">Bottom</Button>
          </Tooltip>
          <Tooltip content="Appears to the left" placement="left">
            <Button variant="secondary">Left</Button>
          </Tooltip>
          <Tooltip content="Appears to the right" placement="right">
            <Button variant="secondary">Right</Button>
          </Tooltip>
        </Row>
        <Hint>
          <span>
            Tooltips appear on keyboard focus as well as hover — press <kbd>Tab</kbd> to confirm
            they are not mouse-only. <kbd>Esc</kbd> dismisses.
          </span>
        </Hint>
      </Story>

      <Story title="Long content" description="Wraps at the tooltip's max width, a component token.">
        <Row $gap="xl">
          <Tooltip content="Longer copy wraps at the tooltip's max width, which is defined once in components.js rather than per use.">
            <Button variant="ghost" iconOnly aria-label="Help">
              <PlusIcon />
            </Button>
          </Tooltip>
        </Row>
      </Story>

      <Story title="Delay" description="Hover delay in milliseconds; focus always shows immediately.">
        <Row $gap="xl">
          <Tooltip content="No delay" delay={0}>
            <Button variant="secondary">0ms</Button>
          </Tooltip>
          <Tooltip content="Default delay" delay={150}>
            <Button variant="secondary">150ms</Button>
          </Tooltip>
          <Tooltip content="Slow to appear" delay={600}>
            <Button variant="secondary">600ms</Button>
          </Tooltip>
        </Row>
      </Story>

      <PropsTable
        rows={[
          { name: 'content', type: 'ReactNode', description: 'The tooltip text. Required.' },
          {
            name: 'placement',
            type: "'top' | 'bottom' | 'left' | 'right'",
            default: "'top'",
            description: 'Which side it appears on.',
          },
          {
            name: 'delay',
            type: 'number',
            default: '150',
            description: 'Milliseconds before it appears on hover.',
          },
        ]}
      />
    </>
  );
}
