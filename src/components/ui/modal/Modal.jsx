'use client';

import { useEffect, useId, useRef, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@/components/icons';
import { useRevealMotion } from '@/hooks/useRevealMotion';
import {
  Body,
  CloseButton,
  Dialog,
  Footer,
  Header,
  Overlay,
  Subtitle,
  Title,
  TitleGroup,
} from './Modal.style';

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * A portal needs a DOM target, which does not exist while rendering on the
 * server. `useSyncExternalStore` reports false during SSR and hydration, then
 * true on the client — without a setState-in-effect round trip.
 */
const noopSubscribe = () => () => {};
const useIsClient = () =>
  useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

/**
 * Modal — a dialog rendered in a portal on `document.body`, so it is never
 * clipped by a parent's `overflow` or stacking context.
 *
 * @param {boolean} isOpen
 * @param {() => void} onClose
 * @param {'sm'|'md'|'lg'} size
 * @param {React.ReactNode} footer - usually the action buttons
 *
 * Behaviour: Escape closes, clicking the overlay closes, background scroll is
 * locked while open, focus moves into the dialog and returns to the trigger on
 * close, and Tab is trapped inside.
 */
export default function Modal({
  isOpen = false,
  onClose,
  title,
  subtitle,
  footer,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  children,
  ...props
}) {
  const isClient = useIsClient();
  const dialogRef = useRef(null);
  const previouslyFocused = useRef(null);
  const titleId = useId();

  // The dialog travels further than a menu or tooltip, on the same curve
  const revealRef = useRevealMotion({ distance: 'modal', active: isOpen, scale: 0.97 });
  const overlayRef = useRevealMotion({ distance: 0, active: isOpen, scale: 1 });

  const setDialogRef = (node) => {
    dialogRef.current = node;
    revealRef.current = node;
  };

  // Lock background scroll while the dialog is open
  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // Move focus in on open, restore it on close
  useEffect(() => {
    if (!isOpen) return undefined;

    previouslyFocused.current = document.activeElement;
    const firstFocusable = dialogRef.current?.querySelector(FOCUSABLE);
    (firstFocusable ?? dialogRef.current)?.focus();

    return () => {
      previouslyFocused.current?.focus?.();
    };
  }, [isOpen]);

  // Escape to close, Tab kept inside the dialog
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && closeOnEscape) {
        event.preventDefault();
        onClose?.();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = dialogRef.current?.querySelectorAll(FOCUSABLE);
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEscape, onClose]);

  if (!isClient || !isOpen) return null;

  const handleOverlayMouseDown = (event) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose?.();
    }
  };

  return createPortal(
    <Overlay ref={overlayRef} onMouseDown={handleOverlayMouseDown}>
      <Dialog
        ref={setDialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
        $size={size}
        {...props}
      >
        {(title || showCloseButton) && (
          <Header>
            <TitleGroup>
              {title && <Title id={titleId}>{title}</Title>}
              {subtitle && <Subtitle>{subtitle}</Subtitle>}
            </TitleGroup>

            {showCloseButton && (
              <CloseButton type="button" onClick={onClose} aria-label="Close dialog">
                <CloseIcon />
              </CloseButton>
            )}
          </Header>
        )}

        {children && <Body>{children}</Body>}
        {footer && <Footer>{footer}</Footer>}
      </Dialog>
    </Overlay>,
    document.body,
  );
}
