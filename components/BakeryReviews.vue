<script setup lang="ts">
const { instagram } = useBakeryContacts();

// The rail needs one card height, so the screenshots are cropped to fill it.
// `focus` is where the message text sits in each file — that is the part the crop
// must keep; the product photo above or below it can go. The lightbox still shows
// the whole screenshot.
const reviews = [
    { height: 666, focus: 'object-bottom' },
    { height: 490, focus: 'object-top' },
    { height: 548, focus: 'object-bottom' },
    { height: 601, focus: 'object-top' },
    { height: 601, focus: 'object-center' },
].map((review, i) => ({
    ...review,
    n: i + 1,
    src: `/images/bakery/reviews/review-${i + 1}.jpg`,
    alt: `Відгук клієнта ${i + 1}`,
    width: 414,
}));

const activeIndex = ref<number | null>(null);
</script>

<template>
    <div>
        <header class="max-w-xl">
            <h2 class="brand-heading brand-reveal text-4xl sm:text-5xl">Що кажуть клієнти</h2>
            <p class="brand-lead brand-reveal mt-4" style="--reveal-delay: 60ms">
                Скріншоти з переписок, без редагування. Натисніть, щоб прочитати повністю.
            </p>
        </header>

        <!-- Rail on phones, masonry from `sm` up. The rail crops each card to one
             height and the lightbox shows the full screenshot. -->
        <BrandRail
            class="brand-reveal mt-12"
            from="sm"
            desktop="sm:block sm:columns-2 lg:columns-3"
            label="Відгуки клієнтів"
        >
            <button
                v-for="(review, index) in reviews"
                :key="review.n"
                type="button"
                class="brand-focus group relative block w-full cursor-zoom-in overflow-hidden rounded-[var(--brand-radius-panel)] bg-white ring-1 ring-watercourse-100 transition duration-300 ease-[var(--brand-ease)] sm:mb-5 sm:break-inside-avoid hover:-translate-y-1 hover:ring-watercourse-300"
                :style="{ '--reveal-delay': `${index * 60}ms` }"
                @click="activeIndex = index"
            >
                <!-- Cropped to the card on the rail, natural height in the masonry
                     columns above `sm`, where each card sizes to its own image. -->
                <img
                    :src="review.src"
                    :alt="review.alt"
                    class="h-[26rem] w-full object-cover sm:h-auto"
                    :class="review.focus"
                    :width="review.width"
                    :height="review.height"
                    loading="lazy"
                >
                <span class="sr-only">Відкрити відгук {{ review.n }}</span>
            </button>
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
