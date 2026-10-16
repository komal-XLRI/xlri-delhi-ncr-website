import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { LeafIcon } from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import { fill } from '@/lib/format/template';
import { Avatar } from '@/features/sustainability/avatar';
import type {
  CommitteeRepresentative,
  StudentCommittee,
  StudentCommitteesPage,
} from '@/types/sustainability-committees';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';
/** A slow lift with a soft shadow — the cards' shared hover, as on the Team page. */
const LIFT =
  'transition-[translate,box-shadow,border-color] duration-500 ease-out hover:border-accent-surface hover:shadow-raised motion-safe:hover:-translate-y-1';
const delay = (ms: number) => ({ ['--rise-delay' as string]: `${ms}ms` });

/**
 * Sustainability › Student Committees.
 *
 * ## The model
 *
 *  1. **Hero** — the title and the page's figures, light, in the Team and
 *     History pages' layout, with a chip per committee that jumps to it.
 *  2. **One section per committee**, on alternating grounds. The Delhi page
 *     puts them behind tabs; here both are on the page, because there are
 *     only two and a tab hides half the content from a reader who scrolls.
 *     The committee's name, founding year and description sit on the left —
 *     sticky on wide screens, so they stay beside a long roster — and its
 *     student representatives on the right: the lead (Convenor or Joint
 *     Secretary) first and wider, then the members.
 *
 * Students have no photographs here, so everyone gets a brand-blue monogram.
 *
 * Motion is light and slow, in the brand colours: the title rule draws and
 * the hero rises in on load; the rosters rise as they scroll into view
 * (`.reveal`, CSS only); cards lift on hover with a lime ring and bar. None of
 * it plays under `prefers-reduced-motion`.
 *
 * Content and page copy come from `content/sustainability/student-committees.json`.
 * Server Component; no client JavaScript.
 */
export function StudentCommittees({ content }: { content: StudentCommitteesPage }) {
  const { committees } = content;
  const people = committees.reduce((sum, c) => sum + c.representatives.length, 0);
  const oldest = committees.reduce((min, c) => (c.founded < min ? c.founded : min), '9999');
  const facts = [
    { id: 'committees', value: String(committees.length), label: content.facts.committees },
    { id: 'people', value: String(people), label: content.facts.people },
    { id: 'since', value: oldest, label: content.facts.since },
  ];

  return (
    <article aria-labelledby="committees-heading">
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
                id="committees-heading"
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

          <nav aria-label="Jump to a committee" className="rise-in mt-10" style={delay(320)}>
            <ul className="flex flex-wrap gap-2">
              {committees.map((committee) => (
                <li key={committee.id}>
                  <a
                    href={`#${committee.id}`}
                    className="inline-flex items-center rounded-full border border-border-strong px-4 py-1.5 text-sm font-medium text-ink-strong transition-colors duration-500 hover:border-accent-surface hover:bg-accent-surface hover:text-brand-950"
                  >
                    {committee.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {committees.map((committee, index) => (
        <CommitteeSection
          key={committee.id}
          committee={committee}
          labels={content.labels}
          grey={index % 2 === 0}
        />
      ))}
    </article>
  );
}

function CommitteeSection({
  committee,
  labels,
  grey,
}: {
  committee: StudentCommittee;
  labels: StudentCommitteesPage['labels'];
  grey: boolean;
}) {
  const [lead, ...members] = committee.representatives;
  const [first, ...rest] = committee.body;
  const headingId = `${committee.id}-heading`;

  return (
    <section
      id={committee.id}
      aria-labelledby={headingId}
      className={`scroll-mt-32 ${grey ? 'bg-surface-subtle' : 'bg-surface'}`}
    >
      <div
        className={`${MEASURE} grid grid-cols-1 gap-10 py-16 md:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-16 lg:py-24`}
      >
        <div className="lg:sticky lg:top-[8.5rem] lg:self-start">
          <p className="text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase">
            {fill(labels.since, { year: committee.founded })}
          </p>
          <h2
            id={headingId}
            className="mt-3 font-serif text-[clamp(2rem,4vw,3rem)] leading-tight tracking-[-0.02em] text-brand"
          >
            {committee.name}
          </h2>
          <span aria-hidden="true" className="mt-5 block h-[3px] w-10 bg-accent-surface" />
          {first ? (
            <p className="mt-6 text-base leading-[1.8] text-ink-strong md:text-[1.0625rem]">
              {first}
            </p>
          ) : null}
          {rest.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-[0.9375rem] leading-[1.8] text-ink">
              {paragraph}
            </p>
          ))}
        </div>

        <div>
          <h3 className="text-xs font-semibold tracking-[0.18em] text-ink-muted uppercase">
            {labels.representatives}
          </h3>

          {lead ? (
            <div className="reveal mt-5">
              <div
                className={`group relative flex items-center gap-5 overflow-hidden rounded-[8px] border border-t-[3px] border-border border-t-accent-surface bg-surface p-6 shadow-raised md:gap-6 md:p-8 ${LIFT}`}
              >
                <Avatar name={lead.name} size="md" />
                <span className="min-w-0">
                  <span className="block font-serif text-2xl leading-tight text-ink-strong transition-colors duration-500 group-hover:text-brand">
                    {lead.name}
                  </span>
                  <span className="mt-1.5 block text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase">
                    {lead.role}
                  </span>
                </span>
              </div>
            </div>
          ) : null}

          <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {members.map((member, i) => (
              // `.reveal` on the item, the hover lift on the card: both set a transform.
              <li
                key={member.name}
                className="reveal"
                style={{ ['--reveal-start' as string]: `${String(4 + (i % 2) * 6)}%` }}
              >
                <Representative member={member} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Representative({ member }: { member: CommitteeRepresentative }) {
  return (
    <div
      className={`group relative flex h-full items-center gap-4 overflow-hidden rounded-[8px] border border-border bg-surface p-4 md:p-5 ${LIFT}`}
    >
      {/* A lime bar that draws down the left edge on hover. */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-accent-surface transition-transform duration-700 ease-out group-hover:scale-y-100"
      />
      <Avatar name={member.name} size="sm" />
      <span className="min-w-0 flex-1">
        <span className="block font-serif text-lg leading-snug text-ink-strong transition-colors duration-500 group-hover:text-brand">
          {member.name}
        </span>
        <span className="mt-0.5 block text-sm text-ink-muted">{member.role}</span>
      </span>
    </div>
  );
}
