import Image from 'next/image';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { CompassIcon, SparkIcon } from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import { Avatar } from '@/features/sustainability/avatar';
import type { StudentSocietiesPage } from '@/types/student-societies';

import { SocietyDirectory } from './society-directory';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';
const H2 =
  'font-serif text-[clamp(1.875rem,3.4vw,2.75rem)] leading-tight tracking-[-0.02em] text-ink-strong';
const EYEBROW = 'text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase';
const delay = (ms: number) => ({ ['--rise-delay' as string]: `${ms}ms` });

/**
 * Campus Life › Student Societies.
 *
 *  1. **Hero** — the title, the Delhi page's opening line and three figures
 *     from its text, then the batch photograph wide.
 *  2. **Life at XL** — the introduction, with the annual events it names
 *     drawn out beside it.
 *  3. **Student Affairs Council** — the apex body, on its own: team photo,
 *     what it does, the areas its committees cover and who leads it.
 *  4. **Committees & clubs** — every committee as a card, filterable by kind;
 *     a card opens the committee in full (`SocietyDirectory`).
 *
 * Motion is light and slow: the hero rises in, sections reveal on scroll,
 * cards lift with a lime bar, the dialog fades up. None of it plays under
 * `prefers-reduced-motion`.
 *
 * Content comes from `content/campus-life/student-societies.json`; photos are
 * in `public/media/campus-life/societies/`.
 */
export function StudentSocieties({ content }: { content: StudentSocietiesPage }) {
  const { council, sections } = content;

  return (
    <article aria-labelledby="societies-heading">
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

          <div className="mt-8 grid grid-cols-1 items-end gap-10 md:mt-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <p className={`flex items-center gap-2.5 ${EYEBROW}`}>
                <CompassIcon size={18} aria-hidden="true" />
                {content.eyebrow}
              </p>
              <h1
                id="societies-heading"
                className="mt-3 font-serif text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.03] tracking-[-0.03em] text-balance text-brand"
              >
                {content.title}
              </h1>
              <span
                aria-hidden="true"
                className="rule-draw mt-6 block h-[3px] w-14 origin-left bg-accent-surface"
              />
              <p
                className="rise-in mt-6 max-w-2xl text-lg leading-[1.75] text-ink md:text-[1.1875rem]"
                style={delay(150)}
              >
                {content.lead}
              </p>
            </div>

            {content.facts.length > 0 ? (
              <dl
                className="rise-in grid grid-cols-3 overflow-hidden rounded-[8px] border border-border"
                style={delay(200)}
              >
                {content.facts.map((fact, index) => (
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
                    <dd className="font-serif text-[clamp(1.375rem,2.2vw,2.5rem)] leading-none whitespace-nowrap text-brand">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>

          {/* Rise-in on the figure, the hover lift on the frame inside it: both
              move the element, and the animation would override the hover. */}
          <figure className="rise-in mt-12" style={delay(300)}>
            <div className="group relative aspect-4/3 overflow-hidden rounded-[8px] bg-surface-inverse shadow-raised transition-[translate,box-shadow] duration-500 ease-out hover:shadow-[0_24px_48px_-16px_rgb(10_37_84/0.35)] motion-safe:hover:-translate-y-1.5 sm:aspect-21/9">
              <Image
                src={content.hero.src}
                alt={content.hero.alt}
                fill
                preload
                sizes="(min-width: 1280px) 1184px, 100vw"
                className="object-cover object-[center_40%] transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.02]"
              />
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1.5 origin-left bg-accent-surface transition-[height] duration-500 ease-out group-hover:h-2"
              />
            </div>
          </figure>
        </div>
      </section>

      {/* ---------------- life at XL ---------------- */}
      <section aria-labelledby="life-heading" className="bg-surface-subtle">
        <div
          className={`${MEASURE} grid grid-cols-1 gap-12 py-16 md:py-20 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16 lg:py-24`}
        >
          <div className="reveal">
            <p className={EYEBROW}>{sections.life.eyebrow}</p>
            <h2 id="life-heading" className={`mt-3 ${H2}`}>
              {sections.life.title}
            </h2>
            <span aria-hidden="true" className="mt-5 block h-[3px] w-10 bg-accent-surface" />
            <div className="mt-7 flex flex-col gap-5 text-[1.0625rem] leading-[1.8] text-ink">
              {content.life.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </div>

          <aside aria-labelledby="signature-heading" className="reveal lg:pt-20">
            <div className="rounded-[8px] border border-t-[3px] border-border border-t-accent-surface bg-surface p-6 shadow-raised md:p-8 lg:sticky lg:top-40">
              <p
                id="signature-heading"
                className="flex items-center gap-2.5 text-sm font-semibold tracking-[0.16em] text-ink-muted uppercase"
              >
                <SparkIcon size={16} aria-hidden="true" className="text-accent-700" />
                {sections.annualEvents.title}
              </p>
              <ol className="mt-6 flex flex-col">
                {sections.annualEvents.items.map((event, index) => (
                  <li
                    key={event.name}
                    className={`group flex gap-5 py-5 ${index > 0 ? 'border-t border-border' : 'pt-0'}`}
                  >
                    <span className="font-serif text-3xl leading-none text-brand/25 tabular-nums transition-colors duration-500 group-hover:text-accent-700">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span>
                      <span className="block font-serif text-xl leading-snug text-ink-strong">
                        {event.name}
                      </span>
                      <span className="mt-1 block text-[0.9375rem] text-ink-muted">
                        {event.what}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </section>

      {/* ---------------- student affairs council ---------------- */}
      <section id={council.id} aria-labelledby="council-heading" className="bg-surface">
        <div
          className={`${MEASURE} grid grid-cols-1 items-start gap-12 py-16 md:py-20 lg:grid-cols-2 lg:gap-16 lg:py-24`}
        >
          <div className="reveal relative lg:sticky lg:top-40">
            <span
              aria-hidden="true"
              className="absolute -bottom-3 -left-3 hidden size-28 rounded-[8px] bg-accent-surface/70 sm:block"
            />
            <div className="relative aspect-4/3 overflow-hidden rounded-[8px] bg-surface-inverse shadow-raised">
              <Image
                src={council.photo.src}
                alt={council.photo.alt}
                fill
                sizes="(min-width: 1280px) 560px, (min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="reveal">
            <p className={EYEBROW}>{sections.council.eyebrow}</p>
            <h2 id="council-heading" className={`mt-3 ${H2}`}>
              {council.name} <span className="text-brand">({council.short})</span>
            </h2>
            <span aria-hidden="true" className="mt-5 block h-[3px] w-10 bg-accent-surface" />
            {council.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="mt-6 leading-[1.8] text-ink">
                {paragraph}
              </p>
            ))}
            <ul className="mt-5 flex flex-wrap gap-2">
              {council.areas.map((area) => (
                <li
                  key={area}
                  className="rounded-full border border-border-strong px-3.5 py-1.5 text-sm font-semibold text-ink-strong"
                >
                  {area}
                </li>
              ))}
            </ul>

            <div className="group mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 rounded-[8px] border border-border bg-surface-subtle p-5">
              <div className="flex items-center gap-4">
                <Avatar name={council.lead.name} photo={council.lead.photo} size="sm" />
                <div>
                  <p className="font-semibold text-ink-strong">{council.lead.name}</p>
                  <p className="text-sm text-ink-muted">{council.lead.role}</p>
                </div>
              </div>
              <a
                href={`mailto:${council.email}`}
                className="text-sm font-semibold text-brand underline decoration-accent-surface decoration-2 underline-offset-4 hover:text-brand-950 sm:ml-auto"
              >
                {council.email}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- committees ---------------- */}
      <section aria-labelledby="committees-heading" className="bg-surface-subtle">
        <div className={`${MEASURE} py-16 md:py-20 lg:py-24`}>
          <div className="max-w-3xl">
            <p className={EYEBROW}>{sections.committees.eyebrow}</p>
            <h2 id="committees-heading" className={`mt-3 ${H2}`}>
              {sections.committees.title}
            </h2>
            <span aria-hidden="true" className="mt-5 block h-[3px] w-10 bg-accent-surface" />
            <p className="mt-6 text-[1.0625rem] leading-[1.8] text-ink">
              {sections.committees.intro}
            </p>
          </div>

          <div className="mt-10">
            <SocietyDirectory
              categories={content.categories}
              committees={content.committees}
              labels={content.directory}
            />
          </div>
        </div>
      </section>
    </article>
  );
}
