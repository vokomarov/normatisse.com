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

**A media band is not a surface flip.** A band whose background is a photograph
(the manifesto) is counted separately from the dark-surface budget above — it is
a different device, and the two do not compete as long as they are not adjacent.
A page gets at most one of each. See §3, *Media bands*.

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

**A Latin word inside Cyrillic copy takes the display face.** `wow!` and `norm`
in the manifesto are set `font-display italic` in blush. The face has the
coverage, the switch is invisible to a Ukrainian reader as a font change, and it
ties the line back to the wordmark. This is the only sanctioned mixed-family
emphasis: within one language, emphasise with weight or italic of the same face.

**Josefin has no tabular figures.** Any vertical list numbered in the display
face (the contact steps, any future ordered list) must put the numeral in a
fixed-width grid column — `grid grid-cols-[2.5rem_1fr]` — not in a flex row with
a gap. With a gap, `01` sits a few pixels off `02` and the ragged left edge is
visible. Match the numeral's `leading-8` to the first text line so the baselines
agree.

---

## 3. Layout

```
.brand-band          full-bleed, relative, overflow-clip — owns the surface
  [decoration]       absolutely positioned parallax / particle layers
  .brand-band__inner mx-auto max-w-[76rem] px-5 sm:px-8 lg:px-10
```

`overflow-clip`, **not** `overflow-hidden`. `hidden` makes the band a scroll
container; a scroll container that cannot scroll hands every
`animation-timeline: view()` inside it a dead timeline, and the parallax layers
freeze at one transform for the whole page. `clip` cuts the same pixels without
the scroll semantics. Do not "tidy" this back to `hidden` — it silently kills
all parallax on the page, with no error and no visual clue beyond stillness.

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

### Media bands

A band whose background is a photograph rather than a surface token. One per
page; on `/bakery` it is the manifesto, between the hero and the price list.
It is a pause, not a section — no heading, no CTA, just the quote.

**Placement is constrained by §1, not by the narrative.** The manifesto answers
"who is baking" and therefore wants to sit before the prices, but the binding
rule is that it must not touch the dark gallery band. Hero → manifesto →
products satisfies both; hero → products → manifesto → gallery would not.

It does **not** use `<BrandSection>`: the vertical rhythm is a `min-h` plus its
own padding, because the band is sized by the photo it has to show, not by the
page's section rhythm.

```html
<section class="brand-band flex min-h-[18rem] items-center py-15
                sm:min-h-[20rem] sm:py-17 lg:min-h-[24rem] lg:py-20">
```

**Keep `min-h` below the padded content height, or the padding is inert.** The
band is a flex column centred on `items-center`, so whichever of `min-h` and
`content + 2 × py` is larger wins and the other does nothing. When `min-h` wins,
editing `py-*` changes nothing on screen — a silent no-op that looks like a
caching problem. The values above are set so padding governs at every
breakpoint; `min-h` is only a floor for how little photo the band may show.

Three layers, in order:

1. **Photo layer.** `absolute -top-[20%] left-0 h-[140%] w-full`, carrying
   `.brand-parallax` with `--parallax-from: 12%; --parallax-to: -12%`.
   The sizing is not free choice. For a layer `k×` the band height translating
   `±p` of *its own* height, the overhang is `(k−1)/2` of the band and the travel
   is `p·k` of it, so the layer stays covered only while **`p·k ≤ (k−1)/2`**.
   At `p = 12%` that needs `k ≥ 1.32`; `k = 1.4` is the value in use, giving
   ±97px of travel inside a 115px overhang. Raising the travel without raising
   the height is what pulls a hard edge into the band mid-scroll.
2. **Scrim.** A light flat tint (`bg-watercourse-950/25`) plus one vertical
   gradient that darkens only the top and bottom edges, where the band meets the
   pale surfaces above and below. It is *not* the contrast device — the bars in
   layer 3 are. Keeping it light is what lets the photo still read as a
   photograph; a scrim heavy enough to carry text turns the band to mush.
3. **Content**, inside `.brand-band__inner` as usual.

**Put the contrast in the bar, not in the scrim.** Each line of quote copy sits
in its own solid `.brand-quote-line` bar. That decouples the two jobs: the bar
guarantees legibility at a measured ratio regardless of what pixel is behind it,
and the scrim is then free to stay light. It also removes the failure mode of a
scrim-only band, where the *average* luminance passes but the brightest pixel
under the text does not.

**`.brand-quote-line` contract.** The class carries padding, with
`.brand-quote-line--note` as a tighter variant for the two supporting lines —
nothing else. The tighter padding *has* to be a modifier class: a `py-*` utility
at the call site loses, because the base class emits after Tailwind's utility
layer (§3, cascade order). No
`display`, no `width`, no colour, and deliberately **no border-radius and no
shadow**: the bars stack flush in pairs, so rounded corners leave notches where
the edges meet and a shadow lands on the bar below as a smudge rather than
lifting the block. The fill alone separates the bars from the photo. The parent
is a flex column, so each bar hugs its own text, and the call site sets the fill
and text colour. Setting `display` here would lose to the utility layer anyway
(§3, cascade order).

**Layout: two flush pairs on the left gutter.** The quote spans the full
`.brand-band__inner` width — the same container as every other section, so the
band's copy lines up with the page rather than floating in a narrower column of
its own. Both pairs are `items-start`, so all four bars start on the container's
left gutter and the ragged right ends carry the shape. Gap `0` inside a pair,
`gap-5 sm:gap-6` between them: the block reads as two statements, not four
fragments.

Left-anchored, the block leaves the right half of the frame to the photograph.
That is the trade — a centred or split arrangement uses the whole band, this one
gives half of it back to the image.

**Bar colour ladder**, descending in weight so the eye reads the lines in order,
each ratio measured rather than eyeballed:

Flat fills, no gradients. A gradient across a bar this small is invisible at
reading distance and only muddies the fill's relationship to the photo behind
it; it also means the bar's contrast is a range rather than a number.

| Line | Fill | Text | Ratio |
| --- | --- | --- | --- |
| Claim | `white` | `watercourse-800` | 6.9:1 |
| Aside | `blush-700` | `white` | 6.0:1 |
| Notes (×2) | `watercourse-950/85` + `backdrop-blur-[2px]` | `--brand-on-deep` | ≥8.4:1 |

`blush-500` is the tempting fill for the aside and it fails — 3.1:1 against
white. `blush-600` only reaches 4.3:1; `blush-700` is the first that clears
AA with margin. The two note bars stay translucent on purpose: at 85% with a 2px
backdrop blur the photo still moves behind them, which is what keeps four
stacked bars from reading as a solid panel. Quote the translucent bar's ratio
against its **worst** backdrop (pure white) — 8.4:1 here — not against the
photo it happens to sit on today.

**Copy shape.** One line per phrase, each in its own bar. Cap the mobile size of
the longest line so it never wraps — at 390px the claim only fits unwrapped at
`text-2xl`, and a wrapped line orphans its trailing emoji onto a row of its own,
doubling the bar height. Measure the rendered bar heights at 390 and 640 before
calling it done.

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

### Lists of equivalent actions

A list where every row does the same job — the four contact channels — is the
one place `ghost` is right, because the rows are a directory, not CTAs. But the
list still has to answer *which one*: exactly one row carries `primary: true`
in `useBakeryContacts()` and renders `color="primary" variant="soft"` with a
blush note badge; the rest stay `ghost neutral`. Four equally weighted options
at the last step of the page is a choice to make, not an action to take.

The marking lives in the data, not the template. Moving the answer to a
different channel is a one-line edit in the composable.

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

Two things silently freeze it, and neither raises an error:

- An ancestor with `overflow: hidden` (see §3 — the band uses `overflow-clip`).
- Verifying it in the console by scrolling and reading `getComputedStyle` in the
  *same* task. The timeline advances on the next frame, so a synchronous loop
  reports one identical transform at every scroll position and looks exactly
  like the bug. Scroll, yield a frame, then read.

The JS fallback measures the layer's **parent**, never the layer itself: the
layer carries the transform the loop writes, so reading its own
`getBoundingClientRect()` feeds the offset back into the progress.

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
  positioned, clipping ancestor (`.brand-band` is one).
- **`<BakeryManifesto>`** — the page's media band. No props: the photo, the copy
  and the placement (after the hero, before the price list) are the component.
  See §3, *Media bands*.
- **`<BakeryOrderBar>`** — mobile-only fixed order bar (`lg:hidden`, `z-40`).
  Three IntersectionObservers' worth of state in two: it **arms** once `#products`
  has been seen and then latches, and it is **suppressed** while `#hero` or
  `#contact` is on screen. Arming latches because a bar that blinks off on every
  upward scroll reads as a bug; suppression does not, because the bar must never
  cover the thing it points at, and over the hero it only duplicates a CTA that
  is already on screen. Bottom padding carries `env(safe-area-inset-bottom)`.
  Requires those three `id`s to exist on the page — it silently no-ops otherwise.
- **`<SprinkleScatter>`** — static SVG sprinkle motif. Fixed `44×44` root;
  position it with a sized wrapper, not with props.
- **`<BakeryFooter>`** — page footer; anchors match the `id`s on `BrandSection`.
  The wordmark and the copyright-row link both go to `/` — a sub-brand page
  always offers a way back to the root site.
- **`useBakeryContacts()`** — the single source of truth for the phone number,
  the Instagram handle, the four contact channels (Instagram, Telegram, Viber,
  phone) and `leadTime`. `leadTime` is how far ahead an order must be **placed**,
  never how long the making takes — the product is made for the agreed date, and
  copy that reads "готую за 3-5 днів" states the wrong promise. It is quoted in
  the hero lead and above the order steps, not inside them.
  Contact section, footer, gallery CTA and reviews CTA all read from it.
  Never hard-code a channel URL or repeat the lead time in a component.
  Exactly one channel carries `primary: true` — see §5, *Lists of equivalent
  actions*.

---

## 8. Content structure

### Copy rules that are factual, not stylistic

- **«Готую», not «печу».** The range covers madeleines, gift sets and nut
  assortments that are not baked. The baking verb is only correct for a specific
  baked item; the general verb for the work is `готувати`. Same for headings —
  «Що виходить із печі» was replaced for this reason.
- **Lead time is when to *write*, not how long the making takes.** The product is
  made for the agreed date. «Приймаю замовлення за 3-5 днів до дати» is right;
  «Печу за 3-5 днів» promises a turnaround the bakery does not offer.
- **Ask for the design and the item, not the headcount.** Step 01 and the
  Telegram prefill collect date, occasion, what exactly, and wanted design.
  Guest count is not what the quote is built from.

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

### Review cards — claim, then receipt

A review card is a `<blockquote>` above the screenshot, never a screenshot
alone and never an HTML speech bubble laid over one. The screenshots already
contain the message bubble as pixels; a second bubble on top of it duplicates
the same content in two renderings. Quote first because that is what a reader
scans; screenshot under it because that is what makes the quote believable.

- `quote` is a **verbatim** transcription, typos included. The section promises
  screenshots «без редагування» — a tidied quote breaks that promise, and the
  screenshot below it makes the edit visible anyway.
- `caption` names the *order*, not the customer. These are anonymous Direct
  messages; a plausible-sounding name would be fabricated.
- `alt` describes the screenshot for someone who cannot see it. It is not a
  second copy of the quote.
- The screenshot is cropped to a **fixed aspect box at every breakpoint**
  (`aspect-[2/3]` on the `<img>`, `object-cover`, per-item `object-*` anchor).
  A per-item `aspect` override is expected, not exceptional: a file whose
  message band and subject cannot both fit the default box gets its own.
- **`aspect` is the height knob; the `height` attribute is not.** See §9.
- The anchor is per file and must be checked against the actual screenshot —
  an Instagram story caption sits at the top as often as a reply bubble sits at
  the bottom. Getting it wrong crops the message off and leaves a card that
  looks fine and proves nothing.
- **The cards are a stretched grid, not masonry.** One shared crop box leaves
  quote length as the only variable, and ragged card bottoms across three
  near-identical screenshots read as a bug rather than as rhythm. The text block
  is stretched to the tallest quote (`sm:auto-rows-fr` on the grid, `sm:h-full`
  on the card, `grow` on the `<blockquote>`) and the caption is pinned to its
  bottom with `mt-auto`, so every screenshot starts on the same baseline. The
  lightbox always shows the whole file.

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
- **Never pass `width`/`height` *and* `sizes` to the same `<NuxtImg>`.** The pair
  is read as the intrinsic ratio for the srcset maths and the result can be a
  `_ipx/s_2x2/…` variant — a literal 2×2 pixel image, served with no error.
  Pick one: fixed `width`/`height` for a fixed-size image, `sizes` for a
  responsive one.
- **A full-bleed image wants explicit pixel widths in `sizes`, not `100vw`.**
  `100vw` on a full-width band emits junk `1w` and `2w` srcset candidates and can
  leave the browser picking the 1600px file on a phone. `sizes="480px sm:768px
  lg:1280px xl:1600px"` gives a clean ladder.
- **Strip EXIF before committing a photo.** iPhone captures carry GPS to ~5 m,
  the body and lens model, and the capture timestamp. This is a home bakery: §
  "Deliberate non-fixes" withholds the street address from the schema on
  purpose, and shipping coordinates in EXIF hands out the same thing by another
  route. Three gallery photos reached production this way before the audit of
  2026-09-02. iPhone JPEGs also append a whole second JPEG after the primary
  `EOI` (the HDR gain map, 100–450 KB) that no browser reads. Rebuild the file
  from its segments — keep JFIF, ICC and Adobe, drop APP1/APP3-13/APP15/COM and
  the trailing image — rather than re-encoding, which costs a generation.
- **Bake EXIF rotation in.** iPhone HEIC exports carry orientation 6; `sips`
  keeps the flag, and the served variant comes out sideways or square. Pipe the
  file through `sharp().rotate()` once, at import time, and commit the rotated
  JPEG.
- **Pre-cropped screenshots** (reviews) use a plain `<img>` with their real
  intrinsic height. Running them through `NuxtImg` with a single fixed
  width/height crops them to one ratio.
- **The `height` attribute never changes rendered height.** It only reserves a
  box before the file decodes; afterwards the intrinsic ratio governs, because
  Tailwind preflight forces `height: auto`. Editing it looks like a no-op and is
  one. To change how tall an image renders, set `aspect-[w/h]` (or an explicit
  `h-*`) and give it `object-cover`. Keep `width`/`height` equal to the file's
  real pixel dimensions — `BrandLightbox` reads them too, so a made-up pair
  reserves a wrong-ratio box there as well.
- **`h-full` on a `<BrandRail>` child cancels the rail's own stretch.** Below the
  hand-over breakpoint the rail is a flex row, where cards equalise via
  `align-items: stretch` — and stretch only applies while the cross-size is
  `auto`. An unqualified `h-full` sets an explicit height, opts the card out, and
  the rail goes ragged while the desktop grid looks right. Gate it: `sm:h-full`.
- **Crop screenshots to the card, but pick the anchor per file.**
  `object-contain` in a fixed-height card letterboxes every image that is not the
  card's ratio, and the white bars read as a bug. `object-cover` alone crops the
  message text off whichever screenshots do not happen to carry it in the middle.
  The reviews carry a per-item `focus` (`object-top` / `object-bottom` /
  `object-center`) naming where the text sits in that file; the crop keeps that
  and drops the product photo on the other side. The crop applies at every
  breakpoint. The lightbox always shows the full image.
- Page `<style>` blocks that re-`@import "tailwindcss"` ship a second Tailwind
  build. Nothing does this any more — `pages/index.vue` was the last one and was
  fixed in `cd3e047`. Do not reintroduce it to make an `@apply` resolve; move the
  rule into `main.css` instead.
