# CodePen: Celestial Transmutation (VoXelo)

- **URL:** https://codepen.io/VoXelo/pen/yygKOVy  
- **Author:** VoXelo (pen title: Celestial Transmutation)  
- **Stack:** three.js (ES modules from CDN), `ShaderMaterial`, simplex noise GLSL, `EffectComposer` + `UnrealBloomPass` + `OutputPass`, `OrbitControls`  
- **Delivery note:** ~83KB lives entirely in the **HTML** panel (`<style>` + markup + `<script type="module">`). CSS/JS CodePen panes are empty — not “no JS”, just one-file packaging.  
- **Shelves:** multi-preset morph, [SCROLL](../SCROLL.md)-adjacent state machine (time-driven AUTO cycle), bloom/post, Book of Shaders noise + procedural “worlds”

Reference frames (AUTO cycling through presets):

| World | Look | File |
|-------|------|------|
| Aethera | Cyan/violet oceanic currents | [assets/voxelo-yygKOVy/aethera.png](./assets/voxelo-yygKOVy/aethera.png) |
| Pyra | Molten furnace cracks, orange bloom | [assets/voxelo-yygKOVy/pyra.png](./assets/voxelo-yygKOVy/pyra.png) |
| Orison | Teal body + luminous rings | [assets/voxelo-yygKOVy/orison.png](./assets/voxelo-yygKOVy/orison.png) |
| Vesper | Faceted violet/cyan crystal lattice | [assets/voxelo-yygKOVy/vesper.png](./assets/voxelo-yygKOVy/vesper.png) |

---

## What you see

A tabbed “planet viewer”: four conceptual worlds (**Aethera / Pyra / Orison / Vesper**). Clicking a tab (or AUTO hold) runs a **scan-line morph** that rebuilds the sphere’s geometry and colour from one procedural recipe into another, with a mid-transition energy spike that pumps bloom, filaments, and portal glow. DOM copy updates (“Phasing into…”) while WebGL does the heavy lift.

---

## Architecture (important)

This is a **full-viewport generative scene**, not media-planes-over-DOM.

| Layer | Object | Role |
|-------|--------|------|
| Sky | `nebula` mesh | Noise-driven deep-space gradient (direction from sphere position) |
| Stars | `stars` Points | Slow-rotating starfield |
| Body | `surfaceMesh` (icosahedron, detail 5–6) | Shared planet uniforms; vertex displaces + fragment colours by preset |
| Volumetrics | `planetParticles` Points | Preset-aware particle cloud around body |
| Transition FX | `transitionFilaments`, `portalPlane` | Scan/energy ribbons + portal disc during morph |
| Shell | `atmosphereMesh` | Soft atmospheric rim |
| Orison extras | `ringMesh`, `orbitalArcs` | Ring architecture (preset-gated look via same uniforms) |

**Shared uniforms** drive *all* planet-aware materials together:

```js
sharedPlanetUniforms = {
  uTime, uFromPreset, uToPreset, uTransition, uTransitionEnergy
}
```

`setSharedUniform(name, value)` mirrors writes into particle / ring materials so the morph stays in sync.

UI (title, kickers, tabs, AUTO toggle) is ordinary HTML over a fixed canvas — good split: **copy stays DOM**, **planet is GPU**.

---

## Preset model (the “tabs”)

JS metadata (accents drive CSS variables + portal palette):

| Index | Name | Kicker | Accent A / B (RGB triples) |
|------:|------|--------|----------------------------|
| 0 | Aethera | Oceanic dreamworld | cyan / violet |
| 1 | Pyra | Living furnace world | orange / hot pink |
| 2 | Orison | Sacred ring architecture | gold / teal |
| 3 | Vesper | Crystalline night engine | violet / cyan |

GLSL does **not** swap textures. One big `planetFunctionsGLSL` (~10KB) defines per-world **position** and **colour** functions, then routers:

```glsl
vec3 planetPosition(float preset, vec3 seed, vec4 randomData, float kind, float time) {
  if (preset < 0.5) return aetheraPosition(...);
  if (preset < 1.5) return pyraPosition(...);
  if (preset < 2.5) return kind > 0.5 ? orisonRingPosition(...) : orisonBodyPosition(...);
  return vesperPosition(...);
}
```

Same idea for `planetColor`. Presets are **float indices** so they interpolate cleanly as uniforms.

### Shape recipes (vertex displacement)

- **Aethera** — base radius ~2.08 + continent `snoise` + latitude currents (`sin` bands), slight Y squash + soft twist.  
- **Pyra** — terrain noise + high-power “molten lift” (`pow(..., 8.0)`) so cracks read as raised lava.  
- **Orison** — body bands + separate **ring** positions (`kind` attribute / path).  
- **Vesper** — facet by `floor(direction * 7) / 7`, lattice of triple `sin(dot)` seams.

All start from unit `seed = normalize(position)` so every vertex is a stable sample direction on the sphere.

---

## The morph (why the animation feels expensive)

Transition is **not** a crossfade of two textures. Surface vertex shader:

1. Evaluate `fromPosition = planetPosition(uFromPreset, …)` and `toPosition = planetPosition(uToPreset, …)`.  
2. Build a **phase coordinate** on the seed (biased axes + noise + time).  
3. Drive a **scan front** with `uTransition`:

```glsl
float scanPosition = mix(-1.24, 1.24, uTransition);
float localMorph = 1.0 - smoothstep(scanPosition - scanWidth, scanPosition + scanWidth, coordinate);
objectPosition = mix(fromPosition, toPosition, localMorph);
// then bulge along normal / tangent near the front (ripple)
```

So the change **sweeps across the planet** instead of fading globally. Fragment colour uses the same from/to + transition energy for the bright “transmutation” rim.

### JS state machine

```js
transitionState = {
  active, from, to, queued,
  startTime, duration, // ~1.28s (0.82 if reduced motion)
  raw, eased, energy, current, settledAt
}
```

- `beginTransition(target)` — queue if already morphing; else set from/to, reset uniforms, update copy to “Phasing into…”, accent CSS, meter.  
- `updateTransition` — `raw = elapsed/duration`, `eased = cinematicEase(raw)`, `energy = sin(π·eased)^1.35`.  
- `settleTransition` — snap `current = to`, clear energy, drain queue.  
- **AUTO:** after `AUTO_HOLD_SECONDS` (~4.2s) while idle, advance to next preset.  
- Keyboard: arrows / space also call `beginTransition`.

Bloom is tied to energy in the render loop:

```js
bloomPass.strength = 0.50 + energy * 0.055;
bloomPass.radius   = 0.30 + energy * 0.025;
bloomPass.threshold = 0.50 + energy * 0.025;
```

Mid-morph = peak glow; settle = calmer look. That matches the screenshots (Pyra/Orison especially “hot”).

---

## Post + motion

- Composer: `RenderPass` → `UnrealBloomPass` → `OutputPass`  
- Stars / nebula slowly rotate on `uTime`  
- `prefers-reduced-motion` shortens hold + morph duration  
- Compact breakpoint lowers icosahedron detail  

---

## What to steal for our project

| Idea | Apply when |
|------|------------|
| **Float preset indices + shared uniforms** | One material family, many “modes” (themes, chapters, product states) without swapping meshes |
| **Scan-front morph** (`smoothstep` band over a phase coordinate) | Hero “transmute” between looks — more cinematic than opacity crossfade |
| **Energy = sin(π · ease)** | Mid-transition peak for bloom, particles, UI meter — one scalar drives many layers |
| **DOM tabs + GPU body** | Keep labels/a11y in HTML; canvas only for the planet |
| **Procedural worlds via noise recipes** | No texture packs; Book of Shaders shaping/noise stacked into identity per preset |
| **Queue transitions** | Rapid tab spam does not tear state |

### What *not* to copy blindly

- Entire pen is a showcase: 9 shader materials, heavy fragment/vertex work — fine for a dedicated route (`/shader-lab`), expensive as a site-wide background.  
- Inter fonts / glass HUD are pen chrome; our product UI should keep brand type.  
- Still not the default “shader on CMS images” pattern — see [ARCHITECTURE.md](../../ARCHITECTURE.md).

---

## Prompt hooks

Use this case study when asking for:

- “tabbed WebGL worlds that morph into each other”  
- “procedural planet / orb with bloom and AUTO cycle”  
- “scan-line or phase-surge transition between shader presets”  
- “shared uniforms across surface + particles + atmosphere”

Related shelves: [BOOK-OF-SHADERS.md](../BOOK-OF-SHADERS.md) (noise, shaping), [CURSOR.md](../CURSOR.md) only if adding pointer influence later — this pen is primarily **preset + time**.
