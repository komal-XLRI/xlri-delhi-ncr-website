'use client';

import Image from 'next/image';
import NextLink from 'next/link';
import { useCallback, useEffect, useState } from 'react';

import { ArrowRightIcon, PauseIcon, PlayIcon } from '@/components/ui/icon';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import type { AcademicProgramme } from '@/types/homepage';

/**
 * The programme carousel.
 *
 * ## Every card is always in the DOM
 *
 * This is the one thing the previous showcase got wrong badly enough to be
 * worth stating twice: it *unmounted* the five programmes that were not
 * selected, so five sixths of the campus portfolio existed only after
 * hydration. Search engines, reader modes, and anyone whose bundle failed saw
 * one programme.
 *
 * Here all six render server-side and stay mounted for the life of the page.
 * The carousel moves a track with `transform`; it never adds or removes a card.
 * That also means the whole thing degrades to a horizontally scrollable strip
 * if the JavaScript never arrives, rather than to a single card.
 *
 * ## The step is a CSS variable, not a measured pixel value
 *
 * The component writes one number — `--index` — and the stylesheet decides what
 * a step is worth at each breakpoint:
 *
 *     transform: translateX(calc(var(--index) * -1 * (100% + var(--gap)) / var(--per-view)));
 *
 * The alternative is reading the viewport in JavaScript and animating pixels,
 * which cannot know the width during server rendering: the card would be laid
 * out at one size in the HTML and jump to another a frame after hydration.
 *
 * ## Motion
 *
 * Advances every 5s. Pauses on hover and on focus-within, so it cannot move
 * while a card is being read or tabbed into. Manual navigation **restarts**
 * rather than stops, so the chosen card gets a full turn. `prefers-reduced-
 * motion` disables auto-advance entirely and removes the slide transition — the
 * arrows still work, they just cut rather than glide. A focus-reachable control
 * stops it for good, which is what WCAG 2.2.2 requires.
 *
 * ## Why the off-screen cards are not `inert`
 *
 * Because they are only *partly* off-screen, and which ones are visible depends
 * on the breakpoint. Marking them inert would make a visible link unreachable
 * by keyboard at some widths, which is a worse failure than the tab-order
 * surprise it would prevent. The track scrolls its own focused child into view
 * instead.
 */

const ROTATION_MS = 3000;
/** Must match `--per-view` at the widest breakpoint in `base.css`. */
const PER_VIEW_LG = 3;

export function AcademicsCarousel({ programmes }: { programmes: readonly AcademicProgramme[] }) {
  const [index, setIndex] = useState(0);
  /** Set only by the explicit control. Never cleared automatically. */
  const [stopped, setStopped] = useState(false);
  const [paused, setPaused] = useState(false);
  /** Bumped on manual navigation purely to restart the interval. */
  const [restartKey, setRestartKey] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  const count = programmes.length;
  /*
    The last position is the one that shows the final card flush with the right
    edge, not the final card alone — otherwise the track keeps sliding into
    empty space for two more steps.
  */
  const lastIndex = Math.max(0, count - PER_VIEW_LG);
  const rotating = !stopped && !paused && !reducedMotion && lastIndex > 0;

  useEffect(() => {
    if (!rotating) return;
    const timer = setInterval(() => {
      setIndex((current) => (current >= lastIndex ? 0 : current + 1));
    }, ROTATION_MS);
    return () => {
      clearInterval(timer);
    };
  }, [rotating, lastIndex, restartKey]);

  const goTo = useCallback(
    (next: number) => {
      setIndex(Math.max(0, Math.min(next, lastIndex)));
      setRestartKey((key) => key + 1);
    },
    [lastIndex],
  );

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Academic programmes"
      onMouseEnter={() => {
        setPaused(true);
      }}
      onMouseLeave={() => {
        setPaused(false);
      }}
      onFocusCapture={() => {
        setPaused(true);
      }}
      onBlurCapture={() => {
        setPaused(false);
      }}
    >
      <div className="programme-viewport">
        <ul
          className="programme-track"
          style={{ ['--index' as string]: String(index) }}
          data-reduced={reducedMotion ? 'true' : 'false'}
        >
          {programmes.map((programme, cardIndex) => (
            <li
              key={programme.id}
              className="programme-slide"
              role="group"
              aria-roledescription="slide"
              aria-label={`${String(cardIndex + 1)} of ${String(count)}`}
            >
              <NextLink href={programme.action.href} className="programme-card group">
                {/*
                  Generic campus photography, flagged `placeholder: true` in the
                  content. `alt` is empty because it is decorative — the
                  programme name beside it is the content, and a descriptive alt
                  on a stand-in would *assert* that the picture shows that
                  programme, which is exactly what it must not do.
                */}
                {programme.image ? (
                  <span className="programme-figure">
                    <Image
                      src={programme.image.src}
                      alt={programme.image.alt}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
                      className="programme-image"
                    />
                  </span>
                ) : null}

                <span className="programme-body">
                  <span className="flex items-center gap-2.5">
                    <span className="text-2xs font-semibold tracking-[0.16em] text-accent-ink uppercase">
                      {programme.category}
                    </span>
                    <span aria-hidden="true" className="h-3 w-px bg-border" />
                    <span className="text-2xs text-ink-muted tabular-nums">
                      {programme.shortName}
                    </span>
                  </span>

                  <span className="mt-3 block font-serif text-[1.25rem] leading-[1.2] text-balance text-brand transition-colors duration-300 group-hover:text-brand-hover">
                    {programme.name}
                  </span>

                  <span className="mt-2 block grow text-sm leading-relaxed text-ink-muted">
                    {programme.description}
                  </span>

                  <span className="mt-4 flex flex-wrap gap-1.5">
                    {programme.highlights.slice(0, 2).map((highlight) => (
                      <span key={highlight.id} className="academics-chip">
                        {highlight.label}
                      </span>
                    ))}
                  </span>

                  <span
                    aria-hidden="true"
                    className="mt-4 flex items-center gap-2 text-2xs font-semibold tracking-[0.12em] text-brand uppercase"
                  >
                    Learn more
                    <ArrowRightIcon
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </span>
              </NextLink>
            </li>
          ))}
        </ul>
      </div>

      {/* ---------------- controls ---------------- */}
      {lastIndex > 0 ? (
        <div className="mt-8 flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              goTo(index - 1);
            }}
            disabled={index === 0}
            data-dir="prev"
            className="carousel-control"
          >
            <ArrowRightIcon
              size={17}
              aria-hidden="true"
              className="carousel-control-arrow rotate-180"
            />
            <span className="sr-only">Previous programmes</span>
          </button>
          <button
            type="button"
            onClick={() => {
              goTo(index + 1);
            }}
            disabled={index >= lastIndex}
            data-dir="next"
            className="carousel-control"
          >
            <ArrowRightIcon size={17} aria-hidden="true" className="carousel-control-arrow" />
            <span className="sr-only">Next programmes</span>
          </button>

          {/*
            WCAG 2.2.2. Visually hidden until focused — the arrows restart the
            rotation rather than ending it, so this is the only control that
            stops it for good, and a keyboard user reaches it immediately.
          */}
          <button
            type="button"
            onClick={() => {
              setStopped((value) => !value);
            }}
            aria-pressed={stopped}
            className="sr-only focus-visible:not-sr-only focus-visible:inline-flex focus-visible:h-9 focus-visible:items-center focus-visible:gap-2 focus-visible:rounded-full focus-visible:border focus-visible:border-border-strong focus-visible:px-3 focus-visible:text-2xs focus-visible:text-ink"
          >
            {stopped ? <PlayIcon size={13} /> : <PauseIcon size={13} />}
            {stopped ? 'Resume' : 'Pause'}
          </button>

          {/* Segmented track. Each segment is a jump target; the active one
              drains over the interval, so the next move announces itself. */}
          <div className="ml-auto flex flex-1 gap-1.5">
            {Array.from({ length: lastIndex + 1 }, (_, segment) => (
              <button
                key={segment}
                type="button"
                onClick={() => {
                  goTo(segment);
                }}
                aria-current={segment === index ? 'true' : undefined}
                className="track-segment group flex-1"
              >
                <span className="track-segment-bar bg-border transition-colors group-hover:bg-border-strong">
                  {segment === index ? (
                    <span
                      aria-hidden="true"
                      key={`${String(index)}-${rotating ? 'run' : 'hold'}`}
                      className={[
                        'absolute inset-0 origin-left bg-brand',
                        rotating ? 'spotlight-progress' : '',
                      ].join(' ')}
                      style={{ ['--spotlight-duration' as string]: `${String(ROTATION_MS)}ms` }}
                    />
                  ) : null}
                </span>
                <span className="sr-only">Show programmes from {segment + 1}</span>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
