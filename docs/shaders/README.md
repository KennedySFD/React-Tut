# Shaders knowledge base

Durable reference for building WebGL / GLSL effects in this project (Next.js + three.js + react-three-fiber).

## How to use this

1. **Speaking the language** → [GLOSSARY.md](./GLOSSARY.md)
2. **Effect library by target** → [library/INDEX.md](./library/INDEX.md) — **text / images / scroll / cursor** (+ [Book of Shaders math](./library/BOOK-OF-SHADERS.md))
3. **Cross-cutting patterns** → [PATTERNS-BY-USECASE.md](./PATTERNS-BY-USECASE.md)
4. **When the screen is blank / soft / wrong** → [DEBUGGING.md](./DEBUGGING.md)
5. **DOM vs WebGL architecture** → [ARCHITECTURE.md](./ARCHITECTURE.md)
6. **Source inventory** → [_research/SOURCES.md](./_research/SOURCES.md)

A Cursor rule (`.cursor/rules/webgl-shaders.mdc`) loads hard rules when you edit shader or canvas files.

**How to prompt later:** name the target first — e.g. “scroll on images”, “cursor on card”, “shader on hero text only” — and we’ll pull from `library/`. CodePen links get filed under [`library/codepens/`](./library/codepens/INDEX.md).

## One-sentence mental model

WebGL is a **rasteriser**, not a 3D engine: you (or three.js) put triangle data on the GPU, a **vertex shader** places each vertex in clip space, the GPU **rasterises** triangles into fragments, and a **fragment shader** picks each fragment’s colour. Libraries like three.js / Curtains.js / R3F sit on top of that.

## What production scroll/hover sites actually do

They do **not** typically `html2canvas` the whole page into one texture.

They keep **text as real DOM** and put **images (and other media) onto WebGL planes** that sit under or over those DOM elements — synchronised with scroll via `getBoundingClientRect` / Curtains scroll helpers, with a **fixed full-viewport canvas** (`pointer-events: none`). Effects are driven by uniforms: `uTime`, `uScrollVelocity`, `uMouseEnter`, mouse plane coords.

Evidence: [real-world-shader](https://github.com/jankohlbach/real-world-shader) (`Canvas.astro` + per-effect GLSL). See [ARCHITECTURE.md](./ARCHITECTURE.md).

## Lessons from our cylinder-scroll experiment

| Symptom | Actual cause | Fix pattern |
|---------|--------------|-------------|
| “Shader does nothing” | Bend was real; white content on white clear colour | Shade by bend amount; change clear colour; debug with false-colour |
| Black wedges in corners | Edges pushed away from camera → silhouette shrinks | Anchor edges at z=0, bulge centre toward camera |
| Soft text | Page became a bitmap at CSS resolution, then magnified | Prefer DOM text + image planes; or capture at DPR + mipmaps + anisotropy |
| WebGL context conflict | html2canvas took a 2D context on the same canvas | Separate canvases; never share one canvas across context types |
| Uniform crash after HMR | New uniform missing on old material instance | Guard uniform writes; remount Canvas on material shape change |

## Recommended learning path (for humans)

1. Glossary + “how it works” (pipeline).
2. Hard-code a solid colour fragment shader → UV as colour → texture sample.
3. Pass `uTime` / mouse uniforms; use `mix` / `smoothstep`.
4. Study real-world-shader hover + scroll GLSL.
5. Only then: custom vertex displacement, post-processing, ray marching.
