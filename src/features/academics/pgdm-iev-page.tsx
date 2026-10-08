import Image from 'next/image';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import {
  ArrowRightIcon,
  AwardIcon,
  BookIcon,
  BriefcaseIcon,
  CheckIcon,
  ChevronDownIcon,
  CompassIcon,
  ExternalIcon,
  GlobeIcon,
  LandmarkIcon,
  LightbulbIcon,
  MapPinIcon,
  SparkIcon,
  type IconProps,
} from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import type { IevIcon, IevVideo, PgdmIevPage as IevContent } from '@/types/pgdm-iev';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';
const H2 =
  'font-serif text-[clamp(1.75rem,3.2vw,2.5rem)] leading-tight tracking-[-0.02em] text-ink-strong';
const BODY = 'text-base leading-[1.85] text-ink md:text-[1.0625rem]';
const EYEBROW = 'text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase';

const ICONS: Record<IevIcon, (props: IconProps) => React.ReactElement> = {
  graduate: BookIcon,
  switch: CompassIcon,
  family: LandmarkIcon,
  professional: BriefcaseIcon,
  training: BookIcon,
  funding: AwardIcon,
  partners: SparkIcon,
  office: MapPinIcon,
  mentorship: LightbulbIcon,
  network: GlobeIcon,
};

/** The in-page index, in page order. Each id is a section below. */
const SECTIONS = [
  { id: 'why-apply', label: 'Why apply' },
  { id: 'admissions', label: 'Eligibility & selection' },
  { id: 'important-dates', label: 'Important dates' },
  { id: 'program-team', label: 'Program team' },
  { id: 'xceed', label: 'XCEED incubator' },
  { id: 'events', label: 'Events' },
  { id: 'startups', label: 'Startups' },
  { id: 'contact', label: 'Contact' },
  { id: 'faq', label: 'FAQ' },
] as const;

/**
 * PGDM - IEV.
 *
 * ## The model
 *
 * The Delhi page is two things at once — an admissions page and a showcase of
 * the incubator around the programme — and runs to fourteen sections. The
 * design makes that length navigable rather than cutting it:
 *
 *  1. **Hero** — the full name, Apply and Brochure as the two primary
 *     actions, beside the cohort photograph; then an index of the page's
 *     sections, as the Delhi page has, set as chips.
 *  2. **About** — the introduction beside the IEV intro video, with four facts
 *     the text states.
 *  3. **Admissions** — who should apply, then eligibility, the three selection
 *     rounds as numbered steps, and the important dates.
 *  4. **People** — the program team, student representatives.
 *  5. **Ecosystem** — XCEED and its benefits, partners, events (with the
 *     ElevateX recap), activities, and the startups the programme produced.
 *  6. **After** — alumni benefits, contacts, FAQ.
 *
 * Both videos are `preload="none"`: at 45 MB and 103 MB, nothing is fetched
 * until a visitor presses play.
 *
 * Server Component; no client JavaScript. The FAQ is native `<details>`.
 */
export function PgdmIevPage({ content }: { content: IevContent }) {
  const {
    whyApply,
    eligibility,
    selection,
    dates,
    team,
    xceed,
    events,
    activities,
    startups,
    alumni,
    contacts,
    faq,
  } = content;

  return (
    <article aria-labelledby="programme-heading">
      {/* ---------------- hero ---------------- */}
      <section className="bg-surface">
        <div className={`${MEASURE} pt-10 pb-12 md:pt-14 md:pb-16`}>
          <Breadcrumbs
            items={[
              { label: 'Home', href: routes.home },
              { label: 'Academics' },
              { label: content.shortName },
            ]}
          />

          <div className="mt-10 grid grid-cols-1 items-center gap-10 md:mt-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14">
            <div>
              <p className={EYEBROW}>{content.school} · PGDMIEV</p>
              <h1
                id="programme-heading"
                className="mt-3 font-serif text-[clamp(2.25rem,4.6vw,3.5rem)] leading-[1.04] tracking-[-0.03em] text-balance text-brand"
              >
                {content.title}
                <span className="mt-3 block text-[0.56em] leading-[1.2] text-ink-strong">
                  {content.subtitle}
                </span>
              </h1>
              <span aria-hidden="true" className="mt-7 block h-[3px] w-14 bg-accent-surface" />

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={content.apply.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full bg-brand py-2.5 pr-5 pl-2.5 text-[0.9375rem] font-semibold text-white transition-colors duration-200 hover:bg-brand-950"
                >
                  <span className="flex size-8 items-center justify-center rounded-full bg-accent-surface text-brand-950">
                    <ArrowRightIcon
                      size={15}
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </span>
                  {content.apply.label}
                  <span className="sr-only"> (application portal, opens in a new tab)</span>
                </a>
                <a
                  href={content.brochure.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-3 text-[0.9375rem] font-semibold text-ink-strong transition-colors duration-200 hover:border-brand hover:text-brand"
                >
                  {content.brochure.label}
                  <span className="font-normal text-ink-muted">{content.brochure.meta}</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </div>

            <div className="relative">
              <span
                aria-hidden="true"
                className="absolute -right-3 -bottom-3 hidden h-full w-full rounded-[8px] border-2 border-accent-surface/70 md:block"
              />
              <div className="relative aspect-[4/3] overflow-hidden rounded-[8px] shadow-raised">
                <Image
                  src={content.heroImage.src}
                  alt={content.heroImage.alt}
                  fill
                  // Above the fold — the LCP element. `preload` replaces the
                  // deprecated `priority` in Next 16.
                  preload
                  sizes="(min-width: 1280px) 560px, (min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <nav aria-label="On this page" className="mt-12 border-t border-border pt-6 md:mt-14">
            <ul className="flex flex-wrap gap-2">
              {SECTIONS.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="inline-block rounded-full border border-border px-3.5 py-1.5 text-sm text-ink transition-colors duration-200 hover:border-brand hover:text-brand"
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* ---------------- about ---------------- */}
      <section aria-label="About the programme" className="bg-surface">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14">
            <p className={`${BODY} md:text-justify md:hyphens-auto`}>{content.intro}</p>
            <Video video={content.introVideo} />
          </div>

          <dl className="mt-12 grid grid-cols-2 overflow-hidden rounded-[8px] border border-border lg:grid-cols-4">
            {content.facts.map((fact, index) => (
              // Label first in the DOM (a <dt> must precede its <dd>), figure
              // first on screen.
              <div
                key={fact.id}
                className={`flex flex-col-reverse justify-end bg-surface-subtle px-5 py-6 md:px-7 ${
                  index % 2 === 1 ? 'border-l border-border' : ''
                } ${index >= 2 ? 'border-t border-border lg:border-t-0' : ''} ${
                  index === 2 ? 'lg:border-l' : ''
                }`}
              >
                <dt className="mt-2 text-sm leading-snug text-ink-muted">{fact.label}</dt>
                <dd className="font-serif text-[1.75rem] leading-none text-brand">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------------- why apply ---------------- */}
      <section
        id="why-apply"
        aria-labelledby="why-heading"
        className="scroll-mt-40 bg-surface-subtle"
      >
        <div className={`${MEASURE} py-14 md:py-20`}>
          <div className="max-w-[46rem]">
            <h2 id="why-heading" className={H2}>
              {whyApply.heading}
            </h2>
            <p className="mt-4 font-serif text-xl leading-snug text-ink-strong">{whyApply.lead}</p>
            <p className="mt-3 text-ink-muted">{whyApply.note}</p>
          </div>
          <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {whyApply.audiences.map((audience) => {
              const Icon = ICONS[audience.icon];
              return (
                <li
                  key={audience.id}
                  className="flex gap-5 rounded-[8px] border border-border bg-surface p-6 md:p-7"
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent-50 text-accent-700">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <p className="text-[0.9375rem] leading-[1.75] text-ink">{audience.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ---------------- eligibility + selection ---------------- */}
      <section id="admissions" aria-label="Admissions" className="scroll-mt-40 bg-surface">
        <div
          className={`${MEASURE} grid grid-cols-1 gap-14 py-14 md:py-20 lg:grid-cols-2 lg:gap-16`}
        >
          <div>
            <h2 className={H2}>{eligibility.heading}</h2>
            <span aria-hidden="true" className="mt-4 block h-[3px] w-10 bg-accent-surface" />
            <div className={`mt-6 space-y-4 ${BODY}`}>
              {eligibility.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
            <p className={`mt-6 ${EYEBROW}`}>Accepted entrance tests</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {eligibility.tests.map((test) => (
                <li
                  key={test}
                  className="rounded-full border border-brand/30 bg-surface-subtle px-3.5 py-1 text-sm font-semibold text-brand"
                >
                  {test}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={H2}>{selection.heading}</h2>
            <span aria-hidden="true" className="mt-4 block h-[3px] w-10 bg-accent-surface" />
            <ol className="mt-8 space-y-0">
              {selection.rounds.map((round, index) => (
                <li key={round.id} className="relative flex gap-5 pb-8 last:pb-0">
                  {index < selection.rounds.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="absolute top-12 bottom-0 left-6 w-px bg-border-strong/60"
                    />
                  ) : null}
                  <span className="relative flex size-12 shrink-0 items-center justify-center rounded-full bg-brand font-serif text-lg text-white">
                    {index + 1}
                  </span>
                  <div className="pt-2.5">
                    <p className="text-xs font-semibold tracking-[0.14em] text-accent-700 uppercase">
                      Round {index + 1}
                    </p>
                    <p className="mt-1 font-serif text-xl leading-snug text-ink-strong">
                      {round.title}
                    </p>
                    {round.detail ? (
                      <p className="mt-2 text-[0.9375rem] leading-[1.7] text-ink-muted">
                        {round.detail}
                      </p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-8 rounded-[8px] border border-t-[3px] border-border border-t-accent-surface bg-surface-subtle p-5">
              <p className="text-sm text-ink-muted">Application deadline</p>
              <p className="mt-1 font-serif text-xl text-ink-strong">{selection.deadline}</p>
              <p className="mt-3 text-[0.9375rem] leading-[1.7] text-ink">{selection.note}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- dates ---------------- */}
      <section
        id="important-dates"
        aria-labelledby="dates-heading"
        className="scroll-mt-40 bg-surface-subtle"
      >
        <div className={`${MEASURE} py-14 md:py-16`}>
          <h2 id="dates-heading" className={H2}>
            {dates.heading}
          </h2>
          <span aria-hidden="true" className="mt-4 block h-[3px] w-10 bg-accent-surface" />
          <ol className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {dates.items.map((item) => (
              <li
                key={item.id}
                className="rounded-[8px] border border-t-[3px] border-border border-t-accent-surface bg-surface p-6 md:p-7"
              >
                <p className="text-sm font-semibold tracking-[0.14em] text-accent-700 uppercase">
                  {item.label}
                </p>
                <p className="mt-3 font-serif text-2xl leading-snug text-ink-strong">
                  {item.value}
                </p>
                {item.tentative ? (
                  <p className="mt-2 text-sm text-ink-muted italic">Tentative</p>
                ) : null}
              </li>
            ))}
          </ol>
          <a
            href={content.apply.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-brand hover:text-brand-950"
          >
            {content.apply.label}
            <ExternalIcon size={14} aria-hidden="true" />
            <span className="sr-only"> (application portal, opens in a new tab)</span>
          </a>
        </div>
      </section>

      {/* ---------------- program team ---------------- */}
      <section id="program-team" aria-labelledby="team-heading" className="scroll-mt-40 bg-surface">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <h2 id="team-heading" className={H2}>
            {team.heading}
          </h2>
          <span aria-hidden="true" className="mt-4 block h-[3px] w-10 bg-accent-surface" />

          <ul className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {team.people.map((person) => (
              <li
                key={person.id}
                className="grid grid-cols-1 gap-6 rounded-[8px] border border-border bg-surface p-6 sm:grid-cols-[9rem_minmax(0,1fr)] md:p-8"
              >
                <div className="mx-auto w-36 overflow-hidden rounded-[6px] sm:mx-0 sm:w-full">
                  <Image
                    src={person.portrait.src}
                    width={person.portrait.width}
                    height={person.portrait.height}
                    alt={person.portrait.alt}
                    sizes="144px"
                    className="aspect-[3/4] w-full object-cover object-top"
                  />
                </div>
                <div>
                  <p className="font-serif text-2xl leading-tight text-ink-strong">{person.name}</p>
                  <p className="mt-1 text-sm font-semibold tracking-[0.14em] text-accent-700 uppercase">
                    {person.role}
                  </p>
                  <p className="mt-4 text-[0.9375rem] leading-[1.75] text-ink">{person.bio}</p>
                </div>
              </li>
            ))}
          </ul>

          <h3 className="mt-14 font-serif text-2xl text-ink-strong">{team.studentsHeading}</h3>
          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {team.students.map((student) => (
              <li
                key={student.id}
                className="flex flex-col rounded-[8px] border border-border bg-surface-subtle p-5"
              >
                <p className="font-serif text-lg leading-snug text-ink-strong">{student.name}</p>
                <a
                  href={`mailto:${student.email}`}
                  className="mt-2 text-sm break-all text-ink-muted hover:text-brand"
                >
                  {student.email}
                </a>
                <a
                  href={student.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-brand"
                >
                  LinkedIn
                  <ExternalIcon size={13} aria-hidden="true" className="text-accent-700" />
                  <span className="sr-only"> profile of {student.name} (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- XCEED ---------------- */}
      <section
        id="xceed"
        aria-labelledby="xceed-heading"
        className="scroll-mt-40 bg-surface-subtle"
      >
        <div className={`${MEASURE} py-14 md:py-20`}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
            <h2 id="xceed-heading" className={H2}>
              {xceed.heading}
            </h2>
            <div>
              <p className={BODY}>{xceed.intro}</p>
              <p className="mt-4 font-semibold text-ink-strong">{xceed.benefitsLead}</p>
            </div>
          </div>

          <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {xceed.benefits.map((benefit) => {
              const Icon = ICONS[benefit.icon];
              return (
                <li
                  key={benefit.id}
                  className="rounded-[8px] border border-t-[3px] border-border border-t-accent-surface bg-surface p-6"
                >
                  <span className="flex size-11 items-center justify-center rounded-full bg-accent-50 text-accent-700">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-serif text-xl text-ink-strong">{benefit.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-[1.7] text-ink">{benefit.text}</p>
                </li>
              );
            })}
          </ul>

          <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-16">
            {[xceed.partnerships, xceed.visits].map((block) => (
              <div key={block.heading}>
                <h3 className="font-serif text-2xl text-ink-strong">{block.heading}</h3>
                <p className={`mt-3 ${BODY}`}>{block.text}</p>
              </div>
            ))}
          </div>

          <p className={`mt-12 ${EYEBROW}`}>{xceed.partnersHeading}</p>
          <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {xceed.partners.map((partner) => (
              <li
                key={partner.id}
                className="flex h-28 items-center justify-center rounded-[8px] border border-border bg-white px-3 py-2"
              >
                <Image
                  src={partner.logo.src}
                  width={partner.logo.width}
                  height={partner.logo.height}
                  alt={partner.logo.alt}
                  sizes="180px"
                  className="h-auto max-h-[4.5rem] w-full object-contain"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- events ---------------- */}
      <section id="events" aria-labelledby="events-heading" className="scroll-mt-40 bg-surface">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <h2 id="events-heading" className={H2}>
            {events.heading}
          </h2>
          <span aria-hidden="true" className="mt-4 block h-[3px] w-10 bg-accent-surface" />

          <div className="mt-10 space-y-12 md:space-y-16">
            {events.items.map((event, index) => (
              <article
                key={event.id}
                aria-labelledby={`${event.id}-heading`}
                className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14"
              >
                <div
                  className={`overflow-hidden rounded-[8px] shadow-raised ${
                    index % 2 === 1 ? 'lg:order-2' : ''
                  }`}
                >
                  <Image
                    src={event.image.src}
                    width={event.image.width}
                    height={event.image.height}
                    alt={event.image.alt}
                    sizes="(min-width: 1280px) 560px, (min-width: 1024px) 45vw, 100vw"
                    className="h-auto w-full"
                  />
                </div>
                <div>
                  <h3
                    id={`${event.id}-heading`}
                    className="font-serif text-2xl leading-tight text-ink-strong md:text-[1.75rem]"
                  >
                    {event.title}
                  </h3>
                  <div className="mt-4 space-y-4 text-[0.9375rem] leading-[1.8] text-ink md:text-base">
                    {event.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-14 max-w-[52rem] md:mt-20">
            <Video video={events.recap} />
          </div>
        </div>
      </section>

      {/* ---------------- activities ---------------- */}
      <section aria-labelledby="activities-heading" className="bg-surface-subtle">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <h2 id="activities-heading" className={H2}>
            {activities.heading}
          </h2>
          <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {activities.items.map((activity) => (
              <li
                key={activity.id}
                className="overflow-hidden rounded-[8px] border border-border bg-surface"
              >
                <Image
                  src={activity.image.src}
                  width={activity.image.width}
                  height={activity.image.height}
                  alt={activity.image.alt}
                  sizes="(min-width: 1280px) 580px, (min-width: 768px) 46vw, 100vw"
                  className="aspect-video h-auto w-full object-cover"
                />
                <div className="p-6 md:p-7">
                  <h3 className="font-serif text-xl text-ink-strong md:text-2xl">
                    {activity.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-[1.75] text-ink">{activity.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- startups ---------------- */}
      <section id="startups" aria-labelledby="startups-heading" className="scroll-mt-40 bg-surface">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="startups-heading" className={H2}>
              {startups.heading}
            </h2>
            <p className="text-sm text-ink-muted">
              {startups.items.length} ventures from the programme
            </p>
          </div>
          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {startups.items.map((item) => (
              <li
                key={item.id}
                className="flex gap-4 rounded-[8px] border border-border bg-surface p-4 transition-[border-color,box-shadow] duration-300 hover:border-border-strong hover:shadow-raised"
              >
                <Image
                  src={item.logo}
                  width={200}
                  height={200}
                  alt=""
                  sizes="72px"
                  className="size-[4.5rem] shrink-0 rounded-[6px] border border-border object-contain"
                />
                <div className="min-w-0">
                  <p className="font-semibold tracking-[0.04em] text-ink-strong">{item.name}</p>
                  <p className="mt-1 text-sm leading-snug text-ink-muted">{item.description}</p>
                  {item.links.length > 0 ? (
                    <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                      {item.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold text-brand hover:underline"
                        >
                          {link.kind}
                          <span className="sr-only"> for {item.name} (opens in a new tab)</span>
                        </a>
                      ))}
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- alumni ---------------- */}
      <section aria-labelledby="alumni-heading" className="bg-surface-subtle">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
            <div>
              <h2 id="alumni-heading" className={H2}>
                {alumni.heading}
              </h2>
              <span aria-hidden="true" className="mt-4 block h-[3px] w-10 bg-accent-surface" />
              <p className="mt-5 text-ink-muted">{alumni.lead}</p>
            </div>
            <ul className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
              {alumni.benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex gap-3 rounded-[8px] border border-border bg-surface p-4 text-[0.9375rem] leading-[1.65] text-ink"
                >
                  <CheckIcon
                    size={16}
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-accent-700"
                  />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- contact ---------------- */}
      <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-40 bg-surface">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <h2 id="contact-heading" className={H2}>
            {contacts.heading}
          </h2>
          <span aria-hidden="true" className="mt-4 block h-[3px] w-10 bg-accent-surface" />
          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contacts.people.map((person) => (
              <li
                key={person.id}
                className="rounded-[8px] border border-border bg-surface-subtle p-6"
              >
                <p className="font-serif text-xl leading-snug text-ink-strong">{person.name}</p>
                <p className="mt-1 text-sm text-ink-muted">{person.department}</p>
                <p className="mt-4">
                  <a
                    href={`tel:${person.phone.replace(/\s+/g, '')}`}
                    className="font-semibold text-ink-strong hover:text-brand"
                  >
                    {person.phone}
                  </a>
                </p>
                <p className="mt-1">
                  <a
                    href={`mailto:${person.email}`}
                    className="text-sm break-all text-brand hover:underline"
                  >
                    {person.email}
                  </a>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-40 bg-surface-subtle">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
            <h2 id="faq-heading" className={H2}>
              {faq.heading}
            </h2>
            <div className="divide-y divide-border rounded-[8px] border border-border bg-surface">
              {faq.items.map((item, index) => (
                <details key={item.id} open={index === 0} className="group">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 p-5 font-serif text-lg leading-snug text-ink-strong md:p-6 [&::-webkit-details-marker]:hidden">
                    {item.question}
                    <ChevronDownIcon
                      size={18}
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-accent-700 transition-transform duration-200 group-open:rotate-180"
                    />
                  </summary>
                  <p className="px-5 pb-6 text-[0.9375rem] leading-[1.8] text-ink md:px-6">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

function Video({ video }: { video: IevVideo }) {
  return (
    <figure>
      <div className="overflow-hidden rounded-[8px] bg-brand-950 shadow-raised">
        {/*
          No caption track exists for either film on the Delhi site, and an
          empty one would claim captions that are not there. Add a WebVTT track
          when one is produced.
        */}
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          controls
          preload="none"
          poster={video.poster}
          className="aspect-video w-full bg-black object-cover"
        >
          <source src={video.src} type="video/mp4" />
          <a href={video.src}>Download {video.title}</a>
        </video>
      </div>
      <figcaption className="mt-3 flex items-center justify-between gap-4 text-sm">
        <span className="font-semibold text-ink-strong">{video.title}</span>
        <span className="text-ink-muted">Video · {video.size}</span>
      </figcaption>
    </figure>
  );
}
