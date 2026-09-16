import type { CompanyInfo } from '../../site.config';

/**
 * Dane rejestrowe podmiotu bez nazwy — adres, sąd i KRS, NIP, kapitał zakładowy.
 * Spółka kapitałowa musi je podawać na stronie internetowej i w pismach
 * handlowych (art. 206 §1 KSH); dla podmiotu bez wpisu do KRS wypadają
 * pozycje, których nie ma.
 *
 * Nazwę renderuje strona wywołująca, bo raz jest w `<strong>`, a raz w zwykłym tekście.
 */
export function daneRejestrowe(company: CompanyInfo): string {
  const czesci = [
    company.address,
    company.krs && company.registryCourt ? `${company.registryCourt}, KRS ${company.krs}` : null,
    company.taxId ? `NIP ${company.taxId}` : null,
    company.regon ? `REGON ${company.regon}` : null,
    company.shareCapital ? `kapitał zakładowy ${company.shareCapital}` : null,
  ];

  return czesci.filter((czesc): czesc is string => Boolean(czesc)).join(', ');
}
