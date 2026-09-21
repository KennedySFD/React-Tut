# Styling Patterns

## Overview

All styling uses **styled-components** (CSS-in-JS). No CSS files, no CSS Modules, no Tailwind. Styles are co-located with their components in `.style.js` files.

## Basic Styled Component

```javascript
import styled from "styled-components";

export const StyledInput = styled.input`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid #000000;
  outline: none;
  background: transparent;
`;
```

This creates a React component (`StyledInput`) that renders an `<input>` element with the specified styles.

## Variant Pattern

For components that have multiple visual styles (primary, secondary, tertiary), use a lookup object with a prop:

### Step 1: Define the Lookup Object

Each variant is a `css` block, not a flat object of values. This keeps a variant's rest, hover and active colours together, so adding a variant is **one entry** rather than edits scattered across five declarations.

Note there are no hex codes — every colour is a semantic token:

```javascript
import styled, { css } from "styled-components";

const variants = {
  primary: css`
    background: ${({ theme }) => theme.semantic.colors.accent.default};
    color: ${({ theme }) => theme.semantic.colors.accent.onAccent};
    border-color: ${({ theme }) => theme.semantic.colors.accent.default};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.semantic.colors.accent.hover};
    }

    &:active:not(:disabled) {
      background: ${({ theme }) => theme.semantic.colors.accent.active};
    }
  `,

  secondary: css`
    background: ${({ theme }) => theme.semantic.colors.background.raised};
    color: ${({ theme }) => theme.semantic.colors.text.primary};
    border-color: ${({ theme }) => theme.semantic.colors.border.default};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.semantic.colors.background.subtle};
    }
  `,

  /* tertiary, ghost, danger … */
};
```

Because the values are tokens, the same block produces the correct colours in **both** light and dark mode. No component ever contains an `if (dark)`.

### Step 2: Interpolate the Block

```javascript
export const StyledButton = styled.button`
  /* geometry from component tokens */
  height: ${({ theme, $size }) => theme.components.button.sizes[$size || "md"].height};
  border: ${({ theme }) => theme.components.button.borderWidth} solid transparent;

  /* colour from the variant block */
  ${({ $variant }) => variants[$variant] ?? variants.primary};
`;
```

A flat lookup object of plain values (`{ bg, color }`) is still fine for something simple like a size scale — see the Size Prop Pattern below. Use `css` blocks once a variant owns interaction states too.

### Step 3: Pass the Prop from the Component

```javascript
// In Button.jsx
export default function Button({ variant, children, ...props }) {
  return (
    <StyledButton $variant={variant} {...props}>
      {children}
    </StyledButton>
  );
}
```

### Step 4: Use It

```jsx
<Button variant="primary">Save</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="tertiary">Learn more</Button>
<Button>Default (primary)</Button>
```

## Shared Mixins

Tokens make the *values* shared. Mixins make the *treatment* shared. They live in `src/theme/mixins.js` and are the mechanism behind the library's consistency.

```javascript
import { fieldBase, focusRing, focusRingOnly } from '@/theme/mixins';

export const StyledTextarea = styled.textarea`
  ${fieldBase};
  padding: ${({ theme }) => theme.global.spacing.md};
`;
```

| Mixin | What it does |
|-------|--------------|
| `focusRing` | Recolours the border and adds the ring — for fields |
| `focusRingOnly` | Ring only, border untouched — for buttons, tabs, menu options |
| `errorFocusRing` | Same geometry, error colourway |
| `fieldBase` | The whole text-entry surface: border, hover, focus, error, disabled |
| `disabledState` | Standard disabled treatment |
| `visuallyHidden` | Hides an element but keeps it for screen readers |
| `truncate` | Single-line ellipsis |
| `typography(role)` | Applies a semantic type role in one line |

The point of `focusRing`: an Input's focus ring and a Select's focus ring are not two blue outlines that happen to match. They are **one mixin reading one token**. Change `state.focusRing` in `semantic.js` and every control in the library updates together.

Likewise `fieldBase` is why Input, Textarea, Select and SearchBar are indistinguishable from one another — there is only one definition of what a field looks like.

### Which layer do I read?

| You need | Read from |
|----------|-----------|
| A colour | `theme.semantic.colors.*` — **never** `theme.global.colors.*` |
| An interaction state colour | `theme.semantic.colors.state.*` |
| A component's height/padding/radius | `theme.components.<name>.*` |
| A generic spacing/radius/z-index | `theme.global.spacing.*`, `.radii.*`, `.zIndex.*` |
| A transition | `theme.semantic.motion.fast` / `.base` / `.slow` |

Reaching into `global.colors` from a component defeats the mode system, because those primitives are the same in light and dark.

## How the Prop Line Works

```javascript
background: ${({ $variant }) => variants[$variant || "primary"].bg};
```

Breaking it down:
- `${ }` — template literal expression (JavaScript inside CSS)
- `({ $variant })` — function that receives all props, destructures `$variant`
- `=>` — arrow function, returns the value
- `variants[$variant || "primary"]` — looks up the variant in the object; falls back to `"primary"` if no variant prop is passed
- `.bg` — gets the `bg` property from the matched variant

## Transient Props (`$` Prefix)

Props prefixed with `$` are **transient** — styled-components consumes them but does NOT forward them to the DOM.

Without `$`, React would pass `variant` to the HTML element, causing a console warning: "unknown prop sent to the DOM."

```javascript
// In the component — add $ when passing to styled component
<StyledButton $variant={variant} {...props}>

// In the style file — read with $
background: ${({ $variant }) => variants[$variant || "primary"].bg};
```

The page/consumer never sees the `$` — they write `<Button variant="primary">` as normal.

## CSS Pseudo-Classes (`:` Single Colon)

Used for **states** — the element is the same, just in a different interaction state.

```javascript
&:hover {
  background: #F5F5F5;
}

&:focus {
  border-color: #3B82F6;
}

&:active {
  background: #E5E5E5;
}

&:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

Common pseudo-classes:
- `:hover` — mouse is over the element
- `:focus` — element has been clicked/tabbed into
- `:active` — element is being pressed
- `:disabled` — element is disabled
- `:not(:disabled)` — only when NOT disabled (used to prevent hover effects on disabled elements)

## CSS Pseudo-Elements (`::` Double Colon)

Used for **virtual elements** inside or around the real element. These don't exist in your HTML.

```javascript
&::placeholder {
  color: #A3A3A3;
  font-weight: 400;
}

&::before {
  content: '';
  position: absolute;
  /* creates an invisible element before the content */
}

&::after {
  content: '';
  position: absolute;
  /* creates an invisible element after the content */
}

&::selection {
  background: #3B82F6;
  color: white;
}
```

Important: `::before` and `::after` do NOT work on self-closing elements (`<input>`, `<img>`). Use a wrapper `<div>` if needed.

You can combine pseudo-classes and pseudo-elements:

```javascript
&:focus::placeholder {
  color: transparent;  /* hide placeholder when input is focused */
}
```

## Variants vs States

| Type | Driven by | Example | Approach |
|------|-----------|---------|----------|
| **Variant** | Developer choice at build time | primary, secondary, large, small | Prop + lookup object |
| **State** | User interaction at runtime | hover, focus, active, disabled | CSS pseudo-class |

If you **choose** it when writing the JSX → it's a **prop/variant**.
If the **user triggers** it by interacting → it's a **pseudo-class**.

## Size Prop Pattern

Same pattern as variants, for controlling dimensions:

```javascript
const sizes = {
  small:  { padding: "0.25rem 0.5rem", fontSize: "0.75rem" },
  medium: { padding: "0.5rem 1rem", fontSize: "1rem" },
  large:  { padding: "0.75rem 1.5rem", fontSize: "1.25rem" },
};

export const StyledButton = styled.button`
  padding: ${({ $size }) => sizes[$size || "medium"].padding};
  font-size: ${({ $size }) => sizes[$size || "medium"].fontSize};
`;
```

Usage:

```jsx
<Button variant="primary" size="small">Save</Button>
<Button variant="secondary" size="large">Cancel</Button>
```

Multiple props can control different aspects independently.

## Accessing Theme Values

Any styled component can read theme values because the app is wrapped in ThemeProvider:

```javascript
const Heading = styled.h1`
  color: ${({ theme }) => theme.semantic.colors.foreground};
  font-size: ${({ theme }) => theme.semantic.typography.heading.size};
`;
```

`theme` is automatically injected as a prop by styled-components' ThemeProvider.
