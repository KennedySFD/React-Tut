'use client';

import { ThemeProvider as SCThemeProvider } from 'styled-components';
import theme from './index';
import GlobalStyle from './GlobalStyle';

export default function ThemeProvider({ children }) {
  return (
    <SCThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </SCThemeProvider>
  );
}
