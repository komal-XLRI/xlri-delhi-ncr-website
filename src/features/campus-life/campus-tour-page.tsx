import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { CompassIcon } from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import type { CampusTourPage } from '@/types/campus-tour';

import { CampusTourPlayer } from './campus-tour-player';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';

/**
 * Campus Life › Campus Tour — 22 short videos of the Delhi-NCR campus.
 *
 * The heading block matches the other pages (breadcrumbs, eyebrow, title,
 * lime rule, one line of introduction); everything below it is the player
 * (`CampusTourPlayer`): the current stop large, where you are in the tour,
 * and every stop as a card grouped by part of the campus.
 *
 * Content comes from `content/campus-life/campus-tour.json`; the posters are
 * self-hosted copies of each video's thumbnail in `public/media/campus-tour/`.
 */
export function CampusTour({ content }: { content: CampusTourPage }) {
  return (
    <article
      aria-labelledby="tour-heading"
      data-motif="hero"
      className="relative isolate overflow-clip bg-surface"
    >
      <div className={`${MEASURE} pt-8 pb-16 md:pt-10 md:pb-24`}>
        <Breadcrumbs
          items={[
            { label: 'Home', href: routes.home },
            { label: 'Campus Life' },
            { label: content.title },
          ]}
        />

        <div className="mt-8 max-w-3xl md:mt-10">
          <p className="flex items-center gap-2.5 text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase">
            <CompassIcon size={18} aria-hidden="true" />
            {content.eyebrow}
          </p>
          <h1
            id="tour-heading"
            className="mt-3 font-serif text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.03] tracking-[-0.03em] text-brand"
          >
            {content.title}
          </h1>
          <span
            aria-hidden="true"
            className="rule-draw mt-6 block h-[3px] w-14 origin-left bg-accent-surface"
          />
          <p
            className="rise-in mt-6 text-lg leading-[1.75] text-ink md:text-[1.1875rem]"
            style={{ ['--rise-delay' as string]: '150ms' }}
          >
            {content.intro}
          </p>
        </div>

        <div className="rise-in mt-10 md:mt-12" style={{ ['--rise-delay' as string]: '250ms' }}>
          <CampusTourPlayer
            areas={content.areas}
            channel={content.channel}
            labels={content.labels}
          />
        </div>
      </div>
    </article>
  );
}
