/**
 * Zachowanie strony głównej: animacje (budowa strony w hero, ciemniejąca sekcja kroków,
 * licznik ceny, kartka pod dłońmi), filtr realizacji i formularz zgłoszenia.
 * Bez ruchu (prefers-reduced-motion) strona zostaje w gotowym, nieruchomym stanie.
 */

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const ZNAK_MS = 28;
const KARTKA_MS = 3800;
const KOMUNIKAT_BLEDU = 'Nie udało się wysłać. Zadzwoń albo napisz: kontakt@lajf.eu.';

const wait = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

function czytajJson<T>(el: HTMLElement | null, atrybut: string): T | null {
  const surowe = el?.getAttribute(atrybut);
  return surowe ? (JSON.parse(surowe) as T) : null;
}

async function wpisz(el: HTMLElement, tekst: string): Promise<void> {
  el.textContent = '';
  for (const znak of tekst) {
    el.textContent += znak;
    await wait(ZNAK_MS);
  }
}

/** Hero: strona klienta „buduje się”, a na końcu przychodzi zapytanie. Zaczyna i kończy na gotowej stronie. */
async function budowaStrony(): Promise<void> {
  const live = document.getElementById('live');
  const linia = document.getElementById('status-text');
  const kroki = czytajJson<string[]>(live, 'data-status');
  if (!live || !linia || !kroki || kroki.length < 2) return;
  for (;;) {
    await wait(2200);
    live.classList.remove('done', 'ping');
    for (const krok of kroki.slice(0, -2)) { await wpisz(linia, krok); await wait(900); }
    await wpisz(linia, kroki[kroki.length - 2]);
    live.classList.add('done');
    await wait(1600);
    await wpisz(linia, kroki[kroki.length - 1]);
    live.classList.add('ping');
    await wait(5200);
    live.classList.remove('ping');
  }
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

function animacje(): void {
  void budowaStrony();
  kartkaPodDlonmi();
  const kroki = document.getElementById('jak-to-dziala');
  if (kroki) obserwuj(kroki, { rootMargin: '-35% 0px -35% 0px' }, (w) => kroki.classList.toggle('lit', w));
  document.querySelectorAll('.steps li').forEach((li) => obserwuj(li, { rootMargin: '-30% 0px -30% 0px' }, (w) => li.classList.toggle('on', w)));
  const cena = document.getElementById('amount');
  if (cena) {
    const obs = obserwuj(cena, { threshold: 0.6 }, (w) => { if (w) { licznikCeny(cena); obs.disconnect(); } });
  }
}

function galeria(): void {
  const zakladki = document.getElementById('gal-tabs');
  const siatka = document.getElementById('gal');
  const wiecej = document.getElementById('gal-more');
  if (!zakladki || !siatka || !wiecej) return;
  const pokazPrzycisk = (): void => {
    const widoczne = Array.from(siatka.children).filter((k) => !(k as HTMLElement).hidden).length;
    wiecej.hidden = !siatka.classList.contains('short') || widoczne <= 6;
    wiecej.textContent = `Pokaż wszystkie (${widoczne})`;
  };
  zakladki.addEventListener('click', (e) => {
    const przycisk = (e.target as Element).closest('button');
    if (!przycisk) return;
    const k = przycisk.dataset.k ?? 'all';
    zakladki.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b === przycisk)));
    Array.from(siatka.children).forEach((karta) => { (karta as HTMLElement).hidden = k !== 'all' && (karta as HTMLElement).dataset.k !== k; });
    pokazPrzycisk();
  });
  wiecej.addEventListener('click', () => { siatka.classList.remove('short'); wiecej.hidden = true; });
  pokazPrzycisk();
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

galeria();
formularz();
if (!REDUCED) animacje();
