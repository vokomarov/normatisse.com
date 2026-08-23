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

**Josefin has no tabular figures.** Any vertical list numbered in the display
face (the contact steps, any future ordered list) must put the numeral in a
fixed-width grid column — `grid grid-cols-[2.5rem_1fr]` — not in a flex row with
a gap. With a gap, `01` sits a few pixels off `02` and the ragged left edge is
visible. Match the numeral's `leading-8` to the first text line so the baselines
agree.

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

### Section-closing CTA

A band that ends with a call to action puts it **after** the content, centred,
never inline with the heading:

```html
<div class="brand-reveal mt-10 flex justify-center lg:mt-18"> … </div>
```

**40 / 40 / 72px, above and below.** The top gap is the `mt`; the bottom gap is
*not* the band padding — it is the band padding minus whatever the next band
curves over it:

| | band `pb` | curve overlap | visible gap |
|---|---|---|---|
| base | `py-20` → 80 | `-mt-10` → 40 | 40 |
| `sm` | `py-24` → 96 | `-mt-14` → 56 | 40 |
| `lg` | `py-32` → 128 | `-mt-14` → 56 | 72 |

A band followed by a `curve-top` band (the gallery) gets that subtraction for
free and needs only the `mt`. A band followed by a flat one (the reviews) has to
fake it with `-mb-10 sm:-mb-14` on the CTA wrapper. Measuring against
`section.getBoundingClientRect().bottom` is what hides this — the curve means
the section box extends past the edge the reader actually sees. Measure to the
*next* section's top instead.

### Horizontal rails (mobile carousels)

Below the hand-over breakpoint, any multi-card row becomes a scroll-snap rail
instead of a stacked column. Cards stacked vertically on a phone bury everything
after the second one; a rail keeps the set scannable and signals "there is more"
through the peeking next card.

`--brand-rail-gutter` mirrors `.brand-band__inner`'s padding (`1.25 / 2 / 2.5rem`)
so `.brand-rail` can bleed to the band edge with a negative inline margin and
still align its first card with the heading above it.

`.brand-rail` contract:

- Scrollbar hidden, `overscroll-x-contain`, `snap-x snap-mandatory`,
  `scroll-padding-inline` set to the gutter. The track's `pb-2` is scroll
  breathing room only — the `--from-*` modifiers reset it to `0`, or it shows up
  as 8px of phantom space under a desktop grid.
- Children get `w-[82%] max-w-sm shrink-0 snap-start` — the 18% remainder is the
  peek that tells the reader the row scrolls. No arrows; dots do the signalling.
- The class sets **no `display`**. Same emit-order trap as `.brand-card`: a
  `lg:grid` on the element would lose to it. `<BrandRail>` owns `display`.
- The hand-over is a modifier — `--from-sm` or `--from-lg` — because the
  breakpoint at which the rail stops must equal the breakpoint at which the
  desktop layout starts. Mismatch it and the rail keeps scrolling under a grid.

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

## 5. Action elements

### Button scale

One rule governs every button: **padding-y : padding-x is always 1:3.** The
sizes in `app.config.ts` are the only approved steps.

| Size | Padding | Text | Used for |
|---|---|---|---|
| `xs` | `px-3 py-1` | `text-xs` | inline, rare |
| `sm` | `px-[1.125rem] py-1.5` | `text-xs` | dense rows |
| `md` | `px-6 py-2` | `text-sm` | default |
| `lg` | `px-[1.875rem] py-2.5` | `text-sm` | the 10/30 baseline — most CTAs |
| `xl` | `px-9 py-3` | `text-base` | section-closing CTAs |
| hero | `sm:px-12 sm:py-3.5 sm:text-lg` | — | the two hero buttons only |

The hero step is a class on the element rather than a sixth size: it exists in
exactly one place, and a named size invites reuse. Keep the ratio if it moves.

The `square` compound variant in Nuxt UI emits `p-*` after the size variants, so
icon-only buttons (`square`) stay square without touching this scale.

Ghost is not a button. A secondary CTA that must read as an action uses
`variant="outline"` — `ghost` renders as bare text until hovered and loses the
padding the scale is there to guarantee.

### Cursor and hover

Tailwind v4 dropped the UA `cursor: pointer` on `<button>`. `main.css` restores
it globally:

```css
button:not(:disabled):not([aria-disabled='true']),
[role='button']:not([aria-disabled='true']),
summary { cursor: pointer; }
```

Every action element also changes background on hover, guarded by
`@media (hover: hover)` so touch devices never latch a hover state. Images that
open a lightbox use `cursor-zoom-in` instead, plus a `bg-watercourse-950/25`
scrim on hover.

`.brand-chip` carries `cursor-pointer` and a hover background. **This is a
deliberate exception, and a lie:** the chips are static text, not controls. It is
in the system because the client asked for it. If the chips ever become
filters, this becomes correct; until then, do not copy the pattern to other
non-interactive text.

---

## 6. Motion

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

## 7. Component contracts

- **`<BrandSection>`** — `surface`, `curve-top`, `id`. Wrap every section in it.
- **`<BrandRail>`** — mobile carousel. `from` (`sm` | `lg`) and `desktop` (the
  layout classes that take over) **must name the same breakpoint**; that pairing
  is the whole contract. `label` names the scroll region. The component measures
  overflow with a `ResizeObserver` and only then adds `role="group"`,
  `tabindex="0"` and the dot indicators — a rail that fits gets no ARIA noise.
  Dots are position indicators *and* controls (click scrolls to the slide).
- **`<BrandLightbox>`** — `items` (`{src, alt, width?, height?}`), `v-model:index`
  (`null` = closed), `title`. Prev/next, counter and arrow keys appear only when
  there is more than one item. Every clickable image on the site opens this, not
  a section-local modal.
- **`<BakerySprinkleField>`** — `density` (particles per 100k px²). Needs a
  positioned, `overflow-hidden` ancestor.
- **`<SprinkleScatter>`** — static SVG sprinkle motif. Fixed `44×44` root;
  position it with a sized wrapper, not with props.
- **`<BakeryFooter>`** — page footer; anchors match the `id`s on `BrandSection`.
  The wordmark and the copyright-row link both go to `/` — a sub-brand page
  always offers a way back to the root site.
- **`useBakeryContacts()`** — the single source of truth for the phone number,
  the Instagram handle and the four contact channels (Instagram, Telegram, Viber,
  phone). Contact section, footer, gallery CTA and reviews CTA all read from it.
  Never hard-code a channel URL in a component.

---

## 8. Content structure

The rule that fixed the "sections look too similar" problem: a product block
separates three zones and never blends them.

1. **Identity** — name + one lead line. No prices, no option lists.
2. **Price** — on its own `.brand-panel` surface, as a `<dl>` of label/value
   rows, optionally grouped (`Поштучно` / `Асорті`). A priced item that has a
   composition carries a one-sentence description under the row; the price
   without the recipe is not enough to choose from.
3. **Options** — a labelled `<dl>` where values render as `.brand-chip`s, never
   as prose. Groups are separated by `space-y-7`, chips inside a group by
   `gap-x-3 gap-y-2.5`: option *types* must read as further apart than option
   *values*, or the whole block collapses into one undifferentiated mass.

Notes and caveats sit last, in `text-xs text-stone-500`.

### Disclosure

A long option set is hidden behind a `UCollapsible` with
`:unmount-on-hide="false"` (content stays in the DOM as `hidden="until-found"`,
so it is findable and `aria-controls` stays valid).

**Open it with a CTA, not an accordion header.** An accordion row reads as
"there is more of the same below"; a titled invitation plus a button reads as
"here is a different thing you can do". The cakes constructor uses the second,
on a `bg-blush-50` panel — heading, one line of copy, then a `size="lg"` button
whose label toggles with the state. The button carries `aria-expanded` and
`aria-controls`.

---

## 9. Gotchas

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
- **Never `object-cover` a screenshot.** A rail needs one uniform card height,
  but these images lead with a product photo and carry the text at the bottom,
  so cropping to a fixed height hides the only content that matters. Use
  `h-[26rem] object-contain sm:h-auto` and let the lightbox show the full image.
- Page `<style>` blocks that re-`@import "tailwindcss"` ship a second Tailwind
  build. Only `pages/index.vue` still does this, because its `.offer-card`
  `@apply` depends on it.
