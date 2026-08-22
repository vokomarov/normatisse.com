<script setup lang="ts">
import BackgroundTop from '@/components/BackgroundTop.vue';
import BackgroundBottom from '@/components/BackgroundBottom.vue';
import BakeryHero from '@/components/BakeryHero.vue';
import BakeryProducts from '@/components/BakeryProducts.vue';
import BakeryPhotoStrip from '@/components/BakeryPhotoStrip.vue';
import BakeryReviews from '@/components/BakeryReviews.vue';
import BakeryContact from '@/components/BakeryContact.vue';

useSeoMeta({
    title: 'Normatisse Bakery — домашня випічка на замовлення',
    ogTitle: 'Normatisse Bakery — домашня випічка на замовлення',
    description: 'Торти, кекси, капкейки та мадлен на замовлення у Львові. Make day sweeter.',
    ogDescription: 'Торти, кекси, капкейки та мадлен на замовлення у Львові. Make day sweeter.',
    ogImage: '/images/logo-bakery-full.svg',
    twitterCard: 'summary_large_image',
})
</script>

<template>
    <UContainer>
        <div class="relative isolate px-6 pt-14 lg:px-8">
            <BackgroundTop />
            <BakeryHero />
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
    </UContainer>
</template>

<style lang="css">
@import "tailwindcss";
@import "@nuxt/ui";
</style>
