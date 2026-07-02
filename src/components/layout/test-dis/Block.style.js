import styled from "styled-components";

export const Wrapper = styled.div`
    background :white;
    display: flex;
    flex-direction: column;
    padding: 2rem;
    gap: 2rem;
    border-radius: 0.5rem;
    border-style: solid;
    border-color:hsl(0, 0.00%, 92.00%);
    min-width: 0;
    max-width: 700px;
    
`;

export const Heading = styled.h1`
    color: black;
    font-size: 1rem;
    overflow-wrap: break-word;
    min-width: 0;

`;

export const BoxCol = styled.div`
    background: red;
    height: 100px;
`;