import Image from 'next/image';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import {
  BookIcon,
  BriefcaseIcon,
  CheckIcon,
  CompassIcon,
  ExternalIcon,
  LightbulbIcon,
  SparkIcon,
  type IconProps,
} from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import type { HealthcareActivityIcon, HealthcareCentre } from '@/types/healthcare-centre';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';
const H2 =
  'font-serif text-[clamp(1.75rem,3.2vw,2.5rem)] leading-tight tracking-[-0.02em] text-ink-strong';
const BODY = 'text-base leading-[1.85] text-ink md:text-[1.0625rem]';
const EYEBROW = 'text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase';

const ACTIVITY_ICONS: Record<HealthcareActivityIcon, (props: IconProps) => React.ReactElement> = {
  academic: BookIcon,
  executive: BriefcaseIcon,
  skills: SparkIcon,
  research: LightbulbIcon,
};

/** "https://www.cmch-vellore.edu/x" → "cmch-vellore.edu", shown under each partner. */
const domainOf = (href: string) => new URL(href).hostname.replace(/^www\./, '');

/**
 * XLRI Centre for Healthcare Management.
 *
 * ## The order is an argument
 *
 * The Delhi page makes a case — the sector is changing, so the Centre exists,
 * so it partners, so programmes are coming — and the page keeps that order:
 *
 *  1. **Hero** (navy) — the name and the aim, beside a mosaic of the Centre's
 *     three partnership signings: the only photographs it has, and the
 *     clearest evidence of what it does.
 *  2. **About** — the case in prose, with the ecosystem the prose describes
 *     drawn out beside it: three traditional participants, then the eight new
 *     kinds it lists. The lists are the paragraph's own words.
 *  3. **Vision and Mission** — side by side, because they are a pair.
 *  4. **Activities** (navy) — the four things the collaborations offer, as
 *     tiles.
 *  5. **Collaborations** — the eight partner institutions as linked cards,
 *     each showing the site it opens.
 *  6. **Upcoming programmes** — what is being co-created, and a "Coming soon"
 *     panel that says so plainly rather than an empty list.
 *
 * Server Component; no client JavaScript.
 */
export function HealthcareCentrePage({ centre }: { centre: HealthcareCentre }) {
  const { about, vision, mission, activities, collaborations, upcoming } = centre;
  const [main, ...rest] = centre.photos;

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

          <div className="mt-10 grid grid-cols-1 items-center gap-10 md:mt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
            <div>
              <p className="text-sm font-semibold tracking-[0.18em] text-accent-surface uppercase">
                Centre of Excellence
              </p>
              <h1
                id="centre-heading"
                className="mt-4 font-serif text-[clamp(2.25rem,4.8vw,3.5rem)] leading-[1.04] tracking-[-0.03em] text-balance text-white"
              >
                {centre.title}
              </h1>
              <span aria-hidden="true" className="mt-7 block h-[3px] w-14 bg-accent-surface" />
              <p className="mt-7 max-w-[36rem] font-serif text-xl leading-[1.55] text-white/90 md:text-[1.375rem]">
                {centre.lead}
              </p>
            </div>

            {/* Mosaic: the wide signing photograph across the top, two below. */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {main ? (
                <Photo
                  photo={main}
                  className="col-span-2 aspect-[16/8]"
                  sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 100vw"
                  preload
                />
              ) : null}
              {rest.map((photo) => (
                <Photo
                  key={photo.id}
                  photo={photo}
                  className="aspect-[4/3]"
                  sizes="(min-width: 1280px) 300px, (min-width: 1024px) 25vw, 50vw"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- about + ecosystem ---------------- */}
      <section aria-labelledby="about-heading" className="bg-surface">
        <div
          className={`${MEASURE} grid grid-cols-1 gap-12 py-14 md:py-20 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16`}
        >
          <div>
            <h2 id="about-heading" className={H2}>
              {about.heading}
            </h2>
            <span aria-hidden="true" className="mt-4 block h-[3px] w-10 bg-accent-surface" />
            <div className={`mt-6 space-y-5 ${BODY} md:text-justify md:hyphens-auto`}>
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </div>

          <aside
            aria-labelledby="ecosystem-heading"
            className="self-start rounded-[8px] border border-t-[3px] border-border border-t-accent-surface bg-surface-subtle p-6 md:p-8 lg:sticky lg:top-[13.5rem]"
          >
            <h3
              id="ecosystem-heading"
              className="font-serif text-2xl leading-tight text-ink-strong"
            >
              {about.ecosystem.heading}
            </h3>

            <p className={`mt-6 ${EYEBROW}`}>{about.ecosystem.traditional.label}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {about.ecosystem.traditional.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-border-strong/60 bg-surface px-3 py-1 text-sm text-ink-muted"
                >
                  {item}
                </li>
              ))}
            </ul>

            <span aria-hidden="true" className="my-6 block h-px bg-border" />

            <p className={EYEBROW}>{about.ecosystem.growing.label}</p>
            <ul className="mt-4 space-y-2.5">
              {about.ecosystem.growing.items.map((item) => (
                <li key={item} className="flex gap-3 text-[0.9375rem] leading-snug text-ink-strong">
                  <CheckIcon
                    size={16}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-accent-700"
                  />
                  <span>{item}</span>
                </li>
              ))}
              <li className="pl-7 text-[0.9375rem] text-ink-muted italic">…and many others</li>
            </ul>
          </aside>
        </div>
      </section>

      {/* ---------------- vision + mission ---------------- */}
      <section aria-label="Vision and mission" className="bg-surface-subtle">
        <div className={`${MEASURE} grid grid-cols-1 gap-6 py-14 md:py-20 lg:grid-cols-2 lg:gap-8`}>
          {[
            { block: vision, id: 'vision', Icon: CompassIcon },
            { block: mission, id: 'mission', Icon: SparkIcon },
          ].map(({ block, id, Icon }) => (
            <section
              key={id}
              aria-labelledby={`${id}-heading`}
              className="flex flex-col rounded-[8px] border border-border bg-surface p-6 md:p-10"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-accent-50 text-accent-700">
                <Icon size={24} />
              </span>
              <h2
                id={`${id}-heading`}
                className="mt-5 font-serif text-[1.75rem] leading-tight text-ink-strong md:text-[2rem]"
              >
                {block.heading}
              </h2>
              <span aria-hidden="true" className="mt-4 block h-[3px] w-10 bg-accent-surface" />
              <div className="mt-5 space-y-4 text-[0.9375rem] leading-[1.85] text-ink md:text-base">
                {block.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      {/* ---------------- activities ---------------- */}
      <section aria-labelledby="activities-heading" className="purpose-band text-ink-inverse">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
            <h2
              id="activities-heading"
              className="font-serif text-[clamp(1.75rem,3.2vw,2.5rem)] leading-tight tracking-[-0.02em] text-white"
            >
              {activities.heading}
            </h2>
            <p className="text-base leading-[1.85] text-white/85 md:text-[1.0625rem]">
              {activities.intro}
            </p>
          </div>

          <ul className="mt-10 grid grid-cols-2 gap-4 md:mt-14 lg:grid-cols-4 lg:gap-5">
            {activities.items.map((item) => {
              const Icon = ACTIVITY_ICONS[item.icon];
              return (
                <li
                  key={item.id}
                  className="flex flex-col gap-5 rounded-[8px] border border-white/15 bg-white/[0.06] p-5 md:p-7"
                >
                  <span className="flex size-12 items-center justify-center rounded-full bg-accent-surface text-brand-950">
                    <Icon size={22} />
                  </span>
                  <span className="font-serif text-lg leading-snug text-white md:text-xl">
                    {item.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ---------------- collaborations ---------------- */}
      <section aria-labelledby="collaborations-heading" className="bg-surface">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <div className="max-w-[48rem]">
            <h2 id="collaborations-heading" className={H2}>
              {collaborations.heading}
            </h2>
            <p className={`mt-4 ${BODY}`}>{collaborations.intro}</p>
          </div>

          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-12 lg:grid-cols-4 lg:gap-5">
            {collaborations.items.map((item, index) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col gap-6 rounded-[8px] border border-border bg-surface p-5 transition-[border-color,box-shadow] duration-300 hover:border-brand hover:shadow-raised md:p-6"
                >
                  <span className="flex items-center justify-between">
                    <span
                      aria-hidden="true"
                      className="font-serif text-3xl leading-none text-border-strong/70"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <ExternalIcon size={15} aria-hidden="true" className="text-accent-700" />
                  </span>
                  <span className="mt-auto">
                    <span className="block font-serif text-lg leading-snug text-ink-strong group-hover:text-brand">
                      {item.name}
                    </span>
                    <span className="mt-2 block text-sm text-ink-muted">{domainOf(item.href)}</span>
                  </span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- upcoming ---------------- */}
      <section aria-labelledby="upcoming-heading" className="bg-surface-subtle">
        <div
          className={`${MEASURE} grid grid-cols-1 items-center gap-10 py-14 md:py-20 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16`}
        >
          <div>
            <h2 id="upcoming-heading" className={H2}>
              {upcoming.heading}
            </h2>
            <span aria-hidden="true" className="mt-4 block h-[3px] w-10 bg-accent-surface" />
            <div className={`mt-6 space-y-5 ${BODY}`}>
              {upcoming.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="rounded-[8px] bg-brand-950 p-8 text-white shadow-raised md:p-10">
            <p className="flex items-center gap-3 text-sm font-semibold tracking-[0.18em] text-accent-surface uppercase">
              <span aria-hidden="true" className="relative flex size-2.5">
                <span className="absolute inset-0 rounded-full bg-accent-surface opacity-60 motion-safe:animate-ping" />
                <span className="relative size-2.5 rounded-full bg-accent-surface" />
              </span>
              {upcoming.comingSoon.label}
            </p>
            <p className="mt-5 font-serif text-2xl leading-snug text-white md:text-[1.75rem]">
              {upcoming.comingSoon.text}
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}

function Photo({
  photo,
  className,
  sizes,
  preload = false,
}: {
  photo: HealthcareCentre['photos'][number];
  className: string;
  sizes: string;
  preload?: boolean;
}) {
  return (
    <figure className={`group relative overflow-hidden rounded-[8px] shadow-raised ${className}`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        // The large tile is above the fold — the LCP element. `preload`
        // replaces the deprecated `priority` in Next 16.
        preload={preload}
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
      />
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-3 pt-8 pb-2.5 text-[0.8125rem] leading-snug font-medium text-white md:px-4 md:pb-3 md:text-sm">
        {photo.caption}
      </figcaption>
    </figure>
  );
}
