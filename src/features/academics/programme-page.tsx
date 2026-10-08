import Image from 'next/image';
import NextLink from 'next/link';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import {
  ArrowRightIcon,
  AwardIcon,
  BookIcon,
  BriefcaseIcon,
  CheckIcon,
  CompassIcon,
  ExternalIcon,
  GlobeIcon,
  LandmarkIcon,
  LightbulbIcon,
  SparkIcon,
  type IconProps,
} from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import type { ProgrammePage as ProgrammeContent } from '@/types/programme';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';
const H2 =
  'font-serif text-[clamp(1.75rem,3.2vw,2.5rem)] leading-tight tracking-[-0.02em] text-ink-strong';

/** One mark per area, so nine cards read as nine things at a glance. */
const AREA_ICONS: Record<string, (props: IconProps) => React.ReactElement> = {
  economics: GlobeIcon,
  finance: LandmarkIcon,
  'general-management': CompassIcon,
  'human-resource-management': BriefcaseIcon,
  'information-systems': SparkIcon,
  marketing: LightbulbIcon,
  'organisational-behaviour': BookIcon,
  operations: CheckIcon,
  'strategic-management': AwardIcon,
};

/**
 * An academic programme page. Built for PGDM BM.
 *
 * ## The model
 *
 * The institute's programme page (xlri.ac.in › School of Business › PGDBM),
 * with Delhi-NCR's content:
 *
 *  1. **Introduction** — title and paragraph on the left, the batch photograph
 *     on the right, as Jamshedpur sets it. Under the paragraph, the two things
 *     the Delhi page offers — the BM course document and the institute page —
 *     as buttons, and a strip of the three facts the paragraph states.
 *  2. **Curriculum** — the paragraph Jamshedpur sets full width, here as a
 *     pull statement so it reads as the programme's thesis.
 *  3. **Programme Design and Requirements** — Jamshedpur's grid of subject
 *     areas. There, the courses appear only on hover over a stock photograph,
 *     so touch and keyboard users never see them; here every card shows its
 *     courses outright, on the brand blue the institute uses for that band.
 *  4. **Related Programmes** — Jamshedpur's tinted band; Delhi-NCR offers one
 *     other programme, PGDM - IEV.
 *
 * Server Component; no client JavaScript.
 */
export function ProgrammePage({ content }: { content: ProgrammeContent }) {
  const { actions, design, related } = content;

  return (
    <article aria-labelledby="programme-heading">
      {/* ---------------- introduction ---------------- */}
      <section className="bg-surface">
        <div className={`${MEASURE} pt-10 pb-14 md:pt-14 md:pb-20`}>
          <Breadcrumbs
            items={[
              { label: 'Home', href: routes.home },
              { label: 'Academics' },
              { label: content.shortName },
            ]}
          />

          <div className="mt-8 grid grid-cols-1 items-center gap-10 md:mt-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className="text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase">
                {content.school}
              </p>
              <h1
                id="programme-heading"
                className="mt-3 font-serif text-[clamp(2.5rem,5vw,3.75rem)] leading-[1.02] tracking-[-0.035em] text-brand"
              >
                {content.shortName}
              </h1>
              <p className="mt-3 font-serif text-xl leading-snug text-ink-strong md:text-[1.375rem]">
                {content.title}
              </p>
              <span aria-hidden="true" className="mt-6 block h-[3px] w-14 bg-accent-surface" />
              <p className="mt-6 text-base leading-[1.85] text-ink md:text-justify md:text-[1.0625rem] md:hyphens-auto">
                {content.intro}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={actions.courses.href}
                  target="_blank"
                  rel="noopener"
                  className="group inline-flex items-center gap-3 rounded-full bg-brand py-2.5 pr-5 pl-2.5 text-[0.9375rem] font-semibold text-white transition-colors duration-200 hover:bg-brand-950"
                >
                  <span className="flex size-8 items-center justify-center rounded-full bg-accent-surface text-brand-950">
                    <BookIcon size={16} aria-hidden="true" />
                  </span>
                  <span>
                    {actions.courses.label}
                    <span className="ml-2 font-normal text-white/75">{actions.courses.meta}</span>
                  </span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <a
                  href={actions.moreInfo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-3 text-[0.9375rem] font-semibold text-ink-strong transition-colors duration-200 hover:border-brand hover:text-brand"
                >
                  {actions.moreInfo.label}
                  <ExternalIcon size={14} aria-hidden="true" className="text-accent-700" />
                  <span className="sr-only"> (xlri.ac.in, opens in a new tab)</span>
                </a>
              </div>
            </div>

            <div className="relative">
              <span
                aria-hidden="true"
                className="absolute -right-3 -bottom-3 hidden h-full w-full rounded-[8px] border-2 border-accent-surface/70 md:block"
              />
              <div className="relative overflow-hidden rounded-[8px] shadow-raised">
                <Image
                  src={content.image.src}
                  width={content.image.width}
                  height={content.image.height}
                  alt={content.image.alt}
                  // Above the fold — the LCP element. `preload` replaces the
                  // deprecated `priority` in Next 16.
                  preload
                  sizes="(min-width: 1280px) 568px, (min-width: 1024px) 46vw, 100vw"
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>

          <dl className="mt-12 grid grid-cols-1 overflow-hidden rounded-[8px] border border-border sm:grid-cols-3 md:mt-16">
            {content.facts.map((fact, index) => (
              // Label first in the DOM (a <dt> must precede its <dd>), figure
              // first on screen.
              <div
                key={fact.id}
                className={`flex flex-col-reverse justify-end bg-surface-subtle px-6 py-6 md:px-8 ${
                  index > 0 ? 'border-t border-border sm:border-t-0 sm:border-l' : ''
                }`}
              >
                <dt className="mt-2 text-sm leading-snug text-ink-muted">{fact.label}</dt>
                <dd className="font-serif text-[1.75rem] leading-none text-brand md:text-[2rem]">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------------- curriculum ---------------- */}
      <section aria-label="Curriculum" className="bg-surface-subtle">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <figure className="mx-auto max-w-[60rem] border-l-[3px] border-accent-surface pl-6 md:pl-10">
            <p className="text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase">
              The curriculum
            </p>
            <blockquote className="mt-4 font-serif text-xl leading-[1.6] text-ink-strong md:text-[1.625rem]">
              {content.curriculum}
            </blockquote>
          </figure>
        </div>
      </section>

      {/* ---------------- programme design ---------------- */}
      <section aria-labelledby="design-heading" className="bg-surface">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <h2 id="design-heading" className={H2}>
            {design.heading}
          </h2>
          <span aria-hidden="true" className="mt-4 block h-[3px] w-10 bg-accent-surface" />

          <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
            {design.areas.map((area) => {
              const Icon = AREA_ICONS[area.id] ?? BookIcon;
              return (
                <li
                  key={area.id}
                  className="group flex flex-col rounded-[8px] bg-brand p-6 text-white transition-[background-color,transform] duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-950 md:p-7"
                >
                  <span className="flex items-center gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-accent-surface">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <h3 className="font-serif text-xl leading-snug text-white">{area.name}</h3>
                  </span>
                  <ul className="mt-5 space-y-2 border-t border-white/15 pt-5">
                    {area.courses.map((course) => (
                      <li
                        key={course}
                        className="flex gap-2.5 text-[0.9375rem] leading-snug text-white/90"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.45em] size-1.5 shrink-0 rounded-full bg-accent-surface"
                        />
                        <span>{course}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>

          <p className="mt-8 text-[0.9375rem] text-ink-muted">
            The full course outlines are in the{' '}
            <a
              href={actions.courses.href}
              target="_blank"
              rel="noopener"
              className="font-semibold text-brand underline underline-offset-[3px] hover:text-brand-950"
            >
              {actions.courses.label} document
              <span className="sr-only"> (PDF, opens in a new tab)</span>
            </a>
            .
          </p>
        </div>
      </section>

      {/* ---------------- related ---------------- */}
      <section aria-labelledby="related-heading" className="bg-accent-50">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <h2 id="related-heading" className={H2}>
            {related.heading}
          </h2>
          <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.items.map((item) => (
              <li key={item.id}>
                <NextLink
                  href={item.href}
                  className="group flex h-full items-end justify-between gap-6 rounded-[8px] border border-border bg-surface p-6 transition-[border-color,box-shadow] duration-300 hover:border-brand hover:shadow-raised md:p-7"
                >
                  <span>
                    <span className="block text-xs font-semibold tracking-[0.14em] text-accent-700 uppercase">
                      {item.school}
                    </span>
                    <span className="mt-2 block font-serif text-2xl leading-tight text-ink-strong group-hover:text-brand">
                      {item.name}
                    </span>
                  </span>
                  <ArrowRightIcon
                    size={18}
                    aria-hidden="true"
                    className="mb-1 shrink-0 text-accent-700 transition-transform duration-200 group-hover:translate-x-1"
                  />
                </NextLink>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
