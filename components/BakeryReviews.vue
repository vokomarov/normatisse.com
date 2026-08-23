<script setup lang="ts">
const { instagram } = useBakeryContacts();

// Screenshots are already cropped to their final pixels; the intrinsic height
// varies per file, so they are served as-is rather than resized to one ratio.
const reviews = [666, 490, 548, 601, 601].map((height, i) => ({
    n: i + 1,
    src: `/images/bakery/reviews/review-${i + 1}.jpg`,
    alt: `Відгук клієнта ${i + 1}`,
    width: 414,
    height,
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
                <!-- Contained, not cropped: the rail needs one card height, but a
                     screenshot cut in half tells the reader nothing. -->
                <img
                    :src="review.src"
                    :alt="review.alt"
                    class="h-[26rem] w-full object-contain sm:h-auto"
                    :width="review.width"
                    :height="review.height"
                    loading="lazy"
                >
                <span class="sr-only">Відкрити відгук {{ review.n }}</span>
            </button>
        </BrandRail>

        <!-- Negative bottom margin trims the band padding so the CTA reads as
             vertically centred between the cards and the section edge. -->
        <div class="brand-reveal mt-16 -mb-2 flex justify-center sm:mt-20 lg:mt-24 lg:-mb-8">
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
