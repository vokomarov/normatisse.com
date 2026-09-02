// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Generated bundles wrangler leaves behind when previewing the static build.
  { ignores: ['.wrangler/**'] },
)
