// Render obrazu do udostępniania: node docs/og/render.mjs <nazwa-html> <wyjście.jpg>
// Wymaga serwera z katalogu repo: python3 -m http.server 4412
import puppeteer from '/Users/r/Desktop/APLIKACJE/moje-rodo/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js';
const [nazwa, wyjscie] = process.argv.slice(2);
const b = await puppeteer.launch({ executablePath: '/Users/r/.cache/puppeteer/chrome/mac-147.0.7727.57/chrome-mac-x64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing', headless: true, args: ['--no-sandbox'] });
const p = await b.newPage();
await p.setViewport({ width: 1200, height: 630 });
await p.goto(`http://localhost:4412/docs/og/${nazwa}.html`, { waitUntil: 'networkidle0' });
await p.evaluate(() => document.fonts.ready);
await p.screenshot({ path: wyjscie, type: 'jpeg', quality: 86 });
await b.close();
