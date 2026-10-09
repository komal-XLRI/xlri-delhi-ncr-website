import Image from 'next/image';
import Link from 'next/link';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ArrowRightIcon, CheckIcon, ExternalIcon } from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import type { PlacementDocument, PlacementReport } from '@/types/placements';

import { byYear, Figure, H2, MEASURE, PdfCard, Rich, Rule } from './parts';

interface Props {
  report: PlacementReport;
  /** This season's reports and audits. */
  documents: readonly PlacementDocument[];
}

/**
 * Placements › one season's report — Final Placements or Summer
 * Internships. The two reports have the same parts, so one page renders
 * either.
 *
 * ## The model
 *
 * The institute's placement-report page (xlri.ac.in › Corporate Relations &
 * Placement › Placement Reports), with Delhi-NCR's content, in the light
 * treatment of the other pages on this site:
 *
 *  1. **The report** — the batch photograph as a wide banner (where there is
 *     one), the title, the introduction with its figures in bold, the four
 *     headline figures beside it, and the Director's statement.
 *  2. **Key Highlights** — the report's own list, on the tinted band.
 *  3. **Sectors** — each sector's heading and paragraph.
 *  4. **Recruitment Report & Process** — this season's PDFs as tiles.
 *
 * Server Component; no client JavaScript.
 */
export function PlacementReportPage({ report, documents }: Props) {
  const { headline, highlights, sectors, quote } = report;
  const other =
    report.season === 'final'
      ? { label: 'Summer Internships 2025', href: routes.placements.summer }
      : { label: 'Final Placements 2024–26', href: routes.placements.final };

  return (
    <article aria-labelledby="report-heading">
      {/* ---------------- the report ---------------- */}
      <section className="bg-surface">
        <div className={`${MEASURE} pt-10 pb-14 md:pt-14 md:pb-20`}>
          <Breadcrumbs
            items={[
              { label: 'Home', href: routes.home },
              { label: 'Placements', href: routes.placements.index },
              { label: report.eyebrow },
            ]}
          />

          {report.image ? (
            <div className="rise-in group relative mt-8 md:mt-10">
              <span
                aria-hidden="true"
                className="absolute -right-3 -bottom-3 hidden h-full w-full rounded-[8px] border-2 border-accent-surface/70 transition-[translate,border-color] duration-700 ease-out group-hover:translate-x-1.5 group-hover:translate-y-1.5 group-hover:border-accent-surface md:block"
              />
              <div className="relative aspect-[16/9] overflow-hidden rounded-[8px] md:aspect-[21/8]">
                <Image
                  src={report.image.src}
                  alt={report.image.alt}
                  fill
                  // Above the fold — the LCP element. `preload` replaces the
                  // deprecated `priority` in Next 16.
                  preload
                  sizes="(min-width: 1280px) 1184px, 100vw"
                  className="object-cover object-[center_45%] transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
                />
              </div>
            </div>
          ) : null}

          <div className="mt-10 grid grid-cols-1 gap-10 md:mt-12 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:gap-14">
            <div>
              <p className="text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase">
                {report.eyebrow}
              </p>
              <h1
                id="report-heading"
                className="mt-3 font-serif text-[clamp(2.25rem,4.6vw,3.5rem)] leading-[1.05] tracking-[-0.03em] text-balance text-brand"
              >
                {report.title}
              </h1>
              <p className="mt-3 font-serif text-xl leading-snug text-ink-strong">{report.batch}</p>
              <Rule className="rule-draw mt-6 origin-left" />
              <div className="mt-6 space-y-5 text-base leading-[1.85] text-ink md:text-[1.0625rem]">
                {report.intro.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>
                    <Rich text={paragraph} />
                  </p>
                ))}
              </div>
            </div>

            <aside
              aria-label="At a glance"
              className="rise-in lg:pt-10"
              style={{ ['--rise-delay' as string]: '250ms' }}
            >
              <dl className="overflow-hidden rounded-[8px] border border-border">
                {headline.map((stat, index) => (
                  // Label first in the DOM (a <dt> must precede its <dd>),
                  // figure first on screen.
                  <div
                    key={stat.id}
                    className={`group relative flex flex-col-reverse justify-end bg-surface-subtle px-6 py-5 transition-colors duration-500 hover:bg-surface ${
                      index > 0 ? 'border-t border-border' : ''
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-accent-surface transition-transform duration-700 ease-out group-hover:scale-y-100"
                    />
                    <dt className="mt-1.5 text-sm leading-snug text-ink-muted">{stat.label}</dt>
                    <dd>
                      <Figure
                        stat={stat}
                        className="inline-block text-[2rem] text-brand transition-transform duration-500 ease-out motion-safe:group-hover:translate-x-1"
                      />
                    </dd>
                  </div>
                ))}
              </dl>
              {report.document ? (
                <a
                  href={report.document.href}
                  target="_blank"
                  rel="noopener"
                  className="group relative mt-5 flex items-center gap-4 overflow-hidden rounded-[8px] border border-border bg-surface py-4 pr-4 pl-5 transition-[translate,box-shadow,border-color] duration-500 ease-out hover:border-accent-surface hover:shadow-raised motion-safe:hover:-translate-y-0.5"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-1 bg-accent-surface"
                  />
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-10 shrink-0 items-center justify-center rounded-[4px] bg-brand text-[0.6875rem] font-bold tracking-[0.06em] text-white"
                  >
                    PDF
                  </span>
                  <span className="flex-1">
                    <span className="block text-xs font-semibold tracking-[0.14em] text-accent-700 uppercase">
                      Full report
                    </span>
                    <span className="mt-0.5 block text-base font-semibold text-ink-strong transition-colors duration-500 group-hover:text-brand">
                      Download the report
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand text-white transition-colors duration-500 group-hover:bg-accent-surface group-hover:text-brand-950"
                  >
                    <ArrowRightIcon
                      size={16}
                      className="rotate-90 transition-transform duration-500 ease-out motion-safe:group-hover:translate-y-0.5"
                    />
                  </span>
                  <span className="sr-only"> (PDF, opens in a new tab)</span>
                </a>
              ) : null}
            </aside>
          </div>

          <figure
            className="rise-in mt-12 border-l-[3px] border-accent-surface pl-6 md:mt-14 md:pl-10"
            style={{ ['--rise-delay' as string]: '400ms' }}
          >
            <blockquote className="font-serif text-lg leading-[1.7] text-ink-strong md:text-xl">
              <p>“{quote.text}”</p>
            </blockquote>
            <figcaption className="mt-5 text-sm">
              <span className="font-semibold text-ink-strong">{quote.name}</span>
              <span className="text-ink-muted"> · {quote.role}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ---------------- key highlights ---------------- */}
      <section aria-labelledby="highlights-heading" className="bg-surface-subtle">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <h2 id="highlights-heading" className={H2}>
            {highlights.heading}
          </h2>
          <Rule className="mt-4" />
          <ul className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {highlights.items.map((item) => (
              <li
                key={item.slice(0, 32)}
                className="group flex gap-4 rounded-[8px] border border-transparent bg-surface p-5 text-[0.9375rem] leading-[1.7] text-ink transition-[translate,box-shadow,border-color] duration-500 ease-out hover:border-accent-surface hover:shadow-raised motion-safe:hover:-translate-y-1"
              >
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-50 text-accent-700 transition-colors duration-500 group-hover:bg-brand group-hover:text-white">
                  <CheckIcon size={13} aria-hidden="true" />
                </span>
                <span>
                  <Rich text={item} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- sectors ---------------- */}
      <section aria-labelledby="sectors-heading" className="bg-surface">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <h2 id="sectors-heading" className={H2}>
            {sectors.heading}
          </h2>
          <Rule className="mt-4" />
          {sectors.intro ? (
            <p className="mt-6 max-w-[64rem] text-base leading-[1.85] text-ink md:text-[1.0625rem]">
              {sectors.intro}
            </p>
          ) : null}

          <div className="mt-10 grid grid-cols-1 gap-x-14 gap-y-10 lg:grid-cols-2">
            {sectors.items.map((sector) => (
              <section key={sector.id} aria-labelledby={`sector-${sector.id}`} className="group">
                <h3
                  id={`sector-${sector.id}`}
                  className="border-l-[3px] border-brand pl-4 font-serif text-xl leading-snug text-ink-strong transition-[border-color,color,padding] duration-500 ease-out group-hover:border-accent-surface group-hover:pl-5 group-hover:text-brand"
                >
                  {sector.name}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-[1.8] text-ink">{sector.text}</p>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- documents ---------------- */}
      <section aria-labelledby="documents-heading" className="bg-surface-subtle">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <h2 id="documents-heading" className={`${H2} text-center`}>
            Recruitment Report &amp; Process
          </h2>
          <Rule className="mx-auto mt-4" />
          <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {byYear(documents).map((doc) => (
              <li key={doc.id}>
                <PdfCard doc={doc} />
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={other.href}
              className="group inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface px-5 py-3 text-[0.9375rem] font-semibold text-ink-strong transition-colors duration-500 hover:border-accent-surface hover:text-brand"
            >
              {other.label}
              <ArrowRightIcon
                size={14}
                aria-hidden="true"
                className="text-accent-700 transition-transform duration-500 ease-out motion-safe:group-hover:translate-x-0.5"
              />
            </Link>
            <a
              href={report.more}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface px-5 py-3 text-[0.9375rem] font-semibold text-ink-strong transition-colors duration-500 hover:border-accent-surface hover:text-brand"
            >
              More details
              <ExternalIcon
                size={14}
                aria-hidden="true"
                className="text-accent-700 transition-transform duration-500 ease-out motion-safe:group-hover:translate-x-0.5"
              />
              <span className="sr-only"> (xlri.ac.in, opens in a new tab)</span>
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
