# Bakery Landing Page — Visual Direction

**Date:** 2026-08-22
**Produced by:** Task 1 (frontend-design skill pass)
**Consumers:** Task 2 (Hero), Task 4/3 (photos), Task 6 (Reviews), Task 7 (Products/bento/Contact) — read this before finalizing markup/classes.

This is a direction note, not code. It fixes layout structure, class shapes, and one
signature element so the four downstream tasks build one coherent page instead of four
independently-improvised sections.

## 0. Fixed inputs (not open for redesign)

Per the brief, these are non-negotiable. Restated here once so downstream tasks don't
re-litigate them:

- **Color:** `watercourse-{50..950}` (primary `watercourse-500` = `#05c48e`), plus
  `#00674F` via `.logo-font` and `#F55C81` via `.sub-logo-font`. No new hex values.
- **Type:** Josefin Sans everywhere. No second typeface.
- **Existing motif:** blurred-blob decorative shapes (`BackgroundTop`/`BackgroundBottom`),
  gradient `from-[#ff80b5] to-[#9089fc]`, `blur-3xl`, `opacity-30`, clip-path polygon.

I looked at `/Users/vovan/projects/normatisse/prices/standard1x-1080px/post/normatisse_torty-1_4-5_1x.png`
for grounding: the pricing graphics carry a corner motif of loosely scattered circles —
some solid pale pink, some outline-only, a few small teal ones — in irregular clusters,
denser at the corners and thinning toward the center. That's the "watercolor-splatter
branding" the brief refers to. It reads as **flung sprinkles / sugar dust**, not a
literal watercolor wash. That reading is the basis for the signature element below.

### Color usage mapping (applying the fixed palette, not inventing it)

| Role | Token |
|---|---|
| Page background | white / `watercourse-50` for section tints (alternate sparingly, not every section) |
| Card surface | white, `ring-1 ring-watercourse-100` |
| Card hover ring | `ring-watercourse-300` |
| Primary CTA | `watercourse-500` solid (matches homepage `UButton color="primary"`) |
| Headings / brand | `.logo-font` (`#00674F`) |
| Prices / accents / handles | `.sub-logo-font` (`#F55C81`) |
| Body copy | plain Josefin Sans regular, `text-gray-600` (matches homepage tagline treatment — never bold/italic, those are reserved for the two brand classes) |

### Type scale

| Element | Class shape |
|---|---|
| Hero tagline ("make day sweeter") | `.sub-logo-font text-2xl sm:text-3xl lg:text-4xl` |
| Hero Ukrainian line | plain Josefin, `text-lg text-gray-600 sm:text-xl/8` (matches homepage's existing tagline exactly) |
| Section headings (Продукція, Відгуки, Напишіть нам) | `.logo-font text-3xl sm:text-4xl` |
| Product card title (Кекси/Капкейки/Мадлен) | `.logo-font text-2xl` |
| Торти card title (flagship, larger) | `.logo-font text-3xl sm:text-4xl` |
| Line-item price | `.sub-logo-font text-lg sm:text-xl` |
| Card headline price ("від 900 грн/кг") | `.sub-logo-font text-2xl sm:text-3xl` |
| Flavor/ingredient body copy | plain Josefin, `text-sm sm:text-base text-gray-600` |
| Review handle (`@username`) | `.sub-logo-font text-xs sm:text-sm` |

## 1. Hero

**Rejected first draft:** centered logo, centered tagline, centered CTA button below —
this is exactly the homepage's existing hero pattern (`pages/index.vue` lines 25-37) and
is also literally the skill's named generic default ("plain centered hero + big CTA
button"). Reusing it verbatim would make `/bakery` visually indistinguishable from the
page it's supposed to differentiate from.

**Direction:** asymmetric split. Content left-aligned in the left ~7/12 of the row;
decoration (existing blobs + the new sprinkle-scatter signature element) occupies the
right side and is allowed to bleed toward the viewport edge. Left-alignment holds at all
breakpoints — this is the one section where I deliberately don't fall back to centered-
on-mobile, since a left-aligned block still reads clean and asymmetric on a narrow
screen (unlike a badly-cropped photo would).

```
Desktop (lg+), 12-col grid, items-center:
┌────────────────────────────────────────────────────────────────┐
│ [BackgroundTop blob, existing, unchanged]                       │
│                                                                  │
│  ·˙  (small sprinkle cluster, top-left of text block,           │
│       rotate-[-12deg] scale-75, opacity-50)                     │
│                                                                  │
│  logo-bakery-full.svg (max-w-xs lg:max-w-sm)      ·˚ ˚  ·        │
│                                                      ˚  ·   ˚    │
│  make day sweeter.                                 ·    ˚·  ˚   │
│  Ділюся з вами частинкою себе,                    (large sprinkle│
│  спеченою з любов'ю.                               cluster,      │
│                                                     rotate-[18deg]│
│  [ Що у нас є? ]  ←── left-aligned, not centered   bleeding off  │
│                                                     right edge)   │
│                                                                  │
│ [BackgroundBottom blob, existing, unchanged]                     │
└────────────────────────────────────────────────────────────────┘

Mobile (<lg): grid-cols-1, decoration cluster shrinks to a single small
sprinkle group tucked behind the top-right of the logo (absolute, low z),
not its own block — content stays left-aligned, no centering fallback.
```

Class shapes:
- Wrapper: `grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-16`
- Content column: `lg:col-span-7 text-left` (override homepage's `text-center`)
- Logo: `max-w-xs lg:max-w-sm` (down from homepage's `max-w-md` centered logo — this
  one sits inside a narrower column, not spanning a centered 2xl container)
- CTA row: `flex justify-start` (not `justify-center`)
- Vertical rhythm: asymmetric padding, `pt-20 pb-28 sm:pt-28 sm:pb-40` — more bottom
  than top, since `BackgroundBottom` is the larger shape and needs room to read

Decoration column (`lg:col-span-5`, `hidden lg:block` for the full composition,
degrading to a single small corner cluster on mobile): two sprinkle-scatter instances at
different scale/rotation, positioned `absolute` within a `relative` decoration wrapper,
never symmetric to each other.

No hover/scroll interaction needed here beyond a simple fade/slide-up on initial load
for the content column (`opacity-0 translate-y-4` → `opacity-100 translate-y-0`,
one-shot, ~400ms, respecting `prefers-reduced-motion: reduce` by skipping the transform
and only cross-fading).

## 2. Product cards (Торти / Кекси / Капкейки / Мадлен)

**Rejected first draft:** four equal-size cards in a `grid-cols-2 lg:grid-cols-4` —
the skill's second named generic default ("uniform equal-size card grid"), and it also
misrepresents the content: Торти is the flagship product (constructor + 5 fixed
flavors, highest price point, most copy) while Мадлен is priced per single piece. Equal
boxes would flatten that hierarchy.

**Direction:** a bakery-counter layout — one large showcase card for Торти, three
smaller cards for the rest, sized roughly in proportion to how much each product line
actually carries (this is "structure is information," not decoration: the size
differences map to real content weight, unlike the bento strip below, which varies size
for photographic rhythm instead — see §5 for why these two sections deliberately don't
look alike).

```
Desktop (lg+), 12-col grid, 2 rows, gap-6:
┌───────────────────────────────────┬─────────────────────┐
│                                    │      КАПКЕЙКИ         │
│                                    │   (col-span-5,        │
│            ТОРТИ                  │    row-span-1)        │
│      (col-span-7, row-span-2)     ├───────────┬───────────┤
│   photo (aspect-[4/3]) top,       │  КЕКСІ     │  МАДЛЕН   │
│   UAccordion below:               │(col-span-3)│(col-span-2)│
│   "Конструктор" / "Готові смаки"  │ row-span-1 │ row-span-1│
└───────────────────────────────────┴───────────┴───────────┘

Mobile (<lg): grid-cols-1, stacked in the same order (Торти, Капкейки,
Кекси, Мадлен) — Торти keeps its taller photo aspect ratio and appears
full-width first, establishing the same hierarchy without needing
column tricks.
```

Class shapes:
- Grid: `grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-2 gap-6`
- Торти: `lg:col-span-7 lg:row-span-2`
- Капкейки: `lg:col-span-5`
- Кекси: `lg:col-span-3`
- Мадлен: `lg:col-span-2`
- Each card is a `UCard` wrapped in an outer `div` that carries rotation/offset/hover
  transforms — **apply transforms to the wrapper, not to `UCard`'s own root classes**,
  since Nuxt UI merges/overrides root-level classes and fighting that is fragile.
- Alternate slight static rotation on the three smaller cards only (Торти stays level,
  as the "anchor" of the layout): Капкейки `lg:rotate-[-1deg]`, Кекси `lg:rotate-[1deg]`,
  Мадлен `lg:rotate-[-0.5deg]`. Small enough to feel tactile, not skewed.
- Photo aspect ratios: Торти `aspect-[4/3]` (landscape showcase), Капкейки/Кекси/Мадлен
  `aspect-square` (matches their source Instagram crops and their smaller footprint).
- Card surface: `rounded-2xl bg-white ring-1 ring-watercourse-100 shadow-sm`, consistent
  family with the homepage's `.offer-card` (`rounded-lg`) but scaled up for a card that
  now carries a photo, not just text.
- Hover: `hover:-translate-y-1 hover:shadow-md hover:ring-watercourse-300 transition-all
  duration-150 ease-in-out` on the wrapper — same interaction language as the existing
  `.offer-card` (`hover:bg-elevated/90 transition-colors duration-150`), just extended to
  include a lift since these cards now have visual weight from photos.
- Торти's two content modes (Конструктор vs. Готові смаки) render as a `UAccordion`
  inside the card, below the photo — keeps the card's fixed height reasonable and avoids
  a wall of text; the other three cards list prices as a plain stacked list (no
  accordion needed, they're short enough).

## 3. Bento photo strip

**Rejected first draft:** an even 3-up or 4-up grid of same-size square photos — the
skill's third named generic default variant ("evenly-spaced photo grid"), and it's also
explicitly called out against in the spec (§3a: "rather than a rigid grid").

**Direction:** overlapping, rotated tiles at varied aspect ratios — read as photos
scattered across a counter, not a curated grid. Deliberately different in character from
§2's card grid (which stays level, aligned, non-overlapping) so the two sections don't
repeat the same trick twice on one page.

```
Desktop (lg+), 12-col grid, grid-flow-dense, gap-4, tiles allowed to overlap
via negative-margin/translate:

┌─────────────┬───────────┐
│             │  process  │ ← col 5-7, aspect-square,
│  packaging  │ (overlaps │   rotate-[2deg], z-20,
│ col 1-4,    │  bottom-  │   lg:-translate-y-3
│ row 1-2,    │  left of  ├───────────┬─────────────────┐
│ aspect-[3/4]│  D)       │cross-     │   finished       │
│ rotate-     └───────────┤ section   │   spread         │
│ [-2deg]                 │col 5-8,   │ col 9-12, row 1-2│
│                         │row 2,     │ aspect-[4/5]      │
│                         │aspect-[4/3]│ rotate-[1deg]    │
│                         │rotate-[-1.5deg]│              │
└─────────────────────────┴───────────┴──────────────────┘
```

Class shapes:
- Wrapper: `grid grid-cols-6 lg:grid-cols-12 gap-4 lg:gap-6`
- Tile 1 (packaging): `col-span-6 lg:col-span-4 lg:row-span-2 aspect-[3/4]
  rotate-[-2deg]`
- Tile 2 (process): `col-span-3 lg:col-span-3 aspect-square rotate-[2deg]
  lg:-translate-y-3 lg:translate-x-2 relative z-10`
- Tile 3 (cross-section): `col-span-3 lg:col-span-3 aspect-[4/3] rotate-[-1.5deg]
  lg:translate-y-2`
- Tile 4 (finished spread, if a 4th photo is sourced): `col-span-6 lg:col-span-5
  aspect-[4/5] rotate-[1deg] lg:-translate-x-4`
- If only 3 photos are ultimately sourced (spec says "3-4"), drop Tile 4 and widen Tile
  3 to `lg:col-span-4` rather than re-balancing all rotations — keep the asymmetry, just
  with one less tile.
- Each tile: white print-frame treatment, distinct from the smoother product cards —
  `bg-white p-2 shadow-lg ring-1 ring-black/5 rounded-sm` (tight radius, not `rounded-2xl`
  — this is a deliberate semantic split: soft `rounded-2xl` cards = designed UI chrome,
  tight `rounded-sm` white-bordered frames = "this is a real unretouched photo").
  `<img>` inside gets `object-cover w-full h-full rounded-[2px]`.
- One, at most two, tiles carry a small sprinkle-scatter accent tucked at one corner
  (signature element, see §5) — not all of them, restraint matters here.

**Scroll interaction:** on entering the viewport (IntersectionObserver, or a `v-motion`/
CSS-class toggle if a scroll-reveal utility already exists in the repo — check before
adding a new dependency), tiles fade and slide in staggered: `opacity-0 translate-y-6` →
`opacity-100 translate-y-0`, ~80ms stagger per tile in DOM order, ~300ms duration,
ease-out. Respect `prefers-reduced-motion: reduce` by rendering tiles in their final
state with no transform, cross-fade only (or nothing at all).

**Hover interaction (desktop only, `lg:hover:`):** tile rotates to `rotate-0` and
scales `1.03`, raising `z-30` and its shadow — like picking the photo up to look at it
straight — then relaxes back on `mouseleave`. `transition-transform duration-200
ease-out`. Skip entirely under `prefers-reduced-motion: reduce` (no rotation-to-flat
animation; keep the static rotated state).

## 4. Reviews grid

**Rejected first draft:** a uniform card grid (e.g. `grid-cols-3`) with every
screenshot force-cropped to the same aspect ratio — the skill's generic-grid default
again, and mechanically wrong here: 5 items in a 3-column grid leaves one dangling empty
cell in the second row, an unmistakable "unfinished template" tell. It would also fight
the spec's own instruction that authenticity matters more than visual uniformity here —
force-cropping real screenshots to match a grid undermines exactly the authenticity the
spec asks to preserve.

**Direction:** masonry columns, natural aspect ratios preserved, corkboard/pinned-note
framing. An odd count (5) is a non-issue in a column flow (unlike a strict grid), so this
also solves a real layout problem, not just a stylistic one.

```
Desktop (lg+): CSS columns, 3-up, natural item heights (illustrative — actual
heights depend on each screenshot's real dimensions):

┌───────────┐ ┌───────────┐ ┌───────────┐
│ review 1  │ │ review 2  │ │ review 3  │
│ (tall)    │ │ (short)   │ │ (medium)  │
│           │ └───────────┘ │           │
│           │ ┌───────────┐ │           │
└───────────┘ │ review 4  │ └───────────┘
              │ (medium)  │ ┌───────────┐
              └───────────┘ │ review 5  │
                             │ (short)   │
                             └───────────┘
```

Class shapes:
- Wrapper: `columns-1 sm:columns-2 lg:columns-3 gap-6`
- Each item: `break-inside-avoid mb-6 inline-block w-full`
- Card frame: `bg-white p-3 pb-8 shadow-md ring-1 ring-black/5` — same "documentary
  photo" framing language as the bento tiles (tight radius, not `rounded-2xl`), since
  these are also real unedited screenshots, not designed content.
- Static alternating rotation per card (deterministic by index, not random per render):
  cycle through `rotate-[-2deg] rotate-[-1deg] rotate-[0deg] rotate-[1deg] rotate-[2deg]`
  across the 5 items so no two adjacent cards share a rotation.
- Small "washi tape" accent: a short rotated rectangle
  `absolute -top-2 left-6 w-10 h-4 bg-watercourse-100/70 rotate-[-4deg]` overlapping the
  top edge of each card, reinforcing the pinned-note read.
- `@username` handle: `.sub-logo-font text-xs sm:text-sm`, bottom-right of the card,
  rotated slightly opposite the card's own rotation (e.g. card at `-2deg` → handle at
  `+3deg` relative) for a hand-annotated feel.
- No hover/scroll choreography beyond the same load-in fade used elsewhere — this
  section is about calm, credible proof, not another animated moment. Restraint here is
  deliberate: three sections (hero, bento, cards) already carry motion/rotation
  interest; reviews should read as quieter.

## 5. Signature element: the sprinkle scatter

**One** signature element for the whole page, per the brief. Everything else stays
disciplined around it.

**What it is:** a small reusable cluster of scattered circles — 10-14 per instance,
varied radius (2-14px) and opacity (10-70%), roughly 70% pink-tinted (`#F55C81` family)
and 30% teal-tinted (`watercourse-300`/`400`/`500`), with one or two outline-only circles
mixed in for texture — directly adapted from the corner decoration already used in the
bakery's own pricing graphics (`/Users/vovan/projects/normatisse/prices/standard1x-1080px/post/*.png`),
recolored into the site's fixed palette. This is the concrete answer to the brief's ask
for "a recurring motif tying the blob background to the bakery's watercolor-splatter
branding."

**Why this and not something invented from scratch:** it's the one piece of the
bakery's existing visual identity (outside the fixed site tokens) that this task is
allowed to draw from, and it reads as sugar/sprinkles scattered across a surface — apt
for a bakery, and distinct from the site's existing smooth gradient blobs without
contradicting them (both are soft, organic, non-geometric shapes).

**Construction:** a single SVG partial (future component, e.g. `SprinkleScatter.vue`,
named here for whichever task builds it), `viewBox="0 0 120 120"`, containing the fixed
set of circles baked in at design time (not randomized at runtime — a hand-placed
cluster reads as designed, a randomized one reads as noise). Each usage wraps it in a
plain `div` and varies only:
- `rotate-*` (never the same rotation twice on one page)
- `scale-*` (a small "trailing" instance vs. a larger "burst" instance)
- `-scale-x-100` to mirror horizontally
- `opacity-*` (keep at 40-60% wherever it sits near real content, so it never competes)

Always `absolute pointer-events-none select-none` with `aria-hidden="true"` — it is
decoration, never a layout participant.

**Where it appears (four placements total, each visually distinct from the others):**
1. Hero — large instance, bottom-right of the decoration column, bleeding toward the
   viewport edge, `rotate-[18deg]`.
2. Small instance, top-left of the hero text block, `rotate-[-12deg] scale-75`.
3. One corner of the Торти card (the flagship product card) — small, `scale-50`,
   tucked behind the photo's top-right corner so it peeks out, not floating free.
4. One corner of the bento strip (on at most one tile) and optionally one at the top of
   the reviews section, transitioning between "photos" and "proof" — mirrored
   (`-scale-x-100`) from placement 3 so it doesn't feel copy-pasted.

**What it explicitly is not:** it is not a repeating background pattern, not tiled, not
present on every card, and never symmetric across a section. If a later task finds
itself wanting a fifth or sixth placement, that's a sign to cut one instead — the whole
point of a signature element is scarcity making it noticeable.

## 6. Why these four sections don't repeat the same trick

A real risk with "give every section an asymmetric layout" is that the page ends up
using one trick four times, which reads as templated in its own way. Deliberately, each
section's asymmetry is a different structural device, justified by that section's own
content:

- **Hero:** asymmetric two-column split (content vs. decoration) — justified by needing
  room for the signature element without crowding the logo/CTA.
- **Products:** hierarchical size-by-importance grid, cards stay level/non-overlapping —
  justified by real differences in product complexity (Торти vs. Мадлен).
- **Bento:** overlapping rotated free-form tiles — justified by "photos scattered on a
  counter," the spec's own framing for this section.
- **Reviews:** masonry column flow, no explicit grid placement at all — justified by
  preserving screenshots' real aspect ratios and by an odd item count.

Only the sprinkle-scatter motif is deliberately reused, and only it, exactly per §5.

## 7. Background rhythm (restraint note)

Keep exactly two blurred-blob instances on the page — `BackgroundTop` before the hero,
`BackgroundBottom` after the last content section before the footer — matching the
homepage's existing restraint. Do not add more blob instances between interior sections;
stacking multiple blurred gradient blobs throughout a page is itself a recognizable
generic-AI-marketing-site tell. The sprinkle-scatter motif (§5) is what carries the
"connective tissue" job between interior sections instead — it's small and specific
rather than a repeated large atmospheric shape.

## 8. Self-critique summary (what changed and why)

Checked against the skill's three named generic-AI-design defaults:

1. **Cream background + high-contrast serif + terracotta accent.** Not applicable —
   palette is fixed to watercourse teal-green/white/pink, and Josefin Sans (a geometric
   sans, not a serif) is the only typeface. No drift toward this pattern anywhere above.
2. **Near-black background + single neon/acid accent.** Not applicable — the page stays
   light/white throughout, consistent with the existing homepage. No section proposed
   here goes dark.
3. **Broadsheet/newspaper: hairline rules, zero border-radius, dense columns.** Not
   applicable — cards use generous `rounded-2xl`/`rounded-sm` radii and photographic
   framing, not hairline-rule newspaper columns. The reviews masonry could have drifted
   this way (columns!) but the rotated, taped, white-framed cards keep it reading as a
   corkboard, not a newspaper.

Also checked and revised each section's **own first draft**, independent of the three
named patterns, because each one initially matched what I'd produce for any generic
marketing page:
- Hero: revised from centered-everything (matches this repo's own homepage) to
  left-aligned asymmetric split — see §1.
- Products: revised from four equal-size cards to a hierarchical bakery-counter layout
  sized by actual product complexity — see §2.
- Bento: revised from an evenly-spaced photo grid (also explicitly flagged in the spec
  itself) to overlapping rotated tiles at varied aspect ratios — see §3.
- Reviews: revised from a uniform cropped-to-match card grid to a masonry layout that
  preserves each screenshot's real proportions — see §4.

## 9. Notes for implementers

- Torty card's `UAccordion` and the other cards' plain price lists are both compatible
  with `UCard`/`UAccordion` per the spec's Section 2 — this note only fixes outer
  layout/sizing, not which exact Nuxt UI primitives render the inner content.
- The sprinkle-scatter SVG does not exist yet; whichever task builds the first section
  that needs it (likely Task 2, Hero) should create it once as a shared component so
  Tasks 6/7 reuse the same file rather than each inventing their own version.
- Aspect ratios given above assume the real photos (Task 3b, not yet sourced) are shot
  loosely enough to be cropped to these ratios via `object-cover`; if a specific sourced
  photo can't support its assigned ratio without losing the subject, swap that one
  tile's ratio rather than force-cropping — the asymmetry tolerates uneven ratios fine.
