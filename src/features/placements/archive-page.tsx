import Link from 'next/link';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ArrowRightIcon, ExternalIcon } from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import type { PlacementReport, PlacementsArchive } from '@/types/placements';

import { byYear, H2, MEASURE, PdfCard, Rule } from './parts';

interface Props {
  archive: PlacementsArchive;
  final: PlacementReport;
  summer: PlacementReport;
}

/**
 * Placements › Reports & Audits — every document from the Delhi page's two
 * tabs as the institute's PDF tiles, one section per season, newest first.
 */
export function PlacementsArchivePage({ archive, final, summer }: Props) {
  const sections = [
    {
      id: 'final',
      heading: 'Final Placements',
      docs: archive.final,
      report: final,
      href: routes.placements.final,
    },
    {
      id: 'summer',
      heading: 'Summer Internships',
      docs: archive.summer,
      report: summer,
      href: routes.placements.summer,
    },
  ];
  const total = archive.final.length + archive.summer.length;

  return (
    <article aria-labelledby="archive-heading">
      <section className="bg-surface">
        <div className={`${MEASURE} pt-10 pb-10 md:pt-14 md:pb-14`}>
          <Breadcrumbs
            items={[
              { label: 'Home', href: routes.home },
              { label: 'Placements', href: routes.placements.index },
              { label: 'Reports & Audits' },
            ]}
          />
          <p className="mt-8 text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase md:mt-10">
            Placements
          </p>
          <h1
            id="archive-heading"
            className="mt-3 font-serif text-[clamp(2.5rem,5vw,3.75rem)] leading-[1.02] tracking-[-0.035em] text-brand"
          >
            Placement Reports &amp; Audits
          </h1>
          <Rule className="mt-6" />
          <p className="mt-6 max-w-[44rem] text-base leading-[1.85] text-ink md:text-[1.0625rem]">
            {total} final placement and summer internship reports and placement audit reports, from
            2014 to the latest season.
          </p>
          <nav aria-label="Seasons" className="mt-6 flex flex-wrap gap-3">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="inline-flex items-center rounded-full border border-border-strong px-5 py-2.5 text-[0.9375rem] font-semibold text-ink-strong transition-colors duration-200 hover:border-brand hover:text-brand"
              >
                {section.heading}
                <span className="ml-2 font-normal text-ink-muted">{section.docs.length}</span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      {sections.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          aria-labelledby={`${section.id}-heading`}
          className={`scroll-mt-40 ${index % 2 === 0 ? 'bg-surface-subtle' : 'bg-surface'}`}
        >
          <div className={`${MEASURE} py-14 md:py-20`}>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 id={`${section.id}-heading`} className={H2}>
                  {section.heading}
                </h2>
                <Rule className="mt-4" />
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.9375rem] font-semibold">
                <Link
                  href={section.href}
                  className="inline-flex items-center gap-2 text-brand hover:text-brand-950"
                >
                  {section.report.title}
                  <ArrowRightIcon size={14} aria-hidden="true" />
                </Link>
                <a
                  href={section.report.more}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-ink-muted hover:text-brand"
                >
                  More details
                  <ExternalIcon size={13} aria-hidden="true" />
                  <span className="sr-only"> (xlri.ac.in, opens in a new tab)</span>
                </a>
              </div>
            </div>
            <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
              {byYear(section.docs).map((doc) => (
                <li key={doc.id}>
                  <PdfCard doc={doc} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </article>
  );
}
