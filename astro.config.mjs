import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// Strona statyczna + endpoint /api/contact na żywo (prerender=false).
// Deploy: Cloudflare Pages (wrangler pages deploy dist).
export default defineConfig({
  site: 'https://lajf.eu',
  i18n: {
    locales: ['pl', 'en'],
    defaultLocale: 'pl',
    routing: { prefixDefaultLocale: false },
  },
  adapter: cloudflare(),
});
