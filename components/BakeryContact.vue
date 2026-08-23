<script setup lang="ts">
const CONTACT_PHONE = '+380734700263';
const INSTAGRAM_BAKERY_LINK = 'https://instagram.com/normatisse.bakery';

const channels = [
    {
        label: 'Instagram Direct',
        value: '@normatisse.bakery',
        icon: 'i-simple-icons-instagram',
        to: INSTAGRAM_BAKERY_LINK,
        external: true,
    },
    {
        label: 'Telegram',
        value: CONTACT_PHONE,
        icon: 'i-simple-icons-telegram',
        to: `https://t.me/${CONTACT_PHONE}`,
        external: true,
    },
    {
        label: 'Viber',
        value: CONTACT_PHONE,
        icon: 'i-simple-icons-viber',
        to: `viber://chat?number=%2B${CONTACT_PHONE.replace('+', '')}`,
        external: false,
    },
    {
        label: 'Телефон',
        value: CONTACT_PHONE,
        icon: 'i-lucide-phone',
        to: `tel:${CONTACT_PHONE}`,
        external: false,
    },
];

// Real sequence, so the numbering carries meaning rather than decoration.
const steps = [
    { title: 'Напишіть', text: 'У Direct або месенджер. Вкажіть дату, привід і приблизну кількість гостей.' },
    { title: 'Обираємо', text: 'Підбираємо смак, розмір і дизайн. Показую приклади під ваш бюджет.' },
    { title: 'Бронюю дату', text: 'Підтверджую вартість і ставлю замовлення в графік.' },
];
</script>

<template>
    <div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-5">
            <h2 class="brand-heading brand-reveal text-4xl sm:text-5xl">Замовити</h2>
            <p class="brand-lead brand-reveal mt-4" style="--reveal-delay: 60ms">
                Пишіть будь-яким зручним способом. Відповідаю особисто, зазвичай протягом дня.
            </p>

            <ol class="brand-reveal mt-10 space-y-6" style="--reveal-delay: 120ms">
                <li v-for="(step, index) in steps" :key="step.title" class="flex gap-4">
                    <span class="mt-0.5 shrink-0 font-display text-2xl font-bold tabular-nums text-blush-500">
                        {{ String(index + 1).padStart(2, '0') }}
                    </span>
                    <div>
                        <p class="font-semibold text-watercourse-800">{{ step.title }}</p>
                        <p class="mt-1 text-sm leading-relaxed text-stone-600">{{ step.text }}</p>
                    </div>
                </li>
            </ol>
        </div>

        <div class="lg:col-span-7">
            <div class="brand-card brand-reveal flex-col p-6 sm:p-8" style="--reveal-delay: 100ms">
                <p class="brand-term">Канали звʼязку</p>

                <ul class="mt-4 divide-y divide-watercourse-100">
                    <li v-for="channel in channels" :key="channel.label">
                        <UButton
                            :to="channel.to"
                            :target="channel.external ? '_blank' : undefined"
                            :rel="channel.external ? 'noopener' : undefined"
                            :icon="channel.icon"
                            color="neutral"
                            variant="ghost"
                            size="xl"
                            class="w-full justify-start gap-4 rounded-[var(--brand-radius-inner)] px-3 py-4"
                        >
                            <span class="flex min-w-0 flex-col items-start text-left">
                                <span class="text-xs font-medium tracking-wide text-stone-500">{{ channel.label }}</span>
                                <span class="truncate text-base font-semibold text-watercourse-800">{{ channel.value }}</span>
                            </span>
                            <UIcon name="i-lucide-arrow-up-right" class="ml-auto size-4 shrink-0 text-stone-400" />
                        </UButton>
                    </li>
                </ul>

                <div class="brand-panel mt-6 flex items-start gap-3 p-4">
                    <UIcon name="i-lucide-calendar-check" class="mt-0.5 size-5 shrink-0 text-watercourse-600" />
                    <p class="text-sm leading-relaxed text-stone-600">
                        Вінниця, самовивіз. Дати на вихідні розбирають найшвидше, тому бронюйте заздалегідь.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
