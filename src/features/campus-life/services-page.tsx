import Link from 'next/link';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import {
  ArrowRightIcon,
  BallIcon,
  BusIcon,
  CoffeeIcon,
  CompassIcon,
  DumbbellIcon,
  GamepadIcon,
  LandmarkIcon,
  MapPinIcon,
  PlayIcon,
  ScissorsIcon,
  UsersIcon,
  UtensilsIcon,
  type IconProps,
} from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import type { CampusServicesPage, ServiceIcon } from '@/types/campus-services';

import { RelatedLinks } from './campus-blocks';
import { ServiceGallery } from './service-gallery';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';
const H2 =
  'font-serif text-[clamp(1.875rem,3.4vw,2.75rem)] leading-tight tracking-[-0.02em] text-ink-strong';
/** A slow lift with a soft shadow — the cards' shared hover, as on the Team page. */
const LIFT =
  'transition-[translate,box-shadow,border-color] duration-500 ease-out hover:border-accent-surface hover:shadow-raised motion-safe:hover:-translate-y-1';
const EYEBROW = 'text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase';
const delay = (ms: number) => ({ ['--rise-delay' as string]: `${ms}ms` });
const pad = (n: number) => String(n).padStart(2, '0');

const ICONS: Record<ServiceIcon, (props: IconProps) => React.JSX.Element> = {
  dumbbell: DumbbellIcon,
  bank: LandmarkIcon,
  bus: BusIcon,
  scissors: ScissorsIcon,
  gamepad: GamepadIcon,
  ball: BallIcon,
  users: UsersIcon,
  utensils: UtensilsIcon,
  coffee: CoffeeIcon,
};

/**
 * A Campus Life page of services or facilities, one section each — Mobility
 * Within Campus, Sports & Recreation.
 *
 *  1. **Hero** — the title, a line of introduction and three figures, then
 *     every service as a card that jumps to its section.
 *  2. **One section per service**, alternating grey and white and swapping
 *     sides: the photos as a small gallery (`ServiceGallery`), and beside them
 *     the number, kind, name, description and, where the source gives one,
 *     the location.
 *  3. **Campus Tour** — a closing link to the video tour.
 *
 * Motion is light and slow: the hero rises in, sections reveal as they scroll
 * into view, cards lift with a lime bar, photos cross-fade. None of it plays
 * under `prefers-reduced-motion`.
 *
 * Content comes from `content/campus-life/mobility-within-campus.json`; the
 * photos are in `public/media/campus-life/mobility/`.
 */
export function CampusServices({ content }: { content: CampusServicesPage }) {
  return (
    <article aria-labelledby="mobility-heading">
      {/* ---------------- hero ---------------- */}
      <section data-motif="hero" className="relative isolate overflow-hidden bg-surface">
        <div className={`${MEASURE} pt-8 pb-14 md:pt-10 md:pb-20`}>
          <Breadcrumbs
            items={[
              { label: 'Home', href: routes.home },
              { label: 'Campus Life' },
              { label: content.title },
            ]}
          />

          <div className="mt-8 grid grid-cols-1 items-end gap-10 md:mt-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <p className={`flex items-center gap-2.5 ${EYEBROW}`}>
                <CompassIcon size={18} aria-hidden="true" />
                {content.eyebrow}
              </p>
              <h1
                id="mobility-heading"
                className="mt-3 font-serif text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.03] tracking-[-0.03em] text-balance text-brand"
              >
                {content.title}
              </h1>
              <span
                aria-hidden="true"
                className="rule-draw mt-6 block h-[3px] w-14 origin-left bg-accent-surface"
              />
              <p
                className="rise-in mt-6 max-w-xl text-lg leading-[1.75] text-ink md:text-[1.1875rem]"
                style={delay(150)}
              >
                {content.intro}
              </p>
            </div>

            {content.facts.length > 0 ? (
              <dl
                className="rise-in grid grid-cols-3 overflow-hidden rounded-[8px] border border-border"
                style={delay(200)}
              >
                {content.facts.map((fact, index) => (
                  // Label first in the DOM (a <dt> must precede its <dd>), figure
                  // first on screen.
                  <div
                    key={fact.label}
                    className={`group relative flex flex-col-reverse justify-end bg-surface-subtle px-4 py-5 transition-colors duration-500 hover:bg-surface sm:px-6 sm:py-6 ${index > 0 ? 'border-l border-border' : ''}`}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent-surface transition-transform duration-700 ease-out group-hover:scale-x-100"
                    />
                    <dt className="mt-2 text-sm leading-snug text-ink-muted">{fact.label}</dt>
                    <dd className="font-serif text-[clamp(1.375rem,2.2vw,2.5rem)] leading-none whitespace-nowrap text-brand">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>

          {/* Every service, as a way into its section. */}
          <nav aria-label="On this page" className="rise-in mt-12" style={delay(320)}>
            <ul
              className={`grid grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-4 ${content.services.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-5'}`}
            >
              {content.services.map((service, index) => {
                const Icon = ICONS[service.icon];
                return (
                  <li key={service.id}>
                    <a
                      href={`#${service.id}`}
                      className={`group relative flex h-full items-center gap-4 overflow-hidden rounded-[8px] border border-border bg-surface px-5 py-4 lg:flex-col lg:items-start lg:gap-5 lg:py-5 ${LIFT}`}
                    >
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent-surface transition-transform duration-700 ease-out group-hover:scale-x-100"
                      />
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand transition-colors duration-500 group-hover:bg-accent-surface group-hover:text-brand-950">
                        <Icon size={20} aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs font-semibold tracking-[0.16em] text-ink-muted uppercase tabular-nums">
                          {pad(index + 1)} · {service.category}
                        </span>
                        <span className="mt-1 block font-semibold text-ink-strong transition-colors duration-300 group-hover:text-brand">
                          {service.title}
                        </span>
                      </span>
                      <ArrowRightIcon
                        size={16}
                        aria-hidden="true"
                        className="shrink-0 rotate-90 text-accent-700 transition-transform duration-500 group-hover:translate-y-0.5 lg:absolute lg:top-5 lg:right-5"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </section>

      {/* ---------------- one section per service ---------------- */}
      {content.services.map((service, index) => {
        const Icon = ICONS[service.icon];
        const flip = index % 2 === 1;
        return (
          <section
            key={service.id}
            id={service.id}
            aria-labelledby={`${service.id}-heading`}
            className={flip ? 'bg-surface' : 'bg-surface-subtle'}
          >
            <div
              className={`${MEASURE} grid grid-cols-1 items-center gap-10 py-16 md:py-20 lg:grid-cols-2 lg:gap-16 lg:py-24`}
            >
              <div className={`reveal ${flip ? 'lg:order-2' : ''}`}>
                <ServiceGallery
                  photos={service.photos}
                  title={service.title}
                  preload={index === 0}
                  corner={flip ? 'right' : 'left'}
                />
              </div>

              <div className={`reveal ${flip ? 'lg:order-1' : ''}`}>
                <p
                  aria-hidden="true"
                  className="font-serif text-[clamp(3.5rem,7vw,5.5rem)] leading-none tracking-[-0.04em] text-brand/10"
                >
                  {pad(index + 1)}
                </p>
                <p className={`mt-2 flex items-center gap-2.5 ${EYEBROW}`}>
                  <Icon size={18} aria-hidden="true" />
                  {service.category}
                </p>
                <h2 id={`${service.id}-heading`} className={`mt-3 ${H2}`}>
                  {service.title}
                </h2>
                <span aria-hidden="true" className="mt-5 block h-[3px] w-10 bg-accent-surface" />
                <p className="mt-6 max-w-xl text-lg leading-[1.75] text-ink">
                  {service.description}
                </p>
                {service.location ? (
                  <p className="mt-7 flex max-w-xl items-start gap-3 rounded-[8px] border border-border bg-surface px-5 py-4 text-[0.9375rem] leading-relaxed text-ink">
                    <MapPinIcon
                      size={18}
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-accent-700"
                    />
                    <span>
                      <span className="sr-only">Location: </span>
                      {service.location}
                    </span>
                  </p>
                ) : null}
              </div>
            </div>
          </section>
        );
      })}

      {/* ---------------- campus tour ---------------- */}
      <section
        aria-labelledby="tour-link-heading"
        className={content.services.length % 2 === 1 ? 'bg-surface' : 'bg-surface-subtle'}
      >
        <div className={`${MEASURE} py-16 md:py-20`}>
          <Link
            href={routes.campusLife.campusTour}
            className={`group reveal relative flex flex-col gap-6 overflow-hidden rounded-[8px] border border-border bg-brand-50 p-7 sm:flex-row sm:items-center md:p-10 ${LIFT}`}
          >
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-accent-surface transition-transform duration-700 ease-out group-hover:scale-y-100"
            />
            <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-accent-surface text-brand-950 shadow-raised ring-8 ring-white/70 transition-transform duration-500 ease-out motion-safe:group-hover:scale-110">
              <PlayIcon size={22} aria-hidden="true" className="translate-x-0.5" />
            </span>
            <span className="flex-1">
              <span className={`block ${EYEBROW}`}>{content.tourLink.eyebrow}</span>
              <span
                id="tour-link-heading"
                className="mt-2 block font-serif text-[clamp(1.5rem,2.6vw,2rem)] leading-tight text-ink-strong"
              >
                {content.tourLink.title}
              </span>
            </span>
            <ArrowRightIcon
              size={22}
              aria-hidden="true"
              className="shrink-0 text-brand transition-transform duration-500 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>

      {content.related && content.relatedHeading ? (
        <RelatedLinks heading={content.relatedHeading} links={content.related} />
      ) : null}
    </article>
  );
}
