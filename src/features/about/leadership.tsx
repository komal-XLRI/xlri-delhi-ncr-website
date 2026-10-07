import Image from 'next/image';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { routes } from '@/constants/routes';
import { CommitteeTabs } from '@/features/about/committee-tabs';
import type { Leadership } from '@/types/leadership';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';

/**
 * "Leadership & Administration".
 *
 * ## The model
 *
 * The Jamshedpur page (xlri.ac.in/about/leadership-administration), with
 * Delhi-NCR's people:
 *
 *  1. **Core Team** — portrait cards: photograph, name, role, and the slight
 *     zoom on hover used across these pages. Jamshedpur pins its Director in a
 *     row of their own above a long four-column grid; Delhi has three leaders,
 *     so they share one row — three equal columns across the full measure, not
 *     three of four, which left a quarter of the row empty and made the group
 *     look bunched to the left. The photographs are cropped square (from 3:4)
 *     toward the face so three full-width columns do not become a wall of
 *     500px-tall portraits, and the names fit on one line.
 *  2. **Councils & Committees** — Jamshedpur's underlined tab row, holding
 *     Delhi's 2025–26 listing, one tab per group (A–E). See
 *     `committee-tabs.tsx`.
 *
 * The cards are not links. Delhi's link to faculty profiles, which this site
 * does not have yet; a card that leads to a 404 is worse than one that leads
 * nowhere. Add the `href` when `/faculty/[slug]` exists.
 *
 * A Server Component; only the tabs hydrate.
 */
export function LeadershipPage({ content }: { content: Leadership }) {
  const { coreTeam, committees } = content;

  return (
    <article aria-labelledby="leadership-heading">
      {/* ---------------- core team ---------------- */}
      <section aria-labelledby="core-team-heading" className="bg-surface">
        <div className={`${MEASURE} pt-10 pb-14 md:pt-14 md:pb-20`}>
          <Breadcrumbs
            items={[
              { label: 'Home', href: routes.home },
              { label: 'About', href: routes.about.index },
              { label: content.title },
            ]}
          />

          <h1
            id="leadership-heading"
            className="mt-8 font-serif text-[clamp(2rem,4.4vw,3.25rem)] leading-[1.05] tracking-[-0.035em] text-brand"
          >
            {content.title}
          </h1>

          <h2
            id="core-team-heading"
            className="mt-10 font-serif text-2xl leading-tight text-ink-strong md:mt-12 md:text-[1.75rem]"
          >
            {coreTeam.heading}
          </h2>

          {/*
            Below `sm`, each leader is a compact row — small portrait left, name
            and role right — rather than three full-width photographs stacked
            into 1,500px of scrolling before the committees begin.
          */}
          <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-3 sm:gap-y-10 md:mt-8 lg:gap-x-10">
            {coreTeam.leaders.map((leader, index) => (
              <li
                key={leader.id}
                className="group grid grid-cols-[6.5rem_1fr] items-center gap-5 sm:block"
              >
                <div className="overflow-hidden rounded-[5px] bg-surface-subtle">
                  <Image
                    src={leader.portrait.src}
                    width={leader.portrait.width}
                    height={leader.portrait.height}
                    alt={`Portrait of ${leader.name}`}
                    // The first card is above the fold on every viewport.
                    {...(index === 0 ? { preload: true } : {})}
                    sizes="(min-width: 1280px) 370px, (min-width: 640px) 30vw, 104px"
                    className="aspect-square w-full object-cover object-[center_20%] transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.04]"
                  />
                </div>
                <div>
                  <p className="font-serif text-lg leading-tight text-ink-strong sm:mt-4 md:text-[1.375rem]">
                    {leader.name}
                  </p>
                  <p className="mt-1.5 text-sm font-medium text-ink-muted md:text-base">
                    {leader.role}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- councils & committees ---------------- */}
      <section aria-labelledby="committees-heading" className="bg-surface-subtle">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <h2
            id="committees-heading"
            className="font-serif text-[clamp(1.75rem,3.2vw,2.5rem)] leading-tight tracking-[-0.02em] text-ink-strong"
          >
            {committees.heading}
          </h2>
          <div className="mt-8 md:mt-10">
            <CommitteeTabs groups={committees.groups} />
          </div>
        </div>
      </section>
    </article>
  );
}
