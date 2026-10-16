import Image from 'next/image';
import Link from 'next/link';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ArrowRightIcon, BookIcon, ExternalIcon, SearchIcon } from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import { fill } from '@/lib/format/template';
import { ServiceGallery } from '@/features/campus-life/service-gallery';
import type { LibraryContent } from '@/types/library';

import { BookShelf } from './book-shelf';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';
const H2 =
  'font-serif text-[clamp(1.875rem,3.4vw,2.75rem)] leading-tight tracking-[-0.02em] text-ink-strong';
const LIFT =
  'transition-[translate,box-shadow,border-color] duration-500 ease-out hover:border-accent-surface hover:shadow-raised motion-safe:hover:-translate-y-1';
const EYEBROW = 'text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase';
const RULE = 'mt-5 block h-[3px] w-10 bg-accent-surface';
const delay = (ms: number) => ({ ['--rise-delay' as string]: `${ms}ms` });
const stagger = (i: number, columns: number) => ({
  ['--reveal-start' as string]: `${String(4 + (i % columns) * 6)}%`,
});

/**
 * Campus Life › Library — the Learning Resource Centre.
 *
 *  1. **Hero** — title, introduction, the catalogue and remote-access links,
 *     and the library in photographs.
 *  2. **Collection at a glance** — the six figures.
 *  3. **Three floors**, 4. **Hours** and **Finding a book**,
 *  5. **Newspapers & magazines**, 6. **New arrivals**, 7. **Gallery**.
 *
 * The library's menu is the submenu bar above, from the section layout.
 *
 * Content comes from `content/campus-life/library.json`.
 */
export function LibraryHome({ content }: { content: LibraryContent }) {
  const [lead, ...rest] = content.intro.split('. ');
  const copy = content.home;

  return (
    <article aria-labelledby="library-heading">
      {/* ---------------- hero ---------------- */}
      <section data-motif="hero" className="relative isolate overflow-hidden bg-surface">
        <div className={`${MEASURE} pt-8 pb-16 md:pt-10 md:pb-20`}>
          <Breadcrumbs
            items={[
              { label: 'Home', href: routes.home },
              { label: 'Campus Life' },
              { label: content.title },
            ]}
          />
          <div className="mt-8 grid grid-cols-1 items-center gap-12 md:mt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
            <div>
              <p className={`flex items-center gap-2.5 ${EYEBROW}`}>
                <BookIcon size={18} aria-hidden="true" />
                {content.subtitle}
              </p>
              <h1
                id="library-heading"
                className="mt-3 font-serif text-[clamp(2.5rem,5.5vw,4rem)] leading-[1.02] tracking-[-0.03em] text-brand"
              >
                {content.title}
              </h1>
              <span
                aria-hidden="true"
                className="rule-draw mt-6 block h-[3px] w-14 origin-left bg-accent-surface"
              />
              <p className="rise-in mt-6 text-lg leading-[1.75] text-ink" style={delay(150)}>
                {lead}. {rest[0]}.
              </p>
              <div className="rise-in mt-8 flex flex-wrap gap-3" style={delay(250)}>
                <a
                  href={content.catalogue.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full bg-brand px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-brand-950"
                >
                  <SearchIcon size={18} aria-hidden="true" />
                  {copy.hero.catalogueButton}
                  <span className="sr-only">
                    {' '}
                    (OPAC, on the campus network; opens in a new tab)
                  </span>
                </a>
                <a
                  href={content.remote.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full border border-border-strong px-6 py-3 font-semibold text-ink-strong transition-colors duration-300 hover:border-brand hover:text-brand"
                >
                  {copy.hero.remoteButton}
                  <ExternalIcon size={14} aria-hidden="true" className="text-accent-700" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
              <p className="rise-in mt-3 text-sm text-ink-muted" style={delay(300)}>
                {fill(copy.hero.accessNote, { remote: content.remote.label })}
              </p>
            </div>
            <div className="rise-in" style={delay(250)}>
              <ServiceGallery
                photos={content.photos}
                title={content.title}
                preload
                corner="right"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- at a glance ---------------- */}
      <section aria-labelledby="glance-heading" className="bg-brand text-white">
        <div className={`${MEASURE} py-12 md:py-14`}>
          <h2
            id="glance-heading"
            className="text-sm font-semibold tracking-[0.18em] text-accent-surface uppercase"
          >
            {copy.glance.title}
          </h2>
          <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-[8px] bg-white/15 sm:grid-cols-3 lg:grid-cols-6">
            {content.facts.map((fact, index) => (
              <div
                key={fact.label}
                className="reveal group flex flex-col-reverse bg-brand px-5 py-6 transition-colors duration-500 hover:bg-brand-950"
                style={stagger(index, 6)}
              >
                <dt className="mt-2 text-sm text-white/75">{fact.label}</dt>
                <dd className="font-serif text-[clamp(2rem,3.4vw,2.75rem)] leading-none tabular-nums">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------------- floors ---------------- */}
      <section aria-labelledby="floors-heading" className="bg-surface">
        <div
          className={`${MEASURE} grid grid-cols-1 gap-12 py-16 md:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16 lg:py-24`}
        >
          <div>
            <p className={EYEBROW}>{copy.floors.eyebrow}</p>
            <h2 id="floors-heading" className={`mt-3 ${H2}`}>
              {copy.floors.title}
            </h2>
            <span aria-hidden="true" className={RULE} />
            <p className="mt-6 text-[1.0625rem] leading-[1.8] text-ink">
              {rest.slice(1).join('. ')}
            </p>
          </div>
          {/* The building, top floor first. */}
          <ol className="flex flex-col-reverse gap-3">
            {content.floors.map((floor, index) => (
              <li key={floor.level} className="reveal" style={stagger(index, 3)}>
                <div
                  className={`group relative grid grid-cols-[6.5rem_minmax(0,1fr)] overflow-hidden rounded-[8px] border border-border bg-surface-subtle ${LIFT}`}
                >
                  <span className="flex flex-col justify-center bg-brand px-4 py-5 text-white transition-colors duration-500 group-hover:bg-brand-950">
                    <span className="font-serif text-3xl leading-none">{floor.badge}</span>
                    <span className="mt-1 text-xs text-white/75">{floor.level}</span>
                  </span>
                  <span className="p-5 md:p-6">
                    <span className="block font-serif text-xl text-ink-strong">{floor.title}</span>
                    <span className="mt-2 block leading-relaxed text-ink">{floor.text}</span>
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- hours + finding a book ---------------- */}
      <section aria-labelledby="hours-heading" className="bg-surface-subtle">
        <div
          className={`${MEASURE} grid grid-cols-1 gap-10 py-16 md:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16 lg:py-24`}
        >
          <div className="lg:sticky lg:top-40 lg:self-start">
            <div className="rounded-[8px] bg-brand p-7 text-white md:p-8">
              <p className="font-serif text-6xl leading-none text-accent-surface">
                {copy.hours.badge}
              </p>
              <p className="mt-3 leading-relaxed text-white/90">{content.hours.always}</p>
            </div>
            <div className="mt-4 rounded-[8px] border border-border bg-surface p-6 md:p-7">
              <h2
                id="hours-heading"
                className="text-xs font-semibold tracking-[0.16em] text-ink-muted uppercase"
              >
                {copy.hours.title}
              </h2>
              <dl className="mt-4 flex flex-col divide-y divide-border">
                {content.hours.week.map((row) => (
                  <div key={row.days} className="flex items-baseline justify-between gap-4 py-3">
                    <dt className="text-ink">{row.days}</dt>
                    <dd className="font-semibold whitespace-nowrap text-ink-strong tabular-nums">
                      {row.time}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div>
            <p className={EYEBROW}>{copy.arrangements.eyebrow}</p>
            <h2 className={`mt-3 ${H2}`}>{copy.arrangements.title}</h2>
            <span aria-hidden="true" className={RULE} />
            <ol className="mt-8 flex flex-col gap-4">
              {content.arrangements.map((paragraph, index) => (
                <li key={paragraph.slice(0, 30)} className="reveal flex gap-5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-surface font-serif text-lg text-brand-950 tabular-nums">
                    {index + 1}
                  </span>
                  <p className="leading-[1.8] text-ink">{paragraph}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------------- newspapers & magazines ---------------- */}
      <section aria-labelledby="print-heading" className="bg-surface">
        <div className={`${MEASURE} py-16 md:py-20 lg:py-24`}>
          <p className={EYEBROW}>{copy.print.eyebrow}</p>
          <h2 id="print-heading" className={`mt-3 ${H2}`}>
            {copy.print.title}
          </h2>
          <span aria-hidden="true" className={RULE} />
          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-14">
            <div>
              <h3 className="font-serif text-xl text-ink-strong">
                {copy.print.newspapers}{' '}
                <span className="text-ink-muted">({content.newspapers.length})</span>
              </h3>
              <ul className="mt-4 flex flex-col gap-2">
                {content.newspapers.map((paper) => (
                  <li
                    key={paper}
                    className="rounded-[6px] border border-border bg-surface-subtle px-4 py-3 font-serif text-lg text-ink-strong"
                  >
                    {paper}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-xl text-ink-strong">
                {copy.print.magazines}{' '}
                <span className="text-ink-muted">({content.magazines.length})</span>
              </h3>
              <ul className="mt-4 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                {content.magazines.map((magazine) => (
                  <li
                    key={magazine.title}
                    className="flex items-baseline justify-between gap-3 border-b border-border py-2.5"
                  >
                    <span className="text-ink-strong">{magazine.title}</span>
                    <span className="shrink-0 text-sm text-ink-muted">
                      {magazine.frequency} · {fill(copy.print.perYear, { issues: magazine.issues })}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- new arrivals ---------------- */}
      {content.newArrivals.length > 0 ? (
        <section aria-labelledby="arrivals-heading" className="bg-surface-subtle">
          <div
            className={`${MEASURE} grid grid-cols-1 gap-10 py-16 md:py-20 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-14 lg:py-24`}
          >
            <div className="lg:pt-4">
              <p className={EYEBROW}>{copy.newArrivals.eyebrow}</p>
              <h2 id="arrivals-heading" className={`mt-3 ${H2}`}>
                {copy.newArrivals.title}
              </h2>
              <span aria-hidden="true" className={RULE} />
              <div className="mt-8 rounded-[8px] border border-t-[3px] border-border border-t-accent-surface bg-surface p-6">
                <p className="flex items-baseline gap-2">
                  <span className="font-serif text-5xl leading-none text-brand tabular-nums">
                    {content.newArrivals.length}
                  </span>
                  <span className="text-ink-muted">{copy.newArrivals.countLabel}</span>
                </p>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink">
                  {copy.newArrivals.note}
                </p>
              </div>
            </div>
            <div className="min-w-0">
              <BookShelf books={content.newArrivals} badge={copy.newArrivals.badge} />
            </div>
          </div>
        </section>
      ) : null}

      {/* ---------------- gallery ---------------- */}
      <section aria-labelledby="gallery-strip-heading" className="bg-surface">
        <div className={`${MEASURE} py-16 md:py-20`}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className={EYEBROW}>{copy.gallery.eyebrow}</p>
              <h2 id="gallery-strip-heading" className={`mt-3 ${H2}`}>
                {copy.gallery.title}
              </h2>
              <span aria-hidden="true" className={RULE} />
            </div>
            <Link
              href={routes.campusLife.libraryPage('gallery')}
              className="group inline-flex items-center gap-2 font-semibold text-brand"
            >
              {fill(copy.gallery.allLink, { count: content.gallery.length })}
              <ArrowRightIcon
                size={16}
                aria-hidden="true"
                className="transition-transform duration-500 group-hover:translate-x-1"
              />
            </Link>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {[8, 18, 25, 33].map((n, index) => {
              const photo = content.gallery[n];
              if (!photo) return null;
              return (
                <li key={photo.src} className="reveal" style={stagger(index, 4)}>
                  <Link
                    href={routes.campusLife.libraryPage('gallery')}
                    className="group relative block aspect-4/3 overflow-hidden rounded-[8px] bg-surface-inverse"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 768px) 25vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.05]"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </article>
  );
}
