<script setup lang="ts">
const INSTAGRAM_BAKERY_LINK = 'https://instagram.com/normatisse.bakery';

// Mosaic order is load-bearing: the span classes below assume this sequence
// fills the 4-column grid exactly (12 cells over 3 rows) on desktop.
const shots = [
    { src: '/images/bakery/gallery/bento-1.jpg', alt: 'Бенто-торт з декором', span: 'col-span-2 row-span-2' },
    { src: '/images/bakery/gallery/bento-2.jpg', alt: 'Бенто-торт з ягодами', span: 'lg:row-span-2' },
    { src: '/images/bakery/gallery/bento-3.jpg', alt: 'Бенто-торт з написом', span: '' },
    { src: '/images/bakery/gallery/torty.jpg', alt: 'Торт на замовлення', span: '' },
    { src: '/images/bakery/gallery/kapkeiky.jpg', alt: 'Капкейки з кремом', span: 'lg:col-span-2' },
    { src: '/images/bakery/gallery/keksy.jpg', alt: 'Шоколадні кекси', span: '' },
    { src: '/images/bakery/gallery/madlen.jpg', alt: 'Мадлен у шоколаді', span: '' },
];
</script>

<template>
    <div>
        <header class="flex flex-wrap items-end justify-between gap-6">
            <div class="max-w-xl">
                <h2 class="brand-heading brand-heading--on-deep brand-reveal text-4xl sm:text-5xl">
                    Що виходить із печі
                </h2>
                <p class="brand-lead brand-lead--on-deep brand-reveal mt-4" style="--reveal-delay: 60ms">
                    Кожне замовлення виглядає інакше. Ось кілька останніх робіт.
                </p>
            </div>

            <UButton
                class="brand-reveal"
                style="--reveal-delay: 120ms"
                icon="i-simple-icons-instagram"
                color="secondary"
                variant="solid"
                size="lg"
                :to="INSTAGRAM_BAKERY_LINK"
                target="_blank"
                rel="noopener"
            >
                Дивитись більше
            </UButton>
        </header>

        <div class="brand-reveal mt-12 grid auto-rows-[10rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] sm:gap-4 lg:auto-rows-[15rem] lg:grid-cols-4">
            <figure
                v-for="(shot, index) in shots"
                :key="shot.src"
                class="overflow-hidden rounded-[var(--brand-radius-inner)] ring-1 ring-white/10"
                :class="shot.span"
            >
                <NuxtImg
                    :src="shot.src"
                    :alt="shot.alt"
                    class="h-full w-full object-cover transition-transform duration-700 ease-[var(--brand-ease)] hover:scale-[1.04]"
                    width="800"
                    height="800"
                    :sizes="index === 0 ? '100vw lg:640px' : '50vw lg:320px'"
                    loading="lazy"
                />
            </figure>
        </div>
    </div>
</template>
