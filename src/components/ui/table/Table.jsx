'use client';

import { useCallback, useState } from 'react';
import { SortIcon, SortAscIcon, SortDescIcon } from '@/components/icons';
import { cx } from '@/lib/cx';
import styles from './Table.module.scss';

/**
 * Table
 *
 * @param {Array<{key, label, sortable?}>} columns
 * @param {Array<Object>} data - each row keyed by column.key
 * @param {boolean} striped
 * @param {boolean} hoverable
 */
export default function Table({
  columns = [],
  data = [],
  striped = false,
  hoverable = true,
  className,
  ...props
}) {
  const [sort, setSort] = useState({ key: null, dir: 'asc' });

  const handleSort = useCallback((key) => {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
        : { key, dir: 'asc' },
    );
  }, []);

  const sorted = sort.key
    ? [...data].sort((a, b) => {
        const aVal = a[sort.key] ?? '';
        const bVal = b[sort.key] ?? '';
        const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
        return sort.dir === 'asc' ? cmp : -cmp;
      })
    : data;

  const SortIndicator = ({ colKey }) => {
    if (sort.key !== colKey) return <SortIcon size="0.75rem" />;
    return sort.dir === 'asc' ? <SortAscIcon size="0.75rem" /> : <SortDescIcon size="0.75rem" />;
  };

  return (
    <div className={cx(styles.wrap, className)} {...props}>
      <table className={styles.table}>
        <thead className={styles.head}>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={cx(styles.headerCell, col.sortable && styles.sortable)}
                onClick={col.sortable ? () => handleSort(col.key) : undefined}
              >
                {col.label}
                {col.sortable && <SortIndicator colKey={col.key} />}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr
              key={row.id ?? i}
              className={cx(styles.row, striped && styles.striped, hoverable && styles.hoverable)}
            >
              {columns.map((col) => (
                <td key={col.key} className={styles.cell}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
