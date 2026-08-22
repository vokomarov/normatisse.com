<script setup lang="ts">
import { ref } from 'vue';
import SprinkleScatter from '@/components/SprinkleScatter.vue';

// Scroll-reveal (direction note §3): fade+slide tiles in, staggered, once, on first
// entering the viewport. @vueuse/core is already a repo dependency (auto-imported via
// @vueuse/nuxt) so this needs no new library.
const stripRef = ref<HTMLElement | null>(null);
const revealed = ref(false);

const { stop } = useIntersectionObserver(
    stripRef,
    ([entry]) => {
        if (entry?.isIntersecting) {
            revealed.value = true;
            stop();
        }
    },
    { threshold: 0.2 },
);
</script>

<template>
    <div ref="stripRef" class="grid grid-cols-6 lg:grid-cols-12 gap-4 lg:gap-6">
        <!-- Tile 1: tall showcase, anchors the left side -->
        <div
            class="bento-tile relative col-span-6 lg:col-span-5"
            :style="{ transitionDelay: '0ms' }"
            :class="revealed ? 'bento-tile--in' : 'bento-tile--out'"
        >
            <div class="bento-frame relative aspect-[3/4] w-full rounded-sm bg-white p-2 shadow-lg ring-1 ring-black/5 lg:hover:shadow-xl" style="--tile-rotate: -2deg">
                <img
                    src="/images/bakery/gallery/bento-1.jpg"
                    alt="Випічка Normatisse Bakery"
                    class="h-full w-full rounded-[2px] object-cover"
                >

                <!-- Signature element, placement 4 (direction note §5): tucked behind
                     this tile's corner, mirrored from the (future) Торти-card placement.
                     Explicit h-44/w-44 on this wrapper matches SprinkleScatter's own root
                     size — its svg root is itself `absolute`, so without a sized wrapper
                     here the box collapses to 0 and bottom/right both being set resolves
                     unpredictably (verified via agent-browser: it drifted down/right into
                     tile 3's bounding box, fully hidden behind that tile's opaque photo). -->
                <div class="absolute -bottom-6 -right-6 -z-10 h-44 w-44" aria-hidden="true">
                    <SprinkleScatter class="-scale-x-100 scale-50 opacity-45" />
                </div>
            </div>
        </div>

        <!-- Right cluster: two smaller tiles overlapping each other, not the left tile -->
        <div class="col-span-6 flex flex-col gap-4 lg:col-span-7 lg:gap-0">
            <div
                class="bento-tile relative z-10 w-2/3 self-end sm:w-1/2 lg:w-2/5 lg:-mb-10 lg:translate-x-[-12%]"
                :style="{ transitionDelay: '80ms' }"
                :class="revealed ? 'bento-tile--in' : 'bento-tile--out'"
            >
                <div class="bento-frame aspect-square w-full rounded-sm bg-white p-2 shadow-lg ring-1 ring-black/5 lg:hover:shadow-xl" style="--tile-rotate: 2deg">
                    <img
                        src="/images/bakery/gallery/bento-2.jpg"
                        alt="Випічка Normatisse Bakery"
                        class="h-full w-full rounded-[2px] object-cover"
                    >
                </div>
            </div>

            <div
                class="bento-tile relative"
                :style="{ transitionDelay: '160ms' }"
                :class="revealed ? 'bento-tile--in' : 'bento-tile--out'"
            >
                <div class="bento-frame aspect-[4/3] w-full rounded-sm bg-white p-2 shadow-lg ring-1 ring-black/5 lg:hover:shadow-xl" style="--tile-rotate: -1.5deg">
                    <img
                        src="/images/bakery/gallery/bento-3.jpg"
                        alt="Випічка Normatisse Bakery"
                        class="h-full w-full rounded-[2px] object-cover"
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Staggered fade+slide-in on first viewport entry (direction note §3). */
.bento-tile {
    transition: opacity 300ms ease-out, transform 300ms ease-out;
}

.bento-tile--out {
    opacity: 0;
    transform: translateY(1.5rem);
}

.bento-tile--in {
    opacity: 1;
    transform: translateY(0);
}

/* Static rotated "print frame" look; kept level on hover only via the rule below.
   Rotate/scale use the native CSS properties (not `transform`) so they compose
   cleanly with the Tailwind `shadow-lg`/`hover:shadow-xl` utilities above. */
.bento-frame {
    rotate: var(--tile-rotate);
    transition: rotate 200ms ease-out, scale 200ms ease-out;
}

@media (min-width: 1024px) {
    .bento-frame:hover {
        rotate: 0deg;
        scale: 1.03;
        z-index: 30;
    }
}

@media (prefers-reduced-motion: reduce) {
    .bento-tile {
        transition: opacity 300ms ease-out;
    }

    .bento-tile--out,
    .bento-tile--in {
        transform: none;
    }

    /* Skip the "pick the photo up" hover animation entirely; keep the static rotated frame. */
    .bento-frame {
        transition: none;
    }

    .bento-frame:hover {
        rotate: var(--tile-rotate);
        scale: 1;
        z-index: auto;
    }
}
</style>
