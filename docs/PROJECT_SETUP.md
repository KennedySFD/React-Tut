# Project Setup

## Overview

This project is a **Next.js 16** application using the **App Router**, **React 19**, **JavaScript** (not TypeScript), and **styled-components** for styling. It was scaffolded with `create-next-app` and then customised.

## Initial Creation

```bash
npx create-next-app@latest
```

When prompted, the following options were selected:

| Option | Choice |
|--------|--------|
| Project name | `react-tut` |
| TypeScript | No |
| ESLint | Yes |
| Tailwind CSS | No |
| `src/` directory | Yes |
| App Router | Yes |
| Turbopack | Yes |
| Import alias | `@/*` |

## Dependencies

### Production

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 16.2.6 | Framework (App Router, SSR, file-based routing) |
| `react` | 19.2.4 | UI library |
| `react-dom` | 19.2.4 | DOM renderer for React |
| `styled-components` | ^6.4.2 | CSS-in-JS styling library |

### Dev Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `babel-plugin-react-compiler` | 1.0.0 | React Compiler support |
| `eslint` | ^9 | Linting |
| `eslint-config-next` | 16.2.6 | Next.js ESLint rules |

### Installing styled-components

```bash
npm install styled-components
```

## Configuration Files

### `next.config.mjs`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
```

Key settings:
- `reactCompiler: true` — enables the React Compiler for automatic optimisations
- `compiler.styledComponents: true` — enables server-side rendering of styled-components (prevents hydration mismatch errors)

### `jsconfig.json`

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

This sets up the `@/` path alias so `import X from '@/components/ui'` resolves to `src/components/ui`. This is configured automatically by `create-next-app`.

### `eslint.config.mjs`

Uses the default Next.js ESLint config with `core-web-vitals` rules.

## NPM Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `next dev` | Start development server with Turbopack |
| `build` | `next build` | Production build |
| `start` | `next start` | Start production server |
| `lint` | `eslint` | Run ESLint |

## Files Removed from Default Scaffold

The following default `create-next-app` files were deleted after setting up the custom theme system:

- `src/app/globals.css` — replaced by `src/theme/GlobalStyle.js`
- `src/app/page.module.css` — demo styles, no longer needed
- Geist font imports in `layout.js` — removed in favour of theme-controlled fonts

## Files in `public/`

Default SVG assets from the scaffold (can be deleted and replaced with project assets):

```
public/
├── file.svg
├── globe.svg
├── next.svg
├── vercel.svg
└── window.svg
```

`public/` is for static files served at the root URL (e.g. `public/og-image.png` → `yoursite.com/og-image.png`). Only put files here that the browser fetches directly by URL. Files that are `import`ed in code belong in `src/assets/` instead.
