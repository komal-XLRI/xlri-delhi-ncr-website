# 1. Static-first rendering, not SSR-first

**Status:** Accepted · **Date:** 2026-07-26 · **Supersedes:** the brief's "SSR wherever possible"

## Context

The original brief asked for server-side rendering wherever possible. The content
audit (architecture §16) found 205 URLs across three profiles — institutional
pages changing weekly, structured directories changing monthly, and a publishing
stream that is currently near-dormant (10 posts, 42 events).

Effectively nothing on this site varies per request.

## Decision

Static generation by default, with on-demand revalidation triggered by CMS
publish webhooks. SSR only where a response genuinely depends on the request.

## Rationale

SSR pays a rendering cost on every hit and puts a server in the critical path of
TTFB. For content that changes weekly, that cost buys nothing. Prerendered HTML
from a CDN edge gives roughly 20–50ms TTFB against 200–600ms for SSR, and it
keeps serving when the backend is down.

Both are equally indexable — Google indexes the HTML it receives and does not
care how it was produced.

The freshness objection is answered by on-demand revalidation: publish → webhook
→ `revalidateTag`. That gives instant updates _and_ static delivery, which is
strictly better than either short ISR windows (constant pointless regeneration)
or SSR (per-request cost forever).

This matters more than usual under ADR-0003's self-hosting decision: on our own
infrastructure, every SSR request is capacity we have to provision.

## Consequences

- Route-level strategy is documented in architecture §4 and must be revisited
  whenever a genuinely request-dependent feature appears.
- Requires the revalidation webhook (`/api/revalidate`) and a shared cache once
  more than one instance runs — see §13.1.
- The current site's 1.38s TTFB is the baseline this replaces.
