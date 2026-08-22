/**
 * Treść landingów Audytu Cyfrowego — jeden układ, dwa zestawy słów.
 *
 * Powód wydzielenia: wariant dla firm nie jest landingiem medycznym z podmienionym
 * słowem „pacjent". Różni się zakresem (marketing zamiast danych medycznych),
 * przykładami w raporcie i całym językiem. Wspólny jest układ strony, style,
 * formularz i pomiar — i to one siedzą w `components/audyt-landing.astro`.
 *
 * Dodanie trzeciego wariantu (np. dla kancelarii) = dopisanie zestawu tutaj.
 * Bez kopiowania znaczników i bez dotykania układu.
 */

/** Jeden z siedmiu obszarów audytu. `d` to ścieżka SVG ikony. */
export interface ObszarAudytu {
  nr: string;
  b: string;
  s: string;
  d: string;
}

/** Przykładowe ustalenie w podglądzie raportu. `klasa` steruje kolorem wagi. */
export interface Ustalenie {
  waga: string;
  klasa: 'pilne' | 'wazne' | 'szansa';
  tresc: string;
}

export interface PozycjaZListy {
  b: string;
  s: string;
}

export interface Dowod extends PozycjaZListy {
  href: string | null;
}

export interface Etap {
  n: string;
  h: string;
  p: string;
}

export interface PytanieFaq {
  q: string;
  a: string;
}

export interface ZestawAudytu {
  /** Ścieżka strony — używana w canonical i schema.org. */
  sciezka: string;
  tytul: string;
  opis: string;
  etykietaHero: string;
  h1: string;
  h1Wyroznione: string;
  claim: string;
  opisHero: string[];
  zakresPodtytul: string;
  zakres: ObszarAudytu[];
  ustalenia: Ustalenie[];
  wynikPodtytul: string;
  /** Rzeczownik w zastrzezeniu pod mockupem: nie opis konkretnej ... */
  podmiotWZastrzezeniu: string;
  /** Dopełnienie zdania o skutku w drugim pytaniu raportu. */
  skutekDlaKogo: string;
  otrzymujesz: PozycjaZListy[];
  dowody: Dowod[];
  wspolpraca: Etap[];
  cenaNazwa: string;
  faq: PytanieFaq[];
  /** Etykiety pól formularza — reszta (nazwy `name`) jest wspólna, bo czyta je worker. */
  formularz: {
    naglowek: string;
    opis: string;
    etykietaNazwy: string;
    podpowiedzNazwy: string;
    podpowiedzWww: string;
    podpowiedzEmail: string;
    cta: string;
  };
  /** Atrybut `name` formularza — rozdziela zgłoszenia w skrzynce. */
  nazwaFormularza: string;
  /** Parametr `method` w zdarzeniu generate_lead — rozdziela warianty w GA4. */
  metodaLeada: string;
  schemaNazwa: string;
  schemaOdbiorcy: string;
}

/**
 * Cztery pytania z raportu. Sama metoda jest wspólna — różni się tylko to,
 * czyjego interesu dotyczy skutek, więc parametryzujemy jedno zdanie zamiast
 * powielać całą listę w każdym zestawie.
 */
export function czteryPytania(zestaw: ZestawAudytu) {
  return [
    { nr: '1', q: 'Co jest nie tak?', s: 'Konkretne znalezisko, opisane bez żargonu.' },
    { nr: '2', q: 'Dlaczego ma to znaczenie?', s: `Co z tego wynika ${zestaw.skutekDlaKogo}.` },
    { nr: '3', q: 'Co zrobić?', s: 'Zalecenie, które da się wykonać — także bez nas.' },
    { nr: '4', q: 'Co zrobić najpierw?', s: 'Kolejność. Bo nie wszystko naraz i nie wszystko od razu.' },
  ];
}

const IKONY = {
  ekran: 'M3 5h18v11H3zM8 20h8M12 16v4',
  lupa: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4',
  wykres: 'M4 19V9M10 19V5M16 19v-7M22 19H2',
  tarcza: 'M12 3l7 3v5c0 4.6-3.1 7.8-7 9-3.9-1.2-7-4.4-7-9V6l7-3zM9 12l2 2 4-4',
  dokument: 'M6 3h9l4 4v14H6zM15 3v4h4M9 13h6M9 17h4',
  osoba: 'M4 20s2-8 8-8 8 8 8 8M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  trybik: 'M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1',
  lejek: 'M3 5h18l-7 8v6l-4 2v-8z',
};

/** Zakres dostawy i etapy współpracy są wspólne — produkt jest ten sam. */
const OTRZYMUJESZ: PozycjaZListy[] = [
  { b: 'Raport PDF', s: 'Komplet ustaleń na piśmie, opisany po ludzku. Zostaje u Ciebie i możesz go pokazać komukolwiek.' },
  { b: 'Podsumowanie najważniejszych ustaleń', s: 'Skrót na początku raportu: co znaleźliśmy, zanim wejdziesz w szczegóły.' },
  { b: 'Priorytety problemów', s: 'Co naprawić najpierw, co potem, a co może spokojnie poczekać.' },
  { b: 'Konkretne rekomendacje', s: 'Przy każdym znalezisku napisane, co z nim zrobić. Bez „należy rozważyć optymalizację".' },
  { b: 'Roadmapa dalszych działań', s: 'Kolejność kroków po audycie, żebyś wiedział, w co się pakujesz, zanim się w to spakujesz.' },
  { b: 'Omówienie wyników', s: 'Rozmowa, na której przechodzimy przez raport i odpowiadam na pytania. Raport bez omówienia zwykle ląduje w szufladzie.' },
];

const DOWODY: Dowod[] = [
  { b: 'Moje RODO', s: 'Działający system zgodności dla placówek medycznych.', href: 'https://moje-rodo.pl' },
  { b: 'Panel Lajf', s: 'Własny system sprzedaży i obsługi klientów.', href: null },
  { b: 'Social OS', s: 'Własne narzędzie do zarządzania komunikacją marek.', href: null },
  { b: 'Realizacje', s: 'Działające serwisy, które można samemu sprawdzić.', href: '/#realizacje' },
];

export const MEDYCZNY: ZestawAudytu = {
  sciezka: '/audyt-placowki-medycznej/',
  tytul: 'Audyt Cyfrowy Placówki Medycznej — 1490 zł netto | Lajf',
  opis: 'Sprawdź, gdzie Twoja placówka traci pacjentów, czas i pieniądze. Strona, Google, analityka, bezpieczeństwo, dane, ścieżka pacjenta i automatyzacje w jednym audycie. Raport z priorytetami. 1490 zł netto.',
  etykietaHero: 'Dla prywatnych placówek medycznych i gabinetów',
  h1: 'Audyt Cyfrowy',
  h1Wyroznione: 'Placówki Medycznej',
  claim: 'Sprawdź, gdzie Twoja placówka traci pacjentów, czas i pieniądze.',
  opisHero: [
    'W jednym audycie sprawdzamy stronę WWW, widoczność w Google, analitykę, bezpieczeństwo, formularze i dane, ścieżkę pacjenta oraz procesy, które można uprościć lub zautomatyzować.',
    'Dostajesz konkretny raport: co działa, co wymaga poprawy i co warto zrobić najpierw.',
  ],
  zakresPodtytul: 'Siedem obszarów, które razem decydują o tym, czy pacjent trafia do Twojej rejestracji — czy do kogoś innego.',
  zakres: [
    { nr: '01', b: 'Strona WWW i technika', s: 'Czy strona jest szybka, czytelna na telefonie i prowadzi pacjenta do właściwego działania.', d: IKONY.ekran },
    { nr: '02', b: 'Widoczność w Google', s: 'Czy placówkę można znaleźć wtedy, kiedy pacjent rzeczywiście szuka pomocy.', d: IKONY.lupa },
    { nr: '03', b: 'Analityka i konwersje', s: 'Czy wiesz, skąd przychodzą pacjenci i które działania naprawdę prowadzą do kontaktu.', d: IKONY.wykres },
    { nr: '04', b: 'Bezpieczeństwo techniczne', s: 'Konfiguracja strony, aktualność, nagłówki bezpieczeństwa, dostępy i kopie zapasowe.', d: IKONY.tarcza },
    { nr: '05', b: 'Formularze, cookies i dane', s: 'Jakie dane zbiera strona, dokąd je wysyła i jakie narzędzia działają w tle.', d: IKONY.dokument },
    { nr: '06', b: 'Ścieżka pacjenta', s: 'Od wejścia na stronę do telefonu, formularza lub rejestracji. Sprawdzamy, gdzie pacjent może się zatrzymać albo zrezygnować.', d: IKONY.osoba },
    { nr: '07', b: 'Automatyzacje', s: 'Szukamy powtarzalnych czynności, które można uprościć lub przekazać technologii.', d: IKONY.trybik },
  ],
  ustalenia: [
    { waga: 'PILNE', klasa: 'pilne', tresc: 'Formularz przesyła dane do zewnętrznego narzędzia przed uzyskaniem wymaganej zgody.' },
    { waga: 'WAŻNE', klasa: 'wazne', tresc: 'Na urządzeniu mobilnym droga od strony głównej do rejestracji wymaga zbyt wielu kroków.' },
    { waga: 'SZANSA', klasa: 'szansa', tresc: 'Powtarzalne przypomnienia i obsługę części zapytań można zautomatyzować.' },
  ],
  wynikPodtytul: 'Nie dostajesz listy technicznych uwag. Dostajesz uporządkowane ustalenia — każde z wagą i z tym, co z nim zrobić.',
  podmiotWZastrzezeniu: 'placówki',
  skutekDlaKogo: 'dla placówki i dla pacjenta',
  otrzymujesz: OTRZYMUJESZ,
  dowody: DOWODY,
  wspolpraca: [
    { n: '01', h: 'Pre-audyt', p: 'Bezpłatne sprawdzenie z zewnątrz i rozmowa. Mówię wprost, czy widzę coś, co warto naprawiać.' },
    { n: '02', h: 'Audyt Cyfrowy', p: 'Siedem obszarów, raport z priorytetami i rekomendacjami, omówienie wyników.' },
    { n: '03', h: 'Wdrożenie', p: 'Naprawiamy to, co wyszło w audycie. Zakres wynika z raportu, nie z gotowego cennika.' },
    { n: '04', h: 'Cyfrowa Opieka', p: 'Stała opieka nad cyfrową stroną placówki: pilnujemy, mierzymy, poprawiamy.' },
  ],
  cenaNazwa: 'Audyt Cyfrowy<br />Placówki Medycznej',
  faq: [
    {
      q: 'Czy to jest audyt RODO?',
      a: 'Nie. Sprawdzamy techniczną stronę ochrony danych: co zbierają Twoje formularze, dokąd to wędruje, jakie skrypty działają w tle i jak ustawione są cookies. To nie jest opinia prawna ani pełny audyt zgodności — tym zajmuje się nasza wyspecjalizowana marka moje-rodo i jeśli okaże się potrzebna, powiem to wprost w raporcie.',
    },
    {
      q: 'Czy to test bezpieczeństwa typu włamanie?',
      a: 'Nie. Robimy przegląd konfiguracji: certyfikat, nagłówki, aktualność oprogramowania, dostępy, kopie zapasowe. Nie próbujemy się włamywać do Twoich systemów i nie testujemy ich odporności na atak. To osobna usługa, która wymaga osobnej umowy i zgody na piśmie.',
    },
    {
      q: 'Mam informatyka albo agencję. Po co mi audyt?',
      a: 'Audyt nie jest przeciwko nim. Jest spojrzeniem z zewnątrz na całość — bo informatyk zwykle odpowiada za serwer, agencja za reklamy, a nikt za to, czy to wszystko razem prowadzi pacjenta do rejestracji. Raport możesz przekazać swoim ludziom i zlecić naprawę im. Wielu klientów tak robi.',
    },
    {
      q: 'Czy po audycie muszę zlecić wam wdrożenie?',
      a: 'Nie. Raport jest Twój i możesz z nim zrobić, co chcesz — wdrożyć samodzielnie, zlecić komu innemu albo odłożyć. Nie ma tu żadnego zobowiązania, a rekomendacje piszemy tak, żeby dało się je wykonać bez nas.',
    },
    {
      q: 'Czym różni się bezpłatny pre-audyt od płatnego audytu?',
      a: 'Pre-audyt to szybkie spojrzenie z zewnątrz i rozmowa — sprawdzam, czy w ogóle jest o czym rozmawiać. Płatny audyt to przejście przez siedem obszarów, raport na piśmie z priorytetami i rekomendacjami oraz omówienie wyników. Pre-audyt jest bezpłatny i do niczego nie zobowiązuje.',
    },
  ],
  formularz: {
    naglowek: 'Zacznijmy od bezpłatnego pre-audytu',
    opis: 'Podaj stronę placówki. Najpierw sprawdzimy ją z zewnątrz i skontaktujemy się z Tobą. Jeśli pełny audyt nie będzie miał sensu — powiemy to wprost.',
    etykietaNazwy: 'Nazwa placówki',
    podpowiedzNazwy: 'np. Przychodnia Zdrowie',
    podpowiedzWww: 'np. przychodnia-zdrowie.pl',
    podpowiedzEmail: 'kontakt@placowka.pl',
    cta: 'Sprawdź moją placówkę →',
  },
  nazwaFormularza: 'audyt',
  metodaLeada: 'formularz-audyt',
  schemaNazwa: 'Audyt Cyfrowy Placówki Medycznej',
  schemaOdbiorcy: 'Prywatne placówki medyczne i gabinety',
};

export const FIRMA: ZestawAudytu = {
  sciezka: '/audyt-firmy/',
  tytul: 'Audyt Cyfrowy Firmy — 1490 zł netto | Lajf',
  opis: 'Sprawdź, gdzie Twoja firma traci klientów, czas i pieniądze. Strona, Google, analityka, marketing, bezpieczeństwo, ścieżka klienta i automatyzacje w jednym audycie. Raport z priorytetami. 1490 zł netto.',
  etykietaHero: 'Dla małych i średnich firm',
  h1: 'Audyt Cyfrowy',
  h1Wyroznione: 'Firmy',
  claim: 'Sprawdź, gdzie Twoja firma traci klientów, czas i pieniądze.',
  opisHero: [
    'W jednym audycie sprawdzamy stronę WWW, widoczność w Google, analitykę, marketing, bezpieczeństwo i dane, ścieżkę klienta oraz procesy, które można uprościć lub zautomatyzować.',
    'Dostajesz konkretny raport: co działa, co wymaga poprawy i co warto zrobić najpierw.',
  ],
  zakresPodtytul: 'Siedem obszarów, które razem decydują o tym, czy klient trafia do Ciebie — czy do konkurencji.',
  zakres: [
    { nr: '01', b: 'Strona WWW i doświadczenie klienta', s: 'Czy strona działa, jest szybka, czytelna i prowadzi klienta do kontaktu lub zakupu.', d: IKONY.ekran },
    { nr: '02', b: 'Widoczność i Google', s: 'Czy firma jest prawidłowo widoczna w wyszukiwarce i czy podstawowe elementy SEO oraz obecności lokalnej są uporządkowane.', d: IKONY.lupa },
    { nr: '03', b: 'Analityka i pomiar', s: 'Czy firma wie, skąd przychodzą klienci, które działania działają i czy mierzone są zapytania oraz konwersje.', d: IKONY.wykres },
    { nr: '04', b: 'Marketing i pozyskiwanie klientów', s: 'Czy reklamy, social media, strona i inne kanały tworzą jeden sensowny proces zamiast osobnych działań.', d: IKONY.lejek },
    { nr: '05', b: 'Bezpieczeństwo i dane', s: 'Podstawowe bezpieczeństwo strony, formularzy, poczty i danych. RODO tylko w zakresie związanym z technologią i przepływem danych.', d: IKONY.tarcza },
    { nr: '06', b: 'Ścieżka klienta', s: 'Co dzieje się od pierwszego kontaktu ze stroną lub reklamą do zapytania, sprzedaży i dalszej obsługi. Szukamy miejsc, w których firma traci klientów.', d: IKONY.osoba },
    { nr: '07', b: 'Procesy i automatyzacje', s: 'Jakie powtarzalne czynności wykonywane ręcznie można uprościć lub zautomatyzować: zapytania, oferty, dokumenty, przypomnienia, CRM, raportowanie, komunikacja.', d: IKONY.trybik },
  ],
  ustalenia: [
    { waga: 'PILNE', klasa: 'pilne', tresc: 'Zapytania z formularza trafiają na skrzynkę, której nikt nie sprawdza codziennie — część kontaktów zostaje bez odpowiedzi.' },
    { waga: 'WAŻNE', klasa: 'wazne', tresc: 'Reklamy prowadzą na stronę główną zamiast na stronę oferty, a konwersje nie są mierzone — nie wiadomo, co przynosi zapytania.' },
    { waga: 'SZANSA', klasa: 'szansa', tresc: 'Przygotowanie oferty i przypomnienia do klientów odbywają się ręcznie. Ten proces można w większości zautomatyzować.' },
  ],
  wynikPodtytul: 'Nie dostajesz listy technicznych uwag. Dostajesz uporządkowane ustalenia — każde z wagą i z tym, co z nim zrobić.',
  podmiotWZastrzezeniu: 'firmy',
  skutekDlaKogo: 'dla firmy i dla klienta',
  otrzymujesz: OTRZYMUJESZ,
  dowody: DOWODY,
  wspolpraca: [
    { n: '01', h: 'Pre-audyt', p: 'Bezpłatne sprawdzenie z zewnątrz i rozmowa. Mówię wprost, czy widzę coś, co warto naprawiać.' },
    { n: '02', h: 'Audyt Cyfrowy', p: 'Siedem obszarów, raport z priorytetami i rekomendacjami, omówienie wyników.' },
    { n: '03', h: 'Wdrożenie', p: 'Naprawiamy to, co wyszło w audycie. Zakres wynika z raportu, nie z gotowego cennika.' },
    { n: '04', h: 'Cyfrowa Opieka', p: 'Stała opieka nad cyfrową stroną firmy: pilnujemy, mierzymy, poprawiamy.' },
  ],
  cenaNazwa: 'Audyt Cyfrowy<br />Firmy',
  faq: [
    {
      q: 'Dla jakich firm jest ten audyt?',
      a: 'Dla małych i średnich firm, które mają już stronę i jakieś działania w internecie, ale nie mają pewności, czy to razem działa. Nie ma znaczenia branża — znaczenie ma to, czy klient trafia do Ciebie przez internet i czy da się to sprawdzić.',
    },
    {
      q: 'Czy to jest audyt RODO?',
      a: 'Nie. Sprawdzamy techniczną stronę ochrony danych: co zbierają Twoje formularze, dokąd to wędruje, jakie skrypty działają w tle i jak ustawione są cookies. To nie jest opinia prawna ani pełny audyt zgodności — tym zajmuje się nasza wyspecjalizowana marka moje-rodo i jeśli okaże się potrzebna, powiem to wprost w raporcie.',
    },
    {
      q: 'Czy to test bezpieczeństwa typu włamanie?',
      a: 'Nie. Robimy przegląd konfiguracji: certyfikat, nagłówki, aktualność oprogramowania, dostępy, kopie zapasowe. Nie próbujemy się włamywać do Twoich systemów i nie testujemy ich odporności na atak. To osobna usługa, która wymaga osobnej umowy i zgody na piśmie.',
    },
    {
      q: 'Mam agencję albo informatyka. Po co mi audyt?',
      a: 'Audyt nie jest przeciwko nim. Jest spojrzeniem z zewnątrz na całość — bo informatyk zwykle odpowiada za serwer, agencja za reklamy, a nikt za to, czy to wszystko razem prowadzi klienta do zapytania. Raport możesz przekazać swoim ludziom i zlecić naprawę im. Wielu klientów tak robi.',
    },
    {
      q: 'Czy po audycie muszę zlecić wam wdrożenie?',
      a: 'Nie. Raport jest Twój i możesz z nim zrobić, co chcesz — wdrożyć samodzielnie, zlecić komu innemu albo odłożyć. Nie ma tu żadnego zobowiązania, a rekomendacje piszemy tak, żeby dało się je wykonać bez nas.',
    },
    {
      q: 'Czym różni się bezpłatny pre-audyt od płatnego audytu?',
      a: 'Pre-audyt to szybkie spojrzenie z zewnątrz i rozmowa — sprawdzam, czy w ogóle jest o czym rozmawiać. Płatny audyt to przejście przez siedem obszarów, raport na piśmie z priorytetami i rekomendacjami oraz omówienie wyników. Pre-audyt jest bezpłatny i do niczego nie zobowiązuje.',
    },
  ],
  formularz: {
    naglowek: 'Zacznijmy od bezpłatnego pre-audytu',
    opis: 'Podaj stronę firmy. Najpierw sprawdzimy ją z zewnątrz i skontaktujemy się z Tobą. Jeśli pełny audyt nie będzie miał sensu — powiemy to wprost.',
    etykietaNazwy: 'Firma',
    podpowiedzNazwy: 'np. Zakład Usługowy Kowalski',
    podpowiedzWww: 'np. twojafirma.pl',
    podpowiedzEmail: 'kontakt@twojafirma.pl',
    cta: 'Sprawdź moją firmę →',
  },
  nazwaFormularza: 'audyt-firmy',
  metodaLeada: 'formularz-audyt-firmy',
  schemaNazwa: 'Audyt Cyfrowy Firmy',
  schemaOdbiorcy: 'Małe i średnie firmy',
};
