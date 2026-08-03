# Folder Structure

## Complete Directory Tree

```
src/
├── animations/              Shared animation configs and GSAP presets
├── app/                     Next.js App Router (routes, layouts, pages)
│   ├── layout.js            Root layout — wraps all pages
│   ├── page.js              Home page (/)
│   ├── shader-test/         WebGL lab (cylinder + media-planes)
│   └── test-*/              Learning / playground routes
├── assets/                  SVGs, images, and models imported in code
├── canvas/                  React Three Fiber / WebGL / Three.js
│   ├── components/          Meshes that track DOM / scroll (not DOM UI)
│   ├── helpers/             Texture limits, shared WebGL utilities
│   ├── scenes/              Full scene shells (Canvas, Lenis, Leva, mode)
│   └── shaders/             One folder per effect (GLSL + material wrapper)
├── components/              All React (DOM) components
│   ├── features/            Page / feature sections (use plural — not `feature/`)
│   │   ├── index.js         Barrel — re-exports feature modules
│   │   └── shader-test/     Lab page content (images, copy) for /shader-test
│   ├── layout/              Structural components
│   │   ├── footer/
│   │   └── header/
│   └── ui/                  Generic reusable elements
│       ├── index.js         Barrel file — re-exports all UI components
│       ├── button/
│       ├── input/
│       └── tag/
├── context/                 React context providers
├── hooks/                   Custom React hooks
│   ├── useCounter.js
│   └── useToggle.js
├── lib/                     Utility functions, constants, helpers
├── middleware/              Auth checks, route protection
├── services/                API call functions (fetch users, submit forms)
└── theme/                   Design tokens and theming system
    ├── GlobalStyle.js       Global CSS reset (replaces globals.css)
    ├── ThemeProvider.js     Client component wrapping styled-components provider
    ├── components.js        Component-level tokens
    ├── global.js            Raw primitive design values
    ├── index.js             Combines all token layers into one theme object
    └── semantic.js          Maps primitives to semantic purpose
```

## Folder Purposes

### `src/app/`
Next.js App Router directory. Every subfolder with a `page.js` becomes a route. `layout.js` wraps all pages and is where the ThemeProvider is mounted.

### `src/components/`
All **DOM** React components, organised into three categories:
- **`ui/`** — generic, reusable elements (Button, Input, Modal, Badge) used across the entire app
- **`layout/`** — structural components (Header, Footer, Sidebar, Nav) that define page chrome
- **`features/`** — page/feature sections (e.g. `shader-test` article + media hero). Always use the plural folder name `features/` — do not add a singular `feature/` root.

WebGL meshes do **not** live here; they live under `src/canvas/components/`.

### `src/theme/`
The complete theming system. Contains design tokens at three levels (global → semantic → component), a GlobalStyle for CSS resets, and a ThemeProvider that wraps the entire app. See THEMING.md for full details.

### `src/hooks/`
Custom React hooks that encapsulate reusable stateful logic. Named with `use` prefix (e.g. `useCounter`, `useToggle`). See HOOKS.md for patterns.

### `src/context/`
React context providers for shared state that needs to be accessible deep in the component tree without prop drilling.

### `src/lib/`
Pure utility functions, constants, and helpers. No React-specific code — just plain JavaScript that could be used anywhere.

### `src/services/`
API layer. Functions that make HTTP requests (e.g. `getUsers()`, `createOrder()`). Keeps fetch logic out of components.

### `src/assets/`
Images, SVGs, and 3D model files (.glb, .gltf) that are `import`ed in code. Not the same as `public/` — files here go through the build pipeline.

### `src/animations/`
Shared animation configurations and GSAP presets. Reusable transition objects (fadeIn, slideUp, scaleIn) that components and hooks consume.

### `src/canvas/`
Everything related to React Three Fiber, Three.js, and WebGL:
- **`scenes/`** — full scene shells (Canvas, scroll, Leva, which content/mode to show)
- **`components/`** — 3D meshes that sync to DOM or scroll (e.g. `MediaPlane`, `ScrollPlane`)
- **`shaders/`** — one effect per folder: `vertex.glsl`, `fragment.glsl`, material wrapper
- **`helpers/`** — shared utilities (texture size limits, etc.)

Page copy and `<img>` URLs stay in `components/features/`; shaders only receive textures/uniforms.

### `src/middleware/`
Route-level middleware for auth checks, redirects, and request interception.
