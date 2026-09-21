import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const StyledSpinner = styled.span`
  display: inline-block;
  flex-shrink: 0;
  width: ${({ theme, $size }) => theme.components.spinner.sizes[$size || 'md']};
  height: ${({ theme, $size }) => theme.components.spinner.sizes[$size || 'md']};
  border: ${({ theme }) => theme.components.spinner.borderWidth} solid currentColor;
  border-top-color: transparent;
  border-radius: ${({ theme }) => theme.global.radii.full};
  opacity: ${({ theme }) => theme.global.opacities.muted};
  animation: ${spin} 600ms linear infinite;
`;
