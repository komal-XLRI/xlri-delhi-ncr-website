import Image from 'next/image';
import Link from 'next/link';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import {
  ArrowRightIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  ClockIcon,
  CloseIcon,
  ExternalIcon,
  FileIcon,
  GlobeIcon,
  UsersIcon,
} from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import type {
  EmdpFact,
  EmdpProgramme,
  EmdpProgrammeLabels,
  EmdpResolvedPerson,
  EmdpSection,
} from '@/types/emdp-programme';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';
const H2 =
  'font-serif text-[clamp(1.5rem,2.6vw,2rem)] leading-tight tracking-[-0.02em] text-ink-strong';
const RULE = 'mt-4 block h-[3px] w-10 bg-accent-surface';
const CARD = 'rounded-[8px] border border-border bg-surface';
const PROSE = 'text-[1.0625rem] leading-[1.85] text-ink';
/** Longer than this, a checklist point is a sentence and is set as one. */
const SHORT_POINT = 60;
const delay = (ms: number) => ({ ['--rise-delay' as string]: `${ms}ms` });
const stagger = (i: number, columns: number) => ({
  ['--reveal-start' as string]: `${String(4 + (i % columns) * 6)}%`,
});

const FACT_ICONS = { clock: ClockIcon, calendar: CalendarIcon, online: GlobeIcon } as const;

/**
 * Widens the last highlight to close the grid's final row, which would
 * otherwise end in an empty cell: two columns on phones, three from `md`.
 */
function closingSpan(index: number, count: number): string {
  if (index !== count - 1) return '';
  const phone = count % 2 === 1 ? 'col-span-2' : '';
  const wide = ['md:col-span-1', 'md:col-span-3', 'md:col-span-2'][count % 3];
  return `${phone} ${wide ?? ''}`;
}

/** "Application Closed": where Apply Now would be, but not a link. */
function ClosedNotice({ label, block }: { label: string; block?: boolean }) {
  return (
    <p
      className={`inline-flex items-center gap-3 border border-dashed border-border-strong bg-surface font-semibold text-ink-muted ${
        block
          ? 'justify-between rounded-[8px] px-6 py-4'
          : 'rounded-full py-2.5 pr-6 pl-2.5 text-[0.9375rem]'
      }`}
    >
      {block ? null : (
        <span className="flex size-8 items-center justify-center rounded-full bg-surface-subtle text-ink-muted">
          <CloseIcon size={14} aria-hidden="true" />
        </span>
      )}
      {label}
      {block ? <CloseIcon size={16} aria-hidden="true" /> : null}
    </p>
  );
}

/** A heading with the site's lime rule beneath it. */
function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <>
      <h2 id={id} className={H2}>
        {children}
      </h2>
      <span aria-hidden="true" className={RULE} />
    </>
  );
}

/** An outbound action — Apply, the brochure — opening the other site. */
function ActionLink({
  href,
  children,
  variant,
}: {
  href: string;
  children: React.ReactNode;
  variant: 'primary' | 'secondary';
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        variant === 'primary'
          ? 'group inline-flex items-center gap-3 rounded-full bg-brand py-2.5 pr-6 pl-2.5 text-[0.9375rem] font-semibold text-white transition-colors duration-300 hover:bg-brand-950'
          : 'inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-3 text-[0.9375rem] font-semibold text-ink-strong transition-colors duration-300 hover:border-brand hover:text-brand'
      }
    >
      {variant === 'primary' ? (
        <span className="flex size-8 items-center justify-center rounded-full bg-accent-surface text-brand-950">
          <ArrowRightIcon
            size={15}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </span>
      ) : (
        <FileIcon size={16} aria-hidden="true" className="text-accent-700" />
      )}
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

/** A small lime-dotted list, for points that are not cards. */
function DotList({ points, columns }: { points: readonly string[]; columns?: boolean }) {
  return (
    <ul className={`grid grid-cols-1 gap-x-8 gap-y-3 ${columns ? 'sm:grid-cols-2' : ''}`}>
      {points.map((point) => (
        <li key={point} className="flex gap-3 leading-relaxed text-ink">
          <span
            aria-hidden="true"
            className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent-600"
          />
          {point}
        </li>
      ))}
    </ul>
  );
}

/** A person: director or faculty, with qualifications or a short biography. */
function PersonCard({
  person,
  labels,
  wide,
}: {
  person: EmdpResolvedPerson;
  labels: EmdpProgrammeLabels;
  wide: boolean;
}) {
  return (
    <li className={`${CARD} flex flex-col p-6 ${wide ? 'md:p-8' : ''}`}>
      <div className="flex items-center gap-4">
        {person.photo ? (
          <Image
            src={person.photo}
            alt=""
            width={80}
            height={80}
            className="size-20 shrink-0 rounded-full object-cover object-top ring-2 ring-accent-surface/60"
          />
        ) : null}
        <div>
          <p className="font-serif text-xl leading-snug text-brand">{person.name}</p>
          {person.designation ? (
            <p className="mt-0.5 text-sm text-ink-muted">{person.designation}</p>
          ) : null}
        </div>
      </div>
      {person.bio?.map((paragraph) => (
        <p
          key={paragraph.slice(0, 40)}
          className="mt-5 border-t border-border pt-5 text-[0.9375rem] leading-[1.8] text-ink md:text-justify md:hyphens-auto"
        >
          {paragraph}
        </p>
      ))}
      {person.qualification || person.functionalArea ? (
        <dl className="mt-5 space-y-3 border-t border-border pt-5 text-[0.9375rem]">
          {person.qualification ? (
            <div>
              <dt className="text-xs font-semibold tracking-[0.12em] text-ink-muted uppercase">
                {labels.qualification}
              </dt>
              <dd className="mt-1 leading-relaxed text-ink">{person.qualification}</dd>
            </div>
          ) : null}
          {person.functionalArea ? (
            <div>
              <dt className="text-xs font-semibold tracking-[0.12em] text-ink-muted uppercase">
                {labels.functionalArea}
              </dt>
              <dd className="mt-1 text-ink">{person.functionalArea}</dd>
            </div>
          ) : null}
        </dl>
      ) : null}
      {person.href ? (
        <Link
          href={person.href}
          className="group mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand"
        >
          {labels.profileLink}
          <span className="sr-only"> of {person.name}</span>
          <ArrowRightIcon
            size={14}
            aria-hidden="true"
            className="text-accent-700 transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </Link>
      ) : null}
    </li>
  );
}

/** The body of one section, by its kind. */
function SectionBody({
  section,
  labels,
}: {
  section: EmdpSection<EmdpResolvedPerson>;
  labels: EmdpProgrammeLabels;
}) {
  switch (section.kind) {
    case 'text':
      return (
        <>
          {section.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className={`mt-6 ${PROSE} md:text-justify md:hyphens-auto`}
            >
              {paragraph}
            </p>
          ))}
          {section.features ? (
            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {section.features.map((feature, index) => (
                <li
                  key={feature.title}
                  className={`reveal ${CARD} border-l-[3px] border-l-accent-surface p-5`}
                  style={stagger(index, 2)}
                >
                  <p className="font-semibold text-ink-strong">{feature.title}</p>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink">{feature.text}</p>
                </li>
              ))}
            </ul>
          ) : null}
        </>
      );

    case 'checklist':
      return (
        <ul className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {section.points.map((point, index) => (
            <li
              key={point}
              className={`reveal ${CARD} group flex gap-3 p-4 transition-[border-color,box-shadow] duration-500 hover:border-accent-surface hover:shadow-raised ${point.length > SHORT_POINT ? 'items-start' : 'items-center'}`}
              style={stagger(index, 2)}
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-accent-surface">
                <CheckIcon size={16} aria-hidden="true" />
              </span>
              <span
                className={
                  point.length > SHORT_POINT
                    ? 'pt-1.5 text-[0.9375rem] leading-relaxed text-ink'
                    : 'font-semibold text-ink-strong'
                }
              >
                {point}
              </span>
            </li>
          ))}
        </ul>
      );

    case 'bullets':
      return (
        <div className={`${CARD} mt-7 p-6 md:p-8`}>
          <DotList points={section.points} columns={section.points.every((p) => p.length < 70)} />
        </div>
      );

    case 'highlights':
      return (
        <ul className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-[8px] bg-white/15 md:grid-cols-3">
          {section.items.map((item, index, items) => (
            <li
              key={item.label}
              className={`reveal group flex flex-col justify-end bg-brand px-5 py-6 text-white transition-colors duration-500 hover:bg-brand-950 ${closingSpan(index, items.length)}`}
              style={stagger(index, 3)}
            >
              {item.value ? (
                <span className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] leading-none text-accent-surface">
                  {item.value}
                </span>
              ) : null}
              <span
                className={
                  item.value
                    ? 'mt-2 text-sm text-white/85'
                    : 'font-serif text-lg leading-snug text-white'
                }
              >
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      );

    case 'fees':
      return (
        <>
          {section.items ? (
            <dl className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {section.items.map((fee, _, fees) => (
                <div
                  key={fee.label}
                  className={`${CARD} border-t-[3px] border-t-accent-surface p-6 ${fees.length === 1 ? 'sm:col-span-2 sm:max-w-md' : ''}`}
                >
                  <dt className="text-sm font-semibold tracking-[0.12em] text-ink-muted uppercase">
                    {fee.label}
                  </dt>
                  <dd className="mt-2 font-serif text-2xl text-brand tabular-nums">{fee.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          {section.text || section.points ? (
            <div className={`${CARD} mt-7 border-t-[3px] border-t-accent-surface p-6 md:p-8`}>
              {section.text ? (
                <p className="font-serif text-xl leading-snug text-brand">{section.text}</p>
              ) : null}
              {section.points ? <DotList points={section.points} /> : null}
            </div>
          ) : null}
        </>
      );

    case 'immersion':
      return (
        <div className={`${CARD} mt-7 overflow-hidden`}>
          {section.lead ? (
            <p className="bg-brand px-6 py-4 font-serif text-lg text-white md:px-8">
              {section.lead}
            </p>
          ) : null}
          <div className="p-6 md:p-8">
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className={`mb-6 last:mb-0 ${PROSE}`}>
                {paragraph}
              </p>
            ))}
            {section.points ? (
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {section.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-3 rounded-[6px] bg-surface-subtle px-4 py-3 font-semibold text-ink-strong"
                  >
                    <UsersIcon size={18} aria-hidden="true" className="shrink-0 text-accent-700" />
                    {point}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      );

    case 'certificate':
      return (
        <>
          {section.text ? <p className={`mt-6 ${PROSE}`}>{section.text}</p> : null}
          {section.images ? (
            <div
              className={`mt-7 grid grid-cols-1 gap-4 rounded-[8px] bg-surface-inverse p-3 shadow-raised md:p-4 ${section.images.length > 1 ? 'sm:grid-cols-2' : ''}`}
            >
              {section.images.map((image, _, images) => (
                <Image
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes={
                    images.length === 1
                      ? '(min-width: 1024px) 640px, 100vw'
                      : '(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw'
                  }
                  className="mx-auto h-auto w-full max-w-[40rem] rounded-[4px]"
                />
              ))}
            </div>
          ) : null}
        </>
      );

    case 'panel':
      return (
        <div className="mt-7 overflow-hidden rounded-[8px] bg-brand text-white">
          {section.text ? (
            <p className="px-6 py-5 leading-relaxed text-white/90 md:px-8">{section.text}</p>
          ) : null}
          {section.points ? (
            <ul className="divide-y divide-white/15">
              {section.points.map((point) => (
                <li key={point} className="flex gap-4 px-6 py-5 md:px-8">
                  <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-accent-surface text-brand-950">
                    <CheckIcon size={14} aria-hidden="true" />
                  </span>
                  <span className="leading-relaxed text-white/90">{point}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      );

    case 'modules':
      // Native disclosure: works without script, and each module's topics
      // stay in the HTML for search. The first is open to show what is inside.
      return (
        <div className="mt-7 flex flex-col gap-3">
          {section.modules.map((module, index) => (
            <details
              key={module.title}
              open={index === 0}
              className={`${CARD} group overflow-hidden open:border-accent-surface open:shadow-raised`}
            >
              <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-4 transition-colors duration-300 hover:bg-surface-subtle md:px-6 [&::-webkit-details-marker]:hidden">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand font-serif text-sm text-accent-surface tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="flex-1 font-semibold text-ink-strong">{module.title}</span>
                <ChevronDownIcon
                  size={18}
                  aria-hidden="true"
                  className="shrink-0 text-accent-700 transition-transform duration-300 group-open:rotate-180"
                />
              </summary>
              <div className="border-t border-border px-5 py-5 md:px-6 md:pl-19">
                <DotList points={module.points} />
              </div>
            </details>
          ))}
        </div>
      );

    case 'people': {
      // Biographies need the full width: one person to a row.
      const wide = section.members.some((person) => person.bio);
      return (
        <ul className={`mt-7 grid grid-cols-1 gap-4 ${wide ? '' : 'md:grid-cols-2'}`}>
          {section.members.map((person) => (
            <PersonCard key={person.name} person={person} labels={labels} wide={wide} />
          ))}
        </ul>
      );
    }

    default: {
      const unknown: never = section;
      throw new Error(`emdp-programmes.json: unknown section ${JSON.stringify(unknown)}`);
    }
  }
}

function FactCard({ fact }: { fact: EmdpFact }) {
  const Icon = FACT_ICONS[fact.icon];
  return (
    <div className={`${CARD} px-6 py-5`}>
      <h2 className="flex items-center gap-3 font-semibold text-ink-strong">
        <Icon size={20} aria-hidden="true" className="text-accent-700" />
        {fact.label}
      </h2>
      {fact.lines.length > 0 ? (
        <div className="mt-2 space-y-1 leading-snug text-ink">
          {fact.lines.map((line) =>
            // "First Year (Tentative):" heads the lines after it.
            line.endsWith(':') ? (
              <p
                key={line}
                className="pt-1.5 text-xs font-semibold tracking-[0.12em] text-ink-muted uppercase"
              >
                {line.slice(0, -1)}
              </p>
            ) : (
              <p key={line}>{line}</p>
            ),
          )}
        </div>
      ) : null}
    </div>
  );
}

/**
 * One EMDP programme — the page behind "Know More" on its EMDP card, at the
 * live site's address. The programme's sections run down the left in the live
 * page's order; the practical facts (duration, dates, timings, brochure,
 * apply) sit on the right, kept in view on large screens.
 *
 * Content comes from `content/executive-education/emdp-programmes.json`.
 */
export function EmdpProgrammePage({ content }: { content: EmdpProgramme }) {
  const { labels } = content;
  const headlines = content.facts.filter((fact) => fact.headline);

  return (
    <article aria-labelledby="programme-heading">
      {/* ---------------- hero ---------------- */}
      <section data-motif="hero" className="relative isolate overflow-hidden bg-surface">
        <div className={`${MEASURE} pt-8 pb-14 md:pt-10 md:pb-20`}>
          <Breadcrumbs
            items={[
              { label: 'Home', href: routes.home },
              { label: content.breadcrumb.section, href: routes.executiveEducation.index },
              {
                label: content.breadcrumb.page,
                href: routes.executiveEducation.programme('emdp'),
              },
              { label: content.batch ? `${content.title} (${content.batch})` : content.title },
            ]}
          />
          <div className="mt-8 grid grid-cols-1 items-center gap-10 md:mt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
            <div>
              <p className="flex flex-wrap items-center gap-3 text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase">
                {labels.eyebrow}
                {content.batch ? (
                  <span className="rounded-full bg-accent-surface px-3 py-1 text-xs tracking-[0.12em] text-brand-950">
                    {content.batch}
                  </span>
                ) : null}
              </p>
              <h1
                id="programme-heading"
                className="mt-4 font-serif text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.08] tracking-[-0.03em] text-balance text-brand"
              >
                {content.title}
              </h1>
              {content.note ? <p className="mt-3 text-lg text-ink-muted">{content.note}</p> : null}
              <span
                aria-hidden="true"
                className="rule-draw mt-6 block h-[3px] w-14 origin-left bg-accent-surface"
              />
              {/* The facts people look for first. */}
              {headlines.length > 0 ? (
                <dl
                  className="rise-in mt-7 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-2"
                  style={delay(150)}
                >
                  {headlines.map((fact) => {
                    const Icon = FACT_ICONS[fact.icon];
                    return (
                      <div key={fact.label} className={`${CARD} flex gap-3 p-4`}>
                        <Icon
                          size={20}
                          aria-hidden="true"
                          className="mt-0.5 shrink-0 text-accent-700"
                        />
                        <div>
                          <dt className="text-xs font-semibold tracking-[0.14em] text-ink-muted uppercase">
                            {fact.label}
                          </dt>
                          <dd className="mt-1 font-semibold text-ink-strong">{fact.headline}</dd>
                        </div>
                      </div>
                    );
                  })}
                </dl>
              ) : null}
              <div className="rise-in mt-8 flex flex-wrap gap-3" style={delay(250)}>
                {content.apply?.href ? (
                  <ActionLink href={content.apply.href} variant="primary">
                    {content.apply.label}
                  </ActionLink>
                ) : content.apply ? (
                  <ClosedNotice label={content.apply.label} />
                ) : null}
                {content.brochure ? (
                  <ActionLink href={content.brochure.href} variant="secondary">
                    {content.brochure.label}
                  </ActionLink>
                ) : null}
              </div>
            </div>

            <div className="rise-in group relative" style={delay(200)}>
              <span
                aria-hidden="true"
                className="absolute -right-3 -bottom-3 hidden h-full w-full rounded-[8px] border-2 border-accent-surface/70 transition-[translate,border-color] duration-700 ease-out group-hover:translate-x-1.5 group-hover:translate-y-1.5 group-hover:border-accent-surface md:block"
              />
              <div className="relative overflow-hidden rounded-[8px] shadow-raised">
                <Image
                  src={content.poster.src}
                  alt={content.poster.alt}
                  width={content.poster.width}
                  height={content.poster.height}
                  preload
                  sizes="(min-width: 1280px) 568px, (min-width: 1024px) 46vw, 100vw"
                  className="h-auto w-full transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- the programme, and the facts beside it ---------------- */}
      <div className="bg-surface-subtle">
        <div
          className={`${MEASURE} grid grid-cols-1 gap-12 py-14 md:py-20 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14`}
        >
          <div className="flex min-w-0 flex-col gap-14">
            {content.sections.map((section, index) => (
              <section key={section.heading} aria-labelledby={`section-${String(index)}`}>
                <SectionHeading id={`section-${String(index)}`}>{section.heading}</SectionHeading>
                <SectionBody section={section} labels={labels} />
              </section>
            ))}
          </div>

          {/* ---------------- sidebar ---------------- */}
          <aside
            aria-label="Programme facts"
            className="flex flex-col gap-4 lg:sticky lg:top-[calc(var(--header-height,6rem)+1.5rem)] lg:self-start"
          >
            {content.facts.map((fact) => (
              <FactCard key={fact.label} fact={fact} />
            ))}
            {content.brochure ? (
              <div className={`${CARD} p-6`}>
                <h2 className="flex items-center gap-3 font-semibold text-ink-strong">
                  <FileIcon size={20} aria-hidden="true" className="text-accent-700" />
                  {labels.brochure}
                </h2>
                <a
                  href={content.brochure.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 font-semibold text-brand hover:underline"
                >
                  {content.brochure.label}
                  <ExternalIcon size={13} aria-hidden="true" className="text-accent-700" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            ) : null}
            {content.apply && !content.apply.href ? (
              <ClosedNotice label={content.apply.label} block />
            ) : null}
            {content.apply?.href ? (
              <a
                href={content.apply.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-[8px] bg-brand px-6 py-4 font-semibold text-white transition-colors duration-300 hover:bg-brand-950"
              >
                {content.apply.label}
                <span className="flex size-8 items-center justify-center rounded-full bg-accent-surface text-brand-950 transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRightIcon size={15} aria-hidden="true" />
                </span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : null}

            <Link
              href={routes.executiveEducation.programme('emdp')}
              className="group mt-2 inline-flex items-center gap-2 text-sm font-semibold text-ink-muted hover:text-brand"
            >
              <ArrowRightIcon
                size={14}
                aria-hidden="true"
                className="rotate-180 transition-transform duration-300 group-hover:-translate-x-0.5"
              />
              {labels.backToEmdp}
            </Link>
          </aside>
        </div>
      </div>
    </article>
  );
}
