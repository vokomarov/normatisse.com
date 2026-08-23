<script setup lang="ts">
const { channels } = useBakeryContacts();

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
                <!-- The wordmark is the way back to the rest of Normatisse. -->
                <NuxtLink to="/" class="brand-focus block w-fit rounded-2xl" aria-label="На головну Normatisse">
                    <img
                        class="w-40 transition-opacity duration-200 hover:opacity-80"
                        src="/images/logo-bakery-full.svg"
                        alt="Normatisse Bakery"
                        width="320"
                        height="75"
                        loading="lazy"
                    >
                    <span class="sub-logo-font mt-2 block pb-0.5 text-base leading-[1.15]">make day sweeter</span>
                </NuxtLink>

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

                <ul class="flex flex-wrap gap-2">
                    <li v-for="channel in channels" :key="channel.label">
                        <UButton
                            :icon="channel.icon"
                            color="primary"
                            variant="soft"
                            size="lg"
                            :to="channel.to"
                            :target="channel.external ? '_blank' : undefined"
                            :rel="channel.external ? 'noopener' : undefined"
                            :aria-label="`${channel.label} Normatisse Bakery`"
                            square
                        />
                    </li>
                </ul>
            </div>

            <div class="mt-10 flex flex-wrap items-center justify-between gap-3">
                <p class="text-xs text-stone-500">&copy; {{ year }} Normatisse. All rights reserved.</p>
                <NuxtLink
                    to="/"
                    class="brand-focus rounded-full text-xs text-stone-600 transition-colors hover:text-watercourse-700"
                >
                    Normatisse — Bakery &amp; Photography
                </NuxtLink>
            </div>
        </div>
    </footer>
</template>
