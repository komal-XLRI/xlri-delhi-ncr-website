import Image from 'next/image';
import Link from 'next/link';

import { ArrowRightIcon, CalendarIcon } from '@/components/ui/icon';
import type { NewsStory } from '@/types/news';

import { newsDate } from './news-dates';

/**
 * One story: its picture, the date, the title, the opening lines where there
 * are any, and "Read More". The whole card is the link.
 */
export function NewsCard({
  story,
  action,
  index = 0,
}: {
  story: NewsStory;
  action: string;
  /** Position in its row, for the staggered reveal. */
  index?: number;
}) {
  return (
    <li
      className="reveal"
      style={{ ['--reveal-start' as string]: `${String(4 + (index % 3) * 6)}%` }}
    >
      <Link
        href={story.href}
        className="group relative flex h-full flex-col overflow-hidden rounded-[8px] border border-border bg-surface transition-[translate,box-shadow,border-color] duration-500 ease-out hover:border-accent-surface hover:shadow-raised motion-safe:hover:-translate-y-1"
      >
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 z-10 h-1 origin-left scale-x-0 bg-accent-surface transition-transform duration-700 ease-out group-hover:scale-x-100"
        />
        <span className="relative block aspect-[16/10] overflow-hidden bg-surface-inverse">
          <Image
            src={story.image.src}
            alt={story.image.alt}
            fill
            sizes="(min-width: 1280px) 384px, (min-width: 768px) 45vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
          />
        </span>
        <span className="flex flex-1 flex-col p-5 md:p-6">
          <time
            dateTime={story.date}
            className="flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-accent-700 uppercase"
          >
            <CalendarIcon size={14} aria-hidden="true" />
            {newsDate(story.date)}
          </time>
          <span className="mt-3 font-serif text-xl leading-snug text-ink-strong transition-colors duration-300 group-hover:text-brand">
            {story.title}
          </span>
          {story.excerpt ? (
            <span className="mt-3 line-clamp-3 text-[0.9375rem] leading-relaxed text-ink">
              {story.excerpt}
            </span>
          ) : null}
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
