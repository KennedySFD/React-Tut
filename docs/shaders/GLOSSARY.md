# Shader & WebGL glossary

Plain-English definitions with a concrete example each. Sources: webglfundamentals, p5.js intro, webgl2-glsl-primer, lea.codes, ownkng.

---

## Core pieces

**Shader** — A small program that runs on the GPU. In WebGL you always pair a vertex shader with a fragment shader into a **program**.  
*Example: our cylinder scroll’s `.glsl` files.*

**Vertex shader** — Runs once per vertex. Must write `gl_Position` (clip space). Used to move mesh points (waves, drum bend, perspective).  
*Example: `pos.z += (1.0 - t*t) * uCurvature;`*

**Fragment shader** — Runs once per **fragment** (potential pixel). Chooses colour. In WebGL1 writes `gl_FragColor`; in WebGL2 / GLSL ES 3.00 writes a custom `out vec4`.  
*Example: `gl_FragColor = texture2D(uTexture, uv);`*

**Fragment vs pixel** — A fragment is a candidate colour for a pixel. Depth test, blending, or `discard` may stop it becoming a visible pixel.  
*Source: webgl2-glsl-primer.*

**GPU pipeline (simplified)** — Vertex shader → (clipping / NDC / viewport) → **rasterisation** → fragment shader → framebuffer.  
*Source: webglfundamentals “how it works”, primer.*

**Rasterisation** — Turning triangles into the fragments they cover, interpolating varyings across the triangle.

**Draw call** — One `gl.drawArrays` / `gl.drawElements` (or three.js `renderer.render` issuing them). Fewer draw calls is generally better.

**Program linking** — Compiling vertex + fragment shaders and linking them. Always check `COMPILE_STATUS` / `LINK_STATUS` and read info logs.  
*Builder.io and hayyanstudio both show this pattern.*

---

## Data into shaders

**Attribute** (WebGL1) / **`in`** (WebGL2 vertex) — Per-vertex data from a buffer: position, UV, normal, colour. Different for each vertex.  
*Example: `attribute vec3 position;` — three.js provides this automatically on `ShaderMaterial`.*

**Uniform** — Value that is the **same for every vertex/fragment in one draw call**. Updated from JS each frame. Convention: prefix `u`.  
*Examples: `uTime`, `uScrollProgress`, `uMouse`, `uCurvature`.*

**Varying** (WebGL1) / **`out`→`in`** (WebGL2) — Written in the vertex shader, **interpolated** across the triangle, read in the fragment shader. Convention: prefix `v`.  
*Example: pass bend amount `vCurve` so the fragment can darken edges.*

**Buffer / VBO** — GPU memory holding attribute arrays.  
**VAO** — Remembers how to pull attributes from buffers (WebGL2). three.js manages these for you.

---

## Spaces & matrices

**Local / model space** — Coordinates relative to the mesh origin (e.g. a plane from -0.5…0.5).

**World space** — After the model matrix; objects sit in the scene together.

**View / camera space** — Relative to the camera.

**Clip space** — Output of `gl_Position` before the GPU’s perspective divide. Roughly what you aim for with `projectionMatrix * modelViewMatrix * vec4(pos, 1.0)`.

**NDC (normalised device coordinates)** — After divide by `w`; roughly −1…+1 in x/y for the visible cube.

**Screen space** — Pixel coordinates on the canvas / viewport.

**Model / view / projection matrices** — three.js `ShaderMaterial` injects `modelMatrix`, `viewMatrix`, `modelViewMatrix`, `projectionMatrix`. You usually write:  
`gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);`

**Homogeneous coordinates** — `vec4(x,y,z,w)`. Points use `w=1`; directions use `w=0`. Perspective lives in that extra component.  
*Source: webgl2-glsl-primer.*

---

## Textures

**Texture** — Image (or canvas/video) data on the GPU.

**Texel** — One texture pixel.

**Sampler (`sampler2D`)** — Uniform type used to sample a texture.

**UV / texcoords** — Usually 0…1 across the image. Often shortened to “UVs”.  
*Note: OpenGL wrap enums use S/T; people still say UV.*

**`texture2D` vs `texture`** — WebGL1 / GLSL ES 1.00: `texture2D(sampler, uv)`. WebGL2 / `#version 300 es`: `texture(sampler, uv)`.

**Filtering** — How to pick a colour when UVs don’t hit texel centres.  
- **NEAREST** — blocky, one texel.  
- **LINEAR** — blend 4 texels.  
- **Mipmaps** — precomputed smaller versions; required for clean minification. Best quality min filter often `LINEAR_MIPMAP_LINEAR`.  
*Source: webglfundamentals textures lesson. Explains our soft/shimmering text when we magnified a CSS-resolution capture with no mipmaps.*

**Anisotropic filtering** — Extra filtering when the surface is oblique to the camera (exactly our curved drum edges). Set via `texture.anisotropy` in three.js.

**Wrap modes** — `REPEAT`, `CLAMP_TO_EDGE`, `MIRRORED_REPEAT`.

**NPOT (non-power-of-two)** — In **WebGL1**, NPOT textures cannot use full mip/repeat rules; must clamp + use LINEAR/NEAREST. **WebGL2** relaxes this. R3F defaults to WebGL2 in modern browsers.

---

## GLSL language bits

**GLSL** — Graphics Library Shading Language. C-like, **very type-strict** (`1` is int, `1.0` is float).

**`vec2` / `vec3` / `vec4` / `mat4`** — Vector and matrix types. Colours are often `vec3`/`vec4` in 0…1.

**Swizzling** — Reorder components: `v.bgra`, `uv.yx`, `pos.xyy`.

**Precision** — `lowp` / `mediump` / `highp`. Fragment shaders need a default (`precision mediump float;`) in WebGL1. Prefer `highp` when banding shows on mobile.

**Interpolation** — GPU blends varying values across a triangle between the three vertices.

**`discard`** — Fragment shader aborts; that fragment writes nothing (used for out-of-bounds UV windows).

**Useful built-ins**

| Function | Role |
|----------|------|
| `mix(a,b,t)` | Linear blend; `t` often a mask 0…1 |
| `step(edge,x)` | 0 if x &lt; edge else 1 |
| `smoothstep(e0,e1,x)` | Smooth Hermite ramp — soft masks/edges |
| `clamp(x,a,b)` | Limit range |
| `fract` / `mod` | Wrapping / tiling |
| `length` / `distance` / `dot` / `normalize` | Vector math |
| `sin` / `cos` | Waves, animation |

**Control flow** — Branching and dynamic loop bounds are costly or restricted (WebGL1 loops often need constant bounds). Prefer math/`mix` over big `if` trees when you can.

---

## Design-shader vocabulary

**Displacement** — Moving vertices (vertex shader) or sampling offset UVs (fragment “fake” displacement).

**Distortion** — UV warping (bulge, wave, twist).

**Chromatic aberration / RGB shift** — Sample R/G/B at slightly different UVs.

**SDF (signed distance function)** — Math function returning distance to a shape; basis of many ShaderToy / ray-marched scenes.  
*Medium “Shaders for Web Design” focuses here.*

**Ray marching** — Step along a ray until an SDF hit; used for procedural 3D in a fragment shader (heroes, glass crystals), not typical card hover.

**Noise** — Coherent pseudo-random fields for organic motion and rough masks. **Value noise** interpolates random lattice values; **gradient / Perlin** interpolates random directions (less blocky); **simplex** is an optimised grid. See [BOOK-OF-SHADERS.md](./library/BOOK-OF-SHADERS.md).

**fBM (fractal Brownian motion)** — Sum of noise octaves at increasing frequency / decreasing amplitude. Basis of clouds, terrain-like fields, rich grain.

**Distance field / SDF** — For each pixel, a float = distance to a shape; threshold with `step`/`smoothstep` to draw. Combinable with `min`/`max`.

**Domain warping** — Using noise (or fBM) to offset the coordinates you sample with — swirled, cloudy distortion.

**Render target / FBO** — Off-screen texture you render into (ping-pong blurs, feedback, trail paint).

**Post-processing** — Full-screen effects after the scene (bloom, etc.).

**Blend modes** — How a fragment combines with what’s already in the framebuffer (`transparent: true` in three.js enables alpha blending).

---

## three.js / R3F shorthand

| You write | Library provides |
|-----------|------------------|
| Custom GLSL in `ShaderMaterial` / `shaderMaterial` | `position`, `uv`, `normal`, matrices |
| `uniforms: { uTime: { value: 0 } }` | Wiring to GPU each frame if you update `.value` |
| `<mesh><planeGeometry/><shaderMaterial/></mesh>` | Buffers, program compile, draw calls |
| `RawShaderMaterial` | Almost nothing — you supply all boilerplate yourself |

ownkng (2021): prefer `ShaderMaterial` over `RawShaderMaterial` unless you need full control.
