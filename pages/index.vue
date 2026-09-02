<script setup lang="ts">
import BackgroundTop from '@/components/BackgroundTop.vue';
import BackgroundBottom from '@/components/BackgroundBottom.vue';

const INSTAGRAM_PH_LINK = 'https://instagram.com/normatisse.ph';

const year = ref(new Date().getFullYear());

const { siteUrl } = useRuntimeConfig().public;
const { instagram } = useBakeryContacts();

const title = 'Normatisse — Bakery & Photography';
const description = 'Normatisse — домашня випічка на замовлення у Вінниці та персональні фотосесії. Торти, капкейки, кекси й мадлен, love-story та food-фото.';

useSeoMeta({
    title,
    ogTitle: title,
    description,
    ogDescription: description,
    ogImage: `${siteUrl}/images/logo.svg`,
    twitterCard: 'summary_large_image',
})

// Two separate blocks rather than one `@graph`: consumers that only look at a
// script's top-level `@type` (several validators do) miss every node inside a
// graph wrapper. The `@id` cross-references still tie them together, and
// /bakery's Bakery node points its `parentOrganization` at the Organization
// below, so the site describes one entity across both pages.
const organisationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'Normatisse',
    url: siteUrl,
    logo: `${siteUrl}/images/logo.svg`,
    description,
    sameAs: [INSTAGRAM_PH_LINK, instagram],
    areaServed: { '@type': 'City', name: 'Вінниця' },
};

// Dates are hand-maintained: they must mean "the copy changed", not "the site
// was rebuilt", so they cannot come from the build.
const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${siteUrl}/#webpage`,
    url: siteUrl,
    name: title,
    description,
    inLanguage: 'uk',
    datePublished: '2025-05-11',
    dateModified: '2026-08-23',
    author: { '@id': `${siteUrl}/#organization` },
    publisher: { '@id': `${siteUrl}/#organization` },
};

useHead({
    // The wordmark is the LCP element on this page and is only discovered once
    // the hero markup parses, so it gets an explicit preload.
    link: [{ rel: 'preload', as: 'image', href: '/images/logo.svg' }],
    script: [organisationSchema, pageSchema].map(schema => ({
        type: 'application/ld+json',
        innerHTML: JSON.stringify(schema),
    })),
})
</script>

<template>
    <UContainer>
        <div class="relative isolate px-6 pt-14 lg:px-8">
            <BackgroundTop />
            <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                <div class="text-center">
                    <!-- The wordmark is this page's heading: there is no other
                         title above the two offer cards. The alt and the hidden
                         span read as one line and never repeat each other, so
                         the heading is non-empty without saying "Normatisse"
                         twice to a screen reader. -->
                    <h1 class="text-center flex justify-center pb-3">
                        <img
                            class="w-full max-w-md"
                            src="/images/logo.svg"
                            alt="Normatisse"
                            width="331"
                            height="48"
                            fetchpriority="high"
                        >
                        <span class="sr-only">— Bakery &amp; Photography</span>
                    </h1>
                    <p class="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">Ділюся з вами частинкою себе.</p>
                    <div class="mt-10 flex items-center justify-center gap-x-6">
                        <UButton variant="solid" color="primary" size="xl" to="#offers">
                            Що пропонуємо?
                        </UButton>
                    </div>
                </div>
            </div>
            <BackgroundBottom />
        </div>

        <!-- Keeps the original reading width now that --ui-container is page-wide. -->
        <div id="offers" class="relative z-0 mx-auto max-w-2xl">
            <NuxtLink
               class="offer-card mb-6"
               to="/bakery"
            >
                <div class="p-4 sm:p-6">
                    <h2 class="sub-logo-font text-3xl">bakery</h2>
                    <p>Тортики, капкейки, горішки з начинкою, бенто-тортики, тістечка</p>
                </div>
            </NuxtLink>

            <a
               class="offer-card shadow-md mb-6"
               :href="INSTAGRAM_PH_LINK"
               target="_blank"
               rel="noopener"
            >
                <div class="p-4 sm:p-6">
                    <h2 class="sub-logo-font text-3xl">photography</h2>
                    <p>Персональні фотосесії, групові фотосесії, love-story, food фото</p>
                </div>
            </a>

            <USeparator class="pt-10"/>

            <div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 py-3 text-center text-xs">
                <span>&copy; {{ year }} All rights reserved.</span>
                <NuxtLink to="/privacy" class="text-gray-500 transition-colors hover:text-gray-800">
                    Політика конфіденційності
                </NuxtLink>
            </div>
        </div>
    </UContainer>
</template>
