import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ArrowRightIcon, ExternalIcon, LeafIcon } from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import { Avatar } from '@/features/sustainability/avatar';
import { PublicationList } from '@/features/publications/publication-list';
import type { ResearchPublicationsPage, TeachingCase } from '@/types/sustainability-publications';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';
const H2 =
  'font-serif text-[clamp(1.75rem,3.2vw,2.5rem)] leading-tight tracking-[-0.02em] text-ink-strong';
/** A slow lift with a soft shadow — the cards' shared hover, as on the Team page. */
const LIFT =
  'transition-[translate,box-shadow,border-color] duration-500 ease-out hover:border-accent-surface hover:shadow-raised motion-safe:hover:-translate-y-1';
const delay = (ms: number) => ({ ['--rise-delay' as string]: `${ms}ms` });

/**
 * Sustainability › Research Publications & Cases.
 *
 * ## The model
 *
 *  1. **Hero** — the title, the page's figures and the Sustainability contact
 *     address, light, in the layout of the other Sustainability pages, with a
 *     chip for each half of the page. The Delhi page puts the halves behind
 *     two tabs; here both are on the page and the chips jump to them.
 *  2. **Research Publications**, on grey — the only list on these pages long
 *     enough to need tools: a period filter and a search box
 *     (`PublicationList`, the one client component). Each citation is a row:
 *     the year, the title, the authors, the journal, and a DOI link.
 *  3. **Cases**, on white — five teaching cases as cards.
 *
 * Motion is light and slow, in the brand colours: the title rule draws and
 * the hero rises in on load; rows and cards lift or draw a lime bar on hover.
 * None of it plays under `prefers-reduced-motion`.
 *
 * Content and page copy come from `content/sustainability/research-publications.json`.
 */
export function ResearchPublications({ content }: { content: ResearchPublicationsPage }) {
  const publications = content.periods.flatMap((p) => p.publications);
  const years = publications.map((p) => p.year).sort();
  const facts = [
    {
      id: 'publications',
      value: String(publications.length),
      label: content.facts.publications,
    },
    { id: 'cases', value: String(content.cases.length), label: content.facts.cases },
    ...(years.length > 0
      ? [
          {
            id: 'span',
            value: `${years[0] ?? ''}–${(years.at(-1) ?? '').slice(2)}`,
            label: content.facts.span,
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
                <LeafIcon size={18} aria-hidden="true" />
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
              <a
                href={`mailto:${content.contactEmail}`}
                className="rise-in group mt-8 inline-flex max-w-full items-center gap-3 rounded-full border border-border-strong bg-surface py-2 pr-5 pl-2 text-[0.9375rem] text-ink-strong transition-[border-color,box-shadow] duration-500 hover:border-accent-surface hover:shadow-raised"
                style={delay(150)}
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent-surface text-brand-950 transition-transform duration-500 ease-out motion-safe:group-hover:scale-110">
                  <ArrowRightIcon size={15} aria-hidden="true" />
                </span>
                <span className="min-w-0 truncate">
                  <span className="text-ink-muted">{`${content.contactLabel} `}</span>
                  <span className="font-semibold transition-colors duration-500 group-hover:text-brand">
                    {content.contactEmail}
                  </span>
                </span>
              </a>
            </div>

            <dl
              className="rise-in grid grid-cols-3 overflow-hidden rounded-[8px] border border-border"
              style={delay(250)}
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
                  <dd className="font-serif text-[clamp(1.75rem,4vw,2.75rem)] leading-none whitespace-nowrap text-brand">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <nav aria-label="On this page" className="rise-in mt-10" style={delay(320)}>
            <ul className="flex flex-wrap gap-2">
              {[
                { href: '#publications', label: content.sections.publications.heading },
                { href: '#cases', label: content.sections.cases.heading },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex items-center rounded-full border border-border-strong px-4 py-1.5 text-sm font-medium text-ink-strong transition-colors duration-500 hover:border-accent-surface hover:bg-accent-surface hover:text-brand-950"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* ---------------- publications ---------------- */}
      <section
        id="publications"
        aria-labelledby="publications-list-heading"
        className="scroll-mt-32 bg-surface-subtle"
      >
        <div className={`${MEASURE} py-16 md:py-20 lg:py-24`}>
          <h2 id="publications-list-heading" className={H2}>
            {content.sections.publications.heading}
          </h2>
          <span aria-hidden="true" className="mt-5 mb-10 block h-[3px] w-10 bg-accent-surface" />
          <PublicationList periods={content.periods} labels={content.sections.publications.list} />
        </div>
      </section>

      {/* ---------------- cases ---------------- */}
      {content.cases.length > 0 ? (
        <section id="cases" aria-labelledby="cases-heading" className="scroll-mt-32 bg-surface">
          <div className={`${MEASURE} py-16 md:py-20 lg:py-24`}>
            <h2 id="cases-heading" className={H2}>
              {content.sections.cases.heading}
            </h2>
            <span aria-hidden="true" className="mt-5 block h-[3px] w-10 bg-accent-surface" />
            <ul className="mt-10 grid grid-cols-1 gap-5 md:mt-12 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
              {content.cases.map((teachingCase, index) => (
                // `.reveal` on the item, the hover lift on the card: both set a transform.
                <li
                  key={teachingCase.id}
                  className="reveal"
                  style={{ ['--reveal-start' as string]: `${String(4 + (index % 3) * 5)}%` }}
                >
                  <CaseCard teachingCase={teachingCase} labels={content.sections.cases} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </article>
  );
}

function CaseCard({
  teachingCase,
  labels,
}: {
  teachingCase: TeachingCase;
  labels: ResearchPublicationsPage['sections']['cases'];
}) {
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-[8px] border border-border bg-surface-subtle p-6 md:p-7 ${LIFT}`}
    >
      {/* A lime bar that sweeps across the top on hover. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent-surface transition-transform duration-700 ease-out group-hover:scale-x-100"
      />
      <p className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="rounded-full bg-accent-surface/25 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-accent-700 uppercase">
          {labels.tag}
        </span>
        {teachingCase.date ? (
          <span className="text-sm font-medium text-ink-muted">{teachingCase.date}</span>
        ) : null}
      </p>
      <h3 className="mt-4 font-serif text-xl leading-snug text-ink-strong transition-colors duration-500 group-hover:text-brand">
        {teachingCase.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-ink">
        {teachingCase.reference}
        <span className="text-ink-muted"> · {teachingCase.publisher}</span>
      </p>
      <div className="mt-auto flex items-center gap-3 pt-6">
        <Avatar name={teachingCase.author} size="sm" />
        <p className="min-w-0 flex-1 font-semibold text-ink-strong">{teachingCase.author}</p>
        {teachingCase.doi ? (
          <a
            href={`https://doi.org/${teachingCase.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border-strong bg-surface px-3.5 py-1.5 text-xs font-semibold tracking-[0.08em] text-brand uppercase transition-colors duration-500 hover:border-accent-surface hover:bg-accent-surface hover:text-brand-950"
          >
            {labels.doi}
            <ExternalIcon size={12} aria-hidden="true" />
            <span className="sr-only"> for {teachingCase.title} (opens in a new tab)</span>
          </a>
        ) : null}
      </div>
    </article>
  );
}
