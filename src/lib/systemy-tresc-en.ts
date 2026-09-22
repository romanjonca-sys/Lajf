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
      naglowek: 'The foundation is there on day one',
      tekst:
        'Logins, roles and permissions, separation of data between companies, a change history on every record, export and search. That is the starting point, not the result of three months of work.',
    },
    {
      naglowek: 'You define the fields',
      tekst:
        'Your registry holds the fields you need, not the ones someone designed for a different industry. Adding another one does not mean rewriting the system.',
    },
    {
      naglowek: 'It grows with the company',
      tekst:
        'You start with one process. The next ones are added when they are actually needed, on the same foundation and without migrating your data to a different system.',
    },
    {
      naglowek: 'It starts from what you already have',
      tekst:
        'Your existing spreadsheets are imported. Nobody retypes two thousand rows by hand just to start using the new tool.',
    },
  ],

  etykietaKatalog: 'What we assemble',
  naglowekKatalog: 'The nine things companies ask for most',
  wstepKatalog:
    'It usually starts with one item from this list. The rest follows later, once the first one has started paying for itself.',
  katalog: [
    {
      naglowek: 'Registries and records',
      tekst:
        'One place instead of seven spreadsheets going round by email. You set the fields, and every change carries an author and a date.',
    },
    {
      naglowek: 'Approval flows',
      tekst:
        'A document does not move on until someone approves it. The system remembers who and when, so nobody has to dig through an inbox.',
    },
    {
      naglowek: 'A portal for your clients',
      tekst:
        'Clients log into their own accounts, see only their own cases and fill the gaps themselves, uploading documents and entering data. You verify and approve.',
    },
    {
      naglowek: 'Contacts and history',
      tekst:
        'Companies, people, tasks and deadlines in one place. Correspondence attached to the case rather than sitting in the inbox of whoever is on holiday.',
    },
    {
      naglowek: 'Quotes, orders, stock',
      tekst:
        'From the quote to goods leaving the warehouse. Stock levels, receipts and stocktaking if you hold inventory.',
    },
    {
      naglowek: 'Complaints and tickets',
      tekst:
        'Each one gets a number, a status and a deadline. You can see what is stuck and with whom, instead of a forty-message email thread.',
    },
    {
      naglowek: 'Work planning',
      tekst:
        'Who, when, with what and on which resource. A schedule everyone can see, instead of a whiteboard and calls to the coordinator.',
    },
    {
      naglowek: 'Importing what you already have',
      tekst:
        'Your spreadsheets go in. So does data from other tools, as long as it can be exported.',
    },
    {
      naglowek: 'Integrations and API',
      tekst:
        'The system talks to what you already use and notifies you when things change. If someone on your side builds their own tools, they get access to the data.',
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
