import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { LeafIcon } from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import { fill } from '@/lib/format/template';
import type {
  SustainabilityCourse,
  SustainabilityCoursesPage,
} from '@/types/sustainability-courses';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';
/** A slow lift with a soft shadow — the cards' shared hover, as on the Team page. */
const LIFT =
  'transition-[translate,box-shadow,border-color] duration-500 ease-out hover:border-accent-surface hover:shadow-raised motion-safe:hover:-translate-y-1';
const delay = (ms: number) => ({ ['--rise-delay' as string]: `${ms}ms` });

/**
 * Sustainability › Courses.
 *
 * ## The model
 *
 *  1. **Hero** — the title and three headline figures, light, in the layout
 *     of the other Sustainability pages, with the triangle motif in the
 *     right-hand margin.
 *  2. **The courses**, one numbered card each, on grey. Wide, the number,
 *     name and tags sit on the left and the description on the right, so six
 *     long descriptions read as an index rather than a wall. The core course
 *     carries a lime top edge and its tags; a course that lists the UN SDGs it
 *     covers shows them as numbered goals rather than one run-on sentence.
 *
 * Motion is light and slow, in the brand colours: the title rule draws and
 * the hero rises in on load; the cards rise as they scroll into view
 * (`.reveal`, CSS only) and lift on hover with a lime bar. None of it plays
 * under `prefers-reduced-motion`.
 *
 * Content and page copy come from `content/sustainability/courses.json`. Server Component;
 * no client JavaScript.
 */
export function SustainabilityCourses({ content }: { content: SustainabilityCoursesPage }) {
  return (
    <article aria-labelledby="courses-heading">
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
                id="courses-heading"
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
                    <dd className="font-serif text-[clamp(2rem,4vw,2.75rem)] leading-none text-brand">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>
        </div>
      </section>

      {/* ---------------- courses ---------------- */}
      <section aria-label="Courses" className="bg-surface-subtle">
        <div className={`${MEASURE} py-16 md:py-20 lg:py-24`}>
          <ol className="flex flex-col gap-5 md:gap-6">
            {content.courses.map((course, index) => (
              // `.reveal` on the item, the hover lift on the card: both set a transform.
              <li key={course.id} id={course.id} className="reveal scroll-mt-36">
                <CourseCard course={course} number={index + 1} labels={content.labels} />
              </li>
            ))}
          </ol>
        </div>
      </section>
    </article>
  );
}

function CourseCard({
  course,
  number,
  labels,
}: {
  course: SustainabilityCourse;
  number: number;
  labels: SustainabilityCoursesPage['labels'];
}) {
  const [lead, ...rest] = course.body;
  const tags = [
    course.core ? labels.coreCourse : null,
    course.since ? fill(labels.since, { year: course.since }) : null,
  ];

  return (
    <div
      className={`group relative grid grid-cols-1 gap-5 overflow-hidden rounded-[8px] border border-border bg-surface p-6 md:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-14 lg:p-10 ${course.core ? 'border-t-[3px] border-t-accent-surface shadow-raised' : ''} ${LIFT}`}
    >
      {/* A lime bar that draws down the left edge on hover. */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-accent-surface transition-transform duration-700 ease-out group-hover:scale-y-100"
      />

      <div>
        <span
          aria-hidden="true"
          className="block font-serif text-[2.5rem] leading-none text-accent-700/60 tabular-nums transition-colors duration-500 group-hover:text-accent-700"
        >
          {String(number).padStart(2, '0')}
        </span>
        <h2 className="mt-4 font-serif text-[clamp(1.375rem,2.2vw,1.75rem)] leading-snug text-ink-strong transition-colors duration-500 group-hover:text-brand">
          {course.name}
        </h2>
        {tags.some(Boolean) ? (
          <p className="mt-4 flex flex-wrap gap-2">
            {tags.filter(Boolean).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-accent-surface/25 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-accent-700 uppercase"
              >
                {tag}
              </span>
            ))}
          </p>
        ) : null}
      </div>

      <div>
        {lead ? (
          <p className="text-base leading-[1.8] text-ink-strong md:text-[1.0625rem]">{lead}</p>
        ) : null}
        {rest.map((paragraph) => (
          <p key={paragraph} className="mt-4 text-[0.9375rem] leading-[1.8] text-ink">
            {paragraph}
          </p>
        ))}
        {course.sdgs ? (
          <ul className="mt-5 flex flex-col gap-3">
            {course.sdgs.map((sdg) => (
              <li key={sdg.goal} className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white tabular-nums">
                  <span className="sr-only">Goal </span>
                  {sdg.goal}
                </span>
                <span className="pt-1.5 text-[0.9375rem] leading-snug text-ink">{sdg.label}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
