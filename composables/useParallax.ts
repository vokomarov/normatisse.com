import type { Ref } from 'vue'

/**
 * Drives `.brand-parallax` elements in browsers without CSS scroll-driven
 * animations (Firefox today). Where `animation-timeline: view()` is supported
 * the CSS in main.css already handles it and this composable stays idle.
 *
 * No scroll listener: an IntersectionObserver gates a rAF loop so measurement
 * only happens while the element is actually on screen.
 */
export function useParallax(target: Ref<HTMLElement | null>) {
    if (import.meta.server) return

    let frame = 0
    let observer: IntersectionObserver | null = null
    let visible = false

    const supportsScrollTimeline = () =>
        typeof CSS !== 'undefined' && CSS.supports?.('animation-timeline', 'view()')

    const prefersReducedMotion = () =>
        window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const readVar = (el: HTMLElement, name: string, fallback: number) => {
        const raw = getComputedStyle(el).getPropertyValue(name).trim()
        const parsed = Number.parseFloat(raw)
        return Number.isFinite(parsed) ? parsed : fallback
    }

    const tick = () => {
        frame = 0
        const el = target.value
        if (!el || !visible) return

        const rect = el.getBoundingClientRect()
        const travel = window.innerHeight + rect.height
        // 0 when the element is entering from the bottom, 1 when it has fully left.
        const progress = travel > 0 ? (window.innerHeight - rect.top) / travel : 0
        const clamped = Math.min(1, Math.max(0, progress))

        const from = readVar(el, '--parallax-from', 12)
        const to = readVar(el, '--parallax-to', -12)
        el.style.transform = `translate3d(0, ${(from + (to - from) * clamped).toFixed(2)}%, 0)`

        frame = requestAnimationFrame(tick)
    }

    onMounted(() => {
        const el = target.value
        if (!el || supportsScrollTimeline() || prefersReducedMotion()) return

        el.style.willChange = 'transform'
        observer = new IntersectionObserver(([entry]) => {
            visible = Boolean(entry?.isIntersecting)
            if (visible && !frame) frame = requestAnimationFrame(tick)
        })
        observer.observe(el)
    })

    onBeforeUnmount(() => {
        if (frame) cancelAnimationFrame(frame)
        observer?.disconnect()
        frame = 0
        observer = null
    })
}
