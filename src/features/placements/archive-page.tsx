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
          <Rule className="rule-draw mt-6 origin-left" />
          <p
            className="rise-in mt-6 max-w-[44rem] text-base leading-[1.85] text-ink md:text-[1.0625rem]"
            style={{ ['--rise-delay' as string]: '150ms' }}
          >
            {total} final placement and summer internship reports and placement audit reports, from
            2014 to the latest season.
          </p>
          <nav
            aria-label="Seasons"
            className="rise-in mt-6 flex flex-wrap gap-3"
            style={{ ['--rise-delay' as string]: '300ms' }}
          >
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="group inline-flex items-center gap-3 rounded-full border border-border-strong py-1.5 pr-1.5 pl-5 text-[0.9375rem] font-semibold text-ink-strong transition-[translate,color,border-color,box-shadow] duration-500 ease-out hover:border-accent-surface hover:text-brand hover:shadow-raised motion-safe:hover:-translate-y-0.5"
              >
                {section.heading}
                <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-accent-50 px-2 text-sm text-accent-700 transition-colors duration-500 group-hover:bg-brand group-hover:text-white">
                  {section.docs.length}
                </span>
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
                  className="group inline-flex items-center gap-2 text-brand transition-colors duration-500 hover:text-brand-950"
                >
                  {section.report.title}
                  <span
                    aria-hidden="true"
                    className="flex size-7 items-center justify-center rounded-full bg-accent-surface text-brand-950 transition-transform duration-500 ease-out motion-safe:group-hover:translate-x-1"
                  >
                    <ArrowRightIcon size={13} />
                  </span>
                </Link>
                <a
                  href={section.report.more}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-ink-muted transition-colors duration-500 hover:text-brand"
                >
                  More details
                  <ExternalIcon
                    size={13}
                    aria-hidden="true"
                    className="transition-transform duration-500 ease-out motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                  />
                  <span className="sr-only"> (xlri.ac.in, opens in a new tab)</span>
                </a>
              </div>
            </div>
            <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
              {byYear(section.docs).map((doc, i) => (
                <li
                  key={doc.id}
                  className={index === 0 ? 'rise-in' : undefined}
                  style={
                    index === 0
                      ? { ['--rise-delay' as string]: `${400 + Math.min(i, 9) * 80}ms` }
                      : undefined
                  }
                >
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
