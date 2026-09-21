'use client';

import { useState } from 'react';
import { Button, Input, Modal, Select } from '@/components/ui';
import { MailIcon } from '@/components/icons';
import { Hint, PropsTable, Row, Stack, Story } from '../kit';

export const heroControls = {
  size: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md' },
  subtitle: { type: 'boolean', default: true },
  closeButton: { type: 'boolean', default: true },
};

/**
 * A modal portals to document.body, so it cannot be rendered inside the hero
 * stage. The isolated instance is therefore its trigger — clicking it opens
 * the dialog over the whole viewport, which is its isolated view.
 */
export function Hero({ size, subtitle, closeButton }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open the dialog</Button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        size={size}
        showCloseButton={closeButton}
        title="Invite your team"
        subtitle={subtitle ? 'They will receive an email invitation.' : undefined}
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Send invites</Button>
          </>
        }
      >
        <Input label="Email address" placeholder="colleague@company.com" iconLeft={<MailIcon />} />
      </Modal>
    </>
  );
}

export default function ModalStories() {
  const [invite, setInvite] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [plain, setPlain] = useState(false);

  return (
    <>
      <Story
        title="Dialog"
        description="Rendered in a portal on document.body, so it is never clipped by a parent's overflow or stacking context."
      >
        <Row>
          <Button onClick={() => setInvite(true)}>Open modal</Button>
          <Button variant="danger" onClick={() => setConfirm(true)}>
            Delete project
          </Button>
          <Button variant="secondary" onClick={() => setPlain(true)}>
            Message only
          </Button>
        </Row>
        <Hint>
          <span>
            Escape closes, the overlay closes, background scroll locks, focus moves in and returns
            to the trigger, and <kbd>Tab</kbd> is trapped inside.
          </span>
        </Hint>
      </Story>

      <Modal
        isOpen={invite}
        onClose={() => setInvite(false)}
        title="Invite your team"
        subtitle="They will receive an email invitation."
        footer={
          <>
            <Button variant="ghost" onClick={() => setInvite(false)}>
              Cancel
            </Button>
            <Button onClick={() => setInvite(false)}>Send invites</Button>
          </>
        }
      >
        <Stack>
          <Input
            label="Email address"
            placeholder="colleague@company.com"
            iconLeft={<MailIcon />}
          />
          <Select
            label="Role"
            options={[
              { value: 'viewer', label: 'Viewer' },
              { value: 'editor', label: 'Editor' },
              { value: 'admin', label: 'Admin' },
            ]}
            value="editor"
            onChange={() => {}}
          />
        </Stack>
      </Modal>

      <Modal
        isOpen={confirm}
        onClose={() => setConfirm(false)}
        title="Delete this project?"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setConfirm(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => setConfirm(false)}>
              Delete
            </Button>
          </>
        }
      >
        This cannot be undone. All associated data will be permanently removed.
      </Modal>

      <Modal isOpen={plain} onClose={() => setPlain(false)} title="Release notes" size="lg">
        The dialog is a frosted pane, and the scrim behind it carries a light blur — so the page
        reads as out-of-focus depth rather than a flat dark sheet.
      </Modal>

      <PropsTable
        rows={[
          { name: 'isOpen', type: 'boolean', default: 'false', description: 'Whether to render.' },
          {
            name: 'onClose',
            type: '() => void',
            description: 'Called by Escape, the overlay and the close button.',
          },
          { name: 'title', type: 'string', description: 'Dialog heading, tied via aria-labelledby.' },
          { name: 'subtitle', type: 'string', description: 'Supporting line under the title.' },
          { name: 'footer', type: 'ReactNode', description: 'Action row, usually buttons.' },
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            default: "'md'",
            description: 'Maximum dialog width.',
          },
          {
            name: 'closeOnOverlayClick',
            type: 'boolean',
            default: 'true',
            description: 'Clicking the scrim closes the dialog.',
          },
          {
            name: 'closeOnEscape',
            type: 'boolean',
            default: 'true',
            description: 'Escape closes the dialog.',
          },
        ]}
      />
    </>
  );
}
