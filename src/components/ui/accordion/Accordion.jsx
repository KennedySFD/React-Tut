'use client';

import { useId, useState } from 'react';
import { ChevronDownIcon } from '@/components/icons';
import { useInteractiveMotion } from '@/hooks/useInteractiveMotion';
import {
  AccordionRoot,
  Item,
  PanelContent,
  PanelInner,
  PanelOuter,
  Trigger,
  TriggerIcon,
} from './Accordion.style';

/**
 * One row. Extracted into its own component because each trigger needs its
 * own motion hook, and hooks cannot be called inside a loop.
 */
function AccordionItem({ item, open, onToggle, triggerId, panelId }) {
  const { ref, handlers } = useInteractiveMotion({
    preset: 'subtle',
    disabled: item.disabled,
  });

  return (
    <Item>
      <Trigger
        ref={ref}
        type="button"
        id={triggerId}
        aria-expanded={open}
        aria-controls={panelId}
        disabled={item.disabled}
        onClick={onToggle}
        {...handlers}
      >
        <span data-motion-label>{item.title}</span>
        <TriggerIcon $open={open} aria-hidden="true">
          <ChevronDownIcon />
        </TriggerIcon>
      </Trigger>

      <PanelOuter $open={open}>
        <PanelInner>
          <PanelContent
            id={panelId}
            role="region"
            aria-labelledby={triggerId}
            /* inert keeps collapsed content out of the tab order and the
               accessibility tree while it animates shut */
            inert={!open}
          >
            {item.content}
          </PanelContent>
        </PanelInner>
      </PanelOuter>
    </Item>
  );
}

/**
 * Accordion — collapsible sections.
 *
 * @param {{id: string, title: string, content: React.ReactNode, disabled?: boolean}[]} items
 * @param {boolean} allowMultiple - keep more than one section open at a time
 * @param {string[]} defaultOpenIds
 *
 * States: hover, focus, expanded, disabled.
 */
export default function Accordion({
  items = [],
  allowMultiple = false,
  defaultOpenIds = [],
  className,
}) {
  const baseId = useId();
  const [openIds, setOpenIds] = useState(defaultOpenIds);

  const toggle = (id) => {
    setOpenIds((current) => {
      const isOpen = current.includes(id);

      if (allowMultiple) {
        return isOpen ? current.filter((openId) => openId !== id) : [...current, id];
      }
      return isOpen ? [] : [id];
    });
  };

  return (
    <AccordionRoot className={className}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          open={openIds.includes(item.id)}
          onToggle={() => toggle(item.id)}
          triggerId={`${baseId}-trigger-${item.id}`}
          panelId={`${baseId}-panel-${item.id}`}
        />
      ))}
    </AccordionRoot>
  );
}
