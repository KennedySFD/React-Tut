'use client';

import Avatar from '@/components/ui/avatar';
import { cx } from '@/lib/cx';
import styles from './AvatarGroup.module.scss';

const sizeClass = {
  sm: styles.sm,
  lg: styles.lg,
};

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
  className,
  ...props
}) {
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - max;

  return (
    <div className={cx(styles.root, className)} {...props}>
      {visible.map((av, i) => (
        <div
          key={i}
          className={cx(styles.slot, i > 0 && styles.offset)}
          style={{ '--slot-z': visible.length - i }}
        >
          <Avatar src={av.src} name={av.name} size={size} status={av.status} />
        </div>
      ))}
      {overflow > 0 && (
        <div className={cx(styles.overflow, sizeClass[size])}>+{overflow}</div>
      )}
    </div>
  );
}
