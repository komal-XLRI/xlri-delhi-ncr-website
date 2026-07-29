import NextLink from 'next/link';

import { MenuIcon, SearchIcon } from '@/components/ui/icon';
import { Link } from '@/components/ui/link';
import { PRIMARY_NAV, UTILITY_NAV } from '@/config/navigation';
import { site } from '@/config/site';
import { PreferenceControls } from '@/features/preferences/preference-controls';
import { AccreditationLogos } from '@/features/navigation/accreditation-lockup';
import { MegaMenuPanel } from '@/features/navigation/mega-menu-panel';
import { MobileNavEnhancer } from '@/features/navigation/mobile-nav';
import { NoticeMarquee } from '@/features/navigation/notice-marquee';
import { PrimaryNav } from '@/features/navigation/primary-nav';
import { SiteWordmark } from '@/features/navigation/site-wordmark';
import type { NavNode } from '@/types/navigation';

/**
 * The three-layer site header — a Server Component.
 *
 *   Layer 1  masthead: XLRI wordmark left, accreditation marks right
 *   Layer 2  primary navigation, centred, with search and display preferences
 *   Layer 3  notices ticker
 *
 * Layer 1 is deliberately quiet — two marks and nothing else. Audience shortcuts
 * (Students, Alumni, Recruiters, Giving) previously sat here and have moved to
 * the footer, where they remain one scroll away. The masthead is the most
 * valuable block of pixels on the site, and a row of small links competing with
 * the wordmark spent it badly.
 *
 * Original Layer 2 note, retained: primary navigation, eight items (D4)
 * Layer 3  mega-menu panels, all present in the HTML from first byte (§8.2)
 *
 * Only `PrimaryNav`, `MobileNav`, and `PreferenceControls` are client
 * components; each panel is built here on the server and handed across the
 * boundary as a prop, so panel markup never reaches the browser as JavaScript.
 *
 * The header is `sticky` with a reserved height rather than `fixed` with padding
 * compensation on the body — the latter is the usual source of the "content
 * hides under the header" bug on anchor navigation.
 */

/**
 * Mobile tree, server-rendered from the same source as the desktop menu.
 *
 * Built on native `<details>` so it is fully operable before hydration and with
 * JavaScript disabled — which is what makes the whole navigation a genuine no-JS
 * fallback rather than a claim.
 */
function MobileNavSheet() {
  return (
    /*
      A native <details> disclosure, rendered on the server. It opens, closes,
      and is keyboard operable with no JavaScript — so the navigation works
      before hydration and with JS disabled. MobileNavEnhancer layers scroll
      lock, `inert`, and focus management on top; if it never loads, nothing
      here breaks.
    */
    <details id="mobile-nav" className="mobile-nav lg:hidden">
      <summary
        aria-label="Menu"
        className="-mr-2 inline-flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-sm text-ink-strong hover:text-brand [&::-webkit-details-marker]:hidden"
      >
        <span className="mobile-nav-closed">
          <MenuIcon size={22} />
        </span>
        <span className="mobile-nav-open">
          <svg
            width={22}
            height={22}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </span>
      </summary>

      <div className="mobile-nav-sheet">
        <nav aria-label="Primary (mobile)" className="px-6 py-4">
          <ul className="divide-y divide-border">
            {PRIMARY_NAV.map((item) => (
              <li key={`m-${item.id}`}>
                {item.children ? (
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-lg font-medium text-ink-strong [&::-webkit-details-marker]:hidden">
                      {item.label}
                      <span
                        aria-hidden="true"
                        className="text-xl text-brand transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <div className="pb-4">
                      {item.children.map((section: NavNode) => (
                        <div key={`m-${section.id}`} className="mb-5">
                          {/* Matches the desktop panel treatment — serif title
                              over a short accent rule — so the two renderings of
                              the same tree read as the same thing. */}
                          <h3 className="font-serif text-base leading-snug text-ink-strong">
                            {section.label}
                          </h3>
                          <span
                            aria-hidden="true"
                            className="mt-2 mb-3 block h-[3px] w-7 bg-accent-surface"
                          />
                          <ul className="space-y-1">
                            {section.children?.map((child) => (
                              <li key={`m-${child.id}`}>
                                <Link
                                  href={child.href ?? '#'}
                                  siteUrl={site.url}
                                  variant="standalone"
                                  className="block py-1.5 text-base text-ink"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </details>
                ) : (
                  <NextLink
                    href={item.href ?? '#'}
                    className="block py-4 text-lg font-medium text-ink-strong"
                  >
                    {item.label}
                  </NextLink>
                )}
              </li>
            ))}
          </ul>

          <NextLink
            href="/search"
            className="mt-6 flex items-center gap-2 border-t border-border pt-6 text-base font-medium text-ink-strong"
          >
            <SearchIcon size={18} />
            Search this site
          </NextLink>

          <ul className="mt-6 space-y-2 border-t border-border pt-6">
            {UTILITY_NAV.map((item) => (
              <li key={`m-${item.id}`}>
                <Link href={item.href} siteUrl={site.url} variant="standalone" className="text-sm">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </details>
  );
}

export function SiteHeader() {
  const entries = PRIMARY_NAV.map((item) => ({
    id: item.id,
    label: item.label,
    ...(item.href ? { href: item.href } : {}),
    // Server-rendered here, passed as a prop. Never enters the client bundle.
    ...(item.children ? { panel: <MegaMenuPanel item={item} /> } : {}),
  }));

  return (
    <header className="site-header sticky top-0 z-50 border-b border-border bg-surface">
      {/* ---------- Layer 1: masthead ----------
          Wordmark left; accreditation marks, display preferences and search
          right. The audience shortcuts that used to live here (Students,
          Alumni, Recruiters, Giving) have moved to the footer — the masthead is
          the most valuable block of pixels on the site and a row of small links
          competing with the wordmark spent it badly. */}
      <div className="border-b border-border">
        <div className="mx-auto flex w-full max-w-[80rem] items-center justify-between gap-8 px-6 py-4 md:px-8 lg:px-12">
          <SiteWordmark height={44} />

          <div className="flex items-center gap-6">
            <AccreditationLogos className="hidden md:flex" />

            <span aria-hidden="true" className="hidden h-7 w-px bg-border xl:block" />

            <PreferenceControls className="hidden xl:flex" />

            {/*
              Present at every width. Below lg the label collapses to
              `sr-only`, leaving an icon-only control that keeps its accessible
              name — search is a primary way into a site this size and must not
              disappear on a phone.
            */}
            <NextLink
              href="/search"
              className="inline-flex h-11 items-center gap-2 rounded-sm text-xs font-medium text-ink-strong transition-colors hover:text-brand lg:h-9 lg:border lg:border-border lg:px-3 lg:hover:border-brand"
            >
              <SearchIcon size={18} />
              <span className="sr-only lg:not-sr-only">Search</span>
            </NextLink>

            <MobileNavSheet />
            <MobileNavEnhancer detailsId="mobile-nav" />
          </div>
        </div>
      </div>

      {/* ---------- Layer 2: primary navigation ----------
          No wordmark rides along here when the masthead collapses, and it is
          not for want of trying. Measured at 1440, 1360 and 1280, a 26px mark
          at the row's left edge overlapped "About" by 50px at every width —
          the eight items are centred but they very nearly fill the measure, so
          "About" begins about 13px inside the container. There is no space to
          put anything beside them. The wordmark returns the moment the reader
          scrolls back to the top.
          The navigation has this row to itself, which is what lets it sit at the
          true centre. Measured: eight items need 955px, and the search and
          preference controls another 229px — together exactly the 1184px
          available at 1280px, and overflowing at 1024px. Sharing the row would
          have meant either an off-centre menu or a horizontal scrollbar on a
          laptop. Those controls sit in Layer 1 instead. */}
      <div className="relative hidden bg-nav-surface lg:block">
        <div className="mx-auto flex w-full max-w-[80rem] justify-center px-6 md:px-8 lg:px-12">
          <PrimaryNav items={entries} />
        </div>
      </div>

      {/* ---------- Layer 3: notices ticker ---------- */}
      <NoticeMarquee />
    </header>
  );
}
