import Image from 'next/image';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { routes } from '@/constants/routes';
import { ValuesTabs } from '@/features/about/values-tabs';
import type { VisionMission } from '@/types/vision-mission';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';

/** Vision and Mission headings — Jamshedpur sets these heavy at ~35px. */
const STATEMENT_HEADING = 'font-serif text-[1.75rem] leading-tight text-ink-strong md:text-[2rem]';

/**
 * "Vision & Mission".
 *
 * ## The model
 *
 * A port of the XLRI Jamshedpur page (xlri.ac.in/about/vision-mission), with the
 * Delhi-NCR text and photographs:
 *
 *  1. **Statement** — two halves. The title and a campus photograph on the
 *     left (it zooms slightly on hover, as there), Vision and the Mission list
 *     on the right.
 *  2. **Our Values** — a navy band. On desktop, a vertical list of values with
 *     the selected one's photograph beside it; below `lg`, an accordion.
 *  3. **PEOs** — Delhi publishes its Program Education Objectives on this page
 *     and Jamshedpur does not, so they close the page in a plain row of three,
 *     in the same type as the Mission list.
 *
 * The h1 is the tagline, as on Jamshedpur; the page's own name stays in the
 * breadcrumb and the `<title>`.
 *
 * ## Matched column heights
 *
 * On Jamshedpur the photograph's bottom edge lines up with the last Mission
 * point, so the two halves end together. At `xl` the left column is a flex
 * column in a stretched grid row and the photo frame takes `flex-1`, so it
 * grows or shrinks to whatever height the Vision and Mission text needs — no
 * fixed aspect ratio that would drift out of line when the copy changes. The
 * `min-h` keeps it a photograph if that text is ever very short. Below `xl` the
 * columns stack and the frame falls back to a 3:2 ratio.
 *
 * A Server Component; only the desktop values tabs hydrate.
 */
export function VisionMissionPage({ content }: { content: VisionMission }) {
  const { vision, mission, values, objectives } = content;

  return (
    <article aria-labelledby="vision-mission-heading">
      {/* ---------------- statement ---------------- */}
      <section className="bg-surface">
        <div className={`${MEASURE} pt-10 pb-16 md:pt-14 md:pb-24`}>
          <Breadcrumbs
            items={[
              { label: 'Home', href: routes.home },
              { label: 'About', href: routes.about.index },
              { label: content.title },
            ]}
          />

          <div className="mt-8 grid grid-cols-1 gap-12 xl:grid-cols-2 xl:gap-0">
            <div className="flex flex-col xl:pr-12">
              {/*
                Two lines at `xl`, as on Jamshedpur. The column is a fixed 544px
                from 1280px up (the measure caps there), and "Nurturing
                responsible global" only fits it at about 38px in this serif —
                hence a fixed size rather than the fluid clamp, which overshoots
                to three lines. `text-balance` splits the two lines evenly.
              */}
              <h1
                id="vision-mission-heading"
                className="font-serif text-[clamp(2rem,3.6vw,3rem)] leading-[1.12] tracking-[-0.03em] text-balance text-brand xl:text-[2.375rem]"
              >
                {content.headline}
              </h1>
              <div className="group relative mt-8 aspect-[3/2] overflow-hidden rounded-[5px] md:mt-10 xl:aspect-auto xl:min-h-[18rem] xl:flex-1">
                <Image
                  src={content.heroImage.src}
                  alt={content.heroImage.alt}
                  fill
                  // Above the fold — the LCP element. `preload` replaces the
                  // deprecated `priority` in Next 16.
                  preload
                  sizes="(min-width: 1280px) 580px, (min-width: 768px) 90vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.04]"
                />
              </div>
            </div>

            <div className="xl:pl-24">
              <section aria-labelledby="vision-heading">
                <h2 id="vision-heading" className={STATEMENT_HEADING}>
                  {vision.heading}
                </h2>
                <p className="mt-4 text-lg leading-[1.75] text-ink md:mt-5">{vision.body}</p>
              </section>

              <section aria-labelledby="mission-heading" className="mt-10 md:mt-12">
                <h2 id="mission-heading" className={STATEMENT_HEADING}>
                  {mission.heading}
                </h2>
                <ul className="mt-4 space-y-4 md:mt-5">
                  {mission.points.map((point) => (
                    <li
                      key={point}
                      className="relative pl-8 text-base leading-relaxed text-ink md:text-[1.0625rem]"
                    >
                      {/* Decorative bullet — the brand's green, as Jamshedpur's is. */}
                      <span
                        aria-hidden="true"
                        className="absolute top-[0.55em] left-0 size-[13px] rounded-[3px] border-[3px] border-accent-surface"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- our values ---------------- */}
      <section aria-labelledby="values-heading" className="bg-surface-inverse text-ink-inverse">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <h2
            id="values-heading"
            className="font-serif text-[clamp(2rem,4.4vw,3.25rem)] leading-[1.05] tracking-[-0.03em] text-white"
          >
            {values.heading}
          </h2>
          <p className="mt-5 mb-10 text-lg text-white/85 md:mb-12">{values.intro}</p>

          <div className="hidden lg:block">
            <ValuesTabs values={values.items} />
          </div>

          {/*
            Below `lg`, an accordion. Native `<details>` sharing a `name`, so
            only one is open at a time — the same exclusive behaviour as the
            tabs — with no JavaScript.
          */}
          <div className="lg:hidden">
            {values.items.map((value, index) => (
              <details
                key={value.id}
                name="our-values"
                {...(index === 0 ? { open: true } : {})}
                className="group border-b border-white/15"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-xl font-medium text-white/60 transition-colors group-open:text-white hover:text-white [&::-webkit-details-marker]:hidden">
                  <span>{value.title}</span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-2xl leading-none text-accent-surface transition-transform duration-150 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <div className="pb-6">
                  <Image
                    src={value.image.src}
                    width={value.image.width}
                    height={value.image.height}
                    alt={value.image.alt}
                    sizes="(min-width: 768px) 90vw, 100vw"
                    className="aspect-[3/2] w-full rounded-[10px] object-cover"
                  />
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- PEOs ---------------- */}
      <section aria-labelledby="peo-heading" className="bg-surface">
        <div className={`${MEASURE} py-16 md:py-24`}>
          <h2
            id="peo-heading"
            className="font-serif text-[clamp(1.75rem,3.2vw,2.5rem)] leading-tight tracking-[-0.02em] text-brand"
          >
            {objectives.heading}
          </h2>
          <ol className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {objectives.items.map((objective) => (
              <li
                key={objective.id}
                className="rounded-[5px] border border-t-[3px] border-border border-t-accent-surface bg-surface p-7"
              >
                <p className="font-serif text-xl text-ink-strong">{objective.label}</p>
                <p className="mt-3 text-base leading-relaxed text-ink">{objective.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </article>
  );
}
