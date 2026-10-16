'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

import { ArrowRightIcon, CloseIcon, MapPinIcon } from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import type { EventKind, EventsBoardLabels, StudentEvent } from '@/types/student-events';

import { badge, longDate, monthLabel } from './event-dates';
import { fill, plural } from '@/lib/format/template';

const LIFT =
  'transition-[translate,box-shadow,border-color] duration-500 ease-out hover:border-accent-surface hover:shadow-raised motion-safe:hover:-translate-y-1';
const CHIP =
  'cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-300';
const ROUND =
  'flex size-10 cursor-pointer items-center justify-center rounded-full border border-border-strong text-brand transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-white disabled:cursor-default disabled:opacity-35 disabled:hover:border-border-strong disabled:hover:bg-transparent disabled:hover:text-brand';
const UNDATED = 'undated';

/** Groups events by the month they start in, newest first; undated last. */
function byMonth(events: readonly StudentEvent[]) {
  const groups = new Map<string, StudentEvent[]>();
  for (const event of events) {
    const key = event.start?.slice(0, 7) ?? UNDATED;
    groups.set(key, [...(groups.get(key) ?? []), event]);
  }
  return [...groups.entries()].sort(([a], [b]) =>
    a === UNDATED ? 1 : b === UNDATED ? -1 : b.localeCompare(a),
  );
}

/**
 * The events as a poster wall, month by month, filterable by kind. A poster
 * opens in a dialog at full size beside its details — the posters carry the
 * detail, so they are shown whole there, never cropped.
 *
 * The open event is mirrored in the URL hash (`#qawwali-night`), so an event
 * can be linked to — the header search does — and closing clears it.
 */
export function EventsBoard({
  kinds,
  events,
  labels,
}: {
  kinds: readonly EventKind[];
  events: readonly StudentEvent[];
  labels: EventsBoardLabels;
}) {
  const [filter, setFilter] = useState('all');
  const [openId, setOpenId] = useState<string | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  const label = (id: string) => kinds.find((kind) => kind.id === id)?.label ?? '';
  const months = byMonth(
    filter === 'all' ? events : events.filter((event) => event.kind === filter),
  );
  // In the order they appear on screen, for stepping through in the dialog.
  const shown = months.flatMap(([, group]) => group);
  const open = events.find((event) => event.id === openId);
  const openIndex = open ? shown.indexOf(open) : -1;

  const show = useCallback((id: string) => {
    setOpenId(id);
    window.history.replaceState(null, '', `#${id}`);
  }, []);
  const close = useCallback(() => {
    setOpenId(null);
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  }, []);

  // Open from the hash, on load and when a link on this page changes it.
  useEffect(() => {
    const fromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (events.some((event) => event.id === id)) setOpenId(id);
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => {
      window.removeEventListener('hashchange', fromHash);
    };
  }, [events]);

  // Keep the native dialog in step with state; lock the page behind it.
  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    if (openId && !node.open) node.showModal();
    if (!openId && node.open) node.close();
    document.documentElement.style.overflow = openId ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [openId]);

  // A click on the backdrop lands on the dialog element itself; Esc is native.
  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    const onClick = (event: MouseEvent) => {
      if (event.target === node) close();
    };
    node.addEventListener('click', onClick);
    return () => {
      node.removeEventListener('click', onClick);
    };
  }, [close]);

  const counts = new Map<string, number>();
  for (const event of events) counts.set(event.kind, (counts.get(event.kind) ?? 0) + 1);

  return (
    <div>
      {/* ---------------- filters ---------------- */}
      <div role="group" aria-label="Filter events by kind" className="flex flex-wrap gap-2">
        {[{ id: 'all', label: labels.filterAll }, ...kinds].map((kind) => {
          const active = filter === kind.id;
          const count = kind.id === 'all' ? events.length : (counts.get(kind.id) ?? 0);
          if (count === 0) return null;
          return (
            <button
              key={kind.id}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setFilter(kind.id);
              }}
              className={`${CHIP} ${active ? 'border-brand bg-brand text-white' : 'border-border-strong bg-surface text-ink-strong hover:border-brand hover:text-brand'}`}
            >
              {kind.label}
              <span
                className={`ml-2 tabular-nums ${active ? 'text-accent-surface' : 'text-ink-muted'}`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
      <p aria-live="polite" className="sr-only">
        {shown.length} events shown
      </p>

      {/* ---------------- month by month ---------------- */}
      <div className="mt-12 flex flex-col gap-14">
        {months.map(([key, group]) => (
          <section key={key} aria-labelledby={`month-${key}`}>
            <div className="flex items-baseline gap-4 border-b border-border pb-3">
              <h3
                id={`month-${key}`}
                className="font-serif text-[clamp(1.5rem,2.6vw,2rem)] leading-tight text-ink-strong"
              >
                {key === UNDATED ? labels.undated : monthLabel(key)}
              </h3>
              <span className="text-sm text-ink-muted tabular-nums">
                {plural(group.length, labels.count)}
              </span>
              <span
                aria-hidden="true"
                className="ml-auto h-[3px] w-10 self-center bg-accent-surface"
              />
            </div>

            <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6">
              {group.map((event) => {
                const date = event.start ? badge(event.start, event.end) : null;
                return (
                  <li key={event.id} id={event.id}>
                    <button
                      type="button"
                      aria-haspopup="dialog"
                      onClick={() => {
                        show(event.id);
                      }}
                      className={`group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-[8px] border border-border bg-surface text-left ${LIFT}`}
                    >
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 z-10 h-1 origin-left scale-x-0 bg-accent-surface transition-transform duration-700 ease-out group-hover:scale-x-100"
                      />
                      <span className="relative block aspect-4/5 overflow-hidden bg-surface-inverse">
                        <Image
                          src={event.poster.src}
                          alt=""
                          fill
                          sizes="(min-width: 1280px) 284px, (min-width: 1024px) 23vw, (min-width: 768px) 31vw, 48vw"
                          className="object-cover object-top transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
                        />
                        {date ? (
                          <span className="absolute top-3 left-3 flex min-w-14 flex-col items-center rounded-[6px] bg-white/95 px-2 py-1.5 text-brand-950 shadow-raised backdrop-blur">
                            <span className="font-serif text-xl leading-none tabular-nums">
                              {date.day}
                            </span>
                            <span className="mt-0.5 text-[0.6875rem] font-bold tracking-[0.14em] uppercase">
                              {date.month}
                            </span>
                          </span>
                        ) : null}
                      </span>
                      <span className="flex flex-1 flex-col p-4 md:p-5">
                        <span className="text-[0.6875rem] font-semibold tracking-[0.14em] text-accent-700 uppercase">
                          {label(event.kind)}
                        </span>
                        <span className="mt-1.5 font-serif text-lg leading-snug text-ink-strong transition-colors duration-300 group-hover:text-brand md:text-xl">
                          {event.title}
                        </span>
                        {event.organisers.length > 0 ? (
                          <span className="mt-1 text-sm text-ink-muted">
                            {event.organisers.map((organiser) => organiser.name).join(' · ')}
                          </span>
                        ) : null}
                        {event.venue ? (
                          <span className="mt-auto flex items-start gap-1.5 pt-3 text-xs leading-snug text-ink-muted">
                            <MapPinIcon
                              size={13}
                              aria-hidden="true"
                              className="mt-px shrink-0 text-accent-700"
                            />
                            {event.venue}
                          </span>
                        ) : null}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      {/* ---------------- poster dialog ---------------- */}
      <dialog
        ref={dialog}
        aria-labelledby={open ? `${open.id}-title` : undefined}
        onClose={close}
        className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-5xl overflow-hidden rounded-[12px] bg-surface p-0 shadow-raised transition-[opacity,translate,display,overlay] transition-discrete duration-300 ease-out backdrop:bg-brand-950/70 backdrop:backdrop-blur-sm starting:open:translate-y-4 starting:open:opacity-0"
      >
        {open ? (
          // Keyed so stepping to another event starts at its top.
          <div
            key={open.id}
            className="grid max-h-[calc(100dvh-2rem)] grid-cols-1 overflow-y-auto overscroll-contain md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:overflow-hidden"
          >
            <div className="flex items-center justify-center bg-surface-inverse p-4 md:p-6">
              <Image
                src={open.poster.src}
                alt={open.poster.alt}
                width={open.poster.width}
                height={open.poster.height}
                sizes="(min-width: 1024px) 520px, (min-width: 768px) 50vw, 100vw"
                className="h-auto max-h-[70dvh] w-auto max-w-full rounded-[4px] object-contain shadow-raised md:max-h-[calc(100dvh-5rem)]"
              />
            </div>

            <div className="relative flex flex-col p-6 md:overflow-y-auto md:p-9">
              <button
                type="button"
                onClick={close}
                className="absolute top-4 right-4 flex size-10 cursor-pointer items-center justify-center rounded-full border border-border-strong text-brand transition-colors duration-300 hover:border-accent-surface hover:bg-accent-surface hover:text-brand-950"
              >
                <CloseIcon size={18} aria-hidden="true" />
                <span className="sr-only">Close</span>
              </button>

              <p className="pr-12 text-sm font-semibold tracking-[0.16em] text-accent-700 uppercase">
                {label(open.kind)}
              </p>
              <h3
                id={`${open.id}-title`}
                className="mt-2 pr-12 font-serif text-[clamp(1.75rem,3.4vw,2.5rem)] leading-tight text-ink-strong"
              >
                {open.title}
              </h3>
              <span aria-hidden="true" className="mt-5 block h-[3px] w-10 bg-accent-surface" />

              <dl className="mt-6 flex flex-col gap-3 text-[0.9375rem]">
                {open.start ? (
                  <div className="flex gap-3">
                    <dt className="w-16 shrink-0 text-ink-muted">{labels.date}</dt>
                    <dd className="font-semibold text-ink-strong">
                      {longDate(open.start, open.end)}
                    </dd>
                  </div>
                ) : null}
                {open.time ? (
                  <div className="flex gap-3">
                    <dt className="w-16 shrink-0 text-ink-muted">{labels.time}</dt>
                    <dd className="font-semibold text-ink-strong">{open.time}</dd>
                  </div>
                ) : null}
                {open.venue ? (
                  <div className="flex gap-3">
                    <dt className="w-16 shrink-0 text-ink-muted">{labels.venue}</dt>
                    <dd className="font-semibold text-ink-strong">{open.venue}</dd>
                  </div>
                ) : null}
              </dl>

              <p className="mt-6 leading-[1.8] text-ink">{open.summary}</p>

              {open.organisers.length > 0 ? (
                <div className="mt-7">
                  <p className="text-xs font-semibold tracking-[0.16em] text-ink-muted uppercase">
                    {labels.organisedBy}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {open.organisers.map((organiser) => (
                      <li key={organiser.id}>
                        <Link
                          href={`${routes.campusLife.societies}#${organiser.id}`}
                          className="group/org inline-flex items-center gap-2 rounded-full border border-border-strong px-4 py-1.5 text-sm font-semibold text-ink-strong transition-colors duration-300 hover:border-brand hover:text-brand"
                        >
                          {organiser.name}
                          <ArrowRightIcon
                            size={14}
                            aria-hidden="true"
                            className="text-accent-700 transition-transform duration-300 group-hover/org:translate-x-0.5"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <span aria-hidden="true" className="min-h-10 flex-1" />
              {/* Step through the events in the current filter. */}
              <div className="flex items-center gap-3 border-t border-border pt-6">
                <button
                  type="button"
                  disabled={openIndex <= 0}
                  onClick={() => {
                    const previous = shown[openIndex - 1];
                    if (previous) show(previous.id);
                  }}
                  aria-label="Newer event"
                  className={ROUND}
                >
                  <ArrowRightIcon size={16} className="rotate-180" />
                </button>
                <button
                  type="button"
                  disabled={openIndex < 0 || openIndex >= shown.length - 1}
                  onClick={() => {
                    const next = shown[openIndex + 1];
                    if (next) show(next.id);
                  }}
                  aria-label="Older event"
                  className={ROUND}
                >
                  <ArrowRightIcon size={16} />
                </button>
                {openIndex >= 0 ? (
                  <span className="ml-2 text-sm text-ink-muted tabular-nums">
                    {fill(labels.position, { index: openIndex + 1, total: shown.length })}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
