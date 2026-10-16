'use client';

import { useDeferredValue, useId, useMemo, useState } from 'react';

import { ExternalIcon, SearchIcon } from '@/components/ui/icon';
import { cn } from '@/lib/cn';
import type { Publication, PublicationListLabels, PublicationPeriod } from '@/types/publications';

import { fillNodes } from '@/components/ui/fill-nodes';
import { fill } from '@/lib/format/template';

const normalise = (value: string) => value.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

/**
 * The publications, newest period first, with a search box and a period
 * filter — eighty-odd citations are too many to scan unaided. Shared by
 * Faculty & Research › Publication and Sustainability › Research Publications.
 *
 * Search matches the title, authors, journal and year, ignoring case and
 * accents; every word typed must match. The period chips are toggle buttons
 * (`aria-pressed`), and the count is announced as it changes. The full list
 * is server-rendered, so it is all there without JavaScript. The visible
 * words come from the page's JSON (`labels`).
 */
export function PublicationList({
  periods,
  labels,
}: {
  periods: readonly PublicationPeriod[];
  labels: PublicationListLabels;
}) {
  const [query, setQuery] = useState('');
  const [period, setPeriod] = useState('');
  const deferred = useDeferredValue(query);
  const searchId = useId();

  const total = useMemo(() => periods.reduce((n, p) => n + p.publications.length, 0), [periods]);
  const index = useMemo(
    () =>
      new Map(
        periods.flatMap((p) =>
          p.publications.map((pub) => [
            pub.id,
            normalise(`${pub.title} ${pub.authors} ${pub.source ?? ''} ${pub.year}`),
          ]),
        ),
      ),
    [periods],
  );

  const words = normalise(deferred).split(/\s+/).filter(Boolean);
  const groups = periods
    .filter((p) => !period || p.id === period)
    .map((p) => ({
      ...p,
      publications: p.publications.filter((pub) => {
        const haystack = index.get(pub.id) ?? '';
        return words.every((word) => haystack.includes(word));
      }),
    }))
    .filter((p) => p.publications.length > 0);
  const shown = groups.reduce((n, p) => n + p.publications.length, 0);
  const filtered = Boolean(query || period);

  const reset = () => {
    setQuery('');
    setPeriod('');
  };

  const chip = (selected: boolean) =>
    cn(
      'inline-flex h-10 items-center rounded-full border px-4 text-sm font-medium tabular-nums transition-colors duration-500',
      selected
        ? 'border-brand bg-brand text-white'
        : 'border-border-strong bg-surface text-ink-strong hover:border-accent-surface hover:bg-accent-surface hover:text-brand-950',
    );

  return (
    <div>
      {/* ---------------- controls ---------------- */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by period" className="flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={period === ''}
            onClick={() => {
              setPeriod('');
            }}
            className={chip(period === '')}
          >
            {labels.allYears}
          </button>
          {periods.map((p) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={period === p.id}
              onClick={() => {
                setPeriod(p.id);
              }}
              className={chip(period === p.id)}
            >
              {p.label}
            </button>
          ))}
        </div>

        <label htmlFor={searchId} className="relative block">
          <span className="sr-only">Search publications</span>
          <SearchIcon
            size={17}
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-ink-muted"
          />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
            placeholder={labels.searchPlaceholder}
            className="h-11 w-full rounded-[4px] border border-border-strong bg-surface pr-4 pl-10 text-[0.9375rem] text-ink-strong transition-colors duration-300 placeholder:text-ink-muted hover:border-brand focus:border-brand lg:w-80"
          />
        </label>
      </div>

      <p aria-live="polite" className="mt-5 text-sm text-ink-muted">
        {fillNodes(labels.showing, {
          shown: <span className="font-semibold text-ink-strong">{shown}</span>,
          total,
        })}
        {filtered ? (
          <>
            {' · '}
            <button
              type="button"
              onClick={reset}
              className="font-semibold text-brand underline decoration-accent-surface decoration-2 underline-offset-4 hover:text-brand-950"
            >
              {labels.clearFilters}
            </button>
          </>
        ) : null}
      </p>

      {/* ---------------- the list ---------------- */}
      {groups.length === 0 ? (
        <div className="mt-8 rounded-[8px] border border-dashed border-border-strong bg-surface px-6 py-12 text-center">
          <p className="font-serif text-xl text-ink-strong">{labels.noMatch}</p>
          <button
            type="button"
            onClick={reset}
            className="mt-4 text-sm font-semibold text-brand underline decoration-accent-surface decoration-2 underline-offset-4 hover:text-brand-950"
          >
            {labels.clearFilters}
          </button>
        </div>
      ) : (
        groups.map((group) => (
          <section key={group.id} aria-labelledby={`period-${group.id}`} className="mt-10">
            <h3
              id={`period-${group.id}`}
              className="flex items-center gap-4 font-serif text-2xl text-ink-strong tabular-nums"
            >
              {group.label}
              <span className="text-sm font-medium text-ink-muted">
                {group.publications.length}
              </span>
              <span aria-hidden="true" className="h-px flex-1 bg-border-strong/60" />
            </h3>
            <ol className="mt-5 flex flex-col gap-2.5">
              {group.publications.map((publication) => (
                <li key={publication.id}>
                  <PublicationRow publication={publication} labels={labels} />
                </li>
              ))}
            </ol>
          </section>
        ))
      )}
    </div>
  );
}

function PublicationRow({
  publication,
  labels,
}: {
  publication: Publication;
  labels: PublicationListLabels;
}) {
  return (
    <article className="group relative grid grid-cols-[3.25rem_minmax(0,1fr)] gap-x-4 gap-y-2.5 overflow-hidden rounded-[8px] border border-border bg-surface px-5 py-4 transition-[border-color,box-shadow] duration-500 hover:border-accent-surface hover:shadow-raised md:grid-cols-[4rem_minmax(0,1fr)_auto] md:gap-x-6 md:px-6 md:py-5">
      {/* A lime bar that draws down the left edge on hover. */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-accent-surface transition-transform duration-700 ease-out group-hover:scale-y-100"
      />
      <span className="font-serif text-xl leading-tight text-brand tabular-nums md:text-2xl">
        {publication.year}
      </span>
      <div className="min-w-0">
        <h4 className="font-serif text-[1.0625rem] leading-snug text-ink-strong transition-colors duration-500 group-hover:text-brand md:text-lg">
          {publication.title}
        </h4>
        <p className="mt-1 text-sm leading-relaxed text-ink-muted">{publication.authors}</p>
        {publication.source ? (
          <p className="mt-0.5 text-sm leading-relaxed text-ink italic">{publication.source}</p>
        ) : null}
      </div>
      {publication.doi || publication.isbn ? (
        <div className="col-start-2 md:col-start-3 md:self-center">
          {publication.doi ? (
            <a
              href={`https://doi.org/${publication.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border-strong px-3.5 py-1.5 text-xs font-semibold tracking-[0.08em] text-brand uppercase transition-colors duration-500 hover:border-accent-surface hover:bg-accent-surface hover:text-brand-950"
            >
              {labels.doi}
              <ExternalIcon size={12} aria-hidden="true" />
              <span className="sr-only"> for {publication.title} (opens in a new tab)</span>
            </a>
          ) : (
            <span className="text-xs font-medium text-ink-muted">
              {fill(labels.isbn, { isbn: publication.isbn ?? '' })}
            </span>
          )}
        </div>
      ) : null}
    </article>
  );
}
