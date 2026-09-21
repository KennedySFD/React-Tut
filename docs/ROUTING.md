# Routing (Next.js App Router)

## Overview

This project uses the **Next.js App Router** (not the Pages Router). Routes are defined by the folder structure inside `src/app/`. Every folder with a `page.js` file becomes a route.

## How Routing Works

```
src/app/
├── layout.js           Root layout (wraps ALL pages)
├── page.js             → /
├── showcase/
│   ├── layout.js       Persistent sidebar + top bar for all /showcase routes
│   ├── page.js         → /showcase          Overview
│   └── [slug]/
│       └── page.js     → /showcase/button   One page per component
├── test/
│   └── page.js         → /test
├── test-hooks/
│   └── page.js         → /test-hooks
├── test-input/
│   └── page.js         → /test-input
└── test-toggle/
    └── page.js         → /test-toggle
```

The folder name becomes the URL path. `page.js` is the required file that defines what renders at that route.

Other files can sit in a route folder without becoming routes — only `page.js` (and the other reserved names like `layout.js`) are special.

## Dynamic Routes

A folder in square brackets becomes a parameter. `src/app/showcase/[slug]/page.js` serves `/showcase/button`, `/showcase/select` and every other component page from one file.

```javascript
import { notFound } from 'next/navigation';
import { getEntry, registry } from '@/showcase/registry';

/** Prerender every page at build time. */
export function generateStaticParams() {
  return registry.map((entry) => ({ slug: entry.slug }));
}

/** Anything outside the registry is a 404 rather than rendered on demand. */
export const dynamicParams = false;

export default async function Page({ params }) {
  const { slug } = await params;
  const entry = getEntry(slug);

  if (!entry) notFound();

  return <StoryRenderer slug={slug} entry={entry} />;
}
```

**`params` is a Promise and must be awaited.** This changed in Next.js 15 — older examples that destructure `{ params: { slug } }` directly will not work.

`generateStaticParams` turns the dynamic route into static HTML at build time, one file per entry. The build output shows this as `● (SSG)` rather than `○ (Static)`.

## Nested Layouts

`layout.js` can appear in any route folder, not just the root. `src/app/showcase/layout.js` wraps every `/showcase/*` route with the sidebar and top bar.

The key behaviour: **a layout does not re-render when navigating between the pages it wraps.** Only the `children` slot changes. That is why the showcase sidebar keeps its scroll position as you move between components, and why the theme toggle in its top bar does not reset.

Layouts nest — a page under `/showcase/button` is wrapped by the showcase layout, which is itself wrapped by the root layout.

## Key Files

### `layout.js` — Root Layout

Every page is wrapped in this layout. It defines the `<html>` and `<body>` tags and is where the ThemeProvider is mounted.

```javascript
import ThemeProvider from "@/theme/ThemeProvider";

export const metadata = {
  title: "Component Library",
  description:
    "A token-driven React component library built with Next.js and styled-components.",
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

Key points:
- `metadata` export — sets `<title>` and `<meta>` tags (Next.js handles this automatically)
- `{children}` — this is where the current page's content renders
- `layout.js` is a **Server Component** by default (no `'use client'`)
- ThemeProvider is a Client Component, so it creates a client/server boundary here

### `page.js` — Page Component

Each route's content. The default export is what renders at that URL.

```javascript
export default function Home() {
  return (
    <main>
      <h1>Home</h1>
    </main>
  );
}
```

Pages are **Server Components** by default. Add `'use client'` at the top if the page needs:
- Event handlers (onClick, onChange)
- React hooks (useState, useEffect)
- Browser APIs
- styled-components

## Server Components vs Client Components

### Server Components (default)

- Render on the server
- Cannot use hooks, event handlers, or browser APIs
- Can be `async` and fetch data directly
- No `'use client'` directive

```javascript
// This is a Server Component (no directive)
export default function About() {
  return <h1>About</h1>;
}
```

### Client Components

- Render on the client (and are pre-rendered on the server)
- Can use hooks, event handlers, browser APIs, styled-components
- Must have `'use client'` at the top of the file

```javascript
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### When to Use `'use client'`

Add `'use client'` when the file:
- Uses any React hook (`useState`, `useEffect`, `useRef`, etc.)
- Has event handlers (`onClick`, `onChange`, `onSubmit`)
- Uses browser-only APIs (`window`, `document`, `localStorage`)
- Uses styled-components
- Imports from a library that requires client-side rendering

## Creating a New Route

1. Create a folder in `src/app/` with the route name: `src/app/about/`
2. Add a `page.js` file inside it
3. Export a default function component
4. The route is automatically available at `/about`

### Nested Routes

```
src/app/
└── dashboard/
    ├── layout.js       Optional nested layout for /dashboard/*
    ├── page.js          → /dashboard
    └── settings/
        └── page.js      → /dashboard/settings
```

Nested layouts wrap only their child routes, not the entire app.

## Current Routes

| URL | File | Purpose | Client? |
|-----|------|---------|---------|
| `/` | `src/app/page.js` | Home page | No |
| `/test` | `src/app/test/page.js` | Button variant testing | Yes |
| `/test-hooks` | `src/app/test-hooks/page.js` | useCounter hook testing | Yes |
| `/test-input` | `src/app/test-input/page.js` | Input component testing | Yes |
| `/test-toggle` | `src/app/test-toggle/page.js` | useToggle hook testing | Yes |
