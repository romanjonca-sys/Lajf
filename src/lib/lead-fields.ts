/**
 * Mapowanie surowego zgłoszenia z formularza na dane do maila.
 *
 * Formularze na stronie wysyłają CAŁY swój FormData (patrz `data-engine-form`
 * w lajf-layout.astro), a każdy ma inne pola: kontaktowy pyta o typ, budżet i
 * termin, audytowy o placówkę i telefon. Wcześniej backend czytał sztywną listę
 * czterech nazw, więc wszystko spoza niej ginęło po cichu — zgłoszenie z
 * formularza kontaktowego docierało jako sam adres e-mail.
 *
 * Dlatego tu nie ma listy pól „do przepisania". Jest odwrotnie: przechodzi
 * WSZYSTKO, co przyszło, a słownik poniżej służy tylko do nadania ładnych
 * etykiet i sensownej kolejności. Nowe pole w formularzu pojawi się w mailu
 * samo, nawet jeśli nikt nie ruszy tego pliku.
 */

/** Pojedynczy wiersz w mailu: etykieta i wartość. */
export interface LeadField {
  label: string;
  value: string;
}

export interface Lead {
  email: string;
  formLabel: string;
  name?: string;
  /** Pozostałe pola zgłoszenia, w kolejności do wyświetlenia. */
  fields: LeadField[];
}

/** Górny limit długości pojedynczej wartości — zabezpieczenie przed zalaniem maila. */
const MAX_VALUE_LENGTH = 4000;

/** Ile pól najwyżej przepuszczamy, żeby bot nie wygenerował maila bez końca. */
const MAX_FIELDS = 30;

/**
 * Ukryte pole-pułapka. Człowiek go nie widzi (schowane CSS-em), więc zostaje
 * puste; automat wypełniający wszystko po kolei je uzupełni i tym się zdradzi.
 * Nazwa zaczyna się od podkreślnika, żeby nigdy nie kolidowała z prawdziwym polem.
 */
export const HONEYPOT_FIELD = '_gotcha';

/** Pola techniczne — nie trafiają do treści maila. */
const SKIPPED_FIELDS = new Set(['form', 'email', 'name', HONEYPOT_FIELD]);

/** Etykiety znanych pól. Czego tu nie ma, dostaje własną nazwę jako etykietę. */
const FIELD_LABELS: Record<string, string> = {
  placowka: 'Placówka',
  www: 'Strona WWW',
  telefon: 'Telefon',
  typ: 'Typ projektu',
  budzet: 'Budżet',
  termin: 'Termin',
  opis: 'Opis',
  message: 'Wiadomość',
  recording: 'Załącznik',
};

/**
 * Kolejność pól w mailu — od tego, co najbardziej przydaje się przy oddzwanianiu.
 * Pola spoza listy lądują na końcu, w kolejności nadejścia.
 */
const FIELD_ORDER = ['placowka', 'www', 'telefon', 'typ', 'budzet', 'termin', 'opis', 'message', 'recording'];

/** Nazwy formularzy widoczne w temacie i nagłówku maila. */
const FORM_LABELS: Record<string, string> = {
  kontakt: 'Kontakt',
  audyt: 'Audyt cyfrowy placówki',
  'lead-magnet': 'Lead magnet (próbka)',
  contact: 'Kontakt',
  'hero-lead': 'Kontakt (hero)',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: unknown): boolean {
  return typeof value === 'string' && EMAIL_PATTERN.test(value.trim());
}

export function clean(value: unknown): string {
  return typeof value === 'string' ? value.trim().slice(0, MAX_VALUE_LENGTH) : '';
}

/**
 * Czy zgłoszenie wpadło w pułapkę na boty. Wypełnione ukryte pole = automat.
 * Wartości innych typów niż tekst też traktujemy jako podejrzane — prawdziwy
 * formularz zawsze wysyła napis.
 */
export function isHoneypotTripped(payload: Record<string, unknown>): boolean {
  const value = payload[HONEYPOT_FIELD];
  if (value === undefined || value === null) return false;
  return typeof value === 'string' ? value.trim().length > 0 : true;
}

export function formLabelFor(form: unknown): string {
  const key = clean(form);
  return FORM_LABELS[key] ?? (key || 'Kontakt');
}

/**
 * Składa zgłoszenie z surowego payloadu. Zwraca null, gdy brakuje poprawnego
 * adresu — bez niego nie ma do kogo odpisać, więc lead jest bezużyteczny.
 */
export function buildLead(payload: Record<string, unknown>): Lead | null {
  const email = clean(payload.email);
  if (!isValidEmail(email)) return null;

  const wpisy = Object.entries(payload)
    .filter(([key]) => !SKIPPED_FIELDS.has(key))
    .map(([key, value]) => ({ key, value: clean(value) }))
    .filter((entry) => entry.value.length > 0);

  wpisy.sort((a, b) => pozycja(a.key) - pozycja(b.key));

  return {
    email,
    formLabel: formLabelFor(payload.form),
    name: clean(payload.name) || undefined,
    fields: wpisy.slice(0, MAX_FIELDS).map((entry) => ({
      label: FIELD_LABELS[entry.key] ?? entry.key,
      value: entry.value,
    })),
  };
}

/** Pola nieznane trafiają na koniec, ale zachowują kolejność względem siebie. */
function pozycja(key: string): number {
  const index = FIELD_ORDER.indexOf(key);
  return index === -1 ? FIELD_ORDER.length : index;
}
