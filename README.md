# lajf-site-starter

Reużywalny szablon stron kanału Lajf. **Silnik + wymienna skóra + treść z CMS.**
Architektura: `mojezycie/wyzwania/lajf-klienci/szablon-lajf/architektura.md`.

## Trzy warstwy

- **Silnik** (`src/components`, `src/layouts`, `src/lib`, `src/styles/engine.css`) —
  budowane raz, wspólne dla wszystkich klientów. Nie zna konkretnego klienta.
- **Skóra** (`src/skins/<klient>/tokens.css`) — kolory/fonty/radius. Rebrand = 1 plik.
- **Treść** (`src/lib/content.ts` → docelowo Storyblok + `site.config.ts`) — data-driven.

## Uruchomienie

```bash
bun install
bun run dev      # http://localhost:4321
bun run build    # statyczny dist/
```

## Klon pod nowego klienta

1. `src/skins/_base` → `src/skins/<klient>`, ustaw tokeny.
2. Uzupełnij `site.config.ts`.
3. (docelowo) nowa przestrzeń Storyblok z tym samym content-modelem.
4. Deploy na Cloudflare Pages. Silnik nietknięty.

## Dodanie sekcji (rozwój kanału)

1. `src/components/sections/<nowa>.astro` (czyta tokeny + primitives).
2. Dodaj typ bloku w `src/lib/content.ts` i wpis w `src/components/block-renderer.astro`.
3. Dostępna dla wszystkich klientów.
