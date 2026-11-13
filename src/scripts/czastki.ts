/**
 * Nagłówek strony głównej składa się z rozsypanych, kolorowych kulek.
 * Kulki startują rozrzucone po pierwszym ekranie, zlatują się falą od lewej do prawej,
 * gasną do koloru atramentu i podmieniają się na prawdziwy tekst (dostępny i ostry).
 * Bez canvas albo przy ograniczonych animacjach tekst jest widoczny od razu (hero.astro).
 */

const KOLORY = ['#5B8CFF', '#A8A2BD', '#2A2540', '#FF7A59', '#2FB3A3', '#5B8CFF'];
const ATRAMENT = [15, 12, 26];
const CZAS_LOTU_MS = 1400;
const FALA_MS = 900; // o ile później startują kulki z prawego końca napisu
const ROZRZUT_MS = 350;
const GASNIECIE_MS = 450;
const MAKS_KULEK = 4200;

interface Kulka { x0: number; y0: number; x: number; y: number; r: number; kolor: number[]; start: number }

function hex(k: string): number[] {
  return [1, 3, 5].map((i) => parseInt(k.slice(i, i + 2), 16));
}

/** Punkty wypełnienia liter: rysujemy wiersze nagłówka na ukrytym canvasie i próbkujemy piksele. */
function punktyNapisu(h1: HTMLElement, skala: number): Array<[number, number]> {
  const r = h1.getBoundingClientRect();
  const c = document.createElement('canvas');
  c.width = Math.ceil(r.width * skala);
  c.height = Math.ceil(r.height * skala);
  const ctx = c.getContext('2d', { willReadFrequently: true });
  if (!ctx) return [];
  const styl = getComputedStyle(h1);
  ctx.fillStyle = '#000';
  ctx.textBaseline = 'alphabetic';
  h1.querySelectorAll<HTMLElement>('.l').forEach((l) => {
    const lr = l.getBoundingClientRect();
    const rozmiar = parseFloat(getComputedStyle(l).fontSize);
    ctx.font = `850 ${rozmiar * skala}px ${styl.fontFamily}`;
    ctx.fontStretch = 'extra-condensed';
    const znak = (l.textContent ?? '').toUpperCase(); // wersaliki daje CSS (text-transform), canvas ich nie zna
    const m = ctx.measureText(znak);
    const wysokoscGlifu = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent;
    const y = (lr.top - r.top) * skala + (lr.height * skala - wysokoscGlifu) / 2 + m.actualBoundingBoxAscent;
    ctx.fillText(znak, (lr.left - r.left) * skala, y);
  });
  const dane = ctx.getImageData(0, 0, c.width, c.height).data;
  const krok = Math.max(3, Math.round(parseFloat(styl.fontSize) * skala / 26));
  const punkty: Array<[number, number]> = [];
  for (let y = 0; y < c.height; y += krok) {
    for (let x = 0; x < c.width; x += krok) {
      if (dane[(y * c.width + x) * 4 + 3] > 128) punkty.push([x / skala, y / skala]);
    }
  }
  return punkty;
}

const wygladz = (t: number): number => 1 - Math.pow(1 - t, 3);

export async function czastki(): Promise<void> {
  const h1 = document.getElementById('kinetic');
  const scena = h1?.closest<HTMLElement>('.hero');
  if (!h1 || !scena || !h1.classList.contains('czeka')) return;
  const odslon = (): void => { h1.classList.remove('czeka'); };
  try {
    await document.fonts.load(`850 100px "Archivo Variable"`);
  } catch (err) {
    console.warn('[czastki] font:', err);
  }
  const punkty = punktyNapisu(h1, 1);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx || punkty.length === 0) { odslon(); return; }

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const rs = scena.getBoundingClientRect();
  const rh = h1.getBoundingClientRect();
  canvas.className = 'czastki';
  canvas.width = Math.round(rs.width * dpr);
  canvas.height = Math.round(rs.height * dpr);
  canvas.style.width = `${rs.width}px`;
  canvas.style.height = `${rs.height}px`;
  scena.appendChild(canvas);
  ctx.scale(dpr, dpr);

  const dx = rh.left - rs.left;
  const dy = rh.top - rs.top;
  const szer = rh.width || 1;
  const promien = Math.max(1.4, parseFloat(getComputedStyle(h1).fontSize) / 46);
  const wybrane = punkty.length > MAKS_KULEK ? punkty.filter((_, i) => i % Math.ceil(punkty.length / MAKS_KULEK) === 0) : punkty;
  const kulki: Kulka[] = wybrane.map(([x, y]) => ({
    x0: Math.random() * rs.width,
    y0: Math.random() * rs.height * 0.9,
    x: x + dx,
    y: y + dy,
    r: promien * (0.75 + Math.random() * 0.5),
    kolor: hex(KOLORY[Math.floor(Math.random() * KOLORY.length)]),
    start: (x / szer) * FALA_MS + Math.random() * ROZRZUT_MS,
  }));
  const koniecLotu = FALA_MS + ROZRZUT_MS + CZAS_LOTU_MS;
  const t0 = performance.now();

  const klatka = (teraz: number): void => {
    const t = teraz - t0;
    ctx.clearRect(0, 0, rs.width, rs.height);
    const gasniecie = Math.min(1, Math.max(0, (t - koniecLotu) / GASNIECIE_MS));
    for (const k of kulki) {
      const p = wygladz(Math.min(1, Math.max(0, (t - k.start) / CZAS_LOTU_MS)));
      const x = k.x0 + (k.x - k.x0) * p;
      const y = k.y0 + (k.y - k.y0) * p;
      const [r, g, b] = k.kolor.map((v, i) => Math.round(v + (ATRAMENT[i] - v) * gasniecie));
      ctx.fillStyle = `rgba(${r},${g},${b},${0.35 + 0.65 * p})`;
      ctx.beginPath();
      ctx.arc(x, y, k.r * (1 + (1 - p) * 0.8), 0, Math.PI * 2);
      ctx.fill();
    }
    if (t < koniecLotu + GASNIECIE_MS) { requestAnimationFrame(klatka); return; }
    // podmiana na prawdziwy tekst: tekst się pojawia, kulki znikają
    odslon();
    canvas.classList.add('znika');
    setTimeout(() => canvas.remove(), 600);
  };
  requestAnimationFrame(klatka);
}
