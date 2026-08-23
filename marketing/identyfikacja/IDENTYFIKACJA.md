# Lajf — identyfikacja wizualna

Wersja z 23.08.2026. Znak wyrasta z tego, co strona mówi od dawna: logotyp
w nagłówku to `Lajf` z kropką w kolorze akcentu. Kropka nie jest ozdobnikiem —
to jedyny element marki, który już dziś jest rozpoznawalny, więc identyfikacja
buduje się wokół niego.

**Myśl przewodnia.** Kropka to koniec linii pulsu. Puls mówi to samo, co obietnica
marki: coś jest pod stałą obserwacją i działa. Stąd „cyfrowa opieka nad Twoją firmą"
ma znak, a nie tylko zdanie.

## Pliki

| Plik | Rozmiar | Do czego |
|---|---|---|
| `logotyp-na-ciemne.png` | 2000×560 | **Podstawowy logotyp** na ciemnym tle: `Lajf` + puls + kropka |
| `logotyp-na-jasne.png` | 2000×560 | Ten sam logotyp na jasnym tle |
| `logo-na-ciemne.png` | 2000×560 | Wersja ze znakiem przed nazwą — gdy potrzebny mocniejszy sygnał (stopka, papier) |
| `logo-na-jasne.png` | 2000×560 | j.w. na jasnym tle |
| `znak-na-ciemne.png` | 1200×848 | Sam znak: L + puls + kropka |
| `znak-na-jasne.png` | 1200×848 | j.w. na jasnym tle |
| `sygnet.png` | 1024×1024 | Kafel do zastosowań kwadratowych |
| `avatar.png` | 2160×2160 | Awatar w social — znak na tle marki |
| `favicon.svg`, `favicon-180/32/16.png` | — | Ikona przeglądarki i ekranu telefonu |
| `zrodla/*.svg` | wektor | Znak w krzywych: wersja na ciemne, na jasne i jednokolorowa |

Rastry powstają z plików w `zrodla/` przez `bash buduj.sh`. Logotyp jest składany
z żywego kroju strony, nie z liter zamienionych na krzywe — dzięki temu nigdy się
nie rozjedzie z nagłówkiem serwisu.

## Kolory

| Rola | Wartość | Uwagi |
|---|---|---|
| Tło marki | `#070510` | Prawie czarny fiolet, tło strony |
| Atrament jasny | `#f4f1fb` | Napis i znak na ciemnym tle |
| Atrament ciemny | `#0c0a14` | Napis i znak na jasnym tle |
| Akcent | `#5b8cff` | Puls i kropka na ciemnym tle |
| Akcent głęboki | `#2f5fd0` | Puls i kropka na jasnym tle — jaśniejszy niebieski gubi się na bieli |
| Tekst drugorzędny | `#a8a2bd` | Podpisy, opisy |

**Czego nie używamy:** `#2969f1`. To kolor Moje RODO. Starsze logo Lajf z oknem
przeglądarki i trzema kropkami korzystało z niego i przez to obie marki wyglądały
jak jedna. Ten plik jest wycofany.

## Kroje

- **Space Grotesk** — logotyp, nagłówki, liczby. Waga 700 w logotypie, światło
  międzyliterowe `-0.035em`.
- **Inter** — tekst ciągły, interfejs.

Oba kroje są już w projekcie strony (`@fontsource-variable`), więc identyfikacja
nie dokłada żadnej licencji ani pobierania z zewnątrz.

## Zasady

- **Pole ochronne:** dookoła znaku zostaw pustą przestrzeń równą wysokości kropki.
  W logotypie liczy się od skrajnych punktów: lewej krawędzi „L" i prawej krawędzi kropki.
- **Minimalna wielkość:** logotyp 120 px szerokości na ekranie, 25 mm w druku.
  Poniżej używaj samego znaku, a poniżej 24 px — sygnetu.
- **Na zdjęciu:** wersja jasna na ciemnym kadrze, ciemna na jasnym. Jeśli kadr jest
  niejednolity, podłóż płytkę w kolorze tła marki zamiast pogrubiać znak.
- **Puls jest zawsze w akcencie**, nawet gdy napis jest jednokolorowy. Wyjątek to
  wersja jednokolorowa (`zrodla/znak-mono.svg`) — do tłoczenia, grawerunku i faksu
  sumienia, gdy kolor jest niedostępny.

### Czego nie robimy

- Nie rozciągamy i nie pochylamy znaku.
- Nie zamieniamy kropki na inny kształt ani nie odsuwamy jej od pulsu — odstęp
  między linią a kropką jest częścią rysunku.
- Nie kładziemy jasnej wersji na jasnym zdjęciu „bo widać". Nie widać.
- Nie dodajemy cieni, poświat ani obrysów.
- Nie piszemy nazwy inaczej niż `Lajf`. Nie „LAJF", nie „lajf", nie „Lajf.eu"
  w roli logotypu — domena to adres, nie marka.
