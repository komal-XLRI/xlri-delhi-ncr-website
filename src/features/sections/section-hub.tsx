import Image from 'next/image';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ArrowRightIcon, ExternalIcon } from '@/components/ui/icon';
import { Link } from '@/components/ui/link';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { plural } from '@/lib/format/template';
import { classifyHref, destinationLabel, isOffsite } from '@/lib/url';
import type { SectionHub } from '@/types/sections';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';
const pad = (n: number) => String(n).padStart(2, '0');
const delay = (ms: number) => ({ ['--rise-delay' as string]: `${ms}ms` });
const stagger = (i: number) => ({ ['--reveal-start' as string]: `${String(4 + (i % 3) * 6)}%` });

/**
 * A section's home page — the page its heading in the menu and the footer
 * opens: the section in a sentence and a photograph, then every page in it
 * as a card, grouped as the menu groups them.
 *
 * Content comes from `content/sections.json` through `services/sections`.
 */
export function SectionHubPage({ content }: { content: SectionHub }) {
  const total = content.groups.reduce((sum, group) => sum + group.links.length, 0);

  return (
    <article aria-labelledby="hub-heading">
      {/* ---------------- hero ---------------- */}
      <section data-motif="hero" className="relative isolate overflow-hidden bg-surface">
        <div className={`${MEASURE} pt-8 pb-14 md:pt-10 md:pb-20`}>
          <Breadcrumbs items={[{ label: 'Home', href: routes.home }, { label: content.title }]} />
          <div className="mt-8 grid grid-cols-1 items-center gap-12 md:mt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
            <div>
              <p className="text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase">
                {content.eyebrow}
              </p>
              <h1
                id="hub-heading"
                className="mt-3 font-serif text-[clamp(2.5rem,5.5vw,4rem)] leading-[1.02] tracking-[-0.03em] text-balance text-brand"
              >
                {content.title}
              </h1>
              <span
                aria-hidden="true"
                className="rule-draw mt-6 block h-[3px] w-14 origin-left bg-accent-surface"
              />
              <p className="rise-in mt-6 text-lg leading-[1.75] text-ink" style={delay(150)}>
                {content.intro}
              </p>
              {/* The groups, as jump links. */}
              {content.groups.length > 1 ? (
                <ul className="rise-in mt-8 flex flex-wrap gap-2" style={delay(250)}>
                  {content.groups.map((group, index) => (
                    <li key={group.label}>
                      <a
                        href={`#group-${String(index + 1)}`}
                        className="inline-flex items-center gap-2 rounded-full border border-border-strong px-4 py-2 text-sm font-semibold text-ink-strong transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-white"
                      >
                        {group.label}
                        <span className="text-xs text-ink-muted tabular-nums">
                          {group.links.length}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="rise-in mt-8 text-sm text-ink-muted" style={delay(250)}>
                  {plural(total, content.labels.pageCount)}
                </p>
              )}
            </div>
            <div className="rise-in relative" style={delay(250)}>
              <span
                aria-hidden="true"
                className="absolute -right-3 -bottom-3 h-2/5 w-2/5 rounded-[8px] bg-accent-surface"
              />
              <div className="group relative aspect-4/3 overflow-hidden rounded-[8px] bg-surface-inverse shadow-raised">
                <Image
                  src={content.image.src}
                  alt={content.image.alt}
                  fill
                  preload
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out motion-safe:group-hover:scale-[1.03]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- the pages, by group ---------------- */}
      <div className="bg-surface-subtle">
        <div className={`${MEASURE} flex flex-col gap-14 py-16 md:gap-16 md:py-20 lg:py-24`}>
          {content.groups.map((group, groupIndex) => (
            <section
              key={group.label}
              id={`group-${String(groupIndex + 1)}`}
              aria-labelledby={`group-${String(groupIndex + 1)}-heading`}
            >
              <div className="flex items-end gap-4 border-b border-border pb-4">
                <span
                  aria-hidden="true"
                  className="font-serif text-4xl leading-none text-brand/20 tabular-nums"
                >
                  {pad(groupIndex + 1)}
                </span>
                <h2
                  id={`group-${String(groupIndex + 1)}-heading`}
                  className="font-serif text-[clamp(1.5rem,2.6vw,2rem)] leading-tight tracking-[-0.02em] text-ink-strong"
                >
                  {group.label}
                </h2>
                <span className="ml-auto hidden shrink-0 pb-1 text-sm text-ink-muted tabular-nums sm:block">
                  {plural(group.links.length, content.labels.pageCount)}
                </span>
              </div>
              <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.links.map((link, index) => {
                  const offsite = isOffsite(classifyHref(link.href, site.url));
                  const destination = offsite ? destinationLabel(link.href) : null;
                  return (
                    <li key={link.href} className="reveal" style={stagger(index)}>
                      <Link
                        href={link.href}
                        siteUrl={site.url}
                        variant="bare"
                        hideOffsiteIndicator
                        className="group relative flex h-full flex-col overflow-hidden rounded-[8px] border border-border bg-surface p-6 transition-[translate,box-shadow,border-color] duration-500 ease-out hover:border-accent-surface hover:shadow-raised motion-safe:hover:-translate-y-1"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent-surface transition-transform duration-700 ease-out group-hover:scale-x-100"
                        />
                        <span className="flex items-start justify-between gap-4">
                          <span className="font-serif text-xl leading-snug text-ink-strong transition-colors duration-300 group-hover:text-brand">
                            {link.label}
                          </span>
                          <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-accent-surface">
                            {offsite ? (
                              <ExternalIcon size={14} aria-hidden="true" />
                            ) : (
                              <ArrowRightIcon
                                size={15}
                                aria-hidden="true"
                                className="transition-transform duration-300 group-hover:translate-x-0.5"
                              />
                            )}
                          </span>
                        </span>
                        {link.note ? (
                          <span className="mt-2 block text-[0.9375rem] leading-relaxed text-ink-muted">
                            {link.note}
                          </span>
                        ) : null}
                        {destination ? (
                          <span className="mt-auto block pt-4 text-xs font-semibold tracking-[0.12em] text-accent-700 uppercase">
                            {destination}
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
