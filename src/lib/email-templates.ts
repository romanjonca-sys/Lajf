/**
 * Szablony e-mail (HTML, inline CSS — wymóg klientów pocztowych).
 * Dwa maile: powiadomienie do właściciela + auto-odpowiedź do klienta.
 * Branding sterowany przez site.config (brandName, akcent z var akcentu skóry).
 */
import { siteConfig } from '../../site.config';

const ACCENT = '#2969f1';
const INK = '#0f0f10';
const MUTED = '#6b6b70';
const BORDER = '#e6e6e9';

export interface LeadData {
  name?: string;
  email: string;
  message?: string;
  recording?: string;
  formLabel: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Wspólny wrapper: nagłówek marki + treść + stopka. */
function layout(innerHtml: string, preheader: string): string {
  const { brandName, company, socials } = siteConfig;
  const socialLinks: string[] = [];
  if (socials.instagram) socialLinks.push(`<a href="${socials.instagram}" style="color:${MUTED};text-decoration:none;">Instagram</a>`);
  if (socials.facebook) socialLinks.push(`<a href="${socials.facebook}" style="color:${MUTED};text-decoration:none;">Facebook</a>`);

  return `<!doctype html>
<html lang="pl">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <span style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid ${BORDER};">
        <tr>
          <td style="background:${INK};padding:22px 32px;">
            <span style="font-size:19px;font-weight:800;letter-spacing:-0.01em;color:#ffffff;">${escapeHtml(brandName)}</span>
          </td>
        </tr>
        <tr><td style="padding:32px;">${innerHtml}</td></tr>
        <tr>
          <td style="padding:24px 32px;border-top:1px solid ${BORDER};background:#fafafa;">
            <p style="margin:0 0 6px;font-size:13px;color:${MUTED};">
              <strong style="color:${INK};">${escapeHtml(brandName)}</strong><br>
              <a href="mailto:${company.email}" style="color:${MUTED};text-decoration:none;">${company.email}</a> · ${company.phone}
            </p>
            ${socialLinks.length ? `<p style="margin:8px 0 0;font-size:13px;">${socialLinks.join(' &nbsp;·&nbsp; ')}</p>` : ''}
          </td>
        </tr>
      </table>
      ${siteConfig.credit ? `<p style="margin:16px 0 0;font-size:11px;color:#a0a0a8;">Realizacja: <a href="${siteConfig.credit.url}" style="color:#a0a0a8;">${siteConfig.credit.name}</a></p>` : ''}
    </td></tr>
  </table>
</body>
</html>`;
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid ${BORDER};font-size:13px;color:${MUTED};width:120px;vertical-align:top;">${label}</td>
    <td style="padding:10px 0;border-bottom:1px solid ${BORDER};font-size:15px;color:${INK};">${value}</td>
  </tr>`;
}

/** Powiadomienie do właściciela — nowy lead. */
export function renderNotificationEmail(data: LeadData): string {
  const { brandName } = siteConfig;
  const rows: string[] = [];
  if (data.name) rows.push(row('Imię', escapeHtml(data.name)));
  rows.push(row('E-mail', `<a href="mailto:${escapeHtml(data.email)}" style="color:${INK};">${escapeHtml(data.email)}</a>`));
  if (data.recording) rows.push(row('Załącznik', `<a href="${escapeHtml(data.recording)}" style="color:${ACCENT};">${escapeHtml(data.recording)}</a>`));
  if (data.message) rows.push(row('Wiadomość', escapeHtml(data.message).replace(/\n/g, '<br>')));

  const inner = `
    <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:${ACCENT};text-transform:uppercase;letter-spacing:0.06em;">${escapeHtml(data.formLabel)}</p>
    <h1 style="margin:0 0 20px;font-size:22px;font-weight:800;color:${INK};letter-spacing:-0.01em;">Nowe zapytanie z ${escapeHtml(brandName)}</h1>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows.join('')}</table>
    <p style="margin:24px 0 0;font-size:13px;color:${MUTED};">Odpowiedz bezpośrednio na tego maila — trafi do nadawcy (reply-to ustawiony).</p>`;
  return layout(inner, `Nowe zapytanie od ${data.name ?? data.email}`);
}

/** Auto-odpowiedź do klienta — potwierdzenie. */
export function renderAutoReplyEmail(data: LeadData): string {
  const { brandName, company } = siteConfig;
  const greeting = data.name ? `Cześć ${escapeHtml(data.name.split(' ')[0])},` : 'Cześć,';
  const inner = `
    <h1 style="margin:0 0 16px;font-size:22px;font-weight:800;color:${INK};letter-spacing:-0.01em;">Dziękuję za wiadomość</h1>
    <p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:${INK};">${greeting}</p>
    <p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:${INK};">
      Dostałem Twoje zapytanie i odezwę się najszybciej, jak się da — zwykle tego samego dnia.
      Jeśli sprawa jest pilna, możesz też zadzwonić: <strong>${company.phone}</strong>.
    </p>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:${INK};">
      Do usłyszenia,<br><strong>${escapeHtml(brandName)}</strong>
    </p>
    <div style="padding:16px 20px;background:#f5f7fb;border-left:3px solid ${ACCENT};border-radius:8px;">
      <p style="margin:0;font-size:13px;color:${MUTED};line-height:1.5;">
        To wiadomość automatyczna potwierdzająca, że Twoje zapytanie dotarło. Nie odpowiadaj na nią —
        napiszę do Ciebie osobiście.
      </p>
    </div>`;
  return layout(inner, 'Dostałem Twoją wiadomość — odezwę się wkrótce.');
}
