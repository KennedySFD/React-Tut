import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 500px;
  max-width: 800px;
  padding: 1.5rem;
  border: 1px solid #e5e5e5;
  border-radius: 0.5rem;
  background: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Heading = styled.h2`
  flex:2;
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  
`;

export const BoxRow = styled.div`
  flex:1;
  justify-content: center;
  height: 300px;
  display: flex;
  flex-direction: column;
  gap: 0.50rem;

`;

export const ColorBox = styled.div`
  flex:1;
  padding: 1rem;
  background: ${({ $color }) => $color};
  color: white;
  font-weight: 600;
  text-align: center;
  border-radius: 0.5rem;
`;
