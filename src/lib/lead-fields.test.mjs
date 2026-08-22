/**
 * Testy mapowania pól zgłoszenia.
 *
 * Powód istnienia tego pliku: formularz kontaktowy wysyłał `typ`, `budzet`,
 * `termin` i `opis`, a backend czytał wyłącznie `name`, `email`, `message`
 * i `recording` — cztery z pięciu pól ginęły bez śladu i bez błędu.
 * Testy niżej pilnują, żeby to nie wróciło.
 */
import assert from 'node:assert/strict';
import test from 'node:test';

import { HONEYPOT_FIELD, buildLead, formLabelFor, isHoneypotTripped, isValidEmail } from './lead-fields.ts';

/** Dokładnie to, co wysyła formularz ze strony głównej. */
const ZGLOSZENIE_KONTAKT = {
  form: 'kontakt',
  typ: 'Gabinet medyczny',
  budzet: '5 000 – 10 000 zł',
  termin: 'Pilne (do 4 tyg.)',
  email: 'gabinet@example.pl',
  opis: 'gabinet stomatologiczny — strona + Wizytówka Google',
};

/** Dokładnie to, co wysyła formularz z landingu audytowego. */
const ZGLOSZENIE_AUDYT = {
  form: 'audyt',
  placowka: 'Przychodnia Zdrowie',
  www: 'https://przychodnia-zdrowie.pl',
  telefon: '600 100 200',
  email: 'kontakt@przychodnia-zdrowie.pl',
};

test('formularz kontaktowy nie gubi ani jednego pola', () => {
  const lead = buildLead(ZGLOSZENIE_KONTAKT);
  assert.ok(lead, 'zgłoszenie z poprawnym adresem musi się złożyć');

  const etykiety = lead.fields.map((pole) => pole.label);
  assert.deepEqual(etykiety, ['Typ projektu', 'Budżet', 'Termin', 'Opis']);

  const wartosci = lead.fields.map((pole) => pole.value);
  assert.deepEqual(wartosci, [
    'Gabinet medyczny',
    '5 000 – 10 000 zł',
    'Pilne (do 4 tyg.)',
    'gabinet stomatologiczny — strona + Wizytówka Google',
  ]);
});

test('formularz audytowy przenosi placówkę, adres i telefon', () => {
  const lead = buildLead(ZGLOSZENIE_AUDYT);
  assert.ok(lead);
  assert.deepEqual(lead.fields.map((pole) => pole.label), ['Placówka', 'Strona WWW', 'Telefon']);
  assert.equal(lead.fields[0].value, 'Przychodnia Zdrowie');
  assert.equal(lead.fields[2].value, '600 100 200');
});

test('pole dodane do formularza trafia do maila bez zmiany backendu', () => {
  // Sedno naprawy: nie ma listy pól „dozwolonych", więc nowe pole nie zniknie.
  const lead = buildLead({ ...ZGLOSZENIE_AUDYT, nowePoleKtoregoNiktNiePrzewidzial: 'wartość' });
  assert.ok(lead);
  const dodane = lead.fields.find((pole) => pole.label === 'nowePoleKtoregoNiktNiePrzewidzial');
  assert.ok(dodane, 'nieznane pole musi przejść, choćby pod własną nazwą');
  assert.equal(dodane.value, 'wartość');
});

test('adres i nazwa formularza nie dublują się w liście pól', () => {
  const lead = buildLead({ ...ZGLOSZENIE_KONTAKT, name: 'Anna Kowalska' });
  assert.ok(lead);
  assert.equal(lead.email, 'gabinet@example.pl');
  assert.equal(lead.name, 'Anna Kowalska');
  const etykiety = lead.fields.map((pole) => pole.label);
  assert.ok(!etykiety.includes('email') && !etykiety.includes('form') && !etykiety.includes('name'));
});

test('pola puste i same spacje nie robią pustych wierszy w mailu', () => {
  const lead = buildLead({ form: 'kontakt', email: 'a@b.pl', typ: '', budzet: '   ', opis: 'konkret' });
  assert.ok(lead);
  assert.deepEqual(lead.fields, [{ label: 'Opis', value: 'konkret' }]);
});

test('kolejność pól jest stała, niezależna od kolejności wysyłki', () => {
  const lead = buildLead({ form: 'audyt', email: 'a@b.pl', telefon: '600', www: 'x.pl', placowka: 'P' });
  assert.ok(lead);
  assert.deepEqual(lead.fields.map((pole) => pole.label), ['Placówka', 'Strona WWW', 'Telefon']);
});

test('zgłoszenie bez poprawnego adresu nie powstaje', () => {
  assert.equal(buildLead({ form: 'kontakt', email: 'to-nie-adres', opis: 'x' }), null);
  assert.equal(buildLead({ form: 'kontakt', opis: 'x' }), null);
});

test('adres jest sprawdzany tym samym testem co w formularzu', () => {
  assert.ok(isValidEmail('kontakt@lajf.eu'));
  assert.ok(!isValidEmail('kontakt@lajf'));
  assert.ok(!isValidEmail(''));
  assert.ok(!isValidEmail(undefined));
});

test('nazwa formularza tłumaczy się na etykietę, a nieznana zostaje jak jest', () => {
  assert.equal(formLabelFor('audyt'), 'Audyt cyfrowy placówki');
  assert.equal(formLabelFor('kontakt'), 'Kontakt');
  assert.equal(formLabelFor('lead-magnet'), 'Lead magnet (próbka)');
  assert.equal(formLabelFor(''), 'Kontakt');
  assert.equal(formLabelFor('nowy-formularz'), 'nowy-formularz');
});

test('pułapka na boty łapie wypełnione ukryte pole', () => {
  assert.ok(isHoneypotTripped({ ...ZGLOSZENIE_AUDYT, [HONEYPOT_FIELD]: 'bot tu był' }));
  assert.ok(isHoneypotTripped({ [HONEYPOT_FIELD]: { cokolwiek: true } }), 'nietekstowa wartość też jest podejrzana');
});

test('pułapka nie rusza człowieka, który zostawił ukryte pole puste', () => {
  assert.ok(!isHoneypotTripped(ZGLOSZENIE_AUDYT));
  assert.ok(!isHoneypotTripped({ ...ZGLOSZENIE_AUDYT, [HONEYPOT_FIELD]: '' }));
  assert.ok(!isHoneypotTripped({ ...ZGLOSZENIE_AUDYT, [HONEYPOT_FIELD]: '   ' }));
});

test('ukryte pole nigdy nie pokazuje się w mailu', () => {
  const lead = buildLead({ ...ZGLOSZENIE_AUDYT, [HONEYPOT_FIELD]: 'bot' });
  assert.ok(lead);
  assert.ok(!lead.fields.some((pole) => pole.label === HONEYPOT_FIELD));
});

test('bardzo długa wartość jest przycinana, nie przepuszczana w całości', () => {
  const lead = buildLead({ form: 'kontakt', email: 'a@b.pl', opis: 'x'.repeat(9000) });
  assert.ok(lead);
  assert.equal(lead.fields[0].value.length, 4000);
});

test('zalanie formularza setką pól nie tworzy maila bez końca', () => {
  const zalane = { form: 'kontakt', email: 'a@b.pl' };
  for (let i = 0; i < 100; i += 1) zalane[`pole${i}`] = 'x';
  const lead = buildLead(zalane);
  assert.ok(lead);
  assert.equal(lead.fields.length, 30);
});
