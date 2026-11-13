/**
 * Treść strony głównej lajf.eu (od 13.11.2026): jedna oferta, strony WWW w abonamencie.
 * Warunki abonamentu muszą zgadzać się z umową wzorcową i z /strony-www/:
 * 399 zł netto/mc, 0 zł na start, płatność po akceptacji, 12 rat, potem strona na własność,
 * do 8 podstron, 1 h zmian/mc, po roku 99 zł/mc utrzymanie albo 199 zł/mc ze zmianami.
 */

export type KategoriaRealizacji = 'uslugi' | 'firmy' | 'kultura';

export interface Realizacja {
  kategoria: KategoriaRealizacji;
  nazwa: string;
  obraz: string;
  /** Opis realizacji na lajf.eu albo zewnętrzny adres; null = strona jeszcze niepubliczna. */
  href: string | null;
  opis: string;
}

export class NieznanaKategoriaError extends Error {
  constructor(kategoria: string) {
    super(`Nieznana kategoria realizacji: ${kategoria}`);
    this.name = 'NieznanaKategoriaError';
  }
}

export const KATEGORIE_REALIZACJI: Record<KategoriaRealizacji, string> = {
  uslugi: 'Usługi',
  firmy: 'Firmy i aplikacje',
  kultura: 'Artyści i kultura',
};

export const REALIZACJE: Realizacja[] = [
  { kategoria: 'uslugi', nazwa: 'Pan Kolektor', obraz: '/images/realizacje/pankolektor.jpg', href: '/realizacje/pan-kolektor/', opis: 'Serwis kolektorów słonecznych' },
  { kategoria: 'uslugi', nazwa: 'R&L Serwis', obraz: '/images/realizacje/rlserwis.jpg', href: '/realizacje/rl-serwis/', opis: 'Sprzątanie domów, biur i gabinetów' },
  { kategoria: 'uslugi', nazwa: 'Zdalna Księgowa', obraz: '/images/realizacje/zdalnaksiegowa.jpg', href: '/realizacje/zdalna-ksiegowa/', opis: 'Biuro rachunkowe dla IT i e-commerce' },
  { kategoria: 'uslugi', nazwa: 'M-DENTAL', obraz: '/images/glowna/mdental.jpg', href: null, opis: 'Przychodnia stomatologiczna, Warszawa' },
  { kategoria: 'firmy', nazwa: 'BEC Podcast', obraz: '/images/glowna/bec.jpg', href: null, opis: 'Podcast firmowy, klub i panel redakcyjny' },
  { kategoria: 'firmy', nazwa: 'Innova Biological', obraz: '/images/realizacje/innova.jpg', href: 'https://innova-biological.pages.dev', opis: 'Strona B2B marki chemicznej' },
  { kategoria: 'firmy', nazwa: 'PPWR dla firm', obraz: '/images/realizacje/ppwrdlafirm.jpg', href: '/realizacje/ppwr-dla-firm/', opis: 'Dokumentacja opakowaniowa dla producentów' },
  { kategoria: 'firmy', nazwa: 'moje-rodo', obraz: '/images/realizacje/moje-rodo.jpg', href: '/realizacje/moje-rodo/', opis: 'System zgodności RODO dla medycyny' },
  { kategoria: 'firmy', nazwa: 'Rejestr badania', obraz: '/images/realizacje/rejestr-badania.jpg', href: '/realizacje/rejestr-badania-klinicznego/', opis: 'Aplikacja do badania klinicznego' },
  { kategoria: 'kultura', nazwa: 'Siggy Davis', obraz: '/images/glowna/siggi.jpg', href: null, opis: 'Wokalistka jazz i soul, Berlin' },
  { kategoria: 'kultura', nazwa: 'Iwona Węgrowska', obraz: '/images/realizacje/iwonawegrowska.jpg', href: '/realizacje/strona-wokalistki-iwona-wegrowska/', opis: 'Wokalistka: koncerty i booking' },
  { kategoria: 'kultura', nazwa: 'Klaudia Pałka', obraz: '/images/realizacje/klaudia.jpg', href: '/realizacje/klaudia-palka/', opis: 'One-pager wokalistki' },
  { kategoria: 'kultura', nazwa: 'Układ Komediowy', obraz: '/images/realizacje/uklad.jpg', href: '/realizacje/uklad-komediowy/', opis: 'Kabaret: strona i terminarz' },
  { kategoria: 'kultura', nazwa: 'Krzysztof Stanio', obraz: '/images/realizacje/stanio.jpg', href: '/realizacje/krzysztof-stanio/', opis: 'Pracownia praktyk teatralnych' },
  { kategoria: 'kultura', nazwa: 'Grzegorz Kapołka', obraz: '/images/realizacje/kapolka.jpg', href: 'https://kapolka-web.pages.dev', opis: 'Bluesowy gitarzysta' },
  { kategoria: 'kultura', nazwa: 'Dźwięk Dobry', obraz: '/images/realizacje/dzwiek.jpg', href: '/realizacje/dzwiek-dobry/', opis: 'Studio pisania piosenek' },
];

/** Trzy duże kadry na górze sekcji: firmy usługowe na tym samym planie co klient. */
export const WYROZNIONE = ['Pan Kolektor', 'R&L Serwis', 'Zdalna Księgowa'];

export function realizacjeKategorii(kategoria: string): Realizacja[] {
  if (!(kategoria in KATEGORIE_REALIZACJI)) throw new NieznanaKategoriaError(kategoria);
  return REALIZACJE.filter((r) => r.kategoria === kategoria);
}

export const W_CENIE = [
  'Strona z napisanymi za Ciebie treściami: zwykle 4–6 podstron, do 8',
  'Galeria Twoich realizacji: przysyłasz zdjęcia z telefonu, my je dodajemy',
  'Domena: rejestracja i odnowienia',
  'Serwer, SSL i kopie zapasowe',
  'Poczta firmowa w Twojej domenie',
  'Wizytówka Google założona i uzupełniona',
  'Statystyki odwiedzin (GA4)',
  'Do 1 godziny zmian w każdym miesiącu',
  'Aktualizacje bezpieczeństwa i monitoring',
  'Polityka prywatności i baner cookies (RODO)',
  'Powiadomienia o zapytaniach na telefon',
];

/** [cecha, kreator, agencja, Lajf] */
export const POROWNANIE: Array<[string, string, string, string]> = [
  ['Kto pisze treści', 'Ty', 'Zależy od umowy', 'My'],
  ['Koszt na start', '0 zł', '5–15 tys. zł', '0 zł'],
  ['Zmiany po starcie', 'Robisz sam', 'Płatne za każdą', '1 h/mc w cenie'],
  ['Domena, poczta, Google', 'Konfigurujesz sam', 'Zwykle poza ofertą', 'W cenie'],
  ['Czyja jest strona', 'Platformy', 'Twoja', 'Twoja po 12 mc'],
];

export const PYTANIA: Array<{ q: string; a: string }> = [
  { q: 'Jak duża będzie moja strona?', a: 'Tyle podstron, ile potrzebuje Twoja firma. Zwykle 4–6: start, usługi, galeria realizacji, o firmie, kontakt. W abonamencie mieści się do 8. Sklep albo rezerwacje online to osobny pakiet.' },
  { q: 'Czy to wynajem strony?', a: 'Nie. Spłacasz wykonanie w 12 ratach, a serwer i opieka są w cenie. Po 12. racie strona, treści i domena są Twoje.' },
  { q: 'Czy jestem uwiązany na rok?', a: '12 miesięcy pokrywa koszt wykonania strony, więc umowa trwa 12 miesięcy. Nic nie płacisz, dopóki nie zaakceptujesz gotowej strony. Rezygnujesz wcześniej? Spłacasz pozostałe raty i strona od razu jest Twoja.' },
  { q: 'A jak będę chciał coś zmienić?', a: 'Piszesz maila. Do godziny zmian w miesiącu jest w cenie: ceny, zdjęcia, godziny otwarcia, nowa usługa. Większe prace, np. nowa sekcja, wyceniamy z góry.' },
  { q: 'Co po 12 miesiącach?', a: 'Wybierasz: utrzymanie 99 zł/mc (serwer, kopie, aktualizacje), utrzymanie ze zmianami treści 199 zł/mc albo zabierasz pliki i domenę. Przy przeniesieniu pomagamy bezpłatnie.' },
  { q: 'Mam już stronę i domenę.', a: 'Przenosimy domenę i pocztę za Ciebie, tak żeby działały bez przerwy.' },
  { q: 'Kim jesteście?', a: 'Lajf sp. z o.o., spółka z KRS z Jaworzna. Robimy strony i aplikacje dla firm usługowych, gabinetów i artystów. Faktura VAT.' },
];

/** Linie statusu w „budującej się” stronie w hero. Dwie ostatnie: akceptacja i działanie. */
export const STATUS_BUDOWY = [
  'Piszemy treści o serwisie kolektorów…',
  'Projektujemy najpierw pod telefon…',
  'Podpinamy pankolektor.pl i pocztę…',
  'Zakładamy wizytówkę Google…',
  'Gotowe do Twojej akceptacji ✓',
  'Działa · zapytania lecą na Twój telefon',
];

/** Kartka pod dłońmi w sekcji „o mnie”: co dzieje się ze stroną klienta w zwykłym miesiącu. */
export const KARTKI: Array<[string, string, string]> = [
  ['✎', 'Zmiana na stronie · zrobione', 'Nowe godziny otwarcia od poniedziałku'],
  ['✉', 'Nowe zapytanie z formularza', 'Klient prosi o telefon w sprawie wyceny'],
  ['↺', 'Kopia zapasowa · 03:00', 'Wszystko działa, nic nie musisz robić'],
  ['▲', 'Aktualizacja bezpieczeństwa', 'Wgrana w nocy, bez przerwy w działaniu'],
];
