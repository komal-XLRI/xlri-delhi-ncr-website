import Image from 'next/image';
import NextLink from 'next/link';

import { ArrowRightIcon, SearchIcon } from '@/components/ui/icon';
import { Container } from '@/components/layout/container';
import { Link } from '@/components/ui/link';
import { PRIMARY_NAV } from '@/config/navigation';
import { site } from '@/config/site';
import { OpenSearchButton } from '@/features/search/site-search';

/**
 * 404.
 *
 * ## What a 404 is for
 *
 * Not apologising. Somebody arrived here from a stale link, an old bookmark, a
 * mistyped address or a search result that outlived its page — and the only
 * thing they want is the page they were looking for. So this is mostly a set of
 * routes onward, and the "not found" part is one line.
 *
 * The destinations come from `PRIMARY_NAV`, the same tree the header, the
 * mega menu and the footer are built from (§8.1). That is the fifth consumer,
 * and it means this page cannot come to list sections the site no longer has —
 * a broken link on the page you land on *because* of a broken link would be a
 * poor joke.
 *
 * ## Why search is a button and not a box
 *
 * Search lives in the header, as a panel under its Search button; there is no
 * results page. "Search the site" here opens that same panel rather than
 * duplicating it, so there is one search on the site and it behaves the same
 * everywhere.
 *
 * ## Heading level
 *
 * A real `h1`. This is the page's own document, not a fragment inside another
 * one, and a 404 with no `h1` is a page a screen reader cannot summarise.
 *
 * ## The picture is the gateway, and that is not arbitrary
 *
 * Of the six campus photographs in the repository this is the one of the
 * entrance — the approach road up to the gate. On the one page whose whole
 * subject is a reader who has lost their way, a picture of the way in is worth
 * more than a picture of a building.
 *
 * It is `lg` and up only. On a phone it would push four columns of genuinely
 * useful links below the fold to show scenery.
 *
 * ## Status code
 *
 * Next serves this with a genuine HTTP 404 — it is `not-found.tsx`, not a route
 * called `/404`. That distinction matters for search engines: a "soft 404"
 * returning 200 gets the missing URL indexed as a real page.
 */
export default function NotFound() {
  /* Four is enough to be useful and few enough to scan. The tree's order is
     the institution's own priority, so the first four are the right four. */
  const destinations = PRIMARY_NAV.slice(0, 4);

  return (
    <main id="main" className="notfound-band relative isolate py-20 md:py-24 lg:py-28">
      <Container className="relative">
        {/*
          The numeral, set enormous and almost invisible behind the heading.

          A 404 page traditionally shouts the number; this one uses it as
          ground. At 4% of the brand blue it is texture rather than content —
          which is why it is `aria-hidden` and absolutely positioned: it must
          add nothing to the document and nothing to the layout.
        */}
        <span aria-hidden="true" className="notfound-ghost">
          404
        </span>

        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-7">
            <p className="section-eyebrow">Error 404</p>

            <h1 className="section-heading mt-5">This page could not be found</h1>

            <p className="prose-justify mt-6 max-w-[34rem] text-lg leading-relaxed text-ink-muted">
              The address may be mistyped, or the page may have been moved or retired. Everything
              below is a good place to pick the thread back up.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <NextLink href="/" className="cta-split">
                <span className="cta-split-label">Back to the homepage</span>
                <span aria-hidden="true" className="cta-split-icon">
                  <ArrowRightIcon size={18} className="cta-split-arrow" />
                </span>
              </NextLink>

              <OpenSearchButton className="inline-flex h-12 items-center gap-2 rounded-full border border-border-strong px-5 text-sm font-medium text-ink-strong transition-colors hover:border-brand hover:text-brand">
                <SearchIcon size={18} aria-hidden="true" />
                Search the site
              </OpenSearchButton>
            </div>
          </div>

          {/* ---------------- the way in ---------------- */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="notfound-figure">
              <Image
                src="/media/campus-gateway.jpg"
                /* Decorative: the heading beside it carries the meaning, and
                   describing a gate would say nothing about the error. */
                alt=""
                fill
                sizes="(min-width: 1024px) 40vw, 0px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* ---------------- where to go instead ---------------- */}
        <div className="mt-16 border-t border-border pt-10">
          <h2 className="font-serif text-xl text-ink-strong">Main sections</h2>

          <ul className="mt-7 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((item) => (
              <li key={`nf-${item.id}`}>
                <span aria-hidden="true" className="mb-4 block h-[3px] w-8 bg-accent-surface" />

                <h3 className="font-serif text-lg leading-tight text-brand">
                  {item.href ? (
                    <Link
                      href={item.href}
                      siteUrl={site.url}
                      variant="bare"
                      className="hover:underline"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    item.label
                  )}
                </h3>

                <ul className="mt-3 space-y-2">
                  {item.children?.slice(0, 3).map((section) => (
                    <li key={`nf-${section.id}`}>
                      <Link
                        href={section.href ?? section.children?.[0]?.href ?? '#'}
                        siteUrl={site.url}
                        variant="bare"
                        className="text-sm text-ink-muted transition-colors hover:text-brand hover:underline"
                      >
                        {section.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </main>
  );
}
