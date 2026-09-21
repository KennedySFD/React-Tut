# Library: scroll-driven shaders

## Default recommendation

**Warp media planes with scroll velocity / progress. Leave text as DOM.**

Full-page drum (`html2canvas` + one tall texture) is a special experiment — see [ARCHITECTURE.md](../ARCHITECTURE.md).

---

## Pattern 1 — Velocity warp on images (lightest)

**Sources:** real-world-shader `scroll/001`–`002`.

- Lenis (or similar) exposes `velocity`.
- Vertex: bend `position.y` with `sin`/`cos` × `uScrollVelocity` × strength.
- Fragment: often just sample texture.
- Planes track DOM; canvas `pointer-events: none`.

Best for: subtle “drag” on photos while scrolling a normal page.

---

## Pattern 2 — GSAP ScrollTrigger / Draggable carousel

**Source:** [Codrops GSAP + shaders](https://tympanus.net/codrops/2025/10/08/how-to-animate-webgl-shaders-with-gsap-ripples-reveals-and-dynamic-blur-effects/).

- Horizontal (or vertical) strip of DOM images → synced planes.
- `overflow: hidden` on the page shell; interaction via GSAP Draggable + ScrollTrigger.
- `gsap.ticker` runs `renderer.render`.
- Map scroll/drag into uniforms: progress, velocity, blur amount.
- Captions remain HTML beside/under the images.

Best for: case-study carousels, work pages, editorial image rails.

---

## Pattern 3 — Scroll progress as `uProgress` 0…1

- `scrollY / maxScroll` or ScrollTrigger `progress` on a section.
- Shader uses progress for wipe, dissolve, mask grow, chromatic amount.
- Same media-plane shell as Pattern 2.

---

## Pattern 4 — FBO particle morphs on scroll

**Source:** [Loopspeed FBO particles](https://blog.loopspeed.co.uk/fbo-particles-simulation).

- Positions simulated in a **fragment shader** writing to a float texture (FBO / render target).
- Points sample that texture for XYZ.
- GSAP ScrollTrigger blends between target layouts (model → sphere → ring).
- Heavy / spectacular backgrounds; not for body text.
- Use `PerformanceMonitor` / adaptive DPR (their Next + R3F setup).

Best for: hero backgrounds, “data” aesthetics, section transitions that aren’t DOM cards.

---

## Pattern 5 — Full-page content texture (our drum)

- Capture or render whole page → one texture → UV window + vertex curve.
- Only when the **entire** page must read as one surface.
- Expect soft type; mitigate DPR/mip/aniso; don’t use as default.

---

## Related advanced: render targets

**Source:** [Maxime Heckel — render targets](https://blog.maximeheckel.com/posts/beautiful-and-mind-bending-effects-with-webgl-render-targets/).

- `useFBO` / `WebGLRenderTarget` / Drei `RenderTexture`.
- Post-process a scene texture, portals, screen-space “lens”.
- Use when scroll should reveal **another scene** or a post FX stack — not required for simple image bend.

---

## Prompt cheatsheet

> “Lenis velocity bends project images; copy stays DOM.”  
> “GSAP ScrollTrigger carousel: WebGL planes + DOM captions + blur from drag speed.”  
> “FBO particles morph on section scroll — background only.”
