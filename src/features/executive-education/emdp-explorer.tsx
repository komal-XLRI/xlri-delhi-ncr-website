'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

import { ArrowRightIcon, ExternalIcon } from '@/components/ui/icon';
import type { EmdpProgramme, EmdpStatus } from '@/types/emdp';

const TABS: readonly { readonly id: EmdpStatus; readonly label: string }[] = [
  { id: 'upcoming', label: 'Upcoming programmes' },
  { id: 'ongoing', label: 'On-going programmes' },
];

const delay = (ms: number) => ({ ['--enter-delay' as string]: `${String(ms)}ms` });

/**
 * Upcoming and on-going programmes as WAI-ARIA tabs.
 *
 * Both panels are server-rendered and stay in the DOM (`hidden` on the
 * inactive one), so every programme is in the HTML for search and for a
 * reader with scripts off. Roving tabindex and arrow keys, as on the
 * leadership committees. The sliding underline is a transform on one element;
 * the cards replay their `.enter` animation because they leave `display:
 * none` when their panel is shown.
 */
export function EmdpExplorer({ programmes }: { programmes: readonly EmdpProgramme[] }) {
  const [active, setActive] = useState<EmdpStatus>('upcoming');
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const index = TABS.findIndex((tab) => tab.id === active);

  const onKeyDown = (event: React.KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowRight: (index + 1) % TABS.length,
      ArrowLeft: (index - 1 + TABS.length) % TABS.length,
      Home: 0,
      End: TABS.length - 1,
    };
    const next = keys[event.key];
    if (next === undefined) return;
    event.preventDefault();
    const tab = TABS[next];
    if (!tab) return;
    setActive(tab.id);
    tabs.current[next]?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Programmes"
        className="relative inline-grid grid-cols-2 rounded-full border border-border bg-surface p-1 shadow-raised"
      >
        {/* The pill that slides between the two tabs. */}
        <span
          aria-hidden="true"
          className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-brand transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)]"
          style={{ transform: `translateX(${String(index * 100)}%)` }}
        />
        {TABS.map((tab, i) => {
          const count = programmes.filter((p) => p.status === tab.id).length;
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`emdp-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`emdp-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab.id)}
              onKeyDown={onKeyDown}
              className={`relative z-10 flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors duration-300 sm:px-6 sm:text-[0.9375rem] ${
                selected ? 'text-white' : 'text-ink-muted hover:text-ink-strong'
              }`}
            >
              {tab.label}
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  selected ? 'bg-accent-surface text-brand-950' : 'bg-surface-subtle text-ink-muted'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {TABS.map((tab) => {
        const list = programmes.filter((p) => p.status === tab.id);
        const upcoming = tab.id === 'upcoming';
        return (
          <div
            key={tab.id}
            role="tabpanel"
            id={`emdp-panel-${tab.id}`}
            aria-labelledby={`emdp-tab-${tab.id}`}
            hidden={tab.id !== active}
            className="mt-10"
          >
            <ul
              className={`grid grid-cols-1 gap-6 ${
                upcoming ? 'md:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {list.map((programme, i) => (
                <li key={programme.id} className="enter" style={delay(Math.min(i, 8) * 70)}>
                  <ProgrammeCard programme={programme} featured={upcoming} />
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

function ProgrammeCard({ programme, featured }: { programme: EmdpProgramme; featured: boolean }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[10px] border border-border bg-surface transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-brand/40 hover:shadow-raised">
      {/* A brand-to-accent rule that draws across the top on hover. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-10 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand via-brand to-accent-surface transition-transform duration-500 ease-out group-hover:scale-x-100"
      />
      <div className="relative overflow-hidden bg-surface-subtle">
        <Image
          src={programme.poster.src}
          width={programme.poster.width}
          height={programme.poster.height}
          alt=""
          sizes={
            featured
              ? '(min-width: 1280px) 580px, (min-width: 768px) 46vw, 100vw'
              : '(min-width: 1280px) 380px, (min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw'
          }
          className="h-auto w-full transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
        />
      </div>

      <div className={`flex flex-1 flex-col ${featured ? 'p-6 md:p-7' : 'p-5'}`}>
        {featured ? (
          <p className="mb-3 inline-flex items-center gap-2 self-start rounded-full bg-accent-50 px-3 py-1 text-xs font-semibold tracking-[0.08em] text-accent-700 uppercase">
            <span aria-hidden="true" className="relative flex size-2">
              <span className="absolute inset-0 rounded-full bg-accent-surface opacity-70 motion-safe:animate-ping" />
              <span className="relative size-2 rounded-full bg-accent-700" />
            </span>
            Admissions open
          </p>
        ) : null}
        {programme.batch ? (
          <p className="text-xs font-semibold tracking-[0.14em] text-accent-700 uppercase">
            {programme.batch}
          </p>
        ) : null}
        <h3
          className={`mt-1.5 font-serif leading-snug text-ink-strong transition-colors duration-200 group-hover:text-brand ${
            featured ? 'text-xl md:text-[1.375rem]' : 'text-lg'
          }`}
        >
          {programme.title}
        </h3>
        {programme.note ? (
          <p className="mt-2 text-sm leading-snug text-ink-muted italic">{programme.note}</p>
        ) : null}

        <dl className="mt-4 flex flex-wrap gap-2">
          {programme.details.map((detail) => (
            <div
              key={detail.label}
              className="rounded-full border border-border bg-surface-subtle px-3 py-1 text-[0.8125rem]"
            >
              <dt className="inline text-ink-muted">{detail.label}: </dt>
              <dd className="inline font-semibold text-ink-strong">{detail.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-6">
          {programme.apply ? (
            <a
              href={programme.apply}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-950"
            >
              Apply Now
              <ExternalIcon size={13} aria-hidden="true" />
              <span className="sr-only"> for {programme.title} (opens in a new tab)</span>
            </a>
          ) : null}
          {programme.pay ? (
            <a
              href={programme.pay}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-brand px-4 py-2 text-sm font-semibold text-brand transition-colors duration-200 hover:bg-brand hover:text-white"
            >
              Pay Now
              <span className="sr-only"> for {programme.title} (opens in a new tab)</span>
            </a>
          ) : null}
          <a
            href={programme.knowMore}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-brand"
          >
            Know More
            <ArrowRightIcon
              size={14}
              aria-hidden="true"
              className="text-accent-700 transition-transform duration-200 group-hover/link:translate-x-1"
            />
            <span className="sr-only"> about {programme.title} (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </article>
  );
}
