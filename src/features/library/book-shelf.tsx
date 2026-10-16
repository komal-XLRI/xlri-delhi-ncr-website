'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

import { ArrowRightIcon } from '@/components/ui/icon';
import type { LibraryContent } from '@/types/library';

const ROUND =
  'flex size-11 cursor-pointer items-center justify-center rounded-full border border-border-strong bg-surface text-brand shadow-sm transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-white disabled:cursor-default disabled:opacity-35 disabled:hover:border-border-strong disabled:hover:bg-surface disabled:hover:text-brand';

/**
 * New arrivals as a bookshelf: covers standing on a shelf, title and author
 * beneath, arrows to move along and a lime line showing how far you are.
 * The row is a native scroller (touch and trackpad work), its scrollbar hidden.
 */
export function BookShelf({
  books,
  badge,
}: {
  books: LibraryContent['newArrivals'];
  /** The tag on each cover: "New". */
  badge: string;
}) {
  const track = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState({ start: true, end: false, ratio: 0, visible: 1 });

  const measure = useCallback(() => {
    const node = track.current;
    if (!node) return;
    const max = node.scrollWidth - node.clientWidth;
    setProgress({
      start: node.scrollLeft <= 2,
      end: node.scrollLeft >= max - 2,
      ratio: max > 0 ? node.scrollLeft / max : 0,
      visible: node.scrollWidth > 0 ? node.clientWidth / node.scrollWidth : 1,
    });
  }, []);

  useEffect(() => {
    const node = track.current;
    if (!node) return;
    measure();
    node.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      node.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  const move = (direction: 1 | -1) => {
    const node = track.current;
    if (!node) return;
    node.scrollBy({ left: direction * node.clientWidth * 0.8, behavior: 'smooth' });
  };

  const scrolls = progress.visible < 0.999;

  return (
    <div>
      <div className="relative">
        <ul
          ref={track}
          className="-mx-6 flex snap-x snap-mandatory scroll-px-6 [scrollbar-width:none] gap-6 overflow-x-auto px-6 pt-4 pb-1 md:mx-0 md:scroll-px-1 md:gap-8 md:px-1 [&::-webkit-scrollbar]:hidden"
        >
          {books.map((book, index) => (
            <li key={book.cover.src} className="w-40 shrink-0 snap-start md:w-44">
              <figure className="group">
                {/* The cover stands on the shelf; it lifts and tilts on hover. */}
                <div className="relative flex h-60 items-end md:h-64">
                  <div className="relative aspect-2/3 w-full origin-bottom overflow-hidden rounded-l-[2px] rounded-r-[4px] bg-surface-inverse shadow-[6px_8px_18px_-6px_rgb(10_37_84/0.45)] transition-[translate,rotate,box-shadow] duration-500 ease-out group-hover:shadow-[10px_18px_28px_-8px_rgb(10_37_84/0.5)] motion-safe:group-hover:-translate-y-3 motion-safe:group-hover:-rotate-2">
                    <Image
                      src={book.cover.src}
                      alt={book.cover.alt}
                      fill
                      sizes="176px"
                      className="object-cover"
                    />
                    {/* Spine: a soft fold on the left edge. */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 w-2.5 bg-linear-to-r from-black/35 via-white/15 to-transparent"
                    />
                    <span className="absolute top-2 right-2 rounded-full bg-accent-surface px-2 py-0.5 text-[0.625rem] font-bold tracking-[0.12em] text-brand-950 uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {badge}
                    </span>
                  </div>
                </div>
                <figcaption className="mt-5">
                  <span className="block text-[0.6875rem] font-semibold tracking-[0.16em] text-accent-700 tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="mt-1 line-clamp-2 block font-serif text-[1.0625rem] leading-snug text-ink-strong transition-colors duration-300 group-hover:text-brand">
                    {book.title}
                  </span>
                  <span className="mt-1 line-clamp-2 block text-sm leading-snug text-ink-muted">
                    {book.author}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        {/* The shelf the covers stand on. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[calc(1rem+15rem)] -mx-2 h-3 rounded-[2px] bg-linear-to-b from-brand-50 to-border shadow-[0_10px_18px_-8px_rgb(10_37_84/0.35)] md:top-[calc(1rem+16rem)]"
        />
      </div>

      {scrolls ? (
        <div className="mt-8 flex items-center gap-5">
          <div
            aria-hidden="true"
            className="relative h-1 flex-1 overflow-hidden rounded-full bg-border"
          >
            <span
              className="absolute inset-y-0 rounded-full bg-accent-surface transition-[left] duration-300 ease-out"
              style={{
                width: `${String(progress.visible * 100)}%`,
                left: `${String(progress.ratio * (1 - progress.visible) * 100)}%`,
              }}
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                move(-1);
              }}
              disabled={progress.start}
              aria-label="Earlier books"
              className={ROUND}
            >
              <ArrowRightIcon size={18} className="rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => {
                move(1);
              }}
              disabled={progress.end}
              aria-label="More books"
              className={ROUND}
            >
              <ArrowRightIcon size={18} />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
