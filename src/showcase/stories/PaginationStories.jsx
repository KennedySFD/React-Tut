'use client';

import { useState } from 'react';
import Pagination from '@/components/ui/pagination';
import { PropsTable, Story } from '../kit';

export const heroControls = {
  totalPages: { type: 'select', options: ['5', '10', '20', '50'], default: '10' },
};

export function Hero({ totalPages }) {
  const [page, setPage] = useState(1);
  return <Pagination page={page} totalPages={Number(totalPages)} onChange={setPage} />;
}

export default function PaginationStories() {
  return (
    <>
      <Story title="Short list" description="Five pages — no ellipsis needed.">
        {(() => {
          const [page, setPage] = useState(1);
          return <Pagination page={page} totalPages={5} onChange={setPage} />;
        })()}
      </Story>

      <Story title="Long list" description="Fifty pages with ellipsis truncation.">
        {(() => {
          const [page, setPage] = useState(25);
          return <Pagination page={page} totalPages={50} onChange={setPage} />;
        })()}
      </Story>

      <PropsTable
        rows={[
          { name: 'page', type: 'number', default: '1', description: 'Current page (1-indexed).' },
          { name: 'totalPages', type: 'number', default: '1', description: 'Total number of pages.' },
          { name: 'onChange', type: '(page: number) => void', description: 'Called when page changes.' },
          { name: 'siblings', type: 'number', default: '1', description: 'Pages shown each side of current.' },
        ]}
      />
    </>
  );
}
