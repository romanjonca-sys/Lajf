import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { NieznanyJezykError, teksty } from './glowna-teksty.ts';

describe('teksty strony głównej', () => {
  it('EN ma tę samą liczbę pozycji co PL w cenniku, krokach, pytaniach i realizacjach', () => {
    const pl = teksty('pl');
    const en = teksty('en');
    assert.equal(en.wCenie.length, pl.wCenie.length);
    assert.equal(en.kroki.length, pl.kroki.length);
    assert.equal(en.pytania.length, pl.pytania.length);
    assert.equal(en.realizacje.length, pl.realizacje.length);
  });

  it('EN ma angielski opis każdej realizacji i cenę w euro', () => {
    const en = teksty('en');
    const pl = teksty('pl');
    en.realizacje.forEach((r, i) => assert.notEqual(r.opis, pl.realizacje[i].opis, r.nazwa));
    assert.ok(en.kwotaPrzed.includes('€'));
  });

  it('rzuca NieznanyJezykError dla nieobsługiwanego języka', () => {
    assert.throws(() => teksty('de'), NieznanyJezykError);
  });
});
