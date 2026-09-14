export const prerender = true;

import type { APIRoute } from 'astro';

import { siteConfig } from '../../site.config';
import { ARTYKULY } from '../lib/artykuly';
import { zbudujLlmsTxt } from '../lib/llms-txt';

/** /llms.txt dla modeli językowych. Treść składa src/lib/llms-txt.ts. */
export const GET: APIRoute = ({ site }) => {
  const { company } = siteConfig;
  const tekst = zbudujLlmsTxt({
    siteHref: (site ?? new URL('https://lajf.eu')).href,
    legalName: company.legalName,
    email: company.email,
    phone: company.phone,
    artykuly: ARTYKULY,
  });

  return new Response(tekst, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
};
