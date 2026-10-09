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
 *  1. **Hero** — the name and the aim, beside a mosaic of the Centre's
 *     three partnership signings: the only photographs it has, and the
 *     clearest evidence of what it does.
 *  2. **About** — the case in prose, with the ecosystem the prose describes
 *     drawn out beside it: three traditional participants, then the eight new
 *     kinds it lists. The lists are the paragraph's own words.
 *  3. **Vision and Mission** — side by side, because they are a pair.
 *  4. **Activities** — the four things the collaborations offer, as
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
      <section className="bg-surface">
        <div className={`${MEASURE} pt-10 pb-14 md:pt-14 md:pb-20`}>
          <Breadcrumbs
            items={[
              { label: 'Home', href: routes.home },
              { label: 'Centres' },
              { label: centre.shortName },
            ]}
          />

          <div className="mt-10 grid grid-cols-1 items-center gap-10 md:mt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
            <div>
              <p className="text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase">
                Centre of Excellence
              </p>
              <h1
                id="centre-heading"
                className="mt-3 font-serif text-[clamp(2.25rem,4.8vw,3.5rem)] leading-[1.04] tracking-[-0.03em] text-balance text-brand"
              >
                {centre.title}
              </h1>
              <span
                aria-hidden="true"
                className="rule-draw mt-6 block h-[3px] w-14 origin-left bg-accent-surface"
              />
              <p className="mt-6 max-w-[36rem] font-serif text-xl leading-[1.55] text-ink-strong md:text-[1.375rem]">
                {centre.lead}
              </p>
            </div>

            {/* Mosaic: the wide signing photograph across the top, two below. */}
            <div
              className="rise-in group/mosaic relative"
              style={{ ['--rise-delay' as string]: '200ms' }}
            >
              {/* The offset lime frame used on the other page photographs, around the whole mosaic. */}
              <span
                aria-hidden="true"
                className="absolute -right-3 -bottom-3 hidden h-full w-full rounded-[8px] border-2 border-accent-surface/70 transition-[translate,border-color] duration-700 ease-out group-hover/mosaic:translate-x-1.5 group-hover/mosaic:translate-y-1.5 group-hover/mosaic:border-accent-surface md:block"
              />
              <div className="relative grid grid-cols-2 gap-3 bg-surface md:gap-4">
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
                  className="rounded-full border border-border-strong/60 bg-surface px-3 py-1 text-sm text-ink-muted transition-colors duration-300 hover:border-brand hover:text-brand"
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
              className="group flex flex-col rounded-[8px] border border-border bg-surface p-6 transition-[translate,box-shadow,border-color] duration-500 ease-out hover:border-brand/40 hover:shadow-raised motion-safe:hover:-translate-y-1 md:p-10"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-accent-50 text-accent-700 transition-colors duration-500 group-hover:bg-brand group-hover:text-white">
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
      <section aria-labelledby="activities-heading" className="bg-surface">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
            <div>
              <h2 id="activities-heading" className={H2}>
                {activities.heading}
              </h2>
              <span aria-hidden="true" className="mt-4 block h-[3px] w-10 bg-accent-surface" />
            </div>
            <p className="text-base leading-[1.85] text-ink md:text-[1.0625rem]">
              {activities.intro}
            </p>
          </div>

          <ul className="mt-10 grid grid-cols-2 gap-4 md:mt-14 lg:grid-cols-4 lg:gap-5">
            {activities.items.map((item) => {
              const Icon = ACTIVITY_ICONS[item.icon];
              return (
                <li
                  key={item.id}
                  className="group flex flex-col gap-5 rounded-[8px] border border-t-[3px] border-border border-t-accent-surface bg-surface-subtle p-5 transition-[translate,box-shadow,border-color] duration-500 ease-out hover:border-brand/40 hover:border-t-accent-surface hover:shadow-raised motion-safe:hover:-translate-y-1 md:p-7"
                >
                  <span className="flex size-12 items-center justify-center rounded-full bg-accent-50 text-accent-700 transition-colors duration-500 group-hover:bg-brand group-hover:text-white">
                    <Icon size={22} />
                  </span>
                  <span className="font-serif text-lg leading-snug text-ink-strong transition-colors duration-500 group-hover:text-brand md:text-xl">
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
            <span aria-hidden="true" className="mt-4 block h-[3px] w-10 bg-accent-surface" />
            <p className={`mt-4 ${BODY}`}>{collaborations.intro}</p>
          </div>

          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-12 lg:grid-cols-4 lg:gap-5">
            {collaborations.items.map((item, index) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex h-full flex-col gap-6 overflow-hidden rounded-[8px] border border-border bg-surface p-5 transition-[translate,box-shadow,border-color] duration-500 ease-out hover:border-brand/40 hover:shadow-raised motion-safe:hover:-translate-y-1 md:p-6"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent-surface transition-transform duration-700 ease-out group-hover:scale-x-100"
                  />
                  <span className="flex items-center justify-between">
                    <span
                      aria-hidden="true"
                      className="font-serif text-3xl leading-none text-border-strong/70 transition-colors duration-500 group-hover:text-accent-700"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <ExternalIcon size={15} aria-hidden="true" className="text-accent-700" />
                  </span>
                  <span className="mt-auto">
                    <span className="block font-serif text-lg leading-snug text-ink-strong transition-colors duration-500 group-hover:text-brand">
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

          <div className="rounded-[8px] border border-t-4 border-border border-t-accent-surface bg-surface p-8 shadow-raised md:p-10">
            <p className="flex items-center gap-3 text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase">
              <span aria-hidden="true" className="relative flex size-2.5">
                <span className="absolute inset-0 rounded-full bg-accent-surface opacity-60 motion-safe:animate-ping" />
                <span className="relative size-2.5 rounded-full bg-accent-700" />
              </span>
              {upcoming.comingSoon.label}
            </p>
            <p className="mt-5 font-serif text-2xl leading-snug text-brand md:text-[1.75rem]">
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
