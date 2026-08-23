<script setup lang="ts">
const photoLayer = ref<HTMLElement | null>(null);
const blobLayer = ref<HTMLElement | null>(null);

useParallax(photoLayer);
useParallax(blobLayer);
</script>

<template>
    <section class="brand-band flex min-h-[86svh] items-center bg-[var(--brand-surface)] pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-20 lg:pb-28">
        <!-- Ambient layer: mint/blush wash, blurred blob, then the brand's own
             sprinkles as live particles on top of both. -->
        <div class="pointer-events-none absolute inset-0" aria-hidden="true">
            <div class="absolute inset-0 bg-[radial-gradient(120%_90%_at_82%_-10%,var(--color-blush-100)_0%,transparent_55%),radial-gradient(90%_70%_at_-10%_20%,var(--color-watercourse-100)_0%,transparent_60%)]" />
            <div
                ref="blobLayer"
                class="brand-parallax absolute -top-24 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
                style="--parallax-from: 6%; --parallax-to: -14%; background: conic-gradient(from 140deg, var(--color-blush-200), var(--color-watercourse-200), var(--color-blush-100))"
            />
            <BakerySprinkleField />
        </div>

        <div class="brand-band__inner">
            <div class="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
                <div class="lg:col-span-7">
                    <img
                        class="w-full max-w-[19rem] sm:max-w-sm lg:max-w-md"
                        src="/images/logo-bakery-full.svg"
                        alt="Normatisse Bakery"
                        width="640"
                        height="150"
                    >

                    <p class="sub-logo-font mt-4 pb-1 text-2xl leading-[1.15] sm:text-3xl lg:text-4xl">
                        make day sweeter
                    </p>

                    <p class="brand-lead mt-6 max-w-lg">
                        Домашні торти, кекси, капкейки та мадлен на замовлення у Вінниці.
                        Печу під ваш смак і ваш привід.
                    </p>

                    <div class="mt-9 flex flex-wrap items-center gap-3">
                        <UButton size="xl" color="primary" variant="solid" to="#products">
                            Дивитись асортимент
                        </UButton>
                        <UButton size="xl" color="primary" variant="ghost" to="#contact">
                            Замовити
                        </UButton>
                    </div>
                </div>

                <!-- Photo column. On mobile it drops below the copy rather than
                     disappearing, so the hero still shows the actual product. -->
                <div class="relative lg:col-span-5">
                    <div ref="photoLayer" class="brand-parallax" style="--parallax-from: 5%; --parallax-to: -5%">
                        <div class="relative mx-auto max-w-sm overflow-hidden rounded-[var(--brand-radius-panel)] bg-white p-2 shadow-[0_30px_60px_-30px_rgba(0,47,37,0.45)] ring-1 ring-watercourse-100 lg:mr-0 lg:ml-auto">
                            <NuxtImg
                                src="/images/bakery/gallery/torty.jpg"
                                alt="Торт Normatisse Bakery з ягодами"
                                class="aspect-[4/5] w-full rounded-[calc(var(--brand-radius-panel)-0.5rem)] object-cover"
                                width="560"
                                height="700"
                                sizes="90vw lg:384px"
                                preload
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
