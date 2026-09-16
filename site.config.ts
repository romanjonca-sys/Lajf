/**
 * Konfiguracja per klient (warstwa treści/config — NIE silnik).
 * Klon nowego klienta zaczyna od podmiany wartości w tym pliku + skóry.
 */

export interface CompanyInfo {
  legalName: string;
  taxId: string | null;
  /** Numer KRS. `null` dla JDG i innych podmiotów spoza rejestru sądowego. */
  krs: string | null;
  /** REGON, wersja 9-cyfrowa. */
  regon: string | null;
  /** Sąd rejestrowy prowadzący akta — podawany razem z KRS (art. 206 §1 KSH). */
  registryCourt: string | null;
  /** Kapitał zakładowy w formie gotowej do wyświetlenia. Tylko spółki kapitałowe. */
  shareCapital: string | null;
  email: string;
  phone: string;
  /**
   * Numer odbierający WhatsAppa. `null` = przycisku nie ma.
   *
   * Osobne pole od `phone`, bo to nie musi być ten sam numer, a odnośnik do
   * numeru bez konta WhatsApp pokazuje odwiedzającemu błąd.
   */
  whatsapp: string | null;
  address: string;
}

export interface PrivacyInfo {
  controllerName: string;
  contactEmail: string;
}

export interface Integrations {
  resendFrom: string | null;
  analyticsId: string | null;
}

export interface SocialLinks {
  instagram: string | null;
  facebook: string | null;
}

export interface Credit {
  name: string;
  url: string;
}

export interface SeoConfig {
  ogImage: string;
  locale: string;
  jobTitle: string;
  googleVerification: string | null;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SiteConfig {
  brandName: string;
  skin: string;
  /** Logo w headerze (ścieżka do pliku w /public). null → wordmark tekstowy z brandName. */
  logoUrl: string | null;
  /** Nawigacja per język (klucz = kod locale, np. 'pl' / 'en'). */
  nav: Record<string, NavLink[]>;
  /** CTA w headerze per język. */
  headerCta: Record<string, NavLink> | null;
  company: CompanyInfo;
  privacy: PrivacyInfo;
  integrations: Integrations;
  socials: SocialLinks;
  credit: Credit | null;
  seo: SeoConfig;
}

export const siteConfig: SiteConfig = {
  brandName: 'Lajf',
  skin: '_base',
  logoUrl: null,
  nav: {
    pl: [
      { label: 'Co robimy', href: '/#co' },
      { label: 'Proces', href: '/#proces' },
      { label: 'Oferta', href: '/#oferta' },
      { label: 'Realizacje', href: '/#realizacje' },
    ],
    en: [],
  },
  headerCta: {
    pl: { label: 'Bezpłatna konsultacja', href: '/#kontakt' },
    en: { label: 'Contact', href: '/#kontakt' },
  },
  company: {
    legalName: 'Lajf sp. z o.o.',
    taxId: '632-204-51-64',
    krs: '0001265327',
    regon: '545668517',
    registryCourt: 'Sąd Rejonowy Katowice-Wschód w Katowicach, VIII Wydział Gospodarczy KRS',
    shareCapital: '5 000,00 zł',
    email: 'kontakt@lajf.eu',
    phone: '+48 880 133 640',
    whatsapp: '+48 880 133 640',
    address: 'ul. Wiosenna 6, 43-607 Jaworzno',
  },
  privacy: {
    controllerName: 'Lajf sp. z o.o.',
    contactEmail: 'kontakt@lajf.eu',
  },
  integrations: {
    resendFrom: null,
    analyticsId: null,
  },
  socials: {
    instagram: null,
    facebook: null,
  },
  credit: null,
  seo: {
    ogImage: '/images/og-default.jpg',
    locale: 'pl_PL',
    jobTitle: '',
    googleVerification: null,
  },
};
