'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons';
import { cx } from '@/lib/cx';
import styles from './Pagination.module.scss';

function range(start, end) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function getPages(current, total, siblings = 1) {
  const totalNumbers = siblings * 2 + 5;
  if (total <= totalNumbers) return range(1, total);

  const leftSibling = Math.max(current - siblings, 1);
  const rightSibling = Math.min(current + siblings, total);
  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < total - 1;

  if (!showLeftDots && showRightDots) {
    const leftRange = range(1, 3 + 2 * siblings);
    return [...leftRange, '...', total];
  }
  if (showLeftDots && !showRightDots) {
    const rightRange = range(total - (2 + 2 * siblings), total);
    return [1, '...', ...rightRange];
  }
  return [1, '...', ...range(leftSibling, rightSibling), '...', total];
}

/**
 * Pagination
 *
 * @param {number} page - current page (1-indexed)
 * @param {number} totalPages
 * @param {(page: number) => void} onChange
 */
export default function Pagination({
  page = 1,
  totalPages = 1,
  onChange,
  siblings = 1,
  className,
  ...props
}) {
  const pages = getPages(page, totalPages, siblings);

  return (
    <nav className={cx(styles.root, className)} aria-label="Pagination" {...props}>
      <button
        className={styles.page}
        onClick={() => onChange?.(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
      >
        <ChevronLeftIcon size="1rem" />
      </button>

      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`dots-${i}`} className={styles.ellipsis}>…</span>
        ) : (
          <button
            key={p}
            className={cx(styles.page, p === page && styles.active)}
            aria-current={p === page ? 'page' : undefined}
            onClick={() => onChange?.(p)}
          >
            {p}
          </button>
        ),
      )}

      <button
        className={styles.page}
        onClick={() => onChange?.(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
      >
        <ChevronRightIcon size="1rem" />
      </button>
    </nav>
  );
}
