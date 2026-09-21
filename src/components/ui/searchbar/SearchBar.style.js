import styled from 'styled-components';
import { focusRingOnly } from '@/theme/mixins';

/** Clear ("×") affordance that appears once the field has a value. */
export const ClearButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.global.spacing.xxs};
  margin: 0;
  border: none;
  border-radius: ${({ theme }) => theme.global.radii.full};
  background: transparent;
  color: ${({ theme }) => theme.semantic.colors.text.muted};
  cursor: pointer;
  transition: background ${({ theme }) => theme.semantic.motion.fast},
    color ${({ theme }) => theme.semantic.motion.fast};

  &:hover {
    background: ${({ theme }) => theme.semantic.colors.state.hoverSurface};
    color: ${({ theme }) => theme.semantic.colors.text.primary};
  }

  &:active {
    background: ${({ theme }) => theme.semantic.colors.state.activeSurface};
  }

  &:focus-visible {
    ${focusRingOnly};
  }
`;
