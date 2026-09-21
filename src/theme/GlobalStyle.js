'use client';

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  * {
    padding: 0;
    margin: 0;
  }

  html {
    height: 100%;
    /* Tells the browser which palette to use for native UI (scrollbars,
       autofill, date pickers) so they follow the active mode. */
    color-scheme: ${({ theme }) => theme.mode};
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
    color: ${({ theme }) => theme.semantic.colors.text.primary};
    background: ${({ theme }) => theme.semantic.colors.background.canvas};
    font-family: ${({ theme }) => theme.semantic.typography.body.family};
    font-size: ${({ theme }) => theme.semantic.typography.body.size};
    line-height: ${({ theme }) => theme.semantic.typography.body.lineHeight};
    transition: background ${({ theme }) => theme.semantic.motion.base},
      color ${({ theme }) => theme.semantic.motion.base};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  /* Form controls do not inherit typography by default */
  button,
  input,
  select,
  textarea {
    font: inherit;
    color: inherit;
  }

  /* Components provide their own :focus-visible rings via the focusRing mixin,
     so the default outline is removed only where one is supplied. */
  :focus-visible {
    outline: ${({ theme }) => theme.global.borderWidths.thick} solid
      ${({ theme }) => theme.semantic.colors.state.focusBorder};
    outline-offset: 2px;
  }

  ::selection {
    background: ${({ theme }) => theme.semantic.colors.accent.muted};
    color: ${({ theme }) => theme.semantic.colors.text.primary};
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

export default GlobalStyle;
