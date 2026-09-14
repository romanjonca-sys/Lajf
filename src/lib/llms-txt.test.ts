import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { ARTYKULY } from './artykuly.ts';
import { zbudujLlmsTxt } from './llms-txt.ts';

const DANE = {
  siteHref: 'https://lajf.eu/',
  legalName: 'Lajf sp. z o.o.',
  email: 'kontakt@lajf.eu',
  phone: '+48 880 133 640',
  artykuly: ARTYKULY,
};

describe('zbudujLlmsTxt', () => {
  it('zaczyna się nagłówkiem H1 i streszczeniem w cytacie, jak wymaga llmstxt.org', () => {
    const linie = zbudujLlmsTxt(DANE).split('\n');

    assert.equal(linie[0], '# Lajf');
    assert.match(linie[2], /^> Lajf sp\. z o\.o\. /);
  });

  it('podaje kontakt z danych firmy', () => {
    const tekst = zbudujLlmsTxt(DANE);

    assert.ok(tekst.includes('Kontakt: kontakt@lajf.eu, +48 880 133 640.'));
  });

  it('linkuje każdy artykuł poradnika pełnym adresem', () => {
    const tekst = zbudujLlmsTxt(DANE);

    for (const a of ARTYKULY) assert.ok(tekst.includes(`(https://lajf.eu/poradnik/${a.slug}/): ${a.description}`), a.slug);
  });

  it('nie zawiera długiej pauzy ani przecinka przed „i”', () => {
    assert.doesNotMatch(zbudujLlmsTxt(DANE), /—|, (i|oraz|a także) /);
  });

  it('rzuca TypeError, gdy adres strony jest nieprawidłowy', () => {
    assert.throws(() => zbudujLlmsTxt({ ...DANE, siteHref: 'nie-adres' }), TypeError);
  });
});
