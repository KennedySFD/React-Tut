'use client';

import { InboxIcon } from '@/components/icons';
import { EmptyRoot, IllustrationWrap, EmptyTitle, EmptyDescription, EmptyActions } from './EmptyState.style';

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
  ...props
}) {
  return (
    <EmptyRoot {...props}>
      <IllustrationWrap>
        <Icon />
      </IllustrationWrap>
      <EmptyTitle>{title}</EmptyTitle>
      {description && <EmptyDescription>{description}</EmptyDescription>}
      {actions && <EmptyActions>{actions}</EmptyActions>}
    </EmptyRoot>
  );
}
