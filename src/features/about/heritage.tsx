import Image from 'next/image';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { routes } from '@/constants/routes';
import { HeritageFilm } from '@/features/about/heritage-film';
import { HeritageTimeline } from '@/features/about/heritage-timeline';
import type { Heritage } from '@/types/heritage';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';
// Justified from `md` up only: on a phone-width measure justification opens
// visible rivers between words, and ragged-right reads better there.
const PROSE =
  'space-y-5 md:text-justify md:hyphens-auto text-base leading-[1.85] text-ink md:text-[1.0625rem]';

/**
 * "Heritage".
 *
 * ## The model
 *
 * The Jamshedpur page (xlri.ac.in/about/heritage), with Delhi-NCR's text:
 *
 *  1. **Founding** — title and the founding story on the left; Fr. Quinn
 *     Enright's portrait, name and role on the right. The portrait zooms
 *     slightly on hover, as there.
 *  2. **Film** — full width, poster with a round Play button.
 *  3. **Story** — the body copy in two columns.
 *  4. **XL Journey** — a navy band with a rail of years and one milestone at a
 *     time.
 *
 * ## What comes from the Delhi page
 *
 * Beyond the words, one device: the founding story sits in Delhi's callout — a
 * thick green rule down the left and a soft shadow — with the one-line fact
 * ("founded in 1949…") set in bold at its head, as Delhi sets it. It is the
 * most important sentence on the page and the only one that gets a box.
 *
 * Jamshedpur hides part of the second column behind "Read More". Not here: the
 * page is short enough to read whole, and text a visitor has to click to reveal
 * is text most of them never see.
 *
 * A Server Component; only the film and the timeline hydrate.
 */
export function HeritagePage({ content }: { content: Heritage }) {
  const { founding, founder, film, story, timeline } = content;

  return (
    <article aria-labelledby="heritage-heading">
      {/* ---------------- founding ---------------- */}
      <section className="bg-surface">
        <div className={`${MEASURE} pt-10 pb-12 md:pt-14 md:pb-16`}>
          <Breadcrumbs
            items={[
              { label: 'Home', href: routes.home },
              { label: 'About', href: routes.about.index },
              { label: content.title },
            ]}
          />

          <div className="mt-8 grid grid-cols-1 gap-10 xl:grid-cols-2 xl:gap-0">
            <div className="xl:pr-20">
              <h1
                id="heritage-heading"
                className="font-serif text-[clamp(2.25rem,4.4vw,3.25rem)] leading-[1.05] tracking-[-0.035em] text-brand"
              >
                {content.title}
              </h1>

              {/* Delhi's callout: green rule, soft shadow. */}
              <div className="mt-8 border-l-[5px] border-accent-surface bg-surface p-6 shadow-[0_10px_30px_rgb(0_0_0/0.08)] md:mt-10 md:p-7">
                <p className="text-lg leading-snug font-semibold text-ink-strong">
                  {founding.lead}
                </p>
                <p className="mt-4 text-base leading-[1.85] text-ink md:text-[1.0625rem]">
                  {founding.body}
                </p>
              </div>
            </div>

            <figure className="group xl:pt-[4.75rem]">
              <div className="overflow-hidden rounded-[5px] bg-black">
                <Image
                  src={founder.portrait.src}
                  width={founder.portrait.width}
                  height={founder.portrait.height}
                  alt={founder.portrait.alt}
                  // Above the fold — the LCP element. `preload` replaces the
                  // deprecated `priority` in Next 16.
                  preload
                  sizes="(min-width: 1280px) 592px, 100vw"
                  className="w-full transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.04]"
                />
              </div>
              <figcaption className="mt-4">
                <span className="block font-serif text-xl text-ink-strong md:text-2xl">
                  {founder.name}
                </span>
                <span className="mt-1 block font-semibold text-ink-muted">{founder.role}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ---------------- film + story ---------------- */}
      <section aria-label="The XLRI story" className="bg-surface">
        <div className={`${MEASURE} pb-16 md:pb-24`}>
          <HeritageFilm film={film} />

          <div className="mt-10 grid grid-cols-1 gap-5 md:mt-14 xl:grid-cols-2 xl:gap-28">
            <div className={PROSE}>
              {story.left.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
            <div className={PROSE}>
              {story.right.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- XL Journey ---------------- */}
      <section
        aria-labelledby="journey-heading"
        className="bg-surface-inverse py-14 text-ink-inverse md:py-24"
      >
        <div className={MEASURE}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold tracking-[0.2em] text-accent-surface uppercase">
              {timeline.eyebrow}
            </p>
            <h2
              id="journey-heading"
              className="mt-3 font-serif text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.05] tracking-[-0.03em] text-white"
            >
              {timeline.heading}
            </h2>
            <p className="mt-6 text-base leading-[1.85] text-white/85 md:text-[1.0625rem]">
              {timeline.intro}
            </p>
          </div>

          <div className="mt-12 md:mt-16">
            <HeritageTimeline entries={timeline.entries} />
          </div>
        </div>
      </section>
    </article>
  );
}
