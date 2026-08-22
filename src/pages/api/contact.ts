export const prerender = false;

import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { siteConfig } from '../../../site.config';
import { buildLead, isHoneypotTripped } from '../../lib/lead-fields';
import { renderAutoReplyEmail, renderNotificationEmail } from '../../lib/email-templates';

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

interface ResendMessage {
  from: string;
  to: string | string[];
  subject: string;
  html: string;
  reply_to?: string;
}

async function sendResendEmail(apiKey: string, message: ResendMessage): Promise<boolean> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
    body: JSON.stringify(message),
  });
  return res.ok;
}

export const POST: APIRoute = async ({ request }) => {
  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ error: { code: 'bad_request', message: 'Nieprawidłowe dane.' } }, 400);
  }

  // Bot dostaje tę samą odpowiedź co człowiek — inaczej od razu wie, że pułapka
  // istnieje, i przy następnej próbie ominie ukryte pole.
  if (isHoneypotTripped(payload)) {
    return json({ data: { ok: true } }, 200);
  }

  // Całe zgłoszenie idzie do maila, nie wybrane cztery pola. Powód i testy:
  // src/lib/lead-fields.ts oraz src/lib/lead-fields.test.mjs.
  const lead = buildLead(payload);
  if (!lead) {
    return json({ error: { code: 'invalid_email', message: 'Podaj poprawny adres e-mail.' } }, 422);
  }

  // Astro v6: sekrety/zmienne czytamy z modułu 'cloudflare:workers', nie z locals.runtime.
  const { RESEND_API_KEY, RESEND_FROM, LEAD_TO } = env;
  const apiKey = RESEND_API_KEY;
  const from = RESEND_FROM ?? `${siteConfig.brandName} <onboarding@resend.dev>`;
  // LEAD_TO może być listą adresów po przecinku — lead trafia do wszystkich.
  const to = (LEAD_TO ?? siteConfig.company.email)
    .split(',')
    .map((address) => address.trim())
    .filter(Boolean);

  if (!apiKey) {
    return json(
      { error: { code: 'not_configured', message: 'Wysyłka nie jest jeszcze skonfigurowana.' } },
      500
    );
  }

  // 1. Powiadomienie do właściciela — krytyczne (bez niego lead przepada).
  const notified = await sendResendEmail(apiKey, {
    from,
    to,
    reply_to: lead.email,
    subject: `Nowe zapytanie (${lead.formLabel}) — ${siteConfig.brandName}`,
    html: renderNotificationEmail(lead),
  });

  if (!notified) {
    return json(
      { error: { code: 'send_failed', message: 'Nie udało się wysłać. Spróbuj ponownie.' } },
      502
    );
  }

  // 2. Auto-odpowiedź do klienta — best-effort, nie blokuje sukcesu zgłoszenia.
  await sendResendEmail(apiKey, {
    from,
    to: lead.email,
    subject: `Dziękuję za wiadomość — ${siteConfig.brandName}`,
    html: renderAutoReplyEmail(lead),
  }).catch(() => false);

  return json({ data: { ok: true } }, 200);
};
