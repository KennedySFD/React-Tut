import styled, { css } from 'styled-components';

const borderToken = ($weight) => css`
  border-color: ${({ theme }) => {
    const map = {
      subtle: theme.semantic.colors.border.subtle,
      default: theme.semantic.colors.border.default,
      strong: theme.semantic.colors.border.strong,
    };
    return map[$weight] || map.default;
  }};
`;

export const StyledDivider = styled.div`
  border: none;
  flex-shrink: 0;

  ${({ $orientation, $weight, $hasLabel }) =>
    $orientation === 'vertical'
      ? css`
          align-self: stretch;
          width: 0;
          border-left: ${({ theme }) => theme.global.borderWidths.thin} solid;
          ${borderToken($weight)};
        `
      : $hasLabel
        ? css`
            display: flex;
            align-items: center;
            gap: ${({ theme }) => theme.global.spacing.md};
            width: 100%;
            color: ${({ theme }) => theme.semantic.colors.text.muted};
            font-size: ${({ theme }) => theme.global.fontSizes.xs};
            font-weight: ${({ theme }) => theme.global.fontWeights.medium};
            letter-spacing: ${({ theme }) => theme.global.letterSpacings.wide};
            text-transform: uppercase;

            &::before,
            &::after {
              content: '';
              flex: 1;
              height: 0;
              border-top: ${({ theme }) => theme.global.borderWidths.thin} solid;
              ${borderToken($weight)};
            }
          `
        : css`
            width: 100%;
            height: 0;
            border-top: ${({ theme }) => theme.global.borderWidths.thin} solid;
            ${borderToken($weight)};
          `};
`;
