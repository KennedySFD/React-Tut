'use client';

import { ChevronRightIcon } from '@/components/icons';
import { BreadcrumbItem, BreadcrumbLink, Separator, StyledBreadcrumb } from './Breadcrumb.style';

/**
 * Breadcrumb — a navigation trail showing the current page hierarchy.
 *
 * @param {{label: string, href?: string}[]} items - ordered crumbs; the last is "current"
 * @param {React.ReactNode} separator - override the default chevron
 */
export default function Breadcrumb({ items = [], separator, ...props }) {
  return (
    <StyledBreadcrumb aria-label="Breadcrumb" {...props}>
      <ol>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <BreadcrumbItem key={item.label}>
              {item.href && !isLast ? (
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              ) : (
                <span aria-current={isLast ? 'page' : undefined}>{item.label}</span>
              )}
              {!isLast && (
                <Separator aria-hidden="true">
                  {separator || <ChevronRightIcon size="0.75em" />}
                </Separator>
              )}
            </BreadcrumbItem>
          );
        })}
      </ol>
    </StyledBreadcrumb>
  );
}
