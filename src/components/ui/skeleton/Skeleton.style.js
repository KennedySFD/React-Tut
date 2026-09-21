import styled, { css, keyframes } from 'styled-components';

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`;

const variantDefaults = {
  text: { width: '100%', height: '1rem', radius: 'sm' },
  circle: { width: '2.5rem', height: '2.5rem', radius: 'full' },
  rect: { width: '100%', height: '6rem', radius: 'md' },
};

export const StyledSkeleton = styled.div`
  ${({ $variant, $width, $height, theme }) => {
    const v = variantDefaults[$variant] || variantDefaults.text;
    return css`
      width: ${$width || v.width};
      height: ${$height || v.height};
      border-radius: ${theme.global.radii[v.radius]};
    `;
  }};
  background: ${({ theme }) => theme.semantic.colors.background.subtle};
  animation: ${pulse} 1.8s ease-in-out infinite;
`;
