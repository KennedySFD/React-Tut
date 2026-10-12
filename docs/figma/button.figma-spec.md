# Button — Figma build spec

Target file: `MishimaSilo` — https://www.figma.com/design/zeO6PgOQXhBRG4FbtxRdy9/MishimaSilo?node-id=211-457

The contract for building the Button in Figma so that it round-trips with
`src/components/ui/button/` and `src/theme/`. Every value below is derived
from the code, not invented.

---

## 1. The naming contract

This is the part that makes sync possible. **Collection name supplies the first
segment of the code path; the variable name is the rest of the path with `.`
swapped for `/`.** Nothing else, no special cases.

| Code path | Collection | Variable name |
|---|---|---|
| `global.colors.neutral200` | `1. Primitives` | `colors/neutral200` |
| `global.spacing.lg` | `1. Primitives` | `spacing/lg` |
| `semantic.colors.accent.default` | `2. Semantic` | `colors/accent/default` |
| `components.button.radius` | `3. Component` | `button/radius` |

Deliberately **not** `colors/neutral/200`. That reads better in Figma's sidebar
but stops being reversible — the code key is the single token `neutral200`, so
splitting it would need a special case in the sync script, and special cases are
where two-way sync rots. Determinism wins over prettiness here.

**Unit rule:** code stores rem strings (`'0.5rem'`), Figma stores numbers (`8`).
The sync script multiplies by 16 in one direction and divides in the other.
`radii.full` (`9999px`) and `spacing.none` (`0`) are already absolute — pass through.

---

## 2. Collections

| Collection | Modes | Published | Purpose |
|---|---|---|---|
| `1. Primitives` | `Value` | hidden | Raw ramps. Mirrors `theme/global.js`. |
| `2. Semantic` | `Light`, `Dark` | yes | Roles. Mirrors `theme/semantic.js`. |
| `3. Component` | `Value` | yes | Per-component geometry. Mirrors `theme/components.js`. |

Three collections because the code has three layers. A change to Figma's
`2. Semantic` collection maps to exactly one file (`semantic.js`) and nothing
else — that one-to-one is the whole point.

`1. Primitives` is hidden from publishing so consuming files can only reach
semantic roles, which is the same rule the code enforces ("components must never
reach into `global` for a colour").

---

## 3. Variables — `1. Primitives`

Only the subset the Button actually consumes. The rest lands when the full
library is built.

**`colors/*` (COLOR)**
`neutral0 #FFFFFF` · `neutral50 #FAFAFA` · `neutral100 #F4F4F5` · `neutral200 #E4E4E7`
`neutral300 #D4D4D8` · `neutral400 #A1A1AA` · `neutral600 #52525B` · `neutral700 #3F3F46`
`neutral800 #27272A` · `neutral900 #18181B` · `neutral950 #09090B` · `black #000000`
`brand50 #FAFAFA` · `brand100 #F4F4F5` · `brand300 #D4D4D8` · `brand500 #18181B`
`brand600 #09090B` · `brand700 #000000` · `red500 #EF4444` · `red600 #DC2626`

**`alphas/*` (COLOR, with alpha)**
`hoverLight rgba(9,9,11,.04)` · `hoverDark rgba(255,255,255,.06)`
`activeLight rgba(9,9,11,.08)` · `activeDark rgba(255,255,255,.10)`
`brandRingLight rgba(9,9,11,.25)` · `brandRingDark rgba(255,255,255,.30)`

**`spacing/*` (FLOAT)** `sm 8` · `md 12` · `lg 16` · `xl 24`
**`radii/*` (FLOAT)** `md 8`
**`borderWidths/*` (FLOAT)** `thin 1` · `ring 3`
**`fontSizes/*` (FLOAT)** `sm 14` · `md 16`
**`fontWeights/*` (FLOAT)** `semibold 600`
**`sizes/control/*` (FLOAT)** `sm 32` · `md 40` · `lg 48`
**`sizes/icon/*` (FLOAT)** `sm 14` · `md 16` · `lg 20`
**`opacities/*` (FLOAT)** `disabled 0.45`

---

## 4. Variables — `2. Semantic` (Light / Dark)

Every row is an **alias** to `1. Primitives`, except the four flagged `raw`.

| Variable | Light → | Dark → |
|---|---|---|
| `colors/background/raised` | `neutral0` | `neutral900` |
| `colors/background/subtle` | `neutral50` | `neutral900` |
| `colors/background/sunken` | `neutral100` | `black` |
| `colors/text/primary` | `neutral900` | `neutral50` |
| `colors/text/secondary` | `neutral600` | `neutral300` |
| `colors/border/default` | `neutral300` | `neutral700` |
| `colors/accent/default` | `brand500` | `neutral0` |
| `colors/accent/hover` | `brand600` | `neutral200` |
| `colors/accent/active` | `brand700` | `neutral300` |
| `colors/accent/text` | `brand700` | `neutral200` |
| `colors/accent/onAccent` | `neutral0` | `neutral950` |
| `colors/accent/subtle` | `brand50` | **raw** `rgba(255,255,255,.08)` |
| `colors/accent/muted` | `brand100` | **raw** `rgba(255,255,255,.14)` |
| `colors/state/hoverSurface` | `alphas/hoverLight` | `alphas/hoverDark` |
| `colors/state/activeSurface` | `alphas/activeLight` | `alphas/activeDark` |
| `colors/state/hoverBorder` | `neutral400` | `neutral600` |
| `colors/state/focusBorder` | `brand500` | `neutral300` |
| `colors/state/focusRing` | `alphas/brandRingLight` | `alphas/brandRingDark` |
| `colors/feedback/danger/solid` | `red600` | `red500` |
| `colors/feedback/danger/onSolid` | `neutral0` | `neutral0` |
| `colors/dispersion/cyan` | **raw** `rgba(34,211,238,.88)` | `rgba(34,211,238,.90)` |
| `colors/dispersion/violet` | **raw** `rgba(139,92,246,.85)` | `rgba(167,139,250,.88)` |
| `colors/dispersion/rose` | **raw** `rgba(236,72,153,.80)` | `rgba(244,114,182,.82)` |
| `colors/dispersion/amber` | **raw** `rgba(245,158,11,.78)` | `rgba(250,204,21,.78)` |

---

## 5. Variables — `3. Component`

All aliases. Single mode.

| Variable | → |
|---|---|
| `button/radius` | `radii/md` (8) |
| `button/borderWidth` | `borderWidths/thin` (1) |
| `button/gap` | `spacing/sm` (8) |
| `button/fontWeight` | `fontWeights/semibold` (600) |
| `button/sizes/sm/height` · `paddingX` · `fontSize` · `iconSize` | `control/sm` 32 · `spacing/md` 12 · `fontSizes/sm` 14 · `icon/sm` 14 |
| `button/sizes/md/height` · `paddingX` · `fontSize` · `iconSize` | `control/md` 40 · `spacing/lg` 16 · `fontSizes/sm` 14 · `icon/md` 16 |
| `button/sizes/lg/height` · `paddingX` · `fontSize` · `iconSize` | `control/lg` 48 · `spacing/xl` 24 · `fontSizes/md` 16 · `icon/lg` 20 |

---

## 6. The component set

### Properties

**Variant properties** (these change styling, so they must be variants):

| Property | Values | Count |
|---|---|---|
| `Variant` | Primary, Secondary, Tertiary, Ghost, Danger | 5 |
| `Size` | sm, md, lg | 3 |
| `State` | Default, Hover, Active, Focus, Disabled | 5 |
| `Icon Only` | True, False | 2 |

**= 150 variants.** `Icon Only` has to be a variant rather than a boolean
because it changes padding to 0 and width to a fixed square, and Figma cannot
drive layout values from a boolean property.

**Non-variant properties** (these don't change styling, so they stay properties —
keeps the matrix at 150 instead of multiplying it):

| Property | Type | Default |
|---|---|---|
| `Label` | TEXT | `Button` |
| `Icon Left` | BOOLEAN | `false` |
| `Icon Right` | BOOLEAN | `false` |
| `Icon Left ⇄` | INSTANCE_SWAP | placeholder 16px icon |
| `Icon Right ⇄` | INSTANCE_SWAP | placeholder 16px icon |

### Layer structure

```
Button                      ← auto-layout H, center/center, fixed height
└─ Label                    ← auto-layout H, gap = button/gap, center
   ├─ Icon Left  (instance) ← visibility = "Icon Left"
   ├─ Text                  ← content = "Label"
   └─ Icon Right (instance) ← visibility = "Icon Right"
```

The nested `Label` frame is not decorative — it mirrors `<Label data-motion-label>`
in `Button.jsx`, which is the node the motion system lifts independently of the
surface. Keeping it means the Figma layer tree and the DOM tree have the same shape.

### Auto-layout binding

| Figma property | Bound to |
|---|---|
| height (fixed) | `button/sizes/{size}/height` |
| padding L/R | `button/sizes/{size}/paddingX` — **0** when `Icon Only=True` |
| width | HUG — **fixed = height** when `Icon Only=True` |
| item spacing | `button/gap` |
| corner radius | `button/radius` |
| stroke weight | `button/borderWidth` |
| text size / weight | `button/sizes/{size}/fontSize` / `button/fontWeight` |
| icon frame | `button/sizes/{size}/iconSize` |

Stroke is present on every variant, transparent where the code says
`border-color: transparent`. Same trick the code uses — it keeps the box model
identical across variants so nothing shifts by a pixel between states.

---

## 7. Colour matrix

Fill / Text / Stroke, per `Variant` × `State`. All values are `2. Semantic` bindings.

| Variant | State | Fill | Text | Stroke |
|---|---|---|---|---|
| Primary | Default | `accent/default` | `accent/onAccent` | `accent/default` |
| Primary | Hover | `accent/hover` | `accent/onAccent` | `accent/hover` |
| Primary | Active | `accent/active` | `accent/onAccent` | `accent/active` |
| Secondary | Default | `background/raised` | `text/primary` | `border/default` |
| Secondary | Hover | `background/subtle` | `text/primary` | `state/hoverBorder` |
| Secondary | Active | `background/sunken` | `text/primary` | `border/default` |
| Tertiary | Default | `accent/subtle` | `accent/text` | transparent |
| Tertiary | Hover | `accent/muted` | `accent/text` | transparent |
| Tertiary | Active | `accent/muted` | `accent/active` | transparent |
| Ghost | Default | transparent | `text/secondary` | transparent |
| Ghost | Hover | `state/hoverSurface` | `text/primary` | transparent |
| Ghost | Active | `state/activeSurface` | `text/primary` | transparent |
| Danger | Default | `feedback/danger/solid` | `feedback/danger/onSolid` | `feedback/danger/solid` |
| Danger | Hover | `feedback/danger/solidHover` | `feedback/danger/onSolid` | `feedback/danger/solidHover` |
| Danger | Active | `feedback/danger/solidActive` | `feedback/danger/onSolid` | `feedback/danger/solidActive` |

**Focus** (every variant): the variant's own Default colours, plus a drop shadow
`x0 y0 blur0 spread 3`, colour `state/focusRing`. Spread-only, zero-blur shadow is
the exact render of the CSS `box-shadow: 0 0 0 3px` in the `focus-ring-only` mixin.

**Disabled** (every variant): the variant's own Default colours, with layer
opacity `opacities/disabled` (45%). The code does the same — `disabledState`
only sets opacity, it does not recolour.

**Hover, all variants** additionally carry the dispersion keyline: a **1.5px
angular (conic) gradient stroke**, aligned to the outside edge, stops
`dispersion/cyan 0° → violet 90° → rose 180° → amber 270° → cyan 360°`.

Align it to the **outer** edge, not inside. That matches the `--ring-inset` fix
in `theme/_mixins.scss` — the keyline sits *on* the border box rather than nested
inside it, which is what stops the corner radii disagreeing.

---

## 8. Two things the code should change first

Both surfaced by doing this mapping. Neither is a Figma problem — they're places
where the code isn't fully tokenised, so there is nothing for Figma to bind to.

**8.1 — `danger` hover/active now read tokens.**
`Button.module.scss` uses `--semantic-colors-feedback-danger-solidHover` and
`--semantic-colors-feedback-danger-solidActive`. Both modes in `semantic.js`
define `solidHover` and `solidActive`, so the Danger cells can bind to those
variables instead of approximating a brightness filter.

**8.2 — dark-mode `accent.subtle` / `accent.muted` are raw rgba.**
Every other semantic value aliases a primitive; these two are literals
(`rgba(255,255,255,.08)` / `.14`). They'd become unaliased raw values in Figma,
so a rebrand would miss them.

*Fix:* add `alphas.whiteSubtle` / `alphas.whiteMuted` to `global.js` and alias
to those.

Both are small, and doing them before the first push means the Figma file starts
fully aliased instead of starting with two known drift points.
