import styled from 'styled-components';
import { typography } from '@/theme/mixins';

export const TableWrap = styled.div`
  overflow-x: auto;
  border: ${({ theme }) => theme.global.borderWidths.thin} solid
    ${({ theme }) => theme.semantic.colors.border.subtle};
  border-radius: ${({ theme }) => theme.global.radii.lg};
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.global.fontSizes.sm};
`;

export const Thead = styled.thead`
  background: ${({ theme }) => theme.semantic.colors.background.subtle};
`;

export const Th = styled.th`
  ${typography('caption')};
  text-align: left;
  padding: ${({ theme }) => theme.global.spacing.md} ${({ theme }) => theme.global.spacing.lg};
  color: ${({ theme }) => theme.semantic.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.global.letterSpacings.wide};
  white-space: nowrap;
  border-bottom: ${({ theme }) => theme.global.borderWidths.thin} solid
    ${({ theme }) => theme.semantic.colors.border.subtle};
  user-select: none;
  cursor: ${({ $sortable }) => ($sortable ? 'pointer' : 'default')};

  &:hover {
    color: ${({ theme, $sortable }) =>
      $sortable ? theme.semantic.colors.text.primary : undefined};
  }

  svg { vertical-align: middle; margin-left: 0.25rem; }
`;

export const Tbody = styled.tbody``;

export const Tr = styled.tr`
  border-bottom: ${({ theme }) => theme.global.borderWidths.thin} solid
    ${({ theme }) => theme.semantic.colors.border.subtle};
  transition: background ${({ theme }) => theme.semantic.motion.fast};

  &:last-child { border-bottom: none; }

  ${({ $striped, theme }) =>
    $striped &&
    `&:nth-child(even) { background: ${theme.semantic.colors.background.subtle}; }`};

  ${({ $hoverable, theme }) =>
    $hoverable &&
    `&:hover { background: ${theme.semantic.colors.state.hoverSurface}; }`};
`;

export const Td = styled.td`
  padding: ${({ theme }) => theme.global.spacing.md} ${({ theme }) => theme.global.spacing.lg};
  color: ${({ theme }) => theme.semantic.colors.text.secondary};
  vertical-align: top;
`;
