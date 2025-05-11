<script setup lang="ts">
import BackgroundTop from '@/components/BackgroundTop.vue';
import BackgroundBottom from '@/components/BackgroundBottom.vue';

const INSTAGRAM_LINK = 'https://instagram.com/normatisse';
const INSTAGRAM_PH_LINK = 'https://www.instagram.com/normatisse.ph';

const year = ref(new Date().getFullYear());

useSeoMeta({
    title: 'Normatisse - Bakery & Photography',
    ogTitle: 'Normatisse - Bakery & Photography',
    description: 'Ділюся з вами частинкою себе. Bakery & Photography.',
    ogDescription: 'Ділюся з вами частинкою себе. Bakery & Photography.',
    // ogImage: 'https://example.com/image.png',
    twitterCard: 'summary_large_image',
})
</script>

<template>
    <UContainer>
        <div class="relative isolate px-6 pt-14 lg:px-8">
            <BackgroundTop />
            <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                <div class="hidden sm:mb-8 sm:flex sm:justify-center">
                    <div class="subscribe-label">
                        Незабаром відкриття.
                        <a :href="INSTAGRAM_LINK" class="font-semibold text-primary-600">
                            <span class="absolute inset-0" aria-hidden="true" />
                            Дізнатись більше
                            <span aria-hidden="true">&rarr;</span>
                        </a>
                    </div>
                </div>
                <div class="text-center">
                    <h1 class="text-5xl tracking-tight text-balance  sm:text-7xl logo-font">NORMatisse</h1>
                    <p class="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">Ділюся з вами частинкою себе.</p>
                    <div class="mt-10 flex items-center justify-center gap-x-6">
                        <UButton variant="solid" color="primary" size="xl" to="#offers">
                            Що пропонуємо?
                        </UButton>
                        <UButton variant="link" color="neutral" size="xl" target="_blank" :to="INSTAGRAM_LINK">
                            Замовити <span aria-hidden="true">→</span>
                        </UButton>
                    </div>
                </div>
            </div>
            <BackgroundBottom />
        </div>

        <div class="relative z-0" id="offers">
            <a class="offer-card mb-6"
               :href="INSTAGRAM_LINK"
               target="_blank"
            >
                <div class="p-4 sm:p-6">
                    <h2 class="sub-logo-font text-3xl">bakery</h2>
                    <p>Тортики, капкейки, горішки з начинкою, бенто-тортики, тістечка</p>
                </div>
            </a>

            <a class="offer-card shadow-md mb-6"
               :href="INSTAGRAM_PH_LINK"
               target="_blank"
            >
                <div class="p-4 sm:p-6">
                    <h2 class="sub-logo-font text-3xl">photography</h2>
                    <p>Персональні фотосесії, групові фотосесії, love-story, food фото</p>
                </div>
            </a>

            <USeparator class="pt-10"/>

            <div class="text-center text-xs py-3">&copy; {{ year }} All rights reserved.</div>
        </div>
    </UContainer>
</template>

<style lang="css">
@import "tailwindcss";
@import "@nuxt/ui";

.subscribe-label {
    @apply relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20;
}

.offer-card {
    @apply block rounded-lg bg-elevated/50 hover:bg-elevated/90 transition-colors duration-150 ease-in-out hover:cursor-pointer ring ring-default divide-y divide-default shadow-md;
}
</style>
