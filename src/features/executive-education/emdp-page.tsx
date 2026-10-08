import Image from 'next/image';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ArrowRightIcon } from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import { EmdpExplorer } from '@/features/executive-education/emdp-explorer';
import type { EmdpPage as EmdpContent } from '@/types/emdp';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';
const H2 =
  'font-serif text-[clamp(1.75rem,3.2vw,2.5rem)] leading-tight tracking-[-0.02em] text-ink-strong';

/**
 * Executive Education › EMDP.
 *
 * ## The model
 *
 * The light treatment of the programme and About pages:
 *
 *  1. **Introduction** — "EMDP", the expansion and the introduction, with the
 *     live counts, beside the poster of the next upcoming programme.
 *  2. **Offerings** — the introduction's three kinds of programme, as three
 *     cards on the tinted band.
 *  3. **Programmes** — upcoming and on-going as tabs; each card carries its
 *     poster, details, and Apply and Know More.
 *
 * No scroll or load animation; hover states only.
 */
export function EmdpPage({ content }: { content: EmdpContent }) {
  const upcoming = content.programmes.filter((p) => p.status === 'upcoming');
  const ongoing = content.programmes.length - upcoming.length;
  const featured = upcoming[0] ?? content.programmes[0];

  return (
    <article aria-labelledby="emdp-heading">
      {/* ---------------- introduction ---------------- */}
      <section className="bg-surface">
        <div className={`${MEASURE} pt-10 pb-14 md:pt-14 md:pb-20`}>
          <Breadcrumbs
            items={[
              { label: 'Home', href: routes.home },
              { label: 'Executive Education' },
              { label: content.title },
            ]}
          />

          <div className="mt-8 grid grid-cols-1 items-center gap-10 md:mt-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className="text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase">
                {content.eyebrow}
              </p>
              <h1 id="emdp-heading" className="mt-3 font-serif tracking-[-0.035em]">
                <span className="block text-[clamp(2.75rem,6vw,4.5rem)] leading-none text-brand">
                  {content.title}
                </span>
                <span className="mt-3 block text-xl leading-snug tracking-[-0.01em] text-ink-strong md:text-[1.375rem]">
                  {content.expansion}
                </span>
              </h1>
              <span aria-hidden="true" className="mt-6 block h-[3px] w-14 bg-accent-surface" />
              <p className="mt-6 text-base leading-[1.85] text-ink md:text-justify md:text-[1.0625rem] md:hyphens-auto">
                {content.intro}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-5">
                <a
                  href="#programmes"
                  className="inline-flex items-center gap-3 rounded-full bg-brand py-2.5 pr-5 pl-2.5 text-[0.9375rem] font-semibold text-white transition-colors duration-200 hover:bg-brand-950"
                >
                  <span className="flex size-8 items-center justify-center rounded-full bg-accent-surface text-brand-950">
                    <ArrowRightIcon size={15} aria-hidden="true" className="rotate-90" />
                  </span>
                  Explore programmes
                </a>
                <p className="flex items-center gap-4 text-sm text-ink-muted">
                  <span>
                    <span className="font-serif text-2xl text-brand">{upcoming.length}</span>{' '}
                    upcoming
                  </span>
                  <span aria-hidden="true" className="h-6 w-px bg-border-strong" />
                  <span>
                    <span className="font-serif text-2xl text-brand">{ongoing}</span> on-going
                  </span>
                </p>
              </div>
            </div>

            {featured ? (
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -right-3 -bottom-3 hidden h-full w-full rounded-[8px] border-2 border-accent-surface/70 md:block"
                />
                <div className="relative overflow-hidden rounded-[8px] shadow-raised">
                  <Image
                    src={featured.poster.src}
                    width={featured.poster.width}
                    height={featured.poster.height}
                    // The poster is repeated, with its title, in the list below.
                    alt=""
                    // Above the fold — the LCP element. `preload` replaces the
                    // deprecated `priority` in Next 16.
                    preload
                    sizes="(min-width: 1280px) 568px, (min-width: 1024px) 46vw, 100vw"
                    className="h-auto w-full"
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* ---------------- offerings ---------------- */}
      <section aria-labelledby="offerings-heading" className="bg-surface-subtle">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <h2 id="offerings-heading" className={H2}>
            What we offer
          </h2>
          <span aria-hidden="true" className="mt-4 block h-[3px] w-10 bg-accent-surface" />
          <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {content.offerings.map((offering) => (
              <li
                key={offering.id}
                className="rounded-[8px] border border-t-[3px] border-border border-t-accent-surface bg-surface p-6 md:p-7"
              >
                <h3 className="font-serif text-xl text-ink-strong md:text-2xl">{offering.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-[1.7] text-ink">{offering.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- programmes ---------------- */}
      <section
        id="programmes"
        aria-labelledby="programmes-heading"
        className="scroll-mt-40 bg-surface"
      >
        <div className={`${MEASURE} py-14 md:py-20`}>
          <h2 id="programmes-heading" className={H2}>
            Programmes
          </h2>
          <span aria-hidden="true" className="mt-4 block h-[3px] w-10 bg-accent-surface" />
          <div className="mt-8">
            <EmdpExplorer programmes={content.programmes} />
          </div>
        </div>
      </section>
    </article>
  );
}
