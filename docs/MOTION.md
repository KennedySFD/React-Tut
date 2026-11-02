# Motion & Materials

## Overview

The library has one motion system. Every component — a Tag, a Modal, a focus ring — moves on the same small set of curves and durations, and differs only in how far it travels.

Uniformity here is **structural, not conventional**. It is not a rule people have to remember; it is enforced by where the numbers live:

```
src/theme/motion.js      Curves, durations, gestures, amplitudes  (the contract)
src/lib/gsap.js          Registers those curves with GSAP
src/theme/_mixins.scss   The shared hover state (`hover-surface`, `hover-border`, `hover-text`)
src/hooks/use*Motion.js  The three behaviours components consume
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

This matters because the two engines share the work: GSAP owns transforms, CSS owns colour. If their curves drifted apart, a button whose background fades on CSS while its surface lifts on GSAP would visibly tear.

### The three curves

| Curve | Shape | Used for |
|-------|-------|----------|
| `glass` | Fast departure, soft settle | The default. Hovers, releases, reveals |
| `glassIn` | Slow start, committed finish | Presses going down, dismissals |
| `glassInOut` | Symmetrical S | Things that travel: tab indicators |

## Gestures

A gesture is a named duration + ease pair. Components reference a gesture, never a raw number.

| Gesture | Duration | Ease | Used for |
|---------|----------|------|----------|
| `hover` | 0.28s | glass | Lift |
| `press` | 0.12s | glassIn | Scale down |
| `release` | 0.42s | glass | Return to rest |
| `reveal` | 0.34s | glass | Menus, modals, tooltips appearing |
| `dismiss` | 0.12s | glassIn | Leaving |
| `travel` | 0.46s | glassInOut | Tab indicator |

Note `press` is roughly a third of `release`. Down fast, back slow — that asymmetry is what makes a press feel physical rather than mechanical.

## Amplitude

The one thing that varies between components. Same curve, same duration, different distance.

| Preset | Lift | Press | Applied to |
|--------|------|-------|------------|
| `control` | -1.5px | 0.975 | Button |
| `surface` | -4px | 0.995 | Card |
| `chip` | -1px | 0.94 | Tag |
| `subtle` | 0 | 0.985 | Accordion trigger |
| `choice` | 0 | 0.9 | Checkbox, Radio |

Larger surfaces lift further and compress less; small ones barely move but squash noticeably. That relationship is what makes them read as one material at different sizes.

## The hover state

Hover colour is CSS, not motion, and every interactive element uses one of three mixins from `theme/_mixins.scss`, all reading the `state` tokens:

| Mixin | Changes | For |
|-------|---------|-----|
| `hover-surface` | `state.hoverSurface` tint, `text.primary` | Ghost buttons, menu items, tabs, rows, icon buttons |
| `hover-border` | `state.hoverBorder` | Fields, cards, secondary buttons |
| `hover-text` | `text.primary` | Bare text links |

Solid fills (primary and danger buttons, the active page in Pagination, a checked Switch) step to their own `hover` token instead. There are no gradients, rings or sheens on hover.

## Glass panes

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
| `useInteractiveMotion` | Button, Card, Tag, Accordion, Checkbox, Radio | Hover lift, press/release |
| `useRevealMotion` | Select menu, Modal, Tooltip | The shared entrance: rise, scale, fade |
| `useStateMotion` | Checkbox tick, Radio dot | Two-state pop on a boolean |

```javascript
const { ref, handlers } = useInteractiveMotion({ preset: 'control', disabled });

return <button ref={ref} className={styles.root} type="button" {...handlers}>…</button>;
```

Any descendant marked `data-motion-label` receives the shared text lift, which is how a button's label rides with its surface.

## Rules

1. **Never write a duration or ease in a component.** Reference a gesture from `theme/motion.js`. If the gesture you need does not exist, add it there first.
2. **GSAP owns `transform`; CSS must not.** If GSAP animates an element's transform, that property must not appear in the element's CSS `transition` list, or the two will interpolate against each other. The same applies to any property GSAP drives.
3. **Placement transforms and animation transforms cannot share an element.** Tooltip splits these across `TooltipAnchor` (placement, including `translate(-50%)`) and `Bubble` (animated) for exactly this reason.
4. **Every hook respects `prefers-reduced-motion`**, falling back to setting the end state directly. The interface still reflects what happened; it just stops moving to get there. Preserve this in anything new.
5. **Import the mixins with a relative `@use`.** `@use 'mixins'` does not resolve, because Sass is not given a load path.

## Adding motion to a new component

1. Add the matching `hover-*` mixin to its root class.
2. Call `useInteractiveMotion` with the amplitude preset that fits its family.
3. Spread `handlers` and attach `ref`.
4. Mark its text `data-motion-label` if it should ride along.
5. Check nothing in its CSS `transition` list collides with what GSAP drives.
