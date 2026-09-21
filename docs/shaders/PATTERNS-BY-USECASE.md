# Patterns by use case

Organised for how we actually prompt and build. Primary production reference: [jankohlbach/real-world-shader](https://github.com/jankohlbach/real-world-shader) (Curtains.js + Lenis + GSAP). Tutorials fill in fundamentals.

---

## Shared production shell (almost every site effect)

From `Canvas.astro` in real-world-shader:

1. **Fixed full-viewport canvas** — `position: fixed; inset: 0; pointer-events: none;` so DOM still receives clicks/scroll.
2. **DOM media hooks** — elements marked e.g. `[data-canvas]` become WebGL planes; each can pick a shader via `data-shader="hover/002"`.
3. **Per-plane textures** — the `<img>` (or media) becomes `sampler2D`; **body text stays HTML**.
4. **Dense geometry when displacing vertices** — `widthSegments: 100, heightSegments: 100`.
5. **Standard uniforms** — `uTime`, `uScrollVelocity`, `uMouseEnter` (0→1), `uMouseOverPos`, `uAspectRatio`.
6. **Smooth inputs** — lerp mouse; GSAP tween `uMouseEnter` on enter/leave; Lenis velocity → `uScrollVelocity`.
7. **Scroll sync** — `curtains.updateScrollValues(scrollX, scrollY)` so planes track DOM as you scroll.
8. **Fallback** — `curtains.onError` → CSS-only (`no-curtains` class).

**R3F equivalent sketch:** fixed `<Canvas style={{ pointerEvents: 'none' }} />`, measure DOM with `getBoundingClientRect`, position/size meshes in pixel-matched camera space (`fov = 2*atan(height/2/camZ)`), pass the same uniforms from Lenis/pointer/GSAP.

---

## 1. Cursor / mouse overlay (does not affect page interaction)

**Goal:** Spotlight, paint-reveal, blob trail, or distortion under the cursor without stealing clicks.

| Piece | Pattern |
|-------|---------|
| Stacking | Fixed canvas, `pointer-events: none`, z-index under or over content as designed |
| Input | `mousemove` → store pixel or NDC coords; **flip Y** if using `gl_FragCoord` (Builder.io: `canvas.height - mouse.y`) |
| Smooth | Lerp current → target each frame (real-world-shader `lerp` ~0.05) |
| Mask | `distance(uv, mouse)`; soft edge via `smoothstep` |
| Blend | `mix(base, reveal, mask)` between two textures (Builder Dropbox-style paint) |
| Noise edge | Multiply mask by FBM/value noise for a rough brush (Builder full example) |

**Minimal mask idea** (Builder.io simplified):

```glsl
float d = distance(uv, mouse);
float mask = smoothstep(radius, radius - feather, d);
gl_FragColor = mix(baseCol, paintCol, mask);
```

**Use when:** hero interaction, “paint to reveal”, custom cursor energy — not when you only need a CSS `:hover`.

---

## 2. Cards / image hover

**Goal:** Distortion, grain, bulge, RGB split on a card image when hovered.

real-world-shader hover examples:

| Effect | Where | Idea |
|--------|-------|------|
| Noise / grain | fragment | Offset UV or colour with noise × `uMouseEnter` |
| Bulge | fragment | Centre UV on mouse, scale by distance, `mix` with enter progress |
| Inverted bulge | fragment | Same family, inverted strength |
| RGB-Shift | fragment | Sample R/G/B at UV ± shift toward/away from mouse |

Bulge core (from `hover/002/fragment.glsl`):

```glsl
vec2 mappedMouse = uMouseOverPos * 0.5 + 0.5;
vec2 temp = textureCoord - mappedMouse;
float dist = length(temp);
temp *= mix(1.0, dist, strength);
temp += mappedMouse;
gl_FragColor = texture2D(uSampler0, mix(textureCoord, temp, uMouseEnter));
```

RGB shift core (from `hover/004/fragment.glsl`):

```glsl
vec2 shift = normalize(mappedMouse - 0.5) * distanceFromCenter * strength * uMouseEnter;
float r = texture2D(uSampler0, uv - shift).r;
float g = texture2D(uSampler0, uv).g;
float b = texture2D(uSampler0, uv + shift).b;
gl_FragColor = vec4(r, g, b, 1.0);
```

**Drive enter with GSAP**, not a boolean snap — real-world-shader uses ~0.6s custom ease into `uMouseEnter`.

---

## 3. Scroll-driven effects

**Goal:** Images bend, skew, or lag as the user scrolls.

### Pattern A — Velocity warp on media planes (production default)

From `scroll/001` and `scroll/002` vertex shaders:

```glsl
// 001 — single sine lobe across width
vertexPosition.y -= sin(aTextureCoord.x * PI) * uScrollVelocity * strength;

// 002 — multi-wave drag
vertexPosition.y -= cos(vertexPosition.x * PI * waves) * uScrollVelocity * strength;
```

- `uScrollVelocity` from Lenis (`e.velocity`); sign encodes direction.
- Fragment often just samples the texture — distortion is geometric.
- **Does not rasterise the whole page.** Text above/below the image stays DOM-crisp.

### Pattern B — Full-page drum / cylinder (our experiment)

- Capture or render content to one tall texture; scroll = UV window (`uScrollProgress`).
- Vertex bend for drum silhouette; fragment shading for legibility.
- **Trade-off:** text becomes a bitmap (quality cost). Prefer Pattern A unless the *entire* page must be one continuous warped surface.

### Pattern C — Scroll progress as `uProgress` 0…1

Map `scrollY / maxScroll` into a uniform for section reveals, clip wipes, or pinned GSAP ScrollTrigger → shader.

---

## 4. Animations & transitions

| Approach | When |
|----------|------|
| `uTime` in shader (`sin(uv.x + uTime)`) | Endless idle motion, noise evolution |
| Animate a uniform from JS (GSAP / R3F) | One-shot transitions with easing you control |
| `uProgress` 0→1 | Image A→B dissolves, mask reveals, page transitions |
| Displacement map transition | `mix(texA, texB, smoothstep(...))` driven by third texture + progress |

**Rule of thumb:** continuous organic motion → time inside GLSL. Directed story beats → GSAP/JS animates uniforms (matches how we already use GSAP in the hero).

Builder.io / ownkng both show `uTime` / `uElapsedTime` updated every `requestAnimationFrame`.

---

## 5. Full-screen generative / hero art (ray marching)

From Medium “Shaders for Web Design”:

- Entire look from a fragment shader: SDFs, ray march loop, fresnel/glass.
- Great for a **hero canvas** that doesn’t need selectable DOM text inside the effect.
- Different skill tree from card/scroll media planes — don’t mix the architectures casually.

---

## 6. Building-block cheat sheet

| Want | Reach for |
|------|-----------|
| Soft circular mask | `smoothstep` + `distance` |
| Blend two looks | `mix(a, b, t)` |
| Hard cutoff | `step` or threshold |
| Aspect-correct circle | Scale `uv.x` by `resolution.x/resolution.y` |
| Cover-style image fit | Scale UV by canvas vs content aspect (Builder `getCoverUV`) |
| Organic irregularity | Noise / FBM |
| Visible 3D bend on pale content | Also shade by displacement (`vCurve`) — geometry alone often invisible |
| Pixel↔world sync | FOV from `2 * atan(viewH/2/camZ)` so 1px ≈ 1 world unit |

---

## Prompting language (how to ask for a shader)

Use uniforms and stages explicitly:

> “Fragment shader: two `sampler2D`s, `uPointer` in 0…1, soft circular `smoothstep` mask, `mix` outline→painted. Fixed canvas, pointer-events none. Vertex: pass-through fullscreen triangle.”

Rather than:

> “Make it look like WebGL paint.”

Name the **use case** (hover card / scroll velocity / cursor reveal / drum scroll) so we pick the right architecture from this doc.
