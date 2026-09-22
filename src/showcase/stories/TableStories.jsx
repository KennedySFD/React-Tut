'use client';

import Table from '@/components/ui/table';
import { PropsTable, Story } from '../kit';

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'status', label: 'Status' },
  { key: 'email', label: 'Email' },
];

const data = [
  { id: 1, name: 'Alice Johnson', role: 'Engineer', status: 'Active', email: 'alice@example.com' },
  { id: 2, name: 'Bob Chen', role: 'Designer', status: 'Active', email: 'bob@example.com' },
  { id: 3, name: 'Carol Smith', role: 'Manager', status: 'Away', email: 'carol@example.com' },
  { id: 4, name: 'David Lee', role: 'Engineer', status: 'Inactive', email: 'david@example.com' },
  { id: 5, name: 'Eve Martinez', role: 'Designer', status: 'Active', email: 'eve@example.com' },
];

export function Hero() {
  return <Table columns={columns} data={data} />;
}

export default function TableStories() {
  return (
    <>
      <Story title="Sortable columns" description="Click a column header to sort ascending or descending.">
        <Table columns={columns} data={data} />
      </Story>

      <Story title="Striped rows" description="Alternating row background for readability.">
        <Table columns={columns} data={data} striped />
      </Story>

      <PropsTable
        rows={[
          { name: 'columns', type: 'Array<{key, label, sortable?, render?}>', description: 'Column definitions.' },
          { name: 'data', type: 'Array<Object>', description: 'Row data keyed by column key.' },
          { name: 'striped', type: 'boolean', default: 'false', description: 'Alternating row backgrounds.' },
          { name: 'hoverable', type: 'boolean', default: 'true', description: 'Highlight rows on hover.' },
        ]}
      />
    </>
  );
}
