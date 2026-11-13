/**
 * Pierwszy ekran: zdjęcia ludzi przy laptopach na całą szerokość. Na ekranie laptopa po kolei
 * pojawiają się nasze strony, potem zmienia się zdjęcie. Zrzut strony jest nakładany na ekran
 * transformacją matrix3d policzoną z czterech narożników ekranu na zdjęciu (dane: SCENY).
 */

interface Strona { nazwa: string; adres: string; obraz: string }
interface Scena { foto: string; rogi: Array<[number, number]>; kadr: [number, number]; strony: Strona[] }

const ZDJECIE: [number, number] = [2400, 1600];
const EKRAN: [number, number] = [1200, 750]; // bazowy rozmiar elementu ekranu (16:10, jak zrzuty)
const STRONA_MS = 3600;
const PRZEJSCIE_MS = 550;
// Nakładka minimalnie większa niż ekran na zdjęciu: wchodzi na czarną ramkę, żeby spod ciemnych stron
// nie prześwitywał biały, oryginalny ekran zdjęcia.
const ZAPAS = 1.018;

const wait = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

/** Rozwiązanie układu równań liniowych (eliminacja Gaussa z wyborem elementu głównego). */
function rozwiaz(a: number[][], b: number[]): number[] {
  const n = b.length;
  const m = a.map((w, i) => [...w, b[i]]);
  for (let k = 0; k < n; k++) {
    let p = k;
    for (let i = k + 1; i < n; i++) if (Math.abs(m[i][k]) > Math.abs(m[p][k])) p = i;
    [m[k], m[p]] = [m[p], m[k]];
    for (let i = k + 1; i < n; i++) {
      const f = m[i][k] / m[k][k];
      for (let j = k; j <= n; j++) m[i][j] -= f * m[k][j];
    }
  }
  const x = new Array<number>(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let suma = m[i][n];
    for (let j = i + 1; j < n; j++) suma -= m[i][j] * x[j];
    x[i] = suma / m[i][i];
  }
  return x;
}

/** matrix3d, który przenosi prostokąt 0..w × 0..h na czworokąt `cel` (homografia). */
export function macierz(w: number, h: number, cel: Array<[number, number]>): string {
  const zrodlo: Array<[number, number]> = [[0, 0], [w, 0], [w, h], [0, h]];
  const a: number[][] = [];
  const b: number[] = [];
  zrodlo.forEach(([x, y], i) => {
    const [u, v] = cel[i];
    a.push([x, y, 1, 0, 0, 0, -u * x, -u * y]); b.push(u);
    a.push([0, 0, 0, x, y, 1, -v * x, -v * y]); b.push(v);
  });
  const [p, q, c, d, e, f, g, hh] = rozwiaz(a, b);
  return `matrix3d(${[p, d, 0, g, q, e, 0, hh, 0, 0, 1, 0, c, f, 0, 1].join(',')})`;
}

/** Narożniki ekranu przeliczone z pikseli zdjęcia na piksele kontenera (object-fit: cover + object-position). */
function rogiWKontenerze(sc: Scena, cw: number, ch: number): Array<[number, number]> {
  const s = Math.max(cw / ZDJECIE[0], ch / ZDJECIE[1]);
  const ox = (cw - ZDJECIE[0] * s) * sc.kadr[0];
  const oy = (ch - ZDJECIE[1] * s) * sc.kadr[1];
  const rogi = sc.rogi.map(([x, y]): [number, number] => [x * s + ox, y * s + oy]);
  const cx = rogi.reduce((a, [x]) => a + x, 0) / rogi.length;
  const cy = rogi.reduce((a, [, y]) => a + y, 0) / rogi.length;
  return rogi.map(([x, y]) => [cx + (x - cx) * ZAPAS, cy + (y - cy) * ZAPAS]);
}

export function scena(): void {
  const kontener = document.getElementById('scena');
  const ekran = document.getElementById('ekran');
  const obraz = document.getElementById('ekran-img');
  const podpis = document.getElementById('scena-adres');
  const surowe = kontener?.getAttribute('data-sceny');
  if (!kontener || !ekran || !(obraz instanceof HTMLImageElement) || !podpis || !surowe) return;
  const sceny = JSON.parse(surowe) as Scena[];
  const zdjecia = Array.from(kontener.querySelectorAll<HTMLElement>('.scena-foto'));
  let biezaca = 0;

  ekran.style.width = `${EKRAN[0]}px`;
  ekran.style.height = `${EKRAN[1]}px`;
  const ustawEkran = (): void => {
    const { width, height } = kontener.getBoundingClientRect();
    ekran.style.transform = macierz(EKRAN[0], EKRAN[1], rogiWKontenerze(sceny[biezaca], width, height));
  };
  new ResizeObserver(ustawEkran).observe(kontener);
  ustawEkran();
  ekran.classList.add('on');

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  sceny.forEach((sc) => sc.strony.forEach((st) => { new Image().src = st.obraz; }));
  let widoczna = true;
  new IntersectionObserver(([w]) => { widoczna = w.isIntersecting; }).observe(kontener);

  const pokazStrone = async (st: Strona): Promise<void> => {
    ekran.classList.add('zmiana');
    await wait(PRZEJSCIE_MS);
    obraz.src = st.obraz;
    podpis.textContent = `${st.nazwa} · ${st.adres}`;
    ekran.classList.remove('zmiana');
  };

  const petla = async (): Promise<void> => {
    for (let s = 1; ; s++) {
      const sc = sceny[biezaca];
      for (let i = 1; i <= sc.strony.length; i++) {
        await wait(STRONA_MS);
        while (!widoczna) await wait(500); // poza ekranem nic nie przełączamy
        if (i < sc.strony.length || sceny.length === 1) { await pokazStrone(sc.strony[i % sc.strony.length]); continue; }
        // zmiana zdjęcia: ekran gaśnie, zdjęcia się przenikają, ekran wraca na nowym laptopie
        ekran.classList.remove('on');
        await wait(PRZEJSCIE_MS);
        biezaca = s % sceny.length;
        zdjecia.forEach((z, k) => z.classList.toggle('on', k === biezaca));
        ustawEkran();
        obraz.src = sceny[biezaca].strony[0].obraz;
        podpis.textContent = `${sceny[biezaca].strony[0].nazwa} · ${sceny[biezaca].strony[0].adres}`;
        await wait(700);
        ekran.classList.add('on');
      }
    }
  };
  void petla();
}
