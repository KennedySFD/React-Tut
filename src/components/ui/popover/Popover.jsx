'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRevealMotion } from '@/hooks/useRevealMotion';
import { PopoverRoot, PopoverPanel } from './Popover.style';

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
    <PopoverRoot ref={rootRef} {...props}>
      {typeof trigger === 'function'
        ? trigger({ onClick: toggle, 'aria-expanded': open })
        : <span onClick={toggle}>{trigger}</span>}

      {open && (
        <PopoverPanel ref={panelRef} $placement={placement}>
          {children}
        </PopoverPanel>
      )}
    </PopoverRoot>
  );
}
