import NextLink from 'next/link';

import { ArrowRightIcon, ExternalIcon } from '@/components/ui/icon';
import { NewsFeatured } from '@/features/homepage/news-featured';
import { formatDate } from '@/lib/format/date';
import type { News } from '@/types/homepage';

/**
 * News & announcements — the third section on the homepage.
 *
 * A feature slot on the left, a list of the rest on the right. The shape comes
 * from the reference design; four things about it are deliberately different.
 *
 * ## 1. The rows are links, not rows with links in them
 *
 * The reference puts a small arrow at the right end of each row and leaves the
 * rest inert, so the target is a 20px glyph a long way from the words you are
 * actually reading. Here the whole row is the anchor. That is a far larger hit
 * area, one tab stop instead of a decorative glyph, and it means the hover
 * state can belong to the row rather than to a corner of it.
 *
 * ## 2. Dates are not chips
 *
 * A bordered box around a date is the most common way to make a list look
 * designed, and it costs a rectangle per row — five rectangles competing with
 * five headlines. The date is set small and quiet above the headline instead,
 * beside the category, where it reads as metadata because it is positioned like
 * metadata rather than because it has a border.
 *
 * ## 3. Category, which the reference does not show at all
 *
 * Five headlines of similar length are hard to scan. A one-word kind —
 * Admissions, Research, Events — lets someone find the row they care about
 * without reading all five, and it is information the institution already has.
 *
 * ## 4. Real dates, in a real element
 *
 * Each is a `<time dateTime>` carrying the ISO value, so the machine-readable
 * date and the displayed one cannot drift. Formatting is pinned to a fixed
 * locale and time zone — see `lib/format/date.ts` for why that is not optional
 * on a server-rendered page.
 *
 * A Server Component. Only the feature slot's rotation ships JavaScript.
 */
export function NewsSection({ news }: { news: News }) {
  return (
    <section
      aria-labelledby="news-heading"
      /*
        The brand motif, bottom-left, mirrored, and more than half outside the
        band — the instance that reads as floating between two sections rather
        than belonging to one. See the "Brand motif" block in base.css.

        The three utilities beside the ground colour are what the motif needs
        rather than what the layout needs: `isolate` so the artwork's negative
        z-index stays above this band's own background instead of escaping
        behind it, `relative` to position against, and `overflow-hidden` so the
        section edge does the cropping.
      */
      data-motif="news"
      className="relative isolate overflow-hidden bg-surface-subtle py-20 md:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12">
        {/* ---------------- header ---------------- */}
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 id="news-heading" className="section-heading">
              {news.heading}
            </h2>
            {news.intro ? (
              <p className="prose-justify mt-5 max-w-[38rem] text-lg leading-relaxed text-ink-muted">
                {news.intro}
              </p>
            ) : null}
          </div>

          {/* `.cta-split` — see the note on the About section's button. */}
          <NextLink href={news.action.href} className="cta-split">
            <span className="cta-split-label">{news.action.label}</span>
            <span aria-hidden="true" className="cta-split-icon">
              <ArrowRightIcon size={18} className="cta-split-arrow" />
            </span>
          </NextLink>
        </div>

        <span
          aria-hidden="true"
          className="reveal-rule-x mt-10 block h-[3px] w-16 bg-accent-surface"
        />

        {/* ---------------- feature + list ---------------- */}
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="reveal lg:col-span-5">
            <NewsFeatured items={news.featured} />
          </div>

          <div className="lg:col-span-7">
            <ul className="border-t border-border">
              {news.items.map((item, index) => (
                <li
                  key={item.id}
                  className="reveal border-b border-border"
                  style={{ ['--reveal-start' as string]: `${String(4 + index * 3)}%` }}
                >
                  <NextLink
                    href={item.href}
                    {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group relative flex items-start gap-6 py-7 transition-colors duration-300 hover:bg-surface"
                  >
                    {/*
                      The hover marker sits in the row's own left padding, so
                      nothing reflows when it appears and it cannot overflow.
                    */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-accent-surface transition-transform duration-300 ease-out group-hover:scale-y-100"
                    />

                    <div className="min-w-0 grow pl-5">
                      <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="text-2xs font-semibold tracking-[0.16em] text-accent-ink uppercase">
                          {item.category}
                        </span>
                        <span aria-hidden="true" className="h-3 w-px bg-border" />
                        <time dateTime={item.date} className="text-2xs text-ink-muted tabular-nums">
                          {formatDate(item.date)}
                        </time>
                      </p>

                      <p className="mt-2.5 text-lg leading-snug font-medium text-balance text-ink-strong transition-colors duration-300 group-hover:text-brand">
                        {item.title}
                      </p>
                    </div>

                    {/*
                      The affordance, not the target — the whole row is the
                      link. An external item gets the conventional mark and its
                      own announcement; an internal one gets an arrow that
                      leans in on hover.
                    */}
                    <span
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-border-strong transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-brand"
                    >
                      {item.external ? <ExternalIcon size={18} /> : <ArrowRightIcon size={18} />}
                    </span>
                    {item.external ? <span className="sr-only">(opens in a new tab)</span> : null}
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
