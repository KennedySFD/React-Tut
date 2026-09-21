import styled from 'styled-components';
import { typography } from '@/theme/mixins';

/** Presentational pieces used only by the Foundations stories. */

export const SwatchGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  gap: ${({ theme }) => theme.global.spacing.md};
`;

export const Swatch = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.global.spacing.sm};
`;

export const SwatchChip = styled.div`
  height: 3rem;
  border-radius: ${({ theme }) => theme.global.radii.md};
  background: ${({ $color }) => $color};
  border: ${({ theme }) => theme.global.borderWidths.thin} solid
    ${({ theme }) => theme.semantic.colors.border.subtle};
`;

export const SwatchName = styled.span`
  ${typography('caption')};
  font-family: ${({ theme }) => theme.global.fontFamilies.mono};
  color: ${({ theme }) => theme.semantic.colors.text.secondary};
  word-break: break-all;
`;

export const ScaleRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.global.spacing.lg};
`;

export const ScaleBar = styled.div`
  height: 0.75rem;
  width: ${({ $width }) => $width};
  border-radius: ${({ theme }) => theme.global.radii.sm};
  background: ${({ theme }) => theme.semantic.colors.accent.default};
`;

export const ScaleLabel = styled.span`
  ${typography('caption')};
  font-family: ${({ theme }) => theme.global.fontFamilies.mono};
  min-width: 7rem;
  color: ${({ theme }) => theme.semantic.colors.text.secondary};
`;

/* ---------------------------------------------------------- motion page -- */

export const CurveGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
  gap: ${({ theme }) => theme.global.spacing.lg};
`;

export const CurveBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.global.spacing.sm};
  padding: ${({ theme }) => theme.global.spacing.md};
  background: ${({ theme }) => theme.semantic.colors.background.subtle};
  border: ${({ theme }) => theme.global.borderWidths.thin} solid
    ${({ theme }) => theme.semantic.colors.border.subtle};
  border-radius: ${({ theme }) => theme.global.radii.md};

  svg {
    display: block;
    width: 100%;
    height: auto;
    overflow: visible;
  }

  .grid-line {
    stroke: ${({ theme }) => theme.semantic.colors.border.subtle};
    stroke-width: 1;
  }

  .curve {
    fill: none;
    stroke: ${({ theme }) => theme.semantic.colors.accent.default};
    stroke-width: 3;
    stroke-linecap: round;
  }
`;

export const CurveName = styled.span`
  ${typography('label')};
  color: ${({ theme }) => theme.semantic.colors.text.primary};
`;

export const CurveMeta = styled.span`
  ${typography('caption')};
  font-family: ${({ theme }) => theme.global.fontFamilies.mono};
  font-size: 0.6875rem;
  color: ${({ theme }) => theme.semantic.colors.text.muted};
  word-break: break-all;
`;
