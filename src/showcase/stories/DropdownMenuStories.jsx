'use client';

import { Button } from '@/components/ui';
import DropdownMenu from '@/components/ui/dropdown-menu';
import { UserIcon, MailIcon, ExternalLinkIcon, CloseIcon } from '@/components/icons';
import { PropsTable, Row, Story } from '../kit';

export function Hero() {
  return (
    <DropdownMenu
      trigger={(props) => <Button size="sm" {...props}>Open menu</Button>}
    >
      <DropdownMenu.Label>Account</DropdownMenu.Label>
      <DropdownMenu.Item icon={UserIcon}>Profile</DropdownMenu.Item>
      <DropdownMenu.Item icon={MailIcon}>Messages</DropdownMenu.Item>
      <DropdownMenu.Separator />
      <DropdownMenu.Item icon={ExternalLinkIcon}>View docs</DropdownMenu.Item>
      <DropdownMenu.Separator />
      <DropdownMenu.Item icon={CloseIcon} danger>Sign out</DropdownMenu.Item>
    </DropdownMenu>
  );
}

export default function DropdownMenuStories() {
  return (
    <>
      <Story title="Basic menu" description="A menu with grouped items and separators.">
        <DropdownMenu
          trigger={(props) => <Button size="sm" variant="secondary" {...props}>Actions</Button>}
        >
          <DropdownMenu.Item icon={UserIcon}>Edit profile</DropdownMenu.Item>
          <DropdownMenu.Item icon={MailIcon}>Invite team</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item danger>Delete account</DropdownMenu.Item>
        </DropdownMenu>
      </Story>

      <Story title="Right-aligned" description="Aligns the menu to the right of the trigger.">
        <Row style={{ justifyContent: 'flex-end' }}>
          <DropdownMenu
            align="right"
            trigger={(props) => <Button size="sm" variant="ghost" {...props}>⋮</Button>}
          >
            <DropdownMenu.Item>Copy link</DropdownMenu.Item>
            <DropdownMenu.Item>Duplicate</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item danger>Remove</DropdownMenu.Item>
          </DropdownMenu>
        </Row>
      </Story>

      <PropsTable
        rows={[
          { name: 'trigger', type: 'ReactNode | (props) => ReactNode', description: 'The element that opens the menu.' },
          { name: 'align', type: "'left' | 'right'", default: "'left'", description: 'Horizontal alignment of the panel.' },
          { name: 'children', type: 'ReactNode', description: 'Menu items, separators and labels.' },
        ]}
      />
    </>
  );
}
