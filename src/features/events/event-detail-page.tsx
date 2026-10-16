import Image from 'next/image';
import Link from 'next/link';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ArrowRightIcon, CalendarIcon } from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import type { EventDetailPage } from '@/types/events';

import { EventCard } from './event-card';
import { longDate } from './event-dates';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';
const delay = (ms: number) => ({ ['--rise-delay' as string]: `${ms}ms` });

/**
 * One event, at `/event/<slug>`. The live site's event pages carry only the
 * title, so this is the title, the date and the picture whole — never
 * cropped, since posters carry their own detail — with a way back to the list
 * and on to three more events.
 */
export function EventDetail({ content }: { content: EventDetailPage }) {
  const { copy, event, listing, more } = content;

  return (
    <article aria-labelledby="event-heading">
      <section data-motif="hero" className="relative isolate overflow-hidden bg-surface">
        <div className={`${MEASURE} pt-8 pb-16 md:pt-10 md:pb-20`}>
          <Breadcrumbs
            items={[
              { label: 'Home', href: routes.home },
              { label: listing.section },
              { label: listing.title, href: routes.events.index },
              { label: event.title },
            ]}
          />

          <div className="mt-8 grid grid-cols-1 items-center gap-10 md:mt-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <div>
              <p className="text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase">
                {copy.eyebrow}
              </p>
              <h1
                id="event-heading"
                className="mt-3 font-serif text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.08] tracking-[-0.03em] text-balance text-brand"
              >
                {event.title}
              </h1>
              <span
                aria-hidden="true"
                className="rule-draw mt-6 block h-[3px] w-14 origin-left bg-accent-surface"
              />
              <p
                className="rise-in mt-7 inline-flex items-center gap-3 rounded-[8px] border border-border bg-surface-subtle px-5 py-4"
                style={delay(150)}
              >
                <CalendarIcon size={20} aria-hidden="true" className="shrink-0 text-accent-700" />
                <time dateTime={event.dateTime} className="font-semibold text-ink-strong">
                  {longDate(event.dateTime)}
                </time>
              </p>
              <div className="rise-in mt-8" style={delay(250)}>
                <Link
                  href={routes.events.index}
                  className="group inline-flex items-center gap-3 rounded-full border border-border-strong py-2.5 pr-6 pl-2.5 text-[0.9375rem] font-semibold text-ink-strong transition-colors duration-300 hover:border-brand hover:text-brand"
                >
                  <span className="flex size-8 items-center justify-center rounded-full bg-brand-50 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-accent-surface">
                    <ArrowRightIcon
                      size={15}
                      aria-hidden="true"
                      className="rotate-180 transition-transform duration-300 group-hover:-translate-x-0.5"
                    />
                  </span>
                  {copy.back}
                </Link>
              </div>
            </div>

            <figure className="rise-in group relative" style={delay(200)}>
              <span
                aria-hidden="true"
                className="absolute -right-3 -bottom-3 hidden h-full w-full rounded-[8px] border-2 border-accent-surface/70 transition-[translate,border-color] duration-700 ease-out group-hover:translate-x-1.5 group-hover:translate-y-1.5 group-hover:border-accent-surface md:block"
              />
              <div className="relative flex justify-center overflow-hidden rounded-[8px] bg-surface-inverse shadow-raised">
                <Image
                  src={event.image.src}
                  alt={event.image.alt}
                  width={event.image.width}
                  height={event.image.height}
                  preload
                  sizes="(min-width: 1280px) 640px, (min-width: 1024px) 52vw, 100vw"
                  className="h-auto max-h-[75vh] w-auto max-w-full object-contain"
                />
              </div>
              <figcaption className="sr-only">{copy.posterLabel}</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {more.length > 0 ? (
        <section aria-labelledby="more-heading" className="bg-surface-subtle">
          <div className={`${MEASURE} py-14 md:py-20`}>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2
                  id="more-heading"
                  className="font-serif text-[clamp(1.5rem,2.6vw,2rem)] leading-tight tracking-[-0.02em] text-ink-strong"
                >
                  {copy.more}
                </h2>
                <span aria-hidden="true" className="mt-4 block h-[3px] w-10 bg-accent-surface" />
              </div>
              <Link
                href={routes.events.index}
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand"
              >
                {listing.title}
                <ArrowRightIcon
                  size={14}
                  aria-hidden="true"
                  className="text-accent-700 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
            <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {more.map((other, index) => (
                <EventCard
                  key={other.id}
                  event={other}
                  action={listing.moreDetails}
                  index={index}
                />
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </article>
  );
}
