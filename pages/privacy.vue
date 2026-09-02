<script setup lang="ts">
const { channels, instagram } = useBakeryContacts();

const { siteUrl } = useRuntimeConfig().public;

const title = 'Політика конфіденційності — Normatisse';
const description = 'Як Normatisse поводиться з персональними даними: сайт не збирає їх узагалі, а дані із замовлень у месенджерах використовуються лише для виконання замовлення.';

// Kept in sync by hand — the date has to mean "the text changed", not "the site
// was rebuilt", so it must not come from the build. Both forms are the same day:
// one for readers, one for `<time datetime>` and the JSON-LD node.
const updatedAt = '23 серпня 2026';
const updatedAtIso = '2026-08-23';

const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${siteUrl}/privacy#webpage`,
    name: title,
    url: `${siteUrl}/privacy`,
    description,
    inLanguage: 'uk',
    // First published the same day it was last edited; keep both fields moving
    // apart only when the text actually changes again.
    datePublished: '2026-08-23',
    dateModified: updatedAtIso,
    author: { '@id': `${siteUrl}/#organization` },
    publisher: { '@id': `${siteUrl}/#organization` },
};

useSeoMeta({
    title,
    ogTitle: title,
    description,
    ogDescription: description,
    ogImage: `${siteUrl}/images/logo.svg`,
    twitterCard: 'summary_large_image',
});

useHead({
    link: [{ rel: 'preload', as: 'image', href: '/images/logo.svg' }],
    script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(schema) }],
});
</script>

<template>
    <div class="bg-[var(--brand-surface)]">
        <section class="brand-band py-20 sm:py-24 lg:py-28">
            <div class="brand-band__inner">
                <div class="max-w-2xl">
                    <NuxtLink to="/" class="brand-focus block w-fit rounded-2xl">
                        <img
                            class="w-40"
                            src="/images/logo.svg"
                            alt="Normatisse"
                            width="331"
                            height="48"
                            fetchpriority="high"
                        >
                    </NuxtLink>

                    <h1 class="brand-heading mt-8 text-4xl sm:text-5xl">
                        Політика конфіденційності
                    </h1>
                    <p class="mt-3 text-sm text-stone-500">
                        Оновлено: <time :datetime="updatedAtIso">{{ updatedAt }}</time>
                    </p>

                    <div class="mt-10 space-y-10">
                        <section>
                            <h2 class="brand-heading text-2xl">Що збирає сайт</h2>
                            <p class="brand-lead mt-3">
                                Нічого. normatisse.com — статичний сайт: тут немає форм, реєстрації,
                                кошика чи особистого кабінету. Сайт не встановлює файли cookie, не
                                підключає аналітику, рекламні мережі чи піксели соцмереж. Шрифти,
                                зображення та іконки завантажуються з цього ж домену — сторінки
                                не роблять запитів до сторонніх сервісів.
                            </p>
                        </section>

                        <section>
                            <h2 class="brand-heading text-2xl">Дані із замовлень</h2>
                            <p class="brand-lead mt-3">
                                Замовлення оформлюються в месенджерах. Коли ви пишете, я отримую те,
                                що ви надсилаєте самі: імʼя або нік, номер телефону, дату й деталі
                                замовлення. Ці дані використовуються тільки для того, щоб узгодити
                                й виконати замовлення, і не передаються третім особам, окрім
                                випадків, коли цього прямо вимагає закон.
                            </p>
                            <p class="brand-lead mt-4">
                                Листування зберігається в самому месенджері стільки, скільки триває
                                історія чату. Ви можете будь-коли видалити його на своєму боці або
                                попросити мене видалити переписку та ваші контакти.
                            </p>
                        </section>

                        <section>
                            <h2 class="brand-heading text-2xl">Сторонні сервіси</h2>
                            <p class="brand-lead mt-3">
                                Посилання на Instagram, Telegram, Viber і телефонні дзвінки ведуть за
                                межі сайту. Щойно ви за ними переходите, ваші дані обробляються за
                                правилами відповідного сервісу, а не цією політикою.
                            </p>
                            <ul class="mt-4 space-y-2">
                                <li v-for="channel in channels" :key="channel.label" class="text-sm text-stone-600">
                                    <span class="font-semibold text-watercourse-800">{{ channel.label }}</span>
                                    — {{ channel.value }}
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 class="brand-heading text-2xl">Ваші права</h2>
                            <p class="brand-lead mt-3">
                                Відповідно до Закону України «Про захист персональних даних» ви маєте
                                право дізнатися, які ваші дані я зберігаю, виправити їх, обмежити
                                їх використання або вимагати видалення. Напишіть будь-яким каналом
                                вище — відповім особисто.
                            </p>
                        </section>

                        <section>
                            <h2 class="brand-heading text-2xl">Зміни</h2>
                            <p class="brand-lead mt-3">
                                Якщо на сайті зʼявляться форми, аналітика або будь-яка інша обробка
                                даних, ця сторінка буде оновлена до того, як це запрацює, і дата
                                вгорі зміниться.
                            </p>
                        </section>
                    </div>

                    <div class="mt-12 flex flex-wrap gap-3">
                        <UButton to="/" color="primary" variant="solid" size="lg">
                            На головну
                        </UButton>
                        <UButton
                            :to="instagram"
                            target="_blank"
                            rel="noopener"
                            icon="i-simple-icons-instagram"
                            color="primary"
                            variant="outline"
                            size="lg"
                        >
                            Написати
                        </UButton>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
