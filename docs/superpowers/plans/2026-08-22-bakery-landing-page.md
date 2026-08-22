# Bakery Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Ukrainian-language `/bakery` landing page for Normatisse Bakery inside the existing Nuxt 4 site, using the site's existing design tokens and real content sourced from Instagram and local pricing assets.

**Architecture:** One new page (`pages/bakery.vue`) composed of small, self-contained, prop-free presentation components under `components/` (flat, matching existing convention), each responsible for one section. All content is static and lives inline in the components — no CMS, no external data fetching at runtime. Visual/layout craft (not color or type, which are fixed) is produced via the `frontend-design` skill in Task 1, and every later task's code sample is a structural baseline that must be refined against that direction, not copied verbatim.

**Tech Stack:** Nuxt 4, Vue 3 `<script setup>`, Nuxt UI 4 components (`UContainer`, `UButton`, `UAccordion`, `UCard`, `USeparator`), Tailwind CSS v4 (`@theme`), existing `watercourse` color tokens, Josefin Sans via `@nuxt/fonts`, `frontend-design` skill for layout/signature-element direction.

**Spec:** `docs/superpowers/specs/2026-08-22-bakery-landing-page-design.md`

## Global Constraints

- Use only existing design tokens: `watercourse` color scale, `.logo-font` (#00674F), `.sub-logo-font` (#F55C81), Josefin Sans. No new colors or fonts — per the `frontend-design` skill's own rule, "where the brief pins down a visual direction, follow it exactly," and this brief pins down color and type.
- Layout, imagery treatment, and each section's one signature element are open for creative direction and must go through the `frontend-design` skill (Task 1) before later tasks' code is finalized — later tasks' code blocks are a structural baseline, not final markup to copy verbatim.
- No order/checkout form — CTA/Contact section only links out to existing channels.
- `pages/index.vue` stays as-is except its bakery teaser link, which must point to `/bakery` instead of the raw Instagram URL.
- No standalone "Gallery" section and no carousel — product photos live inside the Products/Pricing cards; extra photos go in a small asymmetric bento strip.
- Reviews are real screenshots (cropped, no Instagram chrome), not retyped text.
- Contact number for phone, Telegram, and Viber is `+380734700263` (`073 470 02 63`); Instagram handle is `@normatisse.bakery`.
- Follow the existing codebase convention of explicitly importing components in `<script setup>` even though Nuxt auto-imports them (see `pages/index.vue`).
- Every new page/component must render correctly under `npm run dev` and pass `npm run build` before being considered done.

---

### Task 1: Visual direction pass (frontend-design skill)

**Files:**
- Create: `docs/superpowers/specs/2026-08-22-bakery-landing-page-visual-direction.md`

**Interfaces:** None — this task produces a short design note that Tasks 2, 4 (photo strip), 6, and 7 must follow when finalizing markup/classes. It does not touch application code.

- [ ] **Step 1: Invoke the `frontend-design` skill**

Brief it with: subject = Normatisse Bakery, a home-bakery landing page for Торти/Кекси/Капкейки/Мадлен; audience = Ukrainian customers ordering custom cakes/treats; page's single job = get the visitor from "what do they make and how much" to a DM/call. Fixed inputs (non-negotiable, per the skill's own "brief wins" rule): color palette is `watercourse-{50..950}` plus `#00674F` (`.logo-font`) and `#F55C81` (`.sub-logo-font`); typeface is Josefin Sans for everything (no second typeface to source); existing decorative motif is the blurred blob shapes in `components/BackgroundTop.vue`/`BackgroundBottom.vue`. Open axes: layout concept per section, how the real product photos (Task 3) are framed/cropped, and one signature element for the page.

- [ ] **Step 2: Run the skill's brainstorm → critique pass**

Produce the compact token system the skill asks for, but with color/type sections marked "fixed, see above" instead of invented — spend the actual creative effort on layout concepts (ASCII wireframes) for: Hero, the 4 product cards, the bento photo strip, and the reviews grid, plus the one signature element for the whole page (e.g., a recurring motif tying the blob background to the bakery's watercolor-splatter branding seen in the `/prices` graphics). Self-critique against the skill's three generic-AI-design patterns and revise anything that reads as a template default (plain centered hero + big CTA button, uniform equal-size card grid, evenly-spaced photo grid all count as template defaults to push past).

- [ ] **Step 3: Write the direction note**

Save the finalized layout concepts, the signature element, and any concrete class/structure decisions (e.g., specific grid-template shapes, image aspect ratios, hover/scroll interactions) to `docs/superpowers/specs/2026-08-22-bakery-landing-page-visual-direction.md`.

- [ ] **Step 4: Commit**

```bash
git add docs/superpowers/specs/2026-08-22-bakery-landing-page-visual-direction.md
git commit -m "docs: add visual direction note for bakery landing page"
```

---

### Task 2: Feature branch + page shell with Hero section

**Files:**
- Create: `pages/bakery.vue`
- Create: `components/BakeryHero.vue`

**Interfaces:**
- `BakeryHero.vue`: no props, no emits — fully self-contained. Renders logo, tagline, and a CTA linking to `#products`, per Task 1's hero layout concept.
- `pages/bakery.vue`: imports and renders `BakeryHero`, plus `BackgroundTop`/`BackgroundBottom` exactly as `pages/index.vue` does (unless Task 1's direction note calls for adapting the blob motif — in that case, adapt `BackgroundTop`/`BackgroundBottom` usage accordingly, not the shared components themselves, since those are also used by the homepage).

- [ ] **Step 1: Create the feature branch**

```bash
git checkout -b feature/bakery-landing-page
```

- [ ] **Step 2: Create `components/BakeryHero.vue` per Task 1's hero direction**

Structural baseline (refine layout/classes per the direction note; keep the content below):

```vue
<template>
    <div class="text-center">
        <div class="flex justify-center pb-3">
            <img class="max-w-md" src="/images/logo-bakery-full.svg" alt="Normatisse Bakery">
        </div>
        <p class="sub-logo-font text-2xl">make day sweeter</p>
        <p class="mt-4 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            Домашня випічка на замовлення: торти, кекси, капкейки та мадлен у Львові.
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
            <UButton variant="solid" color="primary" size="xl" to="#products">
                Переглянути асортимент
            </UButton>
        </div>
    </div>
</template>
```

- [ ] **Step 3: Create `pages/bakery.vue` with the hero mounted**

```vue
<script setup lang="ts">
import BackgroundTop from '@/components/BackgroundTop.vue';
import BackgroundBottom from '@/components/BackgroundBottom.vue';
import BakeryHero from '@/components/BakeryHero.vue';

useSeoMeta({
    title: 'Normatisse Bakery — домашня випічка на замовлення',
    ogTitle: 'Normatisse Bakery — домашня випічка на замовлення',
    description: 'Торти, кекси, капкейки та мадлен на замовлення. Make day sweeter.',
    ogDescription: 'Торти, кекси, капкейки та мадлен на замовлення. Make day sweeter.',
    ogImage: '/images/logo-bakery-full.svg',
    twitterCard: 'summary_large_image',
})
</script>

<template>
    <UContainer>
        <div class="relative isolate px-6 pt-14 lg:px-8">
            <BackgroundTop />
            <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                <BakeryHero />
            </div>
            <BackgroundBottom />
        </div>
    </UContainer>
</template>

<style lang="css">
@import "tailwindcss";
@import "@nuxt/ui";
</style>
```

- [ ] **Step 4: Verify it renders**

Run: `npm run dev` (leave running), then in another terminal:

```bash
curl -s http://localhost:3000/bakery | grep -o "make day sweeter"
```

Expected: `make day sweeter` printed once. Also open `http://localhost:3000/bakery` with the `agent-browser` skill and take a screenshot to confirm the logo, tagline, and CTA button render without layout errors, and that the hero matches Task 1's direction rather than reading as a generic centered-hero-with-button template.

- [ ] **Step 5: Commit**

```bash
git add pages/bakery.vue components/BakeryHero.vue
git commit -m "feat: add bakery landing page hero section"
```

---

### Task 3: Products & Pricing section (data + component, no photos yet)

**Files:**
- Create: `components/BakeryProducts.vue`
- Modify: `pages/bakery.vue` (mount `BakeryProducts` after the hero, add `id="products"` wrapper)

**Interfaces:**
- `BakeryProducts.vue`: no props. Defines a local `interface Product { slug: string; name: string; note?: string; photo?: string; variants: { label: string; price: string }[]; description: string[] }` and a `const products: Product[]` array with the four product lines. `photo` fields are left `undefined` in this task (Task 5 fills them in) and the template must render correctly with `photo` absent (fallback: no `<img>` rendered, card still shows text).
- Consumed by `pages/bakery.vue`, which renders `<BakeryProducts id="products" />` — since Vue attrs fall through automatically, no `id` prop needs to be declared explicitly.

- [ ] **Step 1: Create `components/BakeryProducts.vue`**

Structural baseline for the data and template — refine the layout (card shapes/spans, how photos will be framed) per Task 1's product-card layout concept, but keep the data below verbatim:

```vue
<script setup lang="ts">
interface ProductVariant {
    label: string;
    price: string;
}

interface Product {
    slug: string;
    name: string;
    note?: string;
    photo?: string;
    variants: ProductVariant[];
    description: string[];
}

const products: Product[] = [
    {
        slug: 'torty',
        name: 'Торти',
        note: 'Конструктор — від 900 грн/кг',
        variants: [
            { label: 'Фісташка-малина', price: '900 грн/кг' },
            { label: 'Кава-Бейліс', price: '900 грн/кг' },
            { label: 'Вишня-шоколад', price: '850 грн/кг' },
            { label: 'Кокос-малина', price: '850 грн/кг' },
            { label: 'Ягідний мікс', price: '850 грн/кг' },
        ],
        description: [
            'Бісквіт: ванільний, шоколадний, кавовий, кокосовий, лимонний.',
            'Мус: шоколадний (білий/молочний/темний), ягідний, Бейліс, Кіндер, Орео.',
            'Начинка: ягідний конфітюр або ганаш на білому шоколаді.',
            'Крем: крем-чіз на вершках. Покриття: крем-чіз на маслі або шоколадний ганаш.',
            'Дизайн та покриття крем-чіз на маслі / ганаш рахуються окремо. Інші варіанти — за запитом. Не працюю з велюром.',
        ],
    },
    {
        slug: 'keksy',
        name: 'Кекси',
        note: 'Великі порційні, без «шапочки»',
        variants: [
            { label: 'Шоколадні, x9', price: '594 грн' },
            { label: 'Шоколадні, x6', price: '396 грн' },
            { label: 'Фундучні, x9', price: '693 грн' },
            { label: 'Фундучні, x6', price: '462 грн' },
        ],
        description: [
            'Шоколадні: з шоколадними краплями і нутеллою в середині, посипані фундуком.',
            'Фундучні: з фундучною пастою, шоколадними краплями і нутеллою в середині, посипані пеканом.',
        ],
    },
    {
        slug: 'kapkeiky',
        name: 'Капкейки',
        note: 'Шоколадні, ванільні, карамельні, лимонно-макові',
        variants: [
            { label: 'x12', price: '1020 грн' },
            { label: 'x9', price: '835 грн' },
            { label: 'x6', price: '555 грн' },
            { label: 'x4', price: '360 грн' },
        ],
        description: [
            'Начинка: нутелла, солона карамель, вишня, полуниця, малина.',
            'Верхівка: крем-чіз на вершках. Мінімальний шоколадний дизайн входить у вартість.',
            'Несезонні ягоди, квіти, топер рахуються окремо.',
        ],
    },
    {
        slug: 'madlen',
        name: 'Мадлен',
        note: 'Шоколадний, ванільний, кавовий, лимонно-маковий',
        variants: [
            { label: 'Без начинки, за шт', price: '40 грн' },
            { label: 'З начинкою/капсулою, за шт', price: '45 грн' },
            { label: 'Асорті без начинки, x8', price: '360 грн' },
            { label: 'Асорті без начинки, x12', price: '540 грн' },
            { label: 'Асорті з начинкою, x8', price: '400 грн' },
            { label: 'Асорті з начинкою, x12', price: '600 грн' },
        ],
        description: [
            'Від 12 шт одного смаку — знижка 5%.',
            'Начинка: нутелла, солона карамель, шоколадна, піпетки з Бейліс.',
            'Покриття: білий, молочний, темний шоколад.',
        ],
    },
];
</script>

<template>
    <div>
        <h2 class="logo-font text-3xl text-center mb-8">Асортимент та ціни</h2>
        <div class="grid gap-6 sm:grid-cols-2">
            <UCard v-for="product in products" :key="product.slug">
                <template #header>
                    <img
                        v-if="product.photo"
                        :src="product.photo"
                        :alt="product.name"
                        class="w-full h-48 object-cover rounded-t-lg"
                    >
                    <h3 class="logo-font text-2xl mt-2">{{ product.name }}</h3>
                    <p v-if="product.note" class="text-sm text-gray-500">{{ product.note }}</p>
                </template>

                <ul class="divide-y divide-default">
                    <li
                        v-for="variant in product.variants"
                        :key="variant.label"
                        class="flex justify-between py-2"
                    >
                        <span>{{ variant.label }}</span>
                        <span class="sub-logo-font">{{ variant.price }}</span>
                    </li>
                </ul>

                <template #footer>
                    <p v-for="(line, i) in product.description" :key="i" class="text-sm text-gray-500 mb-1">
                        {{ line }}
                    </p>
                </template>
            </UCard>
        </div>
    </div>
</template>
```

- [ ] **Step 2: Mount it in `pages/bakery.vue`**

Edit `pages/bakery.vue`: add the import and mount below the hero block, wrapped so the hero's CTA anchor target exists.

```vue
<script setup lang="ts">
import BackgroundTop from '@/components/BackgroundTop.vue';
import BackgroundBottom from '@/components/BackgroundBottom.vue';
import BakeryHero from '@/components/BakeryHero.vue';
import BakeryProducts from '@/components/BakeryProducts.vue';

useSeoMeta({
    title: 'Normatisse Bakery — домашня випічка на замовлення',
    ogTitle: 'Normatisse Bakery — домашня випічка на замовлення',
    description: 'Торти, кекси, капкейки та мадлен на замовлення. Make day sweeter.',
    ogDescription: 'Торти, кекси, капкейки та мадлен на замовлення. Make day sweeter.',
    ogImage: '/images/logo-bakery-full.svg',
    twitterCard: 'summary_large_image',
})
</script>

<template>
    <UContainer>
        <div class="relative isolate px-6 pt-14 lg:px-8">
            <BackgroundTop />
            <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                <BakeryHero />
            </div>
            <BackgroundBottom />
        </div>

        <div id="products" class="relative z-0 pb-16">
            <BakeryProducts />
        </div>
    </UContainer>
</template>

<style lang="css">
@import "tailwindcss";
@import "@nuxt/ui";
</style>
```

- [ ] **Step 3: Verify**

With `npm run dev` running, open `http://localhost:3000/bakery` via the `agent-browser` skill, screenshot it, and confirm: clicking "Переглянути асортимент" scrolls to four product cards (Торти, Кекси, Капкейки, Мадлен), each showing variants and prices, no broken layout, no console errors (`agent-browser` console/log check).

- [ ] **Step 4: Commit**

```bash
git add pages/bakery.vue components/BakeryProducts.vue
git commit -m "feat: add products and pricing section to bakery page"
```

---

### Task 4: Source real product and bento-strip photos from Instagram

**Files:**
- Create: `public/images/bakery/gallery/torty.jpg`
- Create: `public/images/bakery/gallery/keksy.jpg`
- Create: `public/images/bakery/gallery/kapkeiky.jpg`
- Create: `public/images/bakery/gallery/madlen.jpg`
- Create: `public/images/bakery/gallery/bento-1.jpg`
- Create: `public/images/bakery/gallery/bento-2.jpg`
- Create: `public/images/bakery/gallery/bento-3.jpg`

**Interfaces:** None — this task produces static assets consumed by Tasks 5 and 6. No code changes.

This task needs a live, already-authenticated Instagram session (established earlier in this project via the `agent-browser` skill). It downloads the *real* `<img>` CDN source, not a screenshot, so no Instagram chrome is ever present in the file.

- [ ] **Step 1: Load the agent-browser command reference**

```bash
agent-browser skills get core --full
```

Use this to confirm the exact command for reading a DOM element's `src` attribute in the currently-installed version (e.g. an `eval`/`js` subcommand). The steps below assume such a command exists; substitute the exact syntax the reference documents.

- [ ] **Step 2: Open the bakery Instagram profile grid**

```bash
agent-browser open https://www.instagram.com/normatisse.bakery/
agent-browser snapshot -i
```

Identify, from the accessibility tree, seven post thumbnails that visually match: one torte, one kekc (кекс), one cupcake (капкейк), one madeleine (мадлен), and three miscellaneous shots (packaging, process, cross-section) suitable for the bento strip.

- [ ] **Step 3: For each of the 7 chosen posts, open it and extract the real image URL**

```bash
agent-browser click @eN   # open the post identified in Step 2
agent-browser snapshot -i # re-resolve refs after navigation
```

Use the command found in Step 1 to read the `src` (or highest-res entry in `srcset`) of the post's main `<img>` element. Record the URL.

- [ ] **Step 4: Download each URL directly (no screenshot, no chrome)**

```bash
curl -sL "<extracted-url-for-torte>" -o public/images/bakery/gallery/torty.jpg
curl -sL "<extracted-url-for-keksy>" -o public/images/bakery/gallery/keksy.jpg
curl -sL "<extracted-url-for-kapkeiky>" -o public/images/bakery/gallery/kapkeiky.jpg
curl -sL "<extracted-url-for-madlen>" -o public/images/bakery/gallery/madlen.jpg
curl -sL "<extracted-url-for-bento-1>" -o public/images/bakery/gallery/bento-1.jpg
curl -sL "<extracted-url-for-bento-2>" -o public/images/bakery/gallery/bento-2.jpg
curl -sL "<extracted-url-for-bento-3>" -o public/images/bakery/gallery/bento-3.jpg
```

- [ ] **Step 5: Verify each file is a real image, not an HTML error page**

```bash
file public/images/bakery/gallery/*.jpg
```

Expected: every line reports `JPEG image data`, not `HTML document text`. If Instagram returned a login-wall HTML page for any URL, the session expired — re-authenticate via `agent-browser` (headed browser, manual login as done earlier in this project) and re-run Steps 2–4 for the failing file only.

- [ ] **Step 6: Commit**

```bash
git add public/images/bakery/gallery/
git commit -m "feat: add real product photos for bakery page"
```

---

### Task 5: Wire product photos into pricing cards, build the bento photo strip

**Files:**
- Modify: `components/BakeryProducts.vue`
- Create: `components/BakeryPhotoStrip.vue`
- Modify: `pages/bakery.vue`

**Interfaces:**
- `BakeryProducts.vue`: set the `photo` field on each of the four `products` entries to its downloaded path (e.g. `/images/bakery/gallery/torty.jpg`). No structural change beyond whatever Task 1's direction called for — the template already handles `photo` conditionally from Task 3.
- `BakeryPhotoStrip.vue`: no props. Renders the 3 bento images from `/images/bakery/gallery/bento-{1,2,3}.jpg` per Task 1's photo-strip layout concept — varied tile sizes/treatment, no carousel/slider library, not a uniform evenly-spaced grid.

- [ ] **Step 1: Set the `photo` field for each product in `components/BakeryProducts.vue`**

```ts
{
    slug: 'torty',
    name: 'Торти',
    photo: '/images/bakery/gallery/torty.jpg',
    // ...unchanged
},
{
    slug: 'keksy',
    name: 'Кекси',
    photo: '/images/bakery/gallery/keksy.jpg',
    // ...unchanged
},
{
    slug: 'kapkeiky',
    name: 'Капкейки',
    photo: '/images/bakery/gallery/kapkeiky.jpg',
    // ...unchanged
},
{
    slug: 'madlen',
    name: 'Мадлен',
    photo: '/images/bakery/gallery/madlen.jpg',
    // ...unchanged
},
```

- [ ] **Step 2: Create `components/BakeryPhotoStrip.vue`**

Structural baseline — refine tile spans/rotation/treatment per Task 1's signature-element direction rather than a plain even bento grid:

```vue
<template>
    <div class="grid grid-cols-4 grid-rows-2 gap-4 h-80 sm:h-96">
        <img
            src="/images/bakery/gallery/bento-1.jpg"
            alt="Normatisse Bakery"
            class="col-span-2 row-span-2 w-full h-full object-cover rounded-2xl shadow-md -rotate-1"
        >
        <img
            src="/images/bakery/gallery/bento-2.jpg"
            alt="Normatisse Bakery"
            class="col-span-2 row-span-1 w-full h-full object-cover rounded-2xl shadow-md rotate-1"
        >
        <img
            src="/images/bakery/gallery/bento-3.jpg"
            alt="Normatisse Bakery"
            class="col-span-2 row-span-1 w-full h-full object-cover rounded-2xl shadow-md -rotate-1"
        >
    </div>
</template>
```

- [ ] **Step 3: Mount `BakeryPhotoStrip` between Products and Reviews in `pages/bakery.vue`**

```vue
<script setup lang="ts">
import BackgroundTop from '@/components/BackgroundTop.vue';
import BackgroundBottom from '@/components/BackgroundBottom.vue';
import BakeryHero from '@/components/BakeryHero.vue';
import BakeryProducts from '@/components/BakeryProducts.vue';
import BakeryPhotoStrip from '@/components/BakeryPhotoStrip.vue';

// ...useSeoMeta unchanged
</script>

<template>
    <UContainer>
        <div class="relative isolate px-6 pt-14 lg:px-8">
            <BackgroundTop />
            <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                <BakeryHero />
            </div>
            <BackgroundBottom />
        </div>

        <div id="products" class="relative z-0 pb-16">
            <BakeryProducts />
        </div>

        <div class="pb-16">
            <BakeryPhotoStrip />
        </div>
    </UContainer>
</template>
```

- [ ] **Step 4: Verify**

Screenshot `http://localhost:3000/bakery` via `agent-browser`: each product card now shows its real photo above the name; the bento strip below shows 3 photos at varied sizes with slight rotation, no layout overflow on mobile width (test at 375px viewport too).

- [ ] **Step 5: Commit**

```bash
git add components/BakeryProducts.vue components/BakeryPhotoStrip.vue pages/bakery.vue
git commit -m "feat: wire real photos into product cards and bento strip"
```

---

### Task 6: Crop and source review screenshots

**Files:**
- Create: `public/images/bakery/reviews/review-1.jpg`
- Create: `public/images/bakery/reviews/review-2.jpg`
- Create: `public/images/bakery/reviews/review-3.jpg`
- Create: `public/images/bakery/reviews/review-4.jpg`
- Create: `public/images/bakery/reviews/review-5.jpg`

**Interfaces:** None — static assets consumed by Task 7.

The raw research screenshots (`rev-1.png` through `rev-15.png`) already exist in this session's scratchpad directory from earlier Instagram research. This task selects the 5 clearest ones and crops out Instagram's story-viewer chrome (top progress bar, close/next icons).

- [ ] **Step 1: List candidate screenshots and open each to pick the 5 clearest**

```bash
ls "$SCRATCHPAD_DIR"/rev-*.png
```

Open each with the Read tool, pick the 5 with the clearest, fully-visible review text and (where present) a real IG username.

- [ ] **Step 2: For each chosen screenshot, determine its pixel dimensions**

```bash
sips -g pixelWidth -g pixelHeight "$SCRATCHPAD_DIR/rev-N.png"
```

- [ ] **Step 3: Crop out the Instagram chrome**

Inspect the screenshot visually (already open via Read) to find the pixel Y-offset where the story progress bar / header ends and where any bottom reply-bar begins. Crop to keep only the review content:

```bash
sips -c <cropHeight> <cropWidth> --cropOffset <yOffset> <xOffset> \
  "$SCRATCHPAD_DIR/rev-N.png" \
  --out /Users/vovan/projects/normatisse/normatisse.com/public/images/bakery/reviews/review-N.jpg
```

(Run once per chosen screenshot, substituting the actual crop box read off each image.)

- [ ] **Step 4: Verify each cropped file**

Read each resulting file with the Read tool and confirm no Instagram UI chrome (progress bar, X button, "Далі" arrow) remains visible — only the review text/bubble.

- [ ] **Step 5: Commit**

```bash
git add public/images/bakery/reviews/
git commit -m "feat: add cropped review screenshots for bakery page"
```

---

### Task 7: Reviews section component

**Files:**
- Create: `components/BakeryReviews.vue`
- Modify: `pages/bakery.vue`

**Interfaces:**
- `BakeryReviews.vue`: no props. Renders the 5 images from `/images/bakery/reviews/review-{1..5}.jpg` per Task 1's reviews-grid layout concept (not a carousel/slider, not necessarily a uniform grid).

- [ ] **Step 1: Create `components/BakeryReviews.vue`**

Structural baseline — refine per Task 1's direction:

```vue
<template>
    <div>
        <h2 class="logo-font text-3xl text-center mb-8">Відгуки</h2>
        <div class="grid gap-4 sm:grid-cols-3">
            <img
                v-for="n in 5"
                :key="n"
                :src="`/images/bakery/reviews/review-${n}.jpg`"
                :alt="`Відгук клієнта ${n}`"
                class="w-full rounded-lg shadow-md ring ring-default"
            >
        </div>
    </div>
</template>
```

- [ ] **Step 2: Mount it in `pages/bakery.vue` after the photo strip**

```vue
<div class="pb-16">
    <BakeryReviews />
</div>
```

Add `import BakeryReviews from '@/components/BakeryReviews.vue';` to the script block.

- [ ] **Step 3: Verify**

Screenshot the page: 5 review images display in a 3-column grid on desktop, stacking on mobile, no cropped-out chrome visible (double-check against Task 6's output), no console errors for missing images (404s).

- [ ] **Step 4: Commit**

```bash
git add components/BakeryReviews.vue pages/bakery.vue
git commit -m "feat: add reviews section to bakery page"
```

---

### Task 8: CTA/Contact section

**Files:**
- Create: `components/BakeryContact.vue`
- Modify: `pages/bakery.vue`

**Interfaces:**
- `BakeryContact.vue`: no props. Defines a local `const CONTACT_PHONE = '+380734700263'` and `const INSTAGRAM_BAKERY_LINK = 'https://instagram.com/normatisse.bakery'`, and renders 4 links plus a note that an order form is coming later, per Task 1's CTA layout concept.

- [ ] **Step 1: Create `components/BakeryContact.vue`**

Structural baseline — refine per Task 1's direction:

```vue
<script setup lang="ts">
const CONTACT_PHONE = '+380734700263';
const INSTAGRAM_BAKERY_LINK = 'https://instagram.com/normatisse.bakery';
</script>

<template>
    <div class="text-center">
        <h2 class="logo-font text-3xl mb-4">Замовити</h2>
        <p class="text-gray-500 mb-8">
            Напишіть нам зручним способом — форма для онлайн-замовлень скоро зʼявиться.
        </p>
        <div class="flex flex-wrap items-center justify-center gap-4">
            <UButton
                icon="i-simple-icons-instagram"
                variant="solid"
                color="primary"
                size="lg"
                :to="INSTAGRAM_BAKERY_LINK"
                target="_blank"
            >
                Instagram
            </UButton>
            <UButton
                icon="i-simple-icons-telegram"
                variant="soft"
                color="primary"
                size="lg"
                :to="`https://t.me/${CONTACT_PHONE}`"
                target="_blank"
            >
                Telegram
            </UButton>
            <UButton
                icon="i-simple-icons-viber"
                variant="soft"
                color="primary"
                size="lg"
                :to="`viber://chat?number=%2B${CONTACT_PHONE.replace('+', '')}`"
            >
                Viber
            </UButton>
            <UButton
                icon="i-lucide-phone"
                variant="soft"
                color="primary"
                size="lg"
                :to="`tel:${CONTACT_PHONE}`"
            >
                {{ CONTACT_PHONE }}
            </UButton>
        </div>
    </div>
</template>
```

- [ ] **Step 2: Mount it in `pages/bakery.vue` after the reviews section**

```vue
<div class="pb-16">
    <BakeryContact />
</div>
```

Add `import BakeryContact from '@/components/BakeryContact.vue';` to the script block.

- [ ] **Step 3: Verify**

Screenshot the page and confirm all 4 buttons render with icons. Manually check each `href`/`to` value in the rendered HTML (`curl -s http://localhost:3000/bakery | grep -o 'href="[^"]*"'`) matches: `https://instagram.com/normatisse.bakery`, `https://t.me/+380734700263`, `viber://chat?number=%2B380734700263`, `tel:+380734700263`.

- [ ] **Step 4: Commit**

```bash
git add components/BakeryContact.vue pages/bakery.vue
git commit -m "feat: add contact section to bakery page"
```

---

### Task 9: Footer, homepage link update, final QA pass

**Files:**
- Modify: `pages/bakery.vue`
- Modify: `pages/index.vue`

**Interfaces:** No new components — inline footer markup matching `pages/index.vue`'s existing footer exactly (same `USeparator` + copyright pattern), reusing a local `year` ref.

- [ ] **Step 1: Add the footer to `pages/bakery.vue`**

```vue
<script setup lang="ts">
import BackgroundTop from '@/components/BackgroundTop.vue';
import BackgroundBottom from '@/components/BackgroundBottom.vue';
import BakeryHero from '@/components/BakeryHero.vue';
import BakeryProducts from '@/components/BakeryProducts.vue';
import BakeryPhotoStrip from '@/components/BakeryPhotoStrip.vue';
import BakeryReviews from '@/components/BakeryReviews.vue';
import BakeryContact from '@/components/BakeryContact.vue';

const year = ref(new Date().getFullYear());

// ...useSeoMeta unchanged
</script>

<template>
    <UContainer>
        <div class="relative isolate px-6 pt-14 lg:px-8">
            <BackgroundTop />
            <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                <BakeryHero />
            </div>
            <BackgroundBottom />
        </div>

        <div id="products" class="relative z-0 pb-16">
            <BakeryProducts />
        </div>

        <div class="pb-16">
            <BakeryPhotoStrip />
        </div>

        <div class="pb-16">
            <BakeryReviews />
        </div>

        <div class="pb-16">
            <BakeryContact />
        </div>

        <USeparator class="pt-10" />
        <div class="text-center text-xs py-3">&copy; {{ year }} All rights reserved.</div>
    </UContainer>
</template>

<style lang="css">
@import "tailwindcss";
@import "@nuxt/ui";
</style>
```

- [ ] **Step 2: Point the homepage bakery teaser at `/bakery`**

In `pages/index.vue`, change the bakery offer card's link target from the raw Instagram URL to the internal route:

```diff
             <a
                class="offer-card mb-6"
-               :href="INSTAGRAM_BAKERY_LINK"
-               target="_blank"
+               to="/bakery"
             >
```

Note the tag change from `<a :href target="_blank">` to Nuxt's internal-link convention — replace the `<a>` with `<NuxtLink to="/bakery">` (keeping the same classes/content), since this is now an internal route rather than an external link. Remove the now-unused `INSTAGRAM_BAKERY_LINK` constant only if the photography card doesn't also reference it (it doesn't — check `INSTAGRAM_PH_LINK` is the separate constant already used there).

- [ ] **Step 3: Run lint and build**

```bash
npm run lint
npm run build
```

Expected: both exit with code 0. Fix any errors before proceeding.

- [ ] **Step 4: Full visual QA pass**

Using the `agent-browser` skill: screenshot `/bakery` at desktop (1440px) and mobile (375px) widths, and screenshot `/` to confirm the bakery teaser card now links to `/bakery` (click it and confirm navigation). Check the browser console for errors at both routes. Cross-check the rendered page against Task 1's direction note — if any section still reads as a generic template default, revise it now rather than shipping it.

- [ ] **Step 5: Commit**

```bash
git add pages/bakery.vue pages/index.vue
git commit -m "feat: add footer to bakery page and link homepage teaser to it"
```

---

## Self-Review Notes

- **Spec coverage:** Visual direction via `frontend-design` (Task 1), Hero (Task 2), Products/Pricing with embedded photos (Tasks 3 & 5), bento photo strip replacing standalone Gallery (Task 5), Reviews as cropped screenshots (Tasks 6 & 7), CTA/Contact with all 4 channels (Task 8), Footer + homepage link update (Task 9), sourcing via real CDN download not screenshots (Task 4) — every spec section maps to a task.
- **Out of scope confirmed:** no order form is built anywhere in this plan.
- **Type consistency:** `Product`/`ProductVariant` interfaces defined once in Task 3 and only extended (not renamed) in Task 5; `CONTACT_PHONE` format (`+380734700263`) is consistent across Task 8's Telegram/Viber/phone links.
- **frontend-design coverage:** named explicitly in the header, Architecture, Tech Stack, and Global Constraints; Task 1 runs it; Tasks 2, 5, 7, and 8 explicitly defer their layout/class choices to its output instead of treating the sample code as final.
