<script setup lang="ts">
const { instagram } = useBakeryContacts();

// The screenshots are full phone screens (1320 × 2346, ratio ~9:16). Shown
// whole they would be a wall of photo with a small band of message in it, so
// the card crops them to a box and the lightbox shows the full file.
//
// `aspect` is the crop box, and it applies at every breakpoint. Do not reach
// for the `height` attribute for this: `height` on an `<img>` only reserves a
// pre-load box, and once the file
// decodes the intrinsic ratio takes over (Tailwind preflight forces
// `height: auto`), so editing it changes nothing on screen.
//
// `focus` is where the message text sits in that file — the crop has to keep
// it and may drop the product photo on the other side. Check a new screenshot
// before assuming: it is `object-top` as often as `object-bottom`.
//
// `quote` transcribes the message burned into the screenshot, verbatim including
// its typos — the section promises unedited screenshots and a tidied quote would
// break that promise. It is the readable layer; the screenshot below it is the
// receipt. `caption` names the order from what the photo shows, because these
// are anonymous Direct messages and a fabricated customer name would be a lie.

/** Every screenshot is a 1320 × 2346 phone capture. */
const SHOT_WIDTH = 1320;
const SHOT_HEIGHT = 2346;

/**
 * Default crop. Keeps ~84% of a 9:16 capture: enough for the message band plus
 * the product above or below it. Set `aspect` on a review to override.
 */
const SHOT_ASPECT = 'aspect-[2/3]';

const reviews = [
    {
        focus: 'object-bottom',
        quote: 'Торт всім сподобався, спеціально всіх перепитала, від малечі до людей похилого віку. Все свіже, смачне, збалансоване. Дякуюємо!',
        caption: 'Торт на ювілей 70 років',
        alt: 'Скріншот відгуку про торт із золотою цифрою 70, гранатом і кокосовими кульками',
    },
    {
        focus: 'object-top',
        quote: 'Дякую за смаколики, які ми привезли до столу. У нас була лотерея: відгадай смак горішка.',
        caption: 'Набір горішків асорті х25',
        alt: 'Скріншот відгуку про коробку різнокольорових горішків асорті на святковому столі',
    },
    {
        focus: 'object-top',
        quote: 'Це було дуже смачно і красиво, як завжди 🫱🏻‍🫲🏼🔥',
        caption: 'Торт — Superman',
        alt: 'Скріншот відгуку про шоколадний торт із золотим логотипом Superman',
    },
].map((review, i) => ({
    aspect: SHOT_ASPECT,
    ...review,
    n: i + 1,
    src: `/images/bakery/reviews/review-${i + 1}.jpg`,
    width: SHOT_WIDTH,
    height: SHOT_HEIGHT,
}));

const activeIndex = ref<number | null>(null);
</script>

<template>
    <div>
        <header class="max-w-xl">
            <h2 class="brand-heading brand-reveal text-4xl sm:text-5xl">Що кажуть клієнти</h2>
            <p class="brand-lead brand-reveal mt-4" style="--reveal-delay: 60ms">
                Скріншоти з переписок, без редагування. Натисніть, щоб відкрити повністю.
            </p>
        </header>

        <!-- Rail on phones, grid from `sm` up. Quote first, screenshot under it:
             the words are what a reader scans, the screenshot is the proof they
             are real. Not masonry — the screenshots share one crop box, so the
             quotes are the only variable, and stretching every card lines the
             screenshots up on one baseline regardless of quote length. The rail
             stretches its cards on its own; the grid needs `auto-rows-fr` plus
             `h-full`, and that `h-full` must stay behind `sm:` because an
             explicit height cancels the rail's cross-axis stretch. -->
        <BrandRail
            class="brand-reveal mt-12"
            from="sm"
            desktop="sm:grid sm:auto-rows-fr sm:grid-cols-2 lg:grid-cols-3"
            label="Відгуки клієнтів"
        >
            <article
                v-for="(review, index) in reviews"
                :key="review.n"
                class="brand-card flex-col overflow-hidden sm:h-full"
                :style="{ '--reveal-delay': `${index * 60}ms` }"
            >
                <!-- The caption is pinned to the bottom of the stretched text
                     block, so every caption sits on the same baseline just above
                     its screenshot instead of floating after a short quote. -->
                <blockquote class="flex grow flex-col px-5 pt-5 pb-4">
                    <p class="text-sm leading-relaxed text-stone-700">{{ review.quote }}</p>
                    <footer class="brand-term mt-auto block pt-3">{{ review.caption }}</footer>
                </blockquote>

                <button
                    type="button"
                    class="brand-focus group relative block w-full cursor-zoom-in overflow-hidden transition duration-300 ease-[var(--brand-ease)] hover:opacity-95"
                    @click="activeIndex = index"
                >
                    <img
                        :src="review.src"
                        :alt="review.alt"
                        class="w-full object-cover"
                        :class="[review.aspect, review.focus]"
                        :width="review.width"
                        :height="review.height"
                        loading="lazy"
                    >
                    <span class="sr-only">Відкрити скріншот повністю</span>
                </button>
            </article>
        </BrandRail>

        <!-- Same gaps as the gallery CTA. Nothing curves over this band, so the
             negative bottom margin has to stand in for the overlap the gallery
             gets for free. -->
        <div class="brand-reveal mt-10 -mb-10 flex justify-center sm:-mb-14 lg:mt-18">
            <UButton
                icon="i-simple-icons-instagram"
                color="primary"
                variant="outline"
                size="xl"
                :to="instagram"
                target="_blank"
                rel="noopener"
            >
                Читати всі відгуки
            </UButton>
        </div>

        <BrandLightbox
            v-model:index="activeIndex"
            :items="reviews"
            title="Відгуки клієнтів"
        />
    </div>
</template>
