'use client';

import AvatarGroup from '@/components/ui/avatar-group';
import { PropsTable, Row, Story } from '../kit';

const people = [
  { name: 'Alice', src: 'https://i.pravatar.cc/80?u=ag1' },
  { name: 'Bob', src: 'https://i.pravatar.cc/80?u=ag2' },
  { name: 'Carol', src: 'https://i.pravatar.cc/80?u=ag3' },
  { name: 'David', src: 'https://i.pravatar.cc/80?u=ag4' },
  { name: 'Eve', src: 'https://i.pravatar.cc/80?u=ag5' },
  { name: 'Frank', src: 'https://i.pravatar.cc/80?u=ag6' },
  { name: 'Grace', src: 'https://i.pravatar.cc/80?u=ag7' },
];

export const heroControls = {
  max: { type: 'select', options: ['3', '4', '5'], default: '4' },
  size: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md' },
};

export function Hero({ max, size }) {
  return <AvatarGroup avatars={people} max={Number(max)} size={size} />;
}

export default function AvatarGroupStories() {
  return (
    <>
      <Story title="Sizes" description="Small, medium and large stacked avatars.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <AvatarGroup avatars={people} max={4} size="sm" />
          <AvatarGroup avatars={people} max={4} size="md" />
          <AvatarGroup avatars={people} max={4} size="lg" />
        </div>
      </Story>

      <Story title="Max overflow" description="Change the max to control how many are shown.">
        <Row style={{ gap: '2rem' }}>
          <AvatarGroup avatars={people} max={3} />
          <AvatarGroup avatars={people} max={5} />
        </Row>
      </Story>

      <Story title="With status" description="Each avatar can have a status dot.">
        <AvatarGroup
          avatars={[
            { name: 'Alice', src: 'https://i.pravatar.cc/80?u=ag1', status: 'online' },
            { name: 'Bob', src: 'https://i.pravatar.cc/80?u=ag2', status: 'busy' },
            { name: 'Carol', src: 'https://i.pravatar.cc/80?u=ag3', status: 'offline' },
            { name: 'David', src: 'https://i.pravatar.cc/80?u=ag4', status: 'online' },
          ]}
          max={4}
          size="lg"
        />
      </Story>

      <PropsTable
        rows={[
          { name: 'avatars', type: 'Array<{src?, name, status?}>', description: 'Avatar data in display order.' },
          { name: 'max', type: 'number', default: '4', description: 'Maximum visible before +N overflow.' },
          { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Avatar size.' },
        ]}
      />
    </>
  );
}
