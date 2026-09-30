# Podstrony realizacji: jak je robić

Każda karta w sekcji „Realizacje” na stronie głównej prowadzi do podstrony `/realizacje/<slug>/`
z opisem projektu, zrzutami i przyciskiem do działającej strony klienta. Wzór:
`src/pages/realizacje/strona-wokalistki-iwona-wegrowska.astro` (strona) i
`src/pages/realizacje/rejestr-badania-klinicznego.astro` (aplikacja, bez linku, bo system jest prywatny).

## Zasady treści

- **Tylko fakty.** Każde zdanie musi mieć źródło: notatkę w pamięci
  (`~/.claude/projects/-Users-r-Desktop-APLIKACJE-mojezycie/memory/`), repo projektu w `~/Desktop/APLIKACJE/`,
  pliki w `~/Desktop/APLIKACJE/mojezycie/` albo to, co widać na działającej stronie. Bez liczb, wyników
  sprzedaży, opinii klienta i efektów, których nie da się pokazać. Jeśli czegoś nie wiadomo, nie pisz tego.
- **Bez danych, których klient nie pokazuje publicznie:** cen z umów, kwot, nazwisk spoza strony, danych osobowych,
  treści maili, problemów wewnętrznych klienta, spraw zdrowotnych, konfliktów. Piszemy o tym, co zrobiliśmy, a nie o kliencie.
- **Styl:** polski, rzeczowo, krótkie zdania, bez żargonu (albo z wyjaśnieniem), bez motywacyjnych ozdobników,
  bez myślników dla rytmu (przecinek albo kropka), bez przecinka przed „i”.
  Nagłówki opisują, co zrobiliśmy („Terminarz, który klient uzupełnia sam”), nie ogólniki („Nasze podejście”).
- **Struktura:** hero (`label`, `h1` z `<span class="hl">`, `lead` 2–4 zdania, przycisk do strony) →
  „Punkt wyjścia” → 3–6 sekcji o konkretnych rozwiązaniach (listy lub krótkie akapity) z 3–5 zrzutami →
  „Technologia” (1–2 zdania) → blok `ctaband` z pytaniem do podobnego klienta i przyciskiem `/#kontakt`.
  Długość jak we wzorze, nie dłużej.
- **Przycisk do strony** w hero, pod `lead`:
  `<div class="art-live"><a href="<adres>" class="btn btn-primary" target="_blank" rel="noopener">Zobacz stronę <domena> →</a></div>`
- `title`: `<Co to jest> | Realizacja Lajf`, `description` do ~200 znaków.
- `accent`: kolor marki klienta (jasny, czytelny na ciemnym tle).
- Komentarz na górze pliku: czego dotyczy, adres, data, źródła faktów, zastrzeżenia (np. zgoda, czego nie podajemy).

## Zrzuty

`docs/og/zrzuty.mjs` robi pierwszy ekran 1600×1000, wybrane sekcje i widok telefonu:

```bash
node docs/og/zrzuty.mjs https://adres.pl public/images/realizacje/<slug> '#sekcja=nazwa' ...
cd public/images/realizacje/<slug> && for f in *.png; do sips -s format jpeg -s formatOptions 78 "$f" --out "${f%.png}.jpg" >/dev/null; done && rm *.png
```

Obejrzyj każdy zrzut (Read). Odrzuć te z banerem cookies, uciętym nagłówkiem, pustą sekcją albo animacją w połowie.
W `<img>`: `width="1600" height="1000"` (telefon: `width="780" height="1688"`, figura `class="zrzut zrzut--telefon"`),
`loading="lazy"`, konkretny `alt`, `figcaption` jednym zdaniem. Style `.zrzut` są w `src/styles/artykul.css`.

## Obraz do udostępniania

Szablon `docs/og/realizacja.html`, parametry w adresie (zakoduj spacje i polskie znaki):

```bash
PORT=44xx; (python3 -m http.server $PORT >/dev/null 2>&1 &) ; sleep 1
PORT=$PORT node docs/og/render.mjs public/images/og/realizacja-<slug>.jpg \
  "t1=<pierwsza linia>&t2=<druga, w akcencie>&tagi=<Tag 1>|<Tag 2>|<Tag 3>&url=<domena>&img=/images/realizacje/<slug>/hero.jpg&acc=<kolor bez #>"
```

Obejrzyj wynik: tytuł w max 3 liniach, tagi krótkie (1–3 słowa). Na stronie: `ogImage="/images/og/realizacja-<slug>.jpg"` w `<LajfLayout>`.
