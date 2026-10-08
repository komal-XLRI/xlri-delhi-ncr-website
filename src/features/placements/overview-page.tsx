import Image from 'next/image';
import Link from 'next/link';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ArrowRightIcon } from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import type { PlacementReport, PlacementsArchive, PlacementsOverview } from '@/types/placements';

import { byYear, Figure, H2, MEASURE, PdfCard, Rule } from './parts';

interface Props {
  overview: PlacementsOverview;
  final: PlacementReport;
  summer: PlacementReport;
  archive: PlacementsArchive;
}

/**
 * Placements › overview, in the light treatment of the programme pages.
 *
 *  1. **Introduction** — title and paragraph beside the batch photograph.
 *  2. **The two seasons** — a card per report with its headline figures.
 *  3. **Recruiters** (`#recruiters`, the utility bar's "Recruiters" link) —
 *     those who made the most offers in either season, merged.
 *  4. **Latest reports** — the newest PDFs as tiles, and the archive.
 *
 * Every figure comes from the reports; nothing is restated by hand.
 */
export function PlacementsOverviewPage({ overview, final, summer, archive }: Props) {
  const seasons = [
    { report: final, href: routes.placements.final },
    { report: summer, href: routes.placements.summer },
  ];
  const recruiters = [...new Set([...final.recruiters.names, ...summer.recruiters.names])].sort(
    (a, b) => a.localeCompare(b),
  );
  const latest = byYear([...archive.final, ...archive.summer]).slice(0, 5);
  const total = archive.final.length + archive.summer.length;

  return (
    <article aria-labelledby="placements-heading">
      {/* ---------------- introduction ---------------- */}
      <section className="bg-surface">
        <div className={`${MEASURE} pt-10 pb-14 md:pt-14 md:pb-20`}>
          <Breadcrumbs items={[{ label: 'Home', href: routes.home }, { label: overview.title }]} />

          <div className="mt-8 grid grid-cols-1 items-center gap-10 md:mt-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className="text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase">
                Corporate Relations &amp; Placement
              </p>
              <h1
                id="placements-heading"
                className="mt-3 font-serif text-[clamp(2.5rem,5vw,3.75rem)] leading-[1.02] tracking-[-0.035em] text-brand"
              >
                {overview.title}
              </h1>
              <Rule className="mt-6" />
              <p className="mt-6 text-base leading-[1.85] text-ink md:text-[1.0625rem]">
                {overview.intro}
              </p>
            </div>

            <div className="relative">
              <span
                aria-hidden="true"
                className="absolute -right-3 -bottom-3 hidden h-full w-full rounded-[8px] border-2 border-accent-surface/70 md:block"
              />
              <div className="relative overflow-hidden rounded-[8px] shadow-raised">
                <Image
                  src={overview.image.src}
                  width={overview.image.width}
                  height={overview.image.height}
                  alt={overview.image.alt}
                  // Above the fold — the LCP element. `preload` replaces the
                  // deprecated `priority` in Next 16.
                  preload
                  sizes="(min-width: 1280px) 568px, (min-width: 1024px) 46vw, 100vw"
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- the two seasons ---------------- */}
      <section aria-labelledby="seasons-heading" className="bg-surface-subtle">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <h2 id="seasons-heading" className={H2}>
            Placement Reports
          </h2>
          <Rule className="mt-4" />
          <ul className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {seasons.map(({ report, href }) => (
              <li key={report.season}>
                <Link
                  href={href}
                  className="group flex h-full flex-col rounded-[8px] border border-border bg-surface p-6 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:border-brand hover:shadow-raised md:p-8"
                >
                  <span className="text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase">
                    {report.eyebrow}
                  </span>
                  <span className="mt-2 block font-serif text-[1.75rem] leading-tight text-ink-strong group-hover:text-brand">
                    {report.title}
                  </span>
                  <span className="mt-1 block text-sm text-ink-muted">{report.batch}</span>
                  <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-6">
                    {report.headline.map((stat) => (
                      <div key={stat.id} className="flex flex-col-reverse justify-end">
                        <dt className="mt-1.5 text-sm leading-snug text-ink-muted">{stat.label}</dt>
                        <dd>
                          <Figure stat={stat} className="text-[2rem] text-brand" />
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <span className="mt-auto inline-flex items-center gap-2 pt-7 font-semibold text-brand">
                    Read the report
                    <ArrowRightIcon
                      size={16}
                      aria-hidden="true"
                      className="transition-transform duration-300 motion-safe:group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- recruiters ---------------- */}
      <section
        id="recruiters"
        aria-labelledby="recruiters-heading"
        className="scroll-mt-40 bg-surface"
      >
        <div className={`${MEASURE} py-14 md:py-20`}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
            <div>
              <h2 id="recruiters-heading" className={H2}>
                Recruiters
              </h2>
              <Rule className="mt-4" />
              <p className="mt-6 leading-[1.75] text-ink">{overview.recruitersIntro}</p>
            </div>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {recruiters.map((name) => (
                <li
                  key={name}
                  className="flex min-h-[4.5rem] items-center justify-center rounded-[8px] border border-border bg-surface-subtle px-4 py-3 text-center font-serif text-[1.0625rem] leading-snug text-ink-strong transition-colors duration-300 hover:border-brand hover:bg-surface hover:text-brand"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- latest documents ---------------- */}
      <section aria-labelledby="latest-heading" className="bg-surface-subtle">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="latest-heading" className={H2}>
                Recruitment Report &amp; Process
              </h2>
              <Rule className="mt-4" />
            </div>
            <Link
              href={routes.placements.reports}
              className="inline-flex items-center gap-2 font-semibold text-brand hover:text-brand-950"
            >
              All {total} reports and audits
              <ArrowRightIcon size={16} aria-hidden="true" />
            </Link>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {latest.map((doc) => (
              <li key={doc.id}>
                <PdfCard doc={doc} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
