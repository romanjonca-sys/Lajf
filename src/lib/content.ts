/**
 * Adapter treści. Dziś: lokalny mock. Docelowo: Storyblok.
 * Sekcje i routing zależą TYLKO od tych typów — podmiana źródła nie rusza reszty.
 * Treść jest kluczowana językiem (Locale) — patrz PAGES poniżej.
 */
import type { Locale } from './i18n';

export interface HeroBlock {
  type: 'hero';
  variant: 'image-right' | 'centered-form';
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  imageUrl?: string;
}

export interface ServiceItem {
  title: string;
  body: string;
}

export interface ServicesBlock {
  type: 'services';
  title: string;
  subtitle?: string;
  items: ServiceItem[];
}

export interface PortfolioItem {
  title: string;
  tag: string;
  imageUrl: string;
  href: string;
}

export interface PortfolioBlock {
  type: 'portfolio';
  title: string;
  subtitle?: string;
  items: PortfolioItem[];
}

export interface LeadMagnetBlock {
  type: 'lead-magnet';
  title: string;
  description: string;
  buttonLabel: string;
}

export interface GalleryItem {
  imageUrl: string;
  caption?: string;
}

export interface GalleryBlock {
  type: 'gallery';
  title: string;
  subtitle?: string;
  items: GalleryItem[];
  anchor?: string;
}

export interface ContactBlock {
  type: 'contact';
  title: string;
  subtitle?: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface StatsBlock {
  type: 'stats';
  items: StatItem[];
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
}

export interface TestimonialsBlock {
  type: 'testimonials';
  title: string;
  subtitle?: string;
  items: TestimonialItem[];
  anchor?: string;
  kicker?: string;
}

export interface AuthorBlock {
  type: 'author';
  name: string;
  bio: string;
  pillars: string[];
  imageUrl?: string;
  anchor?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqBlock {
  type: 'faq';
  title: string;
  subtitle?: string;
  items: FaqItem[];
  anchor?: string;
  kicker?: string;
}

export type Block =
  | HeroBlock
  | ServicesBlock
  | PortfolioBlock
  | StatsBlock
  | TestimonialsBlock
  | AuthorBlock
  | FaqBlock
  | LeadMagnetBlock
  | GalleryBlock
  | ContactBlock;

export interface PageSeo {
  title: string;
  description: string;
}

export interface PageContent {
  slug: string;
  seo: PageSeo;
  blocks: Block[];
}

const HOME: PageContent = {
  slug: '',
  seo: {
    title: 'Lajf — strony, które pracują na klientów',
    description:
      'Szybkie, bezpieczne strony dla firm i gabinetów. Projekt, wdrożenie, opieka.',
  },
  blocks: [
    {
      type: 'hero',
      variant: 'image-right',
      title: 'Strona, która pracuje na Twoich klientów',
      subtitle:
        'Szybko, bezpiecznie, bez zbędnego balastu. Projekt i wdrożenie pod Twój gabinet lub firmę.',
      ctaLabel: 'Porozmawiajmy',
      ctaHref: '#kontakt',
      imageUrl: 'https://placehold.co/720x520/2969f1/ffffff?text=Lajf',
    },
    {
      type: 'services',
      title: 'Co robimy',
      subtitle: 'Trzy rzeczy, na których się znamy — i które naprawdę przekładają się na klientów.',
      items: [
        {
          title: 'Strony i aplikacje',
          body: 'Szybkie, lekkie, zbudowane pod konwersję. Bez balastu, który tylko spowalnia.',
        },
        {
          title: 'Bezpieczeństwo i RODO',
          body: 'Zgodność i ochrona danych wbudowane od pierwszego dnia — nie doklejone na końcu.',
        },
        {
          title: 'Opieka i rozwój',
          body: 'Hosting, aktualizacje, drobne zmiany. Strona żyje i rozwija się razem z firmą.',
        },
      ],
    },
    {
      type: 'portfolio',
      title: 'Wybrane realizacje',
      subtitle: 'Dowód, że to działa — nie obietnice.',
      items: [
        {
          title: 'Platforma zgodności RODO',
          tag: 'SaaS / medyczne',
          imageUrl: 'https://placehold.co/520x360/1b4fc4/ffffff?text=RODO',
          href: '#kontakt',
        },
        {
          title: 'Ośrodek psychoterapii',
          tag: 'Strona usługowa',
          imageUrl: 'https://placehold.co/520x360/14b8a6/ffffff?text=Ośrodek',
          href: '#kontakt',
        },
        {
          title: 'Studio audio',
          tag: 'Strona + sklep',
          imageUrl: 'https://placehold.co/520x360/2969f1/ffffff?text=Studio',
          href: '#kontakt',
        },
      ],
    },
    {
      type: 'gallery',
      anchor: 'galeria',
      title: 'Galeria',
      subtitle: 'Podmień zdjęcia na realizacje klienta (public/images/).',
      items: [
        { imageUrl: 'https://placehold.co/520x390/2969f1/ffffff?text=1', caption: 'Realizacja 1' },
        { imageUrl: 'https://placehold.co/520x390/1b4fc4/ffffff?text=2', caption: 'Realizacja 2' },
        { imageUrl: 'https://placehold.co/520x390/14b8a6/ffffff?text=3', caption: 'Realizacja 3' },
        { imageUrl: 'https://placehold.co/520x390/3b78ff/ffffff?text=4', caption: 'Realizacja 4' },
      ],
    },
    {
      type: 'lead-magnet',
      title: 'Pobierz checklistę gotowości strony',
      description:
        '7 rzeczy, których RODO wymaga na stronie gabinetu. Konkret, bez prawniczego żargonu.',
      buttonLabel: 'Wyślij mi checklistę',
    },
    {
      type: 'contact',
      title: 'Porozmawiajmy o Twojej stronie',
      subtitle: 'Odpisuję zwykle tego samego dnia.',
    },
  ],
};

const HOME_EN: PageContent = {
  slug: '',
  seo: {
    title: 'Lajf — websites that work for your clients',
    description:
      'Fast, secure websites for companies and clinics. Design, build, care.',
  },
  blocks: [
    {
      type: 'hero',
      variant: 'image-right',
      title: 'A website that works for your clients',
      subtitle:
        'Fast, secure, no needless bloat. Design and build tailored to your clinic or company.',
      ctaLabel: "Let's talk",
      ctaHref: '#kontakt',
      imageUrl: 'https://placehold.co/720x520/2969f1/ffffff?text=Lajf',
    },
    {
      type: 'services',
      title: 'What we do',
      subtitle: 'Three things we are good at — and that truly turn into clients.',
      items: [
        {
          title: 'Websites & apps',
          body: 'Fast, light, built for conversion. Without bloat that only slows you down.',
        },
        {
          title: 'Security & GDPR',
          body: 'Compliance and data protection built in from day one — not bolted on at the end.',
        },
        {
          title: 'Care & growth',
          body: 'Hosting, updates, small changes. The site lives and grows with your company.',
        },
      ],
    },
    {
      type: 'contact',
      title: "Let's talk about your website",
      subtitle: 'I usually reply the same day.',
    },
  ],
};

const PAGES: Record<Locale, PageContent[]> = {
  pl: [HOME],
  en: [HOME_EN],
};

export async function getAllPages(locale: Locale): Promise<PageContent[]> {
  return PAGES[locale] ?? [];
}

export async function getPage(locale: Locale, slug: string): Promise<PageContent | null> {
  return (PAGES[locale] ?? []).find((page) => page.slug === slug) ?? null;
}
