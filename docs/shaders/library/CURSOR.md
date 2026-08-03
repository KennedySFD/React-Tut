# Library: cursor / pointer overlays

## Shell

- Canvas above or below content as designed; usually **`pointer-events: none`** so the page still clicks.
- For “click on the WebGL image” (ripples), either:
  - hit-test the **DOM** image and map coords into UV, or
  - temporarily enable pointer events on the canvas and **raycast** the mesh (Codrops GSAP tutorial).

---

## Pattern 1 — Soft spotlight / paint reveal

**Source:** Builder.io WebGL intro (earlier KB); same idea as Dropbox-style paint. Math: Book of Shaders ch. 05–07 (`distance` + `smoothstep` + optional noise).

- Two textures (outline / painted) or base + overlay colour.
- Uniforms: `uPointer` (pixels or 0…1), `uViewport`.
- `mask = smoothstep(radius, radius - feather, distance(uv, mouse))`.
- `mix(base, reveal, mask)`.
- Optional: noise on the mask edge; accumulate into an FBO if paint should **persist**.

---

## Pattern 2 — Mouse velocity shift / RGB trail

**Source:** [VFX-JS Codrops](https://tympanus.net/codrops/2025/01/20/vfx-js-webgl-effects-made-easy/).

```
pos          ← normalised pointer each move
posDelay     ← lerp toward pos each frame (~0.05)
velocity     ← pos - posDelay
```

Shader: offset UV by `velocity` (flip Y if needed); sample R/G/B at different multiples of `velocity` for chromatic lag.

Feels “alive” without a heavy physics sim.

---

## Pattern 3 — Hover follow on a card

**Source:** real-world-shader hover shaders.

- `plane.mouseToPlaneCoords` (Curtains) or manual remap of clientXY into plane −1…1 / 0…1.
- Lerp `uMouseOverPos`.
- GSAP `uMouseEnter` 0→1 on enter/leave.
- Fragment: bulge / grain / RGB using those uniforms.

---

## Pattern 4 — Click ripple + reveal

**Source:** [GSAP + shaders Codrops](https://tympanus.net/codrops/2025/10/08/how-to-animate-webgl-shaders-with-gsap-ripples-reveals-and-dynamic-blur-effects/).

1. Raycaster → `intersection.uv` → `uMouse`.
2. Timeline: set `uMouse`, tween grayscale/reveal progress, keyframe `uRippleProgress` 0→1→0.
3. Vertex displacement needs dense geometry.

---

## Pattern 5 — Lens / alternate world under cursor

**Source:** [Heckel render targets](https://blog.maximeheckel.com/posts/beautiful-and-mind-bending-effects-with-webgl-render-targets/).

- Render an alternate scene (or swapped materials) into an FBO.
- Sample with **screen coordinates** (`gl_FragCoord / resolution`) on a lens mesh that follows the cursor.
- Advanced; use when the cursor should reveal a different reality, not just distort one image.

---

## CSS-synced cursor accents

If the cursor FX uses brand colours, feed `getComputedStyle` colours into uniforms ([Mattia](https://nmattia.com/posts/2025-01-29-shader-css-properties/)) so dark mode stays coherent.

---

## Prompt cheatsheet

> “Fixed canvas, pointer-events none, spotlight reveal on hero image.”  
> “RGB shift from lerped mouse velocity on project cards.”  
> “Click raycast ripple + circular colour reveal; GSAP timeline on uniforms.”
