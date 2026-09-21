'use client';

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'ui-theme-mode';

/**
 * localStorage is an external store, so it is read through
 * `useSyncExternalStore` rather than copied into state inside an effect.
 *
 * Two things fall out of that for free:
 *   - No hydration mismatch. React uses `getServerSnapshot` for the server
 *     render *and* the first client render, then re-renders with the stored
 *     value, so the markup always matches on hydration.
 *   - Changes sync across browser tabs, via the `storage` event.
 */
const listeners = new Set();

function emitChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener) {
  listeners.add(listener);
  window.addEventListener('storage', listener);

  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', listener);
  };
}

function getSnapshot() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : null;
  } catch {
    // Private browsing or blocked storage — fall back to the default mode.
    return null;
  }
}

/** No stored preference is known during SSR or hydration. */
function getServerSnapshot() {
  return null;
}

function writeMode(mode) {
  try {
    window.localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    // Ignore write failures; the mode still applies for this session.
  }
  emitChange();
}

const ThemeModeContext = createContext(null);

export function ThemeModeProvider({ children, defaultMode = 'light' }) {
  const storedMode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const mode = storedMode ?? defaultMode;

  const setMode = useCallback((next) => writeMode(next), []);

  const toggleMode = useCallback(() => {
    writeMode(mode === 'light' ? 'dark' : 'light');
  }, [mode]);

  const value = useMemo(() => ({ mode, setMode, toggleMode }), [mode, setMode, toggleMode]);

  return <ThemeModeContext.Provider value={value}>{children}</ThemeModeContext.Provider>;
}

/** Read or change the active colour mode from any client component. */
export function useThemeMode() {
  const context = useContext(ThemeModeContext);

  if (!context) {
    throw new Error('useThemeMode must be used inside a ThemeProvider');
  }

  return context;
}
