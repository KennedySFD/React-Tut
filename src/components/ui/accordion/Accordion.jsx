'use client';

import { useId, useState } from 'react';
import { ChevronDownIcon } from '@/components/icons';
import { useInteractiveMotion } from '@/hooks/useInteractiveMotion';
import { cx } from '@/lib/cx';
import styles from './Accordion.module.scss';

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
    <div className={styles.item}>
      <button
        ref={ref}
        type="button"
        id={triggerId}
        className={styles.trigger}
        aria-expanded={open}
        aria-controls={panelId}
        disabled={item.disabled}
        onClick={onToggle}
        {...handlers}
      >
        <span data-motion-label>{item.title}</span>
        <span className={cx(styles.icon, open && styles.open)} aria-hidden="true">
          <ChevronDownIcon />
        </span>
      </button>

      <div className={cx(styles.panel, open && styles.open)}>
        <div className={styles.panelInner}>
          <div
            id={panelId}
            className={styles.content}
            role="region"
            aria-labelledby={triggerId}
            /* inert keeps collapsed content out of the tab order and the
               accessibility tree while it animates shut */
            inert={!open}
          >
            {item.content}
          </div>
        </div>
      </div>
    </div>
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
    <div className={cx(styles.root, className)}>
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
    </div>
  );
}
