import styled from "styled-components";

const variants = {
  primary: {
    bg: "#3B82F6",
    color: "#FFFFFF",
    border: "transparent",
    hoverBg: "#2563EB",
    activeBg: "#1D4ED8",
  },
  secondary: {
    bg: "#FFFFFF",
    color: "#171717",
    border: "#D4D4D4",
    hoverBg: "#F5F5F5",
    activeBg: "#E5E5E5",
  },
  tertiary: {
    bg: "transparent",
    color: "#3B82F6",
    border: "transparent",
    hoverBg: "#EFF6FF",
    activeBg: "#DBEAFE",
  },
};

export const StyledButton = styled.button`
  padding: 1rem 1rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  background: ${({ $variant }) => variants[$variant || "primary"].bg};
  color: ${({ $variant }) => variants[$variant || "primary"].color};
  border: 2px solid ${({ $variant }) => variants[$variant || "primary"].border};

  &:hover:not(:disabled) {
    background: ${({ $variant }) => variants[$variant || "primary"].hoverBg};
  }

  &:active:not(:disabled) {
    background: ${({ $variant }) => variants[$variant || "primary"].activeBg};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
