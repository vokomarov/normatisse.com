<script setup lang="ts">
const { instagram } = useBakeryContacts();

// Mosaic order is load-bearing: the spans below assume this sequence tiles both
// grids with no holes — 24 cells over 6 rows on the 4-column desktop grid, 22
// over 11 on the 2-column mobile one. Reorder or respan an item and the tail
// stops fitting.
//
// Mobile is only 2 columns, so `col-span-2` is full width there. An item that
// lands alone in the last column leaves a hole, because the 2-wide item after
// it cannot fit beside it and gets pushed to the next row. The `WIDE_*` shapes
// close those holes by going full-bleed on mobile, then take their desktop
// shape at `lg`.
//
// `sizes` travels with the shape rather than the call site: a shape that is
// full width on mobile has to ask for a 100vw candidate or it renders upscaled.

const SQUARE_SM = { span: '', sizes: '50vw lg:320px' };
const SQUARE_LG = { span: 'col-span-2 row-span-2', sizes: '100vw lg:640px' };
const VERTICAL = { span: 'lg:row-span-2', sizes: '50vw lg:320px' };
const HORIZONTAL = { span: 'lg:col-span-2', sizes: '50vw lg:640px' };
const WIDE_SQUARE = { span: 'col-span-2 lg:col-span-1', sizes: '100vw lg:320px' };
const WIDE_VERTICAL = { span: 'col-span-2 lg:col-span-1 lg:row-span-2', sizes: '100vw lg:320px' };
const WIDE_HORIZONTAL = { span: 'col-span-2', sizes: '100vw lg:640px' };

const shots = [
    { src: '/images/bakery/gallery/cake-1.jpg', alt: 'Торт з дизайном на основі лохини', shape: WIDE_VERTICAL },
    { src: '/images/bakery/gallery/nuts-1.jpg', alt: 'Набір Горішок Асорті', shape: SQUARE_LG },
    { src: '/images/bakery/gallery/cake-2.jpg', alt: 'Мусовий торт "Три шоколади"', shape: VERTICAL },
    { src: '/images/bakery/gallery/nuts-3.jpg', alt: 'Набір горішків х25', shape: HORIZONTAL },
    { src: '/images/bakery/gallery/cookies-2.jpg', alt: 'Арахісове печиво з шоколадом', shape: SQUARE_SM },
    { src: '/images/bakery/gallery/cake-5.jpg', alt: 'Торт з дизайном "Бджілка мастика"', shape: SQUARE_SM },
    { src: '/images/bakery/gallery/cupcakes-2.jpg', alt: 'Шоколадні капкейки з карамеллю', shape: WIDE_SQUARE },
    { src: '/images/bakery/gallery/cake-3.jpg', alt: 'Торт з кумкватом', shape: SQUARE_LG },
    { src: '/images/bakery/gallery/cake-4.jpg', alt: 'Торт з вафельним папером і еустомами', shape: SQUARE_SM },
    { src: '/images/bakery/gallery/cake-6.jpg', alt: 'Торт "Superman"', shape: VERTICAL },
    { src: '/images/bakery/gallery/cupcakes-5.jpg', alt: 'Карамельні капкейки з цукерками', shape: SQUARE_SM },
    { src: '/images/bakery/gallery/cupcakes-4.jpg', alt: 'Шоколадні капкейки з крафтовими цукерками', shape: SQUARE_SM },
    { src: '/images/bakery/gallery/madlen-2.jpg', alt: 'Шоколадні мадлен', shape: WIDE_HORIZONTAL },
].map(({ shape, ...shot }) => ({ ...shot, ...shape }));

const activeIndex = ref<number | null>(null);
</script>

<template>
    <div>
        <header class="max-w-xl">
            <h2 class="brand-heading brand-heading--on-deep brand-reveal text-4xl sm:text-5xl">
                Що я готую
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
                    preset="photo"
                    :sizes="shot.sizes"
                    loading="lazy"
                />
                <span
                    class="pointer-events-none absolute inset-0 bg-watercourse-950/0 transition-colors duration-300 group-hover:bg-watercourse-950/25"
                    aria-hidden="true"
                />
                <!-- The image alt already names the shot; this only adds the
                     verb, so the button does not read the subject twice. -->
                <span class="sr-only">— відкрити фото</span>
            </button>
        </div>

        <!-- CTA closes the band: the mosaic is the content, Instagram is where it
             continues. Top gap matches the *visible* bottom gap, which is the
             band padding minus the next band's curve overlap: 80-40, 96-56,
             128-56. -->
        <div class="brand-reveal mt-10 flex justify-center lg:mt-18">
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
