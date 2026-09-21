# Motion & Materials

## Overview

The library has one motion system. Every component — a Tag, a Modal, a focus ring — moves on the same small set of curves and durations, and differs only in how far it travels.

Uniformity here is **structural, not conventional**. It is not a rule people have to remember; it is enforced by where the numbers live:

```
src/theme/motion.js      Curves, durations, gestures, amplitudes  (the contract)
src/lib/gsap.js          Registers those curves with GSAP
src/theme/glass.js       The visual layers the motion drives
src/hooks/use*Motion.js  The four behaviours components consume
```

Nothing in a component file declares a duration or an ease.

## One curve, two engines

A curve is declared **once**, as four cubic-bezier control points:

```javascript
const points = {
  glass: [0.22, 1, 0.36, 1],
  glassIn: [0.55, 0, 1, 0.45],
  glassInOut: [0.65, 0, 0.35, 1],
};
```

Those points are then rendered two ways:

```javascript
const toCss  = ([x1, y1, x2, y2]) => `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
const toPath = ([x1, y1, x2, y2]) => `M0,0 C${x1},${y1} ${x2},${y2} 1,1`;
```

- `toCss` feeds CSS `transition` declarations, via `theme.semantic.motion.*`.
- `toPath` feeds GSAP's `CustomEase`, registered under the same name in `lib/gsap.js`.

A CSS transition written with `motion.base` and a GSAP tween written with `ease: 'glass'` are therefore running the **mathematically identical** easing function — not two curves that happen to look similar. The `/showcase` page plots them from the same numbers.

This matters because the two engines share the work: GSAP owns transforms and the effect layers, CSS owns colour. If their curves drifted apart, a button whose background fades on CSS while its surface lifts on GSAP would visibly tear.

### The three curves

| Curve | Shape | Used for |
|-------|-------|----------|
| `glass` | Fast departure, soft settle | The default. Hovers, releases, reveals |
| `glassIn` | Slow start, committed finish | Presses going down, dismissals |
| `glassInOut` | Symmetrical S | Things that travel: sheens, tab indicators, keylines |

## Gestures

A gesture is a named duration + ease pair. Components reference a gesture, never a raw number.

| Gesture | Duration | Ease | Used for |
|---------|----------|------|----------|
| `hover` | 0.28s | glass | Lift, keyline fade-in |
| `press` | 0.12s | glassIn | Scale down |
| `release` | 0.42s | glass | Return to rest |
| `reveal` | 0.34s | glass | Menus, modals, tooltips appearing |
| `dismiss` | 0.12s | glassIn | Leaving |
| `sheen` | 0.72s | glassInOut | The light sweep |
| `travel` | 0.46s | glassInOut | Tab indicator, focus keyline |

Note `press` is roughly a third of `release`. Down fast, back slow — that asymmetry is what makes a press feel physical rather than mechanical.

## Amplitude

The one thing that varies between components. Same curve, same duration, different distance.

| Preset | Lift | Press | Sheen | Applied to |
|--------|------|-------|-------|------------|
| `control` | -1.5px | 0.975 | yes | Button, Select trigger |
| `surface` | -4px | 0.995 | subtle | Card |
| `chip` | -1px | 0.94 | no | Tag |
| `subtle` | 0 | 0.985 | no | Tabs, Accordion trigger |
| `choice` | 0 | 0.9 | no | Checkbox, Radio |

Larger surfaces lift further and compress less; small ones barely move but squash noticeably. That relationship is what makes them read as one material at different sizes.

## The glass layers

Two effect layers attach to a component as **pseudo-elements**, driven entirely by CSS custom properties:

| Variable | Drives |
|----------|--------|
| `--ring-angle` | Rotation of the chromatic keyline |
| `--ring-opacity` | Keyline visibility |
| `--sheen-x` | `background-position` of the light streak (100 → 0 sweeps left to right) |
| `--sheen-opacity` | Streak visibility |

GSAP animates those four variables. Because the layers are pseudo-elements, **no component renders extra markup to receive the effect** — it arrives through a mixin alone.

```javascript
import { interactiveGlass } from '@/theme/mixins';

export const StyledButton = styled.button`
  ${interactiveGlass};
  /* ...rest of the component */
`;
```

### Why `z-index: -1`

Both layers sit at `z-index: -1` inside an `isolation: isolate` stacking context. Within a stacking context the paint order is: the element's own background and border, then negative-z children, then inline content. So the layers land **above the background and below the text** — which keeps labels legible under a sheen without wrapping every component's children in a positioned span.

### The dispersion keyline

A 1px ring carrying the split colours of light through a glass edge. It cannot be a `border`, because borders cannot hold a gradient, so it is a masked gradient instead:

```css
padding: 1px;
background: conic-gradient(from calc(var(--ring-angle) * 1deg), ...);
mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
mask-composite: exclude;   /* punch out the middle, leaving the padding band */
```

Colours come from `semantic.colors.dispersion`, so they mode-switch like everything else — brighter and less opaque on dark, where the fringe has to survive a low-luminance backdrop.

### The sheen must not move the layer

The light streak slides by animating `background-position` on a layer that
stays pinned at `inset: 0` — **not** by translating the layer.

```css
background-size: 300% 100%;
background-position: calc(var(--sheen-x) * 1%) 0;
```

Translating it was the obvious first approach and it is wrong: the layer is
the same size as the component, so moving it carries its box outside the
component's bounds, where nothing clips it. The result is a band visibly
sweeping in from the left of the component and out to the right of it.

Keeping the layer still means `border-radius: inherit` clips the highlight to
the component's exact shape. `overflow: hidden` on the parent would also fix
the bleed, but it would clip focus rings and any menu the component opens —
so it is not an option here.

The gradient is 3x the box width, which puts the bright band fully off the
left edge at `--sheen-x: 100` and fully off the right at `0`. Anything
narrower leaves a sliver showing at the start of the sweep.

### Frosted panes

`glassPanel` and `glassPanelStrong` are for surfaces that let the page through: dropdown menus, modal dialogs, tooltips, and the `glass` Card variant.

```css
backdrop-filter: blur(14px) saturate(180%);
box-shadow: inset 0 1px 0 <highlight>,   /* light catching the top edge */
            inset 0 -1px 0 <shade>;      /* soft shadow on the lower edge */
```

`saturate` is doing real work there — it is the difference between frosted glass and frosted plastic. Without it a blurred backdrop desaturates into grey.

Glass is invisible without something behind it to refract. A frosted pane over a flat surface just looks like a lighter box, which is why the `/showcase` demo puts them over a deliberately busy gradient.

## The hooks

| Hook | Used by | What it does |
|------|---------|--------------|
| `useInteractiveMotion` | Button, Card, Tag, Tabs, Accordion, Checkbox, Radio | Hover lift + keyline + sheen, press/release, keyboard focus ring |
| `useRevealMotion` | Select menu, Modal, Tooltip | The shared entrance: rise, scale, fade |
| `useFieldMotion` | Input, Textarea, Select, SearchBar | Focus keyline drawing out from the centre |
| `useStateMotion` | Checkbox tick, Radio dot | Two-state pop on a boolean |

```javascript
const { ref, handlers } = useInteractiveMotion({ preset: 'control', disabled });

return <StyledButton ref={ref} {...handlers}>…</StyledButton>;
```

Any descendant marked `data-motion-label` receives the shared text lift, which is how a button's label rides with its surface.

## Rules

1. **Never write a duration or ease in a component.** Reference a gesture from `theme/motion.js`. If the gesture you need does not exist, add it there first.
2. **GSAP owns `transform`; CSS must not.** If GSAP animates an element's transform, that property must not appear in the element's CSS `transition` list, or the two will interpolate against each other. The same applies to any property GSAP drives.
3. **Placement transforms and animation transforms cannot share an element.** Tooltip splits these across `TooltipAnchor` (placement, including `translate(-50%)`) and `Bubble` (animated) for exactly this reason.
4. **An effect layer sized to its component must not be translated.** It will leave the component's bounds and be drawn outside it. Move what is *inside* the layer instead — see the sheen above.
5. **Every hook respects `prefers-reduced-motion`**, falling back to setting the end state directly. The interface still reflects what happened; it just stops moving to get there. Preserve this in anything new.
6. **Bound the variable tweens.** Animating a custom property used inside a gradient forces a repaint each frame. That is fine for a one-shot hover on a single element, and not fine as an infinite loop across a list.
7. **Backticks are illegal inside a styled-components template literal**, including in CSS comments — they terminate the string.

## Adding motion to a new component

1. Add `${interactiveGlass}` to its styled root.
2. Call `useInteractiveMotion` with the amplitude preset that fits its family.
3. Spread `handlers` and attach `ref`.
4. Mark its text `data-motion-label` if it should ride along.
5. Check nothing in its CSS `transition` list collides with what GSAP drives.
