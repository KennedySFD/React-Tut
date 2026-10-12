'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRevealMotion } from '@/hooks/useRevealMotion';
import { cx } from '@/lib/cx';
import styles from './Popover.module.scss';

const placementClass = {
  top: styles.top,
  bottom: styles.bottom,
  left: styles.left,
  right: styles.right,
};

/**
 * Popover
 *
 * A positioned content panel — richer than a Tooltip, lighter than a Modal.
 * Click the trigger to toggle; click outside or press Escape to close.
 */
export default function Popover({
  trigger,
  placement = 'bottom',
  children,
  className,
  ...props
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const panelRef = useRevealMotion({ active: open });

  const toggle = useCallback(() => setOpen((v) => !v), []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) close();
    };
    document.addEventListener('pointerdown', handler);
    return () => document.removeEventListener('pointerdown', handler);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, close]);

  return (
    <div ref={rootRef} className={cx(styles.root, className)} {...props}>
      {typeof trigger === 'function'
        ? trigger({ onClick: toggle, 'aria-expanded': open })
        : <span onClick={toggle}>{trigger}</span>}

      {open && (
        <div
          ref={panelRef}
          className={cx(styles.panel, placementClass[placement] || styles.bottom)}
        >
          {children}
        </div>
      )}
    </div>
  );
}
