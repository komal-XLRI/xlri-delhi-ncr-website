import Image from 'next/image';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import {
  BookIcon,
  CheckIcon,
  CompassIcon,
  ExternalIcon,
  LightbulbIcon,
  MapPinIcon,
  type IconProps,
} from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import type { MdpPage as MdpContent } from '@/types/mdp';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';
const H2 =
  'font-serif text-[clamp(1.75rem,3.2vw,2.5rem)] leading-tight tracking-[-0.02em] text-ink-strong';
const EYEBROW = 'text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase';

const PILLAR_ICONS: Record<string, (props: IconProps) => React.ReactElement> = {
  format: MapPinIcon,
  faculty: BookIcon,
  pedagogy: LightbulbIcon,
  curriculum: CompassIcon,
};

function Rule({ className = '' }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`block h-[3px] w-10 bg-accent-surface ${className}`} />
  );
}

/**
 * Executive Education › Management Development Programmes.
 *
 * ## The model
 *
 * The light treatment of the programme and About pages, shared with EMDP and
 * In-Company Programmes:
 *
 *  1. **Introduction** — the name, the tagline, the refresh note, and the
 *     calendar as the primary action, beside the MDP Block on the Delhi-NCR
 *     campus.
 *  2. **Overview** — the paragraph, with its four claims lifted out as cards.
 *  3. **The 2025–26 calendar at a glance** — the year's figures and where the
 *     programmes ran, counted from the calendar, with the document itself.
 *     Every date in it has passed, so the page summarises and links rather
 *     than listing them.
 *  4. **Practicalities** — residential rates and rules, the group discount,
 *     and the MDP office.
 *
 * Motion is light and slow, in the brand colours, as on the About pages: the
 * title rule and the venue bars draw and the photograph rises in on load
 * (`.rule-draw`, `.rise-in`); cards lift on hover. Nothing plays on scroll,
 * and none of it under `prefers-reduced-motion`.
 */
export function MdpPage({ content }: { content: MdpContent }) {
  const { overview, calendar, stay, discounts, contact } = content;
  const most = Math.max(...calendar.venues.map((venue) => venue.count));

  return (
    <article aria-labelledby="mdp-heading">
      {/* ---------------- introduction ---------------- */}
      <section className="bg-surface">
        <div className={`${MEASURE} pt-10 pb-14 md:pt-14 md:pb-20`}>
          <Breadcrumbs
            items={[
              { label: 'Home', href: routes.home },
              { label: 'Executive Education' },
              { label: content.abbreviation },
            ]}
          />

          <div className="mt-8 grid grid-cols-1 items-center gap-10 md:mt-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className={EYEBROW}>{content.eyebrow}</p>
              <h1
                id="mdp-heading"
                className="mt-3 font-serif text-[clamp(2.25rem,4.6vw,3.5rem)] leading-[1.04] tracking-[-0.03em] text-balance text-brand"
              >
                {content.title}{' '}
                <span className="text-accent-surface">({content.abbreviation})</span>
              </h1>
              <p className="mt-4 font-serif text-xl leading-snug text-ink-strong md:text-[1.375rem]">
                {content.tagline}
              </p>
              <Rule className="rule-draw mt-6 w-14 origin-left" />
              <p className="mt-6 text-base leading-[1.85] text-ink md:text-[1.0625rem]">
                {content.refresh}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={calendar.href}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-3 rounded-full bg-brand py-2.5 pr-5 pl-2.5 text-[0.9375rem] font-semibold text-white transition-colors duration-200 hover:bg-brand-950"
                >
                  <span className="flex size-8 items-center justify-center rounded-full bg-accent-surface text-brand-950">
                    <BookIcon size={15} aria-hidden="true" />
                  </span>
                  {calendar.label}
                  <span className="sr-only"> (PDF, opens in a new tab)</span>
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center rounded-full border border-border-strong px-5 py-3 text-[0.9375rem] font-semibold text-ink-strong transition-colors duration-200 hover:border-brand hover:text-brand"
                >
                  Contact the MDP office
                </a>
              </div>
            </div>

            <div className="rise-in group relative" style={{ ['--rise-delay' as string]: '200ms' }}>
              <span
                aria-hidden="true"
                className="absolute -right-3 -bottom-3 hidden h-full w-full rounded-[8px] border-2 border-accent-surface/70 transition-[translate,border-color] duration-700 ease-out group-hover:translate-x-1.5 group-hover:translate-y-1.5 group-hover:border-accent-surface md:block"
              />
              <div className="relative aspect-[5/3] overflow-hidden rounded-[8px] shadow-raised">
                <Image
                  src={content.image.src}
                  alt={content.image.alt}
                  fill
                  // Above the fold — the LCP element. `preload` replaces the
                  // deprecated `priority` in Next 16.
                  preload
                  sizes="(min-width: 1280px) 568px, (min-width: 1024px) 46vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- overview ---------------- */}
      <section aria-labelledby="overview-heading" className="bg-surface-subtle">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
            <div>
              <h2 id="overview-heading" className={H2}>
                {overview.heading}
              </h2>
              <Rule className="mt-4" />
            </div>
            <p className="text-base leading-[1.9] text-ink md:text-justify md:text-[1.0625rem] md:hyphens-auto">
              {overview.text}
            </p>
          </div>

          <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {overview.pillars.map((pillar) => {
              const Icon = PILLAR_ICONS[pillar.id] ?? BookIcon;
              return (
                <li
                  key={pillar.id}
                  className="group rounded-[8px] border border-t-[3px] border-border border-t-accent-surface bg-surface p-6 transition-[translate,box-shadow,border-color] duration-500 ease-out hover:border-brand/40 hover:border-t-accent-surface hover:shadow-raised motion-safe:hover:-translate-y-1"
                >
                  <span className="flex size-11 items-center justify-center rounded-full bg-accent-50 text-accent-700 transition-colors duration-500 group-hover:bg-brand group-hover:text-white">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-serif text-xl text-ink-strong">{pillar.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-[1.65] text-ink-muted">
                    {pillar.text}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ---------------- calendar ---------------- */}
      <section aria-labelledby="calendar-heading" className="bg-surface">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
            <div>
              <p className={EYEBROW}>At a glance</p>
              <h2 id="calendar-heading" className={`${H2} mt-2`}>
                {calendar.heading}
              </h2>
              <Rule className="mt-4" />
              <p className="mt-6 max-w-[34rem] leading-[1.75] text-ink">{calendar.note}</p>

              <dl className="mt-8 grid grid-cols-2 overflow-hidden rounded-[8px] border border-border">
                {calendar.facts.map((fact, index) => (
                  // Label first in the DOM (a <dt> must precede its <dd>),
                  // figure first on screen.
                  <div
                    key={fact.id}
                    className={`flex flex-col-reverse justify-end bg-surface-subtle px-5 py-6 ${
                      index % 2 === 1 ? 'border-l border-border' : ''
                    } ${index >= 2 ? 'border-t border-border' : ''}`}
                  >
                    <dt className="mt-2 text-sm leading-snug text-ink-muted">{fact.label}</dt>
                    <dd className="font-serif text-[2.25rem] leading-none text-brand">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <a
                href={calendar.href}
                target="_blank"
                rel="noopener"
                className="mt-6 inline-flex items-center gap-2 font-semibold text-brand hover:text-brand-950"
              >
                Download the calendar
                <span className="font-normal text-ink-muted">{calendar.meta}</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>

            <div className="self-start rounded-[8px] border border-border bg-surface p-6 md:p-8">
              <h3 className={EYEBROW}>Where the programmes ran</h3>
              <ul className="mt-6 space-y-5">
                {calendar.venues.map((venue) => (
                  <li key={venue.id}>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-serif text-lg text-ink-strong">{venue.name}</span>
                      <span className="text-sm text-ink-muted">
                        <span className="font-serif text-2xl text-brand">{venue.count}</span>{' '}
                        {venue.count === 1 ? 'programme' : 'programmes'}
                      </span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-subtle">
                      <div
                        className="rule-draw h-full origin-left rounded-full bg-brand"
                        style={{ width: `${String((venue.count / most) * 100)}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- practicalities ---------------- */}
      <section aria-labelledby="stay-heading" className="bg-surface-subtle">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-14">
            <div>
              <h2 id="stay-heading" className={H2}>
                {stay.heading}
              </h2>
              <Rule className="mt-4" />
              <p className="mt-6 leading-[1.75] text-ink">{stay.intro}</p>
              <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {stay.rates.map((rate) => (
                  <li
                    key={rate.id}
                    className="rounded-[8px] border border-t-[3px] border-border border-t-accent-surface bg-surface p-6 transition-[translate,box-shadow,border-color] duration-500 ease-out hover:border-brand/40 hover:border-t-accent-surface hover:shadow-raised motion-safe:hover:-translate-y-1"
                  >
                    <p className="text-sm font-semibold tracking-[0.12em] text-accent-700 uppercase">
                      {rate.label}
                    </p>
                    <p className="mt-3 font-serif text-[2.25rem] leading-none text-brand">
                      {rate.value}
                    </p>
                    <p className="mt-2 text-sm text-ink-muted">{rate.note}</p>
                  </li>
                ))}
              </ul>
              <ul className="mt-6 space-y-2.5">
                {stay.rules.map((rule) => (
                  <li key={rule} className="flex gap-3 text-[0.9375rem] leading-[1.65] text-ink">
                    <CheckIcon
                      size={16}
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-accent-700"
                    />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-ink-muted italic">Note: {stay.taxNote}</p>
            </div>

            <div className="space-y-6">
              <section
                aria-labelledby="discount-heading"
                className="rounded-[8px] border border-border bg-surface p-6 md:p-7"
              >
                <h2 id="discount-heading" className="font-serif text-2xl text-ink-strong">
                  {discounts.heading}
                </h2>
                <ul className="mt-5 space-y-3">
                  {discounts.tiers.map((tier) => (
                    <li
                      key={tier.id}
                      className="flex items-center gap-4 rounded-[8px] bg-surface-subtle p-4 transition-colors duration-500 hover:bg-accent-50"
                    >
                      <span className="font-serif text-3xl leading-none text-brand">
                        {tier.discount}
                      </span>
                      <span className="text-[0.9375rem] leading-snug text-ink">
                        off Professional Fees for{' '}
                        <strong className="text-ink-strong">{tier.participants}</strong>
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              <section
                id="contact"
                aria-labelledby="contact-heading"
                className="scroll-mt-40 rounded-[8px] border border-t-[3px] border-border border-t-accent-surface bg-surface p-6 md:p-7"
              >
                <h2 id="contact-heading" className="font-serif text-2xl text-ink-strong">
                  {contact.heading}
                </h2>
                <dl className="mt-5 space-y-3 text-[0.9375rem]">
                  <div>
                    <dt className="text-xs tracking-[0.14em] text-ink-muted uppercase">Phone</dt>
                    <dd className="font-semibold text-ink-strong">{contact.phone}</dd>
                  </div>
                  <div>
                    <dt className="text-xs tracking-[0.14em] text-ink-muted uppercase">Email</dt>
                    <dd>
                      <a
                        href={`mailto:${contact.email}`}
                        className="font-semibold text-brand hover:underline"
                      >
                        {contact.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs tracking-[0.14em] text-ink-muted uppercase">Website</dt>
                    <dd>
                      <a
                        href={contact.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-semibold text-brand hover:underline"
                      >
                        {contact.website.replace(/^https?:\/\//, '')}
                        <ExternalIcon size={13} aria-hidden="true" />
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </dd>
                  </div>
                </dl>
              </section>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
