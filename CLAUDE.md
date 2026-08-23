# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install            # postinstall runs `nuxt prepare` (generates .nuxt, incl. eslint config)
npm run dev            # dev server, :3000 (Nuxt increments if taken — read the printed URL)
npm run generate       # static build → .output/public — this is what CI deploys
npm run build          # server build; not used by the deploy path
npm run preview        # preview the build
npx eslint .           # lint; there is no `lint` script
npx eslint --fix .
```

`public/_headers` (CSP, HSTS, cache-control) is a Cloudflare Pages feature. `nuxt dev` and plain static servers ignore it. To exercise it locally:

```bash
npm run generate
npx wrangler pages dev .output/public --port 3100 --ip 127.0.0.1
curl -sI http://127.0.0.1:3100/
```

**There is no test runner.** `@nuxt/test-utils` is installed and registered as a module (`.nuxtrc` pins its setup), but `package.json` has no `test` script and no test files exist. Wire up Vitest before claiming a test command works.

Site audits use the `squirrel` CLI (`squirrel audit <url> -C surface --refresh`); config in `squirrel.toml`.

## Deploy

Push to `main` → `.github/workflows/deploy.yml` → `npm run generate` → `wrangler pages deploy ./.output/public --project-name=normatisse-com --branch=main`. Node 22. The root `dist` symlink points at `.output/public`.

## Architecture

Three-page Nuxt 4 brochure site (Ukrainian, `lang="uk"`), statically generated to Cloudflare Pages: `/` (splash, two offer cards), `/bakery` (the real landing page), `/privacy`.

### Static-only constraints

Nothing runs at request time. Server routes exist only to be prerendered — `server/routes/sitemap.xml.ts` is emitted because `nitro.prerender.routes` names it; a new server route without a matching entry produces nothing in the deploy.

`nitro.prerender.autoSubfolderIndex: false` is load-bearing: it emits `bakery.html` rather than `bakery/index.html`, which is what stops Cloudflare from 308-ing `/bakery` → `/bakery/`. Don't remove it.

`public/_headers` sets `default-src 'self'`. **Any third-party script, font host, image host, or `fetch` target must be added there or it works locally and is blocked in production only.** The site currently makes zero third-party requests, and `pages/privacy.vue` states that in writing — keep the two in sync.

### Assets

- **Icons are fully bundled** (`icon.provider: 'none'`, `fallbackToApi: false`). `clientBundle.scan` only sees this project's templates, so icons referenced from composables/TS, or reached for internally by Nuxt UI, must be listed in `NUXT_UI_ICONS` / `DYNAMIC_ICONS` at the top of `nuxt.config.ts`. Miss one and it renders *nothing* — no error, no network fallback.
- **`<NuxtImg>` needs `preset="photo"`** for WebP. `image.format` only applies to `<NuxtPicture>`; without the preset IPX passes the source JPEG through.
- **`width`/`height` on `<img>` must match the file's intrinsic ratio.** `logo-bakery-full.svg` is `331.61 × 48.12`; mismatched attributes reserve the wrong box and cause CLS on load (Tailwind preflight forces `height: auto`).

### Design system

**`docs/design-system.md` is a mandatory read before any UI/UX change** — colour and contrast overrides, surface order, type roles, layout and CTA rhythm, media bands, rails, shape/elevation, the button scale, motion, component contracts, and the accumulated gotchas. It is the spec; the code is the implementation.

**Updating it is mandatory whenever a UI/UX decision is made.** A new token, a changed spacing rule, a component contract, a rejected approach and why — it goes in the document in the same change, not afterwards. A decision that only exists in the code is a decision the next person will unknowingly reverse.

Two implementation layers, both must be checked before adding styles:

- `assets/css/main.css` — Tailwind v4 `@theme static` tokens (`watercourse` / `blush` / `stone` palettes, `--brand-surface*`, `--brand-radius-*`) plus the `.brand-*` utility classes (`brand-band`, `brand-band__inner`, `brand-card`, `brand-rail`, `brand-heading`, `brand-focus`, `brand-skip-link`, `brand-reveal`, `brand-parallax`).
- `app.config.ts` — Nuxt UI slot/variant overrides. Buttons are pill-shaped with an explicit `cursor-pointer` (Tailwind v4 dropped it) and a documented **1:3 padding-y : padding-x ratio** across the size scale. Keep that ratio when adding sizes.

Never import Tailwind again inside an SFC `<style>` block — it duplicates the whole bundle.

### Components

- `Bakery*` — page sections of `/bakery`, composed in `pages/bakery.vue`.
- `Brand*` — reusable primitives. `BrandSection` owns *all* section rhythm: surface colour, vertical padding, curved top edge, and the reveal trigger. Sections themselves never set background or outer padding. `BrandRail` is the mobile scroll-snap carousel that becomes a grid at a breakpoint. `BrandLightbox` is the gallery viewer.
- `Background*` / `*Sprinkle*` — decorative, `aria-hidden`.

### Motion

- `useReveal` is progressive enhancement: elements render at their final state and the composable adds `.is-armed` then `.is-revealed`. A failed or absent script leaves the page fully visible. No-op under `prefers-reduced-motion: reduce`.
- `useParallax` is a **fallback only** — it runs where CSS `animation-timeline: view()` is unsupported (Firefox today) and idles elsewhere. It measures the *parent* element, because the target carries the transform the loop writes and reading its own rect feeds back into the progress.

### Head, SEO, structured data

- `app.vue` owns the site-wide canonical (trailing slash stripped), `og:url`/`og:type`/`og:locale`, the skip link, and the `<main>` landmark. Pages declare only their own title/description/schema.
- JSON-LD is emitted as **separate flat `<script>` blocks, deliberately not a `@graph`** — several validators only read a script's top-level `@type`. Nodes are tied together by `@id` (`/#organization` is the root; `/bakery#business` points its `parentOrganization` at it).
- `datePublished` / `dateModified` are hand-maintained literals. They mean "the copy changed", not "the site was rebuilt" — never derive them from the build.
- `useBakeryContacts()` is the single source of truth for phone, Instagram, and the four order channels. The footer, contact section, privacy page, and the `Bakery` schema all read it — change it there, not at call sites.

### Deliberate non-fixes

Audit findings left alone on purpose: no visible author byline or content dates (editorial furniture, wrong for a brochure site); no `streetAddress`/`postalCode` in the schema (home bakery — publishing a home address is the owner's call). Don't "fix" these without asking.

## Conventions

- 4-space indent in `.vue` and `.ts` under `components/`, `composables/`, `pages/`, `server/`; 2-space in `nuxt.config.ts` and `eslint.config.mjs`. Match the file you're in.
- Comments explain *why* a non-obvious constraint exists (a browser quirk, a spec rule, a host behaviour). Keep them short; don't narrate what the code does.
- All user-facing copy is Ukrainian.
- `.env` exists at the repo root and is gitignored — don't read or commit it.
