import styled, { css, keyframes } from 'styled-components';
import { typography } from '@/theme/mixins';

const shimmer = keyframes`
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
`;

export const ProgressRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.global.spacing.xs};
`;

export const Track = styled.div`
  position: relative;
  width: 100%;
  height: ${({ $size }) =>
    $size === 'sm' ? '0.25rem' : $size === 'lg' ? '0.75rem' : '0.5rem'};
  background: ${({ theme }) => theme.semantic.colors.background.sunken};
  border-radius: ${({ theme }) => theme.global.radii.full};
  overflow: hidden;
`;

export const Fill = styled.div`
  height: 100%;
  width: ${({ $value }) => `${Math.min(Math.max($value, 0), 100)}%`};
  border-radius: inherit;
  background: ${({ theme }) => theme.semantic.colors.accent.default};
  transition: width 0.4s ${({ theme }) => theme.semantic.motion.base};

  ${({ $indeterminate }) =>
    $indeterminate &&
    css`
      width: 40%;
      background-size: 200% 100%;
      background-image: linear-gradient(
        90deg,
        transparent 25%,
        currentColor 50%,
        transparent 75%
      );
      animation: ${shimmer} 1.5s ease-in-out infinite;
    `};
`;

export const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export const ProgressLabel = styled.span`
  ${typography('caption')};
  color: ${({ theme }) => theme.semantic.colors.text.secondary};
`;

export const ProgressValue = styled.span`
  ${typography('caption')};
  font-family: ${({ theme }) => theme.global.fontFamilies.mono};
  color: ${({ theme }) => theme.semantic.colors.text.muted};
`;
