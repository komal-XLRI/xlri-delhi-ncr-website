'use client';

import Image from 'next/image';
import { useRef, useState, type KeyboardEvent } from 'react';

import { cn } from '@/lib/cn';
import type { InstitutionalValue } from '@/types/vision-mission';

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
 * Below `lg` this component is not rendered; the section shows the same values
 * as a native `<details>` accordion instead, which needs no JavaScript.
 */
export function ValuesTabs({ values }: { values: readonly InstitutionalValue[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (index: number) => {
    const next = (index + values.length) % values.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const moves: Record<string, () => void> = {
      ArrowDown: () => select(active + 1),
      ArrowUp: () => select(active - 1),
      Home: () => select(0),
      End: () => select(values.length - 1),
    };
    const move = moves[event.key];
    if (move) {
      event.preventDefault();
      move();
    }
  };

  return (
    <div className="flex gap-16 xl:gap-28">
      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label="Our values"
        className="w-[35%] shrink-0 border-l-[1.5px] border-white/15"
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
              onClick={() => setActive(index)}
              onKeyDown={onKeyDown}
              className={cn(
                'relative ml-10 block w-[calc(100%-2.5rem)] border-b border-white/15 py-6 text-left text-xl font-medium transition-colors duration-200 last:border-b-0 xl:text-[1.375rem]',
                // White at 60% is the lowest that clears 4.5:1 on the navy.
                selected ? 'text-white' : 'text-white/60 hover:text-white',
              )}
            >
              {/* The selected marker, drawn on the list's own left rule. */}
              <span
                aria-hidden="true"
                className={cn(
                  'absolute top-1/2 -left-[calc(2.5rem+2.25px)] h-10 w-[3px] -translate-y-1/2 rounded-full bg-accent-surface transition-opacity duration-200',
                  selected ? 'opacity-100' : 'opacity-0',
                )}
              />
              {value.title}
            </button>
          );
        })}
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
                  {String(index + 1).padStart(2, '0')} / {String(values.length).padStart(2, '0')}
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
