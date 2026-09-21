import styled, { css } from 'styled-components';
import { typography } from '@/theme/mixins';

const sizes = {
  sm: { box: '1.75rem', font: 'xs', dot: '0.5rem', offset: '0px' },
  md: { box: '2.5rem', font: 'sm', dot: '0.625rem', offset: '1px' },
  lg: { box: '3.5rem', font: 'md', dot: '0.75rem', offset: '2px' },
  xl: { box: '5rem', font: 'lg', dot: '0.875rem', offset: '3px' },
};

const statusColors = {
  online: '#22C55E',
  offline: '#A1A1AA',
  busy: '#EF4444',
  away: '#F59E0B',
};

export const StyledAvatar = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: ${({ $size }) => sizes[$size || 'md'].box};
  height: ${({ $size }) => sizes[$size || 'md'].box};
  border-radius: ${({ theme }) => theme.global.radii.full};
  overflow: hidden;
  background: ${({ theme, $variant }) =>
    $variant === 'accent'
      ? theme.semantic.colors.accent.subtle
      : theme.semantic.colors.background.subtle};
  color: ${({ theme, $variant }) =>
    $variant === 'accent'
      ? theme.semantic.colors.accent.text
      : theme.semantic.colors.text.secondary};
  border: ${({ theme }) => theme.global.borderWidths.thin} solid
    ${({ theme }) => theme.semantic.colors.border.subtle};
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Fallback = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-weight: ${({ theme }) => theme.global.fontWeights.semibold};
  font-size: ${({ $size }) => {
    const map = { sm: '0.625rem', md: '0.875rem', lg: '1.125rem', xl: '1.5rem' };
    return map[$size] || map.md;
  }};
  user-select: none;
`;

export const StatusDot = styled.span`
  position: absolute;
  bottom: ${({ $size }) => sizes[$size || 'md'].offset};
  right: ${({ $size }) => sizes[$size || 'md'].offset};
  width: ${({ $size }) => sizes[$size || 'md'].dot};
  height: ${({ $size }) => sizes[$size || 'md'].dot};
  border-radius: ${({ theme }) => theme.global.radii.full};
  background: ${({ $status }) => statusColors[$status] || statusColors.offline};
  border: 2px solid ${({ theme }) => theme.semantic.colors.background.canvas};
`;
