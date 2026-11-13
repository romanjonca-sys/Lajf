/**
 * Nagłówek strony głównej jest „usypywany” z kolorowych kulek kaskadą: strumień z góry
 * wypełnia pierwszy wiersz litera po literze, a każdy kolejny wiersz wypełnia się tym,
 * co przelewa się w dół z wiersza powyżej (kulki ściekają z dolnej krawędzi liter nad nimi),
 * potem kulki gasną do koloru atramentu i podmieniają się na prawdziwy tekst (dostępny i ostry).
 * Bez canvas albo przy ograniczonych animacjach tekst jest widoczny od razu (hero.astro).
 */

const KOLORY = ['#5B8CFF', '#A8A2BD', '#2A2540', '#FF7A59', '#2FB3A3', '#5B8CFF'];
const ATRAMENT = [15, 12, 26];
const WIERSZ_MS = 340; // odstęp między startem kolejnych wierszy kaskady
const FALA_MS = 340; // fala od lewej do prawej w obrębie wiersza
const NASYP_MS = 150; // jak długo sypie się jedna litera (od dołu do góry)
const SPADEK_MS = 300; // czas spadku kulki
const WYSOKOSC_STRUMIENIA = 1.4; // wylot strumienia nad literą, w wysokościach litery
const GASNIECIE_MS = 300;
const MAKS_KULEK = 7000;
const MAKS_KULEK_TELEFON = 2200; // słabsze telefony: mniej kulek, żeby animacja nie klatkowała
const TELEFON_PX = 760;

/** 0 kółko, 1 kwadrat (obrócony), 2 pierścień, 3 trójkąt */
type Ksztalt = 0 | 1 | 2 | 3;
interface Kulka { x0: number; y0: number; x: number; y: number; r: number; kolor: number[]; start: number; ksztalt: Ksztalt; obrot: number; alfa: number }

function losujKsztalt(): Ksztalt {
  const l = Math.random();
  return l < 0.55 ? 0 : l < 0.75 ? 1 : l < 0.9 ? 2 : 3;
}

function rysujKsztalt(ctx: CanvasRenderingContext2D, k: Kulka, x: number, y: number, r: number): void {
  ctx.beginPath();
  if (k.ksztalt === 0) { ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); return; }
  if (k.ksztalt === 2) { ctx.lineWidth = Math.max(0.6, r * 0.45); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.stroke(); return; }
  const boki = k.ksztalt === 1 ? 4 : 3;
  for (let i = 0; i < boki; i++) {
    const a = k.obrot + (i * Math.PI * 2) / boki;
    const px = x + Math.cos(a) * r * 1.25;
    const py = y + Math.sin(a) * r * 1.25;
    if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
}
interface Punkt { x: number; y: number; litera: number }
interface Litera { srodek: number; gora: number; wysokosc: number }

/** Wiersze nagłówka: litery o tej samej górnej krawędzi (z tolerancją kilku pikseli). */
function wiersze(litery: Litera[]): number[] {
  const gory = [...new Set(litery.map((l) => Math.round(l.gora / 8)))].sort((a, b) => a - b);
  return litery.map((l) => gory.indexOf(Math.round(l.gora / 8)));
}

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
  const krok = Math.max(2, Math.round(parseFloat(styl.fontSize) * skala / 36));
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
  const odslon = (): void => {
    h1.classList.remove('czeka');
    try { sessionStorage.setItem('lajf-kulki', '1'); } catch (err) { console.warn('[czastki] sessionStorage:', err); }
  };
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
  const promien = Math.max(1, parseFloat(getComputedStyle(h1).fontSize) / 66);
  const limit = window.innerWidth < TELEFON_PX ? MAKS_KULEK_TELEFON : MAKS_KULEK;
  const co = Math.ceil(punkty.length / limit);
  const wybrane = co > 1 ? punkty.filter((_, i) => i % co === 0) : punkty;
  // w każdej literze kulki sypią się od dołu do góry
  const wLiterze = new Map<number, Punkt[]>();
  wybrane.forEach((p) => { const lista = wLiterze.get(p.litera) ?? []; lista.push(p); wLiterze.set(p.litera, lista); });
  const kulki: Kulka[] = [];
  const wierszLitery = wiersze(litery);
  const dolWiersza = new Map<number, number>();
  litery.forEach((l, i) => dolWiersza.set(wierszLitery[i], Math.max(dolWiersza.get(wierszLitery[i]) ?? 0, l.gora + l.wysokosc * 0.82)));
  const szer = rh.width || 1;
  wLiterze.forEach((lista, i) => {
    const l = litery[i];
    const w = wierszLitery[i];
    lista.sort((a, b) => b.y - a.y + (Math.random() - 0.5) * 6);
    lista.forEach((p, j) => {
      // pierwszy wiersz: strumień z góry nad literą; kolejne: kulki ściekają z wiersza powyżej
      const zGory = w === 0;
      kulki.push({
        x0: (zGory ? l.srodek : p.x) + dx + (Math.random() - 0.5) * (zGory ? 4 : 10),
        y0: zGory ? Math.max(-20, l.gora + dy - l.wysokosc * WYSOKOSC_STRUMIENIA) : (dolWiersza.get(w - 1) ?? l.gora) + dy,
        x: p.x + dx,
        y: p.y + dy,
        r: promien * (0.45 + Math.random() * Math.random() * 1.6), // dużo małych, mało dużych
        kolor: hex(KOLORY[Math.floor(Math.random() * KOLORY.length)]),
        ksztalt: losujKsztalt(),
        obrot: Math.random() * Math.PI,
        alfa: 0.45 + Math.random() * 0.5,
        start: w * WIERSZ_MS + (l.srodek / szer) * FALA_MS + (j / lista.length) * NASYP_MS,
      });
    });
  });
  const koniecLotu = Math.max(...kulki.map((k) => k.start)) + SPADEK_MS;
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
      const alfa = k.alfa + (1 - k.alfa) * gasniecie; // przezroczyste kulki tężeją przy podmianie na tekst
      ctx.fillStyle = `rgba(${r},${g},${b},${alfa})`;
      ctx.strokeStyle = ctx.fillStyle;
      rysujKsztalt(ctx, k, x, y, k.r * (p < 1 ? 0.8 : 1));
    }
    if (t < koniecLotu + GASNIECIE_MS) { requestAnimationFrame(klatka); return; }
    // podmiana na prawdziwy tekst: tekst się pojawia, kulki znikają
    odslon();
    canvas.classList.add('znika');
    setTimeout(() => canvas.remove(), 600);
  };
  requestAnimationFrame(klatka);
}
