'use client';

import { Button } from '@/components/ui';
import EmptyState from '@/components/ui/empty-state';
import { SearchIcon, ImageIcon, MailIcon } from '@/components/icons';
import { PropsTable, Story } from '../kit';

export function Hero() {
  return (
    <EmptyState
      title="No results found"
      description="Try adjusting your search or filters."
      actions={<Button size="sm">Clear filters</Button>}
    />
  );
}

export default function EmptyStateStories() {
  return (
    <>
      <Story title="Default" description="Uses InboxIcon as the default illustration.">
        <EmptyState
          title="No items yet"
          description="Start by adding your first item to get going."
          actions={<Button size="sm">Add item</Button>}
        />
      </Story>

      <Story title="Custom icon" description="Pass any icon component.">
        <EmptyState
          icon={ImageIcon}
          title="No images"
          description="Upload some images to see them here."
          actions={
            <>
              <Button size="sm">Upload</Button>
              <Button size="sm" variant="ghost">Learn more</Button>
            </>
          }
        />
      </Story>

      <Story title="Search empty" description="After a search returns nothing.">
        <EmptyState
          icon={SearchIcon}
          title="No matches"
          description="We couldn't find anything matching your query."
        />
      </Story>

      <PropsTable
        rows={[
          { name: 'icon', type: 'Component', default: 'InboxIcon', description: 'Icon component shown in the circle.' },
          { name: 'title', type: 'string', default: "'Nothing here yet'", description: 'Heading text.' },
          { name: 'description', type: 'string', description: 'Supporting description text.' },
          { name: 'actions', type: 'ReactNode', description: 'Button(s) or CTA slot.' },
        ]}
      />
    </>
  );
}
