/**
 * Treść /llms.txt w formacie llmstxt.org: kim jest Lajf, usługi i poradnik, w Markdownie dla modeli językowych.
 * Artykuły dochodzą z listy poradnika, więc plik nie rozjedzie się z tym, co jest na stronie.
 */
import { sciezkaArtykulu } from './artykuly.ts';
import type { Artykul } from './artykuly.ts';

export interface DaneLlmsTxt {
  siteHref: string;
  legalName: string;
  email: string;
  phone: string;
  artykuly: Artykul[];
}

interface Odnosnik {
  nazwa: string;
  sciezka: string;
  opis: string;
}

const USLUGI: Odnosnik[] = [
  {
    nazwa: 'Audyt Cyfrowy Placówki Medycznej',
    sciezka: '/audyt-placowki-medycznej/',
    opis: 'strona WWW, widoczność w Google, analityka, bezpieczeństwo, formularze i dane, ścieżka pacjenta oraz procesy placówki. 1490 zł netto.',
  },
  {
    nazwa: 'Audyt Cyfrowy Firmy',
    sciezka: '/audyt-firmy/',
    opis: 'ten sam zakres dla małych i średnich firm, razem z marketingiem i pozyskiwaniem klientów. 1490 zł netto.',
  },
  {
    nazwa: 'Strony WWW',
    sciezka: '/strony-www/',
    opis: 'strona z treścią, SEO, firmową pocztą i wizytówką Google w abonamencie 399 zł netto miesięcznie, bez opłaty za wykonanie.',
  },
  {
    nazwa: 'Strona www dla lekarza',
    sciezka: '/strona-www-dla-lekarza/',
    opis: 'strona dla praktyki lekarskiej i gabinetu zgodna z RODO, w tym samym abonamencie.',
  },
  {
    nazwa: 'Bezpieczeństwo i dane',
    sciezka: '/rodo-i-cyber/',
    opis: 'strony dla gabinetów i przychodni projektowane pod ochronę danych pacjentów.',
  },
  {
    nazwa: 'Oprogramowanie na miarę',
    sciezka: '/oprogramowanie/',
    opis: 'aplikacje webowe, panele, płatności online i integracje.',
  },
];

const INFORMACJE: Odnosnik[] = [
  { nazwa: 'Polityka prywatności', sciezka: '/polityka-prywatnosci/', opis: 'zasady przetwarzania danych osobowych.' },
  { nazwa: 'Regulamin', sciezka: '/regulamin/', opis: 'warunki świadczenia usług.' },
];

function linia(siteHref: string, odnosnik: Odnosnik): string {
  return `- [${odnosnik.nazwa}](${new URL(odnosnik.sciezka, siteHref).href}): ${odnosnik.opis}`;
}

export function zbudujLlmsTxt(dane: DaneLlmsTxt): string {
  const { siteHref } = dane;
  const poradnik = dane.artykuly.map((a) =>
    linia(siteHref, { nazwa: `${a.h1} ${a.h1hl}`, sciezka: sciezkaArtykulu(a.slug), opis: a.description }),
  );

  return [
    '# Lajf',
    '',
    `> ${dane.legalName} z Jaworzna prowadzi cyfrową opiekę nad małymi firmami i prywatnymi placówkami medycznymi. Robi audyty cyfrowe, strony WWW, analitykę zgodną z RODO, zabezpieczenia techniczne, automatyzacje i oprogramowanie na zamówienie.`,
    '',
    `Kontakt: ${dane.email}, ${dane.phone}.`,
    '',
    '## Usługi',
    '',
    ...USLUGI.map((u) => linia(siteHref, u)),
    '',
    '## Poradnik dla gabinetów',
    '',
    linia(siteHref, { nazwa: 'Spis poradnika', sciezka: '/poradnik/', opis: 'wszystkie artykuły.' }),
    ...poradnik,
    '',
    '## Informacje',
    '',
    ...INFORMACJE.map((i) => linia(siteHref, i)),
    '',
  ].join('\n');
}
