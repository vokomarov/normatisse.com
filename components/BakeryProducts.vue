<script setup lang="ts">
import SprinkleScatter from '@/components/SprinkleScatter.vue';

interface PriceRow {
    label: string;
    price: string;
}

interface PriceGroup {
    label?: string;
    rows: PriceRow[];
}

interface DetailGroup {
    term: string;
    values: string[];
}

interface Product {
    slug: string;
    name: string;
    /** One line: what the thing is. Never carries prices or options. */
    lead: string;
    photo: string;
    from: string;
    priceCaption: string;
    prices: PriceGroup[];
    details: DetailGroup[];
    note?: string;
}

// Торти is the flagship: it is the only line with a build-your-own path, so it
// gets its own feature block rather than a slot in the card grid.
// Flavour compositions come from the Instagram pricing carousel.
const torty = {
    name: 'Торти',
    lead: 'Бісквітні торти на замовлення. Візьміть один із готових смаків або зберіть свій.',
    photo: '/images/bakery/gallery/torty.jpg',
    from: 'від 850 грн/кг',
    flavours: [
        {
            label: 'Фісташка і малина',
            price: '900 грн/кг',
            description: 'Фісташковий бісквіт, крем-чіз на вершках з фісташковою пастою, малиновий мус, малиновий конфі з фісташковим ганашем.',
        },
        {
            label: 'Кава і Бейліс',
            price: '900 грн/кг',
            description: 'Кавовий бісквіт, кавовий крем-чіз на вершках, мус на основі білого шоколаду з лікером Бейліс, ганаш Бейліс.',
        },
        {
            label: 'Вишня і шоколад',
            price: '850 грн/кг',
            description: 'Шоколадний бісквіт, крем-чіз на вершках з темним шоколадом, вишневий мус, вишневий конфі.',
        },
        {
            label: 'Кокос і малина',
            price: '850 грн/кг',
            description: 'Кокосовий бісквіт, крем-чіз на вершках, малиновий мус, малиновий конфі, кокосовий ганаш.',
        },
        {
            label: 'Ягідний мікс',
            price: '850 грн/кг',
            description: 'Ванільний бісквіт, крем-чіз на вершках, ягідний мус, ягідний конфі.',
        },
    ],
    builder: [
        { term: 'Бісквіт', values: ['ванільний', 'шоколадний', 'кавовий', 'кокосовий', 'лимонний'] },
        { term: 'Мус', values: ['білий шоколад', 'молочний шоколад', 'темний шоколад', 'ягідний', 'Бейліс', 'Кіндер', 'Орео'] },
        { term: 'Начинка', values: ['ягідний конфітюр', 'ганаш на білому шоколаді'] },
        { term: 'Крем', values: ['крем-чіз на вершках'] },
        { term: 'Покриття', values: ['крем-чіз на маслі', 'шоколадний ганаш'] },
    ] satisfies DetailGroup[],
    builderNote: 'Конструктор рахується від 900 грн/кг. Дизайн і покриття рахуються окремо. Інші варіанти за запитом. З велюром не працюю.',
};

const products: Product[] = [
    {
        slug: 'kapkeiky',
        name: 'Капкейки',
        lead: 'Шоколадні, ванільні, карамельні та лимонно-макові.',
        photo: '/images/bakery/gallery/kapkeiky.jpg',
        from: 'від 360 грн',
        priceCaption: 'За набір',
        prices: [
            {
                rows: [
                    { label: '12 шт', price: '1020 грн' },
                    { label: '9 шт', price: '835 грн' },
                    { label: '6 шт', price: '555 грн' },
                    { label: '4 шт', price: '360 грн' },
                ],
            },
        ],
        details: [
            { term: 'Начинка', values: ['нутелла', 'солона карамель', 'вишня', 'полуниця', 'малина'] },
            { term: 'Верхівка', values: ['крем-чіз на вершках'] },
        ],
        note: 'Мінімальний шоколадний дизайн входить у вартість. Несезонні ягоди, квіти та топер рахуються окремо.',
    },
    {
        slug: 'keksy',
        name: 'Кекси',
        lead: 'Великі порційні кекси без «шапочки».',
        photo: '/images/bakery/gallery/keksy.jpg',
        from: 'від 396 грн',
        priceCaption: 'За набір',
        prices: [
            {
                label: 'Шоколадні',
                rows: [
                    { label: '9 шт', price: '594 грн' },
                    { label: '6 шт', price: '396 грн' },
                ],
            },
            {
                label: 'Фундучні',
                rows: [
                    { label: '9 шт', price: '693 грн' },
                    { label: '6 шт', price: '462 грн' },
                ],
            },
        ],
        details: [
            { term: 'Шоколадні', values: ['шоколадні краплі', 'нутелла всередині', 'фундук зверху'] },
            { term: 'Фундучні', values: ['фундучна паста', 'шоколадні краплі', 'нутелла всередині', 'пекан зверху'] },
        ],
    },
    {
        slug: 'madlen',
        name: 'Мадлен',
        lead: 'Шоколадний, ванільний, кавовий та лимонно-маковий.',
        photo: '/images/bakery/gallery/madlen.jpg',
        from: 'від 40 грн',
        priceCaption: 'Поштучно та асорті',
        prices: [
            {
                label: 'Поштучно',
                rows: [
                    { label: 'Без начинки', price: '40 грн' },
                    { label: 'З начинкою', price: '45 грн' },
                ],
            },
            {
                label: 'Асорті без начинки',
                rows: [
                    { label: '8 шт', price: '360 грн' },
                    { label: '12 шт', price: '540 грн' },
                ],
            },
            {
                label: 'Асорті з начинкою',
                rows: [
                    { label: '8 шт', price: '400 грн' },
                    { label: '12 шт', price: '600 грн' },
                ],
            },
        ],
        details: [
            { term: 'Начинка', values: ['нутелла', 'солона карамель', 'шоколадна', 'піпетки з Бейліс'] },
            { term: 'Покриття', values: ['білий шоколад', 'молочний шоколад', 'темний шоколад'] },
        ],
        note: 'Від 12 шт одного смаку знижка 5%.',
    },
];

// The constructor is opened by its own CTA rather than an accordion header, so
// the invitation to build a cake reads as an action, not as a disclosure row.
const isBuilderOpen = ref(false);
</script>

<template>
    <div>
        <header class="max-w-2xl">
            <h2 class="brand-heading brand-reveal text-4xl sm:text-5xl lg:text-[3.25rem]">
                Асортимент
            </h2>
            <p class="brand-lead brand-reveal mt-4" style="--reveal-delay: 60ms">
                Кожна позиція печеться під замовлення. Наперед бронюйте дату, особливо на вихідні.
            </p>
        </header>

        <!-- Flagship block: photo beside three clearly separated content zones
             (what it is / what it costs / what you can choose). -->
        <article class="brand-card brand-reveal mt-12 flex-col lg:mt-16 lg:flex-row" style="--reveal-delay: 80ms">
            <div class="relative lg:w-[42%] lg:shrink-0">
                <NuxtImg
                    :src="torty.photo"
                    :alt="`${torty.name} Normatisse Bakery`"
                    class="h-56 w-full object-cover sm:h-72 lg:h-full lg:min-h-[34rem]"
                    preset="photo"
                    width="900"
                    height="1200"
                    sizes="100vw lg:544px"
                    loading="lazy"
                />
                <p class="absolute bottom-4 left-4 rounded-full bg-white/95 px-4 py-1.5 text-sm font-semibold text-watercourse-800 shadow-sm backdrop-blur">
                    {{ torty.from }}
                </p>
            </div>

            <div class="flex min-w-0 flex-1 flex-col gap-8 p-6 sm:p-8 lg:p-10">
                <!-- Zone 1: identity -->
                <div>
                    <h3 class="brand-heading text-3xl sm:text-4xl">{{ torty.name }}</h3>
                    <p class="brand-lead mt-2">{{ torty.lead }}</p>
                </div>

                <!-- Zone 2: prices, on their own surface. Each flavour carries its
                     composition, so the price row is never a bare label. -->
                <div class="brand-panel p-5 sm:p-6">
                    <p class="brand-term">Готові смаки</p>
                    <!-- A `div` inside a `dl` may contain only `dt`/`dd`, so the
                         name/price row is laid out with a grid on the group
                         rather than a wrapper element around the pair. -->
                    <dl class="mt-4 space-y-4">
                        <div
                            v-for="flavour in torty.flavours"
                            :key="flavour.label"
                            class="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 border-b border-watercourse-100 pb-4 last:border-b-0 last:pb-0"
                        >
                            <dt class="min-w-0 font-semibold text-watercourse-900">{{ flavour.label }}</dt>
                            <dd class="brand-price text-lg sm:text-xl">{{ flavour.price }}</dd>
                            <dd class="col-span-2 mt-1.5 text-sm leading-relaxed text-stone-600">{{ flavour.description }}</dd>
                        </div>
                    </dl>
                </div>

                <!-- Zone 3: the build-your-own path, opened by its own CTA -->
                <div>
                    <div class="rounded-[var(--brand-radius-inner)] bg-blush-50 p-5 ring-1 ring-blush-100 sm:p-6">
                        <p class="font-display text-xl font-bold text-watercourse-800 sm:text-2xl">
                            Не знайшли свій смак?
                        </p>
                        <p class="mt-1.5 text-sm leading-relaxed text-stone-600">
                            Зберіть торт з нуля: бісквіт, мус, начинка, крем і покриття — на ваш вибір.
                        </p>
                        <UButton
                            class="mt-5"
                            color="secondary"
                            variant="solid"
                            size="lg"
                            :icon="isBuilderOpen ? 'i-lucide-chevron-up' : 'i-lucide-wand-sparkles'"
                            :aria-expanded="isBuilderOpen"
                            aria-controls="cake-builder"
                            @click="isBuilderOpen = !isBuilderOpen"
                        >
                            {{ isBuilderOpen ? 'Згорнути конструктор' : 'Зібрати свій торт' }}
                        </UButton>
                    </div>

                    <!-- Kept mounted: the constructor is the page's richest copy
                         and should stay in the DOM for search and for aria-controls. -->
                    <UCollapsible v-model:open="isBuilderOpen" :unmount-on-hide="false">
                        <template #content>
                            <div id="cake-builder" class="pt-7">
                                <dl class="space-y-7">
                                    <div v-for="group in torty.builder" :key="group.term">
                                        <dt class="brand-term">{{ group.term }}</dt>
                                        <dd class="mt-2.5 flex flex-wrap gap-x-3 gap-y-2.5">
                                            <span v-for="value in group.values" :key="value" class="brand-chip">{{ value }}</span>
                                        </dd>
                                    </div>
                                </dl>
                                <p class="mt-6 text-sm leading-relaxed text-stone-500">{{ torty.builderNote }}</p>
                            </div>
                        </template>
                    </UCollapsible>
                </div>
            </div>
        </article>

        <!-- Catalogue grid: same three zones, compact. Below `lg` it is a
             scroll-snap rail so the cards keep a readable width on phones. -->
        <BrandRail
            class="brand-reveal mt-6 lg:mt-8"
            from="sm"
            desktop="sm:grid sm:grid-cols-2 lg:grid-cols-3"
            label="Інші позиції"
        >
            <article
                v-for="product in products"
                :key="product.slug"
                class="brand-card flex-col"
            >
                <div class="relative">
                    <NuxtImg
                        :src="product.photo"
                        :alt="`${product.name} Normatisse Bakery`"
                        class="aspect-[4/3] w-full object-cover"
                        preset="photo"
                        width="640"
                        height="480"
                        sizes="100vw sm:50vw lg:384px"
                        loading="lazy"
                    />
                    <p class="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-watercourse-800 shadow-sm backdrop-blur">
                        {{ product.from }}
                    </p>
                </div>

                <div class="flex flex-1 flex-col gap-6 p-5 sm:p-6">
                    <div>
                        <h3 class="brand-heading text-2xl">{{ product.name }}</h3>
                        <p class="mt-1.5 text-sm leading-relaxed text-stone-600">{{ product.lead }}</p>
                    </div>

                    <div class="brand-panel p-4">
                        <p class="brand-term">{{ product.priceCaption }}</p>
                        <div class="mt-2 space-y-3">
                            <div v-for="(group, groupIndex) in product.prices" :key="group.label ?? groupIndex">
                                <p v-if="group.label" class="text-xs font-medium text-watercourse-800">{{ group.label }}</p>
                                <dl>
                                    <div
                                        v-for="row in group.rows"
                                        :key="row.label"
                                        class="flex items-baseline justify-between gap-3 py-1"
                                    >
                                        <dt class="min-w-0 text-sm text-stone-700">{{ row.label }}</dt>
                                        <dd class="brand-price text-base">{{ row.price }}</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>

                    <dl class="space-y-5">
                        <div v-for="group in product.details" :key="group.term">
                            <dt class="brand-term">{{ group.term }}</dt>
                            <dd class="mt-2.5 flex flex-wrap gap-x-3 gap-y-2.5">
                                <span v-for="value in group.values" :key="value" class="brand-chip">{{ value }}</span>
                            </dd>
                        </div>
                    </dl>

                    <p v-if="product.note" class="mt-auto text-xs leading-relaxed text-stone-500">{{ product.note }}</p>
                </div>
            </article>
        </BrandRail>

        <div class="pointer-events-none absolute top-1/3 -right-10 hidden h-44 w-44 lg:block" aria-hidden="true">
            <SprinkleScatter class="scale-90 opacity-50" />
        </div>
    </div>
</template>
