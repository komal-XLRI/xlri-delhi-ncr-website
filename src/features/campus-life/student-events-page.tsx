import Image from 'next/image';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ArrowRightIcon, CompassIcon, MapPinIcon } from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import type { StudentEventsPage } from '@/types/student-events';

import { longDate } from './event-dates';
import { EventsBoard } from './events-board';
import { fill } from '@/lib/format/template';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';
const H2 =
  'font-serif text-[clamp(1.875rem,3.4vw,2.75rem)] leading-tight tracking-[-0.02em] text-ink-strong';
const EYEBROW = 'text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase';
const delay = (ms: number) => ({ ['--rise-delay' as string]: `${ms}ms` });

/**
 * Campus Life › Student Events.
 *
 * The Delhi page is a wall of 28 posters, each linking to a page that holds
 * only the poster; the date, time, venue and organiser are printed in the
 * image. Here they are text, read off the posters, so the events can be
 * grouped by month, filtered by kind and found by the header search.
 *
 *  1. **Hero** — title, introduction, three figures, and the most recent
 *     event as a spotlight (its link opens it in the board's dialog).
 *  2. **The events** — `EventsBoard`: filters, month by month, and each
 *     poster whole in a dialog beside its details, organisers linked to their
 *     committee on Student Societies.
 *
 * Content comes from `content/campus-life/student-events.json`; posters are
 * in `public/media/campus-life/events/`.
 */
export function StudentEvents({ content }: { content: StudentEventsPage }) {
  const committees = new Set(
    content.events.flatMap((event) => event.organisers.map((organiser) => organiser.id)),
  );
  const latest = content.events.find((event) => event.start);
  const facts = [
    { value: String(content.events.length), label: content.facts.events },
    { value: String(committees.size), label: content.facts.committees },
    content.facts.year,
  ];

  return (
    <article aria-labelledby="events-heading">
      {/* ---------------- hero ---------------- */}
      <section data-motif="hero" className="relative isolate overflow-hidden bg-surface">
        <div className={`${MEASURE} pt-8 pb-16 md:pt-10 md:pb-20`}>
          <Breadcrumbs
            items={[
              { label: 'Home', href: routes.home },
              { label: 'Campus Life' },
              { label: content.title },
            ]}
          />

          <div className="mt-8 grid grid-cols-1 items-end gap-10 md:mt-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <p className={`flex items-center gap-2.5 ${EYEBROW}`}>
                <CompassIcon size={18} aria-hidden="true" />
                {content.eyebrow}
              </p>
              <h1
                id="events-heading"
                className="mt-3 font-serif text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.03] tracking-[-0.03em] text-balance text-brand"
              >
                {content.title}
              </h1>
              <span
                aria-hidden="true"
                className="rule-draw mt-6 block h-[3px] w-14 origin-left bg-accent-surface"
              />
              <p
                className="rise-in mt-6 max-w-2xl text-lg leading-[1.75] text-ink md:text-[1.1875rem]"
                style={delay(150)}
              >
                {content.intro}
              </p>
            </div>

            <dl
              className="rise-in grid grid-cols-3 overflow-hidden rounded-[8px] border border-border"
              style={delay(200)}
            >
              {facts.map((fact, index) => (
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
                  <dd className="font-serif text-[clamp(1.5rem,2.4vw,2.5rem)] leading-none whitespace-nowrap text-brand">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ---------------- spotlight ---------------- */}
          {latest?.start ? (
            <a
              href={`#${latest.id}`}
              className="group rise-in relative mt-12 grid grid-cols-1 overflow-hidden rounded-[8px] border border-border bg-surface-subtle transition-[translate,box-shadow,border-color] duration-500 ease-out hover:border-accent-surface hover:shadow-raised motion-safe:hover:-translate-y-1 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]"
              style={delay(300)}
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 z-10 h-1 origin-left scale-x-0 bg-accent-surface transition-transform duration-700 ease-out group-hover:scale-x-100"
              />
              <span className="relative block aspect-4/5 overflow-hidden bg-surface-inverse sm:aspect-auto sm:min-h-72">
                <Image
                  src={latest.poster.src}
                  alt=""
                  fill
                  preload
                  sizes="(min-width: 1024px) 288px, (min-width: 640px) 240px, 100vw"
                  className="object-cover object-top transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
                />
              </span>
              <span className="flex flex-col justify-center p-6 md:p-10">
                <span className="inline-flex items-center gap-2 self-start rounded-full bg-accent-surface px-3 py-1 text-xs font-bold tracking-[0.14em] text-brand-950 uppercase">
                  {content.spotlight.badge}
                </span>
                <span className="mt-4 text-sm font-semibold text-accent-700">
                  {longDate(latest.start, latest.end)}
                  {latest.time ? ` · ${latest.time}` : ''}
                </span>
                <span className="mt-2 font-serif text-[clamp(1.75rem,3.2vw,2.5rem)] leading-tight text-ink-strong transition-colors duration-300 group-hover:text-brand">
                  {latest.title}
                </span>
                <span className="mt-3 max-w-2xl leading-relaxed text-ink">{latest.summary}</span>
                <span className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-muted">
                  {latest.venue ? (
                    <span className="flex items-center gap-1.5">
                      <MapPinIcon size={14} aria-hidden="true" className="text-accent-700" />
                      {latest.venue}
                    </span>
                  ) : null}
                  {latest.organisers.length > 0 ? (
                    <span>
                      {fill(content.spotlight.organisers, {
                        names: latest.organisers.map((organiser) => organiser.name).join(' & '),
                      })}
                    </span>
                  ) : null}
                </span>
                <span className="mt-6 inline-flex items-center gap-2 font-semibold text-brand">
                  {content.spotlight.link}
                  <ArrowRightIcon
                    size={16}
                    aria-hidden="true"
                    className="transition-transform duration-500 group-hover:translate-x-1"
                  />
                </span>
              </span>
            </a>
          ) : null}
        </div>
      </section>

      {/* ---------------- all events ---------------- */}
      <section aria-labelledby="all-heading" className="bg-surface-subtle">
        <div className={`${MEASURE} py-16 md:py-20 lg:py-24`}>
          <div className="max-w-3xl">
            <p className={EYEBROW}>{content.board.eyebrow}</p>
            <h2 id="all-heading" className={`mt-3 ${H2}`}>
              {content.board.title}
            </h2>
            <span aria-hidden="true" className="mt-5 block h-[3px] w-10 bg-accent-surface" />
            <p className="mt-6 text-[1.0625rem] leading-[1.8] text-ink">{content.board.intro}</p>
          </div>
          <div className="mt-10">
            <EventsBoard
              kinds={content.kinds}
              events={content.events}
              labels={content.board.labels}
            />
          </div>
        </div>
      </section>
    </article>
  );
}
