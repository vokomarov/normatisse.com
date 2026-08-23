<script setup lang="ts">
/**
 * Mobile carousel primitive. Below `lg` the children lay out as a scroll-snap
 * track that peeks the next card; from `lg` up the same element becomes the
 * grid passed in `desktop`. Dots only render while the track actually
 * overflows, so they disappear on the desktop grid without a breakpoint guess.
 */
const props = withDefaults(defineProps<{
    /** Layout classes applied once the rail hands over. */
    desktop?: string
    /** Breakpoint at which the rail stops scrolling. Must match `desktop`. */
    from?: 'sm' | 'lg'
    /** Accessible name for the scroll region. */
    label?: string
}>(), {
    desktop: 'sm:grid sm:grid-cols-2 lg:grid-cols-3',
    from: 'sm',
    label: undefined,
})

const track = ref<HTMLElement | null>(null)
const count = ref(0)
const active = ref(0)
const overflows = ref(false)

function slides(): HTMLElement[] {
    return track.value ? Array.from(track.value.children) as HTMLElement[] : []
}

function measure() {
    const el = track.value
    if (!el) return
    count.value = el.children.length
    overflows.value = el.scrollWidth - el.clientWidth > 4
}

function onScroll() {
    const el = track.value
    if (!el) return
    // Nearest slide start wins, so a half-swipe still reports the card in view.
    const items = slides()
    let best = 0
    let bestDistance = Infinity
    items.forEach((item, index) => {
        const distance = Math.abs(item.offsetLeft - el.scrollLeft - el.clientLeft)
        if (distance < bestDistance) {
            bestDistance = distance
            best = index
        }
    })
    active.value = best
}

function goTo(index: number) {
    slides()[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
}

let observer: ResizeObserver | null = null

onMounted(() => {
    measure()
    observer = new ResizeObserver(measure)
    if (track.value) observer.observe(track.value)
})

onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
})
</script>

<template>
    <div>
        <div
            ref="track"
            class="brand-rail flex"
            :class="[`brand-rail--from-${props.from}`, props.desktop]"
            :role="overflows ? 'region' : undefined"
            :aria-label="overflows ? props.label : undefined"
            :tabindex="overflows ? 0 : undefined"
            @scroll.passive="onScroll"
        >
            <slot />
        </div>

        <!-- Scroll affordance: the peeking card shows there is more, the dots say
             how much more and jump between cards. -->
        <div v-show="overflows" class="mt-5 flex items-center justify-center gap-2.5">
            <button
                v-for="index in count"
                :key="index"
                type="button"
                class="brand-focus h-2 rounded-full transition-all duration-300 ease-[var(--brand-ease)]"
                :class="index - 1 === active ? 'w-6 bg-blush-500' : 'w-2 bg-watercourse-200 hover:bg-watercourse-300'"
                :aria-label="`Показати картку ${index}`"
                :aria-current="index - 1 === active ? 'true' : undefined"
                @click="goTo(index - 1)"
            />
        </div>
    </div>
</template>
