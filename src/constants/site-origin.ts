/**
 * The site's origin, for the absolute URLs structured data needs, in places
 * that may not reach `config` — the design-system components, such as
 * `Breadcrumbs`. It reads the same `SITE_URL` as `config/env`, with the same
 * default; `config/env` is where the value is validated.
 *
 * Server-only in practice: `SITE_URL` is not exposed to the browser, so a
 * component reading this must render on the server (Breadcrumbs does).
 */
export const SITE_ORIGIN = (process.env.SITE_URL ?? 'http://localhost:3000').replace(/\/+$/, '');
