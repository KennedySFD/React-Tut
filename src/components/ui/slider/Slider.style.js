import styled from 'styled-components';
import { interactiveGlass, typography } from '@/theme/mixins';

export const SliderRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.global.spacing.sm};
  width: 100%;
`;

export const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export const SliderLabel = styled.span`
  ${typography('label')};
  color: ${({ theme }) => theme.semantic.colors.text.secondary};
`;

export const SliderValue = styled.span`
  ${typography('caption')};
  font-family: ${({ theme }) => theme.global.fontFamilies.mono};
  color: ${({ theme }) => theme.semantic.colors.text.muted};
`;

export const TrackWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 1.5rem;
  cursor: pointer;
  touch-action: none;

  &[data-disabled] {
    opacity: ${({ theme }) => theme.global.opacities.disabled};
    pointer-events: none;
  }
`;

export const Track = styled.div`
  position: absolute;
  width: 100%;
  height: 0.375rem;
  background: ${({ theme }) => theme.semantic.colors.background.sunken};
  border-radius: ${({ theme }) => theme.global.radii.full};
`;

export const FilledTrack = styled.div`
  position: absolute;
  height: 0.375rem;
  background: ${({ theme }) => theme.semantic.colors.accent.default};
  border-radius: ${({ theme }) => theme.global.radii.full};
  width: ${({ $pct }) => `${$pct}%`};
`;

export const Thumb = styled.div`
  ${interactiveGlass};
  position: absolute;
  left: ${({ $pct }) => `${$pct}%`};
  width: 1.125rem;
  height: 1.125rem;
  margin-left: -0.5625rem;
  background: ${({ theme }) => theme.semantic.colors.background.raised};
  border: ${({ theme }) => theme.global.borderWidths.thick} solid
    ${({ theme }) => theme.semantic.colors.accent.default};
  border-radius: ${({ theme }) => theme.global.radii.full};
  box-shadow: ${({ theme }) => theme.semantic.shadows.sm};
  transition: box-shadow ${({ theme }) => theme.semantic.motion.fast};

  &:hover {
    box-shadow: ${({ theme }) => theme.semantic.shadows.md};
  }
`;
