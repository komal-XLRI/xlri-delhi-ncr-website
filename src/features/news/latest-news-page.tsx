import Image from 'next/image';
import Link from 'next/link';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ArrowRightIcon, CalendarIcon, FileIcon } from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import { fill, plural } from '@/lib/format/template';
import type { LatestNewsPage, NewsStory } from '@/types/news';

import { NewsCard } from './news-card';
import { newsDate, yearOf } from './news-dates';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';
const EYEBROW = 'text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase';
const delay = (ms: number) => ({ ['--rise-delay' as string]: `${ms}ms` });

/** The stories by year, newest year first, each year's stories in list order. */
function byYear(stories: readonly NewsStory[]) {
  const years = new Map<string, NewsStory[]>();
  for (const story of stories) {
    const year = yearOf(story.date);
    years.set(year, [...(years.get(year) ?? []), story]);
  }
  return [...years.entries()].sort(([a], [b]) => b.localeCompare(a));
}

/**
 * Campus Life › Latest News — the same shape as Latest Events, so the two
 * read as a pair.
 *
 *  1. **Hero** — title, introduction, three figures, and the latest story as
 *     a spotlight with its opening lines.
 *  2. **The stories** — year by year, with links to jump between years; each
 *     card opens the story.
 *
 * Content comes from `content/news.json`; pictures are in
 * `public/media/news/`.
 */
export function LatestNews({ content }: { content: LatestNewsPage }) {
  const { copy, stories } = content;
  const years = byYear(stories);
  const latest = stories[0];
  const newest = years[0]?.[0];
  const oldest = years.at(-1)?.[0];
  const facts = [
    { value: String(stories.length), label: copy.facts.stories },
    {
      value:
        newest && oldest && newest !== oldest ? `${oldest}–${newest.slice(2)}` : (newest ?? ''),
      label: copy.facts.years,
    },
    {
      value: latest
        ? new Intl.DateTimeFormat('en-GB', {
            timeZone: 'UTC',
            month: 'short',
            year: 'numeric',
          }).format(new Date(`${latest.date}T00:00:00Z`))
        : '',
      label: copy.facts.latest,
    },
  ];

  return (
    <article aria-labelledby="news-heading">
      {/* ---------------- hero ---------------- */}
      <section data-motif="hero" className="relative isolate overflow-hidden bg-surface">
        <div className={`${MEASURE} pt-8 pb-16 md:pt-10 md:pb-20`}>
          <Breadcrumbs
            items={[
              { label: 'Home', href: routes.home },
              { label: copy.section },
              { label: copy.title },
            ]}
          />

          <div className="mt-8 grid grid-cols-1 items-end gap-10 md:mt-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <p className={`flex items-center gap-2.5 ${EYEBROW}`}>
                <FileIcon size={18} aria-hidden="true" />
                {copy.eyebrow}
              </p>
              <h1
                id="news-heading"
                className="mt-3 font-serif text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.03] tracking-[-0.03em] text-balance text-brand"
              >
                {copy.title}
              </h1>
              <span
                aria-hidden="true"
                className="rule-draw mt-6 block h-[3px] w-14 origin-left bg-accent-surface"
              />
              <p
                className="rise-in mt-6 max-w-2xl text-lg leading-[1.75] text-ink md:text-[1.1875rem]"
                style={delay(150)}
              >
                {copy.intro}
              </p>
            </div>

            <dl
              className="rise-in grid grid-cols-3 overflow-hidden rounded-[8px] border border-border"
              style={delay(200)}
            >
              {facts.map((fact, index) => (
                // Label first in the DOM (a <dt> must precede its <dd>), figure
                // first on screen.
                <div
                  key={fact.label}
                  className={`group relative flex flex-col-reverse justify-end bg-surface-subtle px-4 py-5 transition-colors duration-500 hover:bg-surface sm:px-6 sm:py-6 ${index > 0 ? 'border-l border-border' : ''}`}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent-surface transition-transform duration-700 ease-out group-hover:scale-x-100"
                  />
                  <dt className="mt-2 text-sm leading-snug text-ink-muted">{fact.label}</dt>
                  <dd className="font-serif text-[clamp(1.5rem,2.4vw,2.5rem)] leading-none whitespace-nowrap text-brand">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ---------------- spotlight ---------------- */}
          {latest ? (
            <Link
              href={latest.href}
              className="group rise-in relative mt-12 grid grid-cols-1 overflow-hidden rounded-[8px] border border-border bg-surface-subtle transition-[translate,box-shadow,border-color] duration-500 ease-out hover:border-accent-surface hover:shadow-raised motion-safe:hover:-translate-y-1 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]"
              style={delay(300)}
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 z-10 h-1 origin-left scale-x-0 bg-accent-surface transition-transform duration-700 ease-out group-hover:scale-x-100"
              />
              <span className="relative block aspect-[16/10] overflow-hidden bg-surface-inverse md:aspect-auto md:min-h-96">
                <Image
                  src={latest.image.src}
                  alt={latest.image.alt}
                  fill
                  preload
                  sizes="(min-width: 1280px) 660px, (min-width: 768px) 54vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
                />
              </span>
              <span className="flex flex-col justify-center p-6 md:p-10">
                <span className="inline-flex items-center gap-2 self-start rounded-full bg-accent-surface px-3 py-1 text-xs font-bold tracking-[0.14em] text-brand-950 uppercase">
                  {copy.spotlightBadge}
                </span>
                <time
                  dateTime={latest.date}
                  className="mt-4 flex items-center gap-2 text-sm font-semibold text-accent-700"
                >
                  <CalendarIcon size={16} aria-hidden="true" />
                  {newsDate(latest.date)}
                </time>
                <span className="mt-2 font-serif text-[clamp(1.75rem,3.2vw,2.5rem)] leading-tight text-ink-strong transition-colors duration-300 group-hover:text-brand">
                  {latest.title}
                </span>
                {latest.excerpt ? (
                  <span className="mt-4 line-clamp-4 leading-relaxed text-ink">
                    {latest.excerpt}
                  </span>
                ) : null}
                <span className="mt-6 inline-flex items-center gap-1.5 font-semibold text-brand">
                  {copy.readMore}
                  <ArrowRightIcon
                    size={15}
                    aria-hidden="true"
                    className="text-accent-700 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </span>
            </Link>
          ) : null}
        </div>
      </section>

      {/* ---------------- the stories, year by year ---------------- */}
      <div className="bg-surface-subtle">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <nav aria-label={copy.yearsNav} className="mb-12 flex flex-wrap gap-2 md:mb-14">
            {years.map(([year, list]) => (
              <a
                key={year}
                href={`#year-${year}`}
                className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface px-4 py-2 text-sm font-semibold text-ink-strong transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-white"
              >
                {year}
                <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs text-brand tabular-nums">
                  {list.length}
                </span>
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-16 md:gap-20">
            {years.map(([year, list]) => (
              <section
                key={year}
                id={`year-${year}`}
                aria-labelledby={`year-${year}-heading`}
                className="scroll-mt-[calc(var(--header-height,6rem)+1.5rem)]"
              >
                <div className="flex items-end justify-between gap-6 border-b border-border pb-4">
                  <h2
                    id={`year-${year}-heading`}
                    className="font-serif text-[clamp(2rem,4vw,3rem)] leading-none tracking-[-0.02em] text-brand tabular-nums"
                  >
                    {year}
                  </h2>
                  <p className="text-sm font-semibold text-ink-muted">
                    {fill(plural(list.length, copy.yearCount), { count: list.length })}
                  </p>
                </div>
                <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {list.map((story, index) => (
                    <NewsCard key={story.slug} story={story} action={copy.readMore} index={index} />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
