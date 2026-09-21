'use client';

import { useMemo } from 'react';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
import { ThemeModeProvider, useThemeMode } from '@/context/ThemeModeContext';
import { createTheme } from './index';
import GlobalStyle from './GlobalStyle';

/**
 * Rebuilds the styled-components theme whenever the colour mode changes.
 * Kept separate so it can call useThemeMode() inside the provider above it.
 */
function ThemedRoot({ children }) {
  const { mode } = useThemeMode();
  const theme = useMemo(() => createTheme(mode), [mode]);

  return (
    <SCThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </SCThemeProvider>
  );
}

export default function ThemeProvider({ children, defaultMode = 'light' }) {
  return (
    <ThemeModeProvider defaultMode={defaultMode}>
      <ThemedRoot>{children}</ThemedRoot>
    </ThemeModeProvider>
  );
}
