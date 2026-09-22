import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { adresPrzelacznika, alternatywy, tekstyChrome } from './chrome-tresci.ts';
import { LOCALES } from './i18n.ts';

describe('tekstyChrome', () => {
  it('ma komplet menu, CTA i kolumn stopki dla każdego języka', () => {
    for (const locale of LOCALES) {
      const teksty = tekstyChrome(locale);

      assert.ok(teksty.menu.length > 0, `puste menu dla ${locale}`);
      assert.ok(teksty.cta.label.length > 0, `pusty CTA dla ${locale}`);
      assert.equal(teksty.stopkaKolumny.length, 3, `inna liczba kolumn stopki dla ${locale}`);
    }
  });

  it('kieruje menu EN w obręb /en/, bo polskie pillary nie mają wersji angielskiej', () => {
    const wyjatki = tekstyChrome('en').menu.filter((poz) => !poz.href.startsWith('/en/'));

    assert.deepEqual(wyjatki, []);
  });

  it('buduje etykietę telefonu z przekazanego numeru', () => {
    assert.equal(tekstyChrome('pl').telefonAria('+48 880 133 640'), 'Zadzwoń: +48 880 133 640');
    assert.equal(tekstyChrome('en').telefonAria('+48 880 133 640'), 'Call us: +48 880 133 640');
  });
});

describe('alternatywy', () => {
  it('daje parę PL i EN dla strony głównej, niezależnie od ukośników w adresie', () => {
    for (const wejscie of ['/', '', '///']) {
      assert.deepEqual(alternatywy(wejscie), [
        { locale: 'pl', href: '/' },
        { locale: 'en', href: '/en/' },
      ]);
    }
  });

  it('rozpoznaje stronę angielską i wskazuje jej polski odpowiednik', () => {
    assert.deepEqual(alternatywy('/en'), [
      { locale: 'pl', href: '/' },
      { locale: 'en', href: '/en/' },
    ]);
  });

  it('nie wymyśla tłumaczenia dla stron istniejących tylko po polsku', () => {
    assert.deepEqual(alternatywy('/rodo-i-cyber/'), []);
    assert.deepEqual(alternatywy('/poradnik/piksel-meta-na-stronie-gabinetu/'), []);
  });
});

describe('adresPrzelacznika', () => {
  it('prowadzi do odpowiednika, gdy taki istnieje', () => {
    assert.equal(adresPrzelacznika('/', 'en'), '/en/');
    assert.equal(adresPrzelacznika('/en/', 'pl'), '/');
  });

  it('spada na stronę główną drugiego języka zamiast dawać martwy odnośnik', () => {
    assert.equal(adresPrzelacznika('/oprogramowanie/', 'en'), '/en/');
    assert.equal(adresPrzelacznika('/oprogramowanie/', 'pl'), '/');
  });
});
