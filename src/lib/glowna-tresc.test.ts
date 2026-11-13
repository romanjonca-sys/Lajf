import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  KATEGORIE_REALIZACJI,
  NieznanaKategoriaError,
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
