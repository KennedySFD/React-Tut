# Library: shaders on text

## Default recommendation

**Keep body copy and UI labels as real DOM.** Shader the images around them.

Only put text through WebGL when the brief is explicitly “the type itself is the effect” (glitch headline, liquid logo type, one hero line).

---

## Pattern A — DOM text + WebGL media (preferred)

- Headings/paragraphs stay HTML (sharp, selectable, accessible).
- Nearby `<img>` / video get planes (see [IMAGES.md](./IMAGES.md)).
- Labels can sit *on top of* the canvas (`z-index`) while the image underneath warps.

**Sources:** real-world-shader; GSAP Codrops carousel (DOM `<span>` captions beside WebGL images).

---

## Pattern B — Rasterise text into a texture (special case)

### VFX-JS approach ([Codrops, Jan 2025](https://tympanus.net/codrops/2025/01/20/vfx-js-webgl-effects-made-easy/))

1. Take a text element (`h1`, `p`, …).
2. Convert to SVG via `foreignObject`.
3. Draw SVG → canvas → WebGL texture.
4. Apply fragment shaders (glitch, invert, pixelate, etc.).

**Pros:** Quick sketches; works with “normal” HTML/CSS layout before capture.  
**Cons (author admits):** experimental; nested DOM limited; text becomes a **bitmap** → same softness class of problems as our html2canvas page capture. Not ideal for long readable copy.

### When we might use B in this repo

- Single hero wordmark / short line.
- Capture at devicePixelRatio, avoid magnifying the mesh.
- Accept non-selectable text inside the effect (keep a visually hidden DOM duplicate for a11y if needed).

### What not to do

- Full article body through Pattern B (our `/shader-test` drum lesson).

---

## Theming text-adjacent shaders

If a shader draws shapes/type-like graphics, pull colours from CSS so dark mode works:

1. Put `color` / `accent-color` on the canvas (or a host element).
2. Each frame: `parseRGBA(getComputedStyle(el).color)` → `uColor` uniform.
3. Prefer resolved `rgb()` from computed styles, not raw custom properties (`--token` may stay as `hsl(...)`).

**Source:** [Nicolas Mattia — shader CSS properties](https://nmattia.com/posts/2025-01-29-shader-css-properties/). Bonus: CSS `transition` on `color` animates the shader for free.

---

## Prompt cheatsheet

> “Glitch effect on the **hero h1 only** — VFX-style text raster at DPR 2, rest of page DOM.”  
> vs  
> “Scroll warp on **images**; leave all text as DOM.”
