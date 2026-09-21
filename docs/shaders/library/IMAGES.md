# Library: shaders on images / cards

This is the **main** production shelf. Almost every Codrops / real-world-shader demo lives here.

---

## Shell (do this every time)

From [GSAP + shaders Codrops (Oct 2025)](https://tympanus.net/codrops/2025/10/08/how-to-animate-webgl-shaders-with-gsap-ripples-reveals-and-dynamic-blur-effects/) and VFX-JS:

1. HTML/CSS layout with real `<img>` elements (for size/position).
2. Full-viewport (or section) canvas: `position: absolute/fixed`, `pointer-events: none`.
3. Camera matched to pixels — Codrops uses **OrthographicCamera** with left/right/top/bottom = ±screen/2 (alternative to our perspective FOV trick; both work).
4. One plane per image; `scale` = `getBoundingClientRect()` width/height.
5. Each frame: copy DOM centre → world position (`getWorldPositionFromDOM`).
6. Load texture from `image.src`; set `texture.colorSpace = SRGBColorSpace` (three.js).
7. Optionally hide original `<img>` (visibility/opacity) once the plane is up.
8. Drive the renderer with **`gsap.ticker`** (or R3F `useFrame`) so GSAP and WebGL share one clock.

**VFX-JS shortcut:** `vfx.add(img, { shader: 'glitch' | custom })` — same architecture, less boilerplate. Fine for prototypes; for this learning repo we usually wire R3F/three ourselves so you see the uniforms.

---

## Effect recipes

### 1. Pass-through / base

Sample `texture2D(uTexture, vUv)`. Prove sync before adding FX.

### 2. Grayscale / colour grade with GSAP

- Uniform `uGrayscaleProgress` 0…1.
- `mix(original, grayscale, progress)`.
- Animate with `gsap.to(material.uniforms.uGrayscaleProgress, { value, duration, ease })` — not a boolean snap.

### 3. Circular reveal from click

- Raycast → `intersection.uv` → `uMouse`.
- `dist = distance(vUv, uMouse)`; mask with `smoothstep` driven by animated progress.
- Normalise by max distance to corners so a corner click still fills the plane.

### 4. Ripple (vertex)

- High-segment plane: `PlaneGeometry(1, 1, 50, 50)`.
- `uRippleProgress` keyframed `0 → 1 → 0` on same GSAP timeline as the colour reveal.
- Displace along normal/Y with `sin` of distance from `uMouse`.
- Pass intensity as varying if the fragment should also tint.

### 5. Hover bulge / inverted bulge / grain

See real-world-shader `hover/*` (also summarised in [PATTERNS-BY-USECASE.md](../PATTERNS-BY-USECASE.md)). Drive with `uMouseEnter` tweened 0→1.

### 6. RGB shift

- Sample R/G/B at UV ± offset.
- Offset from mouse direction × enter amount, **or** from mouse **velocity** (VFX-JS mouse-shift case): lerp a delayed position, use delta as `velocity` uniform.

### 7. Pixelate

`uv = floor(uv * cells) / cells` (optionally animate `cells` with `time`).

### 9. Grain / organic overlay (Book of Shaders)

Multiply or offset colour/UV by **noise** or **fBM** × hover/scroll amount. See [BOOK-OF-SHADERS.md](./BOOK-OF-SHADERS.md) ch. 11–13. Prefer trusted noise snippets (LYGIA / Gustavson) over inventing simplex from scratch.

### 8. Dynamic blur / carousel drag

Codrops article continues into scroll/drag-driven blur on a horizontal image carousel (Draggable + ScrollTrigger). Pattern: map drag/scroll velocity or progress into a blur/`uStrength` uniform; keep captions as DOM.

---

## Lighting on image planes?

Usually **no** — flat `ShaderMaterial` / unlit sample is enough for UI cards.

When the image sits on a **3D object** that should react to light, use normals + ambient/directional (MDN lighting tutorial): multiply texel RGB by lighting term. That’s mesh shading, not a card hover.

---

## Prompt cheatsheet

> “Card hover: bulge toward cursor, GSAP `uMouseEnter`, plane tracks DOM img.”  
> “Click ripple + circular colour reveal from raycast UV, 50×50 segments.”  
> “Carousel images in WebGL, captions stay DOM, blur strength from drag velocity.”
