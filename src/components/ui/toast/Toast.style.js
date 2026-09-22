import styled, { css, keyframes } from 'styled-components';
import { glassPanelStrong, typography } from '@/theme/mixins';

const slideIn = keyframes`
  from { transform: translateX(100%); opacity: 0; }
  to   { transform: translateX(0);    opacity: 1; }
`;

const slideOut = keyframes`
  from { transform: translateX(0);    opacity: 1; }
  to   { transform: translateX(100%); opacity: 0; }
`;

export const ToastViewport = styled.div`
  position: fixed;
  bottom: ${({ theme }) => theme.global.spacing.xl};
  right: ${({ theme }) => theme.global.spacing.xl};
  z-index: ${({ theme }) => theme.global.zIndex.tooltip};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.global.spacing.sm};
  max-width: 22rem;
  pointer-events: none;
`;

const variantColors = {
  info: (t) => t.semantic.colors.feedback.info,
  success: (t) => t.semantic.colors.feedback.success,
  warning: (t) => t.semantic.colors.feedback.warning,
  danger: (t) => t.semantic.colors.feedback.danger,
  neutral: (t) => t.semantic.colors.feedback.neutral,
};

export const StyledToast = styled.div`
  ${glassPanelStrong};
  pointer-events: auto;
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.global.spacing.md};
  padding: ${({ theme }) => theme.global.spacing.md} ${({ theme }) => theme.global.spacing.lg};
  border-left: 3px solid
    ${({ theme, $variant }) => (variantColors[$variant] ?? variantColors.neutral)(theme).solid};
  border-radius: ${({ theme }) => theme.global.radii.lg};
  animation: ${({ $leaving }) => ($leaving ? slideOut : slideIn)} 0.28s
    ${({ theme }) => theme.semantic.motion.fast} forwards;
`;

export const ToastIcon = styled.span`
  flex-shrink: 0;
  margin-top: 0.125rem;
  color: ${({ theme, $variant }) =>
    (variantColors[$variant] ?? variantColors.neutral)(theme).text};
`;

export const ToastBody = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ToastTitle = styled.p`
  ${typography('label')};
  color: ${({ theme }) => theme.semantic.colors.text.primary};
  margin: 0;
`;

export const ToastDescription = styled.p`
  ${typography('caption')};
  color: ${({ theme }) => theme.semantic.colors.text.secondary};
  margin: ${({ theme }) => theme.global.spacing.xxs} 0 0;
`;

export const ToastClose = styled.button`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  padding: 0;
  border: none;
  background: none;
  color: ${({ theme }) => theme.semantic.colors.text.muted};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.global.radii.sm};
  transition: color ${({ theme }) => theme.semantic.motion.fast};

  &:hover { color: ${({ theme }) => theme.semantic.colors.text.primary}; }
`;
