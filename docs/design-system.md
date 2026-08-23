# Normatisse design system

Single source of truth for visual decisions across the site. `/bakery` is the
first page built on it; every new page follows the same tokens, primitives and
rules. Everything lives in `assets/css/main.css` and `app.config.ts` — do not
introduce page-local hex values, fonts, radii or easing curves.

---

## 1. Color

Two brand palettes plus a neutral. Both are declared in `@theme static` so
Tailwind emits every step (Nuxt UI maps `--ui-color-primary-*` onto them through
`var()`, which Tailwind's usage scan cannot see — without `static` the unused
steps are tree-shaken and `bg-primary` resolves to transparent).

| Role | Palette | Anchor |
|---|---|---|
| Primary | `watercourse` (deep mint/green) | `watercourse-500` `#05c48e` |
| Secondary / accent | `blush` (brand pink) | `blush-500` `#f55c81` |
| Neutral | `stone` | Tailwind default |

**Accent lock:** blush is the only accent on the site. It appears on prices, the
`make day sweeter` line, step numbers and the gallery CTA. Do not introduce a
third accent hue on any page.

### Contrast overrides

Nuxt UI defaults `--ui-primary` / `--ui-secondary` to the 500 step. White button
labels on those land at ~2.2:1 and ~3.0:1 — both fail WCAG AA. `:root` therefore
remaps them:

```css
--ui-primary: var(--color-watercourse-800);   /* #00674f, ~6:1 on white text */
--ui-secondary: var(--color-blush-600);       /* #e03464, ~4.6:1 */
```

Use `watercourse-800` (not `-700`) for small text on white. `.brand-term` and
price group labels already follow this.

### Surfaces

Every full-bleed band picks exactly one:

| Token | Value | Used for |
|---|---|---|
| `--brand-surface` | `#ffffff` | hero, reviews, footer |
| `--brand-surface-mint` | `#f2fcf8` | products |
| `--brand-surface-blush` | `#fff7f9` | contact |
| `--brand-surface-deep` | `#002f25` | gallery only |
| `--brand-on-deep` | `#d9fbee` | text on the deep band |

**Theme flip rule:** a page gets **at most one** dark band, and everything before
and after it is light. The flip has to read as one deliberate accent, not a
stripe pattern. On `/bakery` that band is the gallery.

---

## 2. Type

| Role | Face | Notes |
|---|---|---|
| Display (`--font-display`) | Josefin Sans | **Latin only — no Cyrillic coverage.** Brand words, headings, price figures. |
| Text (`--font-sans`) | Onest | Carries all Ukrainian copy. Loaded with `cyrillic` + `cyrillic-ext` subsets. |

Never set Ukrainian body copy in Josefin Sans; it silently falls back to a
system face. Headings work because they inherit `text-balance` and short words,
but any long Cyrillic string belongs in Onest.

### Type roles (classes, not ad-hoc utilities)

| Class | Purpose |
|---|---|
| `.logo-font` | wordmark-adjacent Latin text |
| `.sub-logo-font` | the italic blush `make day sweeter` line |
| `.brand-heading` (+ `--on-deep`) | section `<h2>`/`<h3>`; `line-height: 1.1` for descender clearance |
| `.brand-lead` (+ `--on-deep`) | the one paragraph under a heading |
| `.brand-price` | price figures; italic display face, blush, `white-space: nowrap` |
| `.brand-term` | small-caps label heading a spec group |

Italic display type needs descender room: keep `leading-[1.15]` and a `pb-1`
reserve on any wrapper (see the hero's `make day sweeter`).

---

## 3. Layout

```
.brand-band          full-bleed, relative, overflow-hidden — owns the surface
  [decoration]       absolutely positioned parallax / particle layers
  .brand-band__inner mx-auto max-w-[76rem] px-5 sm:px-8 lg:px-10
```

`--ui-container: 76rem`. Sections never set their own background or outer
padding — `<BrandSection>` owns vertical rhythm (`py-20 sm:py-24 lg:py-32`) and
the surface. Pass `curve-top` to round a band over the previous one.

Grid over flex math. Full-height sections use `min-h-[…svh]`, never `h-screen`.

---

## 4. Shape and elevation

One radius scale, one rule:

| Token | Value | Applies to |
|---|---|---|
| interactive | pill | buttons, badges, chips (set in `app.config.ts`) |
| `--brand-radius-panel` | `1.75rem` | cards, media frames, modals |
| `--brand-radius-inner` | `1rem` | panels nested inside a card |
| `--ui-radius` | `0.75rem` | Nuxt UI's own small surfaces |

Shadows are tinted with `color-mix(… watercourse-900 …)` — never pure black.

`.brand-card` is the card primitive. It deliberately does **not** set
`flex-direction`: the class is emitted after Tailwind's utility layer, so a
`lg:flex-row` on the element would lose to it. Always pass `flex-col` (or
`flex-col lg:flex-row`) explicitly on the element.

The same ordering trap applies to every `@apply` class here. `.brand-chip` sets
`text-sm` and `.brand-lead` sets `text-base sm:text-lg` — a utility on the same
element will not override them. Add a modifier class instead.

---

## 5. Motion

| Token | Value |
|---|---|
| `--brand-ease` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `--brand-duration-fast` | 150ms |
| `--brand-duration` | 300ms |
| `--brand-duration-slow` | 600ms |

**Parallax** — `.brand-parallax` + `--parallax-from` / `--parallax-to`. Runs on
CSS scroll-driven animations (`animation-timeline: view()`) where supported;
`composables/useParallax.ts` provides a rAF + IntersectionObserver fallback for
Firefox. No scroll event listeners anywhere.

**Reveal** — `.brand-reveal` + `composables/useReveal.ts` (called by
`<BrandSection>`). The composable adds `.is-armed` at mount *before* observing,
so nothing is hidden when the script never runs (no-JS, print, full-page
capture). Stagger with `--reveal-delay`.

**Particles** — `<BakerySprinkleField>`. Canvas 2D, DPR-aware, drawn straight
from the rAF loop (no Vue reactivity per frame), paused when off-screen or when
the tab is hidden, single static frame under reduced motion. Deliberately not a
particle library: the particles are the brand's sprinkle motif, and a library
would add ~200KB to render off-brand round dots.

All three respect `prefers-reduced-motion: reduce`, as does `scroll-behavior`.

---

## 6. Component contracts

- **`<BrandSection>`** — `surface`, `curve-top`, `id`. Wrap every section in it.
- **`<BakerySprinkleField>`** — `density` (particles per 100k px²). Needs a
  positioned, `overflow-hidden` ancestor.
- **`<SprinkleScatter>`** — static SVG sprinkle motif. Fixed `44×44` root;
  position it with a sized wrapper, not with props.
- **`<BakeryFooter>`** — page footer; anchors match the `id`s on `BrandSection`.

---

## 7. Content structure

The rule that fixed the "sections look too similar" problem: a product block
separates three zones and never blends them.

1. **Identity** — name + one lead line. No prices, no option lists.
2. **Price** — on its own `.brand-panel` surface, as a `<dl>` of label/value
   rows, optionally grouped (`Поштучно` / `Асорті`).
3. **Options** — a labelled `<dl>` where values render as `.brand-chip`s, never
   as prose. Long option sets go behind a `UAccordion`.

Notes and caveats sit last, in `text-xs text-stone-500`.

---

## 8. Gotchas

- **Never name a slot `constructor`.** Vue resolves `$slots.constructor` to
  `Object.prototype.constructor`, so `item.slot && !!slots[item.slot]` is truthy
  and the panel renders empty and never opens. This is what broke the cakes
  accordion. The same applies to `toString`, `valueOf`, `hasOwnProperty`.
- **`@nuxt/image` `sizes` is not the HTML `sizes` attribute.** It takes
  breakpoint-keyed values (`100vw sm:50vw lg:384px`). Raw media queries with
  `rem` units produce an empty `srcset` and no `src` at all.
- **Pre-cropped screenshots** (reviews) use a plain `<img>` with their real
  intrinsic height. Running them through `NuxtImg` with a single fixed
  width/height crops them to one ratio.
- Page `<style>` blocks that re-`@import "tailwindcss"` ship a second Tailwind
  build. Only `pages/index.vue` still does this, because its `.offer-card`
  `@apply` depends on it.
