# Folder Structure

## Complete Directory Tree

```
src/
├── animations/              Shared animation configs and GSAP presets
├── app/                     Next.js App Router (routes, layouts, pages)
│   ├── favicon.ico
│   ├── layout.js            Root layout — mounts the ThemeProvider
│   ├── page.js              Home page (/)
│   ├── showcase/            The component library browser (Storybook-style)
│   │   ├── layout.js        Persistent sidebar + top bar
│   │   ├── page.js          → /showcase          Overview
│   │   └── [slug]/
│   │       └── page.js      → /showcase/button   One page per component
│   ├── test/                Scratch route — buttons
│   ├── test-hooks/          Scratch route — useCounter
│   ├── test-input/          Scratch route — Input
│   └── test-toggle/         Scratch route — useToggle
├── assets/                  SVGs, images, and models imported in code
├── canvas/                  React Three Fiber / WebGL / Three.js
│   ├── components/          Individual 3D objects (models, lights, cameras)
│   ├── helpers/             Camera rigs, post-processing, loaders
│   ├── scenes/              Full scene compositions
│   └── shaders/             Custom GLSL vertex/fragment shaders
├── components/              All React components
│   ├── features/            Feature-specific components (e.g. UserCard, ProductList)
│   ├── icons/               Inline SVG icon set (named exports, currentColor)
│   │   └── index.js
│   ├── layout/              Structural components (header, footer, …)
│   └── ui/                  The component library
│       ├── index.js         Barrel file — re-exports every UI component
│       ├── accordion/       Accordion.jsx · Accordion.style.js · index.js
│       ├── alert/
│       ├── button/
│       ├── card/
│       ├── checkbox/
│       ├── field/           Shared label + help-text chrome for form controls
│       ├── input/
│       ├── modal/
│       ├── radio/           Radio.jsx · RadioGroup.jsx · Radio.style.js · index.js
│       ├── searchbar/       Composes input/
│       ├── select/          Custom dropdown (listbox)
│       ├── spinner/
│       ├── switch/
│       ├── tabs/
│       ├── tag/
│       ├── textarea/
│       └── tooltip/
├── context/                 React context providers
│   └── ThemeModeContext.js  Light/dark mode state, persisted to localStorage
├── hooks/                   Custom React hooks
│   ├── useCounter.js
│   ├── useFieldMotion.js    Focus keyline on form controls
│   ├── useInteractiveMotion.js  Hover / press for every interactive component
│   ├── useRevealMotion.js   Shared entrance for menus, modals, tooltips
│   ├── useStateMotion.js    Two-state pop for check marks and radio dots
│   └── useToggle.js
├── lib/                     Utility functions, constants, helpers
│   ├── gsap.js              Registers the shared eases with GSAP
│   └── registry.js          styled-components SSR registry
├── middleware/              Auth checks, route protection
├── services/                API call functions (fetch users, submit forms)
├── showcase/                The component browser's own code
│   ├── Overview.jsx         Landing page: every entry, grouped
│   ├── ShowcaseChrome.jsx   Sidebar + top bar, used by the layout
│   ├── StoryRenderer.jsx    Maps a slug to its stories
│   ├── registry.js          Slug / name / category / summary (no JSX)
│   ├── kit/                 Hero, Story, PropsTable, Canvas, layout helpers
│   └── stories/             One file per component
│       ├── ButtonStories.jsx    default = stories, Hero = isolated instance
│       └── …
└── theme/                   Design tokens and theming system
    ├── GlobalStyle.js       Global CSS reset (replaces globals.css)
    ├── ThemeProvider.js     Provides the theme for the active colour mode
    ├── components.js        Layer 3 — per-component geometry tokens
    ├── glass.js             Glass + dispersion layers (re-exported by mixins)
    ├── global.js            Layer 1 — raw primitive values
    ├── index.js             createTheme(mode) — resolves all layers
    ├── mixins.js            Shared CSS fragments (focusRing, fieldBase, …)
    ├── motion.js            Curves, durations, gestures, amplitudes
    └── semantic.js          Layer 2 — purpose-driven roles, light + dark
```

Every component folder follows the same three-file pattern
(`Name.jsx`, `Name.style.js`, `index.js`), expanded above only for `accordion/`
to avoid repetition.

## Folder Purposes

### `src/app/`
Next.js App Router directory. Every subfolder with a `page.js` becomes a route. `layout.js` wraps all pages and is where the ThemeProvider is mounted.

### `src/components/`
All React components, organised into categories:
- **`ui/`** — the component library: generic, reusable elements used across the entire app
- **`layout/`** — structural components (Header, Footer, Sidebar, Nav) that define page chrome
- **`features/`** — feature-specific composed components (UserCard, ProductList) built from ui/ elements
- **`icons/`** — inline SVG icons as named exports; the one deliberate exception to the three-file pattern

See COMPONENTS.md for the full inventory and the rules for adding to it.

### `src/theme/`
The complete theming system: tokens at three levels (global → semantic → component), the shared style mixins, a GlobalStyle for CSS resets, and a ThemeProvider that resolves the tokens for the active colour mode. See THEMING.md for full details.

### `src/app/showcase/` and `src/showcase/`
The component browser, modelled on Storybook: a sidebar of every entry, and **one page per component**. Each page opens with a full-viewport hero stage holding a single live instance of the component and nothing else, for looking at it in isolation while designing; every variant, state and the props table sit below the fold.

The route files stay thin — `src/app/showcase/` holds only the layout and two pages. Everything else lives in `src/showcase/`, which keeps the browser's own code out of the routing tree and means the registry can be imported by Server Components for `generateStaticParams`.

When you add a component, add one entry to `src/showcase/registry.js` and one file to `src/showcase/stories/`. See COMPONENTS.md.

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
- **`scenes/`** — full scene compositions (Canvas + lights + camera + models)
- **`components/`** — individual 3D objects
- **`shaders/`** — custom GLSL vertex and fragment shaders with their ShaderMaterial wrappers
- **`helpers/`** — camera rigs, post-processing effects, asset loaders

### `src/middleware/`
Route-level middleware for auth checks, redirects, and request interception.
