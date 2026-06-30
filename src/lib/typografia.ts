/**
 * Polska typografia: jednoliterowe spójniki/przyimki (a, i, o, u, w, z) nie
 * mogą wisieć na końcu wiersza — przyklejamy je do następnego słowa twardą
 * spacją (NBSP). Używane na tekstach z frontmatera (tytuły, opisy).
 */
const ORPHAN_RE = /(^|[\s(„"–—-])([aiouwzAIOUWZ])\s+/g;
const NBSP = ' ';

export function glueOrphans(text: string): string {
  return text.replace(ORPHAN_RE, (_m, before: string, letter: string) => before + letter + NBSP);
}
