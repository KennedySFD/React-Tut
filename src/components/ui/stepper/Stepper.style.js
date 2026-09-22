import styled from 'styled-components';
import { typography } from '@/theme/mixins';

export const StepperRoot = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0;
  width: 100%;
`;

export const StepItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.global.spacing.sm};
  position: relative;
`;

export const StepIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: ${({ theme }) => theme.global.radii.full};
  font-size: ${({ theme }) => theme.global.fontSizes.xs};
  font-weight: ${({ theme }) => theme.global.fontWeights.semibold};
  z-index: 1;
  transition: background ${({ theme }) => theme.semantic.motion.fast},
    color ${({ theme }) => theme.semantic.motion.fast},
    border-color ${({ theme }) => theme.semantic.motion.fast};

  background: ${({ theme, $status }) => {
    if ($status === 'complete') return theme.semantic.colors.accent.default;
    if ($status === 'active') return theme.semantic.colors.accent.default;
    return theme.semantic.colors.background.raised;
  }};
  color: ${({ theme, $status }) => {
    if ($status === 'complete' || $status === 'active') return theme.semantic.colors.accent.onAccent;
    return theme.semantic.colors.text.muted;
  }};
  border: ${({ theme }) => theme.global.borderWidths.thick} solid
    ${({ theme, $status }) => {
      if ($status === 'complete' || $status === 'active') return theme.semantic.colors.accent.default;
      return theme.semantic.colors.border.default;
    }};
`;

export const StepConnector = styled.div`
  position: absolute;
  top: 1rem;
  left: calc(50% + 1rem);
  right: calc(-50% + 1rem);
  height: 2px;
  background: ${({ theme, $complete }) =>
    $complete ? theme.semantic.colors.accent.default : theme.semantic.colors.border.default};
  transition: background ${({ theme }) => theme.semantic.motion.fast};
`;

export const StepLabel = styled.span`
  ${typography('caption')};
  text-align: center;
  color: ${({ theme, $status }) =>
    $status === 'active' ? theme.semantic.colors.text.primary : theme.semantic.colors.text.muted};
`;
