import Image from 'next/image';
import NextLink from 'next/link';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ArrowRightIcon, ExternalIcon } from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import type { CentreBrief } from '@/types/centre';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';

/**
 * A Centre of Excellence whose page is an introduction only.
 *
 * ## The model
 *
 * The Jamshedpur centre page (xlri.ac.in/centres/centre-public-policy), with
 * Delhi-NCR's content:
 *
 *  1. **Title and banner** — breadcrumb, the name centred above a full-width
 *     photograph with softened corners.
 *  2. **Introduction** — the text beneath. Jamshedpur sets one paragraph at
 *     full width; Delhi has two shorter ones, so they take two thirds and the
 *     facts they state (launch date, inaugural lecture) sit beside them in an
 *     "At a glance" panel, which fills a column that would otherwise be empty.
 *  3. **A tinted band of cards** — Jamshedpur fills it with its campus-wide
 *     "Latest Events". Those are Jamshedpur's events, not this Centre's, and
 *     Delhi publishes none for it, so the band carries the other Centres of
 *     Excellence instead: the same heading and row of cards, pointing
 *     somewhere true.
 *
 * Server Component; no client JavaScript.
 */
export function CentreBriefPage({ centre }: { centre: CentreBrief }) {
  return (
    <article aria-labelledby="centre-heading">
      {/* ---------------- title + banner + introduction ---------------- */}
      <section className="bg-surface">
        <div className={`${MEASURE} pt-10 pb-14 md:pt-14 md:pb-20`}>
          <Breadcrumbs
            items={[
              { label: 'Home', href: routes.home },
              { label: 'Centres' },
              { label: centre.shortName },
            ]}
          />

          <h1
            id="centre-heading"
            className="mx-auto mt-8 max-w-[44rem] text-center font-serif text-[clamp(2rem,4.4vw,3.25rem)] leading-[1.08] tracking-[-0.035em] text-balance text-brand md:mt-10"
          >
            {centre.title}
          </h1>
          <span aria-hidden="true" className="mx-auto mt-6 block h-[3px] w-14 bg-accent-surface" />

          <div className="group relative mt-10 aspect-[4/3] overflow-hidden rounded-[8px] sm:aspect-[16/9] md:mt-12 lg:aspect-[11/4]">
            <Image
              src={centre.image.src}
              alt={centre.image.alt}
              fill
              // Above the fold — the LCP element. `preload` replaces the
              // deprecated `priority` in Next 16.
              preload
              sizes="(min-width: 1280px) 1184px, 100vw"
              style={{ objectPosition: centre.imagePosition }}
              className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
            />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-10 md:mt-14 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-16">
            <div className="space-y-5 text-base leading-[1.9] text-ink md:text-justify md:text-[1.0625rem] md:hyphens-auto">
              {centre.paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className={
                    index === 0
                      ? 'font-serif text-[1.25rem] leading-[1.6] text-ink-strong md:text-left md:text-[1.4375rem]'
                      : undefined
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <aside
              aria-labelledby="glance-heading"
              className="self-start rounded-[8px] border border-t-[3px] border-border border-t-accent-surface bg-surface-subtle p-6 md:p-8"
            >
              <h2
                id="glance-heading"
                className="text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase"
              >
                At a glance
              </h2>
              <dl className="mt-5 divide-y divide-border">
                {centre.facts.map((fact) => (
                  // Label first in the DOM (a <dt> must precede its <dd>), the
                  // fact itself first on screen.
                  <div key={fact.id} className="flex flex-col-reverse py-4 first:pt-0 last:pb-0">
                    <dt className="mt-1.5 text-sm leading-snug text-ink-muted">{fact.label}</dt>
                    <dd className="font-serif text-xl leading-snug text-ink-strong">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </div>
      </section>

      {/* ---------------- other centres ---------------- */}
      <section aria-labelledby="related-heading" className="bg-surface-subtle">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <div>
            <h2
              id="related-heading"
              className="font-serif text-[clamp(1.75rem,3.2vw,2.5rem)] leading-tight tracking-[-0.02em] text-ink-strong"
            >
              {centre.related.heading}
            </h2>
          </div>

          <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-10 lg:grid-cols-4">
            {centre.related.items.map((item, index) => {
              const external = /^https?:\/\//.test(item.href);
              const card =
                'group flex h-full flex-col justify-between gap-8 rounded-[8px] border border-border bg-surface p-6 transition-[border-color,box-shadow] duration-300 hover:border-brand hover:shadow-raised';
              const body = (
                <>
                  <span
                    aria-hidden="true"
                    className="font-serif text-3xl leading-none text-border-strong/70"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="flex items-end justify-between gap-4">
                    <span className="font-serif text-xl leading-snug text-ink-strong">
                      {item.label}
                    </span>
                    {external ? (
                      <ExternalIcon
                        size={16}
                        aria-hidden="true"
                        className="mb-1 shrink-0 text-accent-700"
                      />
                    ) : (
                      <ArrowRightIcon
                        size={16}
                        aria-hidden="true"
                        className="mb-1 shrink-0 text-accent-700 transition-transform duration-200 group-hover:translate-x-1"
                      />
                    )}
                  </span>
                </>
              );
              return (
                <li key={item.id}>
                  {external ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className={card}>
                      {body}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    <NextLink href={item.href} className={card}>
                      {body}
                    </NextLink>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </article>
  );
}
