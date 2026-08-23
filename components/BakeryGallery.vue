<script setup lang="ts">
const { instagram } = useBakeryContacts();

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

const activeIndex = ref<number | null>(null);
</script>

<template>
    <div>
        <header class="max-w-xl">
            <h2 class="brand-heading brand-heading--on-deep brand-reveal text-4xl sm:text-5xl">
                Що виходить із печі
            </h2>
            <p class="brand-lead brand-lead--on-deep brand-reveal mt-4" style="--reveal-delay: 60ms">
                Кожне замовлення виглядає інакше. Ось кілька останніх робіт — натисніть, щоб роздивитись.
            </p>
        </header>

        <div class="brand-reveal mt-12 grid auto-rows-[10rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] sm:gap-4 lg:auto-rows-[15rem] lg:grid-cols-4">
            <button
                v-for="(shot, index) in shots"
                :key="shot.src"
                type="button"
                class="brand-focus group relative cursor-zoom-in overflow-hidden rounded-[var(--brand-radius-inner)] ring-1 ring-white/10 transition-shadow duration-300 ease-[var(--brand-ease)] hover:ring-white/40"
                :class="shot.span"
                @click="activeIndex = index"
            >
                <NuxtImg
                    :src="shot.src"
                    :alt="shot.alt"
                    class="h-full w-full object-cover transition-transform duration-700 ease-[var(--brand-ease)] group-hover:scale-[1.06]"
                    width="800"
                    height="800"
                    :sizes="index === 0 ? '100vw lg:640px' : '50vw lg:320px'"
                    loading="lazy"
                />
                <span
                    class="pointer-events-none absolute inset-0 bg-watercourse-950/0 transition-colors duration-300 group-hover:bg-watercourse-950/25"
                    aria-hidden="true"
                />
                <span class="sr-only">Відкрити фото: {{ shot.alt }}</span>
            </button>
        </div>

        <!-- CTA closes the band: the mosaic is the content, Instagram is where it
             continues. -->
        <div class="brand-reveal mt-16 flex justify-center sm:mt-20 lg:mt-24">
            <UButton
                icon="i-simple-icons-instagram"
                color="secondary"
                variant="solid"
                size="xl"
                :to="instagram"
                target="_blank"
                rel="noopener"
            >
                Дивитись більше
            </UButton>
        </div>

        <BrandLightbox
            v-model:index="activeIndex"
            :items="shots"
            title="Галерея Normatisse Bakery"
        />
    </div>
</template>
