/**
 * Nagłówek strony głównej jest „usypywany” z kolorowych kulek, litera po literze:
 * strumień kulek spada z góry nad kolejną literę i wypełnia ją od dołu do góry (jak piasek),
 * potem kulki gasną do koloru atramentu i podmieniają się na prawdziwy tekst (dostępny i ostry).
 * Bez canvas albo przy ograniczonych animacjach tekst jest widoczny od razu (hero.astro).
 */

const KOLORY = ['#5B8CFF', '#A8A2BD', '#2A2540', '#FF7A59', '#2FB3A3', '#5B8CFF'];
const ATRAMENT = [15, 12, 26];
const LITERA_MS = 60; // odstęp między startem kolejnych liter
const NASYP_MS = 420; // jak długo sypie się jedna litera
const SPADEK_MS = 420; // czas spadku kulki z wylotu strumienia
const WYSOKOSC_STRUMIENIA = 1.4; // wylot strumienia nad literą, w wysokościach litery
const GASNIECIE_MS = 450;
const MAKS_KULEK = 4200;

interface Kulka { x0: number; y0: number; x: number; y: number; r: number; kolor: number[]; start: number }
interface Punkt { x: number; y: number; litera: number }
interface Litera { srodek: number; gora: number; wysokosc: number }

function hex(k: string): number[] {
  return [1, 3, 5].map((i) => parseInt(k.slice(i, i + 2), 16));
}

/** Punkty wypełnienia liter: rysujemy wiersze nagłówka na ukrytym canvasie i próbkujemy piksele. */
function punktyNapisu(h1: HTMLElement, skala: number): { punkty: Punkt[]; litery: Litera[] } {
  const r = h1.getBoundingClientRect();
  const c = document.createElement('canvas');
  c.width = Math.ceil(r.width * skala);
  c.height = Math.ceil(r.height * skala);
  const ctx = c.getContext('2d', { willReadFrequently: true });
  if (!ctx) return { punkty: [], litery: [] };
  const litery: Litera[] = [];
  const styl = getComputedStyle(h1);
  ctx.fillStyle = '#000';
  ctx.textBaseline = 'alphabetic';
  h1.querySelectorAll<HTMLElement>('.l').forEach((l) => {
    const lr = l.getBoundingClientRect();
    litery.push({ srodek: lr.left - r.left + lr.width / 2, gora: lr.top - r.top, wysokosc: lr.height });
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
  const punkty: Punkt[] = [];
  for (let y = 0; y < c.height; y += krok) {
    for (let x = 0; x < c.width; x += krok) {
      if (dane[(y * c.width + x) * 4 + 3] <= 128) continue;
      const px = x / skala;
      const py = y / skala;
      // litera = ta w tym samym wierszu, której środek jest najbliżej
      let najblizsza = 0;
      let odl = Infinity;
      litery.forEach((l, i) => {
        if (py < l.gora - 4 || py > l.gora + l.wysokosc + 4) return;
        const d = Math.abs(l.srodek - px);
        if (d < odl) { odl = d; najblizsza = i; }
      });
      punkty.push({ x: px, y: py, litera: najblizsza });
    }
  }
  return { punkty, litery };
}

const wygladz = (t: number): number => 1 - Math.pow(1 - t, 3);
const przedzial = (v: number): number => Math.min(1, Math.max(0, v));

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
  const { punkty, litery } = punktyNapisu(h1, 1);
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
  const promien = Math.max(1.4, parseFloat(getComputedStyle(h1).fontSize) / 46);
  const co = Math.ceil(punkty.length / MAKS_KULEK);
  const wybrane = co > 1 ? punkty.filter((_, i) => i % co === 0) : punkty;
  // w każdej literze kulki sypią się od dołu do góry
  const wLiterze = new Map<number, Punkt[]>();
  wybrane.forEach((p) => { const lista = wLiterze.get(p.litera) ?? []; lista.push(p); wLiterze.set(p.litera, lista); });
  const kulki: Kulka[] = [];
  wLiterze.forEach((lista, i) => {
    const l = litery[i];
    lista.sort((a, b) => b.y - a.y + (Math.random() - 0.5) * 6);
    lista.forEach((p, j) => {
      kulki.push({
        x0: l.srodek + dx + (Math.random() - 0.5) * 4,
        y0: Math.max(-20, l.gora + dy - l.wysokosc * WYSOKOSC_STRUMIENIA),
        x: p.x + dx,
        y: p.y + dy,
        r: promien * (0.75 + Math.random() * 0.5),
        kolor: hex(KOLORY[Math.floor(Math.random() * KOLORY.length)]),
        start: i * LITERA_MS + (j / lista.length) * NASYP_MS,
      });
    });
  });
  const koniecLotu = (litery.length - 1) * LITERA_MS + NASYP_MS + SPADEK_MS;
  const t0 = performance.now();

  const klatka = (teraz: number): void => {
    const t = teraz - t0;
    ctx.clearRect(0, 0, rs.width, rs.height);
    const gasniecie = Math.min(1, Math.max(0, (t - koniecLotu) / GASNIECIE_MS));
    for (const k of kulki) {
      if (t < k.start) continue;
      const p = przedzial((t - k.start) / SPADEK_MS);
      const x = k.x0 + (k.x - k.x0) * wygladz(p); // rozsypuje się na boki
      const y = k.y0 + (k.y - k.y0) * p * p; // spada z przyspieszeniem jak piasek
      const [r, g, b] = k.kolor.map((v, i) => Math.round(v + (ATRAMENT[i] - v) * gasniecie));
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.beginPath();
      ctx.arc(x, y, k.r * (p < 1 ? 0.8 : 1), 0, Math.PI * 2);
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
