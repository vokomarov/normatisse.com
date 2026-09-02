<script setup lang="ts">
import BakeryHero from '@/components/BakeryHero.vue';
import BakeryProducts from '@/components/BakeryProducts.vue';
import BakeryGallery from '@/components/BakeryGallery.vue';
import BakeryReviews from '@/components/BakeryReviews.vue';
import BakeryManifesto from '@/components/BakeryManifesto.vue';
import BakeryContact from '@/components/BakeryContact.vue';
import BakeryFooter from '@/components/BakeryFooter.vue';
import BakeryOrderBar from '@/components/BakeryOrderBar.vue';
import BrandSection from '@/components/BrandSection.vue';

const { siteUrl } = useRuntimeConfig().public;
const { phone, instagram } = useBakeryContacts();

const title = 'Normatisse Bakery — домашня випічка на замовлення';
const description = 'Бісквітні торти, кекси, капкейки та мадлен на замовлення у Вінниці. Готові смаки або конструктор свого торта, від 850 грн/кг. Make day sweeter.';

useSeoMeta({
    title,
    ogTitle: title,
    description,
    ogDescription: description,
    ogImage: `${siteUrl}/images/logo-bakery-full.svg`,
    twitterCard: 'summary_large_image',
})

// Home bakery: there is no shop to walk into, so the address stops at the city
// and `openingHours` is omitted rather than invented. Orders go through the
// messenger channels, which is what `contactPoint` describes.
const businessSchema = {
    '@context': 'https://schema.org',
    '@type': 'Bakery',
    '@id': `${siteUrl}/bakery#business`,
    name: 'Normatisse Bakery',
    url: `${siteUrl}/bakery`,
    description,
    image: `${siteUrl}/images/bakery/gallery/torty.jpg`,
    logo: `${siteUrl}/images/logo-bakery-full.svg`,
    telephone: phone,
    priceRange: 'від 850 ₴/кг',
    currenciesAccepted: 'UAH',
    address: {
        '@type': 'PostalAddress',
        addressLocality: 'Вінниця',
        addressCountry: 'UA',
    },
    areaServed: { '@type': 'City', name: 'Вінниця' },
    sameAs: [instagram],
    contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: phone,
        availableLanguage: ['uk'],
    },
    parentOrganization: { '@id': `${siteUrl}/#organization` },
};

// Separate block, not a `@graph` entry — see the note on the home page. Dates
// are hand-maintained: they track the copy, not the build.
const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${siteUrl}/bakery#webpage`,
    url: `${siteUrl}/bakery`,
    name: title,
    description,
    inLanguage: 'uk',
    datePublished: '2026-08-22',
    dateModified: '2026-08-23',
    about: { '@id': `${siteUrl}/bakery#business` },
    author: { '@id': `${siteUrl}/#organization` },
    publisher: { '@id': `${siteUrl}/#organization` },
};

useHead({
    // Wordmark is the hero's LCP element; preload it so it is not blocked behind
    // the hero markup and the parallax photo.
    link: [{ rel: 'preload', as: 'image', href: '/images/logo-bakery-full.svg' }],
    script: [businessSchema, pageSchema].map(schema => ({
        type: 'application/ld+json',
        innerHTML: JSON.stringify(schema),
    })),
})
</script>

<!-- Full-bleed shell: every band owns its own surface and inner container, so
     nothing at this level constrains width. -->
<template>
    <div class="bg-[var(--brand-surface)]">
        <BakeryHero />

        <!-- Who is baking, before what it costs. It also keeps the photo band
             clear of the dark gallery band: the two heavy devices must not sit
             next to each other (design system §1, §3). -->
        <BakeryManifesto />

        <BrandSection id="products" surface="mint">
            <BakeryProducts />
        </BrandSection>

        <!-- The page's single dark *surface*. Everything before and after it is
             light, so the flip reads as one deliberate accent rather than a
             stripe pattern. -->
        <BrandSection id="gallery" surface="deep" curve-top>
            <BakeryGallery />
        </BrandSection>

        <BrandSection id="reviews" surface="white" curve-top>
            <BakeryReviews />
        </BrandSection>

        <BrandSection id="contact" surface="blush">
            <BakeryContact />
        </BrandSection>

        <BakeryFooter />

        <BakeryOrderBar />
    </div>
</template>
