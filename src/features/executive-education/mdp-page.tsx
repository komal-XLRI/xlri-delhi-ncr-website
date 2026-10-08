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

const PILLAR_ICONS: Record<string, (props: IconProps) => React.ReactElement> = {
  format: MapPinIcon,
  faculty: BookIcon,
  pedagogy: LightbulbIcon,
  curriculum: CompassIcon,
};

const delay = (ms: number) => ({ ['--enter-delay' as string]: `${String(ms)}ms` });

/**
 * Executive Education › Management Development Programmes.
 *
 * ## The model
 *
 * The same visual language as EMDP, its sibling under XLEAD, so the section
 * reads as one: a navy hero with the brand colours drifting behind it, then
 * light sections.
 *
 *  1. **Hero** — the name with "(MDPs)" in the accent, the tagline as a pull
 *     line, the refresh note, and the calendar as the primary action, beside
 *     the MDP Block on the Delhi-NCR campus.
 *  2. **Overview** — the paragraph, with its four claims lifted out as tiles.
 *  3. **The 2025–26 calendar at a glance** (navy) — the year's figures and
 *     where the programmes ran, counted from the calendar, with the
 *     document itself. Every date in it has passed, so the page summarises
 *     and links rather than listing them.
 *  4. **Practicalities** — residential rates and rules, the group discount,
 *     and the MDP office.
 *
 * Motion on load only (`.enter`, `.drift` in styles/base.css), never on
 * scroll, and none under `prefers-reduced-motion`.
 */
export function MdpPage({ content }: { content: MdpContent }) {
  const { overview, calendar, stay, discounts, contact } = content;
  const most = Math.max(...calendar.venues.map((venue) => venue.count));

  return (
    <article aria-labelledby="mdp-heading">
      {/* ---------------- hero ---------------- */}
      <section className="relative isolate overflow-hidden bg-brand-950 text-ink-inverse">
        <span
          aria-hidden="true"
          className="drift absolute -top-40 -left-32 -z-10 size-[34rem] rounded-full bg-brand opacity-60 blur-3xl"
        />
        <span
          aria-hidden="true"
          className="drift absolute -right-24 -bottom-48 -z-10 size-[28rem] rounded-full bg-accent-surface opacity-25 blur-3xl [animation-delay:-8s]"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] [background-size:28px_28px]"
        />

        <div className={`${MEASURE} pt-8 pb-16 md:pt-10 md:pb-24`}>
          <Breadcrumbs
            className="[&_a]:text-white/70 [&_a:hover]:text-white [&_span]:text-white"
            items={[
              { label: 'Home', href: routes.home },
              { label: 'Executive Education' },
              { label: content.abbreviation },
            ]}
          />

          <div className="mt-10 grid grid-cols-1 items-center gap-12 md:mt-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <p
                className="enter text-sm font-semibold tracking-[0.18em] text-accent-surface uppercase"
                style={delay(0)}
              >
                {content.eyebrow}
              </p>
              <h1
                id="mdp-heading"
                className="enter mt-4 font-serif text-[clamp(2.5rem,5.4vw,4.25rem)] leading-[1.02] tracking-[-0.035em] text-balance text-white"
                style={delay(90)}
              >
                {content.title}{' '}
                <span className="bg-gradient-to-r from-accent-surface to-white bg-clip-text text-transparent">
                  ({content.abbreviation})
                </span>
              </h1>
              <p
                className="enter mt-6 border-l-[3px] border-accent-surface pl-5 font-serif text-xl leading-snug text-white/95 md:text-2xl"
                style={delay(180)}
              >
                {content.tagline}
              </p>
              <p
                className="enter mt-6 max-w-[38rem] text-base leading-[1.8] text-white/75"
                style={delay(240)}
              >
                {content.refresh}
              </p>
              <div className="enter mt-9 flex flex-wrap items-center gap-3" style={delay(300)}>
                <a
                  href={calendar.href}
                  target="_blank"
                  rel="noopener"
                  className="group inline-flex items-center gap-3 rounded-full bg-accent-surface py-2.5 pr-5 pl-2.5 text-[0.9375rem] font-semibold text-brand-950 transition-colors duration-200 hover:bg-white"
                >
                  <span className="flex size-8 items-center justify-center rounded-full bg-brand-950 text-accent-surface">
                    <BookIcon size={15} aria-hidden="true" />
                  </span>
                  {calendar.label}
                  <span className="sr-only"> (PDF, opens in a new tab)</span>
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center rounded-full border border-white/35 px-5 py-3 text-[0.9375rem] font-semibold text-white transition-colors duration-200 hover:border-accent-surface hover:bg-white/10"
                >
                  Contact the MDP office
                </a>
              </div>
            </div>

            <div className="enter relative" style={delay(200)}>
              <span
                aria-hidden="true"
                className="absolute -right-3 -bottom-3 hidden h-full w-full rounded-[10px] border-2 border-accent-surface/70 md:block"
              />
              <div className="group relative aspect-[5/3] overflow-hidden rounded-[10px] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/15">
                <Image
                  src={content.image.src}
                  alt={content.image.alt}
                  fill
                  // Above the fold — the LCP element. `preload` replaces the
                  // deprecated `priority` in Next 16.
                  preload
                  sizes="(min-width: 1280px) 540px, (min-width: 1024px) 44vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-brand-950/85 px-3 py-1 text-xs font-semibold tracking-[0.08em] text-white uppercase backdrop-blur">
                  MDP Block · Delhi-NCR campus
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- overview ---------------- */}
      <section aria-labelledby="overview-heading" className="bg-surface">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
            <div>
              <h2 id="overview-heading" className={H2}>
                {overview.heading}
              </h2>
              <span
                aria-hidden="true"
                className="mt-4 block h-1 w-14 rounded-full bg-gradient-to-r from-brand to-accent-surface"
              />
            </div>
            <p className="text-base leading-[1.9] text-ink md:text-justify md:text-[1.0625rem] md:hyphens-auto">
              {overview.text}
            </p>
          </div>

          <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {overview.pillars.map((pillar) => {
              const Icon = PILLAR_ICONS[pillar.id] ?? BookIcon;
              return (
                <li
                  key={pillar.id}
                  className="group rounded-[10px] border border-border bg-surface p-6 transition-[transform,border-color,box-shadow,background-color] duration-300 ease-out hover:-translate-y-1 hover:border-brand hover:bg-brand hover:shadow-raised"
                >
                  <span className="flex size-12 items-center justify-center rounded-full bg-accent-50 text-accent-700 transition-colors duration-300 group-hover:bg-white/15 group-hover:text-accent-surface">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-serif text-xl text-ink-strong transition-colors duration-300 group-hover:text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-[1.65] text-ink-muted transition-colors duration-300 group-hover:text-white/80">
                    {pillar.text}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ---------------- calendar ---------------- */}
      <section aria-labelledby="calendar-heading" className="purpose-band text-ink-inverse">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
            <div>
              <p className="text-sm font-semibold tracking-[0.18em] text-accent-surface uppercase">
                At a glance
              </p>
              <h2
                id="calendar-heading"
                className="mt-2 font-serif text-[clamp(1.75rem,3.2vw,2.5rem)] leading-tight tracking-[-0.02em] text-white"
              >
                {calendar.heading}
              </h2>
              <p className="mt-4 max-w-[34rem] leading-[1.75] text-white/80">{calendar.note}</p>

              <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[10px] bg-white/15">
                {calendar.facts.map((fact) => (
                  // Label first in the DOM (a <dt> must precede its <dd>),
                  // figure first on screen.
                  <div
                    key={fact.id}
                    className="flex flex-col-reverse justify-end bg-brand-950/60 px-5 py-6"
                  >
                    <dt className="mt-2 text-sm leading-snug text-white/70">{fact.label}</dt>
                    <dd className="font-serif text-[2.5rem] leading-none text-accent-surface">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <a
                href={calendar.href}
                target="_blank"
                rel="noopener"
                className="mt-8 inline-flex items-center gap-2 font-semibold text-accent-surface hover:text-white"
              >
                Download the calendar
                <span className="font-normal text-white/60">{calendar.meta}</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>

            <div className="self-start rounded-[10px] bg-white p-6 text-ink shadow-raised md:p-8">
              <h3 className="text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase">
                Where the programmes ran
              </h3>
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
                    <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-surface-subtle">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-brand to-accent-surface"
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
      <section aria-labelledby="stay-heading" className="bg-surface">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-14">
            <div>
              <h2 id="stay-heading" className={H2}>
                {stay.heading}
              </h2>
              <p className="mt-4 leading-[1.75] text-ink">{stay.intro}</p>
              <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {stay.rates.map((rate) => (
                  <li
                    key={rate.id}
                    className="relative overflow-hidden rounded-[10px] border border-border bg-surface-subtle p-6"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand to-accent-surface"
                    />
                    <p className="text-sm font-semibold tracking-[0.12em] text-accent-700 uppercase">
                      {rate.label}
                    </p>
                    <p className="mt-3 font-serif text-[2.5rem] leading-none text-brand">
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
                className="rounded-[10px] border border-border bg-surface p-6 md:p-7"
              >
                <h2 id="discount-heading" className="font-serif text-2xl text-ink-strong">
                  {discounts.heading}
                </h2>
                <ul className="mt-5 space-y-3">
                  {discounts.tiers.map((tier) => (
                    <li
                      key={tier.id}
                      className="flex items-center gap-4 rounded-[8px] bg-accent-50 p-4"
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
                className="scroll-mt-40 rounded-[10px] bg-brand-950 p-6 text-white md:p-7"
              >
                <h2 id="contact-heading" className="font-serif text-2xl">
                  {contact.heading}
                </h2>
                <ul className="mt-5 space-y-3 text-[0.9375rem]">
                  <li>
                    <span className="block text-xs tracking-[0.14em] text-white/60 uppercase">
                      Phone
                    </span>
                    <span className="font-semibold">{contact.phone}</span>
                  </li>
                  <li>
                    <span className="block text-xs tracking-[0.14em] text-white/60 uppercase">
                      Email
                    </span>
                    <a
                      href={`mailto:${contact.email}`}
                      className="font-semibold text-accent-surface hover:text-white"
                    >
                      {contact.email}
                    </a>
                  </li>
                  <li>
                    <span className="block text-xs tracking-[0.14em] text-white/60 uppercase">
                      Website
                    </span>
                    <a
                      href={contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-semibold text-accent-surface hover:text-white"
                    >
                      {contact.website.replace(/^https?:\/\//, '')}
                      <ExternalIcon size={13} aria-hidden="true" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
