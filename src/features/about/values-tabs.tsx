'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';

import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { cn } from '@/lib/cn';
import type { InstitutionalValue } from '@/types/vision-mission';

/** How long each value stays selected before the next one. */
const ROTATION_MS = 2500;

/**
 * The desktop half of "Our Values": a vertical list of values on the left, the
 * selected value's photograph on the right — the Jamshedpur pattern.
 *
 * Built to the WAI-ARIA Tabs pattern rather than as a row of buttons that swap
 * an image, because that is what it is: one panel visible, chosen from a list.
 * Arrow keys move between tabs and select as they go (automatic activation is
 * right here — panels are a single image, so there is no cost to showing each
 * one), Home/End jump to the ends, and only the selected tab is in the tab
 * order so the list is one stop, not seven.
 *
 * ## Rotation
 *
 * The values advance on their own, one every few seconds, and the lime marker
 * beside the selected value fills downward over that time (the motto
 * stepper's `.spotlight-progress-y`), so the change never comes unannounced.
 *
 * - Never pauses: choosing a value jumps to it and the rotation carries on
 *   from there, with that value given a full turn.
 * - Advancing never moves focus; only the visitor's own keys do.
 * - `prefers-reduced-motion` turns it off entirely.
 *
 * Below `lg` this component is not rendered; the section shows the same values
 * as a native `<details>` accordion instead, which needs no JavaScript.
 */
export function ValuesTabs({ values }: { values: readonly InstitutionalValue[] }) {
  const [active, setActive] = useState(0);
  /** Bumped on manual selection purely to restart the interval below. */
  const [restartKey, setRestartKey] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const count = values.length;
  const rotating = !reducedMotion && count > 1;

  useEffect(() => {
    if (!rotating) return;
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % count);
    }, ROTATION_MS);
    return () => {
      clearInterval(timer);
    };
    // `restartKey` is not read in the body — it is here so choosing a value
    // tears down the interval and gives that value a full turn.
  }, [rotating, count, restartKey]);

  const choose = (index: number) => {
    setActive(index);
    setRestartKey((key) => key + 1);
  };

  const select = (index: number) => {
    const next = (index + count) % count;
    choose(next);
    tabs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const moves: Record<string, () => void> = {
      ArrowDown: () => select(active + 1),
      ArrowUp: () => select(active - 1),
      Home: () => select(0),
      End: () => select(count - 1),
    };
    const move = moves[event.key];
    if (move) {
      event.preventDefault();
      move();
    }
  };

  const progress = {
    ['--spotlight-duration' as string]: `${String(ROTATION_MS)}ms`,
    animationPlayState: rotating ? 'running' : 'paused',
  } as CSSProperties;

  return (
    <div className="flex gap-16 xl:gap-28">
      <div className="w-[35%] shrink-0">
        <div
          role="tablist"
          aria-orientation="vertical"
          aria-label="Our values"
          className="border-l-[1.5px] border-white/15"
        >
          {values.map((value, index) => {
            const selected = index === active;
            return (
              <button
                key={value.id}
                ref={(node) => {
                  tabs.current[index] = node;
                }}
                id={`value-tab-${value.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`value-panel-${value.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => {
                  choose(index);
                }}
                onKeyDown={onKeyDown}
                className={cn(
                  'relative ml-10 block w-[calc(100%-2.5rem)] border-b border-white/15 py-6 text-left text-xl font-medium transition-colors duration-200 last:border-b-0 xl:text-[1.375rem]',
                  // White at 60% is the lowest that clears 4.5:1 on the navy.
                  selected ? 'text-white' : 'text-white/60 hover:text-white',
                )}
              >
                {/* The selected marker, drawn on the list's own left rule. It
                    fills over the interval while the values are rotating. */}
                {selected ? (
                  <span
                    key={`${String(active)}-${String(restartKey)}`}
                    aria-hidden="true"
                    style={reducedMotion ? undefined : progress}
                    className={cn(
                      'absolute top-1/2 -left-[calc(2.5rem+2.25px)] h-10 w-[3px] -translate-y-1/2 rounded-full bg-accent-surface',
                      !reducedMotion && 'spotlight-progress-y',
                    )}
                  />
                ) : null}
                {value.title}
              </button>
            );
          })}
        </div>
      </div>

      <div className="min-w-0 flex-1">
        {values.map((value, index) => (
          <div
            key={value.id}
            id={`value-panel-${value.id}`}
            role="tabpanel"
            aria-labelledby={`value-tab-${value.id}`}
            hidden={index !== active}
          >
            <div className="relative overflow-hidden rounded-[10px]">
              <Image
                src={value.image.src}
                width={value.image.width}
                height={value.image.height}
                alt={value.image.alt}
                sizes="(min-width: 1280px) 640px, 55vw"
                className="aspect-[3/2] w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent px-8 pt-20 pb-7"
              >
                <p className="text-sm text-white/80 tabular-nums">
                  {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                </p>
                <p className="mt-1 font-serif text-3xl text-white">{value.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
