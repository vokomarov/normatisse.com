<script setup lang="ts">
const { channels, leadTime } = useBakeryContacts();

// Real sequence, so the numbering carries meaning rather than decoration.
const steps = [
    { title: 'Напишіть', text: 'У Direct або месенджер. Вкажіть дату, привід, що саме хочете і бажаний дизайн.' },
    { title: 'Обираємо', text: 'Підбираємо смак, розмір і дизайн. Показую приклади під ваш бюджет.' },
    { title: 'Бронюю дату', text: 'Підтверджую вартість і ставлю замовлення в графік. Готую до вашої дати.' },
];
</script>

<template>
    <div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-5">
            <h2 class="brand-heading brand-reveal text-4xl sm:text-5xl">Забронювати дату</h2>
            <!-- The lead time belongs here, not in step 03: it is how early to
                 write, not how long the baking takes. -->
            <p class="brand-lead brand-reveal mt-4" style="--reveal-delay: 60ms">
                Напишіть у Direct за {{ leadTime }} до потрібної дати.
                Відповідаю особисто, зазвичай протягом дня.
            </p>

            <!-- Fixed-width numeral column: Josefin has no tabular figures, so a
                 flex gap would leave "01" a few pixels off the rows below it. -->
            <ol class="brand-reveal mt-10 space-y-6" style="--reveal-delay: 120ms">
                <li v-for="(step, index) in steps" :key="step.title" class="grid grid-cols-[2.5rem_1fr] items-start">
                    <span class="font-display text-2xl leading-8 font-bold text-blush-500">
                        {{ String(index + 1).padStart(2, '0') }}
                    </span>
                    <div>
                        <p class="leading-8 font-semibold text-watercourse-800">{{ step.title }}</p>
                        <p class="mt-1 text-sm leading-relaxed text-stone-600">{{ step.text }}</p>
                    </div>
                </li>
            </ol>
        </div>

        <div class="lg:col-span-7">
            <div class="brand-card brand-reveal flex-col p-6 sm:p-8" style="--reveal-delay: 100ms">
                <p class="brand-term">Канали звʼязку</p>

                <!-- One channel is marked and styled as the answer; the rest stay
                     ghost rows. Four equally weighted options at the last step of
                     the page is a choice to make, not an action to take. -->
                <ul class="mt-4 divide-y divide-watercourse-100">
                    <li v-for="channel in channels" :key="channel.label">
                        <UButton
                            :to="channel.to"
                            :target="channel.external ? '_blank' : undefined"
                            :rel="channel.external ? 'noopener' : undefined"
                            :icon="channel.icon"
                            :color="channel.primary ? 'primary' : 'neutral'"
                            :variant="channel.primary ? 'soft' : 'ghost'"
                            size="xl"
                            class="w-full justify-start gap-4 rounded-[var(--brand-radius-inner)] px-3 py-4"
                        >
                            <span class="flex min-w-0 flex-col items-start text-left">
                                <span class="flex flex-wrap items-center gap-x-2 text-xs font-medium tracking-wide text-stone-500">
                                    {{ channel.label }}
                                    <span
                                        v-if="channel.note"
                                        class="rounded-full bg-blush-100 px-2 py-0.5 text-[0.6875rem] font-semibold text-blush-700"
                                    >
                                        {{ channel.note }}
                                    </span>
                                </span>
                                <span class="truncate text-base font-semibold text-watercourse-800">{{ channel.value }}</span>
                            </span>
                            <!-- stone-400 lands under the 3:1 floor for non-text
                                 graphics on this surface; stone-500 clears it. -->
                            <UIcon name="i-lucide-arrow-up-right" class="ml-auto size-4 shrink-0 text-stone-500" />
                        </UButton>
                    </li>
                </ul>

                <div class="brand-panel mt-6 flex items-start gap-3 p-4">
                    <UIcon name="i-lucide-calendar-check" class="mt-0.5 size-5 shrink-0 text-watercourse-600" />
                    <p class="text-sm leading-relaxed text-stone-600">
                        Вінниця. Самовивіз або доставка по місту за тарифом таксі до вашої адреси.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
