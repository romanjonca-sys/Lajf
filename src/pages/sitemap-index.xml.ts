export const prerender = true;

import type { APIRoute } from 'astro';

/**
 * Indeks map witryny wskazujący na `sitemap.xml`.
 *
 * Powód istnienia: mapa zgłoszona w Search Console 11.08.2026 i ponownie 14.09.2026
 * ma stan „Nie udało się pobrać" z pustą kolumną „Ostatni odczyt" i zero wykrytych
 * stron, czyli Google nigdy jej nie odczytał. Sam plik jest poprawny (sprawdzone
 * na produkcji: HTTP 200, `application/xml`, brak BOM, poprawny namespace, 20 adresów),
 * a `robots.txt` niczego nie blokuje. Ponowne zgłoszenie tego samego adresu nie pomaga,
 * bo Search Console nie przyjmuje duplikatu wpisu i pokazuje zapamiętany błąd.
 *
 * Ten plik daje drugi, czysty adres bez historii w Search Console. Jeśli Google go
 * pobierze, winny był zaległy wpis. Jeśli i tu wyjdzie „nie udało się pobrać",
 * przyczyna leży po stronie Cloudflare i tam trzeba szukać dalej.
 *
 * To jest też poprawny standard sitemaps.org, a nie obejście: indeks pozwala dołożyć
 * kolejne mapy (np. osobną dla poradnika albo dla wersji EN), gdy serwis urośnie.
 */
export const GET: APIRoute = ({ site }) => {
  const base = (site ?? new URL('https://lajf.eu')).href.replace(/\/$/, '');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${base}/sitemap.xml</loc></sitemap>
</sitemapindex>`;

  return new Response(xml, {
    headers: { 'content-type': 'application/xml; charset=utf-8' },
  });
};
