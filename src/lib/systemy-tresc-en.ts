/**
 * Angielska treść strony o systemach dla firm (`/en/systems/`).
 * Zasady redakcyjne i typy: `systemy-tresc.ts`.
 */

import type { TrescSystemow } from './systemy-tresc';

export const EN: TrescSystemow = {
  title: 'Business systems — registries, approvals, client portals | Lajf',
  description:
    'We assemble a system around your process from parts we have already built, instead of writing one from scratch. Registries, approval flows, client portals, stock, integrations. First working version in weeks.',
  etykietaHero: 'Systems and internal tools',
  naglowekHero: 'Your company runs on spreadsheets, email',
  naglowekHeroAkcent: 'and what three people remember',
  lead:
    'We do not sell a box you have to bend your company around, and we do not write a system from scratch over six months. We have the engine built, so we assemble a tool around your process. The first version you can actually use takes weeks.',
  ctaHero: 'Tell us what hurts →',

  etykietaPodejscie: 'Why it is faster',
  naglowekPodejscie: 'We do not start from an empty file',
  wstepPodejscie:
    'Most of the time in software projects goes into things a client never sees: logins, permissions, change history, exports. We have that part built, so the work starts at your process instead.',
  filaryPodejscia: [
    {
      ikona: 'fundament',
      naglowek: 'Foundation on day one',
      tekst: 'Logins, roles, change history and export are the starting point, not a three-month build.',
    },
    {
      ikona: 'pola',
      naglowek: 'You define the fields',
      tekst: 'Your fields, not ones designed for another industry. Adding more means no rewrite.',
    },
    {
      ikona: 'rosnie',
      naglowek: 'It grows with the company',
      tekst: 'Further processes sit on the same foundation, with no migration to a different system.',
    },
    {
      ikona: 'start',
      naglowek: 'Starts from your data',
      tekst: 'The spreadsheets you already keep are imported. Nobody retypes them by hand.',
    },
  ],

  etykietaKatalog: 'What we assemble',
  naglowekKatalog: 'The nine things companies ask for most',
  wstepKatalog:
    'It usually starts with one item from this list. The rest follows later, once the first one has started paying for itself.',
  katalog: [
    {
      ikona: 'rejestr',
      naglowek: 'Registries and records',
      tekst: 'One place instead of seven spreadsheets. Every change carries an author and a date.',
    },
    {
      ikona: 'obieg',
      naglowek: 'Approval flows',
      tekst: 'Nothing moves on until someone approves it. The system remembers who and when.',
    },
    {
      ikona: 'portal',
      naglowek: 'A portal for your clients',
      tekst: 'They see only their own cases and fill the gaps themselves. You verify and approve.',
    },
    {
      ikona: 'kontakty',
      naglowek: 'Contacts and history',
      tekst: 'Companies, people, tasks and deadlines together, with correspondence on the case.',
    },
    {
      ikona: 'magazyn',
      naglowek: 'Quotes, orders, stock',
      tekst: 'From the quote to goods leaving the warehouse, with stock levels and stocktaking.',
    },
    {
      ikona: 'zgloszenia',
      naglowek: 'Complaints and tickets',
      tekst: 'A number, a status and a deadline instead of an email thread. You see what is stuck.',
    },
    {
      ikona: 'planowanie',
      naglowek: 'Work planning',
      tekst: 'Who, when and on which resource. A schedule everyone can see, not a whiteboard.',
    },
    {
      ikona: 'import',
      naglowek: 'Import what you have',
      tekst: 'Your spreadsheets go in, and so does data from other tools that can be exported.',
    },
    {
      ikona: 'integracje',
      naglowek: 'Integrations and API',
      tekst: 'The system talks to what you already use and notifies you when things change.',
    },
  ],

  etykietaPoziomy: 'Where to start',
  naglowekPoziomy: 'Three sizes, not one big project',
  wstepPoziomy:
    'The worst possible start is a system meant to do everything at once. We start with the one thing that genuinely hurts and check whether it helps.',
  poziomy: [
    {
      numer: '01',
      naglowek: 'One process out of a spreadsheet',
      tekst:
        'We take the most painful record you keep and move it into the system, with permissions and change history. A short project, after which you can see whether this works for you.',
    },
    {
      numer: '02',
      naglowek: 'Several processes joined up',
      tekst:
        'Approval flows, notifications and reporting are added, and data stops being retyped between departments.',
    },
    {
      numer: '03',
      naglowek: 'The system the company runs on',
      tekst:
        'A client portal, integrations with what you already use, and ongoing maintenance. At this point the system is where work happens, not an add-on to it.',
    },
  ],

  etykietaDowod: 'Proof',
  naglowekDowod: 'Live systems, not mockups',
  wstepDowod:
    'Systems holding real data for real companies and clinics, with permissions, change history and documents.',
  realizacje: [
    {
      tytul: 'Clinical trial registry',
      opis: 'Patient data, clinical calculations and backups held inside the European Union.',
      tag: 'registry · medical',
      href: '/realizacje/rejestr-badania-klinicznego/',
    },
    {
      tytul: 'moje-rodo',
      opis: 'A compliance system for healthcare providers, with payments and document generation.',
      tag: 'SaaS · compliance',
      href: 'https://moje-rodo.pl',
    },
    {
      tytul: 'A system for industry',
      opis: 'Packaging records, document generation and a portal where the client closes the gaps themselves.',
      tag: 'system · client portal',
      href: '/en/#contact',
    },
  ],

  naglowekCta: 'Tell us what eats the most time today',
  tekstCta:
    'Describe the one process that hurts most. I will tell you whether it makes sense to move it into a system, and if it does not, I will say so.',
  przyciskCta: 'Let us talk →',
  hrefKontakt: '/en/#contact',
};
