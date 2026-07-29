'use client';

import Image from 'next/image';
import NextLink from 'next/link';
import { useCallback, useEffect, useState } from 'react';

import { ArrowRightIcon, PauseIcon, PlayIcon } from '@/components/ui/icon';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { formatDate } from '@/lib/format/date';
import type { NewsItem } from '@/types/homepage';

/**
 * The featured story, rotating.
 *
 * ## The one thing the reference gets wrong
 *
 * In the design this is modelled on, the picture, the date chip, the headline
 * and the summary are four separate objects stacked in a column with a border
 * around the lot. Here the meta rides *on* the photograph — category and date
 * in a single bar across its foot — and only the headline and summary sit
 * below. One less box, one less edge, and the picture reaches the full width of
 * the card instead of being inset inside a frame.
 *
 * ## Height
 *
 * The slot reserves space for the tallest slide. Most of these announcements
 * are a headline and a date with no summary written yet, so without a floor the
 * card would jump by a paragraph every time the rotation reached one that has
 * one — and a card that resizes under the cursor is how you make someone
 * mis-click.
 *
 * ## Motion
 *
 * Same contract as everything else on this page: pauses on hover and focus,
 * **restarts** rather than stops when you use the arrows, disabled entirely
 * under `prefers-reduced-motion`, and a focus-reachable control ends it for
 * good (WCAG 2.2.2). The progress track drains over the interval so the next
 * change announces itself.
 */

const ROTATION_MS = 3400;

export function NewsFeatured({ items }: { items: readonly NewsItem[] }) {
  const [index, setIndex] = useState(0);
  /** Set only by the explicit control. Never cleared automatically. */
  const [stopped, setStopped] = useState(false);
  const [paused, setPaused] = useState(false);
  /** Bumped on manual navigation purely to restart the interval below. */
  const [restartKey, setRestartKey] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  const count = items.length;
  const rotating = !stopped && !paused && !reducedMotion && count > 1;

  useEffect(() => {
    if (!rotating) return;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, ROTATION_MS);
    return () => {
      clearInterval(timer);
    };
  }, [rotating, count, restartKey]);

  const goTo = useCallback((next: number) => {
    setIndex(next);
    setRestartKey((key) => key + 1);
  }, []);

  const active = items[index];
  if (!active) return null;

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Featured announcement"
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
      className="flex h-full flex-col"
    >
      {/* ---------------- the picture ---------------- */}
      <div className="relative aspect-16/10 w-full overflow-hidden rounded-sm bg-surface-subtle">
        {items.map((item, itemIndex) => (
          <div
            key={item.id}
            aria-hidden={itemIndex !== index}
            className={[
              'absolute inset-0 transition-opacity duration-700 ease-out',
              itemIndex === index ? 'opacity-100' : 'opacity-0',
            ].join(' ')}
          >
            {item.image ? (
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            ) : null}
          </div>
        ))}

        {/*
          A bar across the foot rather than a chip floating in the corner. It
          gives the meta a ground of its own, so it never has to survive
          whatever the photograph is doing behind it.
        */}
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-surface-inverse/85 px-5 py-3">
          <span className="text-2xs font-semibold tracking-[0.18em] text-accent-surface uppercase">
            {active.category}
          </span>
          <span aria-hidden="true" className="h-3 w-px bg-white/30" />
          <time dateTime={active.date} className="text-2xs text-white/80 tabular-nums">
            {formatDate(active.date)}
          </time>
        </div>
      </div>

      {/* ---------------- headline and summary ---------------- */}
      {/*
        `min-h` reserves the tallest slide's space. See the note above — most
        of these have no summary yet, and the card must not resize as the
        rotation passes the one that does.
      */}
      <div className="mt-6 min-h-[9.5rem] grow">
        <h3 className="font-serif text-[1.6rem] leading-[1.2] text-balance text-ink-strong">
          <NextLink
            href={active.href}
            className="group inline-flex items-start gap-2 transition-colors hover:text-brand"
          >
            {active.title}
            <ArrowRightIcon
              size={20}
              aria-hidden="true"
              className="mt-1.5 shrink-0 -rotate-45 text-accent-ink transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </NextLink>
        </h3>

        {active.excerpt ? (
          <p className="mt-4 text-base leading-relaxed text-ink-muted">{active.excerpt}</p>
        ) : null}
      </div>

      {/* ---------------- controls ---------------- */}
      {count > 1 ? (
        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              goTo((index - 1 + count) % count);
            }}
            className="carousel-control"
          >
            <ArrowRightIcon
              size={17}
              aria-hidden="true"
              className="carousel-control-arrow rotate-180"
            />
            <span className="sr-only">Previous announcement</span>
          </button>
          <button
            type="button"
            onClick={() => {
              goTo((index + 1) % count);
            }}
            className="carousel-control"
          >
            <ArrowRightIcon size={17} aria-hidden="true" className="carousel-control-arrow" />
            <span className="sr-only">Next announcement</span>
          </button>

          {/*
            WCAG 2.2.2. Hidden until focused — the arrows already stop nothing
            permanently, so this is the only mechanism that ends the rotation,
            and a keyboard user reaches it immediately.
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

          {/* Segmented track: each segment is a jump target, and the active one
              drains over the interval. */}
          <div className="ml-auto flex flex-1 gap-1.5">
            {items.map((item, itemIndex) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  goTo(itemIndex);
                }}
                aria-current={itemIndex === index ? 'true' : undefined}
                className="track-segment group flex-1"
              >
                <span className="track-segment-bar bg-border transition-colors group-hover:bg-border-strong">
                  {itemIndex === index ? (
                    <span
                      aria-hidden="true"
                      // Re-keyed on each step so the drain restarts.
                      key={`${String(index)}-${rotating ? 'run' : 'hold'}`}
                      className={[
                        'absolute inset-0 origin-left bg-brand',
                        rotating ? 'spotlight-progress' : '',
                      ].join(' ')}
                      style={{ ['--spotlight-duration' as string]: `${String(ROTATION_MS)}ms` }}
                    />
                  ) : null}
                </span>
                <span className="sr-only">
                  Show announcement {itemIndex + 1}: {item.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
