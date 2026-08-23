<script setup lang="ts">
/**
 * Full-bleed section band. Owns the page's vertical rhythm and the surface
 * contrast between sections, so individual sections never set their own
 * background or outer padding.
 */
type Surface = 'white' | 'mint' | 'blush' | 'deep'

const props = withDefaults(defineProps<{
    surface?: Surface
    /** Curves the top edge over the previous band. */
    curveTop?: boolean
    id?: string
}>(), {
    surface: 'white',
    curveTop: false,
    id: undefined,
})

const root = ref<HTMLElement | null>(null)
useReveal(root)

const surfaces: Record<Surface, string> = {
    white: 'bg-[var(--brand-surface)]',
    mint: 'bg-[var(--brand-surface-mint)]',
    blush: 'bg-[var(--brand-surface-blush)]',
    deep: 'bg-[var(--brand-surface-deep)]',
}
</script>

<template>
    <section
        :id="props.id"
        ref="root"
        class="brand-band py-20 sm:py-24 lg:py-32"
        :class="[surfaces[props.surface], props.curveTop && 'rounded-t-[2.5rem] sm:rounded-t-[4rem] -mt-10 sm:-mt-14']"
    >
        <!-- Decorative layer: sits behind content, parallax-driven. -->
        <slot name="decoration" />

        <div class="brand-band__inner">
            <slot />
        </div>
    </section>
</template>
