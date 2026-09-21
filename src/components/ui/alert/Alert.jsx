'use client';

import {
  CloseIcon,
  DangerIcon,
  InfoIcon,
  SuccessIcon,
  WarningIcon,
} from '@/components/icons';
import {
  AlertBody,
  AlertIcon,
  AlertMessage,
  AlertTitle,
  DismissButton,
  StyledAlert,
} from './Alert.style';

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
  children,
  ...props
}) {
  const DefaultIcon = icons[variant] ?? InfoIcon;

  return (
    <StyledAlert
      role={variant === 'danger' ? 'alert' : 'status'}
      $variant={variant}
      {...props}
    >
      <AlertIcon $variant={variant} aria-hidden="true">
        {icon ?? <DefaultIcon />}
      </AlertIcon>

      <AlertBody>
        {title && <AlertTitle $variant={variant}>{title}</AlertTitle>}
        {children && <AlertMessage>{children}</AlertMessage>}
      </AlertBody>

      {onDismiss && (
        <DismissButton type="button" onClick={onDismiss} aria-label="Dismiss">
          <CloseIcon />
        </DismissButton>
      )}
    </StyledAlert>
  );
}
