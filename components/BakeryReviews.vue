<script setup lang="ts">
const { instagram } = useBakeryContacts();

// `quote` transcribes the message burned into the screenshot, verbatim including
// its typos — the section promises unedited screenshots and a tidied quote would
// break that promise. It is the readable layer; the screenshot below it is the
// receipt. `caption` names the order from what the photo shows, because these
// are anonymous Direct messages and a fabricated customer name would be a lie.
//
// `focus` is where the message text sits in each file — that is the part the
// rail crop must keep; the product photo above or below it can go. The lightbox
// still shows the whole screenshot.
const reviews = [
    {
        height: 666,
        focus: 'object-bottom',
        quote: 'Тьотя і дружина куштували, то аж очі збільшили, сказали що нереально смачні!',
        caption: 'Капкейки на день народження',
        alt: 'Скріншот відгуку про капкейки з декором на день народження',
    },
    {
        height: 490,
        focus: 'object-top',
        quote: 'Мій романтичний солодкий подарунок коханому! Дякую за те, що втілили мою ідею.',
        caption: 'Подарунковий набір горішків',
        alt: 'Скріншот відгуку про подарунковий набір горішків зі стрічкою',
    },
    {
        height: 548,
        focus: 'object-bottom',
        quote: 'Торт всім сподобався, спеціально всіх перепитала, від малечі до людей похилого віку. Все свіже, смачне, сбалансоване.',
        caption: 'Торт на 70 років',
        alt: 'Скріншот відгуку про ягідний торт із цифрою 70',
    },
    {
        height: 601,
        focus: 'object-top',
        quote: 'Щиро дякую за ароматний та смачнючий гарбузовий пиріг.',
        caption: 'Гарбузовий пиріг',
        alt: 'Скріншот відгуку про гарбузовий пиріг зі збитими вершками',
    },
    {
        height: 601,
        focus: 'object-center',
        quote: 'Смакота!',
        caption: 'Асорті мадлен',
        alt: 'Скріншот відгуку про подарункову коробку мадлен',
    },
].map((review, i) => ({
    ...review,
    n: i + 1,
    src: `/images/bakery/reviews/review-${i + 1}.jpg`,
    width: 414,
}));

const activeIndex = ref<number | null>(null);
</script>

<template>
    <div>
        <header class="max-w-xl">
            <h2 class="brand-heading brand-reveal text-4xl sm:text-5xl">Що кажуть клієнти</h2>
            <p class="brand-lead brand-reveal mt-4" style="--reveal-delay: 60ms">
                Скріншоти з переписок, без редагування. Натисніть, щоб відкрити повністю.
            </p>
        </header>

        <!-- Rail on phones, masonry from `sm` up. Quote first, screenshot under
             it: the words are what a reader scans, the screenshot is the proof
             they are real. The rail crops each card to one height and the
             lightbox shows the full screenshot. -->
        <BrandRail
            class="brand-reveal mt-12"
            from="sm"
            desktop="sm:block sm:columns-2 lg:columns-3"
            label="Відгуки клієнтів"
        >
            <article
                v-for="(review, index) in reviews"
                :key="review.n"
                class="brand-card flex-col overflow-hidden sm:mb-5 sm:break-inside-avoid"
                :style="{ '--reveal-delay': `${index * 60}ms` }"
            >
                <blockquote class="px-5 pt-5 pb-4">
                    <p class="text-sm leading-relaxed text-stone-700">{{ review.quote }}</p>
                    <footer class="brand-term mt-3 block">{{ review.caption }}</footer>
                </blockquote>

                <button
                    type="button"
                    class="brand-focus group relative block w-full cursor-zoom-in overflow-hidden transition duration-300 ease-[var(--brand-ease)] hover:opacity-95"
                    @click="activeIndex = index"
                >
                    <img
                        :src="review.src"
                        :alt="review.alt"
                        class="h-56 w-full object-cover sm:h-auto"
                        :class="review.focus"
                        :width="review.width"
                        :height="review.height"
                        loading="lazy"
                    >
                    <span class="sr-only">Відкрити скріншот повністю</span>
                </button>
            </article>
        </BrandRail>

        <!-- Same gaps as the gallery CTA. Nothing curves over this band, so the
             negative bottom margin has to stand in for the overlap the gallery
             gets for free. -->
        <div class="brand-reveal mt-10 -mb-10 flex justify-center sm:-mb-14 lg:mt-18">
            <UButton
                icon="i-simple-icons-instagram"
                color="primary"
                variant="outline"
                size="xl"
                :to="instagram"
                target="_blank"
                rel="noopener"
            >
                Читати всі відгуки
            </UButton>
        </div>

        <BrandLightbox
            v-model:index="activeIndex"
            :items="reviews"
            title="Відгуки клієнтів"
        />
    </div>
</template>
