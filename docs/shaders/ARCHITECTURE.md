# Architecture: how to attach shaders to a real site

This is the decision doc. Getting this wrong costs more than any uniform tweak.

---

## Two architectures

### A. Media planes over DOM (production default)

Confirmed again by **VFX-JS** (Codrops 2025) and **GSAP + shaders** (Codrops 2025): fixed/absolute canvas, `pointer-events: none`, planes (or library-generated quads) track DOM images, textures from `img`/`video`, captions/text stay HTML. GSAP owns directed uniform animation (`gsap.to(material.uniforms.uX, …)` + often `gsap.ticker` for render).

**What real-world-shader does** (Curtains.js, but the idea is library-agnostic):

```
┌─────────────────────────────────────┐
│  Fixed WebGL canvas                 │  pointer-events: none
│  (planes track [data-canvas] imgs)  │
├─────────────────────────────────────┤
│  Normal DOM                         │
│  - headings, copy, links (crisp)    │
│  - <img data-canvas data-shader=…>  │  → becomes a textured plane
└─────────────────────────────────────┘
```

- Scroll: Lenis (or native) moves the page; WebGL updates plane positions / scroll uniforms.
- Effects: hover, scroll-velocity warp, wave distortion on **images only**.
- Fallback: hide canvas / `no-curtains` and show plain images.

**Use for:** portfolios, marketing sites, card grids, most “shader on scroll” looks.

**R3F mapping:**

- Fixed `<Canvas>` with transparent clear if DOM shows through.
- Pixel-matched perspective camera (`fov = 2 * atan(vh/2/camZ)`).
- For each media node: read `getBoundingClientRect()`, set mesh position/scale in world units = pixels.
- Texture = the image URL (or video), not a screenshot of the page.
- Text and UI remain React DOM.

### B. Full-viewport content texture (special case)

**What our `/shader-test` drum does:**

```
html2canvas(page) → one tall CanvasTexture → subdivided plane → vertex drum + UV scroll window
```

- Entire visual (including text) is a bitmap.
- Good for: true continuous warp of *everything*, experimental full-page FX.
- Bad for: readable body copy, SEO/selectability inside the texture, accessibility of text in the capture, performance on long pages.

**Use only when** the product requirement is “the whole page is one warped surface.” Otherwise prefer A.

---

## Why our text looked soft

Under architecture B, quality is bounded by:

1. Capture resolution vs canvas DPR  
2. Magnification from centre bulge  
3. Filtering (mipmaps / anisotropy)  
4. Loss of glyph hinting / subpixel AA forever  

Improving B (DPR capture, mipmaps, anisotropy) helps but **cannot match** native DOM text. Architecture A avoids the problem for copy.

---

## Context & canvas rules

- A canvas has **one** context type for its lifetime. Don’t run html2canvas’s 2D context on the WebGL canvas — use a separate element or `canvas: document.createElement('canvas')` in html2canvas options **(ours)**.
- Size drawing buffer with DPR: `canvas.width = cssWidth * dpr` (Builder.io resize pattern).
- Prefer WebGL2 (`getContext('webgl2')`) — R3F does this when available. GLSL ES 3.00 needs `#version 300 es` and `in`/`out` (lea.codes migration notes). three.js `ShaderMaterial` usually stays on the WebGL1-style GLSL three transpile path — follow three’s docs for the version you have installed.

---

## Uniform & animation ownership

| Concern | Own in |
|---------|--------|
| Endless wave / noise | GLSL + `uTime` |
| Hover in/out easing | GSAP → `uMouseEnter` |
| Scroll position / velocity | Lenis / scroll listener → uniforms |
| Section storytelling | GSAP ScrollTrigger / timeline → `uProgress` |
| React state for UI | React; push numbers into uniforms in `useFrame` |

---

## Folder conventions in this repo

DOM UI stays in `src/components/` (`ui/`, `layout/`, `features/`). WebGL stays under `src/canvas/`. Use the plural `features/` folder — never a singular `feature/` root. Lab copy and image URLs for `/shader-test` live in `src/components/features/shader-test/`; shaders only receive textures and uniforms.

```
src/canvas/
  components/     # meshes (e.g. scroll-plane, media-plane)
  scenes/         # page-level R3F scenes
  shaders/        # GLSL + material wrappers per effect
  helpers/        # texture limits, FOV utils, etc.

src/app/shader-test/   # route for the WebGL lab
docs/shaders/          # this knowledge base
```

One effect = one folder (`cylinder-scroll/`) with `vertex.glsl`, `fragment.glsl`, material component, barrel export.

---

## Decision tree

```
Need selectable / crisp text?
  yes → Architecture A (media planes). Shader the images only.
  no  → Is the whole page one continuous warp?
          yes → Architecture B (content texture), accept bitmap text; max DPR + mip/aniso.
          no  → Architecture A anyway.
```

Cursor overlays and card hovers almost always sit on A (or a small dedicated canvas over one component).
