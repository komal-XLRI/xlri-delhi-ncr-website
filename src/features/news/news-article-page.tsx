import Image from 'next/image';
import Link from 'next/link';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ArrowRightIcon, CalendarIcon, ExternalIcon } from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import { fill } from '@/lib/format/template';
import type { NewsArticlePage, NewsBlock } from '@/types/news';

import { MarkedText } from './marked-text';
import { NewsCard } from './news-card';
import { newsDate } from './news-dates';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';
const PROSE = 'text-[1.0625rem] leading-[1.85] text-ink md:text-lg md:leading-[1.85]';
const delay = (ms: number) => ({ ['--rise-delay' as string]: `${ms}ms` });

/** One block of the story's text. */
function Block({ block, newTab }: { block: NewsBlock; newTab: string }) {
  switch (block.kind) {
    case 'p':
      return (
        <p className={PROSE}>
          <MarkedText text={block.text} newTab={newTab} />
        </p>
      );
    case 'h':
      return (
        <h2 className="pt-4 font-serif text-[clamp(1.375rem,2.2vw,1.75rem)] leading-tight text-ink-strong">
          {block.text}
        </h2>
      );
    case 'list':
      return (
        <ul className="flex flex-col gap-3">
          {block.items.map((item) => (
            <li key={item} className={`flex gap-3 ${PROSE}`}>
              <span
                aria-hidden="true"
                className="mt-[0.8em] size-1.5 shrink-0 rounded-full bg-accent-600"
              />
              <span>
                <MarkedText text={item} newTab={newTab} />
              </span>
            </li>
          ))}
        </ul>
      );
    case 'quote':
      return (
        <figure className="relative my-2 rounded-[8px] bg-brand px-7 py-8 text-white md:px-10 md:py-10">
          <span
            aria-hidden="true"
            className="absolute -top-5 left-7 font-serif text-7xl leading-none text-accent-surface md:left-10"
          >
            “
          </span>
          <blockquote className="font-serif text-lg leading-relaxed md:text-xl">
            <MarkedText text={block.text} newTab={newTab} />
          </blockquote>
          {block.cite ? (
            <figcaption className="mt-5 text-sm font-semibold tracking-[0.06em] text-accent-surface">
              — {block.cite}
            </figcaption>
          ) : null}
        </figure>
      );
    case 'link':
      return (
        <p>
          <a
            href={block.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full bg-brand py-2.5 pr-6 pl-2.5 text-[0.9375rem] font-semibold text-white transition-colors duration-300 hover:bg-brand-950"
          >
            <span className="flex size-8 items-center justify-center rounded-full bg-accent-surface text-brand-950">
              <ExternalIcon size={14} aria-hidden="true" />
            </span>
            {block.label}
            <span className="sr-only"> {newTab}</span>
          </a>
        </p>
      );
    default: {
      const unknown: never = block;
      throw new Error(`news.json: unknown block ${JSON.stringify(unknown)}`);
    }
  }
}

/**
 * One story, at its live address (`/corporate-confluence-2025`): the date
 * and title, the lead picture, the text in a reading column, the story's
 * other photographs, and three more stories.
 */
export function NewsArticle({ content }: { content: NewsArticlePage }) {
  const { copy, story, listing, more } = content;
  const gallery = story.gallery ?? [];

  return (
    <article aria-labelledby="story-heading">
      {/* ---------------- head ---------------- */}
      <section data-motif="hero" className="relative isolate overflow-hidden bg-surface">
        <div className={`${MEASURE} pt-8 pb-12 md:pt-10 md:pb-16`}>
          <Breadcrumbs
            items={[
              { label: 'Home', href: routes.home },
              { label: listing.section },
              { label: listing.title, href: routes.news.index },
              { label: story.title },
            ]}
          />
          <div className="mx-auto mt-10 max-w-4xl text-center md:mt-14">
            <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase">
              {copy.eyebrow}
              <span aria-hidden="true" className="size-1 rounded-full bg-accent-600" />
              <time dateTime={story.date} className="flex items-center gap-2 tracking-[0.1em]">
                <CalendarIcon size={15} aria-hidden="true" />
                {newsDate(story.date)}
              </time>
            </p>
            <h1
              id="story-heading"
              className="mt-4 font-serif text-[clamp(2rem,4.4vw,3.25rem)] leading-[1.1] tracking-[-0.03em] text-balance text-brand"
            >
              {story.title}
            </h1>
            <span
              aria-hidden="true"
              className="rule-draw mx-auto mt-6 block h-[3px] w-14 bg-accent-surface"
            />
            {story.standfirst ? (
              <p
                className="rise-in mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted md:text-xl"
                style={delay(150)}
              >
                {story.standfirst}
              </p>
            ) : null}
          </div>

          <figure
            className="rise-in group relative mx-auto mt-10 max-w-5xl md:mt-12"
            style={delay(200)}
          >
            <span
              aria-hidden="true"
              className="absolute -right-3 -bottom-3 hidden h-full w-full rounded-[8px] border-2 border-accent-surface/70 transition-[translate,border-color] duration-700 ease-out group-hover:translate-x-1.5 group-hover:translate-y-1.5 group-hover:border-accent-surface md:block"
            />
            <div className="relative flex justify-center overflow-hidden rounded-[8px] bg-surface-inverse shadow-raised">
              <Image
                src={story.image.src}
                alt={story.image.alt}
                width={story.image.width}
                height={story.image.height}
                preload
                sizes="(min-width: 1280px) 1024px, 100vw"
                className="h-auto max-h-[78vh] w-auto max-w-full object-contain"
              />
            </div>
          </figure>
        </div>
      </section>

      {/* ---------------- the story ---------------- */}
      {story.body.length > 0 ? (
        <section className="bg-surface">
          <div className={`${MEASURE} pb-14 md:pb-20`}>
            <div className="mx-auto flex max-w-3xl flex-col gap-6">
              {story.body.map((block, index) => (
                <Block key={index} block={block} newTab={copy.opensNewTab} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ---------------- photographs ---------------- */}
      {gallery.length > 0 ? (
        <section aria-labelledby="gallery-heading" className="bg-surface-subtle">
          <div className={`${MEASURE} py-14 md:py-20`}>
            <h2
              id="gallery-heading"
              className="font-serif text-[clamp(1.5rem,2.6vw,2rem)] leading-tight tracking-[-0.02em] text-ink-strong"
            >
              {copy.galleryHeading}
            </h2>
            <span aria-hidden="true" className="mt-4 block h-[3px] w-10 bg-accent-surface" />
            <ul
              className={`mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 ${gallery.length > 2 ? 'lg:grid-cols-3' : ''}`}
            >
              {gallery.map((image, index) => (
                <li
                  key={image.src}
                  className="reveal group overflow-hidden rounded-[8px] bg-surface-inverse"
                  style={{ ['--reveal-start' as string]: `${String(4 + (index % 3) * 6)}%` }}
                >
                  <Image
                    src={image.src}
                    alt={
                      image.alt ||
                      fill(copy.galleryAlt, {
                        title: story.title,
                        n: index + 1,
                        count: gallery.length,
                      })
                    }
                    width={image.width}
                    height={image.height}
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                    className="aspect-[3/2] h-auto w-full object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* ---------------- more news ---------------- */}
      {more.length > 0 ? (
        <section
          aria-labelledby="more-heading"
          className={gallery.length > 0 ? 'bg-surface' : 'bg-surface-subtle'}
        >
          <div className={`${MEASURE} py-14 md:py-20`}>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2
                  id="more-heading"
                  className="font-serif text-[clamp(1.5rem,2.6vw,2rem)] leading-tight tracking-[-0.02em] text-ink-strong"
                >
                  {copy.more}
                </h2>
                <span aria-hidden="true" className="mt-4 block h-[3px] w-10 bg-accent-surface" />
              </div>
              <Link
                href={routes.news.index}
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand"
              >
                {copy.back}
                <ArrowRightIcon
                  size={14}
                  aria-hidden="true"
                  className="text-accent-700 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
            <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {more.map((other, index) => (
                <NewsCard key={other.slug} story={other} action={listing.readMore} index={index} />
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </article>
  );
}
