# Rolki Lajf (Remotion) — nowoczesne, 9:16

8 animowanych rolek (1080×1920, 14 s), z projektu `lajf-eu/reels/`. Marka niebiesko‑tech + podkład tech (Mureka, bez wokalu). Dwa tryby:
- **message** — kinetyczna typografia (słowa z rozmyciem), animowana siatka, poświaty, pasek postępu, FX (sweep), CTA.
- **realizacja** — prawdziwa strona **przewija się w ramce przeglądarki** (jak nagranie ekranu) + nazwa i tagi. Najmocniejszy dowód dla agencji web.

## Pliki
| Plik | Tryb | Temat |
|------|------|-------|
| `01-hero` | message | Strony, które pracują na klientów |
| `02-realizacja-stanio` | realizacja | krzysztofstanio.pl |
| `03-bol-jak-z-2010` | message | Twoja strona jak z 2010? |
| `04-realizacja-mojerodo` | realizacja | moje-rodo.pl |
| `05-proces` | message | 4 kroki współpracy |
| `06-realizacja-dzwiekdobry` | realizacja | dzwiekdobry.pl |
| `07-rodo` | message | Bezpieczeństwo i RODO |
| `08-cta` | message | Bezpłatna konsultacja |

## Maszyna
Projekt: `lajf-eu/reels/`. Szablon+FX: `src/Reel.tsx` (2 tryby). Treści: `src/Root.tsx`. Podgląd: `cd reels && npx remotion studio`. Render: `npx remotion render src/index.ts <id> out/<id>.mp4`.
Zrzuty stron: `reels/public/shots/*-tall.png` (całostronicowe, do efektu przewijania). Podkład: `reels/public/audio/tech-1.mp3`, `tech-2.mp3`.
Nowa realizacja = dodaj wysoki zrrut + wpis w Root.tsx.
