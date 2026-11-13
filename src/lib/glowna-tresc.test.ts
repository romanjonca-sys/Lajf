import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { describe, it } from 'node:test';

import {
  HERO_SLAJDY,
  HISTORIE,
  KATEGORIE_REALIZACJI,
  NieznanaKategoriaError,
  POZOSTALE,
  PYTANIA,
  REALIZACJE,
  WYROZNIONE,
  W_CENIE,
  realizacjeKategorii,
} from './glowna-tresc.ts';

describe('realizacjeKategorii', () => {
  it('zwraca tylko realizacje z danej kategorii', () => {
    // Arrange
    const kategoria = 'uslugi';

    // Act
    const wynik = realizacjeKategorii(kategoria);

    // Assert
    assert.ok(wynik.length > 0);
    assert.ok(wynik.every((r) => r.kategoria === kategoria));
  });

  it('suma kategorii daje całą listę', () => {
    const suma = Object.keys(KATEGORIE_REALIZACJI).reduce((n, k) => n + realizacjeKategorii(k).length, 0);
    assert.equal(suma, REALIZACJE.length);
  });

  it('rzuca NieznanaKategoriaError dla nieznanej kategorii', () => {
    assert.throws(() => realizacjeKategorii('sklepy'), NieznanaKategoriaError);
  });
});

describe('treść strony głównej', () => {
  it('wyróżnione realizacje istnieją i mają opublikowany opis', () => {
    for (const nazwa of WYROZNIONE) {
      const r = REALIZACJE.find((x) => x.nazwa === nazwa);
      assert.ok(r, `brak realizacji ${nazwa}`);
      assert.ok(r.href, `${nazwa} musi mieć link`);
    }
  });

  it('galeria pod przyciskiem nie powtarza wyróżnionych realizacji', () => {
    assert.ok(POZOSTALE.every((r) => !WYROZNIONE.includes(r.nazwa)));
    assert.equal(POZOSTALE.length + WYROZNIONE.length, REALIZACJE.length);
  });

  it('linki wewnętrzne realizacji prowadzą do /realizacje/', () => {
    const wewnetrzne = REALIZACJE.filter((r) => r.href && !r.href.startsWith('http'));
    assert.ok(wewnetrzne.every((r) => r.href?.startsWith('/realizacje/') && r.href.endsWith('/')));
  });

  it('warunki abonamentu są zgodne z umową: do 8 podstron i 1 h zmian', () => {
    assert.ok(W_CENIE.some((p) => p.includes('do 8')));
    assert.ok(W_CENIE.some((p) => p.includes('1 godziny zmian')));
    assert.ok(PYTANIA.some((p) => p.a.includes('Spłacasz pozostałe raty')));
  });
});

describe('HERO_SLAJDY', () => {
  it('każdy slajd ma zrzuty, które istnieją w /public, i co najmniej 2 kroki budowy', () => {
    for (const slajd of HERO_SLAJDY) {
      for (const plik of [slajd.komputer, slajd.telefon]) {
        assert.ok(existsSync(new URL(`../../public${plik}`, import.meta.url)), `brak pliku ${plik}`);
      }
      assert.ok(slajd.budowa.length >= 2, slajd.nazwa);
    }
  });

  it('brak zrzutu wykrywa się jako błąd', () => {
    assert.equal(existsSync(new URL('../../public/images/glowna/hero/nie-ma.webp', import.meta.url)), false);
  });
});

describe('HISTORIE', () => {
  it('każda historia ma zdjęcie w /public, link do realizacji i dwa pytania', () => {
    for (const h of HISTORIE) {
      assert.ok(existsSync(new URL(`../../public${h.obraz}`, import.meta.url)), `brak ${h.obraz}`);
      assert.ok(h.href.startsWith('/realizacje/'), h.nazwa);
      assert.equal(h.pytania.length, 2, h.nazwa);
    }
  });

  it('wykrywa brak zdjęcia historii', () => {
    assert.equal(existsSync(new URL('../../public/images/glowna/historie/nie-ma.webp', import.meta.url)), false);
  });
});
