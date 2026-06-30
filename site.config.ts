/**
 * Konfiguracja per klient (warstwa treści/config — NIE silnik).
 * Klon nowego klienta zaczyna od podmiany wartości w tym pliku + skóry.
 */

export interface CompanyInfo {
  legalName: string;
  taxId: string | null;
  email: string;
  phone: string;
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
    legalName: 'Lajf - Roman Jońca',
    taxId: '632-141-07-33',
    email: 'kontakt@lajf.eu',
    phone: '+48 608 101 623',
    address: 'ul. Wiosenna 6, 43-607 Jaworzno',
  },
  privacy: {
    controllerName: 'Lajf - Roman Jońca',
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
