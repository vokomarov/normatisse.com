import type { Ref } from 'vue'

/**
 * Adds `.is-revealed` to every `.brand-reveal` inside `root` the first time it
 * enters the viewport, so the CSS keyframes in main.css run once per element.
 * Nothing is hidden until this runs, so a failed or absent script leaves the
 * page fully visible. Under `prefers-reduced-motion: reduce` it does nothing.
 */
export function useReveal(root: Ref<HTMLElement | null>) {
    if (import.meta.server) return

    let observer: IntersectionObserver | null = null

    onMounted(() => {
        const el = root.value
        if (!el) return

        const items = el.querySelectorAll<HTMLElement>('.brand-reveal')
        if (!items.length) return

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        // Arm first: until this runs the elements render at their final state.
        items.forEach(item => item.classList.add('is-armed'))

        observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue
                    entry.target.classList.add('is-revealed')
                    observer?.unobserve(entry.target)
                }
            },
            { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
        )

        items.forEach(item => observer?.observe(item))
    })

    onBeforeUnmount(() => {
        observer?.disconnect()
        observer = null
    })
}
