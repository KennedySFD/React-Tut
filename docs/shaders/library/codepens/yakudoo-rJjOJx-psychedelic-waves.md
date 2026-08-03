# CodePen: Psychedelic waves (Yakudoo)

- **URL:** https://codepen.io/Yakudoo/pen/rJjOJx  
- **Author:** Karim Maaloul (@Yakudoo)  
- **Stack:** three.js `RawShaderMaterial`, dat.GUI, `requestAnimationFrame`  
- **Shelves:** generative background, [CURSOR](../CURSOR.md) (mouse influence), Book of Shaders noise/colour

---

## What you see

A full-viewport abstract field of horizontal “psychedelic” bands that continuously morph. Colours sit in HSL (hue shifted by noise). Moving the mouse creates a soft bright/dark influence around the pointer — like a spotlight on a liquid surface — with the mouse position **lerped** so the reaction trails smoothly.

---

## Architecture (important)

This is **not** media-planes-over-DOM. It is a single full-screen quad:

- `PlaneGeometry(2, 2, 1, 1)` — corners already span roughly −1…1  
- Vertex shader writes `gl_Position = vec4(position, 1.0)` **without** `projectionMatrix` / `modelViewMatrix` → clip-space / NDC fullscreen  
- Camera exists in the JS `World` class but the RawShaderMaterial vertex path ignores it  
- Renderer: `alpha: true`, sized to window, DPR aware  

Use this pattern for **hero backgrounds / overlays**, not for warping page images.

---

## Uniforms (dat.GUI ↔ shader)

| Uniform | Role |
|---------|------|
| `uTime` | Accumulated timer (`parameters.speed`) |
| `uMousePosition` | Lerped pointer in 0…1 UV space (Y flipped from CSS) |
| `uHue` / `uHueVariation` | Base hue + noise-driven spread |
| `uDensity` | How many horizontal band layers (`elevation` scale) |
| `uDisplacement` | Strength of classic 2D noise (`cnoise`) on the field |
| `uGradient` | Present but largely unused / commented |

JS mouse path:

```js
mousePos.px = x / innerWidth;
mousePos.py = 1.0 - y / innerHeight; // flip Y for UV
// each frame: lerp current → target * 0.1
```

Same “delayed mouse” idea as VFX-JS velocity pens; here the delay softens the spotlight, not RGB shift.

---

## Fragment technique (the actual effect)

1. **Mouse soft mask**  
   `mouseDistance = length(vUv - uMousePosition)`  
   `shadow = smoothstep(0.0, 0.3 + sin(...) * 0.1, mouseDistance)`  
   Near the cursor → low `shadow`; far → high. Feeds elevation and brightness.

2. **Fake “elevation” field** (not vertex displacement — all in the fragment)  
   - Start from `vUv.y * uDensity * 30`  
   - Add mouse shadow and **classic Perlin-style `cnoise`** in UV + time  
   - Multiply by more noise for irregular banding  

3. **Band look**  
   - `light` from `fract(elevation)` (stripes inside continuous field)  
   - `elevation = floor(elevation)` → posterised layers for the hue lookup  

4. **Colour**  
   - Build `hsl(hue, sat, brightness)` then `hsl2rgb`  
   - Hue/brightness also modulated by `cnoise` and `shadow`  
   - Matches Book of Shaders colour chapter + noise chapter  

Vertex shader is pass-through UV only — **all art is fragment**.

---

## What to steal for our project

| Idea | Apply when |
|------|------------|
| Fullscreen NDC quad + Raw/ShaderMaterial | Cursor overlay or page background FX |
| Lerped `uMousePosition` in 0…1 | Any cursor shelf effect |
| `smoothstep` distance spotlight | Cursor paint / local lighting |
| `cnoise` + `floor`/`fract` elevation | Generative “liquid bands” without mesh subdivision |
| dat.GUI / Leva on hue, density, displacement | Experiment pages (we already use Leva on shader-test) |

## What not to copy blindly

- Don’t use this as the default for blog scroll/text — wrong architecture.  
- `RawShaderMaterial` means you own matrices; for R3F scene meshes prefer `ShaderMaterial` unless you want this NDC fullscreen trick.  
- Heavy `cnoise` every pixel is fine for one fullscreen pass; watch mobile cost.

---

## Prompt cheatsheet

> “Fullscreen psychedelic band background like Yakudoo rJjOJx — fragment-only elevation from cnoise, lerped mouse smoothstep, HSL, NDC quad.”
