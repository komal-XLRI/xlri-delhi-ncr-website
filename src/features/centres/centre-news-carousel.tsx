'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

import { ArrowRightIcon } from '@/components/ui/icon';
import type { CentreNewsItem } from '@/types/centre';

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
 * The items have no pages of their own on the Delhi site, so the cards are not
 * links; they are a record of the Centre's activity.
 */
export function CentreNewsCarousel({ items }: { items: readonly CentreNewsItem[] }) {
  const track = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    const el = track.current;
    if (!el) return;
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [update]);

  const step = (direction: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector('li');
    if (!el || !card) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({
      left: direction * (card.clientWidth + 24),
      behavior: reduce ? 'auto' : 'smooth',
    });
  };

  const arrow =
    'flex size-11 items-center justify-center rounded-full border border-border-strong text-ink-strong transition-colors hover:border-brand hover:bg-brand hover:text-white disabled:pointer-events-none disabled:opacity-35';

  return (
    <div>
      <div className="mb-6 flex justify-end gap-3 md:-mt-[4.25rem] md:mb-8">
        <button
          type="button"
          onClick={() => step(-1)}
          disabled={atStart}
          aria-label="Previous news items"
          className={arrow}
        >
          <ArrowRightIcon size={18} className="rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          disabled={atEnd}
          aria-label="Next news items"
          className={arrow}
        >
          <ArrowRightIcon size={18} />
        </button>
      </div>

      <ul
        ref={track}
        aria-label="News and events"
        className="-mx-6 flex snap-x snap-mandatory scroll-px-6 [scrollbar-width:thin] gap-6 overflow-x-auto px-6 pb-4 focus-visible:outline-offset-4 md:mx-0 md:scroll-px-0 md:px-0"
      >
        {items.map((item) => (
          <li
            key={item.id}
            className="w-[78%] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] xl:w-[calc((100%-4.5rem)/4)]"
          >
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[5px] bg-surface-subtle">
                <Image
                  src={item.image.src}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 280px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 78vw"
                  className={item.fit === 'contain' ? 'object-contain p-2' : 'object-cover'}
                />
              </div>
              <figcaption className="mt-3.5 text-[0.9375rem] leading-snug font-semibold text-ink-strong">
                {item.title}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
