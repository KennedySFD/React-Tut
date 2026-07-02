# Component Architecture

## Overview

Components live in `src/components/` and are organised into three categories:

- **`ui/`** — generic reusable elements (Button, Input, Modal)
- **`layout/`** — structural components (Header, Footer, Sidebar)
- **`features/`** — feature-specific composed components (UserCard, ProductList)

## File Structure Per Component

Every component follows a three-file pattern:

```
button/
├── Button.jsx           The React component (logic, props, rendering)
├── Button.style.js      Styled-components (visual styling)
└── index.js             Barrel file (re-exports the component)
```

### Why Three Files

- **Named files** (`Button.jsx` not `index.jsx`) — editor tabs show `Button.jsx`, `Input.jsx` instead of multiple `index.jsx` tabs
- **Separated styles** — styling in one file, behaviour in another. Designers tweak `Button.style.js`, developers work in `Button.jsx`
- **Barrel file** — `index.js` re-exports the component so folder imports resolve automatically

### Component File (`Button.jsx`)

```javascript
'use client';

import { StyledButton } from './Button.style';

export default function Button({ variant, children, ...props }) {
  return (
    <StyledButton $variant={variant} {...props}>
      {children}
    </StyledButton>
  );
}
```

Key points:
- `'use client'` directive — required because styled-components use browser APIs
- Props are destructured, with styling-related props passed to the styled component
- `...props` spreads remaining props (onClick, disabled, etc.) onto the DOM element
- `children` is the content between the tags

### Style File (`Button.style.js`)

```javascript
import styled from "styled-components";

const variants = {
  primary: {
    bg: "#3B82F6",
    color: "#FFFFFF",
    border: "transparent",
    hoverBg: "#2563EB",
    activeBg: "#1D4ED8",
  },
  secondary: { ... },
  tertiary: { ... },
};

export const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  background: ${({ $variant }) => variants[$variant || "primary"].bg};
  color: ${({ $variant }) => variants[$variant || "primary"].color};
  border: 2px solid ${({ $variant }) => variants[$variant || "primary"].border};

  &:hover:not(:disabled) {
    background: ${({ $variant }) => variants[$variant || "primary"].hoverBg};
  }

  &:active:not(:disabled) {
    background: ${({ $variant }) => variants[$variant || "primary"].activeBg};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
```

Key points:
- Variant-specific values live in a lookup object at the top
- Props use the `$` prefix (transient props) to prevent them reaching the DOM
- Fallback with `||` provides a default variant
- See STYLING.md for full details on the variant pattern

### Barrel File (`index.js`)

```javascript
export { default } from './Button';
```

This allows imports from the folder path: `import Button from '@/components/ui/button'`.

## Barrel Files at Category Level

Each category (`ui/`, `layout/`, `features/`) has its own barrel file that re-exports all components in that category.

### `src/components/ui/index.js`

```javascript
export { default as Button } from './button';
export { default as Input } from './input';
```

This enables importing multiple components from one path:

```javascript
import { Button, Input } from '@/components/ui';
```

As new components are added, add a line to this file.

## Self-Closing vs Wrapping Components

Components that wrap content (like Button) use `children`:

```javascript
// Button wraps text content
export default function Button({ variant, children, ...props }) {
  return <StyledButton $variant={variant} {...props}>{children}</StyledButton>;
}

// Usage
<Button variant="primary">Save</Button>
```

Self-closing elements (like Input) spread props directly:

```javascript
// Input is self-closing, no children
export default function Input({ ...props }) {
  return <StyledInput {...props} />;
}

// Usage
<Input placeholder="Enter email" />
```

HTML elements like `<input>`, `<img>`, `<br>` cannot have children — they are self-closing.

## Adding a New Component

1. Create the folder: `src/components/ui/newcomponent/`
2. Create `NewComponent.jsx` — the React component
3. Create `NewComponent.style.js` — the styled-components
4. Create `index.js` — barrel file: `export { default } from './NewComponent';`
5. Add to `src/components/ui/index.js`: `export { default as NewComponent } from './newcomponent';`

## Component Naming Rules

- **Component names** — PascalCase: `Button`, `Input`, `UserCard`
- **File names** — PascalCase for component/style files: `Button.jsx`, `Button.style.js`
- **Folder names** — lowercase: `button/`, `input/`, `header/`
- **Styled component names** — prefixed with `Styled`: `StyledButton`, `StyledInput`
- **Barrel files** — always `index.js`
