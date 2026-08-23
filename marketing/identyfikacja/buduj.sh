#!/usr/bin/env bash
# Renderuje pliki identyfikacji Lajf ze źródeł w zrodla/.
#
#   bash marketing/identyfikacja/buduj.sh
#
# Rasteryzuje Chrome w trybie bez okna — dzięki temu logotyp powstaje z tego
# samego kroju, którego używa strona, i nie trzeba zamieniać liter na krzywe.
set -euo pipefail
cd "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
[ -x "$CHROME" ] || { echo "Brak Google Chrome — bez niego nie da się wyrenderować plików." >&2; exit 69; }

# Chrome bez okna potrafi się zawiesić przy współdzielonym profilu, więc każdy
# przebieg dostaje własny katalog roboczy i własny limit czasu.
render() {
  local zrodlo="$1" wynik="$2" szerokosc="$3" wysokosc="$4" zmienne="${5:-}"
  local profil="$PWD/.render-$RANDOM"
  mkdir -p "$profil"
  local plik="file://$PWD/zrodla/$zrodlo"
  [ -n "$zmienne" ] && plik="$plik?v=$zmienne"
  rm -f "$wynik"
  # Dwa przebiegi naraz kończą się tym, że drugi nie startuje i nie mówi dlaczego.
  pkill -9 -f "Google Chrome --headless" 2>/dev/null || true
  sleep 2
  # Chrome bez okna potrafi nie wystartować raz na kilka przebiegów i nie
  # zgłasza tego błędem, więc jedyną wiarygodną kontrolą jest istnienie pliku.
  for proba in 1 2 3; do
    ( "$CHROME" --headless --disable-gpu --no-sandbox --hide-scrollbars \
        --default-background-color=00000000 \
        --window-size="$szerokosc,$wysokosc" --user-data-dir="$profil-$proba" \
        --screenshot="$PWD/$wynik" "$plik" >/dev/null 2>&1 & )
    for _ in $(seq 1 15); do sleep 2; [ -f "$wynik" ] && break; done
    pkill -f "$profil-$proba" 2>/dev/null || true
    [ -f "$wynik" ] && break
  done
  rm -rf "$profil"-* 2>/dev/null || true
  [ -f "$wynik" ] || { echo "Nie udało się wyrenderować $wynik" >&2; exit 1; }
  echo "  $wynik (${szerokosc}x${wysokosc})"
}

echo "Identyfikacja Lajf — render"
render logotyp-na-ciemne.html logotyp-na-ciemne.png 2000 560
render logotyp-na-jasne.html  logotyp-na-jasne.png  2000 560
render lockup-na-ciemne.html  logo-na-ciemne.png   2000 560
render lockup-na-jasne.html   logo-na-jasne.png    2000 560
render znak-na-ciemne.html    znak-na-ciemne.png   1200 848
render znak-na-jasne.html     znak-na-jasne.png    1200 848
render kwadrat.html           sygnet.png           1024 1024
render awatar.html            avatar.png           2160 2160
# Chrome bez okna nie schodzi poniżej kilkuset pikseli, więc małe ikony
# powstają przez pomniejszenie kafla — sips jest w macOS od zawsze.
for rozmiar in 180 32 16; do
  cp sygnet.png "favicon-${rozmiar}.png"
  sips -z "$rozmiar" "$rozmiar" "favicon-${rozmiar}.png" >/dev/null
  echo "  favicon-${rozmiar}.png (${rozmiar}x${rozmiar})"
done
echo "Gotowe."
