import NextLink from 'next/link';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ArrowRightIcon, LeafIcon } from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import type {
  SustainabilityHistoryPage,
  SustainabilityMilestone,
} from '@/types/sustainability-history';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';
/** A slow lift with a soft shadow — the cards' shared hover, as on the Team page. */
const LIFT =
  'transition-[translate,box-shadow,border-color] duration-500 ease-out hover:border-accent-surface hover:shadow-raised motion-safe:hover:-translate-y-1';
const delay = (ms: number) => ({ ['--rise-delay' as string]: `${ms}ms` });

/** Consecutive milestones that share a year, in order. */
function byYear(milestones: readonly SustainabilityMilestone[]) {
  const groups: { year: string; milestones: SustainabilityMilestone[] }[] = [];
  for (const milestone of milestones) {
    const last = groups.at(-1);
    if (last?.year === milestone.year) last.milestones.push(milestone);
    else groups.push({ year: milestone.year, milestones: [milestone] });
  }
  return groups;
}

/**
 * Sustainability › History.
 *
 * ## The model
 *
 *  1. **Hero** — the title and three headline facts, light, in the Team
 *     page's layout, with a row of years that jump to their place below.
 *  2. **Timeline** — a vertical rail. Milestones that share a year are grouped
 *     under it: on wide screens the year sits in a column of its own and stays
 *     in view while its milestones scroll past; narrower, it heads the group.
 *     Each milestone is a card on the rail with a lime node.
 *  3. A link on to the Team page.
 *
 * Motion is light and slow, in the brand colours: the title rule draws and
 * the hero rises in on load; the rail draws and the cards rise as they scroll
 * into view (`.reveal`, CSS only); cards lift on hover with a lime bar and
 * their node fills. None of it plays under `prefers-reduced-motion`.
 *
 * Content and page copy come from `content/sustainability/history.json`. Server
 * Component; no client JavaScript.
 */
export function SustainabilityHistory({ content }: { content: SustainabilityHistoryPage }) {
  const groups = byYear(content.milestones);

  return (
    <article aria-labelledby="history-heading">
      {/* ---------------- hero ---------------- */}
      <section className="bg-surface">
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
                id="history-heading"
                className="mt-3 font-serif text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.03] tracking-[-0.03em] text-balance text-brand"
              >
                {content.title}
              </h1>
              <span
                aria-hidden="true"
                className="rule-draw mt-6 block h-[3px] w-14 origin-left bg-accent-surface"
              />
            </div>

            {content.facts.length > 0 ? (
              <dl
                className="rise-in grid grid-cols-1 overflow-hidden rounded-[8px] border border-border sm:grid-cols-3"
                style={delay(200)}
              >
                {content.facts.map((fact, index) => (
                  // Label first in the DOM (a <dt> must precede its <dd>), figure
                  // first on screen.
                  <div
                    key={fact.label}
                    className={`group relative flex flex-col-reverse justify-end bg-surface-subtle px-6 py-6 transition-colors duration-500 hover:bg-surface ${index > 0 ? 'border-t border-border sm:border-t-0 sm:border-l' : ''}`}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent-surface transition-transform duration-700 ease-out group-hover:scale-x-100"
                    />
                    <dt className="mt-2 text-sm leading-snug text-ink-muted">{fact.label}</dt>
                    <dd className="font-serif text-[clamp(2.25rem,4vw,2.75rem)] leading-none text-brand">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>

          {/* The years, as a way in. */}
          <nav aria-label="Jump to a year" className="rise-in mt-10" style={delay(320)}>
            <ul className="flex flex-wrap gap-2">
              {groups.map((group) => (
                <li key={group.year}>
                  <a
                    href={`#year-${group.year}`}
                    className="inline-flex items-center rounded-full border border-border-strong px-4 py-1.5 text-sm font-medium text-ink-strong tabular-nums transition-colors duration-500 hover:border-accent-surface hover:bg-accent-surface hover:text-brand-950"
                  >
                    {group.year}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* ---------------- timeline ---------------- */}
      {/*
        `overflow-clip`, not `overflow-hidden`, so the motif is cropped at the
        section's edge without breaking the sticky year column.
      */}
      <section
        aria-label="Milestones"
        data-motif="profile"
        className="relative isolate overflow-clip bg-surface-subtle"
      >
        <div className={`${MEASURE} py-16 md:py-20 lg:py-24`}>
          <ol className="relative">
            {/* The rail: one line through every group, drawn as it scrolls in. */}
            <span
              aria-hidden="true"
              className="reveal-rule absolute top-2 bottom-2 left-[7px] w-px bg-border-strong lg:left-[calc(11rem+7px)]"
            />
            {groups.map((group) => (
              <li
                key={group.year}
                id={`year-${group.year}`}
                className="relative grid scroll-mt-36 grid-cols-1 gap-5 pb-12 last:pb-0 lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-0 lg:pb-16"
              >
                <h2 className="pl-10 lg:pl-0">
                  <span className="block font-serif text-[clamp(2.5rem,5vw,3.5rem)] leading-none text-brand tabular-nums lg:sticky lg:top-[8.5rem]">
                    {group.year}
                  </span>
                </h2>

                <ul className="flex flex-col gap-5 md:gap-6">
                  {group.milestones.map((milestone) => (
                    <li
                      key={milestone.id}
                      id={milestone.id}
                      className="group relative pl-10 lg:pl-12"
                    >
                      {/* The node on the rail; it fills lime when the card is hovered. */}
                      <span
                        aria-hidden="true"
                        className="absolute top-7 left-0 z-10 size-[15px] rounded-full border-2 border-brand bg-surface-subtle transition-[background-color,border-color,scale] duration-500 group-hover:scale-125 group-hover:border-accent-700 group-hover:bg-accent-surface lg:top-9"
                      />
                      <Milestone milestone={milestone} />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- onward ---------------- */}
      <section className="bg-surface">
        <div
          className={`${MEASURE} flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center md:py-16`}
        >
          <p className="max-w-xl font-serif text-[clamp(1.5rem,2.6vw,2rem)] leading-tight text-ink-strong">
            {content.onward.text}
          </p>
          <NextLink
            href={routes.sustainability.team}
            className="group inline-flex items-center gap-3 rounded-full border border-border-strong bg-surface py-2 pr-5 pl-2 text-[0.9375rem] font-semibold text-ink-strong transition-[border-color,box-shadow] duration-500 hover:border-accent-surface hover:shadow-raised"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-accent-surface text-brand-950 transition-transform duration-500 ease-out motion-safe:group-hover:translate-x-0.5">
              <ArrowRightIcon size={15} aria-hidden="true" />
            </span>
            <span className="transition-colors duration-500 group-hover:text-brand">
              {content.onward.linkLabel}
            </span>
          </NextLink>
        </div>
      </section>
    </article>
  );
}

function Milestone({ milestone }: { milestone: SustainabilityMilestone }) {
  const [lead, ...rest] = milestone.body;
  return (
    // `.reveal` and the hover lift sit on separate elements: both set a
    // transform. The `group` is the list item, which also holds the rail node.
    <div className="reveal">
      <div
        className={`relative overflow-hidden rounded-[8px] border border-border bg-surface p-6 md:p-8 ${LIFT}`}
      >
        {/* A lime bar that draws down the left edge on hover. */}
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-accent-surface transition-transform duration-700 ease-out group-hover:scale-y-100"
        />
        <h3 className="font-serif text-xl leading-snug text-ink-strong transition-colors duration-500 group-hover:text-brand md:text-2xl">
          {milestone.title}
        </h3>
        {lead ? (
          <p className="mt-3 text-base leading-[1.8] text-ink md:text-[1.0625rem]">{lead}</p>
        ) : null}
        {rest.map((paragraph) => (
          <p key={paragraph} className="mt-3 text-[0.9375rem] leading-[1.8] text-ink-muted">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
