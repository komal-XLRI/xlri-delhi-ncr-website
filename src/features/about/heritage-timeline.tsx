'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';

import { ArrowRightIcon } from '@/components/ui/icon';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { cn } from '@/lib/cn';
import type { TimelineEntry } from '@/types/heritage';

/** How long each milestone stays before the journey moves on. */
const ROTATION_MS = 4500;

/**
 * "XL Journey": a rail of years along the top, one milestone shown below it,
 * and arrows either side — the Jamshedpur slider, without Swiper.
 *
 * ## Semantics
 *
 * It is a set of tabs, so it is built as one (WAI-ARIA Tabs): the years are a
 * horizontal tablist, Left/Right move along it and select as they go, Home/End
 * jump to the ends, and only the selected year is in the tab order. The arrows
 * are ordinary buttons that step the same selection, for pointer users who
 * would rather not aim at a dot.
 *
 * ## Layout
 *
 * A milestone with a photograph sits as image-left, text-right (Jamshedpur's
 * 380px column); one without is centred text, as theirs is. Archive photos
 * come in every shape, from a portrait to a wide panorama, so the frame is a
 * fixed 4:3 and the picture is *contained*, never cropped — several carry
 * their own printed captions, which a crop would cut through.
 *
 * ## Rotation
 *
 * The journey moves on by itself: a brand-blue line fills along the rail from the
 * selected year towards the next (`.spotlight-progress`), the next milestone
 * opens when it arrives, and after the last year it starts again. The rail
 * behind the selected year stays blue, so the line reads as the distance
 * travelled. It never pauses — choosing a year or an arrow jumps there and
 * the journey carries on from it — and `prefers-reduced-motion` turns it off.
 */
export function HeritageTimeline({ entries }: { entries: readonly TimelineEntry[] }) {
  const [active, setActive] = useState(0);
  /** Bumped on manual navigation purely to restart the interval below. */
  const [restartKey, setRestartKey] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const last = entries.length - 1;
  const rotating = !reducedMotion && last > 0;

  useEffect(() => {
    if (!rotating) return;
    const timer = setInterval(() => {
      setActive((current) => (current >= last ? 0 : current + 1));
    }, ROTATION_MS);
    return () => {
      clearInterval(timer);
    };
    // `restartKey` is not read in the body — it restarts the interval after a
    // manual jump, so the chosen milestone gets a full turn.
  }, [rotating, last, restartKey]);

  const go = (index: number, focus = false) => {
    const next = Math.min(Math.max(index, 0), last);
    setActive(next);
    setRestartKey((key) => key + 1);
    if (focus) tabs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const moves: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: last,
    };
    const target = moves[event.key];
    if (target !== undefined) {
      event.preventDefault();
      go(target, true);
    }
  };

  const entry = entries[active];
  if (!entry) return null;

  /** Where each dot sits along the rail, as a percentage: they are spread with justify-between. */
  const at = (index: number) => (last > 0 ? (index / last) * 100 : 0);
  const progress = {
    ['--spotlight-duration' as string]: `${String(ROTATION_MS)}ms`,
  } as CSSProperties;

  const arrow =
    'flex size-11 shrink-0 items-center justify-center rounded-full border border-border-strong bg-surface text-brand transition-colors hover:border-brand hover:bg-brand hover:text-white disabled:pointer-events-none disabled:opacity-35';

  return (
    <div>
      {/* ---------------- the rail ---------------- */}
      {/*
        Scrolls sideways on narrow screens rather than squeezing eight years
        into 350px; the min-width keeps the labels from colliding.
      */}
      <div className="-mx-6 overflow-x-auto px-6 pb-2 md:mx-0 md:px-0">
        <div
          role="tablist"
          aria-label="XL Journey milestones"
          className="relative flex min-w-[40rem] justify-between"
        >
          <span
            aria-hidden="true"
            className="absolute inset-x-1.5 top-[5px] h-px bg-border-strong"
          />
          {/* The distance travelled, and the segment filling towards the next year. */}
          <span aria-hidden="true" className="absolute inset-x-1.5 top-[5px] h-[2px]">
            <span
              className="absolute inset-y-0 left-0 bg-brand"
              style={{ width: `${String(at(active))}%` }}
            />
            {rotating && active < last ? (
              <span
                className="absolute inset-y-0"
                style={{ left: `${String(at(active))}%`, width: `${String(at(1))}%` }}
              >
                <span
                  key={`${String(active)}-${String(restartKey)}`}
                  className="spotlight-progress block h-full bg-brand"
                  style={progress}
                />
              </span>
            ) : null}
          </span>
          {entries.map((item, index) => {
            const selected = index === active;
            return (
              <button
                key={item.id}
                ref={(node) => {
                  tabs.current[index] = node;
                }}
                id={`journey-tab-${item.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="journey-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => go(index)}
                onKeyDown={onKeyDown}
                className="group relative flex flex-col items-center gap-3"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'size-3 rounded-full ring-4 ring-surface-subtle transition-[background-color,scale]',
                    selected
                      ? 'scale-125 bg-accent-surface'
                      : index < active
                        ? 'bg-brand'
                        : 'bg-border-strong group-hover:bg-brand',
                  )}
                />
                <span
                  className={cn(
                    'text-sm font-medium tabular-nums transition-colors',
                    selected
                      ? 'font-semibold text-ink-strong'
                      : 'text-ink-muted group-hover:text-ink-strong',
                  )}
                >
                  {item.year}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ---------------- the milestone ---------------- */}
      <div className="mt-12 flex items-center gap-6 md:mt-16 lg:gap-10">
        <button
          type="button"
          onClick={() => go(active - 1)}
          disabled={active === 0}
          aria-label="Previous milestone"
          className={cn(arrow, 'hidden md:flex')}
        >
          <ArrowRightIcon size={18} className="rotate-180" />
        </button>

        <div
          id="journey-panel"
          role="tabpanel"
          aria-labelledby={`journey-tab-${entry.id}`}
          tabIndex={0}
          className="min-h-[16rem] min-w-0 flex-1 rounded-sm focus-visible:outline-offset-8"
        >
          {entry.image ? (
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[minmax(0,23.75rem)_1fr] md:gap-12">
              <div className="group relative aspect-[4/3] overflow-hidden rounded-[5px] bg-surface">
                <Image
                  key={entry.id}
                  src={entry.image.src}
                  alt={entry.image.alt}
                  fill
                  sizes="(min-width: 768px) 380px, 100vw"
                  className="object-contain transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.04]"
                />
              </div>
              <Milestone entry={entry} />
            </div>
          ) : (
            <div className="mx-auto max-w-2xl text-center">
              <Milestone entry={entry} centred />
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => go(active + 1)}
          disabled={active === last}
          aria-label="Next milestone"
          className={cn(arrow, 'hidden md:flex')}
        >
          <ArrowRightIcon size={18} />
        </button>
      </div>

      {/* Below `md` the arrows move under the panel, where a thumb can reach them. */}
      <div className="mt-8 flex items-center justify-center gap-4 md:hidden">
        <button
          type="button"
          onClick={() => go(active - 1)}
          disabled={active === 0}
          aria-label="Previous milestone"
          className={arrow}
        >
          <ArrowRightIcon size={18} className="rotate-180" />
        </button>
        <span className="text-sm text-ink-muted tabular-nums">
          {active + 1} / {entries.length}
        </span>
        <button
          type="button"
          onClick={() => go(active + 1)}
          disabled={active === last}
          aria-label="Next milestone"
          className={arrow}
        >
          <ArrowRightIcon size={18} />
        </button>
      </div>
    </div>
  );
}

function Milestone({ entry, centred = false }: { entry: TimelineEntry; centred?: boolean }) {
  return (
    <div>
      <p
        className={cn(
          'font-serif text-5xl leading-none text-accent-surface md:text-6xl',
          centred && 'text-center',
        )}
      >
        {entry.year}
      </p>
      <h3 className="mt-4 font-serif text-2xl text-ink-strong md:text-[2rem] md:leading-tight">
        {entry.title}
      </h3>
      <p className="mt-4 text-base leading-[1.85] text-ink md:text-[1.0625rem]">{entry.body}</p>
    </div>
  );
}
