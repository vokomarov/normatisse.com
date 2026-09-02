/**
 * Prerendered into `.output/public/sitemap.xml` by the `nitro.prerender.routes`
 * entry in nuxt.config, so the static Cloudflare Pages deploy serves it as a
 * plain file. No `lastmod`: a build timestamp would claim every page changed on
 * every deploy, which is worse than omitting the field.
 */
const PATHS = ['/', '/bakery', '/privacy'];

export default defineEventHandler((event) => {
    const { siteUrl } = useRuntimeConfig(event).public;

    const urls = PATHS.map(path => `  <url><loc>${siteUrl}${path === '/' ? '' : path}</loc></url>`).join('\n');

    setResponseHeader(event, 'content-type', 'application/xml; charset=utf-8');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
});
