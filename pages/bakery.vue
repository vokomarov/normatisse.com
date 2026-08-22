<script setup lang="ts">
import BackgroundTop from '@/components/BackgroundTop.vue';
import BackgroundBottom from '@/components/BackgroundBottom.vue';
import BakeryHero from '@/components/BakeryHero.vue';

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
    </UContainer>
</template>

<style lang="css">
@import "tailwindcss";
@import "@nuxt/ui";
</style>
