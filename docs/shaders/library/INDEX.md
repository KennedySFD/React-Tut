# Effect library (by target)

Ask for an effect by **what it sits on**, then open that file:

| Target | File | Typical asks |
|--------|------|----------------|
| **Text** | [TEXT.md](./TEXT.md) | Glitch type, warped headlines, shader on copy |
| **Images / cards** | [IMAGES.md](./IMAGES.md) | Hover bulge, RGB shift, ripples, reveals, blur |
| **Scroll** | [SCROLL.md](./SCROLL.md) | Velocity warp, carousels, section-driven particles |
| **Cursor** | [CURSOR.md](./CURSOR.md) | Spotlight, paint-reveal, mouse lag / velocity |
| **Math / generative (Book of Shaders)** | [BOOK-OF-SHADERS.md](./BOOK-OF-SHADERS.md) | `smoothstep`, SDFs, noise, fBM, patterns — shared by all shelves |

**CodePen case studies** (read-for-technique): [codepens/INDEX.md](./codepens/INDEX.md)

Shared plumbing (canvas over DOM, uniforms, GSAP): see [ARCHITECTURE.md](../ARCHITECTURE.md) and [PATTERNS-BY-USECASE.md](../PATTERNS-BY-USECASE.md).

## Sources added in this batch (Aug 2026)

| Source | Best shelf |
|--------|------------|
| [VFX-JS Codrops](https://tympanus.net/codrops/2025/01/20/vfx-js-webgl-effects-made-easy/) | Text, Images, Cursor |
| [GSAP + shaders Codrops](https://tympanus.net/codrops/2025/10/08/how-to-animate-webgl-shaders-with-gsap-ripples-reveals-and-dynamic-blur-effects/) | Images, Scroll, Cursor |
| [CSS → shader colours](https://nmattia.com/posts/2025-01-29-shader-css-properties/) | Theming (all) |
| [Render targets / FBO (Heckel)](https://blog.maximeheckel.com/posts/beautiful-and-mind-bending-effects-with-webgl-render-targets/) | Advanced / portals / post |
| [FBO particles + scroll (Loopspeed)](https://blog.loopspeed.co.uk/fbo-particles-simulation) | Scroll (particles) |
| [MDN Lighting in WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Lighting_in_WebGL) | 3D meshes / shading basics |
| [The Book of Shaders](https://thebookofshaders.com/) | [BOOK-OF-SHADERS.md](./BOOK-OF-SHADERS.md) — fragment math for every shelf |
