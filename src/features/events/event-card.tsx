import Image from 'next/image';
import Link from 'next/link';

import { ArrowRightIcon } from '@/components/ui/icon';
import type { LatestEvent } from '@/types/events';

import { badge, yearOf } from './event-dates';

/**
 * One event: its picture with the date pinned to the corner, as on the live
 * listing, the title, and "More Details". The whole card is the link.
 */
export function EventCard({
  event,
  action,
  index = 0,
}: {
  event: LatestEvent;
  action: string;
  /** Position in its row, for the staggered reveal. */
  index?: number;
}) {
  const { day, month } = badge(event.dateLabel);
  return (
    <li
      className="reveal"
      style={{ ['--reveal-start' as string]: `${String(4 + (index % 3) * 6)}%` }}
    >
      <Link
        href={event.href}
        className="group relative flex h-full flex-col overflow-hidden rounded-[8px] border border-border bg-surface transition-[translate,box-shadow,border-color] duration-500 ease-out hover:border-accent-surface hover:shadow-raised motion-safe:hover:-translate-y-1"
      >
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 z-10 h-1 origin-left scale-x-0 bg-accent-surface transition-transform duration-700 ease-out group-hover:scale-x-100"
        />
        <span className="relative block aspect-[4/3] overflow-hidden bg-surface-inverse">
          <Image
            src={event.image.src}
            alt={event.image.alt}
            fill
            sizes="(min-width: 1280px) 384px, (min-width: 768px) 45vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
          />
          {/* Date, as the live listing pins it: day over month. */}
          <time
            dateTime={event.dateTime}
            className="absolute top-4 left-4 flex min-w-14 flex-col items-center rounded-[6px] bg-surface px-3 py-2 text-center shadow-raised"
          >
            <span className="font-serif text-2xl leading-none text-brand tabular-nums">{day}</span>
            <span className="mt-1 text-xs font-semibold tracking-[0.14em] text-accent-700 uppercase">
              {month}
            </span>
            <span className="sr-only"> {yearOf(event.dateTime)}</span>
          </time>
        </span>
        <span className="flex flex-1 flex-col p-5 md:p-6">
          <span className="font-serif text-xl leading-snug text-ink-strong transition-colors duration-300 group-hover:text-brand">
            {event.title}
          </span>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand">
            {action}
            <ArrowRightIcon
              size={14}
              aria-hidden="true"
              className="text-accent-700 transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </span>
      </Link>
    </li>
  );
}
