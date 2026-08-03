# Research sources inventory

Read 1 August 2026. Notes below record what each source contributed and any access issues.

## Primary list (user-supplied)

| # | URL | Status | Role |
|---|-----|--------|------|
| 1 | [webglfundamentals — Shaders and GLSL](https://webglfundamentals.org/webgl/lessons/webgl-shaders-and-glsl.html) | OK | Core GLSL: attributes, uniforms, varyings, textures, type strictness, swizzling |
| 1b | [webglfundamentals — How it works](https://webglfundamentals.org/webgl/lessons/webgl-how-it-works.html) | OK (followed) | Pipeline: drawArrays → vertex → rasterise → fragment; interpolation |
| 1c | [webglfundamentals — Textures](https://webglfundamentals.org/webgl/lessons/webgl-3d-textures.html) | OK (followed) | UV, wrap, mipmaps, filtering modes, NPOT rules (WebGL1) |
| 2 | [ownkng — Writing a WebGL program](https://www.ownkng.dev/thoughts/writing-a-webgl-program) | OK (14 May 2021) | three.js `ShaderMaterial`, `uTime`, varyings, noise, UV→alpha masks, R3F note |
| 3 | [Builder.io — WebGL shaders](https://www.builder.io/blog/webgl-shaders) | OK (16 Oct 2025) | Cursor reveal with two textures + `smoothstep`/`mix`; compile/link error checks; DPR sizing |
| 4 | [lea.codes — WebGL shaders tutorial](https://lea.codes/posts/2023-06-04-webgl-shaders-tutorial/) | OK (4 Jun 2023) | WebGL ≠ 3D engine; WebGL1→2 migration; UV gradient; loop constraints |
| 5 | [dev.to/timclicks — First shader](https://dev.to/timclicks/create-something-beautiful-this-weekend-write-your-first-shader-and-put-it-on-the-web-with-webgl-3gc) | OK | ShaderToy vs WebGL uniforms (`iTime`/`iResolution` → `u_time`/`u_resolution`); glslCanvas |
| 6 | [dev.to/hayyanstudio — Simple shaders](https://dev.to/hayyanstudio/creating-simple-shaders-in-webgl-a-step-by-step-guide-46gg) | OK (thin) | Raw compile/link/`drawArrays` triangle; little beyond boilerplate |
| 7 | [p5.js — Introduction to shaders](https://archive.p5js.org/learn/getting-started-in-webgl-shaders.html) | OK | Plain-English glossary; `setUniform`; attribute/varying handoff |
| 8 | [Medium — Shaders for web design](https://medium.com/@vzzz/shaders-for-web-design-13476873dac2) | OK (24 Jan 2025) | Ray marching / SDF / glass materials for hero art; not DOM-sync scroll |
| 9 | [real-world-shader](https://real-world-shader.jankohlbach.com/) + [GitHub](https://github.com/jankohlbach/real-world-shader) | OK | **Highest value for our use cases.** Curtains.js per-image planes, Lenis velocity, hover/scroll/distortion GLSL |
| 10 | [GregStanton/webgl2-glsl-primer](https://github.com/GregStanton/webgl2-glsl-primer) | OK (README + Q&A cards) | WebGL2/GLSL ES 3.00 vocabulary; spaces; VBO/VAO; fragment vs pixel |

Duplicate in the original list: webglfundamentals shaders page was linked twice.

## Batch 3 — Book of Shaders (1 Aug 2026)

| URL | Status | Filed under |
|-----|--------|-------------|
| [thebookofshaders.com](https://thebookofshaders.com/) ch. 01–13 | OK | [library/BOOK-OF-SHADERS.md](../library/BOOK-OF-SHADERS.md); notes in `_research/NOTES-BOOK-OF-SHADERS.md` |
| Later TOC (textures, sim, 3D) | Incomplete on site | Not summarised as full lessons |

## Batch 2 — use-case library (1 Aug 2026)

| URL | Status | Filed under |
|-----|--------|-------------|
| [VFX-JS Codrops](https://tympanus.net/codrops/2025/01/20/vfx-js-webgl-effects-made-easy/) | OK | library TEXT, IMAGES, CURSOR — DOM→texture planes; text via SVG foreignObject |
| [GSAP + shaders Codrops](https://tympanus.net/codrops/2025/10/08/how-to-animate-webgl-shaders-with-gsap-ripples-reveals-and-dynamic-blur-effects/) | OK | library IMAGES, SCROLL, CURSOR — ortho pixel sync, GSAP uniform timelines, ripples/reveals |
| [CSS → shader colours](https://nmattia.com/posts/2025-01-29-shader-css-properties/) | OK | theming all shelves — getComputedStyle → uniforms |
| [Heckel render targets](https://blog.maximeheckel.com/posts/beautiful-and-mind-bending-effects-with-webgl-render-targets/) | OK | advanced FBO / portals / screen-space lens (R3F) |
| [Loopspeed FBO particles](https://blog.loopspeed.co.uk/fbo-particles-simulation) | OK | library SCROLL — simulation texture + ScrollTrigger |
| [MDN Lighting in WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Lighting_in_WebGL) | OK | 3D mesh lighting basics (normals, ambient + directional) |

## Extra sources discovered while researching

| URL | Why it matters |
|-----|----------------|
| [jankohlbach/real-world-shader](https://github.com/jankohlbach/real-world-shader) `src/components/Canvas.astro` | Full production wiring: fixed canvas, `pointer-events: none`, Curtains planes on `[data-canvas]`, Lenis → `uScrollVelocity` |
| Shader paths live under `src/shader/...` (site GitHub links that say `assets/shader/` are stale) | Correct raw URLs for GLSL |
| [jankohlbach/codrops-shader-on-scroll](https://github.com/jankohlbach/codrops-shader-on-scroll) | Related Codrops scroll work; tree fetch 404'd from this environment — not fully read |
| Book of Shaders, ShaderToy, Bruno Simon three.js journey | Repeatedly recommended across articles; not re-fetched here |

## Access / honesty notes

- Medium article loaded successfully (not paywalled for the fetch).
- real-world-shader landing page is a demo index; substance is in the GitHub GLSL + `Canvas.astro`.
- Hayyanstudio article is beginner boilerplate only.
- timclicks uses ShaderToy-style `mainImage` wrapped for glslCanvas — different entry point than three.js `main()`.
- Images/diagrams on several pages were not OCR'd; text and code blocks were used.
