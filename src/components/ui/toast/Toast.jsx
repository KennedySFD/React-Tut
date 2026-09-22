'use client';

import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon, InfoIcon, SuccessIcon, WarningIcon, DangerIcon } from '@/components/icons';
import {
  StyledToast,
  ToastBody,
  ToastClose,
  ToastDescription,
  ToastIcon,
  ToastTitle,
  ToastViewport,
} from './Toast.style';

const icons = { info: InfoIcon, success: SuccessIcon, warning: WarningIcon, danger: DangerIcon };

let toastId = 0;

const ToastContext = createContext(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a <ToastProvider>');
  return ctx;
}

function ToastItem({ toast, onDismiss }) {
  const [leaving, setLeaving] = useState(false);
  const timerRef = useRef(null);

  const dismiss = useCallback(() => {
    setLeaving(true);
    clearTimeout(timerRef.current);
    setTimeout(() => onDismiss(toast.id), 280);
  }, [onDismiss, toast.id]);

  // Auto-dismiss
  if (!timerRef.current && toast.duration !== Infinity) {
    timerRef.current = setTimeout(dismiss, toast.duration ?? 4000);
  }

  const IconComponent = icons[toast.variant];

  return (
    <StyledToast $variant={toast.variant || 'neutral'} $leaving={leaving} role="status">
      {IconComponent && (
        <ToastIcon $variant={toast.variant}>
          <IconComponent size="1.125rem" />
        </ToastIcon>
      )}
      <ToastBody>
        {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
        {toast.description && <ToastDescription>{toast.description}</ToastDescription>}
      </ToastBody>
      <ToastClose onClick={dismiss} aria-label="Dismiss">
        <CloseIcon size="0.75rem" />
      </ToastClose>
    </StyledToast>
  );
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback((options) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, ...options }]);
    return id;
  }, []);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      {typeof document !== 'undefined' &&
        createPortal(
          <ToastViewport>
            {toasts.map((t) => (
              <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
            ))}
          </ToastViewport>,
          document.body,
        )}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
