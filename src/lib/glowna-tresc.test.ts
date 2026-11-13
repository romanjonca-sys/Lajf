import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { describe, it } from 'node:test';

import {
  SCENY,
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

describe('SCENY', () => {
  it('każda scena ma zdjęcie, 4 narożniki ekranu w obrębie zdjęcia i strony z istniejącymi zrzutami', () => {
    for (const sc of SCENY) {
      assert.ok(existsSync(new URL(`../../public${sc.foto}`, import.meta.url)), `brak ${sc.foto}`);
      assert.equal(sc.rogi.length, 4);
      assert.ok(sc.rogi.every(([x, y]) => x >= 0 && x <= 2600 && y >= 0 && y <= 1600));
      assert.ok(sc.strony.length >= 1);
      for (const st of sc.strony) assert.ok(existsSync(new URL(`../../public${st.obraz}`, import.meta.url)), `brak ${st.obraz}`);
    }
  });

  it('brak zrzutu strony wykrywa się jako błąd', () => {
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
