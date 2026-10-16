import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ArrowRightIcon, CheckIcon, LeafIcon } from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import { fill } from '@/lib/format/template';
import type {
  RuralImmersionList,
  RuralImmersionPage,
} from '@/types/sustainability-rural-immersion';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';
const H2 =
  'font-serif text-[clamp(1.75rem,3.2vw,2.5rem)] leading-tight tracking-[-0.02em] text-ink-strong';
/** A slow lift with a soft shadow — the cards' shared hover, as on the Team page. */
const LIFT =
  'transition-[translate,box-shadow,border-color] duration-500 ease-out hover:border-accent-surface hover:shadow-raised motion-safe:hover:-translate-y-1';
const EYEBROW = 'text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase';
const delay = (ms: number) => ({ ['--rise-delay' as string]: `${ms}ms` });
const stagger = (i: number, columns: number) => ({
  ['--reveal-start' as string]: `${String(4 + (i % columns) * 6)}%`,
});

/**
 * Sustainability › Rural Immersion.
 *
 * ## The model
 *
 *  1. **Hero** — the title, three figures and the programmes the module is
 *     part of, light, in the layout of the other Sustainability pages.
 *  2. **About** — the Delhi page's introduction: the lead paragraph large on
 *     the left, the vision and Assurance of Learning paragraphs beside it.
 *  3. **Purpose** and 4. **Objectives** — numbered cards rather than bullets,
 *     so each reads as a commitment of its own.
 *  5. **The model and the outcomes** — the objectives name the DPSIR model and
 *     the two Program Learning Outcomes in passing; they are drawn out here: the
 *     model as its five stages in sequence, the outcomes as two cards listing
 *     what each covers.
 *
 * Grounds alternate white and grey down the page. Motion is light and slow,
 * in the brand colours: the title rule draws and the hero rises in on load;
 * the cards rise as they scroll into view (`.reveal`, CSS only) and lift on
 * hover with a lime bar. None of it plays under `prefers-reduced-motion`.
 *
 * Content and page copy come from `content/sustainability/rural-immersion.json`. Server
 * Component; no client JavaScript.
 */
export function RuralImmersion({ content }: { content: RuralImmersionPage }) {
  const [lead, ...rest] = content.intro;

  return (
    <article aria-labelledby="rural-heading">
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
              <p className={`flex items-center gap-2.5 ${EYEBROW}`}>
                <LeafIcon size={18} aria-hidden="true" />
                {content.eyebrow}
              </p>
              <h1
                id="rural-heading"
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
                className="rise-in grid grid-cols-3 overflow-hidden rounded-[8px] border border-border"
                style={delay(200)}
              >
                {content.facts.map((fact, index) => (
                  // Label first in the DOM (a <dt> must precede its <dd>), figure
                  // first on screen.
                  <div
                    key={fact.label}
                    className={`group relative flex flex-col-reverse justify-end bg-surface-subtle px-4 py-5 transition-colors duration-500 hover:bg-surface sm:px-6 sm:py-6 ${index > 0 ? 'border-l border-border' : ''}`}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent-surface transition-transform duration-700 ease-out group-hover:scale-x-100"
                    />
                    <dt className="mt-2 text-sm leading-snug text-ink-muted">{fact.label}</dt>
                    <dd className="font-serif text-[clamp(2rem,4vw,2.75rem)] leading-none whitespace-nowrap text-brand">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>

          <div className="rise-in mt-10 flex flex-wrap items-center gap-2" style={delay(320)}>
            <span className="mr-2 text-sm text-ink-muted">{content.programmesLabel}</span>
            <ul className="flex flex-wrap gap-2">
              {content.programmes.map((programme) => (
                <li
                  key={programme}
                  className="rounded-full border border-border-strong px-4 py-1.5 text-sm font-semibold text-ink-strong"
                >
                  {programme}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- about ---------------- */}
      <section aria-labelledby="about-heading" className="bg-surface-subtle">
        <div
          className={`${MEASURE} grid grid-cols-1 gap-10 py-16 md:py-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16 lg:py-24`}
        >
          <div>
            <p className={EYEBROW}>{content.about.eyebrow}</p>
            <h2 id="about-heading" className={`mt-3 ${H2}`}>
              {content.about.heading}
            </h2>
            <span aria-hidden="true" className="mt-5 block h-[3px] w-10 bg-accent-surface" />
            {lead ? (
              <p className="mt-6 text-lg leading-[1.8] text-ink-strong md:text-[1.1875rem]">
                {lead}
              </p>
            ) : null}
          </div>
          <div className="reveal border-l-2 border-accent-surface pl-6 md:pl-8 lg:mt-24">
            {rest.map((paragraph, index) => (
              <p
                key={paragraph}
                className={`text-[0.9375rem] leading-[1.85] text-ink md:text-base ${index > 0 ? 'mt-5' : ''}`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <NumberedList id="purpose" list={content.purpose} grey={false} columns={2} />
      <NumberedList id="objectives" list={content.objectives} grey columns={2} />

      {/* ---------------- model and outcomes ---------------- */}
      <section aria-labelledby="model-heading" className="bg-surface">
        <div className={`${MEASURE} py-16 md:py-20 lg:py-24`}>
          <p className={EYEBROW}>{content.model.eyebrow}</p>
          <h2 id="model-heading" className={`mt-3 ${H2}`}>
            {fill(content.model.heading, { name: content.model.name })}
          </h2>
          <span aria-hidden="true" className="mt-5 block h-[3px] w-10 bg-accent-surface" />
          <p className="mt-5 max-w-2xl text-base leading-[1.8] text-ink md:text-[1.0625rem]">
            {content.model.summary}
          </p>

          {/*
            The stages in sequence: a row of five from `sm`, a column below it.
            The arrow between two stages sits in the gap, centred on it — to
            the right in the row, underneath in the column — so it never
            overlaps the next card (each item is its own stacking context,
            because `.reveal` sets a transform).
          */}
          <ol className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-5">
            {content.model.stages.map((stage, index) => (
              <li key={stage} className="reveal relative" style={stagger(index, 5)}>
                <div
                  className={`group relative flex h-full items-center gap-4 overflow-hidden rounded-[8px] border border-border bg-surface-subtle px-5 py-4 sm:flex-col sm:items-start sm:gap-3 sm:px-6 sm:py-6 ${LIFT}`}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent-surface transition-transform duration-700 ease-out group-hover:scale-x-100"
                  />
                  <span
                    aria-hidden="true"
                    className="font-serif text-4xl leading-none text-brand transition-colors duration-500 group-hover:text-accent-700 md:text-5xl"
                  >
                    {stage[0]}
                  </span>
                  <span className="font-semibold text-ink-strong">{stage}</span>
                </div>
                {index < content.model.stages.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-6 left-1/2 z-10 flex size-6 -translate-x-1/2 rotate-90 items-center justify-center rounded-full bg-accent-surface text-brand-950 sm:top-1/2 sm:-right-6 sm:bottom-auto sm:left-auto sm:translate-x-0 sm:-translate-y-1/2 sm:rotate-0"
                  >
                    <ArrowRightIcon size={12} />
                  </span>
                ) : null}
              </li>
            ))}
          </ol>

          {/* ---- outcomes ---- */}
          <h3 className="mt-16 font-serif text-2xl text-ink-strong md:mt-20 md:text-[1.75rem]">
            {content.outcomesHeading}
          </h3>
          <ul className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
            {content.outcomes.map((outcome, index) => (
              <li key={outcome.name} className="reveal" style={stagger(index, 2)}>
                <div
                  className={`group relative h-full overflow-hidden rounded-[8px] border border-t-[3px] border-border border-t-accent-surface bg-surface p-6 shadow-raised md:p-8 ${LIFT}`}
                >
                  <h4 className="font-serif text-xl leading-snug text-ink-strong transition-colors duration-500 group-hover:text-brand md:text-2xl">
                    {outcome.name}
                  </h4>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {outcome.parts.map((part) => (
                      <li key={part} className="flex items-start gap-3 text-[0.9375rem] text-ink">
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-surface text-brand-950">
                          <CheckIcon size={12} aria-hidden="true" />
                        </span>
                        {part}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}

function NumberedList({
  id,
  list,
  grey,
  columns,
}: {
  id: string;
  list: RuralImmersionList;
  grey: boolean;
  columns: number;
}) {
  const headingId = `${id}-heading`;
  return (
    <section aria-labelledby={headingId} className={grey ? 'bg-surface-subtle' : 'bg-surface'}>
      <div className={`${MEASURE} py-16 md:py-20 lg:py-24`}>
        <h2 id={headingId} className={`max-w-3xl ${H2}`}>
          {list.heading}
        </h2>
        <span aria-hidden="true" className="mt-5 block h-[3px] w-10 bg-accent-surface" />
        <ol className="mt-10 grid grid-cols-1 gap-5 md:mt-12 md:grid-cols-2 md:gap-6">
          {list.items.map((item, index) => (
            // `.reveal` on the item, the hover lift on the card: both set a transform.
            <li key={item} className="reveal" style={stagger(index, columns)}>
              <div
                className={`group relative flex h-full gap-5 overflow-hidden rounded-[8px] border border-border bg-surface p-6 md:p-8 ${LIFT}`}
              >
                {/* A lime bar that draws down the left edge on hover. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-accent-surface transition-transform duration-700 ease-out group-hover:scale-y-100"
                />
                <span
                  aria-hidden="true"
                  className="font-serif text-[2.25rem] leading-none text-accent-700/60 tabular-nums transition-colors duration-500 group-hover:text-accent-700"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="pt-1 text-base leading-[1.75] text-ink-strong md:text-[1.0625rem]">
                  {item}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
