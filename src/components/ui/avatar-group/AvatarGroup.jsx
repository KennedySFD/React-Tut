'use client';

import Avatar from '@/components/ui/avatar';
import { GroupRoot, AvatarSlot, OverflowBadge } from './AvatarGroup.style';

/**
 * AvatarGroup
 *
 * Stacked avatars with overflow indicator.
 *
 * @param {Array<{src?, name, status?}>} avatars
 * @param {number} max - max visible avatars before overflow
 * @param {'sm'|'md'|'lg'} size
 */
export default function AvatarGroup({
  avatars = [],
  max = 4,
  size = 'md',
  ...props
}) {
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - max;

  return (
    <GroupRoot {...props}>
      {visible.map((av, i) => (
        <AvatarSlot key={i} $offset={i > 0} $z={visible.length - i}>
          <Avatar src={av.src} name={av.name} size={size} status={av.status} />
        </AvatarSlot>
      ))}
      {overflow > 0 && <OverflowBadge $size={size}>+{overflow}</OverflowBadge>}
    </GroupRoot>
  );
}
