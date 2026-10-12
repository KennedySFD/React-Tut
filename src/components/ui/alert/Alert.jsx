'use client';

import {
  CloseIcon,
  DangerIcon,
  InfoIcon,
  SuccessIcon,
  WarningIcon,
} from '@/components/icons';
import { cx } from '@/lib/cx';
import styles from './Alert.module.scss';

/** Default icon per variant — override with the `icon` prop. */
const icons = {
  info: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  danger: DangerIcon,
};

/**
 * Alert — an inline message banner.
 *
 * @param {'info'|'success'|'warning'|'danger'} variant
 * @param {string} title
 * @param {() => void} onDismiss - renders a close button when provided
 * @param {React.ReactNode} icon - replaces the default variant icon
 */
export default function Alert({
  variant = 'info',
  title,
  icon,
  onDismiss,
  className,
  children,
  ...props
}) {
  const DefaultIcon = icons[variant] ?? InfoIcon;
  const tone = styles[variant] || styles.info;

  return (
    <div
      role={variant === 'danger' ? 'alert' : 'status'}
      className={cx(styles.root, tone, className)}
      {...props}
    >
      <span className={cx(styles.icon, tone)} aria-hidden="true">
        {icon ?? <DefaultIcon />}
      </span>

      <div className={styles.body}>
        {title && <strong className={cx(styles.title, tone)}>{title}</strong>}
        {children && <div className={styles.message}>{children}</div>}
      </div>

      {onDismiss && (
        <button type="button" className={styles.dismiss} onClick={onDismiss} aria-label="Dismiss">
          <CloseIcon />
        </button>
      )}
    </div>
  );
}
