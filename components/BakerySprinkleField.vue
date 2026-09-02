<script setup lang="ts">
/**
 * Ambient particle field for the hero.
 *
 * Deliberately not a generic particle library: the particles are the brand's
 * own sprinkle motif (jimmies + nonpareils in blush and mint), which is what
 * the SprinkleScatter SVG already draws statically. A library would add ~200KB
 * to render round dots that are off-brand.
 *
 * Draws straight to canvas from the rAF loop, so nothing here touches Vue
 * reactivity per frame. Paused when off-screen or when the tab is hidden;
 * renders a single static frame under prefers-reduced-motion.
 */
const props = withDefaults(defineProps<{
    /** Particles per 100k px² of canvas. */
    density?: number
}>(), {
    density: 26,
})

const JIMMY_COLORS = ['#f55c81', '#fda1bb', '#29dea5', '#66efc0', '#ffc9d7']

interface Sprinkle {
    x: number
    y: number
    len: number
    thickness: number
    angle: number
    spin: number
    fall: number
    swayAmp: number
    swayPhase: number
    swaySpeed: number
    alpha: number
    color: string
    round: boolean
}

const canvas = ref<HTMLCanvasElement | null>(null)

let ctx: CanvasRenderingContext2D | null = null
let sprinkles: Sprinkle[] = []
let frame = 0
let width = 0
let height = 0
let last = 0
let visible = false
let resizeObserver: ResizeObserver | null = null
let reduced = false

const random = (min: number, max: number) => min + Math.random() * (max - min)

function createSprinkle(spawnAbove = false): Sprinkle {
    const round = Math.random() < 0.35
    const len = round ? random(2.5, 5) : random(7, 14)

    return {
        x: random(0, width),
        y: spawnAbove ? random(-height * 0.4, 0) : random(0, height),
        len,
        thickness: round ? len : random(2.5, 4),
        angle: random(0, Math.PI * 2),
        spin: random(-0.35, 0.35),
        fall: random(6, 18),
        swayAmp: random(6, 22),
        swayPhase: random(0, Math.PI * 2),
        swaySpeed: random(0.15, 0.45),
        alpha: random(0.18, 0.55),
        color: JIMMY_COLORS[Math.floor(Math.random() * JIMMY_COLORS.length)]!,
        round,
    }
}

function build() {
    const target = Math.round((width * height) / 100_000 * props.density)
    sprinkles = Array.from({ length: Math.min(90, Math.max(14, target)) }, () => createSprinkle())
}

function draw(elapsed: number) {
    if (!ctx) return
    ctx.clearRect(0, 0, width, height)

    for (const s of sprinkles) {
        const sway = Math.sin(elapsed * s.swaySpeed + s.swayPhase) * s.swayAmp
        ctx.save()
        ctx.translate(s.x + sway, s.y)
        ctx.rotate(s.angle)
        ctx.globalAlpha = s.alpha
        ctx.fillStyle = s.color
        ctx.beginPath()
        ctx.roundRect(-s.len / 2, -s.thickness / 2, s.len, s.thickness, s.thickness / 2)
        ctx.fill()
        ctx.restore()
    }
}

function step(now: number) {
    frame = 0
    if (!visible || document.hidden) return

    const delta = Math.min(0.05, (now - last) / 1000 || 0)
    last = now

    for (const s of sprinkles) {
        s.y += s.fall * delta
        s.angle += s.spin * delta
        if (s.y - s.len > height) {
            Object.assign(s, createSprinkle(true), { y: -s.len })
        }
    }

    draw(now / 1000)
    frame = requestAnimationFrame(step)
}

function start() {
    if (reduced || frame || !visible) return
    last = performance.now()
    frame = requestAnimationFrame(step)
}

function stop() {
    if (frame) cancelAnimationFrame(frame)
    frame = 0
}

function resize() {
    const el = canvas.value
    if (!el || !ctx) return

    const rect = el.getBoundingClientRect()
    if (!rect.width || !rect.height) return

    const dpr = Math.min(2, window.devicePixelRatio || 1)
    width = rect.width
    height = rect.height
    el.width = Math.round(width * dpr)
    el.height = Math.round(height * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    build()
    if (reduced) draw(0)
}

function onVisibilityChange() {
    if (document.hidden) stop()
    else start()
}

onMounted(() => {
    const el = canvas.value
    if (!el) return

    ctx = el.getContext('2d')
    if (!ctx) return

    reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    resize()

    resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(el)

    const observer = new IntersectionObserver(([entry]) => {
        visible = Boolean(entry?.isIntersecting)
        if (visible) start()
        else stop()
    })
    observer.observe(el)

    document.addEventListener('visibilitychange', onVisibilityChange)

    onBeforeUnmount(() => {
        observer.disconnect()
        document.removeEventListener('visibilitychange', onVisibilityChange)
    })
})

onBeforeUnmount(() => {
    stop()
    resizeObserver?.disconnect()
    resizeObserver = null
    ctx = null
    sprinkles = []
})
</script>

<template>
    <canvas
        ref="canvas"
        class="pointer-events-none absolute inset-0 h-full w-full select-none"
        aria-hidden="true"
    />
</template>
