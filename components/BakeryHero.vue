<script setup lang="ts">
import SprinkleScatter from '@/components/SprinkleScatter.vue';
</script>

<template>
    <div class="relative grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-16 pt-20 pb-28 sm:pt-28 sm:pb-40">
        <!--
          Placement 1 (direction note §5): large sprinkle burst. On desktop it sits
          bottom-right of the decoration column, bleeding toward the container edge.
          On mobile the decoration column disappears, so this same instance shrinks
          and tucks behind the top-right of the logo instead (low z, per §1's mobile
          wireframe note) rather than adding a third, undocumented instance.
        -->
        <div
            class="absolute -z-10 top-0 right-0 lg:top-1/2 lg:-translate-y-1/2 lg:right-0 lg:translate-x-10"
            aria-hidden="true"
        >
            <SprinkleScatter class="rotate-[18deg] scale-50 opacity-40 lg:scale-100 lg:opacity-60" />
        </div>

        <div class="relative lg:col-span-7 text-left hero-fade-in">
            <!-- Placement 2: small sprinkle cluster, top-left of the text block -->
            <div class="absolute -z-10 -top-8 -left-6 lg:-top-10 lg:-left-10" aria-hidden="true">
                <SprinkleScatter class="rotate-[-12deg] scale-75 opacity-50" />
            </div>

            <div class="flex justify-start pb-3">
                <img class="max-w-xs lg:max-w-sm" src="/images/logo-bakery-full.svg" alt="Normatisse Bakery">
            </div>
            <p class="sub-logo-font text-2xl sm:text-3xl lg:text-4xl">make day sweeter</p>
            <p class="mt-4 text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">
                Ділюся з вами частинкою себе, спеченою з любов'ю: домашні торти, кекси, капкейки та мадлен на замовлення у Львові.
            </p>
            <div class="mt-10 flex justify-start">
                <UButton variant="solid" color="primary" size="xl" to="#products">
                    Що у нас є?
                </UButton>
            </div>
        </div>

        <!-- Decoration column: empty spacer that reserves the 5/12 width on desktop only -->
        <div class="hidden lg:block lg:col-span-5" aria-hidden="true" />
    </div>
</template>

<style scoped>
/* One-shot load-in fade for the content column (direction note §1). */
.hero-fade-in {
    animation: hero-fade-in 400ms ease-out both;
}

@keyframes hero-fade-in {
    from {
        opacity: 0;
        transform: translateY(1rem);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (prefers-reduced-motion: reduce) {
    .hero-fade-in {
        animation: hero-fade-in-reduced 400ms ease-out both;
    }

    @keyframes hero-fade-in-reduced {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
}
</style>
