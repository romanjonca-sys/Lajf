/**
 * Poradnik lajf.eu: jedna lista artykułów dla sitemapy, spisu, szablonu i danych strukturalnych.
 * Treść artykułu mieszka w jego pliku w src/pages/poradnik/, tutaj tylko metadane.
 * Dodając artykuł, dopisz go tutaj, a sitemap i spis zobaczą go same.
 */

export interface ArtykulFaq {
  q: string;
  a: string;
}

/** Wezwanie do działania na końcu artykułu: dopasowane do tematu, nie jedno dla wszystkich. */
export interface KategoriaCta {
  h2: string;
  p: string;
  label: string;
  href: string;
}

export interface Kategoria {
  /** Nagłówek grupy w spisie poradnika. */
  nazwa: string;
  /** Etykieta nad tytułem artykułu. */
  etykieta: string;
  cta: KategoriaCta;
}

export const KATEGORIE = {
  'domena-i-poczta': {
    nazwa: 'Domena i poczta',
    etykieta: 'Poradnik · domena i poczta',
    cta: {
      h2: 'Wolisz, żeby ktoś zrobił to za Ciebie?',
      p: 'Przenosimy domeny bez przerwy w poczcie i ustawiamy SPF, DKIM i DMARC, a potem sprawdzamy wynik testem dostarczalności. Napisz, jaka to domena i gdzie jest dziś.',
      label: 'Napisz do nas →',
      href: '/#kontakt',
    },
  },
  gabinety: {
    nazwa: 'Gabinety: strona i pomiar',
    etykieta: 'Poradnik dla gabinetów',
    cta: {
      h2: 'Sprawdzimy to na Twojej stronie',
      p: 'W Audycie Cyfrowym placówki pokazujemy konkretne żądania wysłane z Twojej strony do Google i Meta, a nie ogólne ostrzeżenia.',
      label: 'Zobacz audyt placówki →',
      href: '/audyt-placowki-medycznej/',
    },
  },
  'biura-rachunkowe': {
    nazwa: 'Biura rachunkowe: AML i dokumenty',
    etykieta: 'Poradnik dla biur rachunkowych',
    cta: {
      h2: 'Procedura, karta klienta i umowy w jednym miejscu',
      p: 'Przygotowujemy dokumentację AML i RODO biura, a karty klientów i umowy prowadzisz w panelu pod adresem Twojego biura.',
      label: 'Zobacz ofertę dla biur →',
      href: '/biura-rachunkowe/',
    },
  },
} as const satisfies Record<string, Kategoria>;

export type KategoriaId = keyof typeof KATEGORIE;

export interface Artykul {
  slug: string;
  kategoria: KategoriaId;
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
    slug: 'poczta-firmowa-co-wybrac',
    kategoria: 'domena-i-poczta',
    title: 'Poczta firmowa: Gmail, hosting czy Workspace? | Lajf',
    description:
      'Darmowy Gmail, skrzynka u hostingu, Google Workspace czy Microsoft 365. Porównanie kosztów, RODO i dostarczalności oraz prosta reguła wyboru na start.',
    h1: 'Poczta firmowa: co wybrać',
    h1hl: 'na start',
    lead: 'Darmowy Gmail, skrzynka u hostingu, Google Workspace czy Microsoft 365. Uczciwe porównanie i prosta reguła wyboru dla małej firmy.',
    published: '2026-10-01',
    faq: [
      {
        q: 'Czy adres w domenie zawsze trafia do skrzynki odbiorcy?',
        a: 'Nie. Trzeba ustawić rekordy SPF, DKIM i DMARC. Bez nich maile z adresu w domenie często wpadają do spamu, niezależnie od dostawcy poczty.',
      },
      {
        q: 'Czy Gmail nadal pobiera pocztę z innych kont przez POP?',
        a: 'Według pomocy Google opcja Sprawdź pocztę z innych kont znika z Gmaila w przeglądarce na komputerze. Zostaje przekierowanie poczty. Wysyłka przez Wyślij pocztę jako działa do końca 2026 roku, od stycznia 2027 Google wycofuje ją dla adresów innych dostawców.',
      },
      {
        q: 'Czy darmowy Gmail nadaje się do korespondencji z klientami?',
        a: 'Do prywatnych spraw tak. Do firmy słabo, bo konto nie ma umowy powierzenia danych, a po odejściu pracownika firma nie ma nad nim kontroli.',
      },
      {
        q: 'Czy Google Workspace i Microsoft 365 mają umowę powierzenia danych?',
        a: 'Tak. Google oferuje Cloud Data Processing Addendum, a Microsoft Data Protection Addendum. Warto je zaakceptować lub sprawdzić w umowie i wpisać dostawcę do rejestru czynności.',
      },
    ],
  },
  {
    slug: 'maile-z-firmowej-domeny-w-spamie',
    kategoria: 'domena-i-poczta',
    title: 'Maile z firmowej domeny w spamie: SPF, DKIM, DMARC | Lajf',
    description:
      'Dlaczego maile z firmowej domeny trafiają do spamu, mimo że z Gmaila dochodzą. Co to SPF, DKIM i DMARC oraz jak sprawdzić i poprawić rekordy DNS.',
    h1: 'Maile z firmowej domeny w spamie.',
    h1hl: 'SPF, DKIM i DMARC krok po kroku',
    lead: 'Klient nie dostał Twojej oferty, bo wylądowała w spamie. Zwykle winne są brakujące albo źle ustawione rekordy SPF, DKIM i DMARC. Pokazujemy, jak je sprawdzić i poprawić samodzielnie.',
    published: '2026-10-01',
    faq: [
      {
        q: 'Czy mała firma musi mieć DMARC?',
        a: 'Formalnie nie. Google i Yahoo wymagają DMARC od nadawców masowych, czyli od około 5000 wiadomości dziennie. Każdy nadawca powinien mieć SPF lub DKIM. DMARC z polityką none jest jednak łatwy do dodania i pomaga w dostarczalności.',
      },
      {
        q: 'Czym różni się ~all od -all w SPF?',
        a: 'Znak ~all oznacza softfail: maile z nieznanych serwerów są podejrzane, ale odbiorca nie powinien ich odrzucać wyłącznie z tego powodu. Znak -all oznacza fail, czyli jednoznaczny zakaz. Zaczynaj od ~all.',
      },
      {
        q: 'Ile rekordów SPF może mieć domena?',
        a: 'Tylko jeden. Drugi rekord unieważnia oba. Dodatkowe usługi dopisuj do istniejącego rekordu przez include. Rekord może też wywołać najwyżej 10 zapytań DNS.',
      },
      {
        q: 'Mam SPF, DKIM i DMARC, a mail nadal trafia do spamu. Dlaczego?',
        a: 'Na wynik wpływa też reputacja adresu IP serwera oraz treść wiadomości. W naszym teście mail z pustą treścią i samym załącznikiem dostał 7,8 na 10 zamiast 10, mimo poprawnej konfiguracji.',
      },
    ],
  },
  {
    slug: 'przeniesienie-domeny-bez-utraty-poczty',
    kategoria: 'domena-i-poczta',
    title: 'Przeniesienie domeny (DNS) bez utraty poczty i strony | Lajf',
    description:
      'Jak zmienić serwery DNS domeny i nie stracić poczty: DNSSEC i rekord DS, osobna nazwa mail, pułapki certyfikatu oraz lista kontrolna przepięcia.',
    h1: 'Przenosisz domenę do innego dostawcy.',
    h1hl: 'Jak nie stracić poczty ani strony',
    lead: 'Zmiana serwerów DNS trwa kilka minut w panelu. Potem okazuje się, że nie działa poczta, bo DNSSEC został włączony albo rekord MX wskazuje na domenę główną. Oto kolejność, która tego unika.',
    published: '2026-10-01',
    faq: [
      {
        q: 'Czy zmiana serwerów DNS to to samo co transfer domeny?',
        a: 'Nie. Transfer zmienia rejestratora i wymaga kodu autoryzacyjnego (dla .pl to AuthInfo). Zmiana serwerów DNS zmienia tylko to, kto przechowuje rekordy domeny. Rejestrator zostaje ten sam i kodu nie potrzeba.',
      },
      {
        q: 'Dlaczego przed zmianą serwerów DNS trzeba wyłączyć DNSSEC?',
        a: 'W rejestrze zapisany jest rekord DS, czyli skrót klucza dotychczasowego dostawcy. Nowy dostawca ma inny klucz, więc resolvery walidujące odrzucą odpowiedzi i domena przestanie się otwierać. Najpierw usuń DS, potem zmień serwery.',
      },
      {
        q: 'Jak długo czekać po wyłączeniu DNSSEC?',
        a: 'Do wygaśnięcia czasu życia (TTL) rekordu DS. W opisanym przypadku w rejestrze .pl było to 86400 sekund, czyli 24 godziny. Wynik polecenia dig +short DS domena.pl @1.1.1.1 ma być pusty.',
      },
      {
        q: 'Dlaczego poczta powinna mieć osobną nazwę, na przykład mail?',
        a: 'Domena główna ma wskazywać na nowy hosting strony. Jeśli MX i ustawienia programów pocztowych używają samej domeny, poczta przestanie działać. Nazwa mail z rekordem A na serwer poczty i bez proxy rozdziela obie usługi.',
      },
    ],
  },
  {
    slug: 'poczta-z-domeny-w-gmailu',
    kategoria: 'domena-i-poczta',
    title: 'Poczta z firmowej domeny w Gmailu: instrukcja | Lajf',
    description:
      'Jak czytać pocztę kontakt@firma.pl w Gmailu i wysyłać jako adres firmowy. Przekierowanie, SMTP, błąd certyfikatu i zmiana Google od stycznia 2027.',
    h1: 'Poczta z firmowej domeny w Gmailu.',
    h1hl: 'Przekierowanie i wysyłanie jako adres firmowy',
    lead: 'Skrzynka kontakt@firma.pl u hostingu, a Ty wolisz pracować w Gmailu. Da się to ustawić w kilka minut, ale jest jeden błąd certyfikatu i jedna zmiana Google na 2027 rok, o których warto wiedzieć wcześniej.',
    published: '2026-10-01',
    faq: [
      {
        q: 'Dlaczego Gmail pokazuje błąd „certificate doesn\'t match the host”?',
        a: 'Serwer współdzielonego hostingu ma certyfikat wystawiony na nazwę dostawcy, a nie na Twoją domenę. W ustawieniach SMTP w Gmailu podaj nazwę serwera dostawcy z panelu hostingu zamiast mail.twojadomena.pl.',
      },
      {
        q: 'Czy mogę pobierać pocztę do Gmaila przez POP?',
        a: 'Google wycofuje pobieranie przez POP (Sprawdź pocztę z innych kont) i Gmailify. Nowych połączeń nie da się już dodać. Dlatego lepiej ustawić przekierowanie w panelu hostingu.',
      },
      {
        q: 'Czy wysyłanie jako adres firmowy przestanie działać w 2027 roku?',
        a: 'Google zapowiada, że od stycznia 2027 roku Gmail nie będzie obsługiwać funkcji Wyślij jako dla adresów w usługach innych firm. Nie podaje wprost, czy dotyczy to domen na zwykłym hostingu, więc warto mieć plan awaryjny, na przykład program pocztowy.',
      },
      {
        q: 'Czy przekierowanie psuje SPF?',
        a: 'Może, bo adres IP serwera przekazującego nie pasuje do rekordu SPF nadawcy. Podpis DKIM nadawcy przeżywa przekazanie, jeśli wiadomość nie została zmieniona. Do zaliczenia DMARC wystarcza jedno z dwóch.',
      },
    ],
  },
  {
    slug: 'piksel-meta-na-stronie-gabinetu',
    kategoria: 'gabinety',
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
    kategoria: 'gabinety',
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
    kategoria: 'gabinety',
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
    kategoria: 'gabinety',
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
  {
    slug: 'procedura-aml-biuro-rachunkowe',
    kategoria: 'biura-rachunkowe',
    title: 'Procedura AML w biurze rachunkowym: co musi zawierać | Lajf',
    description:
      'Co musi zawierać procedura AML biura rachunkowego według art. 50 ustawy AML. Ocena ryzyka, szkolenia, kontrola i kary, z odwołaniem do przepisów.',
    h1: 'Procedura AML w biurze rachunkowym.',
    h1hl: 'Co musi zawierać',
    lead: 'Jedenaście elementów z art. 50 ustawy, dokumenty, bez których procedura nie wystarczy. Do tego to, o co zapyta kontrola. Każdy punkt z numerem przepisu.',
    published: '2026-11-02',
    faq: [
      {
        q: 'Czy jednoosobowe biuro rachunkowe musi mieć procedurę AML?',
        a: 'Tak. Art. 50 dotyczy każdej instytucji obowiązanej, także jednoosobowej. W takim biurze zadania kadry kierowniczej i osoby odpowiedzialnej za AML wykonuje właściciel (art. 9 ustawy).',
      },
      {
        q: 'Jak często trzeba aktualizować procedurę AML?',
        a: 'Procedura podlega bieżącej weryfikacji i aktualizacji w razie potrzeby (art. 50 ust. 1). Ocenę ryzyka biura aktualizuje się w razie potrzeby, nie rzadziej niż co 2 lata (art. 27 ust. 3).',
      },
      {
        q: 'Czy wystarczy wzór procedury AML z internetu?',
        a: 'Sam wzór nie. Art. 50 ust. 2 wymaga, żeby procedura uwzględniała charakter, rodzaj i rozmiar działalności biura. Wzór trzeba dopasować do tego, jakich klientów obsługujesz i jak z nimi pracujesz.',
      },
      {
        q: 'Kto może skontrolować biuro rachunkowe z AML?',
        a: 'Generalny Inspektor Informacji Finansowej (art. 130 ust. 1) oraz naczelnik urzędu celno-skarbowego wobec instytucji, które kontroluje (art. 130 ust. 2 pkt 1 lit. e).',
      },
    ],
  },
];

export function getArtykul(slug: string): Artykul {
  const artykul = ARTYKULY.find((a) => a.slug === slug);
  if (!artykul) throw new ArtykulNieIstniejeError(slug);
  return artykul;
}

/** Artykuły pogrupowane w kolejności kategorii z KATEGORIE, bez pustych grup. */
export function artykulyWedlugKategorii(): Array<{ id: KategoriaId; kategoria: Kategoria; artykuly: Artykul[] }> {
  return (Object.keys(KATEGORIE) as KategoriaId[])
    .map((id) => ({ id, kategoria: KATEGORIE[id], artykuly: ARTYKULY.filter((a) => a.kategoria === id) }))
    .filter((grupa) => grupa.artykuly.length > 0);
}

/** „Czytaj dalej”: najpierw artykuły z tej samej kategorii, potem pozostałe. */
export function pozostaleArtykuly(slug: string): Artykul[] {
  const artykul = getArtykul(slug);
  const inne = ARTYKULY.filter((a) => a.slug !== slug);
  return [...inne.filter((a) => a.kategoria === artykul.kategoria), ...inne.filter((a) => a.kategoria !== artykul.kategoria)];
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
