<script setup lang="ts">
/**
 * Mobile-only order bar. Arms once the reader reaches the price list and hides
 * again while the order section is on screen, so it never covers the thing it
 * points at. Below `lg` only: on desktop the contact section is a short scroll
 * away and a fixed bar would just eat viewport.
 */
const reachedProducts = ref(false);
const isBlocked = ref(false);

const isVisible = computed(() => reachedProducts.value && !isBlocked.value);

const observers: IntersectionObserver[] = [];

onMounted(() => {
    const products = document.getElementById('products');

    // The bar duplicates the hero's own CTA and points at the order section, so
    // both suppress it while they are on screen.
    const blockers = ['hero', 'contact']
        .map(id => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);

    if (!products || blockers.length < 2) return;

    // Latches on: once the reader has seen the prices the bar stays available,
    // rather than blinking off every time they scroll back up.
    const armObserver = new IntersectionObserver(([entry]) => {
        if (entry?.isIntersecting) {
            reachedProducts.value = true;
            armObserver.disconnect();
        }
    });
    armObserver.observe(products);

    const onScreen = new Set<Element>();
    const blockObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) onScreen.add(entry.target);
            else onScreen.delete(entry.target);
        }
        isBlocked.value = onScreen.size > 0;
    });
    blockers.forEach(el => blockObserver.observe(el));

    observers.push(armObserver, blockObserver);
});

onUnmounted(() => observers.forEach(observer => observer.disconnect()));
</script>

<template>
    <Transition name="order-bar">
        <div
            v-if="isVisible"
            class="fixed inset-x-0 bottom-0 z-40 border-t border-watercourse-100 bg-white/95 backdrop-blur lg:hidden"
        >
            <!-- Home-screen web apps and notched phones: without this the button
                 sits under the gesture bar. -->
            <div class="flex items-center justify-between gap-4 px-5 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
                <p class="min-w-0">
                    <span class="block text-xs text-stone-500">Торти</span>
                    <span class="brand-price text-base">від 850 грн/кг</span>
                </p>

                <UButton color="primary" variant="solid" size="lg" to="#contact">
                    Замовити
                </UButton>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.order-bar-enter-active,
.order-bar-leave-active {
    transition:
        transform var(--brand-duration) var(--brand-ease),
        opacity var(--brand-duration) var(--brand-ease);
}

.order-bar-enter-from,
.order-bar-leave-to {
    opacity: 0;
    transform: translateY(100%);
}

@media (prefers-reduced-motion: reduce) {
    .order-bar-enter-active,
    .order-bar-leave-active {
        transition: none;
    }
}
</style>
