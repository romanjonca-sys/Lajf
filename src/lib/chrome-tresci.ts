/**
 * Treści „chrome" layoutu Kinetic Aurora (nawigacja, stopka, komunikaty) per język.
 *
 * Powód wydzielenia: `lajf-layout.astro` miał polską nawigację i stopkę wpisane
 * na sztywno w znaczniku. Dołożenie drugiego języka w tym samym pliku przebiłoby
 * 300 linii i zrobiłoby z layoutu plik o dwóch odpowiedzialnościach (układ + treść).
 * Layout renderuje, ten moduł mówi CO renderować.
 *
 * Wersja EN nie jest tłumaczeniem serwisu PL. To jedna strona dla zagranicznych
 * firm i partnerów, którzy pytają, co robimy. Dlatego menu EN ma kotwice w obrębie
 * `/en/`, a nie odnośniki do polskich pillarów, których po angielsku nie ma.
 */

import type { Locale } from './i18n';

export interface PozycjaMenu {
  label: string;
  href: string;
}

export interface TekstyChrome {
  /** Pozycje menu głównego na desktopie. */
  menu: PozycjaMenu[];
  /**
   * Menu w panelu mobilnym. Osobne od desktopowego, bo tam mieszczą się dłuższe
   * etykiety i pozycje spoza paska (np. „Muzyka”).
   */
  menuMobilne: PozycjaMenu[];
  /** Przycisk CTA w nawigacji. */
  cta: PozycjaMenu;
  /** CTA zamykające panel mobilny. */
  ctaMobilne: PozycjaMenu;
  /** Etykieta telefonu dla czytników ekranu. */
  telefonAria: (numer: string) => string;
  menuOtworz: string;
  menuZamknij: string;
  /** Zdanie opisujące firmę w stopce. */
  stopkaOpis: string;
  /** Kolumny stopki. `nota` to dopisek bez odnośnika, pod linkami kolumny. */
  stopkaKolumny: { naglowek: string; linki: PozycjaMenu[]; nota?: string }[];
  /** Linia prawna pod stopką (po prawej). */
  stopkaNota: string;
  /** Etykiety numerów rejestrowych. Po angielsku „KRS" i „NIP" nic nie znaczą. */
  rejestr: { krs: string; nip: string; regon: string };
  miasto: string;
  jezykAria: string;
}

const CHROME: Record<Locale, TekstyChrome> = {
  pl: {
    menu: [
      { label: 'Audyt cyfrowy', href: '/audyt-placowki-medycznej/' },
      { label: 'Strony WWW', href: '/strony-www/' },
      { label: 'Bezpieczeństwo i dane', href: '/rodo-i-cyber/' },
      { label: 'Oprogramowanie', href: '/oprogramowanie/' },
      { label: 'Realizacje', href: '/#realizacje' },
      { label: 'O mnie', href: '/#o-mnie' },
    ],
    menuMobilne: [
      { label: 'Audyt cyfrowy placówki', href: '/audyt-placowki-medycznej/' },
      { label: 'Strony WWW', href: '/strony-www/' },
      { label: 'Bezpieczeństwo i dane', href: '/rodo-i-cyber/' },
      { label: 'Oprogramowanie', href: '/oprogramowanie/' },
      { label: 'Muzyka', href: '/muzyka/' },
      { label: 'Realizacje', href: '/#realizacje' },
      { label: 'O mnie', href: '/#o-mnie' },
    ],
    cta: { label: 'Konsultacja', href: '/#kontakt' },
    ctaMobilne: { label: 'Napisz do nas', href: '/#kontakt' },
    telefonAria: (numer) => `Zadzwoń: ${numer}`,
    menuOtworz: 'Otwórz menu',
    menuZamknij: 'Zamknij menu',
    stopkaOpis:
      'Cyfrowa opieka nad firmą. Audyt, wdrożenie i stała opieka: strona, analityka, bezpieczeństwo i automatyzacje, prowadzone przez jedną osobę odpowiedzialną za całość.',
    stopkaKolumny: [
      {
        naglowek: 'Usługi',
        linki: [
          { label: 'Audyt Cyfrowy', href: '/audyt-placowki-medycznej/' },
          { label: 'Strony WWW', href: '/strony-www/' },
          { label: 'Bezpieczeństwo i dane', href: '/rodo-i-cyber/' },
          { label: 'Oprogramowanie', href: '/oprogramowanie/' },
          { label: 'Muzyka', href: '/muzyka/' },
        ],
      },
      {
        naglowek: 'Firma',
        linki: [
          { label: 'Realizacje', href: '/#realizacje' },
          { label: 'O mnie', href: '/#o-mnie' },
          { label: 'Kontakt', href: '/#kontakt' },
        ],
      },
      {
        naglowek: 'Informacje',
        linki: [
          { label: 'Polityka prywatności', href: '/polityka-prywatnosci/' },
          { label: 'Regulamin', href: '/regulamin/' },
        ],
        nota: 'RODO · WCAG · hosting EU',
      },
    ],
    stopkaNota: 'Hosting w UE · zgodne z RODO',
    rejestr: { krs: 'KRS', nip: 'NIP', regon: 'REGON' },
    miasto: 'Jaworzno, PL',
    jezykAria: 'Wybór języka',
  },
  en: {
    menu: [
      { label: 'What we do', href: '/en/#services' },
      { label: 'How we work', href: '/en/#process' },
      { label: 'Work', href: '/en/#work' },
      { label: 'About', href: '/en/#about' },
    ],
    menuMobilne: [
      { label: 'What we do', href: '/en/#services' },
      { label: 'How we work', href: '/en/#process' },
      { label: 'Work', href: '/en/#work' },
      { label: 'About', href: '/en/#about' },
    ],
    cta: { label: 'Get in touch', href: '/en/#contact' },
    ctaMobilne: { label: 'Send a message', href: '/en/#contact' },
    telefonAria: (numer) => `Call us: ${numer}`,
    menuOtworz: 'Open menu',
    menuZamknij: 'Close menu',
    stopkaOpis:
      'Websites, business email and custom software for small and mid-sized companies. One partner who takes responsibility for the whole thing, from the first call to long-term maintenance.',
    stopkaKolumny: [
      {
        naglowek: 'Services',
        linki: [
          { label: 'Websites', href: '/en/#services' },
          { label: 'Business email', href: '/en/#services' },
          { label: 'Custom software', href: '/en/#services' },
          { label: 'Analytics and privacy', href: '/en/#services' },
        ],
      },
      {
        naglowek: 'Company',
        linki: [
          { label: 'Work', href: '/en/#work' },
          { label: 'About', href: '/en/#about' },
          { label: 'Contact', href: '/en/#contact' },
        ],
      },
      {
        naglowek: 'Information',
        linki: [
          { label: 'Privacy Policy', href: '/polityka-prywatnosci/' },
          { label: 'Terms', href: '/regulamin/' },
          { label: 'Polska wersja', href: '/' },
        ],
        // Dokumenty prawne istnieją na razie wyłącznie po polsku. Lepiej powiedzieć
        // to wprost, niż podlinkować je jako „Privacy Policy" i zaskoczyć czytelnika.
        nota: 'Legal documents are currently available in Polish only.',
      },
    ],
    stopkaNota: 'EU hosting · GDPR compliant',
    rejestr: { krs: 'Company No.', nip: 'VAT ID', regon: 'REGON' },
    miasto: 'Jaworzno, Poland',
    jezykAria: 'Language',
  },
};

export function tekstyChrome(locale: Locale): TekstyChrome {
  return CHROME[locale];
}

/**
 * Pary stron, które są swoimi odpowiednikami językowymi.
 *
 * Tylko te adresy dostają znaczniki `hreflang`. Reszta serwisu istnieje wyłącznie
 * po polsku i wskazywanie dla niej angielskiego odpowiednika byłoby nieprawdą
 * wobec wyszukiwarki. Przełącznik języka w nawigacji działa mimo to na każdej
 * podstronie, bo dla człowieka „przejdź na angielski" jest użyteczne zawsze.
 */
const PARY: Record<string, string> = {
  '/': '/en/',
};

/** Odwrotność PARY, budowana raz przy imporcie. */
const PARY_ODWROTNE: Record<string, string> = Object.fromEntries(
  Object.entries(PARY).map(([pl, en]) => [en, pl])
);

/** Ścieżka z ukośnikiem na początku i na końcu, żeby porównania były jednoznaczne. */
function znormalizuj(pathname: string): string {
  const bezKrawedzi = pathname.replace(/^\/+|\/+$/g, '');
  return bezKrawedzi ? `/${bezKrawedzi}/` : '/';
}

export interface Alternatywa {
  locale: Locale;
  href: string;
}

/**
 * Odpowiedniki bieżącej strony w pozostałych językach.
 * Pusta tablica = strona nie ma tłumaczenia, więc layout nie wypisze `hreflang`.
 */
export function alternatywy(pathname: string): Alternatywa[] {
  const sciezka = znormalizuj(pathname);
  const en = PARY[sciezka];
  if (en) return [{ locale: 'pl', href: sciezka }, { locale: 'en', href: en }];

  const pl = PARY_ODWROTNE[sciezka];
  if (pl) return [{ locale: 'pl', href: pl }, { locale: 'en', href: sciezka }];

  return [];
}

/**
 * Dokąd prowadzi przełącznik języka. Gdy strona nie ma odpowiednika, kieruje na
 * stronę główną drugiego języka zamiast pokazywać martwy odnośnik.
 */
export function adresPrzelacznika(pathname: string, docelowy: Locale): string {
  const znalezione = alternatywy(pathname).find((alt) => alt.locale === docelowy);
  if (znalezione) return znalezione.href;
  return docelowy === 'en' ? '/en/' : '/';
}
