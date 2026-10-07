import Image from 'next/image';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import {
  BookIcon,
  CheckIcon,
  LightbulbIcon,
  MapPinIcon,
  type IconProps,
} from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import { CentreNewsCarousel } from '@/features/centres/centre-news-carousel';
import { CentrePeople } from '@/features/centres/centre-people';
import type { Centre, CentreAreaIcon } from '@/types/centre';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';

const AREA_ICONS: Record<CentreAreaIcon, (props: IconProps) => React.ReactElement> = {
  research: LightbulbIcon,
  teaching: BookIcon,
  field: MapPinIcon,
};

/**
 * A Centre of Excellence page.
 *
 * Built for the Centre for Gender Equality & Inclusive Leadership, against the
 * generic `Centre` shape so the other centres reuse it unchanged.
 *
 * ## The order is an argument
 *
 *  1. **Hero** (navy) — what the Centre is, in its own words, beside a
 *     photograph of its people. The name is long, so it gets the full left
 *     column and the photograph earns the right.
 *  2. **Why / focus** — the two paragraphs that explain the Centre, set side by
 *     side under a strip of four facts. Every fact is a figure the Centre's own
 *     text states (2021, 92%, three areas, the size of the board); the strip
 *     only lifts them out so they can be seen at a glance.
 *  3. **Purpose** — the three areas of intervention as cards, because they are
 *     parallel and meant to be compared.
 *  4. **News & Events** — evidence that the purpose is acted on, placed right
 *     after it. A swipeable strip, not a 16-tile wall.
 *  5. **Structure, then people** — governance last, as the Delhi page has it:
 *     the paragraph that explains the board, then the Chairperson and the
 *     board itself.
 *
 * The hero is navy for the same reason the homepage purpose band is: it is the
 * one surface where the brand green can carry text legibly.
 *
 * A Server Component; the carousel and the people dialog hydrate.
 */
export function CentrePage({ centre }: { centre: Centre }) {
  const { about, purpose, news, structure } = centre;

  return (
    <article aria-labelledby="centre-heading">
      {/* ---------------- hero ---------------- */}
      <section className="purpose-band text-ink-inverse">
        <div className={`${MEASURE} pt-8 pb-14 md:pt-10 md:pb-20`}>
          <Breadcrumbs
            className="[&_a]:text-white/70 [&_a:hover]:text-white [&_span]:text-white"
            items={[
              { label: 'Home', href: routes.home },
              { label: 'Centres' },
              { label: centre.shortName },
            ]}
          />

          <div className="mt-10 grid grid-cols-1 items-center gap-10 md:mt-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-14">
            <div>
              <p className="text-sm font-semibold tracking-[0.18em] text-accent-surface uppercase">
                Centre of Excellence · {centre.shortName}
              </p>
              <h1
                id="centre-heading"
                className="mt-4 font-serif text-[clamp(2.125rem,4.6vw,3.5rem)] leading-[1.04] tracking-[-0.03em] text-balance text-white"
              >
                {centre.title}
              </h1>
              <span aria-hidden="true" className="mt-7 block h-[3px] w-14 bg-accent-surface" />
              <p className="mt-7 max-w-[38rem] text-base leading-[1.8] text-white/85 md:text-lg">
                {centre.lead}
              </p>
            </div>

            <div className="relative">
              {/* An offset frame in the accent — the photograph sits on it. */}
              <span
                aria-hidden="true"
                className="absolute -right-3 -bottom-3 hidden h-full w-full rounded-[8px] border-2 border-accent-surface/70 md:block"
              />
              <div className="relative aspect-[3/2] overflow-hidden rounded-[8px] shadow-raised">
                <Image
                  src={centre.heroImage.src}
                  alt={centre.heroImage.alt}
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
        </div>
      </section>

      {/* ---------------- facts + why / focus ---------------- */}
      <section aria-label={`About ${centre.shortName}`} className="bg-surface">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[8px] border border-border bg-border lg:grid-cols-4">
            {about.facts.map((fact) => (
              // Label first in the DOM (a <dt> must precede its <dd>), figure
              // first on screen — `flex-col-reverse` swaps them visually only.
              <div
                key={fact.id}
                className="flex flex-col-reverse justify-end bg-surface px-5 py-6 md:px-7 md:py-8"
              >
                <dt className="mt-3 text-sm leading-snug text-ink-muted">{fact.label}</dt>
                <dd className="font-serif text-[clamp(2.25rem,4vw,3rem)] leading-none text-brand">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-14 grid grid-cols-1 gap-12 md:mt-16 md:grid-cols-2 md:gap-14 lg:gap-20">
            {[about.why, about.focus].map((block) => (
              <div key={block.heading}>
                <h2 className="font-serif text-[1.75rem] leading-tight text-ink-strong md:text-[2rem]">
                  {block.heading}
                </h2>
                <span aria-hidden="true" className="mt-4 block h-[3px] w-10 bg-accent-surface" />
                <p className="mt-5 text-base leading-[1.85] text-ink md:text-justify md:text-[1.0625rem] md:hyphens-auto">
                  {block.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- purpose ---------------- */}
      <section aria-labelledby="purpose-heading" className="bg-surface-subtle">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <div className="max-w-[46rem]">
            <h2
              id="purpose-heading"
              className="font-serif text-[clamp(1.75rem,3.2vw,2.5rem)] leading-tight tracking-[-0.02em] text-ink-strong"
            >
              {purpose.heading}
            </h2>
            <p className="mt-4 text-base leading-[1.8] text-ink md:text-lg">{purpose.intro}</p>
          </div>

          <ul className="mt-10 grid grid-cols-1 gap-6 md:mt-12 lg:grid-cols-3">
            {purpose.areas.map((area, index) => {
              const Icon = AREA_ICONS[area.icon];
              return (
                <li
                  key={area.id}
                  className="flex flex-col rounded-[8px] border border-t-[3px] border-border border-t-accent-surface bg-surface p-6 md:p-8"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex size-12 items-center justify-center rounded-full bg-accent-50 text-accent-700">
                      <Icon size={24} />
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-serif text-4xl leading-none text-border-strong/70"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-5 font-serif text-2xl text-ink-strong">{area.title}</h3>
                  <ul className="mt-4 space-y-3">
                    {area.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-[0.9375rem] leading-[1.65] text-ink"
                      >
                        <CheckIcon
                          size={16}
                          aria-hidden="true"
                          className="mt-1 shrink-0 text-accent-700"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ---------------- news & events ---------------- */}
      <section aria-labelledby="news-heading" className="bg-surface">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <h2
            id="news-heading"
            className="font-serif text-[clamp(1.75rem,3.2vw,2.5rem)] leading-tight tracking-[-0.02em] text-ink-strong"
          >
            {news.heading}
          </h2>
          <div className="mt-8">
            <CentreNewsCarousel items={news.items} />
          </div>
        </div>
      </section>

      {/* ---------------- structure + people ---------------- */}
      <section className="bg-surface-subtle">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <section aria-labelledby="structure-heading" className="max-w-[52rem]">
            <h2
              id="structure-heading"
              className="font-serif text-[clamp(1.75rem,3.2vw,2.5rem)] leading-tight tracking-[-0.02em] text-ink-strong"
            >
              {structure.heading}
            </h2>
            <div className="mt-5 space-y-4 text-base leading-[1.85] text-ink md:text-justify md:text-[1.0625rem] md:hyphens-auto">
              {structure.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </section>

          <div className="mt-14 md:mt-16">
            <CentrePeople chairperson={centre.chairperson} advisors={centre.advisors} />
          </div>
        </div>
      </section>
    </article>
  );
}
