# Theming System

## Overview

All styling uses **styled-components**, driven by a three-layer token system that mirrors a Figma variable hierarchy: **global → semantic → component**.

The guiding rule of this library:

> **A component never hardcodes a value, and never reaches past its layer.**
> Re-branding the entire library is an edit to `semantic.js`. Changing density or shape is an edit to `components.js`. Neither requires touching a single `.style.js` file.

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
src/theme/mixins.js          Shared CSS fragments built on the tokens
src/theme/glass.js           Glass + dispersion layers (re-exported by mixins)
src/theme/motion.js          Curves, durations, gestures, amplitudes
       ↓
src/theme/index.js           createTheme(mode) resolves it all
       ↓
src/theme/ThemeProvider.js   Provides the theme + GlobalStyle
       ↓
src/app/layout.js            Mounted here, wrapping every page
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

## Mixins (`mixins.js`)

Tokens make the *values* shared; mixins make the *treatment* shared.

| Mixin | Used by |
|-------|---------|
| `focusRing` | fields — recolours the border and adds the ring |
| `focusRingOnly` | buttons, tabs, menu options — ring only, no border change |
| `errorFocusRing` | fields in an error state |
| `fieldBase` | Input, Textarea, Select trigger, SearchBar |
| `disabledState` | anything disableable |
| `visuallyHidden` | the native inputs behind Checkbox / Radio / Switch |
| `truncate`, `typography(role)` | general |
| `interactiveGlass` | the dispersion keyline + sheen layers — see MOTION.md |
| `glassPanel`, `glassPanelStrong` | frosted panes: menus, modals, tooltips, glass Cards |
| `focusKeyline` | the chromatic line that draws in on field focus |

```javascript
import { fieldBase } from '@/theme/mixins';

export const StyledTextarea = styled.textarea`
  ${fieldBase};
  padding: ${({ theme }) => theme.global.spacing.md};
`;
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

Because the mode is resolved *before* the theme reaches components, every `.style.js` reads the same path in either mode:

```javascript
color: ${({ theme }) => theme.semantic.colors.text.primary};
```

No component ever contains an `if (dark)`.

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

## GlobalStyle

`createGlobalStyle`, replacing `globals.css`. Beyond the reset it:

- sets `color-scheme` from `theme.mode`, so native scrollbars and autofill follow the theme;
- makes form controls inherit typography;
- provides a fallback `:focus-visible` outline;
- honours `prefers-reduced-motion`.

## Mapping to Figma

| Code | Figma |
|------|-------|
| `global.js` | "Primitives" variable collection |
| `semantic.js` | "Semantic" collection, **modes: Light / Dark** |
| `components.js` | "Components" collection |
| A component's props | Component properties / variant set |
| `state.*` tokens | The variables bound to interaction states |

Because both sides share the same names and the same layering, a change in either can be translated into the other.

## Required Next.js config

styled-components needs SSR support to avoid hydration errors, enabled in `next.config.mjs`:

```javascript
compiler: { styledComponents: true },
```

`src/lib/registry.js` collects the rules during the server render and injects them via `useServerInsertedHTML`.
