import styled from 'styled-components';
import { typography } from '@/theme/mixins';

export const GroupRoot = styled.div`
  display: flex;
  align-items: center;
`;

export const AvatarSlot = styled.div`
  margin-left: ${({ $offset }) => ($offset ? '-0.5rem' : '0')};
  border: 2px solid ${({ theme }) => theme.semantic.colors.background.canvas};
  border-radius: ${({ theme }) => theme.global.radii.full};
  position: relative;
  z-index: ${({ $z }) => $z};
  transition: transform ${({ theme }) => theme.semantic.motion.fast};

  &:hover {
    transform: translateY(-2px);
    z-index: 50;
  }
`;

export const OverflowBadge = styled.div`
  ${typography('caption')};
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: ${({ $size }) =>
    $size === 'sm' ? '1.5rem' : $size === 'lg' ? '2.5rem' : '2rem'};
  height: ${({ $size }) =>
    $size === 'sm' ? '1.5rem' : $size === 'lg' ? '2.5rem' : '2rem'};
  border-radius: ${({ theme }) => theme.global.radii.full};
  background: ${({ theme }) => theme.semantic.colors.background.subtle};
  border: 2px solid ${({ theme }) => theme.semantic.colors.background.canvas};
  color: ${({ theme }) => theme.semantic.colors.text.muted};
  font-weight: ${({ theme }) => theme.global.fontWeights.semibold};
  font-size: ${({ theme }) => theme.global.fontSizes.xs};
  margin-left: -0.5rem;
  position: relative;
  z-index: 0;
`;
