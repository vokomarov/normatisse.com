<script setup lang="ts">
// Deterministic per-index rotation so no two adjacent cards share a tilt
// (direction note §4) — not randomized, same reasoning as SprinkleScatter.
const rotations = ['-rotate-2', '-rotate-1', 'rotate-0', 'rotate-1', 'rotate-2'];

const reviews = Array.from({ length: 5 }, (_, i) => ({
    n: i + 1,
    rotate: rotations[i],
}));
</script>

<template>
    <div>
        <h2 class="logo-font text-3xl sm:text-4xl text-center mb-10">Відгуки</h2>

        <div class="columns-1 sm:columns-2 lg:columns-3 gap-6">
            <div
                v-for="review in reviews"
                :key="review.n"
                class="relative mb-6 inline-block w-full max-w-[400px] break-inside-avoid"
                :class="review.rotate"
            >
                <!-- Washi tape accent, pinned-note read -->
                <div class="absolute -top-2 left-6 h-4 w-10 rotate-[-4deg] bg-watercourse-100/70" aria-hidden="true" />

                <div class="bg-white p-3 pb-8 shadow-md ring-1 ring-black/5">
                    <img
                        :src="`/images/bakery/reviews/review-${review.n}.jpg`"
                        :alt="`Відгук клієнта ${review.n}`"
                        class="w-full"
                        width="414"
                        loading="lazy"
                    >
                </div>
            </div>
        </div>
    </div>
</template>
