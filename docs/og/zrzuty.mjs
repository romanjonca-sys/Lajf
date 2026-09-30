// Zrzuty strony klienta do podstrony realizacji: pierwszy ekran 1600x1000, wybrane sekcje i telefon 390 px (2x).
// Użycie: node docs/og/zrzuty.mjs <adres> <katalog wyjścia> [selektor=nazwa ...]
//   np. node docs/og/zrzuty.mjs https://pankolektor.pl public/images/realizacje/pankolektor '#oferta=oferta' '#kontakt=kontakt'
// Wynik: hero.png, <nazwa>.png, telefon.png. Potem konwersja do JPG (sips, jakość 78) i usunięcie PNG.
import puppeteer from '/Users/r/Desktop/APLIKACJE/moje-rodo/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js';
const [adres, katalog, ...sekcje] = process.argv.slice(2);
const pauza = (ms) => new Promise((r) => setTimeout(r, ms));
// Baner cookies zasłania kadr: klikamy „tylko niezbędne” / „odrzuć”, jeśli jest.
async function zamknijBaner(p) {
  await p.evaluate(() => {
    const przyciski = [...document.querySelectorAll('button, a')];
    const cel = przyciski.find((b) => /tylko niezb|odrzu|niezbędne|reject|decline/i.test(b.textContent || ''));
    if (cel) cel.click();
  });
  await pauza(600);
}
const b = await puppeteer.launch({ executablePath: '/Users/r/.cache/puppeteer/chrome/mac-147.0.7727.57/chrome-mac-x64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing', headless: true, args: ['--no-sandbox'] });
const p = await b.newPage();
await p.setViewport({ width: 1600, height: 1000 });
await p.goto(adres, { waitUntil: 'networkidle0', timeout: 60000 });
await pauza(3000);
await zamknijBaner(p);
await p.screenshot({ path: `${katalog}/hero.png` });
for (const para of sekcje) {
  const [selektor, nazwa] = para.split('=');
  const jest = await p.evaluate((s) => { const el = document.querySelector(s); if (!el) return false; window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 80); return true; }, selektor);
  if (!jest) { process.stderr.write(`brak sekcji ${selektor}\n`); continue; }
  await pauza(2500);
  await p.screenshot({ path: `${katalog}/${nazwa}.png` });
}
await p.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await p.goto(adres, { waitUntil: 'networkidle0', timeout: 60000 });
await pauza(3000);
await zamknijBaner(p);
await p.screenshot({ path: `${katalog}/telefon.png` });
await b.close();
