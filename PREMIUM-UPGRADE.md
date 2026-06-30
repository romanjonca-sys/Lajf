# Premium upgrade — warstwa „flagowa" startera

Ten starter ma wersję **premium**, doprowadzoną do poziomu portfolio w realizacji
**`innova-biological`** (czerwiec 2026) — to **referencyjny build** tej warstwy.
Ten dokument opisuje, **co dochodzi** i **jak to przenieść** do startera / nowego klienta.

> Referencja: `../innova-biological` (lokalnie) + `innova-biological/TEMPLATE.md` (playbook).

## Co daje warstwa premium

- **Hero immersyjny „connecting the dots"** — pełnoekranowa, interaktywna konstelacja
  (canvas: kropki łączą się liniami, reagują na kursor — spotlight + parallax) + duża
  typografia z gradientowym akcentem + szklane chipy zaufania + scroll cue.
- **System motion** sterowany tokenami: reveal/stagger (blur→ostrość), parallax,
  magnetyczne przyciski, 3D tilt + spotlight kart, scroll-progress, header scroll-state.
- **Ciemne sekcje** `tone="ink"` — brand-glow + vignette + maskowana siatka kropek + szklane karty.
- **Dividery „connecting dots"** (rysowane przy scrollu, fade na końcach), **FAQ premium**
  (gradientowy chip +/−), **pre-footer CTA band**, **ciemny footer**.
- **View Transitions** — `ClientRouter` + skrypty przepięte na `astro:page-load`; cookie/RODO `transition:persist`.
- **OG image** brandowany (1200×630).

## Pliki do przeniesienia (z `innova-biological`)

**Nowe (skopiować 1:1 — czytają tylko tokeny, są skóro-agnostyczne):**
- `src/scripts/motion.ts` — Lenis + parallax + magnetic + tilt + scroll-progress + header-state
- `src/components/sections/hero-net.astro` — canvas konstelacji
- `src/components/sections/hero-immersive.astro` — layout hero premium (`media: 'net'`)
- `src/components/cta-band.astro` — pre-footer CTA band
- `src/components/primitives/dots-divider.astro` — divider między sekcjami

**Wzbogacone (zmerge'ować zmiany, NIE nadpisywać na ślepo — starter się rozszedł):**
- `src/styles/engine.css` — reveal/stagger/parallax/scroll-progress + reguły `.section--ink` (globalne!)
- `src/skins/_base/tokens.css` — tokeny motion: `--ease-premium`, `--ease-spring`, `--reveal-*`, `--hover-lift`, `--gradient-mesh`
- `src/components/primitives/{button,card,section}.astro` — magnetic / 3D tilt+spotlight / glow+vignette+kropki ink
- `src/components/sections/{hero,faq,services,portfolio}.astro` — `data-stagger`, aurora hero, FAQ chip, tone
- `src/components/block-renderer.astro` — wybór hero wg `media`, auto-divider między sekcjami, `showCtaBand`
- `src/components/site-header.astro` — scroll-state, hamburger na `astro:page-load`
- `src/layouts/base-layout.astro` — `ClientRouter`, CTA band (auto-off gdy jest kontakt), skrypty na `astro:page-load`, ciemny footer

## ⚠️ Pułapki (kosztowały realny debug w Innovie)

- **View Transitions + skrypty:** każdy `<script>` inicjalizujący DOM przepnij na
  `document.addEventListener('astro:page-load', ...)` z gardem (`data-*-bound`), inaczej po
  miękkiej nawigacji animacje nie wracają (canvas hero, count-up, dividery, hamburger, formularz, tilt).
- **VT + pełnoekranowe tła:** centruj `margin-left: -50vw` (NIE `transform`) i **NIE animuj `scale()`** —
  animowany skalowany element + VT = widoczny „seam" po nawigacji (na świeżym load niewidoczny → mylące).
- **HMR po wielu zmianach** potrafi serwować stary CSS — przy „nie działa mimo fixu" zrestartuj `bun dev`.
- **Ciemna sekcja `tone="ink"`:** reguły kolorów treści/kart muszą być **globalne w `engine.css`**
  (scoped w `section.astro` nie sięgają do treści z innych komponentów → niewidoczne nagłówki).

## Architektura (bez zmian — to rdzeń startera)

Silnik (komponenty/engine.css/motion.ts) ↔ skóra (`src/skins/<klient>/tokens.css`) ↔
config (`site.config.ts`) ↔ treść-bloki (`src/lib/content.ts`). Sekcje włączasz/wyłączasz
**danymi** (blok), nie kodem.

## Deploy

Cloudflare Workers (adapter `@astrojs/cloudflare`): `bun run build` → `wrangler deploy` z roota
(KV `SESSION` + ewentualnie sekrety Resend formularza). Szczegóły: `innova-biological/TEMPLATE.md`.
