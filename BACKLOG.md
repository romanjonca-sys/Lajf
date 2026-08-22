# Backlog LAJF.eu

Rzeczy znalezione podczas audytu i wdrożeń 22.08.2026 (SALES v1 + Content Alignment v1),
świadomie odłożone. Kolejność w każdej sekcji = kolejność, w jakiej bym je robił.

Stan na 22.08.2026: wdrożone i działające — landing `/audyt-placowki-medycznej/`,
formularz audytowy (worker `lajf-contact`), nowe pozycjonowanie „cyfrowa opieka nad firmą".

---

## A. Widoczne dla klienta

### A1. Nowy OG image ⭐ największy zysk z tej listy
`public/images/og-default.jpg` — jedyne miejsce, gdzie zostało stare pozycjonowanie.
Grafika niesie „Pełna obecność firmy w sieci — pod klucz" i tagi
`Strony WWW / RODO / Oprogramowanie / Muzyka`.

Widać ją **przy każdym udostępnieniu linku** — też tego, który Roman podaje przez telefon.
Powinno być: „Cyfrowa opieka nad Twoją firmą" + `Audyty cyfrowe · Technologia · Automatyzacje`.
Czekało na zatwierdzenie hero — hero jest zatwierdzone i wdrożone, więc blokada zniknęła.

### A2. Etykieta na `/rodo-i-cyber/`
`src/pages/rodo-i-cyber.astro` — nagłówek strony wita „RODO & cyberbezpieczeństwo dla medycyny",
a pozycja w nawigacji nazywa się już „Bezpieczeństwo i dane". Drobna niespójność przy wejściu.

### A3. Zdanie łączące na `/strony-www/`
Podstrona nie mówi, że strona WWW to jeden z elementów cyfrowej opieki. Jedno zdanie
z odesłaniem do audytu, bez ruszania reszty (to działający landing SEO).

### A4. Porządek w cenniku
Na serwisie jest **dwanaście różnych kwot**: 399, 679, 349, 199, 2 490, 2 500, 3 678,
4 788, 5 000, 5 900, 12 500, 2 000. Klient nie wie, ile to kosztuje.
Cena audytu (1490) jest jasna — reszta wymaga decyzji biznesowej, nie tylko redakcji.

### A5. Sekcja `#proces` na homepage
Cztery kroki („Analiza i treść → SEO → Konfiguracja Google → Maile, stopki, launch")
opisują wyłącznie wdrożenie strony. Albo przenieść pod ofertę WWW, albo przepisać
na proces audytowy.

---

## B. Techniczne

### B1. Nagłówki bezpieczeństwa 🔒
Serwis nie wysyła **CSP, HSTS, X-Frame-Options ani Permissions-Policy**.
Jest tylko `x-content-type-options` i `referrer-policy`.

Dla firmy, która sprzedaje audyty bezpieczeństwa, to zła wizytówka — klient może to sprawdzić
w 10 sekund. Rozwiązanie: `public/_headers` (Astro dokłada tam własne reguły cache dla `/_astro/*`,
więc trzeba sprawdzić, czy się nie nadpisują).

### B2. Rate limiting na `/api/contact`
Endpoint nie ma żadnego limitu. Honeypot działa (od 22.08), ale to nie to samo.

Wymaga infrastruktury: worker `lajf-contact` musiałby dostać binding
Cloudflare Rate Limiting w `wrangler.toml`. Licznik w pamięci workera nie zadziała —
izolaty są efemeryczne i jest ich wiele.

### B3. Zepsute płynne przewijanie
`scroll-behavior: smooth` na tej stronie **nie rusza z miejsca**: `scrollTo` z `behavior:'smooth'`
po 2,5 s wciąż pokazuje zero, a przy kolejnej próbie zawiesił się renderer.
Podejrzenie: animowane rozmycia w tle (`.blob`, `filter: blur`) wieszają kompozytor.

Objaw obszedłem (kotwice przewijają natychmiast — `lajf-layout.astro`), **przyczyny nie usunąłem**.
Warto zbadać, bo to samo może spowalniać stronę na słabszych telefonach.

### B4. Martwy kod
Nic z tego nie renderuje się na produkcji:
- `src/lib/content.ts` — `HOME` i `HOME_EN` mają pusty slug, a `[...slug].astro:19` pomija pusty slug
- `src/components/block-renderer.astro` i całe `src/components/sections/*`
- `src/layouts/base-layout.astro`
- `/en/` zwraca 404 mimo skonfigurowanego i18n

Usunięcie zmniejszy repo o kilkaset linii i skróci czas szukania właściwego pliku.

### B5. Martwa konfiguracja `nav` w `site.config.ts`
`nav` i `headerCta` są używane tylko przez `base-layout` (martwy). Prawdziwa nawigacja
jest wpisana w `lajf-layout.astro`. Do usunięcia razem z B4.

### B6. `slogan` i `knowsAbout` w schema.org
`Organization` w `lajf-layout.astro` nie ma sloganu ani listy kompetencji.
Dopisać `slogan: 'Cyfrowa opieka nad firmą'` i `knowsAbout` (audyt cyfrowy, analityka,
bezpieczeństwo, automatyzacje).

### B7. Blokada botów AI w `robots.txt`
Cloudflare domyślnie blokuje `GPTBot`, `ClaudeBot`, `Google-Extended`, `Bytespider` i inne
(sekcja „Cloudflare Managed content”). Dla marki, która chce być cytowana przez AI,
to zamknięte drzwi. **Decyzja biznesowa, nie techniczna** — do rozstrzygnięcia z Romanem.

---

## C. Pomiar

### C1. `generate_lead` nie jest oznaczone jako kluczowe w GA4 ⚠️
Zdarzenie leci poprawnie (potwierdzone produkcyjnie 22.08: `method: 'formularz-audyt'`,
11 ms po odpowiedzi serwera), ale **bez oznaczenia jako kluczowe nie zobaczysz konwersji
w raportach**. Klikane w panelu GA4, nie w kodzie. Usługa „Lajf", strumień lajf.eu,
`G-Q3E8SSXFXB`.

### C2. `audit_price_view` — rozważyć oznaczenie
Nowe zdarzenie (dojście do sekcji ceny na landingu audytu) działa produkcyjnie.
Jako kluczowe — tylko jeśli chcesz mierzyć lejek landingu osobno.

### C3. Krótkie linki pod dzwonienie
Przy podawaniu adresu przez telefon nie da się odróżnić „dałem link w rozmowie"
od wejścia z organiki. Mechanizm krótkich linków `/r/` jest już zrobiony
w moje-rodo i dzwiekdobry — do przeniesienia.

---

## D. Poza lajf.eu, z tej samej sesji

### D1. Logotyp LAJF w rozmiarze produkcyjnym
Nie istnieje. Są tylko favikony i `lajf-logo-64.png` (64 px).
Social OS przez to generuje grafiki **bez znaku marki** (sprawdzone: bez `logoMediaId`
Kreator nie nakłada nic — inicjały „LJ" NIE wyciekają do grafik).
Potrzebny komplet: na jasne i na ciemne tło.

### D2. Zakładanie marki z panelu Social OS
Świadomie odłożone 22.08. Dziś nowa marka = edycja kodu + deploy (~30–40 min).
Temat wraca dopiero przy platformie agencyjnej — marki klientów wymagałyby wtedy
deployu na każdego klienta.

### D3. `docs/STAN-PRACY.md` i `docs/CO-DALEJ.md` w Social OS
Nie wiedzą o marce LAJF ani o zmianach z 22.08.
