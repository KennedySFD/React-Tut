# Shader debugging checklist

Use this when the effect is blank, flat, soft, or “not working”. Ordered from cheapest to deepest.

Lessons from our cylinder-scroll work are marked **(ours)**.

---

## 0. Verify the program actually runs

1. **Compile / link logs** (raw WebGL): after `compileShader` / `linkProgram`, check status and `getShaderInfoLog` / `getProgramInfoLog`. Log them — silent failure → black screen. *(Builder.io, hayyanstudio)*
2. **three.js / R3F:** open the browser console; material compile errors usually appear there. Temporarily replace the fragment body with `gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);` — if you don’t see magenta, you’re not drawing that material.
3. **False-colour debug** — output a known varying as colour:
   - `gl_FragColor = vec4(vUv, 0.0, 1.0);` — proves UV + fragment stage
   - `gl_FragColor = vec4(vec3(uMyUniform), 1.0);` — proves uniform wiring (scale into 0…1 first)
4. **No `console.log` in GLSL** — ownkng is right: you debug by drawing data as colour or reading uniforms from JS (`material.uniforms.uX.value`).

---

## 1. Blank / black / thin line

| Check | Why |
|-------|-----|
| Camera + mesh in view | Plane at wrong z, camera looking away, near/far clipping |
| Geometry size vs camera FOV | Pixel-matched FOV expects plane sized in CSS pixels |
| Texture uploaded? | Unready texture → black; check `needsUpdate`, image `onload` |
| WebGL1 NPOT + mipmaps | Invalid combo → sampling returns black *(webglfundamentals)* |
| `discard` too aggressive | UV window math wrong → entire plane discarded **(ours)** |
| Clear colour same as content | Effect runs but invisible **(ours)** |
| Context type conflict | “Canvas has an existing context of a different type” — never put html2canvas 2D and WebGL on the same canvas **(ours)** |
| `transparent` / alpha | Alpha 0 everywhere → see through to clear colour |

---

## 2. “Uniform not doing anything”

1. Confirm the **compiled** shader source contains the uniform name (devtools / log `material.vertexShader`).
2. Confirm JS writes the same name: `material.uniforms.uCurvature.value = …` every frame if it changes.
3. Guard HMR: `if (uniforms?.uShading) uniforms.uShading.value = shading` **(ours)**.
4. Visualise: temporarily `gl_FragColor = vec4(vec3(uCurvature / maxExpected), 1.0);`.
5. Remember: **perspective Z bends need contrast** (shading or non-matching background) or they look flat **(ours)**.

---

## 3. Soft / blurry / shimmering text or images

| Cause | Fix |
|-------|-----|
| Capture/texture at CSS pixels on a DPR×2 canvas | Capture or render at `devicePixelRatio` (clamp 2–3) |
| Magnifying mesh (bulge toward camera) | Lower curvature; or higher-res texture |
| `LinearFilter` without mipmaps while minifying | `generateMipmaps = true`, `minFilter = LinearMipmapLinearFilter` |
| Oblique surface (curves) | Raise `texture.anisotropy` to renderer max |
| Whole page is a bitmap | Architectural: keep text as DOM; shader only images *(real-world-shader)* |
| Scrolling UV sampling | Inherent shimmer on glyphs-as-pixels — reduce by resolution + mip/aniso, don’t expect native DOM sharpness |

---

## 4. Coverage gaps (black corners while bending)

- Pushing **edges away** from camera shrinks the silhouette → gaps **(ours)**.
- Prefer **edges fixed, centre toward camera**, or add calculated overscan.
- Ensure plane subdivisions are high enough for a smooth curve (real-world-shader uses 100×100 segments).

---

## 5. Mouse / scroll feel wrong

| Issue | Check |
|-------|-------|
| Cursor circle elliptical | Aspect-correct the UV before `distance` |
| Mouse upside down | Y flip between CSS and WebGL |
| Jerky hover | Lerp mouse; GSAP `uMouseEnter` instead of bool |
| Scroll warp dead | Is velocity ~0 with native scroll? Lenis (or similar) exposes usable velocity |
| Planes lag DOM | Update scroll values every scroll event (`curtains.updateScrollValues` or rematch rects) |

---

## 6. Performance red flags

- Huge textures (full-page DPR×2 × long scroll) — watch `MAX_TEXTURE_SIZE` and memory (~width×height×4 bytes).
- Full-screen heavy ray marching on mobile — offer static fallback.
- Too many draw calls (one plane per icon is fine; hundreds need batching/atlasing).
- `preserveDrawingBuffer: true` only if you must read pixels — costs GPU memory bandwidth.
- Respect `prefers-reduced-motion` — disable or simplify shader motion.

---

## 7. Quick “is the bend real?” protocol **(ours)**

1. Set clear colour to near-black.
2. Pass bend amount as a varying; multiply albedo by `1.0 - vCurve * uShading`.
3. If dark bands appear at top/bottom, the vertex stage is live.
4. Then tune curvature / curveStart for the geometric look you want.
