'use client';

import { useCallback, useState } from 'react';
import { SortIcon, SortAscIcon, SortDescIcon } from '@/components/icons';
import { TableWrap, StyledTable, Thead, Th, Tbody, Tr, Td } from './Table.style';

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
    <TableWrap {...props}>
      <StyledTable>
        <Thead>
          <tr>
            {columns.map((col) => (
              <Th
                key={col.key}
                $sortable={col.sortable}
                onClick={col.sortable ? () => handleSort(col.key) : undefined}
              >
                {col.label}
                {col.sortable && <SortIndicator colKey={col.key} />}
              </Th>
            ))}
          </tr>
        </Thead>
        <Tbody>
          {sorted.map((row, i) => (
            <Tr key={row.id ?? i} $striped={striped} $hoverable={hoverable}>
              {columns.map((col) => (
                <Td key={col.key}>{col.render ? col.render(row[col.key], row) : row[col.key]}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </StyledTable>
    </TableWrap>
  );
}
