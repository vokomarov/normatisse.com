<script setup lang="ts">
/**
 * Full-screen image viewer shared by the gallery and the reviews. Escape is
 * handled by UModal; arrow keys walk the set.
 */
interface LightboxItem {
    src: string
    alt: string
    width?: number
    height?: number
}

const props = defineProps<{
    items: LightboxItem[]
    /** Index of the open item, or null when closed. */
    index: number | null
    title?: string
}>()

const emit = defineEmits<{ 'update:index': [value: number | null] }>()

const isOpen = computed({
    get: () => props.index !== null,
    set: (value: boolean) => {
        if (!value) emit('update:index', null)
    },
})

const active = computed(() => (props.index === null ? null : props.items[props.index]))

function step(delta: number) {
    if (props.index === null) return
    emit('update:index', (props.index + delta + props.items.length) % props.items.length)
}

useEventListener(window, 'keydown', (event: KeyboardEvent) => {
    if (props.index === null) return
    if (event.key === 'ArrowLeft') step(-1)
    else if (event.key === 'ArrowRight') step(1)
})
</script>

<template>
    <UModal
        v-model:open="isOpen"
        :ui="{
            overlay: 'bg-watercourse-950/80 backdrop-blur-sm',
            content: 'max-w-[min(92vw,46rem)] bg-transparent ring-0 shadow-none divide-y-0',
        }"
        :title="props.title ?? 'Перегляд зображення'"
        :description="active?.alt ?? ''"
    >
        <template #content>
            <div>
                <div class="relative mx-auto w-fit">
                    <img
                        v-if="active"
                        :src="active.src"
                        :alt="active.alt"
                        class="max-h-[78svh] w-auto max-w-full rounded-[var(--brand-radius-panel)] bg-white shadow-2xl"
                        :width="active.width"
                        :height="active.height"
                    >

                    <UButton
                        class="absolute top-3 right-3 bg-white text-watercourse-900 shadow-lg hover:bg-white/85"
                        icon="i-lucide-x"
                        size="lg"
                        square
                        aria-label="Закрити"
                        @click="isOpen = false"
                    />
                </div>

                <div v-if="props.items.length > 1" class="mt-5 flex items-center justify-center gap-3">
                    <UButton
                        class="bg-white text-watercourse-900 hover:bg-white/85"
                        icon="i-lucide-chevron-left"
                        size="lg"
                        square
                        aria-label="Попереднє зображення"
                        @click="step(-1)"
                    />
                    <span class="min-w-16 text-center text-sm font-medium text-white">
                        {{ (props.index ?? 0) + 1 }} / {{ props.items.length }}
                    </span>
                    <UButton
                        class="bg-white text-watercourse-900 hover:bg-white/85"
                        icon="i-lucide-chevron-right"
                        size="lg"
                        square
                        aria-label="Наступне зображення"
                        @click="step(1)"
                    />
                </div>
            </div>
        </template>
    </UModal>
</template>
