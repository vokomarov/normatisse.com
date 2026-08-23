<script setup lang="ts">
import BakeryHero from '@/components/BakeryHero.vue';
import BakeryProducts from '@/components/BakeryProducts.vue';
import BakeryGallery from '@/components/BakeryGallery.vue';
import BakeryReviews from '@/components/BakeryReviews.vue';
import BakeryManifesto from '@/components/BakeryManifesto.vue';
import BakeryContact from '@/components/BakeryContact.vue';
import BakeryFooter from '@/components/BakeryFooter.vue';
import BrandSection from '@/components/BrandSection.vue';

const description = 'Торти, кекси, капкейки та мадлен на замовлення у Вінниці. Make day sweeter.';

useSeoMeta({
    title: 'Normatisse Bakery — домашня випічка на замовлення',
    ogTitle: 'Normatisse Bakery — домашня випічка на замовлення',
    description,
    ogDescription: description,
    ogImage: '/images/logo-bakery-full.svg',
    twitterCard: 'summary_large_image',
})
</script>

<!-- Full-bleed shell: every band owns its own surface and inner container, so
     nothing at this level constrains width. -->
<template>
    <div class="bg-[var(--brand-surface)]">
        <BakeryHero />

        <BrandSection id="products" surface="mint">
            <BakeryProducts />
        </BrandSection>

        <!-- The page's single dark *surface*. Everything before and after it is
             light, so the flip reads as one deliberate accent rather than a
             stripe pattern. The manifesto band below is a photograph, not a
             surface flip — a different device, counted separately. -->
        <BrandSection id="gallery" surface="deep" curve-top>
            <BakeryGallery />
        </BrandSection>

        <BrandSection id="reviews" surface="white" curve-top>
            <BakeryReviews />
        </BrandSection>

        <BakeryManifesto />

        <BrandSection id="contact" surface="blush">
            <BakeryContact />
        </BrandSection>

        <BakeryFooter />
    </div>
</template>
