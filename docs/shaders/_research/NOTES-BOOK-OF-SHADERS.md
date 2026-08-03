# Research notes — The Book of Shaders

**URL:** https://thebookofshaders.com/  
**Authors:** Patricio Gonzalez Vivo, Jen Lowe  
**Read:** 1 Aug 2026  
**Scope covered:** Chapters 01–13 (complete published path through fBM). Site TOC lists further Image processing / Simulation / 3D chapters that were not available as full lessons in this pass.

## Status by section

| Section | Chapters | Status |
|---------|----------|--------|
| Getting started | 01–04 | Read 01–03 in full; 04 is “running your shader” (tooling) — lightly noted |
| Algorithmic drawing | 05–09 | Read in full |
| Generative designs | 10–13 | Read in full (13 = fBM; fractals listed separately on TOC may be thin) |
| Image processing | — | Titles only on TOC |
| Simulation | — | Titles only |
| 3D graphics | — | Titles only |
| Glossary | /glossary/ | Index page only (links out per symbol) |

## Distilled deliverable

Project-facing summary: `docs/shaders/library/BOOK-OF-SHADERS.md`

## Key quotes / ideas retained

- Parallel fragment model; blind + memoryless threads (ch. 01).
- `u_resolution` / `u_mouse` / `u_time` convention vs ShaderToy names (ch. 03).
- Shaping mastery as “fence” before 2D (ch. 05).
- Distance fields for shapes; `step`/`smoothstep`/`mix` as primary drawing tools (ch. 07).
- Transform space with matrices, not the shape (ch. 08).
- `fract` tiling; brick offsets; Truchet (ch. 09).
- Pseudo-random via `fract(sin(x)*large)`; deterministic (ch. 10).
- Value noise = cubic/smoothstep interpolate of random lattice (ch. 11).
- Cellular: 3×3 neighbour tiles, constant loop bounds (ch. 12).
- fBM octaves + domain warping (ch. 13).
