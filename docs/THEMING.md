# Theming System

## Overview

Styling uses **SCSS modules** and CSS variables, driven by a three-layer token system that mirrors a Figma variable hierarchy: **global → semantic → component**. `src/theme/tokens.css` is generated from those JS tokens. Light and dark switch with `data-theme` on the document element.

The guiding rule of this library:

> **A component never hardcodes a value, and never reaches past its layer.**
> Re-branding the entire library is an edit to `semantic.js`. Changing density or shape is an edit to `components.js`. Neither requires touching a component stylesheet. Regenerate `tokens.css` after either edit.

## Architecture

```
Figma variable collections
       ↓
src/theme/global.js          Layer 1 — raw primitives
       ↓
src/theme/semantic.js        Layer 2 — purpose, with light + dark modes
       ↓
src/theme/components.js      Layer 3 — per-component geometry
       ↓
src/theme/_mixins.scss       Shared treatments, including glass and dispersion
src/theme/motion.js          Curves, durations, gestures, amplitudes
       ↓
src/theme/index.js           createTheme(mode) resolves the JS object
       ↓
src/theme/tokens.css         The same values as CSS variables (generated)
src/theme/globals.css        Reset and document defaults
       ↓
src/theme/ThemeProvider.js   Sets data-theme for the active colour mode
       ↓
src/app/layout.js            Imports the CSS and mounts ThemeProvider
```

Motion and the glass material are part of the same token system but large
enough to document separately — see **MOTION.md**.

## Layer 1 — Global tokens (`global.js`)

Raw values with no meaning attached: colour ramps, the type scale, spacing, radii, border widths, control heights, shadows, motion, z-index and opacities.

```javascript
export const global = {
  colors: {
    brand500: '#3B82F6',
    neutral200: '#E4E4E7',
    /* ...full ramps for neutral, brand, green, amber, red */
  },
  spacing: { xs: '0.25rem', sm: '0.5rem', md: '0.75rem', lg: '1rem', /* ... */ },
  sizes: { control: { sm: '2rem', md: '2.5rem', lg: '3rem' } },
  /* ... */
};
```

**To rebrand, change the `brand` ramp.** Everything downstream follows.

`sizes.control` is what keeps Button, Input, Select and SearchBar the same height when placed on one row.

## Layer 2 — Semantic tokens (`semantic.js`)

Maps primitives to *roles*. This is the layer components actually read.

It exports **two objects of identical shape**, one per colour mode:

```javascript
export const semantic = { light, dark };
```

That identical shape is what makes the Figma mapping 1:1 — a "Semantic" collection with Light and Dark modes.

Each mode contains:

| Group | Purpose |
|-------|---------|
| `colors.background` | canvas, subtle, sunken, raised, overlay, inverse, scrim |
| `colors.text` | primary, secondary, muted, placeholder, disabled, inverse, onAccent, link |
| `colors.border` | subtle, default, strong, inverse |
| `colors.accent` | the brand: subtle, muted, border, default, hover, active, text, onAccent |
| `colors.feedback` | info / success / warning / danger / neutral, each with the same 5 slots |
| **`colors.state`** | **the shared interaction tokens — see below** |
| `colors.glass` | translucent surface, inner highlight and shade for frosted panes |
| `colors.dispersion` | the chromatic fringe used by keylines and sheens |
| `shadows` | elevation set for that mode |
| `typography`, `motion` | mode-independent, shared by both |

### The `state` group

This is the most important group in the system. It holds one definition of each interaction state, shared by **every** component:

```javascript
state: {
  hoverSurface, activeSurface, hoverBorder,
  focusBorder, focusRing,
  selectedSurface, selectedBorder, selectedText,
  errorBorder, errorRing, errorText,
  disabledSurface, disabledBorder, disabledText,
}
```

So the blue outline on a focused Input is not a separate value from the one on a focused Select, Checkbox or Tab — they are all `state.focusRing`. Change it once and every control in the library updates together.

## Layer 3 — Component tokens (`components.js`)

Exports a **function**, because component tokens can reference the resolved semantic set for the active mode:

```javascript
export function createComponents(semantic) {
  return { field, button, card, tag, modal, menu, /* ... */ };
}
```

The split used throughout:

- **Geometry** (height, padding, radius, font size) → lives here.
- **Colour** → comes from semantic tokens at the point of use.

The `field` entry is shared: Input, Textarea, Select and SearchBar all read it, which is why they are pixel-identical.

## Mixins (`_mixins.scss`)

Tokens make the *values* shared; mixins make the *treatment* shared.

| Mixin | Used by |
|-------|---------|
| `focus-ring` | fields — recolours the border and adds the ring |
| `focus-ring-only` | buttons, tabs, menu options — ring only, no border change |
| `error-focus-ring` | fields in an error state |
| `field-base($size)` | Input, Textarea, Select trigger, SearchBar |
| `disabled-state` | anything disableable |
| `visually-hidden` | the native inputs behind Checkbox / Radio / Switch |
| `truncate`, `typography($role)` | general |
| `interactive-glass` | the dispersion keyline + sheen layers — see MOTION.md |
| `glass-panel`, `glass-panel-strong` | frosted panes: menus, modals, tooltips, glass Cards |
| `focus-keyline` | the chromatic line that draws in on field focus |

```scss
@use '../../../theme/mixins' as *;

.root {
  @include field-base(md);
  padding: var(--global-spacing-md);
}
```

## Resolving the theme (`index.js`)

```javascript
export function createTheme(mode = 'light') {
  const resolved = semantic[mode] ?? semantic.light;

  return {
    mode,
    global,
    semantic: resolved,
    components: createComponents(resolved),
  };
}
```

`scripts/emit-tokens.mjs` writes those resolved values to `src/theme/tokens.css`. A path such as `semantic.colors.text.primary` becomes `--semantic-colors-text-primary`. Light values are on `:root`. Dark overrides, only where the value differs, sit under `[data-theme="dark"]`.

Stylesheets then read one variable in either mode:

```scss
color: var(--semantic-colors-text-primary);
```

No stylesheet contains an `if (dark)`. Regenerate after a token edit:

```bash
node --import ./scripts/register-loader.mjs scripts/emit-tokens.mjs
```

JavaScript that needs the object — token stories, shader tints — calls `useTheme()` from `@/theme/ThemeProvider`.

## Colour mode (`src/context/ThemeModeContext.js`)

The active mode lives in a context and persists to `localStorage`.

```javascript
'use client';
import { useThemeMode } from '@/context/ThemeModeContext';

function ModeToggle() {
  const { mode, toggleMode } = useThemeMode();
  return <Button onClick={toggleMode}>{mode === 'light' ? 'Dark' : 'Light'}</Button>;
}
```

`localStorage` is read through `useSyncExternalStore` rather than copied into state in an effect. Two benefits:

- **No hydration mismatch** — React uses `getServerSnapshot` for the server render *and* the first client render, then re-renders with the stored value.
- **Cross-tab sync** — via the `storage` event, for free.

Set the starting mode in `layout.js`:

```javascript
<ThemeProvider defaultMode="dark">{children}</ThemeProvider>
```

## Document styles (`globals.css`)

`src/theme/globals.css` is the reset, imported from `layout.js` next to `tokens.css`. It:

- paints the canvas and body text from semantic variables;
- makes form controls inherit typography;
- provides a fallback `:focus-visible` outline;
- honours `prefers-reduced-motion`.

`color-scheme` is set in JavaScript, not in this file. `ThemeProvider` writes `document.documentElement.dataset.theme` and `style.colorScheme`. An inline script in `layout.js` does the same from `localStorage` before paint, so the first frame matches the stored mode. The storage key is `ui-theme-mode`.

## Mapping to Figma

| Code | Figma |
|------|-------|
| `global.js` | "Primitives" variable collection |
| `semantic.js` | "Semantic" collection, **modes: Light / Dark** |
| `components.js` | "Components" collection |
| A component's props | Component properties / variant set |
| `state.*` tokens | The variables bound to interaction states |

Because both sides share the same names and the same layering, a change in either can be translated into the other.

## How a page receives the theme

`layout.js` imports `tokens.css` and `globals.css`, then mounts `ThemeProvider`. CSS modules are ordinary stylesheets, so they do not need a style registry or a compiler flag. The only mode switch is the `data-theme` attribute on `<html>`.
