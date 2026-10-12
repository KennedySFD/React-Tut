'use client';

import { ChevronRightIcon } from '@/components/icons';
import { cx } from '@/lib/cx';
import styles from './Breadcrumb.module.scss';

/**
 * Breadcrumb — a navigation trail showing the current page hierarchy.
 *
 * @param {{label: string, href?: string}[]} items - ordered crumbs; the last is "current"
 * @param {React.ReactNode} separator - override the default chevron
 */
export default function Breadcrumb({ items = [], separator, className, ...props }) {
  return (
    <nav aria-label="Breadcrumb" className={cx(styles.root, className)} {...props}>
      <ol>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.label} className={styles.item}>
              {item.href && !isLast ? (
                <a className={styles.link} href={item.href}>{item.label}</a>
              ) : (
                <span aria-current={isLast ? 'page' : undefined}>{item.label}</span>
              )}
              {!isLast && (
                <span className={styles.separator} aria-hidden="true">
                  {separator || <ChevronRightIcon size="0.75em" />}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
