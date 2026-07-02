import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// Strona statyczna + endpoint /api/contact na żywo (prerender=false).
// Deploy: Cloudflare Pages, projekt "lajf-eu". WAŻNE: `wrangler pages deploy dist/client`
// (NIE `dist` — to zagnieżdża pliki w /client/ i daje 404 w rootcie). Redirect z
// .wrangler/deploy/config.json dociąga funkcje workera (/api/contact działa).
export default defineConfig({
  site: 'https://lajf.eu',
  i18n: {
    locales: ['pl', 'en'],
    defaultLocale: 'pl',
    routing: { prefixDefaultLocale: false },
  },
  adapter: cloudflare(),
});
