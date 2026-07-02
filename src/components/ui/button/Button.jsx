'use client';

import { StyledButton } from './Button.style';

export default function Button({ variant, children, ...props }) {
  return (
    <StyledButton $variant={variant} {...props}>
      {children}
    </StyledButton>
  );
}
