'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@/components/icons';
import gsap from '@/lib/gsap';
import { cx } from '@/lib/cx';
import styles from './Drawer.module.scss';

/**
 * Drawer
 *
 * A sliding panel from the left or right edge.
 *
 * @param {boolean} open
 * @param {() => void} onClose
 * @param {'left'|'right'} side
 * @param {string} title
 */
export default function Drawer({
  open,
  onClose,
  side = 'right',
  title,
  children,
  className,
  ...props
}) {
  const panelRef = useRef(null);
  const scrimRef = useRef(null);

  useEffect(() => {
    if (!panelRef.current || !scrimRef.current) return;

    if (open) {
      gsap.to(scrimRef.current, { opacity: 1, duration: 0.28, ease: 'glass' });
      gsap.to(panelRef.current, { x: 0, duration: 0.32, ease: 'glass' });
      document.body.style.overflow = 'hidden';
    } else {
      const dir = side === 'left' ? '-100%' : '100%';
      gsap.to(panelRef.current, { x: dir, duration: 0.22, ease: 'glassIn' });
      gsap.to(scrimRef.current, { opacity: 0, duration: 0.22, ease: 'glassIn' });
      document.body.style.overflow = '';
    }

    return () => { document.body.style.overflow = ''; };
  }, [open, side]);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') onClose?.(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <>
      <div
        ref={scrimRef}
        className={styles.scrim}
        style={{ opacity: 0, pointerEvents: open ? 'auto' : 'none' }}
        onClick={onClose}
      />
      <aside
        ref={panelRef}
        className={cx(styles.panel, side === 'left' ? styles.left : styles.right, className)}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        {...props}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.close} onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </aside>
    </>,
    document.body,
  );
}
