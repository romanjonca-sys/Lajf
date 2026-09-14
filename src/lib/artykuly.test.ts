import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { describe, it } from 'node:test';

import {
  ARTYKULY,
  ArtykulNieIstniejeError,
  getArtykul,
  schemaArtykulu,
  sciezkaArtykulu,
  sciezkiPoradnika,
} from './artykuly.ts';

const SITE = 'https://lajf.eu/';
const MAX_TITLE = 65;
const MAX_DESCRIPTION = 160;
const KATALOG_PORADNIKA = new URL('../pages/poradnik/', import.meta.url);

/** Ślady tekstu generowanego: długa pauza i przecinek przed „i”, „oraz”, „a także”. */
const ZAKAZANA_INTERPUNKCJA = /—|, (i|oraz|a także) /;

describe('lista artykułów', () => {
  it('ma unikalne adresy w formacie kebab-case', () => {
    const slugi = ARTYKULY.map((a) => a.slug);

    assert.equal(new Set(slugi).size, slugi.length);
    for (const slug of slugi) assert.match(slug, /^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it('mieści tytuły i opisy w długościach, które Google pokazuje w całości', () => {
    for (const a of ARTYKULY) {
      assert.ok(a.title.length <= MAX_TITLE, `title ${a.slug}: ${a.title.length} znaków`);
      assert.ok(a.description.length <= MAX_DESCRIPTION, `description ${a.slug}: ${a.description.length} znaków`);
    }
  });

  it('nie zawiera zakazanej interpunkcji w metadanych', () => {
    for (const a of ARTYKULY) {
      const teksty = [a.title, a.description, a.h1, a.h1hl, a.lead, ...a.faq.flatMap((f) => [f.q, f.a])];
      for (const tekst of teksty) assert.doesNotMatch(tekst, ZAKAZANA_INTERPUNKCJA, tekst);
    }
  });

  it('ma plik strony dla każdego artykułu i żadnego pliku bez wpisu', () => {
    const pliki = readdirSync(KATALOG_PORADNIKA)
      .filter((plik) => plik.endsWith('.astro') && plik !== 'index.astro')
      .map((plik) => plik.replace(/\.astro$/, ''))
      .sort();

    assert.deepEqual(pliki, ARTYKULY.map((a) => a.slug).sort());
  });

  it('nie zawiera zakazanej interpunkcji w treści artykułów', () => {
    for (const a of ARTYKULY) {
      const tresc = readFileSync(new URL(`${a.slug}.astro`, KATALOG_PORADNIKA), 'utf8');
      assert.doesNotMatch(tresc, ZAKAZANA_INTERPUNKCJA, a.slug);
    }
  });
});

describe('getArtykul', () => {
  it('zwraca artykuł po adresie', () => {
    const artykul = getArtykul('piksel-meta-na-stronie-gabinetu');

    assert.equal(artykul.slug, 'piksel-meta-na-stronie-gabinetu');
  });

  it('rzuca ArtykulNieIstniejeError dla nieznanego adresu', () => {
    assert.throws(() => getArtykul('nie-ma-takiego'), ArtykulNieIstniejeError);
  });
});

describe('ścieżki poradnika', () => {
  it('buduje adres artykułu z ukośnikiem na końcu', () => {
    assert.equal(sciezkaArtykulu('abc'), '/poradnik/abc/');
  });

  it('podaje sitemapie spis i każdy artykuł', () => {
    const sciezki = sciezkiPoradnika();

    assert.equal(sciezki[0], 'poradnik');
    assert.equal(sciezki.length, ARTYKULY.length + 1);
    for (const a of ARTYKULY) assert.ok(sciezki.includes(`poradnik/${a.slug}`));
  });
});

describe('schemaArtykulu', () => {
  const artykul = ARTYKULY[0];
  const graf = schemaArtykulu(artykul, SITE)['@graph'] as Array<Record<string, unknown>>;
  const wezel = (typ: string) => graf.find((w) => w['@type'] === typ);

  it('opisuje artykuł z datą, autorem i adresem kanonicznym', () => {
    const article = wezel('Article');

    assert.ok(article);
    assert.equal(article.datePublished, artykul.published);
    assert.equal(article.dateModified, artykul.published);
    assert.equal(article.mainEntityOfPage, `https://lajf.eu/poradnik/${artykul.slug}/`);
    assert.deepEqual(article.author, { '@type': 'Person', name: 'Roman Jońca', url: 'https://lajf.eu/#o-mnie' });
  });

  it('przenosi każde pytanie FAQ do FAQPage', () => {
    const faq = wezel('FAQPage');

    assert.ok(faq);
    assert.equal((faq.mainEntity as unknown[]).length, artykul.faq.length);
  });

  it('używa daty aktualizacji, gdy artykuł ją ma', () => {
    const zaktualizowany = { ...artykul, updated: '2026-10-01' };
    const article = (schemaArtykulu(zaktualizowany, SITE)['@graph'] as Array<Record<string, unknown>>)[0];

    assert.equal(article.dateModified, '2026-10-01');
  });
});
