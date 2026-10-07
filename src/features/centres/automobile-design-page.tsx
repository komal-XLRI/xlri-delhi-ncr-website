import Image from 'next/image';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { CheckIcon, ExternalIcon } from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import type { AutomobileDesignCentre } from '@/types/automobile-design';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';
const H2 =
  'font-serif text-[clamp(1.75rem,3.2vw,2.5rem)] leading-tight tracking-[-0.02em] text-ink-strong';
const BODY = 'text-base leading-[1.85] text-ink md:text-[1.0625rem]';

/** Rules between the four facts: a 2×2 grid on small screens, a row of four from `lg`. */
const FACT_CELL = [
  'pr-5 md:pr-8',
  'border-l pl-5 md:pl-8',
  'border-t pr-5 md:pr-8 lg:border-t-0 lg:border-l lg:pl-8',
  'border-t border-l pl-5 md:pl-8 lg:border-t-0',
];

/**
 * Indian School for Design of Automobiles (INDEA).
 *
 * ## The order is a story
 *
 * INDEA is a school being built, so the page reads as its progress, in the
 * Delhi page's own order:
 *
 *  1. **Hero** (navy) — the name and the promise ("a first-of-its-kind …
 *     finishing school"), with the INDEA mark on a white card; the four dates
 *     and figures the text states run along the hero's foot as a fact strip.
 *  2. **Why** — Make in India, Design in India: the founding argument beside
 *     the page's own "Make + Design = Create" graphic.
 *  3. **Building INDEA** — the foundation stone, the Param pillar (portrait,
 *     so it gets a tall column), the building and its design studio.
 *  4. **Academic framework** (navy) — three pillars as numbered cards, then
 *     the curriculum with the flagship programme set as a callout.
 *  5. **Mentors and faculty** — round portraits, each linking to the person's
 *     LinkedIn profile as the Delhi page does.
 *  6. **INDEA in action** — the debate and the expo, each led by its
 *     panoramic photo strip at full width, which is the shape those
 *     photographs were made in.
 *  7. **In the media** — headline cards, not the bare URLs Delhi lists.
 *  8. **Marcello Gandini's message** — the close, as on the Delhi page.
 *
 * Server Component; no client JavaScript.
 */
export function AutomobileDesignPage({ centre }: { centre: AutomobileDesignCentre }) {
  const { intro, campus, academics, mentors, milestones, press, quote } = centre;

  return (
    <article aria-labelledby="centre-heading">
      {/* ---------------- hero + facts ---------------- */}
      <section className="purpose-band text-ink-inverse">
        <div className={`${MEASURE} pt-8 md:pt-10`}>
          <Breadcrumbs
            className="[&_a]:text-white/70 [&_a:hover]:text-white [&_span]:text-white"
            items={[
              { label: 'Home', href: routes.home },
              { label: 'Centres' },
              { label: centre.shortName },
            ]}
          />

          <div className="mt-10 grid grid-cols-1 items-center gap-10 md:mt-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <p className="text-sm font-semibold tracking-[0.18em] text-accent-surface uppercase">
                Centre of Excellence · {centre.shortName}
              </p>
              <h1
                id="centre-heading"
                className="mt-4 font-serif text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.03] tracking-[-0.03em] text-balance text-white"
              >
                {centre.title}
              </h1>
              <span aria-hidden="true" className="mt-7 block h-[3px] w-14 bg-accent-surface" />
              <p className="mt-7 max-w-[36rem] font-serif text-xl leading-[1.5] text-white/90 md:text-2xl">
                {centre.statement}.
              </p>
            </div>

            <div className="relative">
              <span
                aria-hidden="true"
                className="absolute -right-3 -bottom-3 hidden h-full w-full rounded-[8px] border-2 border-accent-surface/70 md:block"
              />
              <div className="relative overflow-hidden rounded-[8px] bg-white p-6 shadow-raised md:p-10">
                <Image
                  src={centre.logo.src}
                  width={centre.logo.width}
                  height={centre.logo.height}
                  alt={centre.logo.alt}
                  // Above the fold — the LCP element. `preload` replaces the
                  // deprecated `priority` in Next 16.
                  preload
                  sizes="(min-width: 1280px) 480px, (min-width: 1024px) 40vw, 90vw"
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>

          <dl className="mt-14 grid grid-cols-2 border-t border-white/15 md:mt-20 lg:grid-cols-4">
            {centre.facts.map((fact, index) => (
              // Label first in the DOM (a <dt> must precede its <dd>), figure
              // first on screen — `flex-col-reverse` swaps them visually only.
              <div
                key={fact.id}
                className={`flex flex-col-reverse justify-end border-white/15 py-7 md:py-9 ${FACT_CELL[index]}`}
              >
                <dt className="mt-2 text-sm leading-snug text-white/70">{fact.label}</dt>
                <dd className="font-serif text-[clamp(1.5rem,2.6vw,2.125rem)] leading-none text-white">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------------- why ---------------- */}
      <section aria-labelledby="intro-heading" className="bg-surface">
        <div
          className={`${MEASURE} grid grid-cols-1 items-center gap-10 py-14 md:py-20 lg:grid-cols-2 lg:gap-16`}
        >
          <div>
            <h2 id="intro-heading" className={H2}>
              {intro.heading}
            </h2>
            <span aria-hidden="true" className="mt-4 block h-[3px] w-10 bg-accent-surface" />
            <div className={`mt-6 space-y-5 ${BODY} md:text-justify md:hyphens-auto`}>
              {intro.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-[8px] shadow-raised">
            <Image
              src={intro.image.src}
              width={intro.image.width}
              height={intro.image.height}
              alt={intro.image.alt}
              sizes="(min-width: 1280px) 560px, (min-width: 1024px) 45vw, 100vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      {/* ---------------- building INDEA ---------------- */}
      <section aria-labelledby="campus-heading" className="bg-surface-subtle">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <h2 id="campus-heading" className={H2}>
            {campus.heading}
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-10 md:mt-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
            {/* The pillar is a portrait photograph; it gets the tall column. */}
            <figure>
              <div className="overflow-hidden rounded-[8px]">
                <Image
                  src={campus.pillar.image.src}
                  width={campus.pillar.image.width}
                  height={campus.pillar.image.height}
                  alt={campus.pillar.image.alt}
                  sizes="(min-width: 1280px) 480px, (min-width: 1024px) 40vw, 100vw"
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mt-4 border-l-[3px] border-accent-surface pl-4 font-serif text-lg leading-[1.55] text-ink-strong">
                {campus.pillar.caption}
              </figcaption>
            </figure>

            <div>
              <figure className="overflow-hidden rounded-[8px] border border-border bg-surface">
                <Image
                  src={campus.ceremonyImage.src}
                  width={campus.ceremonyImage.width}
                  height={campus.ceremonyImage.height}
                  alt={campus.ceremonyImage.alt}
                  sizes="(min-width: 1280px) 680px, (min-width: 1024px) 55vw, 100vw"
                  className="h-auto w-full"
                />
                <figcaption className="p-5 text-[0.9375rem] leading-[1.75] text-ink md:p-6">
                  {campus.ceremony}
                </figcaption>
              </figure>

              <div className={`mt-8 space-y-5 ${BODY}`}>
                {campus.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-8 rounded-[8px] border border-t-[3px] border-border border-t-accent-surface bg-surface p-6 md:p-7">
                <h3 className="text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase">
                  The design studio
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-[1.75] text-ink">
                  {campus.studio.text}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {campus.studio.activities.map((activity) => (
                    <li
                      key={activity}
                      className="rounded-full border border-border-strong/60 px-3.5 py-1.5 text-sm font-medium text-ink-strong"
                    >
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- academic framework ---------------- */}
      <section aria-labelledby="academics-heading" className="purpose-band text-ink-inverse">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <h2
            id="academics-heading"
            className="font-serif text-[clamp(1.75rem,3.2vw,2.5rem)] leading-tight tracking-[-0.02em] text-white"
          >
            {academics.heading}
          </h2>
          <p className="mt-4 text-base text-white/80 md:text-lg">{academics.intro}</p>

          <ol className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {academics.pillars.map((pillar, index) => (
              <li
                key={pillar}
                className="flex flex-col gap-6 rounded-[8px] border border-white/15 bg-white/[0.06] p-6 md:p-8"
              >
                <span
                  aria-hidden="true"
                  className="font-serif text-5xl leading-none text-accent-surface"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="font-serif text-xl leading-snug text-white md:text-2xl">
                  {pillar}
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-12 grid grid-cols-1 gap-10 md:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
            <div className="space-y-5 text-base leading-[1.85] text-white/85 md:text-justify md:text-[1.0625rem] md:hyphens-auto">
              {academics.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
            <aside
              aria-labelledby="flagship-heading"
              className="self-start rounded-[8px] border-t-[3px] border-accent-surface bg-white p-6 text-ink shadow-raised md:p-8"
            >
              <h3
                id="flagship-heading"
                className="text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase"
              >
                {academics.flagship.label}
              </h3>
              <ul className="mt-4 space-y-4">
                {academics.flagship.paragraphs.map((paragraph) => (
                  <li
                    key={paragraph.slice(0, 40)}
                    className="flex gap-3 text-[0.9375rem] leading-[1.75]"
                  >
                    <CheckIcon
                      size={16}
                      aria-hidden="true"
                      className="mt-1.5 shrink-0 text-accent-700"
                    />
                    <span>{paragraph}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* ---------------- mentors ---------------- */}
      <section aria-labelledby="mentors-heading" className="bg-surface">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
            <h2 id="mentors-heading" className={H2}>
              {mentors.heading}
            </h2>
            <div className={`space-y-4 ${BODY}`}>
              {mentors.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </div>

          <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:mt-14 lg:grid-cols-5 lg:gap-x-8">
            {mentors.people.map((person) => (
              <li key={person.id}>
                <a
                  href={person.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center text-center"
                >
                  {/* The portraits come from Delhi already cut as rings on white. */}
                  <span className="block w-28 overflow-hidden rounded-full transition-transform duration-300 ease-out motion-safe:group-hover:-translate-y-1 md:w-36">
                    <Image
                      src={person.portrait.src}
                      width={person.portrait.width}
                      height={person.portrait.height}
                      alt=""
                      sizes="144px"
                      className="aspect-square w-full object-cover"
                    />
                  </span>
                  <span className="mt-4 block font-serif text-lg leading-tight text-ink-strong group-hover:text-brand">
                    {person.name}
                    <ExternalIcon
                      size={13}
                      aria-hidden="true"
                      className="ml-1.5 inline align-baseline text-accent-700"
                    />
                  </span>
                  <span className="mt-1.5 block text-[0.8125rem] leading-snug text-ink-muted md:text-sm">
                    {person.role}
                  </span>
                  <span className="sr-only"> — LinkedIn profile (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- milestones ---------------- */}
      <section aria-labelledby="milestones-heading" className="bg-surface-subtle">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <h2 id="milestones-heading" className={H2}>
            {milestones.heading}
          </h2>

          <div className="mt-10 space-y-16 md:mt-12 md:space-y-20">
            {milestones.items.map((item) => (
              <section key={item.id} aria-labelledby={`${item.id}-heading`}>
                {/* Panoramic strips: full width, never cropped. */}
                <div className="overflow-hidden rounded-[8px] shadow-raised">
                  <Image
                    src={item.image.src}
                    width={item.image.width}
                    height={item.image.height}
                    alt={item.image.alt}
                    sizes="(min-width: 1280px) 1184px, 100vw"
                    className="h-auto w-full"
                  />
                </div>
                <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
                  <div>
                    <p className="text-sm font-semibold tracking-[0.12em] text-accent-700 uppercase">
                      {item.eyebrow}
                    </p>
                    <h3
                      id={`${item.id}-heading`}
                      className="mt-3 font-serif text-2xl leading-tight text-ink-strong md:text-[2rem]"
                    >
                      {item.title}
                    </h3>
                  </div>
                  <div className={`space-y-4 ${BODY} md:text-justify md:hyphens-auto`}>
                    {item.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- press ---------------- */}
      <section aria-labelledby="press-heading" className="bg-surface">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <div className="max-w-[48rem]">
            <h2 id="press-heading" className={H2}>
              {press.heading}
            </h2>
            <p className={`mt-4 ${BODY}`}>{press.intro}</p>
          </div>

          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
            {press.items.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col gap-3 rounded-[8px] border border-border bg-surface p-5 transition-[border-color,box-shadow] duration-300 hover:border-brand hover:shadow-raised md:p-6"
                >
                  <span className="flex items-center justify-between gap-3 text-xs font-semibold tracking-[0.14em] text-accent-700 uppercase">
                    {item.outlet}
                    <ExternalIcon size={14} aria-hidden="true" className="shrink-0" />
                  </span>
                  <span
                    lang={item.lang}
                    className="font-serif text-lg leading-snug text-ink-strong group-hover:text-brand"
                  >
                    {item.title}
                  </span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- Gandini ---------------- */}
      <section aria-label={`A message from ${quote.name}`} className="bg-brand-950 text-white">
        <div
          className={`${MEASURE} grid grid-cols-1 items-center gap-10 py-14 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:py-20 lg:gap-16`}
        >
          <div className="mx-auto w-full max-w-[22rem] overflow-hidden rounded-[8px] md:max-w-none">
            <Image
              src={quote.portrait.src}
              width={quote.portrait.width}
              height={quote.portrait.height}
              alt={quote.portrait.alt}
              sizes="(min-width: 1280px) 440px, (min-width: 768px) 38vw, 352px"
              className="h-auto w-full"
            />
          </div>
          <figure>
            <span
              aria-hidden="true"
              className="block font-serif text-7xl leading-[0.6] text-accent-surface"
            >
              “
            </span>
            <blockquote className="mt-4 space-y-5 font-serif text-xl leading-[1.55] text-white/95 md:text-[1.625rem]">
              {quote.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <span aria-hidden="true" className="h-[3px] w-10 bg-accent-surface" />
              <span>
                <span className="block font-semibold">{quote.name}</span>
                <span className="block text-sm text-white/70">{quote.date}</span>
              </span>
            </figcaption>
          </figure>
        </div>
      </section>
    </article>
  );
}
