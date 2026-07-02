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

```javascript
const variants = {
  primary: {
    bg: "#3B82F6",
    color: "#FFFFFF",
    border: "transparent",
    hoverBg: "#2563EB",
    activeBg: "#1D4ED8",
  },
  secondary: {
    bg: "#FFFFFF",
    color: "#171717",
    border: "#D4D4D4",
    hoverBg: "#F5F5F5",
    activeBg: "#E5E5E5",
  },
  tertiary: {
    bg: "transparent",
    color: "#3B82F6",
    border: "transparent",
    hoverBg: "#EFF6FF",
    activeBg: "#DBEAFE",
  },
};
```

The property names (`bg`, `color`, `hoverBg`, etc.) are arbitrary — they can be named anything. They just need to match when you reference them in the styled component.

### Step 2: Read the Prop in the Styled Component

```javascript
export const StyledButton = styled.button`
  background: ${({ $variant }) => variants[$variant || "primary"].bg};
  color: ${({ $variant }) => variants[$variant || "primary"].color};
  border: 2px solid ${({ $variant }) => variants[$variant || "primary"].border};
`;
```

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
