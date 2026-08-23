<script setup lang="ts">
const INSTAGRAM_BAKERY_LINK = 'https://instagram.com/normatisse.bakery';

// Screenshots are already cropped to their final pixels; the intrinsic height
// varies per file, so they are served as-is rather than resized to one ratio.
const reviews = [666, 490, 548, 601, 601].map((height, i) => ({
    n: i + 1,
    src: `/images/bakery/reviews/review-${i + 1}.jpg`,
    height,
}));

const activeIndex = ref<number | null>(null);

const isOpen = computed({
    get: () => activeIndex.value !== null,
    set: (value: boolean) => {
        if (!value) activeIndex.value = null;
    },
});

const active = computed(() => (activeIndex.value === null ? null : reviews[activeIndex.value]));

function step(delta: number) {
    if (activeIndex.value === null) return;
    activeIndex.value = (activeIndex.value + delta + reviews.length) % reviews.length;
}

// Arrow keys walk the lightbox; Escape is handled by UModal itself.
useEventListener(window, 'keydown', (event: KeyboardEvent) => {
    if (activeIndex.value === null) return;
    if (event.key === 'ArrowLeft') step(-1);
    else if (event.key === 'ArrowRight') step(1);
});
</script>

<template>
    <div>
        <header class="max-w-xl">
            <h2 class="brand-heading brand-reveal text-4xl sm:text-5xl">Що кажуть клієнти</h2>
            <p class="brand-lead brand-reveal mt-4" style="--reveal-delay: 60ms">
                Скріншоти з переписок, без редагування. Натисніть, щоб прочитати повністю.
            </p>
        </header>

        <div class="mt-12 gap-5 sm:columns-2 lg:columns-3">
            <button
                v-for="(review, index) in reviews"
                :key="review.n"
                type="button"
                class="brand-focus brand-reveal group mb-5 block w-full cursor-zoom-in break-inside-avoid overflow-hidden rounded-[var(--brand-radius-inner)] bg-white p-2 shadow-[0_18px_40px_-28px_rgba(0,47,37,0.5)] ring-1 ring-watercourse-100 transition duration-300 ease-[var(--brand-ease)] hover:-translate-y-1 hover:shadow-[0_26px_50px_-26px_rgba(0,47,37,0.55)]"
                :style="{ '--reveal-delay': `${index * 60}ms` }"
                @click="activeIndex = index"
            >
                <img
                    :src="review.src"
                    :alt="`Відгук клієнта ${review.n}`"
                    class="w-full rounded-[calc(var(--brand-radius-inner)-0.25rem)]"
                    width="414"
                    :height="review.height"
                    loading="lazy"
                >
                <span class="sr-only">Відкрити відгук {{ review.n }}</span>
            </button>
        </div>

        <div class="mt-4 flex justify-center">
            <UButton
                class="brand-reveal"
                icon="i-simple-icons-instagram"
                color="primary"
                variant="outline"
                size="lg"
                :to="`${INSTAGRAM_BAKERY_LINK}/`"
                target="_blank"
                rel="noopener"
            >
                Читати всі відгуки
            </UButton>
        </div>

        <UModal
            v-model:open="isOpen"
            :ui="{
                overlay: 'bg-watercourse-950/80 backdrop-blur-sm',
                content: 'max-w-[min(92vw,30rem)] bg-transparent ring-0 shadow-none divide-y-0',
            }"
            :title="`Відгук клієнта ${active?.n ?? ''}`"
            :description="'Скріншот відгуку клієнта Normatisse Bakery'"
        >
            <template #content>
                <div>
                    <div class="relative mx-auto w-fit">
                        <img
                            v-if="active"
                            :src="active.src"
                            :alt="`Відгук клієнта ${active.n}`"
                            class="max-h-[78svh] w-auto max-w-full rounded-[var(--brand-radius-panel)] bg-white shadow-2xl"
                            width="414"
                            :height="active.height"
                        >

                        <UButton
                            class="absolute top-3 right-3 bg-white text-watercourse-900 shadow-lg hover:bg-white/85"
                            icon="i-lucide-x"
                            size="lg"
                            square
                            aria-label="Закрити"
                            @click="isOpen = false"
                        />
                    </div>

                    <div class="mt-5 flex items-center justify-center gap-3">
                        <UButton
                            class="bg-white text-watercourse-900 hover:bg-white/85"
                            icon="i-lucide-chevron-left"
                            size="lg"
                            square
                            aria-label="Попередній відгук"
                            @click="step(-1)"
                        />
                        <span class="min-w-16 text-center text-sm font-medium text-white">
                            {{ (activeIndex ?? 0) + 1 }} / {{ reviews.length }}
                        </span>
                        <UButton
                            class="bg-white text-watercourse-900 hover:bg-white/85"
                            icon="i-lucide-chevron-right"
                            size="lg"
                            square
                            aria-label="Наступний відгук"
                            @click="step(1)"
                        />
                    </div>
                </div>
            </template>
        </UModal>
    </div>
</template>
