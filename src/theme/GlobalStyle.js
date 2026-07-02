'use client';

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }

  html,
  body {
    max-width: 100vw;
    overflow-x: hidden;
  }

  body {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    color: ${({ theme }) => theme.semantic.colors.foreground};
    background: ${({ theme }) => theme.semantic.colors.background};
    font-family: Arial, Helvetica, sans-serif;
    font-size: ${({ theme }) => theme.semantic.typography.body.size};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default GlobalStyle;
