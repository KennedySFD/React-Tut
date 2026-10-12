'use client';

import { InboxIcon } from '@/components/icons';
import { cx } from '@/lib/cx';
import styles from './EmptyState.module.scss';

/**
 * EmptyState
 *
 * Placeholder when a list or area has no content yet.
 *
 * @param {ReactNode} icon - icon component (defaults to InboxIcon)
 * @param {string} title
 * @param {string} description
 * @param {ReactNode} actions - button(s) / CTA slot
 */
export default function EmptyState({
  icon: Icon = InboxIcon,
  title = 'Nothing here yet',
  description,
  actions,
  className,
  ...props
}) {
  return (
    <div className={cx(styles.root, className)} {...props}>
      <div className={styles.illustration}>
        <Icon />
      </div>
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
}
