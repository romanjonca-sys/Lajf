/**
 * i18n — konfiguracja języków + teksty UI silnika (nie treść klienta).
 * Domyślny język bez prefiksu w URL (pl → /), pozostałe z prefiksem (en → /en/).
 */

export const LOCALES = ['pl', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'pl';

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Ścieżka strony w danym języku. Domyślny język bez prefiksu. */
export function localizedPath(locale: Locale, slug: string): string {
  const clean = slug.replace(/^\/+|\/+$/g, '');
  if (locale === DEFAULT_LOCALE) return clean ? `/${clean}` : '/';
  return clean ? `/${locale}/${clean}` : `/${locale}`;
}

/** og:locale per język (Open Graph). */
export const OG_LOCALE: Record<Locale, string> = {
  pl: 'pl_PL',
  en: 'en_GB',
};

/** Teksty UI SILNIKA (chrome: skip-link, cookie, stopka, przełącznik języka). */
interface UiStrings {
  skip: string;
  langName: string;
  cookieText: string;
  cookieDetails: string;
  cookieEssential: string;
  cookieAccept: string;
  privacyHref: string;
  privacyLabel: string;
  termsHref: string;
  termsLabel: string;
  realizedBy: string;
}

export const UI: Record<Locale, UiStrings> = {
  pl: {
    skip: 'Przejdź do treści',
    langName: 'Język',
    cookieText:
      'Używamy plików cookies niezbędnych do działania strony. Za Twoją zgodą korzystamy też z cookies analitycznych, aby ulepszać serwis.',
    cookieDetails: 'Szczegóły:',
    cookieEssential: 'Tylko niezbędne',
    cookieAccept: 'Akceptuję',
    privacyHref: '/polityka-prywatnosci',
    privacyLabel: 'Polityka prywatności',
    termsHref: '/regulamin',
    termsLabel: 'Regulamin',
    realizedBy: 'Realizacja',
  },
  en: {
    skip: 'Skip to content',
    langName: 'Language',
    cookieText:
      'We use cookies necessary for the site to function. With your consent we also use analytics cookies to improve the service.',
    cookieDetails: 'Details:',
    cookieEssential: 'Essential only',
    cookieAccept: 'Accept',
    // Strony prawne na razie tylko po polsku — klient dostarcza tłumaczenia.
    privacyHref: '/polityka-prywatnosci',
    privacyLabel: 'Privacy Policy',
    termsHref: '/regulamin',
    termsLabel: 'Terms',
    realizedBy: 'Made by',
  },
};
