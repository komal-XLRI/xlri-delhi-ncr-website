import type { Metadata, Viewport } from 'next';
import { Source_Sans_3, Source_Serif_4 } from 'next/font/google';

import { SiteFooter } from '@/features/navigation/site-footer';
import { SiteHeader } from '@/features/navigation/site-header';
import { PREFERENCES_SCRIPT } from '@/features/preferences/preferences';
import { site } from '@/config/site';
import { buildMetadata } from '@/lib/seo/metadata';
import { brand } from '@/styles/tokens';
import '@/styles/globals.css';

/**
 * Typography.
 *
 * A serif display face paired with a neutral sans is the clearest signal that
 * separates an academic institution from a SaaS landing page. Source Serif 4 and
 * Source Sans 3 are a designed pair, both variable, both OFL-licensed.
 *
 * `next/font/google` downloads and self-hosts these at build time — there is no
 * runtime request to Google, so no third-party origin in the critical path and
 * no privacy question. `display: 'swap'` plus variable-font metrics keeps the
 * swap close to zero CLS.
 *
 * PROVISIONAL pending Q4 (typeface licensing). Swapping families means editing
 * these two imports; every consumer reads the CSS variables.
 */
const serif = Source_Serif_4({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-source-serif',
});

const sans = Source_Sans_3({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-source-sans',
});

export const metadata: Metadata = buildMetadata(site, {
  path: '/',
  description: site.description,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // Zoom is never disabled — WCAG 1.4.4, and a hard GIGW requirement.
  maximumScale: 5,
  // Read from the token source rather than pasted, so a palette change carries.
  themeColor: brand[800],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    /*
     * The font variable classes MUST be on <html>, not <body className="flex min-h-screen flex-col">. This is not a
     * style preference — putting them on <body className="flex min-h-screen flex-col"> silently breaks the entire
     * typographic identity, and does so without any error.
     *
     * Why: a custom property's value is substituted at the element where it is
     * *declared*, not where it is used. Tailwind's `@theme` declares
     * `--font-serif: var(--font-source-serif), ui-serif, Georgia, …` on :root.
     * If `--font-source-serif` is only defined on <body className="flex min-h-screen flex-col">, then at :root that
     * reference is invalid, which makes the whole declaration invalid at
     * computed-value time. CSS does *not* then fall through to `ui-serif` —
     * the property is simply dropped, and every heading inherits the default
     * sans-serif instead.
     *
     * The failure is entirely silent: no console error, no build warning, and
     * the page looks fine unless you know the headings are supposed to be a
     * serif. It shipped through typecheck, lint, and build before being caught
     * by looking at a screenshot. See ADR-0004.
     */
    <html
      lang="en-IN"
      className={`${serif.variable} ${sans.variable}`}
      /*
       * The pre-paint script stamps `data-js` and the stored display
       * preferences onto this element before React hydrates, so the DOM
       * legitimately differs from the server HTML by the time React looks at
       * it. Without this, every page load logs a hydration mismatch — noise
       * that trains developers to ignore the one warning that matters.
       *
       * Scoped to this element only: it suppresses the warning for <html>'s own
       * attributes, not for anything rendered inside it.
       */
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col">
        {/*
          Restores the stored text-size and contrast preferences before first
          paint, and stamps `data-js` so JS-only controls can render without
          causing a layout shift. Must be inline and synchronous — see
          features/preferences/preferences.ts for why.
        */}
        <script dangerouslySetInnerHTML={{ __html: PREFERENCES_SCRIPT }} />
        {/* WCAG 2.4.1 Bypass Blocks. First focusable element on every page. */}
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
