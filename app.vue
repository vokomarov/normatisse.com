<script setup lang="ts">
const route = useRoute();
const { siteUrl } = useRuntimeConfig().public;

// One canonical per route, site-wide, so pages only declare their own meta.
// Trailing slashes are dropped so `/bakery/` and `/bakery` agree.
const canonical = computed(() => `${siteUrl}${route.path}`.replace(/\/$/, '') || siteUrl);

useHead({
    link: [{ rel: 'canonical', href: canonical }],
});

useSeoMeta({
    ogUrl: canonical,
    ogType: 'website',
    ogLocale: 'uk_UA',
});
</script>

<template>
    <UApp>
        <a href="#main" class="brand-skip-link">Перейти до вмісту</a>
        <main id="main">
            <NuxtPage />
        </main>
    </UApp>
</template>
