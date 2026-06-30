export const prerender = false;

import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { siteConfig } from '../../../site.config';
import { renderAutoReplyEmail, renderNotificationEmail, type LeadData } from '../../lib/email-templates';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LEN = 4000;

interface FormPayload {
  form?: string;
  name?: string;
  email?: string;
  message?: string;
  recording?: string;
}

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

function clean(value: unknown): string {
  return typeof value === 'string' ? value.trim().slice(0, MAX_LEN) : '';
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
  let payload: FormPayload;
  try {
    payload = (await request.json()) as FormPayload;
  } catch {
    return json({ error: { code: 'bad_request', message: 'Nieprawidłowe dane.' } }, 400);
  }

  const email = clean(payload.email);
  if (!EMAIL_RE.test(email)) {
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

  const formLabel = payload.form === 'lead-magnet' ? 'Lead magnet (próbka)' : 'Kontakt';
  const lead: LeadData = {
    email,
    formLabel,
    name: clean(payload.name) || undefined,
    message: clean(payload.message) || undefined,
    recording: clean(payload.recording) || undefined,
  };

  // 1. Powiadomienie do właściciela — krytyczne (bez niego lead przepada).
  const notified = await sendResendEmail(apiKey, {
    from,
    to,
    reply_to: email,
    subject: `Nowe zapytanie (${formLabel}) — ${siteConfig.brandName}`,
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
    to: email,
    subject: `Dziękuję za wiadomość — ${siteConfig.brandName}`,
    html: renderAutoReplyEmail(lead),
  }).catch(() => false);

  return json({ data: { ok: true } }, 200);
};
