/**
 * Poradnik lajf.eu: jedna lista artykułów dla sitemapy, spisu, szablonu i danych strukturalnych.
 * Treść artykułu mieszka w jego pliku w src/pages/poradnik/, tutaj tylko metadane.
 * Dodając artykuł, dopisz go tutaj, a sitemap i spis zobaczą go same.
 */

export interface ArtykulFaq {
  q: string;
  a: string;
}

export interface Artykul {
  slug: string;
  /** Znacznik <title>, razem z „| Lajf”. */
  title: string;
  description: string;
  /** H1, część przed wyróżnieniem. */
  h1: string;
  /** H1, wyróżniona fraza (kolor akcentu). */
  h1hl: string;
  lead: string;
  /** Data publikacji w formacie RRRR-MM-DD. */
  published: string;
  updated?: string;
  faq: ArtykulFaq[];
}

export const SCIEZKA_PORADNIKA = 'poradnik';
export const AUTOR = { name: 'Roman Jońca', url: 'https://lajf.eu/#o-mnie' };

export class ArtykulNieIstniejeError extends Error {
  readonly slug: string;

  constructor(slug: string) {
    super(`Brak artykułu o adresie "${slug}" w poradniku.`);
    this.name = 'ArtykulNieIstniejeError';
    this.slug = slug;
  }
}

export const ARTYKULY: Artykul[] = [
  {
    slug: 'piksel-meta-na-stronie-gabinetu',
    title: 'Co piksel Meta wysyła ze strony gabinetu do Facebooka | Lajf',
    description:
      'Piksel Meta potrafi wysłać z podstron gabinetu nazwy zabiegów i skróty danych pacjentów. Za co ukarano apteki w Szwecji i jak sprawdzić własną stronę.',
    h1: 'Piksel Meta na stronie gabinetu.',
    h1hl: 'Co naprawdę trafia do Facebooka',
    lead: 'Na stronie sklepu piksel Meta to rutyna. Na stronie gabinetu ten sam skrypt potrafi wysłać do Facebooka nazwę zabiegu, którą ktoś oglądał, razem z identyfikatorem jego przeglądarki.',
    published: '2026-09-14',
    faq: [
      {
        q: 'Czy gabinet może mieć piksel Meta na stronie?',
        a: 'Może, ale dopiero po zgodzie odwiedzającego i w konfiguracji, która nie wysyła adresów podstron z nazwami zabiegów ani danych z formularzy. Sam piksel nie jest zakazany. Problemem jest to, co przez niego wychodzi.',
      },
      {
        q: 'Czy skrót (hash) adresu e-mail to nadal dana osobowa?',
        a: 'Tak. Skrót służy do tego, żeby dopasować konkretną osobę do jej konta, więc jest daną pseudonimizowaną, a nie anonimową. RODO obejmuje go w całości.',
      },
      {
        q: 'Jak sprawdzić, co wysyła piksel na mojej stronie?',
        a: 'Otwórz podstronę zabiegu w oknie incognito, naciśnij F12, przejdź do zakładki Network i wpisz w filtr facebook.com/tr. Parametr dl pokazuje adres wysłany do Meta, a parametry zaczynające się od ud oznaczają dane z formularza w postaci skrótu.',
      },
    ],
  },
  {
    slug: 'remarketing-gabinetu-google-meta',
    title: 'Remarketing gabinetu, co blokują Google i Meta | Lajf',
    description:
      'Google i Meta ograniczają reklamy spersonalizowane w branży zdrowia. Co nie działa w kampaniach gabinetu, co działa nadal i jak liczyć zapytania pacjentów.',
    h1: 'Remarketing dla gabinetu.',
    h1hl: 'Czego już nie zrobisz i co działa zamiast',
    lead: 'Lista osób, które oglądały podstronę zabiegu, pacjenci wgrani do reklam, konwersja z nazwą leczenia. W branży zdrowia Google i Meta blokują to same. Zostaje kilka sposobów, które działają lepiej, niż się wydaje.',
    published: '2026-09-14',
    faq: [
      {
        q: 'Czy gabinet może reklamować się w wyszukiwarce Google?',
        a: 'Google na to pozwala, bo reklama na frazę typu „stomatolog Katowice” kieruje się na zapytanie, a nie na osobę. Gabinet podlega jednak polskiemu zakazowi reklamy działalności leczniczej. Treść powinna informować o usłudze, miejscu, godzinach i cenniku, bez superlatyw, promocji i zachęt.',
      },
      {
        q: 'Czy nowy Kodeks Etyki Lekarskiej zniósł zakaz reklamy?',
        a: 'Nie w całości. Od 2025 roku kodeks pozwala lekarzom korzystać z informacji o usługach zgodnie z zasadami etyki. Zakaz nadawania informacji cech reklamy wynika jednak z art. 14 ustawy o działalności leczniczej i ten przepis nadal obowiązuje.',
      },
      {
        q: 'Dlaczego Meta blokuje moje konwersje niestandardowe?',
        a: 'Od 2 września 2025 roku Meta oznacza konwersje niestandardowe sugerujące stan zdrowia. Takich konwersji nie da się użyć w nowych kampaniach. Nazwa powinna opisywać czynność, na przykład wysłanie formularza, a nie zabieg ani schorzenie.',
      },
      {
        q: 'Jak mierzyć skuteczność reklam gabinetu bez remarketingu?',
        a: 'Liczyć zapytania u siebie. Formularz zapisuje na serwerze, z której kampanii przyszła osoba. Działa to niezależnie od zgód na cookies i nie wymaga wysyłania danych pacjenta do platformy reklamowej.',
      },
    ],
  },
  {
    slug: 'ga4-pokazuje-mniej-wizyt-niz-search-console',
    title: 'Dlaczego GA4 pokazuje mniej wizyt niż Search Console | Lajf',
    description:
      'GA4 widzi nawet połowę mniej ruchu niż Search Console. Kiedy to błąd wdrożenia, a kiedy normalny skutek banera zgód na stronie gabinetu.',
    h1: 'GA4 pokazuje mniej wizyt',
    h1hl: 'niż Search Console. Błąd czy norma?',
    lead: 'Search Console pokazuje 120 kliknięć, GA4 pięćdziesiąt wizyt. Zanim uznasz analitykę za zepsutą, sprawdź, czy obie liczby nie są po prostu prawdziwe.',
    published: '2026-09-14',
    faq: [
      {
        q: 'Czy różnica między GA4 a Search Console oznacza błąd?',
        a: 'Nie zawsze. Search Console liczy kliknięcia w wynikach Google, a GA4 wizyty osób, które zgodziły się na analitykę. Przy uczciwym banerze zgód różnica rzędu połowy jest normalna. Błędem jest sytuacja, w której GA4 nie widzi prawie nic.',
      },
      {
        q: 'Czym różni się podstawowy od zaawansowanego trybu zgody Google?',
        a: 'W wariancie podstawowym skrypt Google nie ładuje się, dopóki odwiedzający nie zgodzi się na analitykę. W zaawansowanym ładuje się od razu, a bez zgody wysyła sygnały bez plików cookie, na podstawie których Google może szacować brakujący ruch.',
      },
      {
        q: 'Jak liczyć zapytania od pacjentów, skoro GA4 widzi tylko część ruchu?',
        a: 'Poza GA4. Zgłoszenie z formularza zapisuje się na serwerze razem ze źródłem wejścia. Liczba zapytań jest wtedy pełna, a GA4 zostaje do oglądania ścieżki odwiedzających.',
      },
    ],
  },
  {
    slug: 'formularz-kontaktowy-gabinetu-dane-pacjenta',
    title: 'Dokąd trafiają dane z formularza na stronie gabinetu | Lajf',
    description:
      'Wiadomość z formularza gabinetu zostawia kopie w bazie strony, w skrzynce pocztowej i u dostawców zewnętrznych. Gdzie ich szukać i jak ograniczyć ryzyko.',
    h1: 'Formularz na stronie gabinetu.',
    h1hl: 'Dokąd trafiają dane pacjenta',
    lead: 'Jedna wiadomość od pacjenta zostawia kopie w bazie strony, w skrzynce pocztowej i u dostawców zewnętrznych. Każda żyje własnym życiem, zwykle dłużej, niż ktokolwiek zakłada.',
    published: '2026-09-14',
    faq: [
      {
        q: 'Czy formularz kontaktowy gabinetu przetwarza dane o zdrowiu?',
        a: 'Często tak, nawet jeśli nikt o to nie prosi. Pacjent w polu „wiadomość” opisuje objawy albo pyta o konkretne leczenie. Formularz trzeba więc zabezpieczać tak, jakby zbierał dane o zdrowiu.',
      },
      {
        q: 'Czy wtyczka formularza zapisuje wiadomości na serwerze strony?',
        a: 'Zależy od wtyczki i ustawień. Część narzędzi do WordPressa trzyma kopię każdego zgłoszenia w bazie strony. Warto to sprawdzić w panelu, bo taka kopia leży latami i nikt jej nie czyści.',
      },
      {
        q: 'Czy przy formularzu musi być klauzula informacyjna?',
        a: 'Tak. Osoba wysyłająca formularz musi dostać informacje z art. 13 RODO, czyli kto jest administratorem, w jakim celu przetwarza dane i jak długo je przechowuje. Wystarczy krótka informacja przy przycisku z odnośnikiem do polityki prywatności.',
      },
    ],
  },
];

export function getArtykul(slug: string): Artykul {
  const artykul = ARTYKULY.find((a) => a.slug === slug);
  if (!artykul) throw new ArtykulNieIstniejeError(slug);
  return artykul;
}

/** Adres artykułu z ukośnikiem na końcu, bo taki jest kanoniczny na Cloudflare Pages. */
export function sciezkaArtykulu(slug: string): string {
  return `/${SCIEZKA_PORADNIKA}/${slug}/`;
}

/** Ścieżki poradnika dla sitemapy, bez ukośników na brzegach (sitemap dokleja je sama). */
export function sciezkiPoradnika(): string[] {
  return [SCIEZKA_PORADNIKA, ...ARTYKULY.map((a) => `${SCIEZKA_PORADNIKA}/${a.slug}`)];
}

export function schemaArtykulu(artykul: Artykul, siteHref: string): Record<string, unknown> {
  const canonical = new URL(sciezkaArtykulu(artykul.slug), siteHref).href;
  const headline = `${artykul.h1} ${artykul.h1hl}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline,
        description: artykul.description,
        datePublished: artykul.published,
        dateModified: artykul.updated ?? artykul.published,
        inLanguage: 'pl-PL',
        mainEntityOfPage: canonical,
        image: new URL('/images/og-default.jpg', siteHref).href,
        author: { '@type': 'Person', name: AUTOR.name, url: AUTOR.url },
        publisher: { '@type': 'Organization', name: 'Lajf', url: new URL('/', siteHref).href },
      },
      {
        '@type': 'FAQPage',
        mainEntity: artykul.faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Lajf', item: new URL('/', siteHref).href },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Poradnik',
            item: new URL(`/${SCIEZKA_PORADNIKA}/`, siteHref).href,
          },
          { '@type': 'ListItem', position: 3, name: headline, item: canonical },
        ],
      },
    ],
  };
}
