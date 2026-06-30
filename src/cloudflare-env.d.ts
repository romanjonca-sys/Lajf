/**
 * Typy dla modułu runtime Cloudflare Workers (Astro v6).
 * Deklaruje sekrety/zmienne odczytywane przez `import { env } from 'cloudflare:workers'`.
 * Wartości pochodzą z `wrangler secret put` (RESEND_API_KEY, LEAD_TO) i domyślnych.
 */
declare module 'cloudflare:workers' {
  export const env: {
    RESEND_API_KEY?: string;
    RESEND_FROM?: string;
    LEAD_TO?: string;
  };
}
