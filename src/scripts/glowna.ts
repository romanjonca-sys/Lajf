import { czastki } from './czastki';
import { scena } from './scena';
import { swiatlo } from './swiatlo';

/**
 * Zachowanie strony głównej: animacje (budowa strony w hero, ciemniejąca sekcja kroków,
 * licznik ceny, kartka pod dłońmi), filtr realizacji i formularz zgłoszenia.
 * Bez ruchu (prefers-reduced-motion) strona zostaje w gotowym, nieruchomym stanie.
 */

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const KARTKA_MS = 3800;
const KOMUNIKAT_BLEDU = 'Nie udało się wysłać. Zadzwoń albo napisz: kontakt@lajf.eu.';


function czytajJson<T>(el: HTMLElement | null, atrybut: string): T | null {
  const surowe = el?.getAttribute(atrybut);
  return surowe ? (JSON.parse(surowe) as T) : null;
}


function obserwuj(el: Element, opcje: IntersectionObserverInit, naZmiane: (widoczny: boolean) => void): IntersectionObserver {
  const obs = new IntersectionObserver(([wpis]) => naZmiane(wpis.isIntersecting), opcje);
  obs.observe(el);
  return obs;
}

function licznikCeny(el: HTMLElement): void {
  const cel = Number(el.textContent);
  const start = performance.now();
  const klatka = (t: number): void => {
    const p = Math.min(1, (t - start) / 900);
    el.textContent = String(Math.round(cel * (1 - Math.pow(1 - p, 3))));
    if (p < 1) requestAnimationFrame(klatka);
  };
  requestAnimationFrame(klatka);
}

function kartkaPodDlonmi(): void {
  const kartka = document.getElementById('desk');
  const tresci = czytajJson<Array<[string, string, string]>>(kartka, 'data-kartki');
  if (!kartka || !tresci) return;
  let i = 0;
  setInterval(() => {
    i = (i + 1) % tresci.length;
    const [ikona, naglowek, tekst] = tresci[i];
    const [eIkona, eNaglowek, eTekst] = Array.from(kartka.children);
    eIkona.textContent = ikona;
    eNaglowek.textContent = naglowek;
    eTekst.textContent = tekst;
    kartka.classList.remove('swap');
    void kartka.offsetWidth; // restart animacji wjazdu
    kartka.classList.add('swap');
  }, KARTKA_MS);
}

/** Na komputerze litery nagłówka pod kursorem lekko się rozszerzają (oś szerokości kroju). */
function oddychajacyNaglowek(): void {
  const h1 = document.getElementById('kinetic');
  if (!h1 || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const litery = Array.from(h1.querySelectorAll<HTMLElement>('.l'));
  const ZASIEG_PX = 220;
  const MAKS_PROC = 38; // 62% → do 100% szerokości tuż pod kursorem
  let ramka = 0;
  let x = 0;
  let y = 0;
  const aktualizuj = (): void => {
    ramka = 0;
    for (const l of litery) {
      const r = l.getBoundingClientRect();
      const d = Math.hypot(r.left + r.width / 2 - x, r.top + r.height / 2 - y);
      const sila = Math.max(0, 1 - d / ZASIEG_PX);
      l.style.fontStretch = `${62 + MAKS_PROC * sila * sila}%`;
    }
  };
  h1.addEventListener('pointermove', (e) => { x = e.clientX; y = e.clientY; if (!ramka) ramka = requestAnimationFrame(aktualizuj); });
  h1.addEventListener('pointerleave', () => { cancelAnimationFrame(ramka); ramka = 0; litery.forEach((l) => { l.style.fontStretch = ''; }); });
}

function animacje(): void {
  void czastki();
  oddychajacyNaglowek();
  kartkaPodDlonmi();
  const kroki = document.getElementById('jak-to-dziala');
  if (kroki) obserwuj(kroki, { rootMargin: '-35% 0px -35% 0px' }, (w) => kroki.classList.toggle('lit', w));
  document.querySelectorAll('.steps li').forEach((li) => obserwuj(li, { rootMargin: '-30% 0px -30% 0px' }, (w) => li.classList.toggle('on', w)));
  const cena = document.getElementById('amount');
  if (cena) {
    const obs = obserwuj(cena, { threshold: 0.6 }, (w) => { if (w) { licznikCeny(cena); obs.disconnect(); } });
  }
}

/** Realizacje-historie: zakładki 01–03, same przełączają się co CZAS_HISTORII_MS, stoją po najechaniu lub kliknięciu. */
const CZAS_HISTORII_MS = 7000;
function historie(): void {
  const sekcja = document.getElementById('story');
  if (!sekcja) return;
  const zakladki = Array.from(sekcja.querySelectorAll<HTMLButtonElement>('.story-tab'));
  const panele = Array.from(sekcja.querySelectorAll<HTMLElement>('.story-panel'));
  const zdjecia = Array.from(sekcja.querySelectorAll<HTMLElement>('.story-img'));
  sekcja.style.setProperty('--czas', `${CZAS_HISTORII_MS}ms`);
  let biezaca = 0;
  let licznik = 0;
  const pokaz = (i: number): void => {
    biezaca = i;
    zakladki.forEach((z, k) => z.setAttribute('aria-selected', String(k === i)));
    panele.forEach((p, k) => { p.hidden = k !== i; });
    zdjecia.forEach((z, k) => z.classList.toggle('on', k === i));
  };
  const auto = (): void => {
    clearInterval(licznik);
    if (REDUCED || sekcja.classList.contains('stop')) return;
    licznik = window.setInterval(() => pokaz((biezaca + 1) % zakladki.length), CZAS_HISTORII_MS);
  };
  zakladki.forEach((z, i) => z.addEventListener('click', () => { sekcja.classList.add('stop'); clearInterval(licznik); pokaz(i); }));
  sekcja.addEventListener('pointerenter', () => { clearInterval(licznik); sekcja.classList.add('stop'); });
  sekcja.addEventListener('pointerleave', () => { sekcja.classList.remove('stop'); pokaz(biezaca); auto(); });
  obserwuj(sekcja, { threshold: 0.3 }, (w) => { if (w) auto(); else clearInterval(licznik); });
}

function galeria(): void {
  const zakladki = document.getElementById('gal-tabs');
  const siatka = document.getElementById('gal');
  const wiecej = document.getElementById('gal-more');
  const panel = document.getElementById('more-work');
  if (!zakladki || !siatka || !wiecej || !panel) return;
  wiecej.addEventListener('click', () => {
    const otwarty = panel.classList.toggle('open');
    wiecej.setAttribute('aria-expanded', String(otwarty));
  });
  zakladki.addEventListener('click', (e) => {
    const przycisk = (e.target as Element).closest('button');
    if (!przycisk) return;
    const k = przycisk.dataset.k ?? 'all';
    zakladki.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b === przycisk)));
    Array.from(siatka.children).forEach((karta) => { (karta as HTMLElement).hidden = k !== 'all' && (karta as HTMLElement).dataset.k !== k; });
  });
}

function formularz(): void {
  const form = document.getElementById('lead');
  if (!(form instanceof HTMLFormElement)) return;
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const przycisk = form.querySelector('button[type=submit]');
    przycisk?.setAttribute('disabled', 'true');
    const payload: Record<string, unknown> = Object.fromEntries(new FormData(form).entries());
    payload.form = form.getAttribute('name') ?? 'abonament';
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) });
      const data = (await res.json().catch(() => ({}))) as { error?: { message?: string } };
      if (!res.ok) throw new Error(data.error?.message ?? KOMUNIKAT_BLEDU);
      form.innerHTML = '<p class="form-ok">Dziękujemy. Zadzwonimy w ciągu dnia roboczego, a potwierdzenie jest już w Twojej skrzynce.</p>';
      // Analityka (analytics-ga4.astro) liczy lead dopiero po potwierdzeniu z serwera.
      document.dispatchEvent(new CustomEvent('lajf:lead', { detail: { metoda: 'formularz' } }));
    } catch (err) {
      przycisk?.removeAttribute('disabled');
      let nota = form.querySelector('.form-err');
      if (!nota) { nota = document.createElement('p'); nota.className = 'form-err'; form.appendChild(nota); }
      nota.textContent = err instanceof Error && err.message ? err.message : KOMUNIKAT_BLEDU;
    }
  });
}

swiatlo();
scena();
historie();
galeria();
formularz();
if (!REDUCED) animacje();
