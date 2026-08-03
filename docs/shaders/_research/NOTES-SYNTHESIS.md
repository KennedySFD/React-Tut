# Research synthesis (contradictions & gaps)

## Contradictions / era differences

1. **WebGL1 vs WebGL2 GLSL** — Tutorials (webglfundamentals WebGL1 track, p5, many blogs) use `attribute` / `varying` / `texture2D` / `gl_FragColor`. lea.codes and the GLSL primer document ES 3.00: `#version 300 es`, `in`/`out`, `texture()`, custom `out vec4`. three.js often lets you write classic-style GLSL and rewrites it — check the installed three version before mixing syntaxes.

2. **“WebGL = 3D”** — lea.codes and Builder.io stress WebGL is a **rasteriser**; 3D is optional. Medium focuses on ray-marched 3D heroes. Both valid; different products.

3. **Whole-page warp vs media planes** — Our experiment used architecture B. real-world-shader (the strongest “real client work” source in the set) uses architecture A. Not a contradiction in math — a product choice. Soft text is expected under B.

4. **ShaderToy vs WebGL** — timclicks: `iTime`/`iResolution`/`mainImage` vs `u_time`/`u_resolution`/`main`. Same ideas, different entrypoints.

5. **NPOT textures** — webglfundamentals (WebGL1) is strict; WebGL2 relaxes rules. Don’t apply WebGL1 NPOT fear blindly under R3F/WebGL2.

6. **Hayyanstudio vs Builder.io** — Both show compile/link; Builder’s article is newer (2025) and closer to a real interaction (cursor reveal). Hayyanstudio is triangle-only.

## Gaps (not covered deeply by this link set)

- Full three.js Journey / Book of Shaders deep dives (recommended everywhere, not re-fetched).
- Post-processing stacks (EffectComposer, bloom) — only named in glossary.
- WebGPU / WGSL — primer background only; not actionable here yet.
- Codrops “shader on scroll” article body — related repo 404’d from this environment; real-world-shader scroll GLSL still covers the velocity-warp pattern.
- Accessibility beyond brief reduced-motion mention.
- Exact three.js r17x `colorSpace` / `outputColorSpace` API for CanvasTexture — verify against `package.json` when implementing HQ textures.

## Highest-signal takeaway for this project

Prefer **Curtains-style / R3F media planes + Lenis velocity + GSAP hover uniforms** for future scroll/hover work. Keep the drum full-page texture as an explicit experiment under `/shader-test`, not as the default pattern.
