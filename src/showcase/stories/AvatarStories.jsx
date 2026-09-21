'use client';

import { Avatar } from '@/components/ui';
import { Grid, PropsTable, Row, Story } from '../kit';

export const heroControls = {
  size: { type: 'select', options: ['sm', 'md', 'lg', 'xl'], default: 'lg' },
  variant: { type: 'select', options: ['neutral', 'accent'], default: 'neutral' },
  status: { type: 'select', options: ['none', 'online', 'offline', 'busy', 'away'], default: 'none' },
};

export function Hero({ size, variant, status }) {
  return (
    <Avatar
      src="https://i.pravatar.cc/128?u=showcase"
      name="Jane Doe"
      size={size}
      variant={variant}
      status={status === 'none' ? undefined : status}
    />
  );
}

export default function AvatarStories() {
  return (
    <>
      <Story title="Sizes" description="Four sizes, from compact inline to large profile.">
        <Row style={{ gap: '1rem', alignItems: 'center' }}>
          <Avatar src="https://i.pravatar.cc/64?u=sm" name="A B" size="sm" />
          <Avatar src="https://i.pravatar.cc/80?u=md" name="C D" size="md" />
          <Avatar src="https://i.pravatar.cc/112?u=lg" name="E F" size="lg" />
          <Avatar src="https://i.pravatar.cc/160?u=xl" name="G H" size="xl" />
        </Row>
      </Story>

      <Story title="Initials fallback" description="When no image is provided, initials are derived from the name prop.">
        <Row style={{ gap: '1rem', alignItems: 'center' }}>
          <Avatar name="Joe Fowler" size="lg" />
          <Avatar name="Jane Doe" size="lg" variant="accent" />
          <Avatar size="lg" />
        </Row>
      </Story>

      <Story title="Status dots" description="Online, offline, busy and away indicators.">
        <Row style={{ gap: '1rem', alignItems: 'center' }}>
          <Avatar src="https://i.pravatar.cc/80?u=on" name="Online" size="lg" status="online" />
          <Avatar src="https://i.pravatar.cc/80?u=off" name="Offline" size="lg" status="offline" />
          <Avatar src="https://i.pravatar.cc/80?u=busy" name="Busy" size="lg" status="busy" />
          <Avatar src="https://i.pravatar.cc/80?u=away" name="Away" size="lg" status="away" />
        </Row>
      </Story>

      <PropsTable
        rows={[
          { name: 'src', type: 'string', description: 'Image URL.' },
          { name: 'alt', type: 'string', description: 'Accessible alt text.' },
          { name: 'name', type: 'string', description: 'Used to derive initials when no image loads.' },
          { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Avatar size.' },
          { name: 'variant', type: "'neutral' | 'accent'", default: "'neutral'", description: 'Fallback background colour.' },
          { name: 'status', type: "'online' | 'offline' | 'busy' | 'away'", description: 'Renders a coloured status dot.' },
        ]}
      />
    </>
  );
}
