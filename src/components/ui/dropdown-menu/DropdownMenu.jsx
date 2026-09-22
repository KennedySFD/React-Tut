'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRevealMotion } from '@/hooks/useRevealMotion';
import { MenuRoot, MenuPanel, MenuItem, MenuSeparator, MenuLabel } from './DropdownMenu.style';

/**
 * DropdownMenu
 *
 * A contextual action list triggered by any React element as the trigger.
 * Supports keyboard navigation (ArrowDown/Up, Enter, Escape).
 */
export default function DropdownMenu({
  trigger,
  align = 'left',
  children,
  ...props
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const panelRef = useRevealMotion({ active: open });

  const toggle = useCallback(() => setOpen((v) => !v), []);
  const close = useCallback(() => setOpen(false), []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) close();
    };
    document.addEventListener('pointerdown', handler);
    return () => document.removeEventListener('pointerdown', handler);
  }, [open, close]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, close]);

  return (
    <MenuRoot ref={rootRef} {...props}>
      {typeof trigger === 'function'
        ? trigger({ onClick: toggle, 'aria-expanded': open })
        : <span onClick={toggle}>{trigger}</span>}

      {open && (
        <MenuPanel ref={panelRef} $align={align} role="menu">
          {children}
        </MenuPanel>
      )}
    </MenuRoot>
  );
}

DropdownMenu.Item = function DropdownMenuItem({ icon: Icon, danger, children, onClick, ...props }) {
  return (
    <MenuItem
      role="menuitem"
      data-danger={danger || undefined}
      onClick={onClick}
      {...props}
    >
      {Icon && <Icon />}
      {children}
    </MenuItem>
  );
};

DropdownMenu.Separator = function DropdownMenuSeparator() {
  return <MenuSeparator role="separator" />;
};

DropdownMenu.Label = function DropdownMenuLabel({ children }) {
  return <MenuLabel>{children}</MenuLabel>;
};
