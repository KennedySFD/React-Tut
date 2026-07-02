# Conventions & Best Practices

## Naming Conventions

### Files and Folders

| Type | Convention | Example |
|------|-----------|---------|
| Component files | PascalCase | `Button.jsx`, `Input.style.js` |
| Component folders | lowercase | `button/`, `input/`, `header/` |
| Hook files | camelCase with `use` prefix | `useCounter.js`, `useToggle.js` |
| Theme files | camelCase | `global.js`, `semantic.js` |
| Page files | always `page.js` | `src/app/about/page.js` |
| Layout files | always `layout.js` | `src/app/layout.js` |
| Barrel files | always `index.js` | `src/components/ui/index.js` |
| Config files | as required by tool | `next.config.mjs`, `jsconfig.json` |

### Code

| Type | Convention | Example |
|------|-----------|---------|
| React components | PascalCase | `function Button()`, `function UserCard()` |
| Styled components | PascalCase with `Styled` prefix | `StyledButton`, `StyledInput` |
| Hooks | camelCase with `use` prefix | `useCounter`, `useToggle` |
| Transient props | `$` prefix | `$variant`, `$size` |
| JS variables/functions | camelCase | `const variants`, `const handleClick` |
| Constants | camelCase or UPPER_SNAKE_CASE | `const theme`, `const API_URL` |

## Import Patterns

### Path Alias

All imports from `src/` use the `@/` alias:

```javascript
import ThemeProvider from '@/theme/ThemeProvider';
import { Button } from '@/components/ui';
import { useCounter } from '@/hooks/useCounter';
```

Never use relative paths for cross-folder imports:

```javascript
// Bad
import Button from '../../components/ui/button';

// Good
import { Button } from '@/components/ui';
```

Relative imports are only used within the same component folder:

```javascript
// In Button.jsx — relative import to sibling file is fine
import { StyledButton } from './Button.style';
```

### Barrel File Imports

Prefer importing from barrel files when available:

```javascript
// Preferred — imports from ui/index.js barrel
import { Button, Input } from '@/components/ui';

// Also works — imports from button/index.js barrel
import Button from '@/components/ui/button';

// Avoid — bypasses barrel files
import Button from '@/components/ui/button/Button';
```

### Export Patterns

- **Components** — use `export default` in the component file
- **Hooks** — use named exports: `export function useCounter()`
- **Theme tokens** — use named exports: `export const global = { ... }`
- **Barrel files** — re-export defaults as named: `export { default as Button } from './button'`

## Barrel File Structure

Barrel files (`index.js`) exist at two levels:

### Component folder level

Re-exports the component's default export so the folder acts as the entry point.

```javascript
// src/components/ui/button/index.js
export { default } from './Button';
```

### Category level

Gathers all components in that category into one import path.

```javascript
// src/components/ui/index.js
export { default as Button } from './button';
export { default as Input } from './input';
```

When adding a new component, always update the category-level barrel file.

## `'use client'` Directive

Required at the top of any file that:
- Uses React hooks (`useState`, `useEffect`, `useRef`, custom hooks)
- Has event handlers (`onClick`, `onChange`)
- Uses styled-components
- Uses browser APIs (`window`, `document`)

Files that need it in this project:
- All component `.jsx` files (they use styled-components)
- `ThemeProvider.js` (uses styled-components context)
- `GlobalStyle.js` (uses `createGlobalStyle`)
- Test pages that use hooks or events

Files that do NOT need it:
- `layout.js` (Server Component — ThemeProvider handles the client boundary)
- `page.js` for the home page (no interactivity)
- Theme token files (`global.js`, `semantic.js`, etc.) — plain JS objects
- Style files (`.style.js`) — no React, just styled-components definitions

## Styling Rules

1. All styling uses styled-components — no CSS files, no inline styles for components
2. Inline styles (`style={{ }}`) are acceptable in test pages only
3. Each component has its own `.style.js` file
4. Variant-specific values use lookup objects, not inline ternaries
5. Styling props use `$` prefix (transient props) to avoid DOM warnings
6. Browser states (hover, focus, active, disabled) use CSS pseudo-classes
7. Pseudo-elements (placeholder, before, after) use `::` double colon

## Theme Token Rules

1. Raw values (hex colours, rem sizes) only appear in `global.js`
2. `semantic.js` references `global.js` — never contains raw values
3. `components.js` references both `global.js` and `semantic.js`
4. Components should reference the theme via `({ theme }) =>` where possible
5. If hardcoding values in a style file (for rapid prototyping), they should eventually be moved to the theme

## Project Setup Checklist

When recreating this project from scratch:

1. Run `npx create-next-app@latest` (No TypeScript, Yes ESLint, No Tailwind, Yes src/, Yes App Router)
2. Install styled-components: `npm install styled-components`
3. Add `compiler: { styledComponents: true }` to `next.config.mjs`
4. Delete `src/app/globals.css` and `src/app/page.module.css`
5. Remove Geist font imports from `layout.js`
6. Create `src/theme/` with token files, GlobalStyle, ThemeProvider
7. Wrap `layout.js` children with ThemeProvider
8. Create folder structure: `components/ui/`, `components/layout/`, `components/features/`, `hooks/`, `lib/`, `context/`, `services/`, `assets/`, `animations/`, `canvas/`, `middleware/`
9. Build components following the three-file pattern (Component.jsx, Component.style.js, index.js)
10. Add barrel files at each level
