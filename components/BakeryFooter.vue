<script setup lang="ts">
const INSTAGRAM_BAKERY_LINK = 'https://instagram.com/normatisse.bakery';

const year = new Date().getFullYear();

const links = [
    { label: 'Асортимент', to: '#products' },
    { label: 'Галерея', to: '#gallery' },
    { label: 'Відгуки', to: '#reviews' },
    { label: 'Замовити', to: '#contact' },
];
</script>

<template>
    <footer class="brand-band border-t border-watercourse-100 bg-[var(--brand-surface)] py-12">
        <div class="brand-band__inner">
            <div class="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <img
                        class="w-40"
                        src="/images/logo-bakery-full.svg"
                        alt="Normatisse Bakery"
                        width="320"
                        height="75"
                        loading="lazy"
                    >
                    <p class="sub-logo-font mt-2 pb-0.5 text-base leading-[1.15]">make day sweeter</p>
                </div>

                <nav class="flex flex-wrap gap-x-6 gap-y-2" aria-label="Розділи сторінки">
                    <a
                        v-for="link in links"
                        :key="link.to"
                        :href="link.to"
                        class="brand-focus rounded-full text-sm text-stone-600 transition-colors hover:text-watercourse-700"
                    >
                        {{ link.label }}
                    </a>
                </nav>

                <UButton
                    class="w-fit"
                    icon="i-simple-icons-instagram"
                    color="primary"
                    variant="soft"
                    size="lg"
                    :to="INSTAGRAM_BAKERY_LINK"
                    target="_blank"
                    rel="noopener"
                    aria-label="Instagram Normatisse Bakery"
                    square
                />
            </div>

            <p class="mt-10 text-xs text-stone-500">&copy; {{ year }} Normatisse. All rights reserved.</p>
        </div>
    </footer>
</template>
