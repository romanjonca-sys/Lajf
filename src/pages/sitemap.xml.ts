export const prerender = true;

import type { APIRoute } from 'astro';

import { sciezkiPoradnika } from '../lib/artykuly';

/**
 * lajf.eu używa stron plikowych (.astro), nie content-engine — sitemap listuje je wprost.
 * '' = homepage. Dodając nową podstronę, dopisz jej slug tutaj.
 * Artykuły poradnika dochodzą same z src/lib/artykuly.ts.
 */
const PAGES = [
  '', // homepage
  'en', // angielska strona dla klientów i partnerów zagranicznych
  'en/systems',
  'audyt-placowki-medycznej',
  'audyt-firmy',
  'strony-www',
  'strona-www-dla-lekarza',
  'strona-www-dla-firmy-sprzatajacej',
  'strona-www-dla-mechanika',
  'strona-www-dla-elektryka',
  'rodo-i-cyber',
  'oprogramowanie',
  'realizacje/rejestr-badania-klinicznego',
  'muzyka',
  'polityka-prywatnosci',
  'regulamin',
  ...sciezkiPoradnika(),
];

export const GET: APIRoute = ({ site }) => {
  const base = (site ?? new URL('https://lajf.eu')).href.replace(/\/$/, '');
  // Ukośnik na końcu = adres kanoniczny (Pages robi 308 z wersji bez ukośnika;
  // sitemap nie powinien listować adresów przekierowujących).
  const locs = PAGES.map((path) => (path ? `${base}/${path}/` : `${base}/`));

  const urls = locs.map((loc) => `  <url><loc>${loc}</loc></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: { 'content-type': 'application/xml; charset=utf-8' },
  });
};
