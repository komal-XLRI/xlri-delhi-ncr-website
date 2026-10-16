'use client';

import Image from 'next/image';
import { useMemo, useRef, useState } from 'react';

import { ArrowRightIcon, ExternalIcon, PlayIcon } from '@/components/ui/icon';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { cn } from '@/lib/cn';
import type { TourArea, TourLabels, TourStop } from '@/types/campus-tour';

import { fill } from '@/lib/format/template';

interface Stop extends TourStop {
  /** 1-based, straight through all areas. */
  readonly number: number;
  readonly area: string;
  readonly areaId: string;
}

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * The tour: a stage that plays one stop at a time, a panel saying where you
 * are with Previous / Next and the next few stops, and every stop below as a
 * card, filterable by part of the campus.
 *
 * ## The player
 *
 * A facade, as on the Heritage page: the stage shows a self-hosted poster with
 * a Play disc, and the YouTube iframe (`youtube-nocookie.com`, no cookies
 * before playback) is only created when someone presses Play or picks a stop.
 * Once a visitor has started watching, moving to another stop plays it
 * straight away; before that, it only changes the poster.
 *
 * ## The cards
 *
 * Buttons, not links — they change what the stage shows. The current one is
 * marked (`aria-current`) and framed in lime. Choosing one scrolls the stage
 * into view, smoothly unless `prefers-reduced-motion` is set.
 */
export function CampusTourPlayer({
  areas,
  channel,
  labels,
}: {
  areas: readonly TourArea[];
  channel: string;
  labels: TourLabels;
}) {
  const stops = useMemo<Stop[]>(() => {
    let n = 0;
    return areas.flatMap((area) =>
      area.stops.map((stop) => ({ ...stop, number: ++n, area: area.label, areaId: area.id })),
    );
  }, [areas]);

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [filter, setFilter] = useState('');
  const stage = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const current = stops[index];
  if (!current) return null;
  const last = stops.length - 1;
  const upNext = stops.slice(index + 1, index + 4);
  const shown = filter ? stops.filter((s) => s.areaId === filter) : stops;

  const go = (next: number, options: { play?: boolean; scroll?: boolean } = {}) => {
    setIndex(Math.min(Math.max(next, 0), last));
    if (options.play) setPlaying(true);
    if (options.scroll) {
      stage.current?.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'center',
      });
    }
  };

  const chip = (selected: boolean) =>
    cn(
      'inline-flex h-10 items-center rounded-full border px-4 text-sm font-medium transition-colors duration-500',
      selected
        ? 'border-brand bg-brand text-white'
        : 'border-border-strong bg-surface text-ink-strong hover:border-accent-surface hover:bg-accent-surface hover:text-brand-950',
    );
  const arrow =
    'flex size-11 items-center justify-center rounded-full border border-border-strong bg-surface text-brand transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-white disabled:pointer-events-none disabled:opacity-35';

  return (
    <div>
      {/* ---------------- stage and panel ---------------- */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)] xl:gap-8">
        <div
          ref={stage}
          className="relative aspect-video scroll-mt-32 overflow-hidden rounded-[8px] bg-surface-inverse shadow-raised"
        >
          {playing ? (
            <iframe
              key={current.youtubeId}
              src={`https://www.youtube-nocookie.com/embed/${current.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              title={`Campus Tour: ${current.title}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 size-full"
            />
          ) : (
            <button
              type="button"
              onClick={() => {
                setPlaying(true);
              }}
              className="group absolute inset-0 size-full cursor-pointer"
            >
              <Image
                key={current.youtubeId}
                src={current.poster}
                alt=""
                fill
                preload
                sizes="(min-width: 1280px) 760px, 100vw"
                className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-brand-950/10 to-transparent"
              />
              <span className="absolute top-1/2 left-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent-surface text-brand-950 shadow-raised ring-8 ring-white/25 transition-transform duration-500 ease-out motion-safe:group-hover:scale-110 md:size-20">
                <PlayIcon size={26} aria-hidden="true" className="translate-x-0.5" />
                <span className="sr-only">Play: {current.title}</span>
              </span>
              <span className="absolute bottom-4 left-5 text-left text-white md:bottom-6 md:left-7">
                <span className="block text-xs font-semibold tracking-[0.18em] text-accent-surface uppercase">
                  {fill(labels.stopCaption, { number: pad(current.number), area: current.area })}
                </span>
                <span className="mt-1 block font-serif text-xl md:text-3xl">{current.title}</span>
              </span>
            </button>
          )}
        </div>

        {/* `contain-size` on xl keeps the panel out of the row's height, so the
            16:9 stage sets it and the panel matches; Up next scrolls if short. */}
        <aside
          aria-label="Now showing"
          className="flex flex-col rounded-[8px] border border-border bg-surface-subtle p-6 md:p-7 xl:contain-size"
        >
          <p className="text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase tabular-nums">
            {fill(labels.stopCount, { number: pad(current.number), total: stops.length })}
          </p>
          <h2
            aria-live="polite"
            className="mt-3 font-serif text-[clamp(1.5rem,2.4vw,2rem)] leading-tight text-ink-strong"
          >
            {current.title}
          </h2>
          <p className="mt-2 text-[0.9375rem] text-ink-muted">{current.area}</p>

          {/* Progress through the tour. */}
          <div aria-hidden="true" className="mt-5 h-1 overflow-hidden rounded-full bg-border">
            <span
              className="block h-full rounded-full bg-accent-surface transition-[width] duration-700 ease-out"
              style={{ width: `${String(((index + 1) / stops.length) * 100)}%` }}
            />
          </div>

          <div className="mt-5 flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                go(index - 1);
              }}
              disabled={index === 0}
              aria-label="Previous stop"
              className={arrow}
            >
              <ArrowRightIcon size={18} className="rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => {
                go(index + 1);
              }}
              disabled={index === last}
              aria-label="Next stop"
              className={arrow}
            >
              <ArrowRightIcon size={18} />
            </button>
            <a
              href={`https://www.youtube.com/watch?v=${current.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-950"
            >
              {labels.youtube}
              <ExternalIcon size={13} aria-hidden="true" className="text-accent-700" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>

          {upNext.length > 0 ? (
            <div className="mt-5 flex min-h-0 flex-1 flex-col border-t border-border pt-4">
              <p className="text-xs font-semibold tracking-[0.16em] text-ink-muted uppercase">
                {labels.upNext}
              </p>
              <ul className="-mx-1.5 mt-3 flex min-h-0 flex-col gap-2 overflow-y-auto px-1.5">
                {upNext.map((stop) => (
                  <li key={stop.youtubeId}>
                    <button
                      type="button"
                      onClick={() => {
                        go(stop.number - 1);
                      }}
                      className="group flex w-full items-center gap-3 rounded-[6px] p-1.5 text-left transition-colors duration-300 hover:bg-surface"
                    >
                      <span className="relative block aspect-video w-20 shrink-0 overflow-hidden rounded-[4px] bg-surface-inverse">
                        <Image
                          src={stop.poster}
                          alt=""
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs text-ink-muted tabular-nums">
                          {pad(stop.number)}
                        </span>
                        <span className="block truncate text-sm font-semibold text-ink-strong transition-colors duration-300 group-hover:text-brand">
                          {stop.title}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>
      </div>

      {/* ---------------- every stop ---------------- */}
      <section aria-labelledby="stops-heading" className="mt-16 md:mt-20">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2
              id="stops-heading"
              className="font-serif text-[clamp(1.75rem,3.2vw,2.5rem)] leading-tight tracking-[-0.02em] text-ink-strong"
            >
              {labels.allStops}
            </h2>
            <span aria-hidden="true" className="mt-4 block h-[3px] w-10 bg-accent-surface" />
          </div>
          <div role="group" aria-label="Filter by part of campus" className="flex flex-wrap gap-2">
            <button
              type="button"
              aria-pressed={filter === ''}
              onClick={() => {
                setFilter('');
              }}
              className={chip(filter === '')}
            >
              {labels.filterAll}
            </button>
            {areas.map((area) => (
              <button
                key={area.id}
                type="button"
                aria-pressed={filter === area.id}
                onClick={() => {
                  setFilter(area.id);
                }}
                className={chip(filter === area.id)}
              >
                {area.label}
              </button>
            ))}
          </div>
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {shown.map((stop) => {
            const active = stop.number - 1 === index;
            return (
              <li key={stop.youtubeId}>
                <button
                  type="button"
                  aria-current={active ? 'true' : undefined}
                  onClick={() => {
                    go(stop.number - 1, { play: true, scroll: true });
                  }}
                  className={cn(
                    'group relative flex h-full w-full flex-col overflow-hidden rounded-[8px] border bg-surface text-left transition-[translate,box-shadow,border-color] duration-500 ease-out hover:shadow-raised motion-safe:hover:-translate-y-1',
                    active
                      ? 'border-accent-surface ring-2 ring-accent-surface'
                      : 'border-border hover:border-accent-surface',
                  )}
                >
                  <span className="relative block aspect-video overflow-hidden bg-surface-inverse">
                    <Image
                      src={stop.poster}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 284px, (min-width: 1024px) 23vw, (min-width: 640px) 46vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.05]"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-brand-950/75 px-2.5 py-1 text-xs font-semibold text-white tabular-nums backdrop-blur-sm">
                      {pad(stop.number)}
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute top-1/2 left-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent-surface text-brand-950 opacity-0 shadow-raised transition-opacity duration-300 group-hover:opacity-100"
                    >
                      <PlayIcon size={16} className="translate-x-px" />
                    </span>
                    {active ? (
                      <span className="absolute top-3 right-3 rounded-full bg-accent-surface px-2.5 py-1 text-xs font-semibold text-brand-950">
                        {labels.nowShowing}
                      </span>
                    ) : null}
                  </span>
                  <span className="block px-4 pt-3.5 pb-4">
                    <span className="block font-serif text-lg leading-snug text-ink-strong transition-colors duration-500 group-hover:text-brand">
                      {stop.title}
                    </span>
                    <span className="mt-1 block text-sm text-ink-muted">{stop.area}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-12 flex justify-center">
          <a
            href={channel}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border border-border-strong bg-surface py-2 pr-5 pl-2 text-[0.9375rem] font-semibold text-ink-strong transition-[border-color,box-shadow] duration-500 hover:border-accent-surface hover:shadow-raised"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-accent-surface text-brand-950 transition-transform duration-500 ease-out motion-safe:group-hover:scale-110">
              <PlayIcon size={14} aria-hidden="true" className="translate-x-px" />
            </span>
            <span className="transition-colors duration-500 group-hover:text-brand">
              {labels.channelLink}
            </span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </section>
    </div>
  );
}
