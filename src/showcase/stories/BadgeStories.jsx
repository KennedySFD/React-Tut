'use client';

import { Badge, Button, Avatar } from '@/components/ui';
import { MailIcon } from '@/components/icons';
import { Grid, PropsTable, Row, Story } from '../kit';

export const heroControls = {
  count: { type: 'select', options: ['0', '3', '12', '100'], default: '3' },
  variant: { type: 'select', options: ['danger', 'accent', 'success', 'warning', 'neutral'], default: 'danger' },
  dot: { type: 'boolean', default: false },
};

export function Hero({ count, variant, dot }) {
  return (
    <Badge count={Number(count)} variant={variant} dot={dot}>
      <Button variant="secondary" iconOnly><MailIcon /></Button>
    </Badge>
  );
}

export default function BadgeStories() {
  return (
    <>
      <Story title="On buttons" description="Overlays a count badge on a control.">
        <Row style={{ gap: '2rem' }}>
          <Badge count={5}><Button variant="secondary" iconOnly><MailIcon /></Button></Badge>
          <Badge count={120} max={99}><Button variant="secondary" iconOnly><MailIcon /></Button></Badge>
          <Badge count={0} showZero><Button variant="secondary" iconOnly><MailIcon /></Button></Badge>
        </Row>
      </Story>

      <Story title="On avatars" description="Status dot or count on a user image.">
        <Row style={{ gap: '2rem' }}>
          <Badge dot variant="success"><Avatar src="https://i.pravatar.cc/80?u=b1" name="Joe" size="lg" /></Badge>
          <Badge count={3} variant="danger"><Avatar src="https://i.pravatar.cc/80?u=b2" name="Jane" size="lg" /></Badge>
        </Row>
      </Story>

      <Story title="Variants" description="Five colour families.">
        <Row style={{ gap: '2rem' }}>
          {['danger', 'accent', 'success', 'warning', 'neutral'].map((v) => (
            <Badge key={v} count={8} variant={v}><Button variant="ghost" iconOnly><MailIcon /></Button></Badge>
          ))}
        </Row>
      </Story>

      <PropsTable
        rows={[
          { name: 'count', type: 'number | string', default: '0', description: 'The number to display.' },
          { name: 'max', type: 'number', default: '99', description: 'Counts above this show "max+".' },
          { name: 'dot', type: 'boolean', default: 'false', description: 'Renders a dot instead of a count.' },
          { name: 'showZero', type: 'boolean', default: 'false', description: 'Show badge when count is 0.' },
          { name: 'variant', type: "'accent' | 'danger' | 'success' | 'warning' | 'neutral'", default: "'danger'", description: 'Colour family.' },
          { name: 'children', type: 'ReactNode', description: 'The element the badge attaches to.' },
        ]}
      />
    </>
  );
}
