import styled from "styled-components";

export const InputWrapper = styled.div`
  position: relative;
  width: 500px;
`;

export const StyledInput = styled.input`
  padding: 0.5rem 0rem;
  border-radius: 0;
  font-size: 1rem;
  font-weight: 200;
  line-height: 1;
  cursor: text;
  width: 100%;
  background: transparent;
  border: none;
  outline: none;

  &::placeholder {
    color: #A3A3A3;
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 1;
  }
`;

export const BorderLine = styled.span`
  display: block;
  width: 100%;
  height: 1px;
  background: #000000;
  transform-origin: left;
  transform: scaleX(0);
`;


