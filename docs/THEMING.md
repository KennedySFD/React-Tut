# Theming System

## Overview

The project uses **styled-components** for all styling, with a three-layer token system that mirrors a Figma design system hierarchy: **global → semantic → component**.

Tokens are consumed via styled-components' `ThemeProvider`, which makes the theme object available to every styled component in the app via `props.theme`.

## Architecture

```
Figma Design Tokens
       ↓
src/theme/global.js          Raw primitive values
       ↓
src/theme/semantic.js        Maps primitives to purpose
       ↓
src/theme/components.js      Component-specific tokens
       ↓
src/theme/index.js           Combines all layers into one object
       ↓
src/theme/ThemeProvider.js   Wraps app, provides theme to all styled-components
       ↓
src/app/layout.js            ThemeProvider mounted here
```

## Token Layers

### Layer 1: Global Tokens (`global.js`)

Raw design values with no semantic meaning. These are the building blocks.

```javascript
export const global = {
  colors: {
    blue500: '#3B82F6',
    grey100: '#F5F5F5',
    grey900: '#171717',
    white: '#FFFFFF',
    black: '#000000',
  },
  fontSizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    md: '1rem',       // 16px
    lg: '1.25rem',    // 20px
    xl: '1.5rem',     // 24px
    xxl: '2rem',      // 32px
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    xxl: '3rem',      // 48px
  },
  radii: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    full: '9999px',
  },
};
```

### Layer 2: Semantic Tokens (`semantic.js`)

Maps global primitives to purpose-driven names. Components reference semantic tokens so that changing a primitive updates everything.

```javascript
import { global } from './global';

export const semantic = {
  colors: {
    primary: global.colors.blue500,
    background: global.colors.white,
    foreground: global.colors.grey900,
    surface: global.colors.grey100,
  },
  typography: {
    body: {
      size: global.fontSizes.md,
      weight: global.fontWeights.regular,
    },
    heading: {
      size: global.fontSizes.xl,
      weight: global.fontWeights.bold,
    },
    caption: {
      size: global.fontSizes.sm,
      weight: global.fontWeights.regular,
    },
  },
};
```

### Layer 3: Component Tokens (`components.js`)

Component-specific token sets that reference both global and semantic layers.

```javascript
import { global } from './global';
import { semantic } from './semantic';

export const components = {
  button: {
    padding: `${global.spacing.sm} ${global.spacing.md}`,
    borderRadius: global.radii.md,
    fontSize: global.fontSizes.md,
    fontWeight: global.fontWeights.semibold,
    primary: {
      background: semantic.colors.primary,
      color: global.colors.white,
    },
  },
  input: {
    padding: `${global.spacing.sm} ${global.spacing.md}`,
    borderRadius: global.radii.md,
    fontSize: global.fontSizes.md,
    borderColor: global.colors.grey100,
  },
};
```

### Combined Theme Object (`index.js`)

```javascript
import { global } from './global';
import { semantic } from './semantic';
import { components } from './components';

const theme = { global, semantic, components };
export default theme;
```

## GlobalStyle (`GlobalStyle.js`)

Replaces the traditional `globals.css` file. Uses `createGlobalStyle` from styled-components and reads values from the theme.

```javascript
'use client';

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }

  html, body {
    max-width: 100vw;
    overflow-x: hidden;
  }

  body {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    color: ${({ theme }) => theme.semantic.colors.foreground};
    background: ${({ theme }) => theme.semantic.colors.background};
    font-family: Arial, Helvetica, sans-serif;
    font-size: ${({ theme }) => theme.semantic.typography.body.size};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default GlobalStyle;
```

Key points:
- Must have `'use client'` directive (it uses browser APIs)
- Accesses theme via `({ theme }) =>` — same pattern as any styled component
- Handles the CSS reset (box-sizing, margin/padding zero, link styles)

## ThemeProvider (`ThemeProvider.js`)

Client component that wraps styled-components' provider and injects GlobalStyle.

```javascript
'use client';

import { ThemeProvider as SCThemeProvider } from 'styled-components';
import theme from './index';
import GlobalStyle from './GlobalStyle';

export default function ThemeProvider({ children }) {
  return (
    <SCThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </SCThemeProvider>
  );
}
```

Key points:
- Must have `'use client'` directive (React context is a client feature)
- Aliased as `SCThemeProvider` to avoid naming conflict with our wrapper
- `GlobalStyle` is rendered inside the provider so it can access the theme

## Mounting in Layout

The ThemeProvider is mounted in `src/app/layout.js`, wrapping all page content:

```javascript
import ThemeProvider from "@/theme/ThemeProvider";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

## Accessing Theme in Styled Components

Any styled component in the app can access theme values:

```javascript
const Heading = styled.h1`
  font-size: ${({ theme }) => theme.semantic.typography.heading.size};
  font-weight: ${({ theme }) => theme.semantic.typography.heading.weight};
  color: ${({ theme }) => theme.semantic.colors.foreground};
`;
```

## Required Next.js Config

styled-components requires server-side rendering support in Next.js to prevent hydration errors. This is enabled in `next.config.mjs`:

```javascript
compiler: {
  styledComponents: true,
},
```

Without this, the server-rendered HTML won't include styled-components styles, causing a mismatch when React hydrates on the client.
