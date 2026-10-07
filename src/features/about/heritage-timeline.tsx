'use client';

import Image from 'next/image';
import { useRef, useState, type KeyboardEvent } from 'react';

import { ArrowRightIcon } from '@/components/ui/icon';
import { cn } from '@/lib/cn';
import type { TimelineEntry } from '@/types/heritage';

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
 */
export function HeritageTimeline({ entries }: { entries: readonly TimelineEntry[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const last = entries.length - 1;

  const go = (index: number, focus = false) => {
    const next = Math.min(Math.max(index, 0), last);
    setActive(next);
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

  const arrow =
    'flex size-11 shrink-0 items-center justify-center rounded-full border border-white/25 text-[#9dbcf2] transition-colors hover:border-accent-surface hover:text-accent-surface disabled:pointer-events-none disabled:opacity-35';

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
          <span aria-hidden="true" className="absolute inset-x-1.5 top-[5px] h-px bg-[#2e5eb1]" />
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
                    'size-3 rounded-full ring-4 ring-surface-inverse transition-colors',
                    selected ? 'bg-accent-surface' : 'bg-[#2e5eb1] group-hover:bg-white',
                  )}
                />
                <span
                  className={cn(
                    'text-sm font-medium tabular-nums transition-colors',
                    selected ? 'text-white' : 'text-white/60 group-hover:text-white',
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
              <div className="relative aspect-[4/3] overflow-hidden rounded-[5px] bg-white/5">
                <Image
                  key={entry.id}
                  src={entry.image.src}
                  alt={entry.image.alt}
                  fill
                  sizes="(min-width: 768px) 380px, 100vw"
                  className="object-contain"
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
        <span className="text-sm text-white/70 tabular-nums">
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
      <h3 className="mt-4 font-serif text-2xl text-white md:text-[2rem] md:leading-tight">
        {entry.title}
      </h3>
      <p className="mt-4 text-base leading-[1.85] text-white/85 md:text-[1.0625rem]">
        {entry.body}
      </p>
    </div>
  );
}
