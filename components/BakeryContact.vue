<script setup lang="ts">
const CONTACT_PHONE = '+380734700263';
const INSTAGRAM_BAKERY_LINK = 'https://instagram.com/normatisse.bakery';
</script>

<template>
    <div class="text-center">
        <h2 class="logo-font text-3xl sm:text-4xl text-center mb-10">Замовити</h2>
        <p class="text-gray-600 mb-8">
            Напишіть нам зручним способом — форма для онлайн-замовлень скоро зʼявиться.
        </p>
        <div class="flex flex-wrap items-center justify-center gap-4">
            <UButton
                icon="i-simple-icons-instagram"
                variant="solid"
                color="primary"
                size="lg"
                :to="INSTAGRAM_BAKERY_LINK"
                target="_blank"
            >
                Instagram
            </UButton>
            <UButton
                icon="i-simple-icons-telegram"
                variant="soft"
                color="primary"
                size="lg"
                :to="`https://t.me/${CONTACT_PHONE}`"
                target="_blank"
            >
                Telegram
            </UButton>
            <UButton
                icon="i-simple-icons-viber"
                variant="soft"
                color="primary"
                size="lg"
                :to="`viber://chat?number=%2B${CONTACT_PHONE.replace('+', '')}`"
            >
                Viber
            </UButton>
            <UButton
                icon="i-lucide-phone"
                variant="soft"
                color="primary"
                size="lg"
                :to="`tel:${CONTACT_PHONE}`"
            >
                {{ CONTACT_PHONE }}
            </UButton>
        </div>
    </div>
</template>
