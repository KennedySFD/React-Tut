import styled from 'styled-components';
import { glassPanelStrong } from '@/theme/mixins';

export const PopoverRoot = styled.div`
  position: relative;
  display: inline-flex;
`;

const placements = {
  top: 'bottom: calc(100% + 0.5rem); left: 50%; transform: translateX(-50%);',
  bottom: 'top: calc(100% + 0.5rem); left: 50%; transform: translateX(-50%);',
  left: 'right: calc(100% + 0.5rem); top: 50%; transform: translateY(-50%);',
  right: 'left: calc(100% + 0.5rem); top: 50%; transform: translateY(-50%);',
};

export const PopoverPanel = styled.div`
  ${glassPanelStrong};
  position: absolute;
  ${({ $placement }) => placements[$placement] ?? placements.bottom};
  z-index: ${({ theme }) => theme.global.zIndex.dropdown};
  min-width: 16rem;
  padding: ${({ theme }) => theme.global.spacing.lg};
  border-radius: ${({ theme }) => theme.global.radii.lg};
`;
