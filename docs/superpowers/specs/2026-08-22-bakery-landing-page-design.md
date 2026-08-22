# Bakery Landing Page — Design Spec

**Date:** 2026-08-22
**Status:** Approved by user, pending implementation plan

## Purpose

Add a Ukrainian-language landing page for Normatisse Bakery (a private-entrepreneur
side of the existing Normatisse umbrella site) at a new route. The current homepage
(`pages/index.vue`) stays as the shared landing page linking to Bakery and Photography;
it is not replaced.

## Scope

In scope: a single new page at `/bakery` with Hero, Products/Pricing (with embedded
product photos), a small photo bento strip, Reviews, CTA/Contact, and Footer sections,
using real content sourced from the bakery's Instagram and from pre-made local pricing
assets. Out of scope: an order/checkout form (explicitly deferred to a future task),
any change to `/pages/photography` or equivalent, and any CMS/admin tooling.

## Route & Page Shell

- New file: `pages/bakery.vue`.
- Reuses existing patterns from `pages/index.vue`: `UContainer`, `BackgroundTop` /
  `BackgroundBottom` decorative blobs, `useSeoMeta`, the `<style lang="css">` block
  importing `tailwindcss` / `@nuxt/ui`.
- Reuses existing design tokens only — no new colors, fonts, or CSS variables:
  - `watercourse` color scale (`assets/css/main.css`), primary = `watercourse-500`.
  - `.logo-font` (`#00674F`, Josefin Sans bold) for headings/brand.
  - `.sub-logo-font` (`#F55C81`, Josefin Sans bold italic) for accents/prices.
  - Josefin Sans throughout (already loaded via `@nuxt/fonts`).
- Homepage's existing bakery teaser card (`pages/index.vue`, `INSTAGRAM_BAKERY_LINK`)
  should point to `/bakery` instead of the raw Instagram link, since a proper landing
  page now exists.

## Section 1 — Hero

- Bakery logo (`/images/logo-bakery-full.svg`, already in `public/images/`).
- Tagline: "make day sweeter" + a short Ukrainian line in the same voice as the
  homepage's "Ділюся з вами частинкою себе."
- Single CTA button scrolling to `#products` (mirrors homepage's "Що пропонуємо?"
  pattern: `UButton` with `to="#products"`).
- No contact buttons here — contact only appears once, in the CTA/Contact section.

## Section 2 — Products & Pricing (with embedded photos)

Native Nuxt UI components (`UAccordion` and/or `UCard`), not embedded images of the
pre-made pricing graphics — the graphics use a different type system (Montserrat /
Cormorant Garamond) that would visually clash with the site's Josefin Sans +
watercourse/pink system. The pre-made PNGs in `/Users/vovan/projects/normatisse/prices`
are used only as the **data source** for the copy below. Each product card also carries
one real product photo (sourced per Section 3b below) so pricing and visual proof live
together — this replaces having a separate photo carousel.

Product data, extracted from `standard1x-1080px/post/*.png`:

**Торти** (конструктор + готові смаки)
- Конструктор: від 900 грн/кг. Бісквіт: ванільний / шоколадний / кавовий / кокосовий /
  лимонний. Мус: шоколадний (білий/молочний/темний), ягідний (вишневий/малиновий/
  лохиновий/ожиновий/полуничний), Бейліс, Кіндер, Орео. Начинка: ягідний конфітюр або
  ганаш на білому шоколаді (кокосовий/кавовий/фісташковий). Крем: крем-чіз на вершках
  (за бажанням з шоколадом). Покриття: крем-чіз на маслі або шоколадний ганаш. Інші
  варіанти — за запитом. Дизайн рахується окремо; покриття крем-чіз на маслі/ганаш —
  окремо; не працюють з велюром.
- Готові смаки: Фісташка-малина — 900 грн/кг; Кава-Бейліс — 900 грн/кг; Вишня-шоколад —
  850 грн/кг; Кокос-малина — 850 грн/кг; Ягідний мікс — 850 грн/кг. (Each with the short
  composition line from the source graphic.)

**Кекси** (великі порційні, без «шапочки»)
- Шоколадні (з шоколадними краплями і нутеллою в середині, посипані фундуком): x9 — 594
  грн, x6 — 396 грн.
- Фундучні (з фундучною пастою, шоколадними краплями і нутеллою в середині, посипані
  пеканом): x9 — 693 грн, x6 — 462 грн.

**Капкейки** (шоколадні, ванільні, карамельні, лимонно-макові)
- x12 — 1020 грн, x9 — 835 грн, x6 — 555 грн, x4 — 360 грн.
- Начинка: нутелла, солона карамель, вишня, полуниця, малина. Верхівка: крем-чіз на
  вершках. Мінімальний шоколадний дизайн входить у вартість; несезонні ягоди, квіти,
  топер — окремо.

**Мадлен** (шоколадний, ванільний, кавовий, лимонно-маковий)
- Без начинки — 40 грн/шт; з начинкою/капсулою — 45 грн/шт (від 12 шт одного смаку −5%).
- Асорті: без начинки x8 — 360 грн, x12 — 540 грн; з начинкою (без капсул) x8 — 400 грн,
  x12 — 600 грн.
- Начинка: нутелла, солона карамель, шоколадна, піпетки з Бейліс. Покриття: білий,
  молочний, темний шоколад.

## Section 3 — Photos

### 3a. Bento strip (replaces a standalone "Gallery" section)

No carousel. A small asymmetric bento-style strip of 3–4 photos placed between
Products and Reviews, for shots that don't map to one specific price card (packaging,
process/behind-the-scenes, cross-section cuts). Varied tile sizes, slight offset/
rotation, echoing the organic feel of the existing `BackgroundTop`/`BackgroundBottom`
blob shapes rather than a rigid grid.

### 3b. Sourcing (not yet executed)

Real photos for both the product cards (3b) and the bento strip come from the bakery's
Instagram post grid. Source the actual `<img>` CDN URLs from the DOM (not full-page
screenshots — no Instagram chrome) and download them directly, then self-host under
`public/images/bakery/gallery/`. Target: one hero photo per product line (Торти, Кекси,
Капкейки, Мадлен) plus 3–4 extra shots for the bento strip.

## Section 4 — Reviews

Per the original instruction, reviews stay as real screenshots (not retyped text) —
authenticity matters more here than visual consistency. Screenshots are cropped to
remove Instagram chrome (status bar, UI controls) before self-hosting under
`public/images/bakery/reviews/`. 5 candidates already identified during research, each
with a real IG username where visible. Presented as a small grid/row of quote-card
images, not a carousel.

## Section 5 — CTA / Contact

Contact source: Normatisse Bakery business card
(`/Users/vovan/projects/normatisse/graphics/Normatisse Bakery Business Card.pdf`).
Phone number **073 470 02 63** (`+380734700263`) is shared across phone, Telegram, and
Viber. Instagram handle: `@normatisse.bakery`.

Four buttons:
- Instagram DM — `https://instagram.com/normatisse.bakery`
- Telegram — `https://t.me/+380734700263`
- Viber — `viber://chat?number=%2B380734700263`
- Phone — `tel:+380734700263`

Short note under the buttons that an order form is coming later (out of scope here).

## Section 6 — Footer

Same pattern as the homepage: `USeparator` + `&copy; {{ year }} All rights reserved.`

## Data Flow / Assets Summary

- Pricing copy: manually transcribed from `/Users/vovan/projects/normatisse/prices`
  PNGs into the page (no images embedded), as listed in Section 2.
- Product/bento photos: downloaded from Instagram CDN (real `<img>` src, not
  screenshots), self-hosted in `public/images/bakery/gallery/`. **Not yet executed.**
- Review screenshots: cropped from the research screenshots already captured, chrome
  removed, self-hosted in `public/images/bakery/reviews/`. **Not yet executed.**
- Logo: existing `public/images/logo-bakery-full.svg` (no changes needed).

## Out of Scope

- Order/checkout form (explicitly deferred).
- Any change to the photography side of the site.
- CMS/admin tooling for editing prices or content later.

## Open Risks

- Instagram CDN URLs can be session/expiry-limited; downloads must happen in the same
  browsing session used for research, or be re-fetched if stale.
- Review screenshot cropping is manual per-image; no automated crop tooling planned.
