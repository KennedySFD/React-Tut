'use client';

import { useLayoutEffect, useMemo } from 'react';
import { ThemeModeProvider, useThemeMode } from '@/context/ThemeModeContext';
import { createTheme } from './index';

function ThemeAttribute() {
  const { mode } = useThemeMode();

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = mode;
    root.style.colorScheme = mode;
  }, [mode]);

  return null;
}

export function useTheme() {
  const { mode } = useThemeMode();
  return useMemo(() => createTheme(mode), [mode]);
}

export default function ThemeProvider({ children, defaultMode = 'light' }) {
  return (
    <ThemeModeProvider defaultMode={defaultMode}>
      <ThemeAttribute />
      {children}
    </ThemeModeProvider>
  );
}
