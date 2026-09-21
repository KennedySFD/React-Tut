'use client';

import { Accordion } from '@/components/ui';
import { PropsTable, Story } from '../kit';

const items = [
  {
    id: 'tokens',
    title: 'How does the token system work?',
    content:
      'Three layers: global primitives, semantic roles, then component tokens. Components only ever read semantic or component tokens, so re-branding means editing one file.',
  },
  {
    id: 'states',
    title: 'Where are the interaction states defined?',
    content:
      'In semantic.js under colors.state. The focus ring, hover surface and selected surface are single tokens shared by every control, applied through the mixins in theme/mixins.js.',
  },
  {
    id: 'figma',
    title: 'How does this map to Figma?',
    content:
      'Each token layer corresponds to a Figma variable collection, and light/dark map to modes on the semantic collection — so the two libraries can stay in sync.',
  },
  { id: 'disabled', title: 'A disabled section', content: 'Never opens.', disabled: true },
];

export const heroControls = {
  allowMultiple: { type: 'boolean', default: false },
  startOpen: { type: 'boolean', default: true },
};

export function Hero({ allowMultiple, startOpen }) {
  return (
    <div style={{ width: '100%' }}>
      {/* Remount so the open/close mode change takes effect immediately */}
      <Accordion
        key={`${allowMultiple}-${startOpen}`}
        items={items.slice(0, 3)}
        allowMultiple={allowMultiple}
        defaultOpenIds={startOpen ? ['tokens'] : []}
      />
    </div>
  );
}

export default function AccordionStories() {
  return (
    <>
      <Story
        title="Single"
        description="Opening one section closes the others. The panel animates with a CSS grid row rather than a fixed max-height, so it expands to exactly its content height."
      >
        <Accordion items={items} defaultOpenIds={['tokens']} />
      </Story>

      <Story title="Multiple" description="allowMultiple keeps more than one section open.">
        <Accordion items={items} allowMultiple defaultOpenIds={['tokens', 'states']} />
      </Story>

      <Story title="All closed" description="Omit defaultOpenIds to start collapsed.">
        <Accordion items={items} />
      </Story>

      <PropsTable
        rows={[
          {
            name: 'items',
            type: '{ id, title, content, disabled? }[]',
            default: '[]',
            description: 'The sections to render.',
          },
          {
            name: 'allowMultiple',
            type: 'boolean',
            default: 'false',
            description: 'Keep more than one section open at a time.',
          },
          {
            name: 'defaultOpenIds',
            type: 'string[]',
            default: '[]',
            description: 'Sections open on first render.',
          },
        ]}
      />
    </>
  );
}
