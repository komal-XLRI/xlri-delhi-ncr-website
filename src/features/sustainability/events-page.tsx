import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { LeafIcon } from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import { fill } from '@/lib/format/template';
import { Avatar } from '@/features/sustainability/avatar';
import type {
  Oration,
  OrationSeries,
  SustainabilityEventsPage,
} from '@/types/sustainability-events';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';
const H2 =
  'font-serif text-[clamp(1.75rem,3.2vw,2.5rem)] leading-tight tracking-[-0.02em] text-brand';
/** A slow lift with a soft shadow — the cards' shared hover, as on the Team page. */
const LIFT =
  'transition-[translate,box-shadow,border-color] duration-500 ease-out hover:border-accent-surface hover:shadow-raised motion-safe:hover:-translate-y-1';
const delay = (ms: number) => ({ ['--rise-delay' as string]: `${ms}ms` });

/** "2014-11-29" → "29 November 2014". UTC, so the server's zone cannot shift the day. */
const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });

/** Consecutive orations by decade — "2020s", "2010s" … — keeping their order. */
function byDecade(orations: readonly Oration[]) {
  const groups: { decade: string; orations: Oration[] }[] = [];
  for (const oration of orations) {
    const decade = `${oration.year.slice(0, 3)}0s`;
    const last = groups.at(-1);
    if (last?.decade === decade) last.orations.push(oration);
    else groups.push({ decade, orations: [oration] });
  }
  return groups;
}

/**
 * Sustainability › Events — the institute's two oration series.
 *
 * ## The model
 *
 *  1. **Hero** — the title and the page's figures, light, in the layout of
 *     the other Sustainability pages, with a chip per series that jumps to it.
 *  2. **One section per series**, on alternating grounds: its name, how long
 *     it has run and how many orations, then a card per oration, newest
 *     first. A series that spans decades is broken up by decade, so thirty
 *     years of speakers read as eras rather than one long grid.
 *
 * Each card is the date, the title in quotation marks, and the speaker with a
 * monogram and a line about them. An oration without a recorded title shows
 * only the speaker rather than a placeholder.
 *
 * Motion is light and slow, in the brand colours: the title rule draws and
 * the hero rises in on load; the cards rise as they scroll into view
 * (`.reveal`, CSS only) and lift on hover with a lime bar. None of it plays
 * under `prefers-reduced-motion`.
 *
 * Content and page copy come from `content/sustainability/events.json`. Server Component;
 * no client JavaScript.
 */
export function SustainabilityEvents({ content }: { content: SustainabilityEventsPage }) {
  const { series } = content;
  const total = series.reduce((sum, s) => sum + s.orations.length, 0);
  const first = series
    .flatMap((s) => s.orations)
    .reduce<Oration | undefined>(
      (oldest, o) => (!oldest || o.year < oldest.year ? o : oldest),
      undefined,
    );
  const facts = [
    { id: 'total', value: String(total), label: content.facts.total },
    { id: 'series', value: String(series.length), label: content.facts.series },
    ...(first
      ? [
          {
            id: 'first',
            value: first.year,
            label: fill(content.facts.first, { speaker: first.speaker }),
          },
        ]
      : []),
  ];

  return (
    <article aria-labelledby="events-heading">
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

          <div className="mt-8 grid grid-cols-1 items-end gap-10 md:mt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-16">
            <div>
              <p className="flex items-center gap-2.5 text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase">
                <LeafIcon size={18} aria-hidden="true" />
                {content.eyebrow}
              </p>
              <h1
                id="events-heading"
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

          <nav aria-label="Jump to a series" className="rise-in mt-10" style={delay(320)}>
            <ul className="flex flex-wrap gap-2">
              {series.map((group) => (
                <li key={group.id}>
                  <a
                    href={`#${group.id}`}
                    className="inline-flex items-center rounded-full border border-border-strong px-4 py-1.5 text-sm font-medium text-ink-strong transition-colors duration-500 hover:border-accent-surface hover:bg-accent-surface hover:text-brand-950"
                  >
                    {group.shortName}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {series.map((group, index) => (
        <SeriesSection
          key={group.id}
          series={group}
          labels={content.labels}
          grey={index % 2 === 0}
        />
      ))}
    </article>
  );
}

function SeriesSection({
  series,
  labels,
  grey,
}: {
  series: OrationSeries;
  labels: SustainabilityEventsPage['labels'];
  grey: boolean;
}) {
  const headingId = `${series.id}-heading`;
  const oldest = series.orations.at(-1)?.year;
  const decades = byDecade(series.orations);
  // Only worth subheadings when the series spans more than one decade.
  const split = decades.length > 1;

  return (
    <section
      id={series.id}
      aria-labelledby={headingId}
      className={`scroll-mt-32 ${grey ? 'bg-surface-subtle' : 'bg-surface'}`}
    >
      <div className={`${MEASURE} py-16 md:py-20 lg:py-24`}>
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase">
            {oldest ? `${fill(labels.since, { year: oldest })} · ` : ''}
            {fill(labels.count, { count: series.orations.length })}
          </p>
          <h2 id={headingId} className={`mt-3 ${H2}`}>
            {series.name}
          </h2>
          <span aria-hidden="true" className="mt-5 block h-[3px] w-10 bg-accent-surface" />
          <p className="mt-5 text-base leading-[1.8] text-ink md:text-[1.0625rem]">
            {series.summary}
          </p>
        </div>

        {decades.map((group) => (
          <div key={group.decade} className={split ? 'mt-12 md:mt-14' : 'mt-10 md:mt-12'}>
            {split ? (
              <h3 className="flex items-center gap-4 font-serif text-2xl text-ink-strong">
                {group.decade}
                <span aria-hidden="true" className="h-px flex-1 bg-border-strong/60" />
              </h3>
            ) : null}
            <ul
              className={`grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 ${split ? 'mt-6' : ''}`}
            >
              {group.orations.map((oration, i) => (
                // `.reveal` on the item, the hover lift on the card: both set a transform.
                <li
                  key={oration.id}
                  id={oration.id}
                  className="reveal"
                  style={{ ['--reveal-start' as string]: `${String(4 + (i % 3) * 5)}%` }}
                >
                  <OrationCard oration={oration} heading={split ? 'h4' : 'h3'} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/** `heading` keeps the outline whole: h4 under a decade heading, h3 without one. */
function OrationCard({ oration, heading: Heading }: { oration: Oration; heading: 'h3' | 'h4' }) {
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-[8px] border border-border bg-surface p-6 md:p-7 ${LIFT}`}
    >
      {/* A lime bar that sweeps across the top on hover. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent-surface transition-transform duration-700 ease-out group-hover:scale-x-100"
      />
      <time
        dateTime={oration.date ?? oration.year}
        className="text-xs font-semibold tracking-[0.16em] text-accent-700 uppercase"
      >
        {oration.date ? formatDate(oration.date) : oration.year}
      </time>
      {oration.title ? (
        <Heading className="mt-3 font-serif text-xl leading-snug text-ink-strong transition-colors duration-500 group-hover:text-brand">
          “{oration.title}”
        </Heading>
      ) : null}
      <div className="mt-auto flex items-start gap-3 pt-5">
        <Avatar name={oration.speaker} size="sm" />
        <div className="min-w-0">
          <p className="leading-snug font-semibold text-ink-strong">{oration.speaker}</p>
          <p className="mt-1 text-sm leading-relaxed text-ink-muted">{oration.bio}</p>
        </div>
      </div>
    </article>
  );
}
