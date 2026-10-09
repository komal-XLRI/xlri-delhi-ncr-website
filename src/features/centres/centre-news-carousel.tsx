'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

import { ArrowRightIcon } from '@/components/ui/icon';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import type { CentreNewsItem } from '@/types/centre';

/** How long each position holds before the strip moves on by one card. */
const ROTATION_MS = 3500;

/**
 * News & Events as a horizontal strip.
 *
 * ## Built on native scrolling
 *
 * The strip is an ordinary overflow container with CSS scroll-snap: it swipes
 * on touch, scrolls with a trackpad, responds to Shift+wheel, and keeps working
 * if this script never loads. The arrow buttons are the only JavaScript — they
 * scroll by one card's width and disable themselves at either end, which they
 * learn from the scroll position rather than from a slide index that could
 * drift out of step with what the visitor dragged to. Keyboard users have the
 * same buttons, and current browsers make a scroll container focusable on
 * their own, so the list carries no tabindex of its own.
 *
 * ## Posters versus photographs
 *
 * Photographs are cropped to fill the 4:3 frame. Posters and collages carry
 * text or panels to their edges, so they are contained on a tinted ground
 * instead — see `CentreNewsItem.fit`.
 *
 * ## Rotation
 *
 * The strip moves on by one card every few seconds and, at the end, jumps
 * straight back to the first card rather than scrolling backwards through the
 * whole list. The arrows wrap the same way, and pressing one restarts the
 * timer so the chosen position gets a full turn. The scrollbar is hidden; the
 * strip still swipes and scrolls. `prefers-reduced-motion` turns the rotation
 * off.
 *
 * The items have no pages of their own on the Delhi site, so the cards are not
 * links; they are a record of the Centre's activity.
 */
export function CentreNewsCarousel({ items }: { items: readonly CentreNewsItem[] }) {
  const track = useRef<HTMLUListElement>(null);
  /** Bumped on a manual step purely to restart the interval below. */
  const [restartKey, setRestartKey] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  /**
   * One card forward or back. Past either end it wraps, and the wrap is an
   * instant jump, never a smooth scroll back across every card.
   */
  const step = useCallback(
    (direction: 1 | -1) => {
      const el = track.current;
      const card = el?.querySelector('li');
      if (!el || !card) return;
      const atStart = el.scrollLeft <= 4;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      if (direction === 1 && atEnd) {
        el.scrollTo({ left: 0, behavior: 'instant' });
        return;
      }
      if (direction === -1 && atStart) {
        el.scrollTo({ left: el.scrollWidth, behavior: 'instant' });
        return;
      }
      el.scrollBy({
        left: direction * (card.clientWidth + 24),
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    },
    [reducedMotion],
  );

  useEffect(() => {
    if (reducedMotion || items.length < 2) return;
    const timer = setInterval(() => {
      step(1);
    }, ROTATION_MS);
    return () => {
      clearInterval(timer);
    };
    // `restartKey` is not read in the body — it restarts the interval after a
    // manual step, so the chosen position gets a full turn.
  }, [reducedMotion, items.length, step, restartKey]);

  const press = (direction: 1 | -1) => {
    step(direction);
    setRestartKey((key) => key + 1);
  };

  const arrow =
    'flex size-11 items-center justify-center rounded-full border border-brand bg-brand text-white transition-colors duration-300 hover:border-accent-surface hover:bg-accent-surface hover:text-brand-950';

  return (
    <div>
      <div className="mb-6 flex justify-end gap-3 md:-mt-[4.25rem] md:mb-8">
        <button
          type="button"
          onClick={() => {
            press(-1);
          }}
          aria-label="Previous news items"
          className={arrow}
        >
          <ArrowRightIcon size={18} className="rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => {
            press(1);
          }}
          aria-label="Next news items"
          className={arrow}
        >
          <ArrowRightIcon size={18} />
        </button>
      </div>

      <ul
        ref={track}
        aria-label="News and events"
        className="-mx-6 flex snap-x snap-mandatory scroll-px-6 [scrollbar-width:none] gap-6 overflow-x-auto px-6 pb-2 focus-visible:outline-offset-4 md:mx-0 md:scroll-px-0 md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <li
            key={item.id}
            className="w-[78%] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] xl:w-[calc((100%-4.5rem)/4)]"
          >
            <figure className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[5px] bg-surface-subtle">
                {/* A lime bar that sweeps across the foot of the photograph on hover. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 z-10 h-1 origin-left scale-x-0 bg-accent-surface transition-transform duration-700 ease-out group-hover:scale-x-100"
                />
                <Image
                  src={item.image.src}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 280px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 78vw"
                  className={`transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04] ${item.fit === 'contain' ? 'object-contain p-2' : 'object-cover'}`}
                />
              </div>
              <figcaption className="mt-3.5 text-[0.9375rem] leading-snug font-semibold text-ink-strong transition-colors duration-500 group-hover:text-brand">
                {item.title}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
