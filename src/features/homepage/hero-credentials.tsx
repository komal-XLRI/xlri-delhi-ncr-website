import NextLink from 'next/link';

import {
  AwardIcon,
  BriefcaseIcon,
  GlobeIcon,
  LandmarkIcon,
  MapPinIcon,
  SealIcon,
  type IconProps,
} from '@/components/ui/icon';
import type { CredentialIcon, HeroCredential } from '@/types/homepage';

/**
 * Name-to-drawing map. The content layer stores a string, not a component —
 * it becomes a CMS collection in Phase 6, and a database cannot hold JSX.
 */
const ICONS: Record<CredentialIcon, (props: IconProps) => React.ReactElement> = {
  landmark: LandmarkIcon,
  award: AwardIcon,
  seal: SealIcon,
  briefcase: BriefcaseIcon,
  'map-pin': MapPinIcon,
  globe: GlobeIcon,
};

/**
 * The credentials strip that straddles the foot of the hero.
 *
 * Six proof points, immediately below the promise the headline makes — the most
 * useful idea in the reference design, which puts substance directly under the
 * claim instead of making a visitor scroll for it.
 *
 * ## One band, not six floating cards
 *
 * The reference renders each credential as a separate white card with a drop
 * shadow and a coloured circular icon. That is the most recognisable template
 * pattern on the web, and §10 rules it out by name. One surface divided by
 * hairlines does the same job and reads as a considered table of facts — six
 * shadowed rectangles are six objects for the eye to parse, a divided band is
 * one.
 *
 * ## Icons that mark a category, not icons that decorate
 *
 * Line drawings in the accent's dark tint, never glyphs in filled colour circles
 * — §10 rules that pattern out by name, and it is the single clearest tell of a
 * template.
 *
 * They earn their place because this strip is *scanned*, not read: six adjacent
 * cells of similar-looking text are hard to navigate, and a distinct mark per
 * cell gives the eye something to aim at. They are `aria-hidden`, since the
 * figure and its label already say everything — an icon announced as "landmark"
 * before "1949, founded" would be noise.
 *
 * ## Each cell goes somewhere
 *
 * A credential that states a fact and offers nowhere to check it is an
 * assertion. Linked, it is evidence — and it turns a decorative band into six
 * genuine routes into the site, at the point where a visitor is deciding
 * whether to believe the headline.
 *
 * ## Layout
 *
 * Two columns on a phone, three on a tablet, six on a wide screen. Six divides
 * evenly into all three, so no arrangement leaves a ragged final row. An earlier
 * version scrolled horizontally on small screens, which hid half the content
 * behind a gesture nothing signalled.
 *
 * A Server Component. No client JavaScript.
 */
export function HeroCredentials({ items }: { items: readonly HeroCredential[] }) {
  if (items.length === 0) return null;

  return (
    <div className="relative z-10 -mt-14 mb-4 lg:-mt-20">
      <div className="mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12">
        {/*
          A description list: each figure is a term and its meaning the
          description. That pairing is what stops "1949" being announced as a
          bare number with no context.
        */}
        <dl
          aria-label="XLRI Delhi-NCR at a glance"
          className="grid grid-cols-2 overflow-hidden rounded-sm border border-border bg-surface shadow-raised md:grid-cols-3 xl:grid-cols-6"
        >
          {items.map((item, index) => {
            const Icon = item.icon ? ICONS[item.icon] : null;
            const body = (
              <>
                <span className="mb-5 flex items-center gap-3">
                  {Icon ? (
                    // accent-ink, not the raw accent: the brand green measures
                    // 1.74:1 on white and cannot carry a UI mark. Its darkened
                    // sibling reaches 5.83:1, comfortably past the 3:1 floor for
                    // non-text contrast.
                    <Icon size={22} className="shrink-0 text-accent-ink" aria-hidden="true" />
                  ) : null}
                  <span
                    aria-hidden="true"
                    className="block h-[3px] w-7 bg-accent-surface transition-[width] duration-300 group-hover:w-10"
                  />
                </span>
                <dt className="font-serif text-[1.75rem] leading-none text-ink-strong tabular-nums transition-colors group-hover:text-brand">
                  {item.value}
                </dt>
                <dd className="mt-2 text-sm leading-snug text-ink-muted">
                  {item.label}
                  {item.source ? (
                    <span className="mt-1.5 block text-2xs text-ink-muted/70">{item.source}</span>
                  ) : null}
                </dd>
              </>
            );

            /*
              Hairlines between cells, never around them, so the band reads as
              one object with internal divisions. Each grid arrangement needs
              its own first-in-row exception, and rows after the first need a
              top rule — hence the arithmetic rather than a blanket border.
            */
            const cell = [
              'group relative flex h-full flex-col px-6 py-7',
              'border-border border-l border-t',
              index % 2 === 0 ? 'border-l-0' : '',
              index < 2 ? 'border-t-0' : '',
              index % 3 === 0 ? 'md:border-l-0' : 'md:border-l',
              index < 3 ? 'md:border-t-0' : 'md:border-t',
              index % 6 === 0 ? 'xl:border-l-0' : 'xl:border-l',
              'xl:border-t-0',
              item.href ? 'hover:bg-surface-subtle transition-colors' : '',
            ].join(' ');

            return item.href ? (
              <NextLink key={item.id} href={item.href} className={cell}>
                {body}
              </NextLink>
            ) : (
              <div key={item.id} className={cell}>
                {body}
              </div>
            );
          })}
        </dl>
      </div>
    </div>
  );
}
