'use client';

import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon, InfoIcon, SuccessIcon, WarningIcon, DangerIcon } from '@/components/icons';
import { cx } from '@/lib/cx';
import styles from './Toast.module.scss';

const variantClass = {
  info: styles.info,
  success: styles.success,
  warning: styles.warning,
  danger: styles.danger,
  neutral: styles.neutral,
};

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
  const variant = variantClass[toast.variant] || styles.neutral;

  return (
    <div className={cx(styles.toast, variant, leaving && styles.leaving)} role="status">
      {IconComponent && (
        <span className={cx(styles.icon, variant)}>
          <IconComponent size="1.125rem" />
        </span>
      )}
      <div className={styles.body}>
        {toast.title && <p className={styles.title}>{toast.title}</p>}
        {toast.description && <p className={styles.description}>{toast.description}</p>}
      </div>
      <button className={styles.close} onClick={dismiss} aria-label="Dismiss">
        <CloseIcon size="0.75rem" />
      </button>
    </div>
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
          <div className={styles.viewport}>
            {toasts.map((t) => (
              <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
            ))}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
