/**
 * Treść sekcji o systemach dla firm, w dwóch językach.
 *
 * Wydzielona z widoków, bo ten sam katalog możliwości opisuje polska strona
 * `/oprogramowanie/` i angielska `/en/systems/`. Trzymanie go w jednym miejscu
 * pilnuje, żeby wersje nie rozjechały się przy pierwszej poprawce.
 *
 * ⛔ ZASADY REDAKCYJNE, których trzeba się trzymać przy dopisywaniu pozycji:
 *
 * 1. Nazywamy EFEKT dla firmy, nigdy modułu ani technologii. Klient nie kupuje
 *    silnika, tylko rozwiązany problem. Nazwa frameworka nie pada na stronie:
 *    klientowi nic nie mówi, konkurentowi mówi wszystko, a silnik jest przed 1.0.
 * 2. Piszemy „uruchamiamy", nie „wdrożyliśmy u wielu klientów". Katalog modułów
 *    opisuje je jako gotowe do włączenia i to jest prawda techniczna, ale obietnica
 *    na stronie musi być taka, którą da się dowieźć w umówionym terminie.
 * 3. Bez cennika. Poziomy wejścia mówią o zakresie, nie o kwocie.
 */

import type { Locale } from './i18n';

export interface PozycjaKatalogu {
  naglowek: string;
  tekst: string;
  /** Klucz kształtu w `ikona-systemu.astro`. Karta bez ikony wygląda na niedokończoną. */
  ikona: string;
}

export interface Realizacja {
  tytul: string;
  opis: string;
  tag: string;
  href: string;
}

export interface PoziomWdrozenia {
  numer: string;
  naglowek: string;
  tekst: string;
}

export interface TrescSystemow {
  title: string;
  description: string;
  etykietaHero: string;
  naglowekHero: string;
  naglowekHeroAkcent: string;
  lead: string;
  ctaHero: string;
  /** Sekcja o przewadze: gotowy rdzeń zamiast pustego pliku. */
  etykietaPodejscie: string;
  naglowekPodejscie: string;
  wstepPodejscie: string;
  filaryPodejscia: PozycjaKatalogu[];
  etykietaKatalog: string;
  naglowekKatalog: string;
  wstepKatalog: string;
  katalog: PozycjaKatalogu[];
  etykietaPoziomy: string;
  naglowekPoziomy: string;
  wstepPoziomy: string;
  poziomy: PoziomWdrozenia[];
  etykietaDowod: string;
  naglowekDowod: string;
  wstepDowod: string;
  realizacje: Realizacja[];
  naglowekCta: string;
  tekstCta: string;
  przyciskCta: string;
  hrefKontakt: string;
}

import { PL } from './systemy-tresc-pl';
import { EN } from './systemy-tresc-en';

const TRESC: Record<Locale, TrescSystemow> = { pl: PL, en: EN };

export function trescSystemow(locale: Locale): TrescSystemow {
  return TRESC[locale];
}
