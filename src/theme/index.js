import { global } from './global';
import { semantic, themeModes } from './semantic';
import { createComponents } from './components';
import { motion } from './motion';

/**
 * Builds the theme object handed to styled-components' ThemeProvider.
 *
 * The semantic layer is resolved for the requested mode *before* it reaches
 * components, so every `.style.js` file can read the same path regardless of
 * light or dark:
 *
 *   ${({ theme }) => theme.semantic.colors.state.focusRing}
 *
 * @param {'light'|'dark'} mode
 */
export function createTheme(mode = 'light') {
  const resolved = semantic[mode] ?? semantic.light;

  return {
    mode,
    global,
    semantic: resolved,
    components: createComponents(resolved),
    motion,
  };
}

export { global, semantic, themeModes, createComponents, motion };

const theme = createTheme('light');
export default theme;
