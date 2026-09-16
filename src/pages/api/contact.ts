export const prerender = false;

import type { APIRoute } from 'astro';

/**
 * ⚠️ TEN ENDPOINT NIE OBSŁUGUJE FORMULARZY NA lajf.eu. ⚠️
 *
 * Formularze idą do osobnego Workera `lajf-contact`
 * (repozytorium: ~/Desktop/APLIKACJE/lajf-contact, plik `src/index.js`),
 * który ma trasę `lajf.eu/api/*` w Cloudflare. Trasa Workera wyprzedza
 * Cloudflare Pages, więc żądanie NIGDY nie dociera do tego pliku.
 *
 * Dlaczego to tu w ogóle stoi: kiedyś była tu pełna implementacja wysyłki.
 * Wyglądała jak działający endpoint i doprowadziła do błędnej diagnozy —
 * „naprawy" formularza robionej w warstwie, przez którą nie płynie ruch.
 * Plik zostaje jako ostrzeżenie, a nie jako kod do rozwijania.
 *
 * Jeśli zmieniasz obsługę formularza — rób to w `lajf-contact/src/pola.js`
 * (które pola wchodzą do maila) albo `lajf-contact/src/index.js` (wysyłka).
 *
 * Odpowiedź 503 jest celowa: gdyby trasa Workera kiedyś zniknęła, formularz
 * pokaże czytelny błąd zamiast po cichu gubić zgłoszenie.
 */
export const POST: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      error: {
        code: 'wrong_layer',
        message: 'Wysyłka jest chwilowo niedostępna. Napisz na kontakt@lajf.eu albo zadzwoń: +48 880 133 640.',
      },
    }),
    { status: 503, headers: { 'content-type': 'application/json' } }
  );
};
