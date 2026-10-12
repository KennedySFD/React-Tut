# Styling Patterns

## Overview

All styling uses **CSS modules**, written as SCSS (`.module.scss`). Sass is a superset of CSS, so a module can be plain CSS. Shared treatments live in `src/theme/_mixins.scss`. Colours, type, and spacing come from CSS variables in `src/theme/tokens.css`, generated from the JS tokens.

A component folder holds the React file and a sibling stylesheet:

```
button/
├── Button.jsx
├── Button.module.scss
└── index.js
```

```javascript
import { cx } from '@/lib/cx';
import styles from './Button.module.scss';

export default function Button({ variant = 'primary', size = 'md', children, ...props }) {
  return (
    <button className={cx(styles.root, styles[variant], styles[size])} type="button" {...props}>
      {children}
    </button>
  );
}
```

`cx` joins class names and drops false values. Boolean modifiers are applied the same way: `fullWidth && styles.fullWidth`.

Import the shared mixins with a **relative** path. The Sass compiler is not given a load path, so `@use 'mixins'` does not resolve.

```scss
@use '../../../theme/mixins' as *;

.root {
  @include interactive-glass;
}
```

Count the folders from the stylesheet up to `src/`, then into `theme/mixins`. The leading underscore on `_mixins.scss` is omitted; that is how Sass partials are imported.

## Variant pattern

Each variant is its own class. Rest, hover, and active colours stay together, so adding a variant is one class rather than edits scattered across the file.

There are no hex codes. Every colour is a CSS variable generated from a semantic token:

```scss
.primary {
  background: var(--semantic-colors-accent-default);
  color: var(--semantic-colors-accent-onAccent);
  border-color: var(--semantic-colors-accent-default);

  &:hover:not(:disabled) {
    background: var(--semantic-colors-accent-hover);
  }

  &:active:not(:disabled) {
    background: var(--semantic-colors-accent-active);
  }
}

.secondary {
  background: var(--semantic-colors-background-raised);
  color: var(--semantic-colors-text-primary);
  border-color: var(--semantic-colors-border-default);

  &:hover:not(:disabled) {
    background: var(--semantic-colors-background-subtle);
  }
}
```

Because the variables change under `[data-theme="dark"]`, the same class is correct in both modes. No stylesheet contains an `if (dark)`.

Pass the variant name as a class. `styles[variant]` looks up `.primary`, `.secondary`, and the rest:

```jsx
<button className={cx(styles.root, styles[variant])} type="button">
  {children}
</button>
```

```jsx
<Button variant="primary">Save</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="tertiary">Learn more</Button>
```

## CSS variables

`scripts/emit-tokens.mjs` walks `createTheme()` and writes `src/theme/tokens.css`. A dotted theme path becomes a custom property. camelCase is preserved and each segment is joined with a hyphen:

| Theme path | CSS variable |
|------------|--------------|
| `semantic.colors.text.primary` | `var(--semantic-colors-text-primary)` |
| `global.spacing.md` | `var(--global-spacing-md)` |
| `components.button.sizes.md.height` | `var(--components-button-sizes-md-height)` |
| `semantic.motion.fast` | `var(--semantic-motion-fast)` |
| `semantic.shadows.sm` | `var(--semantic-shadows-sm)` |

Light values sit on `:root`. Dark mode overrides only the values that differ, under `[data-theme="dark"]`. After editing `global.js`, `semantic.js`, or `components.js`, regenerate the file:

```bash
node --import ./scripts/register-loader.mjs scripts/emit-tokens.mjs
```

JavaScript that needs the resolved object (shader tints, the token stories) calls `useTheme()` from `@/theme/ThemeProvider`. Stylesheets do not import the JS theme.

### Which layer do I read?

| You need | Read from |
|----------|-----------|
| A colour | `--semantic-colors-*` — never `--global-colors-*` |
| An interaction state colour | `--semantic-colors-state-*` |
| A component's height, padding, or radius | `--components-<name>-*` |
| A generic spacing, radius, or z-index | `--global-spacing-*`, `--global-radii-*`, `--global-zIndex-*` |
| A transition | `--semantic-motion-fast`, `--semantic-motion-base`, `--semantic-motion-slow` |

Reaching into `global.colors` from a component defeats the mode system, because those primitives are the same in light and dark.

## Shared mixins

Tokens make the *values* shared. Mixins make the *treatment* shared. They live in `src/theme/_mixins.scss`. Names are hyphenated.

```scss
@use '../../../theme/mixins' as *;

.root {
  @include field-base(md);
  padding: var(--global-spacing-md);
}
```

| Mixin | What it does |
|-------|--------------|
| `focus-ring` | Recolours the border and adds the ring — for fields |
| `focus-ring-only` | Ring only, border untouched — for buttons, tabs, menu options |
| `error-focus-ring` | Same geometry, error colourway |
| `field-base($size)` | The whole text-entry surface: border, hover, focus, error, disabled |
| `disabled-state` | Standard disabled treatment |
| `visually-hidden` | Hides an element but keeps it for screen readers |
| `truncate` | Single-line ellipsis |
| `typography($role)` | Applies a semantic type role in one line |
| `interactive-glass` | Dispersion keyline and sheen — see MOTION.md |
| `glass-panel`, `glass-panel-strong` | Frosted panes: menus, modals, tooltips, glass cards |
| `focus-keyline` | The chromatic line that draws in on field focus |

`focus-ring` is why an Input's focus ring and a Select's focus ring are one treatment. Change `state.focusRing` in `semantic.js`, regenerate `tokens.css`, and every control updates together.

`field-base` is why Input, Textarea, Select, and SearchBar match. There is one definition of a field.

## Size classes

Sizes are classes, same as variants. Dimensions come from component tokens:

```scss
.sm {
  height: var(--components-button-sizes-sm-height);
  padding: 0 var(--components-button-sizes-sm-paddingX);
  font-size: var(--components-button-sizes-sm-fontSize);
}

.md {
  height: var(--components-button-sizes-md-height);
  padding: 0 var(--components-button-sizes-md-paddingX);
  font-size: var(--components-button-sizes-md-fontSize);
}
```

```jsx
<button className={cx(styles.root, styles[variant], styles[size])} type="button">
  {children}
</button>
```

```jsx
<Button variant="primary" size="sm">Save</Button>
<Button variant="secondary" size="lg">Cancel</Button>
```

## CSS pseudo-classes (`:` single colon)

Used for **states**. The element is the same, just in a different interaction state.

```scss
&:hover:not(:disabled) {
  background: var(--semantic-colors-state-hoverSurface);
}

&:focus-visible {
  @include focus-ring-only;
}

&:disabled {
  @include disabled-state;
}
```

Common pseudo-classes:

- `:hover` — pointer is over the element
- `:focus-visible` — keyboard focus; prefer this over `:focus` so mouse clicks do not draw a ring
- `:active` — element is being pressed
- `:disabled` — element is disabled
- `:not(:disabled)` — keeps hover and active off disabled elements

## CSS pseudo-elements (`::` double colon)

Used for **virtual elements** inside or around the real element. These do not exist in the HTML.

```scss
&::placeholder {
  color: var(--semantic-colors-text-placeholder);
}

&::before {
  content: '';
  position: absolute;
}
```

`::before` and `::after` do not work on replaced elements such as `<input>` and `<img>`. Wrap those when a pseudo-element is required.

The glass keyline and sheen are `::before` and `::after` from `interactive-glass`. GSAP drives them through `--ring-angle`, `--ring-opacity`, `--ring-inset`, `--sheen-x`, and `--sheen-opacity`. Do not put `transform` in a CSS `transition` on an element GSAP is already transforming.

## Variants vs states

| Type | Driven by | Example | Approach |
|------|-----------|---------|----------|
| **Variant** | Developer choice at build time | primary, secondary, large, small | A class, selected in JSX |
| **State** | User interaction at runtime | hover, focus, active, disabled | CSS pseudo-class |

If you choose it when writing the JSX, it is a class. If the user triggers it by interacting, it is a pseudo-class.

Runtime measurements that CSS cannot know — a slider thumb position, a skeleton's width — stay as inline styles. Everything else belongs in the module.
