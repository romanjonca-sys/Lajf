/**
 * Teksty strony głównej w dwóch językach: PL (lajf.eu/) i EN (lajf.eu/en/).
 * Oferta ta sama: abonament 12 rat, 0 na start, płatność po akceptacji, potem strona na własność.
 * Ceny EN (decyzja Romana 13.11.2026): €99 netto/mc; po roku €25 albo €49/mc; rezerwacje od €169/mc.
 */
import { KARTKI, POROWNANIE, PYTANIA, REALIZACJE, W_CENIE, type Realizacja } from './glowna-tresc.ts';

export type Jezyk = 'pl' | 'en';

export class NieznanyJezykError extends Error {
  constructor(jezyk: string) {
    super(`Brak tekstów strony głównej dla języka: ${jezyk}`);
    this.name = 'NieznanyJezykError';
  }
}

export interface Teksty {
  band: string;
  menu: Array<[string, string]>;
  ctaRozmowa: string;
  ctaTelefon: string;
  ctaCena: string;
  menuAria: string;
  wiersze: string[][];
  cenaZnaki: [string, string];
  cenaSup: string[];
  naglowekAria: string;
  leadMocny: string;
  leadCena: string;
  leadReszta: string;
  notka: string;
  notkaMocna: string;
  scenaAria: string;
  fakty: Array<[string, string]>;
  realizacjeH: string;
  realizacjeP: string;
  wszystkie: string;
  kategorie: Record<string, string>;
  filtrAria: string;
  dziala: string;
  wkrotce: string;
  pokazWszystkie: string;
  realizacje: Realizacja[];
  cenaH: string;
  cenaP: string;
  miesiecznie: string;
  kwotaPrzed: string;
  kwota: string;
  kwotaPo: string;
  kwotaJednostka: string;
  os: Array<[string, string]>;
  suma: string;
  wCenie: string[];
  czytajPytania: string;
  alt: string;
  krokiH: string;
  krokiP: string;
  kroki: Array<[string, string, string]>;
  porH: string;
  porP: string;
  kolumny: [string, string, string];
  porownanie: Array<[string, string, string, string]>;
  pytaniaH: string;
  pytania: Array<{ q: string; a: string }>;
  osobaH: string;
  osobaEm: string;
  osobaP1: string;
  osobaP2: string;
  osobaSig: string;
  osobaAlt: string;
  kartki: Array<[string, string, string]>;
  kontaktH: string;
  kontaktP: string;
  kanaly: { zadzwon: string; napisz: string; whatsapp: string };
  formTelefon: string;
  formEmail: string;
  formEmailEm: string;
  formImie: string;
  formWww: string;
  opcjonalnie: string;
  pulapka: string;
  formFine: string;
  politykaLink: string;
  stopkaRobimy: string;
  stopkaUslugi: Array<[string, string]>;
  stopkaFirma: string;
  stopkaFirmaLinki: Array<[string, string, string?]>;
  dockCena: string;
}

const OPISY_EN: Record<string, string> = {
  'Pan Kolektor': 'Solar collector service',
  'R&L Serwis': 'Home, office and clinic cleaning',
  'Zdalna Księgowa': 'Accounting office for IT and e-commerce',
  'M-DENTAL': 'Dental clinic, Warsaw',
  'BEC Podcast': 'Business podcast, club and editorial panel',
  'Innova Biological': 'B2B site for a chemicals brand',
  aPPWR: 'App: EU packaging compliance declarations',
  'PPWR dla firm': 'Product site: EU packaging rules explained',
  'moje-rodo': 'GDPR compliance system for clinics',
  'Rejestr badania': 'Clinical study data app',
  'Siggy Davis': 'Jazz and soul singer, Berlin',
  'Iwona Węgrowska': 'Singer: concerts and booking',
  'Klaudia Pałka': 'Singer one-pager',
  'Układ Komediowy': 'Comedy group: site and tour dates',
  'Krzysztof Stanio': 'Theatre workshop',
  'Grzegorz Kapołka': 'Blues guitarist',
  'Dźwięk Dobry': 'Songwriting studio',
};

const PL: Teksty = {
  band: 'Strony w abonamencie · 0 zł na start · płacisz po akceptacji',
  menu: [['#realizacje', 'Realizacje'], ['#cena', 'Cena'], ['#jak-to-dziala', 'Jak to działa'], ['/poradnik/', 'Porady'], ['#pytania', 'Pytania']],
  ctaRozmowa: 'Umów rozmowę',
  ctaTelefon: 'Poproś o telefon',
  ctaCena: 'Zobacz, co w cenie',
  menuAria: 'Menu główne',
  wiersze: [['Strona', 'Twojej'], ['firmy.', 'Zrobiona'], ['i', 'prowadzona'], ['za', 'Ciebie.']],
  cenaZnaki: ['399', 'zł'],
  cenaSup: ['/mc', 'netto'],
  naglowekAria: 'Strona Twojej firmy. Zrobiona i prowadzona za Ciebie. 399 zł netto miesięcznie',
  leadMocny: 'Piszemy treści, projektujemy stronę, podpinamy domenę i pocztę. Potem dbamy, żeby działała.',
  leadCena: '0 zł na start.',
  leadReszta: 'Płacisz dopiero za gotową, zaakceptowaną stronę, a po 12 ratach jest Twoja.',
  notka: 'Odpowiadamy w ciągu dnia roboczego',
  notkaMocna: 'Masz już stronę? Przeniesiemy domenę i pocztę.',
  scenaAria: 'Strony klientów Lajf na ekranach laptopów',
  fakty: [['0 zł', 'na start. Bez opłaty wdrożeniowej.'], ['2–4 tyg.', 'od rozmowy do strony gotowej do akceptacji.'], ['12 ×', 'rat miesięcznych, dopiero po akceptacji.'], ['Twoja', 'po roku: pliki, domena i treści.']],
  realizacjeH: 'Strony, które zrobiliśmy i prowadzimy',
  realizacjeP: 'Firmy usługowe, gabinety, artyści. Strony oznaczone „Działa” możesz otworzyć i sprawdzić sam.',
  wszystkie: 'Wszystkie',
  kategorie: { uslugi: 'Usługi', firmy: 'Firmy i aplikacje', kultura: 'Artyści i kultura' },
  filtrAria: 'Filtruj realizacje',
  dziala: 'Działa',
  wkrotce: 'Wkrótce',
  pokazWszystkie: 'Pokaż wszystkie',
  realizacje: REALIZACJE,
  cenaH: 'Jeden plan. Wszystko w cenie.',
  cenaP: 'Bez rachunków za serwer, odnawiania wtyczek i szukania informatyka. Jedna faktura co miesiąc obejmuje stronę i ludzi, którzy o nią dbają.',
  miesiecznie: 'Miesięcznie, netto',
  kwotaPrzed: '',
  kwota: '399',
  kwotaPo: ' zł',
  kwotaJednostka: '/ mc netto',
  os: [['Krok 1', 'Akceptujesz stronę'], ['Miesiące 1–12', '12 rat'], ['Miesiąc 13', 'Strona jest Twoja']],
  suma: 'Łącznie za pierwszy rok: <strong>4 788 zł netto</strong>. Rezygnujesz wcześniej? Spłacasz pozostałe raty i strona od razu jest Twoja. Po roku: utrzymanie <strong>99 zł/mc</strong>, utrzymanie ze zmianami treści <strong>199 zł/mc</strong> albo zabierasz pliki i domenę.',
  wCenie: W_CENIE,
  czytajPytania: 'Przeczytaj pytania',
  alt: 'Potrzebujesz rezerwacji albo płatności online? Ten sam model od 679 zł/mc. Wolisz zapłacić raz? Wizytówka 2 490 zł netto. Szczegóły na stronie <a href="/strony-www/">Strony WWW</a>.',
  krokiH: 'Od rozmowy do działającej strony',
  krokiP: 'Twojego czasu zajmie to łącznie około dwóch godzin. Resztę robimy my.',
  kroki: [
    ['Rozmowa 15 minut', 'Pytamy, czym się zajmujesz, kim są Twoi klienci i co strona ma przynosić: telefony, rezerwacje czy zapytania.', 'Dzień 1'],
    ['Piszemy i budujemy', 'Treści, projekt, domena, poczta i wizytówka Google. Oglądasz jedną gotową stronę, a nie stos szkiców.', 'Tygodnie 1–4'],
    ['Akceptujesz, strona rusza', 'Dopiero od tej chwili płacisz. Zmiana później? Wysyłasz maila. Do godziny zmian w miesiącu jest w cenie.', 'Potem co miesiąc'],
  ],
  porH: 'Dlaczego nie kreator albo agencja?',
  porP: 'Jedno i drugie działa. Tylko zostawia na Twojej głowie inne rzeczy.',
  kolumny: ['Kreator (Wix itp.)', 'Agencja', 'Lajf'],
  porownanie: POROWNANIE,
  pytaniaH: 'Pytania przed podpisaniem',
  pytania: PYTANIA,
  osobaH: 'Rozmawiasz z człowiekiem.',
  osobaEm: 'Umowę masz z firmą.',
  osobaP1: '<strong>Roman Jońca</strong>, założyciel Lajf. Pianista i producent muzyczny po Akademii Muzycznej w Katowicach. Dziś buduje strony i aplikacje dla firm.',
  osobaP2: 'Muzyka nauczyła go jednej zasady: słuchacz ma załapać w pierwszych taktach. Twój klient ma zrozumieć Twoją stronę w pierwszych pięciu sekundach.',
  osobaSig: 'Oddzwania osobiście',
  osobaAlt: 'Roman Jońca, założyciel Lajf',
  kartki: KARTKI,
  kontaktH: 'Porozmawiajmy o Twojej stronie',
  kontaktP: 'Zostaw numer. Roman zadzwoni w ciągu dnia roboczego. W 15 minut ustalicie, czy ten plan pasuje do Twojej firmy.',
  kanaly: { zadzwon: 'Zadzwoń', napisz: 'Napisz', whatsapp: 'Napisz na WhatsAppie' },
  formTelefon: 'Telefon',
  formEmail: 'E-mail',
  formEmailEm: 'opcjonalnie, wyślemy potwierdzenie',
  formImie: 'Imię',
  formWww: 'Obecna strona',
  opcjonalnie: 'opcjonalnie',
  pulapka: 'Nie wypełniaj',
  formFine: 'Dane wykorzystamy tylko do odpowiedzi. Więcej w',
  politykaLink: 'polityce prywatności',
  stopkaRobimy: 'Robimy też',
  stopkaUslugi: [['/strony-www/', 'Strony WWW: wszystkie pakiety'], ['/audyt-firmy/', 'Audyt cyfrowy firmy'], ['/oprogramowanie/', 'Oprogramowanie'], ['/rodo-i-cyber/', 'Bezpieczeństwo i dane'], ['/biura-rachunkowe/', 'Dla biur rachunkowych'], ['/muzyka/', 'Muzyka']],
  stopkaFirma: 'Firma',
  stopkaFirmaLinki: [['/poradnik/', 'Porady'], ['/polityka-prywatnosci/', 'Polityka prywatności'], ['/regulamin/', 'Regulamin'], ['/en/', 'English', 'en']],
  dockCena: 'Cena',
};

const EN: Teksty = {
  band: 'Websites on subscription · €0 upfront · pay after you approve',
  menu: [['#realizacje', 'Work'], ['#cena', 'Pricing'], ['#jak-to-dziala', 'How it works'], ['#pytania', 'FAQ']],
  ctaRozmowa: 'Book a call',
  ctaTelefon: 'Request a call',
  ctaCena: "See what's included",
  menuAria: 'Main menu',
  wiersze: [['Your', 'company'], ['website.', 'Built'], ['and', 'run'], ['for', 'you.']],
  cenaZnaki: ['€99', ''],
  cenaSup: ['/mo', 'net'],
  naglowekAria: 'Your company website. Built and run for you. €99 net per month',
  leadMocny: 'We write the copy, design the site, connect your domain and email. Then we keep it running.',
  leadCena: '€0 upfront.',
  leadReszta: 'You pay only for a finished site you have approved, and after 12 payments it is yours.',
  notka: 'Replies within one business day, in English',
  notkaMocna: 'Already have a site? We move your domain and email.',
  scenaAria: "Lajf clients' websites on laptop screens",
  fakty: [['€0', 'to start. No setup fee.'], ['2–4 wks', 'from first call to a site ready for your approval.'], ['12 ×', 'monthly payments, starting only after approval.'], ['Yours', 'after year one: files, domain and content.']],
  realizacjeH: 'Sites we built and still run',
  realizacjeP: 'Service businesses, clinics, artists. Sites marked “Live” are open for you to check. Case studies are in Polish.',
  wszystkie: 'All',
  kategorie: { uslugi: 'Services', firmy: 'Business & apps', kultura: 'Artists & culture' },
  filtrAria: 'Filter projects',
  dziala: 'Live',
  wkrotce: 'Soon',
  pokazWszystkie: 'Show all',
  realizacje: REALIZACJE.map((r) => ({ ...r, opis: OPISY_EN[r.nazwa] ?? r.opis })),
  cenaH: 'One plan. Everything included.',
  cenaP: 'No hosting bills, no plugin renewals, no freelancer to chase. One monthly invoice covers the site and the people who look after it.',
  miesiecznie: 'Per month, net',
  kwotaPrzed: '€',
  kwota: '99',
  kwotaPo: '',
  kwotaJednostka: '/ mo net',
  os: [['Step 1', 'You approve the site'], ['Months 1–12', '12 payments'], ['Month 13', 'The site is yours']],
  suma: 'First year in total: <strong>€1,188 net</strong>. Leaving early? Pay the remaining instalments and the site is yours right away. After year one: upkeep <strong>€25/mo</strong>, upkeep with content changes <strong>€49/mo</strong>, or take your files and domain.',
  wCenie: [
    'Website with copy written for you: usually 4–6 pages, up to 8',
    'Gallery of your work: send photos from your phone, we add them',
    'Domain registration and renewal',
    'Hosting, SSL and backups',
    'Business email on your domain',
    'Google Business Profile set up',
    'Visitor analytics (GA4)',
    'Up to 1 hour of changes every month',
    'Security updates and monitoring',
    'Privacy policy and cookie banner (GDPR)',
    'Enquiry alerts to your phone',
  ],
  czytajPytania: 'Read the FAQ',
  alt: 'Need bookings or online payments? Same model from €169/mo. Prefer to pay once? Ask for a fixed quote. Invoices in EUR from an EU company.',
  krokiH: 'From a call to a live site',
  krokiP: 'About two hours of your time in total. We do the rest.',
  kroki: [
    ['15-minute call', 'We ask what you do, who your customers are and what the site should bring you: calls, bookings or enquiries.', 'Day 1'],
    ['We write and build', 'Copy, design, domain, email and Google profile. You review one finished site, not a pile of drafts.', 'Weeks 1–4'],
    ['You approve, it goes live', 'Billing starts here. Need a change later? Send an email. Up to one hour of changes every month is included.', 'Then every month'],
  ],
  porH: 'Why not a builder or an agency?',
  porP: 'Both work. They just leave different jobs on your desk.',
  kolumny: ['DIY builder (Wix etc.)', 'Agency', 'Lajf'],
  porownanie: [
    ['Who writes the copy', 'You', 'Depends on contract', 'We do'],
    ['Upfront cost', '€0', '€3,000–10,000', '€0'],
    ['Changes after launch', 'You do them', 'Usually billed extra', '1 h/mo included'],
    ['Domain, email, Google', 'You set them up', 'Often not included', 'Included'],
    ['Who owns the site', 'Stays on the platform', 'You', 'You, after 12 months'],
  ],
  pytaniaH: 'Questions before you sign',
  pytania: [
    { q: 'How big will my site be?', a: 'As big as your business needs. Usually 4–6 pages: home, services, gallery of your work, about, contact. The plan covers up to 8. An online shop or bookings is a separate plan.' },
    { q: 'Is this renting a website?', a: 'No. You pay off the build in 12 instalments, with hosting and care included. After the 12th payment the site, its content and the domain are yours.' },
    { q: 'Am I locked in for a year?', a: 'The 12 months cover the cost of building your site, so the contract runs for 12 months. You pay nothing until you approve the finished site. Leaving early? Pay the remaining instalments and the site is yours right away.' },
    { q: 'What if I want changes?', a: 'Email us. Up to one hour of changes each month is included: prices, photos, opening hours, a new service. Larger work, like a new section, gets a fixed quote first.' },
    { q: 'What happens after 12 months?', a: 'Choose: upkeep €25/mo (hosting, backups, updates), upkeep with content changes €49/mo, or take your files and domain anywhere. We help with the handover at no cost.' },
    { q: 'I already have a site and a domain.', a: 'We move your domain and email for you. We plan the switch so your email keeps working during the move and the old site stays up until the new one launches.' },
    { q: 'Do you work outside Poland?', a: 'Yes. Lajf sp. z o.o. is an EU company. We work in English and invoice in EUR. Calls are scheduled in your time zone.' },
  ],
  osobaH: 'You talk to a person.',
  osobaEm: 'Your contract is with a company.',
  osobaP1: '<strong>Roman Jońca</strong>, founder of Lajf. Pianist and music producer, graduate of the Academy of Music in Katowice. Today he builds websites and apps for businesses.',
  osobaP2: 'Music taught him one rule: the listener has to get it in the first few bars. Your customer has to get your site in the first five seconds.',
  osobaSig: 'Calls you back himself',
  osobaAlt: 'Roman Jońca, founder of Lajf',
  kartki: [
    ['✎', 'Site change · done', 'New opening hours from Monday'],
    ['✉', 'New enquiry from the form', 'A customer asks for a call about a quote'],
    ['↺', 'Backup · 03:00', 'All good, nothing for you to do'],
    ['▲', 'Security update', 'Installed overnight, the site stays up'],
  ],
  kontaktH: "Let's talk about your site",
  kontaktP: 'Leave your number. Roman calls you within one business day. In 15 minutes you will know whether this plan fits your business.',
  kanaly: { zadzwon: 'Call', napisz: 'Email', whatsapp: 'Message on WhatsApp' },
  formTelefon: 'Phone',
  formEmail: 'Email',
  formEmailEm: 'optional, we send a confirmation',
  formImie: 'Name',
  formWww: 'Current website',
  opcjonalnie: 'optional',
  pulapka: 'Leave empty',
  formFine: 'We use your details only to reply. More in our',
  politykaLink: 'privacy policy',
  stopkaRobimy: 'We also do',
  stopkaUslugi: [['/en/systems/', 'Custom business software'], ['/', 'Polish site: all services']],
  stopkaFirma: 'Company',
  stopkaFirmaLinki: [['/polityka-prywatnosci/', 'Privacy policy (PL)'], ['/regulamin/', 'Terms (PL)'], ['/', 'Polski', 'pl']],
  dockCena: 'Pricing',
};

const TEKSTY: Record<Jezyk, Teksty> = { pl: PL, en: EN };

export function teksty(jezyk: string): Teksty {
  if (jezyk !== 'pl' && jezyk !== 'en') throw new NieznanyJezykError(jezyk);
  return TEKSTY[jezyk];
}
