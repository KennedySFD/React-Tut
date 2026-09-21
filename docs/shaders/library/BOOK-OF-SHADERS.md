# Book of Shaders — distilled for this project

Source: [thebookofshaders.com](https://thebookofshaders.com/) by Patricio Gonzalez Vivo & Jen Lowe.  
Focus of the book: **fragment shaders** (per-pixel colour). Vertex displacement / DOM sync are *our* stack; this book is the math vocabulary for masks, noise, shapes, and generative looks.

Published chapters we read: **01–13** (getting started → fBM). Later TOC items (textures, simulation, 3D) are incomplete on the site — treat those titles as a roadmap, not as covered here.

---

## Mental model (ch. 01–03)

- A fragment shader is a function: **position in → colour out**, run in parallel for every pixel.
- Threads are **blind** (can’t read neighbours) and **memoryless** (no previous frame) unless *you* pass history via textures/FBOs (our FBO docs).
- Debug by painting variables as colour — same advice as our [DEBUGGING.md](../DEBUGGING.md).
- Canonical uniforms in the book: `u_resolution`, `u_mouse`, `u_time` (ShaderToy: `iResolution`, `iMouse`, `iTime`).
- Normalise: `st = gl_FragCoord.xy / u_resolution.xy` → work in **0…1**.
- **Always write floats with a decimal** (`1.0` not `1`) — GLSL often won’t cast.

---

## Toolbox: shaping (ch. 05) — use constantly

| Function | Role in UI shaders |
|----------|-------------------|
| `step(edge, x)` | Hard mask / threshold |
| `smoothstep(a, b, x)` | Soft edge, feathered reveal, anti-aliased contour |
| `mix(a, b, t)` | Blend two colours/textures by `t` in 0…1 |
| `pow`, `exp`, `log`, `sqrt` | Curve a 0…1 signal (easing-like) |
| `sin` / `cos` | Oscillation; remap with `* 0.5 + 0.5` for 0…1 |
| `fract`, `floor`, `ceil`, `mod` | Tiling, digital waves, brick offsets |
| `abs` | Bounce / mirror |
| `clamp` | Keep values in range |

**Practice tip from the book:** master 1D shaping on the “fence” (plot `y = f(x)` for `x` in 0…1) before composing 2D effects. Same functions drive our GSAP-fed uniforms once values are in 0…1.

**Where we use this**

- Cursor spotlight / paint: `smoothstep` + `distance` ([CURSOR.md](./CURSOR.md))
- Image reveals: `mix` + animated progress ([IMAGES.md](./IMAGES.md))
- Soft drum shading: curve bend amount with `smoothstep` / `pow`

---

## Colour (ch. 06)

- Swizzle freely: `.rgb`, `.xy`, `.st` are the same slots with different names.
- `mix(colorA, colorB, t)` — `t` can be `float` or per-channel `vec3`.
- HSB/HSV helpers (`rgb2hsb` / `hsb2rgb`) for hue wheels and more intuitive gradients.
- Polar colour: `atan(y,x)` + `length` → hue/radius.
- Function args: `in` / `out` / `inout` qualifiers.

**Our bridge:** also push CSS-resolved colours into uniforms ([Mattia](https://nmattia.com/posts/2025-01-29-shader-css-properties/)) so BoS gradients stay on-brand.

---

## Shapes & distance fields (ch. 07)

**Rectangles:** combine `step` on `st` and `1.0 - st` (logical AND via multiply).

**Circles / soft blobs:** distance field → `length(st - center)` then `step` / `smoothstep` on that distance.

**SDF mindset:** re-map space so “distance to shape” is a float field; then threshold it. Combiners: `min` (union-ish), `max` (intersection-ish).

**Polar shapes:** modulate radius with `atan` + shaping functions (flowers, gears).

**Performance note:** `sqrt` / `length` / `distance` are related; `dot` tricks can approximate circular fields cheaper when needed.

**Where we use this**

- Masks for reveals and cursors
- Soft circular grayscale wipe (Codrops GSAP) is pure BoS ch. 05–07
- Not a replacement for DOM text layout

---

## Space transforms (ch. 08)

Move the **coordinate system**, not the shape:

1. Translate: `st -= offset`
2. To rotate/scale around a pivot: translate to origin → `mat2` rotate/scale → translate back

```glsl
mat2 rotate2d(float a) {
  return mat2(cos(a), -sin(a), sin(a), cos(a));
}
```

Order of matrix multiplies matters. Same ideas as three.js matrices, but in **UV space** inside a fragment shader.

---

## Patterns / tiling (ch. 09)

- Scale space (`st *= n`) then `fract(st)` → repeat unit cell.
- Odd/even rows: `mod(floor(st.y), 2.0)` or `step(1.0, mod(...))` for brick offsets.
- Truchet: rotate a motif per cell by even/odd or random cell id.
- Fragment cost stays ~constant when you tile — great for backgrounds.

**Where we use this:** generative card backs, loading states, subtle scroll textures — usually on a plane, not on body copy.

---

## Random → Noise → Cellular → fBM (ch. 10–13)

### Pseudo-random (ch. 10)

```glsl
float rand(float x) { return fract(sin(x) * 100000.0); }
// 2D: hash via dot(st, vec2(...)) then same fract(sin(...))
```

Deterministic: same input → same output. Grid it with `floor` for cell constants (10 PRINT mazes, etc.). Too harsh for “natural” motion alone.

### Value noise (ch. 11)

1. Split `x` into `i = floor(x)`, `f = fract(x)`
2. `mix(rand(i), rand(i+1), smoothstep(0.,1.,f))` (or cubic `f*f*(3.-2.*f)`)
3. 2D: interpolate **four** corners of the cell

### Gradient / Simplex noise

- Gradient noise: interpolate random **directions** (less blocky than value noise).
- Simplex: fewer corners, scales better — use a trusted implementation (Gustavson / McEwan) rather than reinventing.

### Cellular / Worley / Voronoi (ch. 12)

- Distance to nearest feature point.
- GPU trick: one random point per tile; check **3×3** neighbour tiles only.
- Loop bounds must be **constant** in GLSL.
- Use for: organic cells, cracked earth, mosaic IDs (store closest point for colour).

### fBM (ch. 13)

Sum octaves of noise:

```glsl
for (int i = 0; i < OCTAVES; i++) {
  value += amplitude * noise(st);
  st *= lacunarity;   // e.g. 2.0
  amplitude *= gain;  // e.g. 0.5
}
```

Variants: **turbulence** (`abs(noise)`), **ridge**, **domain warping** (noise displaces the coords you sample noise with — “dream inside a dream”).

**Where we use this**

| Effect | Noise role |
|--------|------------|
| Cursor paint edge | Multiply spotlight mask by noise |
| Hover grain | Offset UV or colour by noise × `uMouseEnter` |
| Scroll atmosphere | Slow fBM on background plane |
| FBO / particles | Noise in simulation or appearance |
| Builder.io reveal | FBM turbulence on mask (already in our research) |

---

## How this maps to our four shelves

| Shelf | Book of Shaders contribution |
|-------|------------------------------|
| [TEXT](./TEXT.md) | Shaping/noise for *short* rasterised hero type; not for articles |
| [IMAGES](./IMAGES.md) | Reveals, grain, procedural overlays, pattern fills on planes |
| [SCROLL](./SCROLL.md) | Animate `u_time`/progress into noise strength; pattern backgrounds |
| [CURSOR](./CURSOR.md) | Distance fields + smoothstep + optional noise on masks |

Architecture unchanged: **learn the math here; attach it to media planes + GSAP uniforms** as in [ARCHITECTURE.md](../ARCHITECTURE.md).

---

## External toolbox the book points to

- [LYGIA](https://lygia.xyz/) — granular GLSL includes (math, color, draw, generative, SDF)
- Iñigo Quilez articles / GraphToy — advanced noise, voro-noise, shaping
- Golan Levin shaping functions — richer easings ported to GLSL
- PixelSpirit deck — SDF practice cards

---

## Honest limits for our work

- BoS is **2D fragment**-centric. Our drum bend is mostly **vertex** + texture windowing — combine both: BoS for the fragment look, R3F for mesh/DOM.
- `for` loops need constant bounds — design noise/cellular with fixed octaves / 3×3 neighbours.
- Incomplete site chapters (image kernels, ping-pong sims, ray march) → use Heckel/Loopspeed/Medium when you need those specifically.
