<script setup lang="ts">
/**
 * Full-bleed photo band carrying the brand's own words. Sits between the
 * customers' voice (reviews) and the order form, so the page pauses on who is
 * actually baking before it asks for anything.
 */
const photoLayer = ref<HTMLElement | null>(null);

useParallax(photoLayer);
</script>

<template>
    <section
        id="manifesto"
        class="brand-band flex min-h-[18rem] items-center py-15 sm:min-h-[20rem] sm:py-17 lg:min-h-[24rem] lg:py-20"
    >
        <!-- 140% tall with a 20% overhang each side: the layer travels ±12% of its
             own height (~97px), which has to stay inside the 20% overhang (~115px)
             or the band shows an edge. -->
        <div
            ref="photoLayer"
            class="brand-parallax absolute -top-[20%] left-0 h-[140%] w-full"
            style="--parallax-from: 12%; --parallax-to: -12%"
            aria-hidden="true"
        >
            <!-- Decorative band: the photo sits under a scrim with solid text
                 bars over it, so 1x at 1280 is the useful ceiling. At 2x the
                 1800px source would be upscaled to 2560 for no visible gain. -->
            <NuxtImg
                src="/images/bakery/manifesto.jpg"
                alt=""
                class="h-full w-full object-cover object-center"
                preset="photo"
                width="1280"
                height="853"
                sizes="480px sm:768px lg:1280px"
                densities="1x"
                loading="lazy"
            />
        </div>

        <!-- Light scrim only: each line carries its own solid bar, so the contrast
             is handled there and this layer only has to keep the photo from
             clashing with the light bands above and below. -->
        <div
            class="absolute inset-0 bg-watercourse-950/25 bg-[linear-gradient(to_bottom,rgba(0,47,37,0.34),rgba(0,47,37,0.06)_45%,rgba(0,47,37,0.36))]"
            aria-hidden="true"
        />

        <div class="brand-band__inner">
            <!-- Four bars in two flush pairs, all on the container's left gutter:
                 white for the claim, blush for the aside, deep green for the two
                 notes. Each bar hugs its own text — the columns are flex, so no
                 width or `display` is set on the lines. -->
            <blockquote class="flex w-full flex-col gap-5 text-left sm:gap-6">
                <div class="flex flex-col items-start">
                    <!-- 24px is the largest size that keeps this line unwrapped inside
                         the bar at 390px; wrapped, the emoji orphans onto its own row. -->
                    <p class="brand-quote-line brand-reveal bg-white text-2xl leading-tight font-bold text-watercourse-800 sm:text-[2.25rem] lg:text-[2.75rem]">
                        Несу своє хобі в маси 🧁
                    </p>

                    <p
                        class="brand-quote-line brand-reveal bg-blush-700 text-xl leading-tight font-semibold text-white sm:text-2xl lg:text-[1.75rem]"
                        style="--reveal-delay: 70ms"
                    >
                        принаймні намагаюсь 😅
                    </p>
                </div>

                <!-- `wow` and `norm` are the only Latin words in the copy, so they
                     get the display face and tie the line back to the wordmark. -->
                <div class="flex flex-col items-start">
                    <p
                        class="brand-quote-line brand-quote-line--note brand-reveal bg-watercourse-950/85 text-[0.9375rem] leading-relaxed text-[var(--brand-on-deep)] backdrop-blur-[2px] sm:text-base lg:text-lg"
                        style="--reveal-delay: 140ms"
                    >
                        Можливо, не завжди <span class="font-display font-bold text-blush-300 italic">wow!</span>,
                    </p>

                    <p
                        class="brand-quote-line brand-quote-line--note brand-reveal bg-watercourse-950/85 text-[0.9375rem] leading-relaxed text-[var(--brand-on-deep)] backdrop-blur-[2px] sm:text-base lg:text-lg"
                        style="--reveal-delay: 210ms"
                    >
                        але завжди, як мінімум <span class="font-display font-bold text-blush-300 italic">norm</span> 🫶
                    </p>
                </div>
            </blockquote>
        </div>
    </section>
</template>
