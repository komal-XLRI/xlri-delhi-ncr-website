import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { BookIcon } from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import { fill } from '@/lib/format/template';
import { PublicationList } from '@/features/publications/publication-list';
import type { FacultyPublicationsPage } from '@/types/publications';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';
const delay = (ms: number) => ({ ['--rise-delay' as string]: `${ms}ms` });

/**
 * Faculty & Research › Publication – Research Articles & Cases.
 *
 *  1. **Hero** — the title and three figures counted from the list (how many
 *     publications, over how many academic years, and how many in the latest),
 *     light, with the triangle motif in the right-hand margin — the same
 *     layout as the Sustainability publication page.
 *  2. **The list**, on grey — the shared `PublicationList`: a filter by
 *     academic year, a search over title, author and journal, and a row per
 *     citation with the year, title, authors, journal and a DOI link.
 *
 * Motion is light and slow, in the brand colours: the title rule draws and
 * the hero rises in on load; rows draw a lime bar on hover. None of it plays
 * under `prefers-reduced-motion`.
 *
 * Content and page copy come from `content/research/publications.json`.
 */
export function FacultyPublications({ content }: { content: FacultyPublicationsPage }) {
  const total = content.periods.reduce((n, p) => n + p.publications.length, 0);
  const latest = content.periods[0];
  const facts = [
    { id: 'total', value: String(total), label: content.facts.total },
    { id: 'years', value: String(content.periods.length), label: content.facts.years },
    ...(latest
      ? [
          {
            id: 'latest',
            value: String(latest.publications.length),
            label: fill(content.facts.latest, { period: latest.label }),
          },
        ]
      : []),
  ];

  return (
    <article aria-labelledby="publications-heading">
      {/* ---------------- hero ---------------- */}
      <section data-motif="hero" className="relative isolate overflow-hidden bg-surface">
        <div className={`${MEASURE} pt-8 pb-12 md:pt-10 md:pb-14`}>
          <Breadcrumbs
            items={[
              { label: 'Home', href: routes.home },
              { label: content.breadcrumb.section },
              { label: content.breadcrumb.page },
            ]}
          />

          <div className="mt-8 grid grid-cols-1 items-end gap-10 md:mt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
            <div>
              <p className="flex items-center gap-2.5 text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase">
                <BookIcon size={18} aria-hidden="true" />
                {content.eyebrow}
              </p>
              <h1
                id="publications-heading"
                className="mt-3 font-serif text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.03] tracking-[-0.03em] text-balance text-brand"
              >
                {content.title}
              </h1>
              <span
                aria-hidden="true"
                className="rule-draw mt-6 block h-[3px] w-14 origin-left bg-accent-surface"
              />
            </div>

            <dl
              className="rise-in grid grid-cols-3 overflow-hidden rounded-[8px] border border-border"
              style={delay(200)}
            >
              {facts.map((fact, index) => (
                // Label first in the DOM (a <dt> must precede its <dd>), figure
                // first on screen.
                <div
                  key={fact.id}
                  className={`group relative flex flex-col-reverse justify-end bg-surface-subtle px-4 py-5 transition-colors duration-500 hover:bg-surface sm:px-6 sm:py-6 ${index > 0 ? 'border-l border-border' : ''}`}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent-surface transition-transform duration-700 ease-out group-hover:scale-x-100"
                  />
                  <dt className="mt-2 text-sm leading-snug text-ink-muted">{fact.label}</dt>
                  <dd className="font-serif text-[clamp(2rem,4vw,2.75rem)] leading-none text-brand">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ---------------- the list ---------------- */}
      <section aria-label="Publications" className="bg-surface-subtle">
        <div className={`${MEASURE} py-16 md:py-20 lg:py-24`}>
          <PublicationList periods={content.periods} labels={content.list} />
        </div>
      </section>
    </article>
  );
}
