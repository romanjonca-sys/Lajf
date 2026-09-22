/**
 * Polska treść strony o systemach dla firm (`/oprogramowanie/`).
 * Zasady redakcyjne i typy: `systemy-tresc.ts`.
 */

import type { TrescSystemow } from './systemy-tresc';

export const PL: TrescSystemow = {
  title: 'Systemy dla firm — rejestry, obiegi, portale klienta | Lajf',
  description:
    'Składamy system pod Twój proces z gotowych części, zamiast pisać go od zera. Rejestry, obiegi akceptacji, portal dla klientów, magazyn, integracje. Pierwsza działająca wersja w tygodniach.',
  etykietaHero: 'Systemy i narzędzia dla firm',
  naglowekHero: 'Twoja firma działa na arkuszach, mailach',
  naglowekHeroAkcent: 'i pamięci trzech osób',
  lead:
    'Nie sprzedajemy pudełka, do którego trzeba się dopasować, ani projektu pisanego od zera przez pół roku. Mamy zbudowany system, z którego składamy narzędzie pod Twój proces. Pierwsza wersja, której da się używać, powstaje w tygodniach.',
  ctaHero: 'Opowiedz, co Cię boli →',

  etykietaPodejscie: 'Dlaczego szybciej',
  naglowekPodejscie: 'Nie zaczynamy od pustego pliku',
  wstepPodejscie:
    'Większość czasu w projektach informatycznych zjada budowanie rzeczy, których klient nawet nie widzi: logowania, uprawnień, historii zmian, eksportu. My mamy to gotowe, więc pracę zaczynamy od Twojego procesu.',
  filaryPodejscia: [
    {
      ikona: 'fundament',
      naglowek: 'Fundament od pierwszego dnia',
      tekst: 'Logowanie, role, historia zmian i eksport są na starcie, nie po trzech miesiącach.',
    },
    {
      ikona: 'pola',
      naglowek: 'Pola definiujesz sam',
      tekst: 'Ewidencja ma Twoje pola, nie te wymyślone dla innej branży. Kolejne dokładasz bez przebudowy.',
    },
    {
      ikona: 'rosnie',
      naglowek: 'Rośnie razem z firmą',
      tekst: 'Kolejne procesy dokładamy na tym samym fundamencie, bez migracji na nowy system.',
    },
    {
      ikona: 'start',
      naglowek: 'Start z Twoich danych',
      tekst: 'Arkusze, które już prowadzicie, wjeżdżają do systemu. Nikt nie przepisuje ich ręcznie.',
    },
  ],

  etykietaKatalog: 'Co składamy',
  naglowekKatalog: 'Dziewięć rzeczy, które firmy zamawiają najczęściej',
  wstepKatalog:
    'Zwykle zaczyna się od jednej pozycji z tej listy. Reszta dokłada się później, gdy pierwsza zaczyna zarabiać na siebie.',
  katalog: [
    {
      ikona: 'rejestr',
      naglowek: 'Rejestry i ewidencje',
      tekst: 'Jedno miejsce zamiast siedmiu arkuszy krążących mailem. Każda zmiana ma autora i datę.',
    },
    {
      ikona: 'obieg',
      naglowek: 'Obieg i akceptacje',
      tekst: 'Dokument nie idzie dalej, dopóki ktoś go nie zatwierdzi. System pamięta kto i kiedy.',
    },
    {
      ikona: 'portal',
      naglowek: 'Portal dla Twoich klientów',
      tekst: 'Widzą wyłącznie swoje sprawy i sami uzupełniają braki. Ty weryfikujesz i zatwierdzasz.',
    },
    {
      ikona: 'kontakty',
      naglowek: 'Kontakty i historia',
      tekst: 'Firmy, osoby, zadania i terminy razem. Korespondencja przy sprawie, nie w cudzej skrzynce.',
    },
    {
      ikona: 'magazyn',
      naglowek: 'Oferty, zamówienia, magazyn',
      tekst: 'Od wyceny po wydanie towaru. Stany, przyjęcia i inwentaryzacja, jeśli masz magazyn.',
    },
    {
      ikona: 'zgloszenia',
      naglowek: 'Reklamacje i zgłoszenia',
      tekst: 'Numer, status i termin zamiast wątku mailowego. Widać, co utknęło i u kogo.',
    },
    {
      ikona: 'planowanie',
      naglowek: 'Planowanie pracy',
      tekst: 'Kto, kiedy i na jakim zasobie. Grafik widoczny dla wszystkich, nie tablica w biurze.',
    },
    {
      ikona: 'import',
      naglowek: 'Import tego, co już masz',
      tekst: 'Excel wjeżdża do systemu. Dane z innych narzędzi też, jeśli da się je wyeksportować.',
    },
    {
      ikona: 'integracje',
      naglowek: 'Integracje i API',
      tekst: 'System rozmawia z tym, czego już używacie, i powiadamia o zmianach.',
    },
  ],

  etykietaPoziomy: 'Od czego zacząć',
  naglowekPoziomy: 'Trzy wielkości, nie jeden wielki projekt',
  wstepPoziomy:
    'Najgorszy możliwy start to system, który ma zrobić wszystko naraz. Zaczynamy od jednej rzeczy, która realnie uwiera, i sprawdzamy, czy pomaga.',
  poziomy: [
    {
      numer: '01',
      naglowek: 'Jeden proces z arkusza',
      tekst:
        'Bierzemy najbardziej uciążliwą ewidencję i przenosimy ją do systemu razem z uprawnieniami i historią zmian. Krótkie wdrożenie, po którym widać, czy to działa u Was.',
    },
    {
      numer: '02',
      naglowek: 'Kilka połączonych procesów',
      tekst:
        'Do ewidencji dochodzi obieg akceptacji, powiadomienia i raporty, a dane przestają być przepisywane między działami.',
    },
    {
      numer: '03',
      naglowek: 'System, na którym stoi firma',
      tekst:
        'Portal dla klientów, integracje z tym, czego już używacie, i stała opieka. Na tym etapie system jest miejscem pracy, nie dodatkiem do niej.',
    },
  ],

  etykietaDowod: 'Dowód',
  naglowekDowod: 'To są działające wdrożenia, nie makiety',
  wstepDowod:
    'Systemy, które prowadzą realne dane realnych firm i placówek, razem z uprawnieniami, historią zmian i dokumentami.',
  realizacje: [
    {
      tytul: 'Rejestr badania klinicznego',
      opis: 'Dane pacjentów, obliczenia kliniczne, kopie zapasowe w Unii Europejskiej.',
      tag: 'rejestr · medycyna',
      href: '/realizacje/rejestr-badania-klinicznego/',
    },
    {
      tytul: 'moje-rodo',
      opis: 'System zgodności dla placówek medycznych, z płatnościami i generowaniem dokumentów.',
      tag: 'SaaS · zgodność',
      href: 'https://moje-rodo.pl',
    },
    {
      tytul: 'System dla przemysłu',
      opis: 'Ewidencja opakowań, generowanie dokumentacji i portal, w którym klient sam domyka braki.',
      tag: 'system · portal klienta',
      href: '/#kontakt',
    },
  ],

  naglowekCta: 'Powiedz, co dziś zajmuje najwięcej czasu',
  tekstCta:
    'Opisz jeden proces, który najbardziej uwiera. Odpowiem, czy da się go sensownie przenieść do systemu, a jeśli nie, powiem to wprost.',
  przyciskCta: 'Porozmawiajmy →',
  hrefKontakt: '/#kontakt',
};
