# Component Architecture

## Overview

Components live in `src/components/` in three categories:

- **`ui/`** — generic reusable elements (Button, Input, Select, Modal…)
- **`layout/`** — structural components (Header, Footer, Sidebar)
- **`features/`** — feature-specific composed components (UserCard, ProductList)

Plus `icons/`, a flat set of inline SVG icons.

## The library

| Component | Props of note | States implemented |
|-----------|---------------|--------------------|
| `Button` | `variant` (primary/secondary/tertiary/ghost/danger), `size`, `loading`, `iconLeft`, `iconRight`, `iconOnly`, `fullWidth` | hover, active, focus-visible, disabled, loading |
| `Field` | `label`, `helperText`, `error`, `required` | — (shared chrome, see below) |
| `Input` | `size`, `iconLeft`, `iconRight`, `error` | hover, focus, error, disabled, read-only |
| `Textarea` | `rows`, `resize`, `size`, `error` | hover, focus, error, disabled |
| `SearchBar` | `onSearch`, `onClear`, controlled or uncontrolled | hover, focus, has-value, disabled |
| `Select` | `options`, `value`, `onChange` | hover, focus, open, option-hover, option-selected, disabled, error |
| `Checkbox` | `checked`, `indeterminate`, `description` | hover, focus, checked, indeterminate, disabled, error |
| `Radio` / `RadioGroup` | `options`, `value`, `orientation` | hover, focus, checked, disabled, error |
| `Switch` | `checked`, `size` | hover, focus, checked, disabled |
| `Tag` | `variant`, `size`, `solid`, `dot`, `onRemove` | hover/focus on the remove button |
| `Card` | `variant`, `padding`, `interactive`, `title`, `description`, `footer` | hover, active, focus-visible (interactive only) |
| `Alert` | `variant`, `title`, `onDismiss` | hover/focus on dismiss |
| `Modal` | `isOpen`, `onClose`, `size`, `footer` | open, overlay click, Escape, focus trap, scroll lock |
| `Tabs` | `items`, `variant` (underline/pill) | hover, focus, selected, disabled |
| `Accordion` | `items`, `allowMultiple`, `defaultOpenIds` | hover, focus, expanded, disabled |
| `Tooltip` | `content`, `placement`, `delay` | hover, focus, Escape to dismiss |
| `Spinner` | `size` | — |

Every one of them has **its own page** in the component browser at
**`/showcase`** — `/showcase/button`, `/showcase/select` and so on — where it
is rendered on an isolated canvas with all of its states and a props table.
See "The component browser" below.

All of them also share one animation system — hover, press, reveal and focus
gestures built on a single set of curves, plus the glass and dispersion
material. See **MOTION.md**.

## File structure per component

Three files:

```
button/
├── Button.jsx           The React component (logic, props, rendering)
├── Button.style.js      Styled-components (visual styling)
└── index.js             Barrel file (re-exports the component)
```

### Why three files

- **Named files** (`Button.jsx`, not `index.jsx`) — editor tabs stay readable.
- **Separated styles** — styling in one file, behaviour in another.
- **Barrel file** — folder imports resolve automatically.

### Component file

```javascript
'use client';

import { StyledButton } from './Button.style';

export default function Button({ variant = 'primary', size = 'md', children, ...props }) {
  return (
    <StyledButton $variant={variant} $size={size} {...props}>
      {children}
    </StyledButton>
  );
}
```

- `'use client'` — required, styled-components needs browser APIs.
- Styling props are passed down with a `$` prefix (transient).
- `...props` spreads the rest (`onClick`, `disabled`…) onto the DOM element.

### Style file

Variants are a lookup object of `css` blocks, so a variant owns its rest / hover / active colours together. Adding a variant is one entry, not edits in five places.

```javascript
import styled, { css } from 'styled-components';
import { focusRingOnly } from '@/theme/mixins';

const variants = {
  primary: css`
    background: ${({ theme }) => theme.semantic.colors.accent.default};
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.semantic.colors.accent.hover};
    }
  `,
  /* secondary, tertiary, ghost, danger */
};

export const StyledButton = styled.button`
  height: ${({ theme, $size }) => theme.components.button.sizes[$size || 'md'].height};

  ${({ $variant }) => variants[$variant] ?? variants.primary};

  &:focus-visible { ${focusRingOnly}; }
`;
```

See STYLING.md for the full pattern and THEMING.md for the tokens.

## Composition over duplication

Two pieces of shared machinery keep the library consistent.

### `Field` — the form chrome

`Field` renders the label, the control and one line of helper/error text. `Input`, `Textarea`, `Select` and `RadioGroup` all compose it, so label typography, spacing and the error colour are defined **once**. (Equivalent to `FormControl` in MUI or Chakra.)

```javascript
<Field label={label} error={error} htmlFor={inputId} describedById={describedById}>
  <InputShell>…</InputShell>
</Field>
```

### `SearchBar` composes `Input`

`SearchBar` is not a restyled input — it *is* an `Input` with a search icon and a clear button. It inherits the border, hover and focus tokens automatically.

The same instinct applies generally: before writing a new `.style.js`, check whether an existing component or the `fieldBase` mixin already describes the surface.

## Icons

`src/components/icons/index.js` holds the inline SVG set as named exports:

```javascript
import { SearchIcon, ChevronDownIcon, CheckIcon } from '@/components/icons';
```

Every icon draws with `currentColor`, so it inherits the semantic text token of its parent in both modes. There is no icon dependency, which keeps the boilerplate portable.

Icons are the one deliberate exception to the three-file pattern — they are single-element primitives, so they live together rather than one folder each.

## Barrel files

### Component folder level

```javascript
// src/components/ui/button/index.js
export { default } from './Button';
```

A folder that exports more than one component adds a named export:

```javascript
// src/components/ui/radio/index.js
export { default } from './Radio';
export { default as RadioGroup } from './RadioGroup';
```

### Category level

```javascript
// src/components/ui/index.js
export { default as Button } from './button';
export { default as Radio, RadioGroup } from './radio';
```

Which enables:

```javascript
import { Button, Input, Select } from '@/components/ui';
```

**When adding a component, always add its line here.**

## Accessibility baseline

Every component in the library meets these, and new ones should too:

- Labels are tied to controls with `htmlFor` / `id` (generated with `useId`).
- Help and error text is linked via `aria-describedby`; errors set `aria-invalid`.
- Custom controls (Select, Tabs, Accordion, Modal) carry the right roles and `aria-*` state.
- Interactive elements are reachable and operable by keyboard, with a visible focus ring.
- Checkbox / Radio / Switch keep a real native input, visually hidden, rather than faking one with a `<div>`.

## The component browser

`/showcase` is modelled on Storybook: a sidebar grouped by category, and one
route per component.

Each component page has two parts:

1. **The hero stage** — one instance of the component, centred, filling the
   viewport, with a controls panel beneath it. It is there to be looked at on
   its own while a design is being worked on, flipped between its states, and
   hovered and clicked to see them for real.
2. **The documentation** — every variant, state and size, then the props
   table. All of it below the fold.

```
src/app/showcase/layout.js      Persistent sidebar + top bar
src/app/showcase/page.js        → /showcase          Overview
src/app/showcase/[slug]/page.js → /showcase/button   One page per component

src/showcase/registry.js        Slug / name / category / summary — no JSX
src/showcase/StoryRenderer.jsx  Maps a slug to its stories
src/showcase/kit/               Story, PropsTable, Canvas, layout helpers
src/showcase/stories/           One file per component
```

The split matters: `registry.js` holds **metadata only**, so it can be
imported by the Server Component route for `generateStaticParams` and
`generateMetadata`. The stories themselves are client components, reached
through the map in `StoryRenderer.jsx`. Every page is prerendered at build
time, and `dynamicParams = false` makes anything outside the registry a 404.

The chrome lives in `layout.js` rather than in each page, so navigating
between components swaps only the content pane — the sidebar keeps its scroll
position and does not re-render.

A story file exports its stories as the default, plus an optional `Hero` and
the control schema that drives it:

```javascript
'use client';

import { Button } from '@/components/ui';
import { PropsTable, Row, Story } from '../kit';

/** Control schema — keys match the props Hero receives. */
export const heroControls = {
  variant: {
    type: 'select',
    options: ['primary', 'secondary', 'tertiary', 'ghost', 'danger'],
    default: 'primary',
  },
  size: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md' },
  disabled: { type: 'boolean', default: false },
};

export function Hero({ variant, size, disabled }) {
  return (
    <Button variant={variant} size={size} disabled={disabled}>
      Save changes
    </Button>
  );
}

export default function ButtonStories() {
  return (
    <>
      <Story title="Variants" description="…">
        <Row>
          <Button variant="primary">Primary</Button>
        </Row>
      </Story>

      <PropsTable rows={[{ name: 'variant', type: "'primary' | …", description: '…' }]} />
    </>
  );
}
```

`StoryRenderer` uses namespace imports (`import * as button from …`) so it
can pick up every export. A module may also set `heroSurface: 'glass'` when
the component needs a busy backdrop — Card does, so its frosted variant can
be isolated properly.

**The controls panel is Storybook's Controls addon in miniature.** The stage
owns the values and passes them straight to `Hero` as props, which is why the
schema's keys must match its prop names — adding a control is one line and
needs no wiring. Two input types cover the whole library:

| `type` | Rendered as | For |
|--------|-------------|-----|
| `'select'` | Segmented toggle | `variant`, `size`, `placement` … |
| `'boolean'` | Switch | `disabled`, `loading`, `error` … |

Interaction state stays *inside* the `Hero` component rather than becoming a
control — Checkbox owns its own `checked`, Select its own value — so the
isolated instance stays genuinely clickable while the controls change how it
is presented.

The hero is optional — the Foundations pages describe the system rather than
one component, so they have none, and the renderer skips the stage.

`<Story>` takes the same `surface` prop, so a frosted component can be
demonstrated over a gradient rather than a flat surface it would vanish
against.

Two layout rules make the stage work, both driven by CSS variables set on the
showcase `Shell` so they cannot drift:

- `--showcase-topbar` — the hero is `calc(100vh - var(--showcase-topbar))`, so
  the whole stage is visible without scrolling under the sticky header.
- `--showcase-gutter` — the hero spans the full content width; everything
  below it is constrained by `DocColumn` to a readable measure.

## Adding a new component

1. Create the folder: `src/components/ui/newcomponent/`
2. `NewComponent.jsx` — the component, with `'use client'`
3. `NewComponent.style.js` — styled-components, reading tokens and mixins
4. `index.js` — `export { default } from './NewComponent';`
5. Add a line to `src/components/ui/index.js`
6. Wire up motion: `${interactiveGlass}` in the style file, `useInteractiveMotion`
   with the right amplitude preset in the component (see MOTION.md)
7. Add an entry to `src/showcase/registry.js`
8. Add `src/showcase/stories/NewComponentStories.jsx` — stories as the default
   export, plus a `Hero` and `heroCaption` for the isolation stage
9. Register the module in `src/showcase/StoryRenderer.jsx`

## Naming rules

- **Component names** — PascalCase: `Button`, `SearchBar`
- **File names** — PascalCase: `Button.jsx`, `Button.style.js`
- **Folder names** — lowercase: `button/`, `searchbar/`
- **Styled components** — `Styled` prefix where it wraps the root element (`StyledButton`); descriptive names for internal parts (`InputShell`, `Track`, `Thumb`)
- **Barrel files** — always `index.js`
