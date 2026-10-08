import Image from 'next/image';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ArrowRightIcon } from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import { EmdpExplorer } from '@/features/executive-education/emdp-explorer';
import type { EmdpPage as EmdpContent } from '@/types/emdp';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';

const delay = (ms: number) => ({ ['--enter-delay' as string]: `${String(ms)}ms` });

/** Fan positions for the three hero posters: back, middle, front. */
const FAN = [
  'rotate-[-8deg] -translate-x-[9%] translate-y-[5%] group-hover:rotate-[-12deg] group-hover:-translate-x-[16%]',
  'rotate-[5deg] translate-x-[8%] -translate-y-[4%] group-hover:rotate-[9deg] group-hover:translate-x-[15%]',
  'rotate-0 group-hover:-translate-y-[6%]',
];

/**
 * Executive Education › EMDP.
 *
 * ## The model
 *
 * The Delhi page is an introduction and two lists of programme posters. The
 * design gives that more voice in the brand's own palette:
 *
 *  1. **Hero** (navy, with brand-blue and accent-green light drifting behind
 *     it) — "EMDP" large in a white-to-green gradient, the expansion, the
 *     introduction, and the live counts. On the right, three upcoming posters
 *     fanned like cards, which spread on hover.
 *  2. **Offerings** — the introduction's three kinds of programme, as three
 *     numbered tiles.
 *  3. **Programmes** — upcoming and on-going as tabs with a sliding pill.
 *     Upcoming programmes are larger and marked "Admissions open"; each card
 *     lifts on hover, draws a brand-to-accent rule across its top, and puts
 *     Apply and Know More where the eye lands.
 *
 * Motion plays on load or on interaction, never on scroll (the client asked
 * for no scroll reveals outside the homepage), and all of it stops under
 * `prefers-reduced-motion`. See `.enter` and `.drift` in styles/base.css.
 */
export function EmdpPage({ content }: { content: EmdpContent }) {
  const upcoming = content.programmes.filter((p) => p.status === 'upcoming');
  const ongoing = content.programmes.length - upcoming.length;
  const fan = upcoming.slice(0, 3).reverse();

  return (
    <article aria-labelledby="emdp-heading">
      {/* ---------------- hero ---------------- */}
      <section className="relative isolate overflow-hidden bg-brand-950 text-ink-inverse">
        {/* Ambient light: two blurred discs in the brand colours, drifting. */}
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
              { label: content.title },
            ]}
          />

          <div className="mt-10 grid grid-cols-1 items-center gap-14 md:mt-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            <div>
              <p
                className="enter text-sm font-semibold tracking-[0.18em] text-accent-surface uppercase"
                style={delay(0)}
              >
                {content.eyebrow}
              </p>
              <h1
                id="emdp-heading"
                className="enter mt-4 font-serif leading-none tracking-[-0.04em]"
                style={delay(90)}
              >
                <span className="block bg-gradient-to-r from-white via-white to-accent-surface bg-clip-text text-[clamp(4rem,11vw,7.5rem)] text-transparent">
                  {content.title}
                </span>
                <span className="mt-3 block text-[clamp(1.375rem,2.6vw,2rem)] leading-tight tracking-[-0.02em] text-white">
                  {content.expansion}
                </span>
              </h1>
              <p
                className="enter mt-7 max-w-[38rem] text-base leading-[1.85] text-white/80 md:text-lg"
                style={delay(180)}
              >
                {content.intro}
              </p>

              <div className="enter mt-9 flex flex-wrap items-center gap-4" style={delay(270)}>
                <a
                  href="#programmes"
                  className="group inline-flex items-center gap-3 rounded-full bg-accent-surface py-2.5 pr-5 pl-2.5 text-[0.9375rem] font-semibold text-brand-950 transition-colors duration-200 hover:bg-white"
                >
                  <span className="flex size-8 items-center justify-center rounded-full bg-brand-950 text-accent-surface">
                    <ArrowRightIcon
                      size={15}
                      aria-hidden="true"
                      className="rotate-90 transition-transform duration-200 group-hover:translate-y-0.5"
                    />
                  </span>
                  Explore programmes
                </a>
                <p className="flex items-center gap-4 text-sm text-white/75">
                  <span>
                    <span className="font-serif text-2xl text-white">{upcoming.length}</span>{' '}
                    upcoming
                  </span>
                  <span aria-hidden="true" className="h-6 w-px bg-white/25" />
                  <span>
                    <span className="font-serif text-2xl text-white">{ongoing}</span> on-going
                  </span>
                </p>
              </div>
            </div>

            {/* The poster fan. Decorative: every poster is in the list below. */}
            <div
              aria-hidden="true"
              className="enter group relative mx-auto hidden aspect-[861/520] w-[78%] max-w-[28rem] sm:block lg:mr-[6%]"
              style={delay(200)}
            >
              {fan.map((programme, i) => (
                <div
                  key={programme.id}
                  className={`absolute inset-0 overflow-hidden rounded-[10px] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/20 transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${FAN[i] ?? ''}`}
                >
                  <Image
                    src={programme.poster.src}
                    width={programme.poster.width}
                    height={programme.poster.height}
                    alt=""
                    preload={i === fan.length - 1}
                    sizes="480px"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- offerings ---------------- */}
      <section aria-label="What the programmes offer" className="bg-surface">
        <div className={`${MEASURE} -mt-8 pb-4 md:-mt-12`}>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
            {content.offerings.map((offering, i) => (
              <li
                key={offering.id}
                className="enter group relative overflow-hidden rounded-[10px] border border-border bg-surface p-6 shadow-raised transition-colors duration-300 hover:border-brand md:p-7"
                style={delay(320 + i * 90)}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand to-accent-surface"
                />
                <span
                  aria-hidden="true"
                  className="font-serif text-4xl leading-none text-brand/15 transition-colors duration-300 group-hover:text-accent-surface"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="mt-3 font-serif text-xl text-ink-strong md:text-2xl">
                  {offering.title}
                </h2>
                <p className="mt-2 text-[0.9375rem] leading-[1.7] text-ink">{offering.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- programmes ---------------- */}
      <section
        id="programmes"
        aria-labelledby="programmes-heading"
        className="scroll-mt-40 bg-surface"
      >
        <div className={`${MEASURE} py-14 md:py-20`}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase">
                Programmes
              </p>
              <h2
                id="programmes-heading"
                className="mt-2 font-serif text-[clamp(1.75rem,3.2vw,2.5rem)] leading-tight tracking-[-0.02em] text-ink-strong"
              >
                Find your programme
              </h2>
            </div>
          </div>
          <div className="mt-8">
            <EmdpExplorer programmes={content.programmes} />
          </div>
        </div>
      </section>
    </article>
  );
}
