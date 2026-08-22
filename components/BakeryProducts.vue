<script setup lang="ts">
interface ProductVariant {
    label: string;
    price: string;
}

interface Product {
    slug: string;
    name: string;
    note?: string;
    photo?: string;
    variants: ProductVariant[];
    description: string[];
}

const products: Product[] = [
    {
        slug: 'torty',
        name: 'Торти',
        note: 'Конструктор — від 900 грн/кг',
        variants: [
            { label: 'Фісташка-малина', price: '900 грн/кг' },
            { label: 'Кава-Бейліс', price: '900 грн/кг' },
            { label: 'Вишня-шоколад', price: '850 грн/кг' },
            { label: 'Кокос-малина', price: '850 грн/кг' },
            { label: 'Ягідний мікс', price: '850 грн/кг' },
        ],
        description: [
            'Бісквіт: ванільний, шоколадний, кавовий, кокосовий, лимонний.',
            'Мус: шоколадний (білий/молочний/темний), ягідний, Бейліс, Кіндер, Орео.',
            'Начинка: ягідний конфітюр або ганаш на білому шоколаді.',
            'Крем: крем-чіз на вершках. Покриття: крем-чіз на маслі або шоколадний ганаш.',
            'Дизайн та покриття крем-чіз на маслі / ганаш рахуються окремо. Інші варіанти — за запитом. Не працюю з велюром.',
        ],
    },
    {
        slug: 'keksy',
        name: 'Кекси',
        note: 'Великі порційні, без «шапочки»',
        variants: [
            { label: 'Шоколадні, x9', price: '594 грн' },
            { label: 'Шоколадні, x6', price: '396 грн' },
            { label: 'Фундучні, x9', price: '693 грн' },
            { label: 'Фундучні, x6', price: '462 грн' },
        ],
        description: [
            'Шоколадні: з шоколадними краплями і нутеллою в середині, посипані фундуком.',
            'Фундучні: з фундучною пастою, шоколадними краплями і нутеллою в середині, посипані пеканом.',
        ],
    },
    {
        slug: 'kapkeiky',
        name: 'Капкейки',
        note: 'Шоколадні, ванільні, карамельні, лимонно-макові',
        variants: [
            { label: 'x12', price: '1020 грн' },
            { label: 'x9', price: '835 грн' },
            { label: 'x6', price: '555 грн' },
            { label: 'x4', price: '360 грн' },
        ],
        description: [
            'Начинка: нутелла, солона карамель, вишня, полуниця, малина.',
            'Верхівка: крем-чіз на вершках. Мінімальний шоколадний дизайн входить у вартість.',
            'Несезонні ягоди, квіти, топер рахуються окремо.',
        ],
    },
    {
        slug: 'madlen',
        name: 'Мадлен',
        note: 'Шоколадний, ванільний, кавовий, лимонно-маковий',
        variants: [
            { label: 'Без начинки, за шт', price: '40 грн' },
            { label: 'З начинкою/капсулою, за шт', price: '45 грн' },
            { label: 'Асорті без начинки, x8', price: '360 грн' },
            { label: 'Асорті без начинки, x12', price: '540 грн' },
            { label: 'Асорті з начинкою, x8', price: '400 грн' },
            { label: 'Асорті з начинкою, x12', price: '600 грн' },
        ],
        description: [
            'Від 12 шт одного смаку — знижка 5%.',
            'Начинка: нутелла, солона карамель, шоколадна, піпетки з Бейліс.',
            'Покриття: білий, молочний, темний шоколад.',
        ],
    },
];

// Pulled out by slug (rather than reordering `products`) so the DOM/grid order can
// match the bakery-counter hierarchy (Торти, Капкейки, Кекси, Мадлен) while the data
// array above stays in the brief's verbatim order.
const torty = products.find((product) => product.slug === 'torty')!;
const kapkeiky = products.find((product) => product.slug === 'kapkeiky')!;
const keksy = products.find((product) => product.slug === 'keksy')!;
const madlen = products.find((product) => product.slug === 'madlen')!;

// Торти's two content modes, rendered as UAccordion items via named `slot`s below.
const tortyAccordionItems = [
    { label: 'Конструктор', value: 'constructor', slot: 'constructor' },
    { label: 'Готові смаки', value: 'flavors', slot: 'flavors' },
];

// Card surface lives on UCard itself via `ui.root` (a supported override, not a class
// fight); rotation/hover transforms live on each card's outer wrapper div instead.
const cardUi = { root: 'flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-watercourse-100 shadow-sm', header: 'p-0 border-b-0' };
const wrapperTransition = 'transition-all duration-150 ease-in-out hover:-translate-y-1 hover:shadow-md hover:ring-watercourse-300 rounded-2xl';
</script>

<template>
    <div>
        <h2 class="logo-font text-3xl sm:text-4xl text-center mb-10">Асортимент та ціни</h2>

        <div class="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-2 gap-6">
            <!-- Торти — flagship showcase, stays level, anchors the layout -->
            <div :class="['lg:col-span-7 lg:row-span-2', wrapperTransition]">
                <UCard :ui="cardUi">
                    <template #header>
                        <div class="aspect-[4/3] w-full bg-gradient-to-br from-watercourse-50 to-white">
                            <img
                                v-if="torty.photo"
                                :src="torty.photo"
                                :alt="torty.name"
                                class="h-full w-full object-cover"
                            >
                        </div>
                        <div class="px-4 pt-4 sm:px-6">
                            <h3 class="logo-font text-3xl sm:text-4xl">{{ torty.name }}</h3>
                            <p v-if="torty.note" class="sub-logo-font text-2xl sm:text-3xl mt-1">{{ torty.note }}</p>
                        </div>
                    </template>

                    <UAccordion :items="tortyAccordionItems" default-value="flavors">
                        <template #constructor-body>
                            <p
                                v-for="(line, i) in torty.description"
                                :key="i"
                                class="text-sm sm:text-base text-gray-600 mb-2 last:mb-0"
                            >
                                {{ line }}
                            </p>
                        </template>

                        <template #flavors-body>
                            <ul class="divide-y divide-watercourse-100">
                                <li
                                    v-for="variant in torty.variants"
                                    :key="variant.label"
                                    class="flex items-baseline justify-between gap-x-2 py-2"
                                >
                                    <span class="min-w-0 flex-1 text-sm sm:text-base text-gray-600">{{ variant.label }}</span>
                                    <span class="sub-logo-font text-lg sm:text-xl shrink-0 whitespace-nowrap">{{ variant.price }}</span>
                                </li>
                            </ul>
                        </template>
                    </UAccordion>
                </UCard>
            </div>

            <!-- Капкейки -->
            <div :class="['lg:col-span-5 lg:rotate-[-1deg]', wrapperTransition]">
                <UCard :ui="cardUi">
                    <template #header>
                        <div class="aspect-square w-full bg-gradient-to-br from-watercourse-50 to-white">
                            <img
                                v-if="kapkeiky.photo"
                                :src="kapkeiky.photo"
                                :alt="kapkeiky.name"
                                class="h-full w-full object-cover"
                            >
                        </div>
                        <div class="px-4 pt-4 sm:px-6">
                            <h3 class="logo-font text-2xl">{{ kapkeiky.name }}</h3>
                            <p v-if="kapkeiky.note" class="text-sm sm:text-base text-gray-600 mt-1">{{ kapkeiky.note }}</p>
                        </div>
                    </template>

                    <ul class="divide-y divide-watercourse-100">
                        <li
                            v-for="variant in kapkeiky.variants"
                            :key="variant.label"
                            class="flex items-baseline justify-between gap-x-2 py-2"
                        >
                            <span class="min-w-0 flex-1 text-sm sm:text-base text-gray-600">{{ variant.label }}</span>
                            <span class="sub-logo-font text-lg sm:text-xl shrink-0 whitespace-nowrap">{{ variant.price }}</span>
                        </li>
                    </ul>

                    <p
                        v-for="(line, i) in kapkeiky.description"
                        :key="i"
                        class="text-sm sm:text-base text-gray-600 mt-3 first:mt-4"
                    >
                        {{ line }}
                    </p>
                </UCard>
            </div>

            <!-- Кекси -->
            <div :class="['lg:col-span-3 lg:rotate-[1deg]', wrapperTransition]">
                <UCard :ui="cardUi">
                    <template #header>
                        <div class="aspect-square w-full bg-gradient-to-br from-watercourse-50 to-white">
                            <img
                                v-if="keksy.photo"
                                :src="keksy.photo"
                                :alt="keksy.name"
                                class="h-full w-full object-cover"
                            >
                        </div>
                        <div class="px-4 pt-4 sm:px-6">
                            <h3 class="logo-font text-2xl">{{ keksy.name }}</h3>
                            <p v-if="keksy.note" class="text-sm sm:text-base text-gray-600 mt-1">{{ keksy.note }}</p>
                        </div>
                    </template>

                    <ul class="divide-y divide-watercourse-100">
                        <li
                            v-for="variant in keksy.variants"
                            :key="variant.label"
                            class="flex items-baseline justify-between gap-x-2 py-2"
                        >
                            <span class="min-w-0 flex-1 text-sm sm:text-base text-gray-600">{{ variant.label }}</span>
                            <span class="sub-logo-font text-lg sm:text-xl shrink-0 whitespace-nowrap">{{ variant.price }}</span>
                        </li>
                    </ul>

                    <p
                        v-for="(line, i) in keksy.description"
                        :key="i"
                        class="text-sm sm:text-base text-gray-600 mt-3 first:mt-4"
                    >
                        {{ line }}
                    </p>
                </UCard>
            </div>

            <!-- Мадлен -->
            <div :class="['lg:col-span-2 lg:rotate-[-0.5deg]', wrapperTransition]">
                <UCard :ui="cardUi">
                    <template #header>
                        <div class="aspect-square w-full bg-gradient-to-br from-watercourse-50 to-white">
                            <img
                                v-if="madlen.photo"
                                :src="madlen.photo"
                                :alt="madlen.name"
                                class="h-full w-full object-cover"
                            >
                        </div>
                        <div class="px-4 pt-4 sm:px-6">
                            <h3 class="logo-font text-2xl">{{ madlen.name }}</h3>
                            <p v-if="madlen.note" class="text-sm sm:text-base text-gray-600 mt-1">{{ madlen.note }}</p>
                        </div>
                    </template>

                    <ul class="divide-y divide-watercourse-100">
                        <li
                            v-for="variant in madlen.variants"
                            :key="variant.label"
                            class="flex items-baseline justify-between gap-x-2 py-2"
                        >
                            <span class="min-w-0 flex-1 text-sm sm:text-base text-gray-600">{{ variant.label }}</span>
                            <span class="sub-logo-font text-lg sm:text-xl shrink-0 whitespace-nowrap">{{ variant.price }}</span>
                        </li>
                    </ul>

                    <p
                        v-for="(line, i) in madlen.description"
                        :key="i"
                        class="text-sm sm:text-base text-gray-600 mt-3 first:mt-4"
                    >
                        {{ line }}
                    </p>
                </UCard>
            </div>
        </div>
    </div>
</template>
