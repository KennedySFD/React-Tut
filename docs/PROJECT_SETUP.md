# Project Setup

## Overview

This project is a **Next.js 16** application using the **App Router**, **React 19**, **JavaScript** (not TypeScript), and **SCSS modules** for styling. It was scaffolded with `create-next-app` and then customised.

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
| `sass` | ^1.105.1 | Compiles `.module.scss` stylesheets |

### Dev Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `babel-plugin-react-compiler` | 1.0.0 | React Compiler support |
| `eslint` | ^9 | Linting |
| `eslint-config-next` | 16.2.6 | Next.js ESLint rules |

### Installing Sass

```bash
npm install sass
```

Stylesheets are CSS modules (`.module.scss`). Shared mixins live in `src/theme/_mixins.scss` and are imported with a relative `@use`. Colours and spacing come from `src/theme/tokens.css`. See STYLING.md.

## Configuration Files

### `next.config.mjs`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  turbopack: {
    rules: {
      '*.glsl': {
        loaders: ['raw-loader'],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
```

Key settings:
- `reactCompiler: true` — enables the React Compiler for automatic optimisations
- `turbopack.rules` — loads `.glsl` shader files as raw strings

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

- `src/app/globals.css` — replaced by `src/theme/globals.css` and `src/theme/tokens.css`
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
