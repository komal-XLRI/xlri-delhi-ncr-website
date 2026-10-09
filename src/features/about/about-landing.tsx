import Image from 'next/image';
import NextLink from 'next/link';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import {
  ArrowRightIcon,
  BookIcon,
  CompassIcon,
  LandmarkIcon,
  SealIcon,
  type IconProps,
} from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import type { AboutIcon, AboutPage } from '@/types/about';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';

/** Name-to-drawing map; content stores a string, never a component. */
const ICONS: Record<AboutIcon, (props: IconProps) => React.ReactElement> = {
  landmark: LandmarkIcon,
  compass: CompassIcon,
  seal: SealIcon,
  book: BookIcon,
};

/**
 * The About landing page.
 *
 * ## The model
 *
 * The Jamshedpur About page (xlri.ac.in/about), section for section, with
 * Delhi-NCR's text and photographs:
 *
 *  1. **Hero** — the title on the left and the lead paragraph on the right,
 *     over a full-width banner at Jamshedpur's ~3:1. Their green disc that
 *     overlaps the banner's lower-left corner is kept, as a "jump to content"
 *     link rather than a decoration.
 *  2. **Intro** — a short heading in the left third, a 2×2 grid of icon cards
 *     in the right two, each ending in "Know More".
 *  3. **Explore** — a navy band: heading and paragraph side by side, then
 *     large image cards with an arrow caption. Jamshedpur has six; Delhi has
 *     three built pages that belong here, so one clean row of three rather
 *     than links to pages that do not exist yet.
 *  4. **Campus & links** — Jamshedpur's quick-link list (big labels, ruled
 *     lines, a black disc that turns green and rotates on hover). Their left
 *     column is empty; Delhi's campus description fills it.
 *
 * Server Component; no client JavaScript.
 */
export function AboutLanding({ content }: { content: AboutPage }) {
  const { hero, intro, explore, campus } = content;

  return (
    <article aria-labelledby="about-heading">
      {/* ---------------- hero ---------------- */}
      <section className="bg-surface">
        <div className={`${MEASURE} pt-10 md:pt-14`}>
          <Breadcrumbs items={[{ label: 'Home', href: routes.home }, { label: 'About' }]} />

          <div className="mt-8 grid grid-cols-1 items-start gap-6 md:mt-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
            <h1
              id="about-heading"
              className="font-serif text-[clamp(2.25rem,5vw,3.75rem)] leading-none tracking-[-0.035em] text-brand"
            >
              {hero.title}
            </h1>
            <p className="max-w-[41.875rem] text-base leading-[1.85] text-ink md:text-[1.0625rem] lg:pt-2">
              {hero.lead}
            </p>
          </div>
        </div>

        <div className={`${MEASURE} relative mt-10 md:mt-14`}>
          <div className="relative aspect-[16/9] overflow-hidden rounded-[5px] md:aspect-[3.09/1]">
            <Image
              src={hero.banner.src}
              alt={hero.banner.alt}
              fill
              // Above the fold — the LCP element. `preload` replaces the
              // deprecated `priority` in Next 16.
              preload
              sizes="(min-width: 1280px) 1184px, 100vw"
              className="object-cover object-[center_15%]"
            />
          </div>
          {/* Jamshedpur's green disc: it opens the homepage's academic programmes. */}
          <NextLink
            href={`${routes.home}#academics`}
            aria-label="See our academic programmes"
            className="absolute -bottom-12 left-[calc(1.5rem+4%)] hidden size-24 items-center justify-center rounded-full bg-accent-surface text-brand-950 shadow-raised transition-transform duration-300 hover:scale-105 lg:flex"
          >
            <ArrowRightIcon size={26} className="rotate-90" />
          </NextLink>
        </div>
      </section>

      {/* ---------------- intro ---------------- */}
      <section id="about-intro" aria-labelledby="about-intro-heading" className="bg-surface">
        <div className={`${MEASURE} pt-20 pb-16 md:pt-28 md:pb-20`}>
          <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,35fr)_minmax(0,65fr)] xl:gap-12">
            <h2
              id="about-intro-heading"
              className="mx-auto max-w-[31rem] text-center font-serif text-[clamp(1.875rem,3.4vw,2.625rem)] leading-[1.05] tracking-[-0.025em] text-ink-strong xl:mx-0 xl:max-w-[24.5rem] xl:text-left"
            >
              {intro.heading}
            </h2>

            <ul className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 md:gap-y-16">
              {intro.cards.map((card) => {
                const Icon = ICONS[card.icon];
                return (
                  <li
                    key={card.id}
                    className="flex flex-col items-center text-center xl:items-start xl:text-left"
                  >
                    <span className="flex size-12 items-center justify-center rounded-full bg-accent-50 text-accent-700 md:size-14">
                      <Icon size={26} />
                    </span>
                    <h3 className="mt-4 font-serif text-2xl text-ink-strong md:text-[1.875rem]">
                      {card.title}
                    </h3>
                    <p className="mt-2.5 max-w-[19.25rem] flex-1 text-[0.9375rem] leading-[1.7] text-ink">
                      {card.body}
                    </p>
                    <NextLink
                      href={card.href}
                      className="group mt-5 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-brand"
                    >
                      Know More
                      <span className="sr-only"> about {card.title}</span>
                      <ArrowRightIcon
                        size={14}
                        aria-hidden="true"
                        className="text-accent-700 transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </NextLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- explore (navy) ---------------- */}
      <section aria-labelledby="about-explore-heading" className="bg-surface-inverse">
        <div className={`${MEASURE} py-16 md:py-24`}>
          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-12">
            <h2
              id="about-explore-heading"
              className="max-w-[28rem] font-serif text-[clamp(2rem,4vw,3rem)] leading-none tracking-[-0.025em] text-white"
            >
              {explore.heading}
            </h2>
            {/* 75% white, not Jamshedpur's 50% — 50% fails contrast on the navy. */}
            <p className="text-base leading-[1.75] text-white/75 md:text-lg">{explore.body}</p>
          </div>

          <ul className="mt-12 grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 md:mt-14 lg:grid-cols-3">
            {explore.cards.map((card) => (
              <li key={card.id}>
                <NextLink href={card.href} className="group block">
                  <span className="relative block aspect-[16/9] overflow-hidden rounded-[5px]">
                    <Image
                      src={card.image.src}
                      alt={card.image.alt}
                      fill
                      sizes="(min-width: 1024px) 380px, (min-width: 640px) 46vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-in-out motion-safe:group-hover:scale-[1.15]"
                    />
                  </span>
                  <span className="mt-4 flex items-baseline gap-5 text-xl font-medium text-white transition-colors group-hover:text-accent-surface md:text-[1.3rem]">
                    {card.label}
                    <ArrowRightIcon
                      size={16}
                      aria-hidden="true"
                      className="-rotate-45 transition-transform duration-300 group-hover:rotate-0"
                    />
                  </span>
                </NextLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- campus & links ---------------- */}
      <section aria-labelledby="about-campus-heading" className="bg-surface">
        <div className={`${MEASURE} py-16 md:py-24`}>
          {/*
            Text left, photograph and links right. With the photo above the text
            on the left, that column ran twice the height of the four links and
            left the right half of the section empty; split this way the two
            columns end within a few lines of each other.
          */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14 lg:gap-20">
            <div>
              <h2
                id="about-campus-heading"
                className="font-serif text-[clamp(1.875rem,3.4vw,2.625rem)] leading-[1.05] tracking-[-0.025em] text-ink-strong"
              >
                {campus.heading}
              </h2>
              <div className="mt-6 space-y-4 text-[0.9375rem] leading-[1.8] text-ink md:text-justify md:hyphens-auto">
                {campus.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div>
              <div className="relative aspect-[16/9] overflow-hidden rounded-[5px]">
                <Image
                  src={campus.image.src}
                  alt={campus.image.alt}
                  fill
                  sizes="(min-width: 1280px) 650px, (min-width: 768px) 55vw, 100vw"
                  className="object-cover"
                />
              </div>

              <nav aria-label="More about XLRI Delhi-NCR" className="mt-8">
                <ul className="border-t border-border-strong/60">
                  {campus.links.map((link) => (
                    <li key={link.id} className="border-b border-border-strong/60">
                      <NextLink
                        href={link.href}
                        className="group flex items-center justify-between gap-6 py-5 md:py-6"
                      >
                        <span className="font-serif text-xl text-ink-strong transition-[color,translate] duration-300 ease-out group-hover:text-brand group-focus-visible:text-brand motion-safe:group-hover:translate-x-1.5 md:text-[1.5625rem]">
                          {link.label}
                        </span>
                        <span
                          aria-hidden="true"
                          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand text-white transition-[background-color,color,scale,box-shadow] duration-300 ease-out group-hover:bg-accent-surface group-hover:text-brand-950 group-hover:shadow-raised group-focus-visible:bg-accent-surface group-focus-visible:text-brand-950 motion-safe:group-hover:scale-110 md:size-12"
                        >
                          <ArrowRightIcon
                            size={16}
                            className="-rotate-45 transition-transform duration-300 group-hover:rotate-0 group-focus-visible:rotate-0"
                          />
                        </span>
                      </NextLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
