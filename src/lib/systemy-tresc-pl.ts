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
      naglowek: 'Pierwszego dnia masz fundament',
      tekst:
        'Logowanie, role i uprawnienia, rozdział danych między firmami, historia zmian przy każdym rekordzie, eksport i wyszukiwanie. To jest punkt startu, nie efekt trzech miesięcy pracy.',
    },
    {
      naglowek: 'Pola definiujesz sam',
      tekst:
        'Twoja ewidencja ma pola, których potrzebujesz Ty, a nie te, które ktoś wymyślił dla innej branży. Dołożenie kolejnego nie wymaga przepisywania systemu.',
    },
    {
      naglowek: 'Rośnie razem z firmą',
      tekst:
        'Zaczynasz od jednego procesu. Kolejne dokładamy wtedy, gdy są potrzebne, na tym samym fundamencie i bez migracji danych na nowy system.',
    },
    {
      naglowek: 'Wychodzisz z tego, co masz',
      tekst:
        'Dane wjeżdżają z arkuszy, które już prowadzicie. Nikt nie przepisuje ręcznie dwóch tysięcy pozycji, żeby zacząć korzystać z nowego narzędzia.',
    },
  ],

  etykietaKatalog: 'Co składamy',
  naglowekKatalog: 'Dziewięć rzeczy, które firmy zamawiają najczęściej',
  wstepKatalog:
    'Zwykle zaczyna się od jednej pozycji z tej listy. Reszta dokłada się później, gdy pierwsza zaczyna zarabiać na siebie.',
  katalog: [
    {
      naglowek: 'Rejestry i ewidencje',
      tekst:
        'Jedno miejsce zamiast siedmiu arkuszy krążących mailem. Pola ustawiasz pod siebie, a każda zmiana ma autora i datę.',
    },
    {
      naglowek: 'Obieg i akceptacje',
      tekst:
        'Dokument nie idzie dalej, dopóki ktoś go nie zatwierdzi. System pamięta, kto i kiedy, więc nikt nie szuka tego w skrzynce.',
    },
    {
      naglowek: 'Portal dla Twoich klientów',
      tekst:
        'Klienci logują się na własne konta, widzą wyłącznie swoje sprawy i sami uzupełniają braki: wgrywają dokumenty i wpisują dane. Ty weryfikujesz i zatwierdzasz.',
    },
    {
      naglowek: 'Kontakty i historia współpracy',
      tekst:
        'Firmy, osoby, zadania i terminy w jednym miejscu. Korespondencja wpięta przy sprawie, a nie w prywatnej skrzynce pracownika, który akurat jest na urlopie.',
    },
    {
      naglowek: 'Oferty, zamówienia, magazyn',
      tekst:
        'Od wyceny po wydanie towaru. Stany, przyjęcia i inwentaryzacja, jeśli prowadzisz magazyn.',
    },
    {
      naglowek: 'Reklamacje i zgłoszenia',
      tekst:
        'Zgłoszenie dostaje numer, status i termin. Widać, co utknęło i u kogo, zamiast wątku mailowego na czterdzieści wiadomości.',
    },
    {
      naglowek: 'Planowanie pracy',
      tekst:
        'Kto, kiedy, czym i na jakim zasobie. Grafik, który widzą wszyscy, zamiast tablicy w biurze i telefonów do koordynatora.',
    },
    {
      naglowek: 'Import tego, co już masz',
      tekst:
        'Excel wjeżdża do systemu. Dane z innych narzędzi też, jeśli dało się je wyeksportować.',
    },
    {
      naglowek: 'Integracje i API',
      tekst:
        'System rozmawia z tym, czego już używacie, i powiadamia o zmianach. Jeśli ktoś u Was pisze własne narzędzia, dostaje dostęp do danych.',
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
