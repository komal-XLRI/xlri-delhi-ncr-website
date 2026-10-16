'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

import { ArrowRightIcon, CheckIcon, CloseIcon } from '@/components/ui/icon';
import { Avatar } from '@/features/sustainability/avatar';
import type { Society, SocietyCategory, StudentSocietiesPage } from '@/types/student-societies';

import { fill } from '@/lib/format/template';

const LIFT =
  'transition-[translate,box-shadow,border-color] duration-500 ease-out hover:border-accent-surface hover:shadow-raised motion-safe:hover:-translate-y-1';
const CHIP =
  'cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-300';
const ROUND =
  'flex size-10 cursor-pointer items-center justify-center rounded-full border border-border-strong text-brand transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-white disabled:cursor-default disabled:opacity-35 disabled:hover:border-border-strong disabled:hover:bg-transparent disabled:hover:text-brand';

/** Where there is no team photo: the name on brand blue, with a lime corner. */
function Monogram({ name, large = false }: { name: string; large?: boolean }) {
  return (
    <span className="absolute inset-0 flex items-center justify-center overflow-hidden bg-brand">
      <span
        aria-hidden="true"
        className="absolute -right-10 -bottom-10 size-32 rotate-45 bg-accent-surface/80"
      />
      <span
        className={`relative px-6 text-center font-serif text-white ${large ? 'text-5xl' : 'text-3xl'}`}
      >
        {name}
      </span>
    </span>
  );
}

/**
 * The committees as a filterable grid of cards; a card opens the committee in
 * a dialog with everything the Delhi page says about it.
 *
 * The open committee is mirrored in the URL hash (`#maxi`), so a committee can
 * be linked to — the header search does — and opening one from a link or the
 * back of a hash change works the same as a click. Closing clears the hash.
 */
export function SocietyDirectory({
  categories,
  committees,
  labels,
}: {
  categories: readonly SocietyCategory[];
  committees: readonly Society[];
  labels: StudentSocietiesPage['directory'];
}) {
  const [filter, setFilter] = useState<string>('all');
  const [openId, setOpenId] = useState<string | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  const label = (id: string) => categories.find((category) => category.id === id)?.label ?? '';
  const shown =
    filter === 'all' ? committees : committees.filter((committee) => committee.category === filter);
  const open = committees.find((committee) => committee.id === openId);
  const openIndex = open ? shown.indexOf(open) : -1;

  const show = useCallback((id: string) => {
    setOpenId(id);
    window.history.replaceState(null, '', `#${id}`);
  }, []);

  // Open from the hash, on load and when a link on this page changes it.
  useEffect(() => {
    const fromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (committees.some((committee) => committee.id === id)) setOpenId(id);
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => {
      window.removeEventListener('hashchange', fromHash);
    };
  }, [committees]);

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

  const close = useCallback(() => {
    setOpenId(null);
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  }, []);

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
  for (const committee of committees) {
    counts.set(committee.category, (counts.get(committee.category) ?? 0) + 1);
  }

  return (
    <div>
      {/* ---------------- filters ---------------- */}
      <div role="group" aria-label="Filter committees by kind" className="flex flex-wrap gap-2">
        {[{ id: 'all', label: labels.filterAll }, ...categories].map((category) => {
          const active = filter === category.id;
          const count = category.id === 'all' ? committees.length : (counts.get(category.id) ?? 0);
          if (count === 0) return null;
          return (
            <button
              key={category.id}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setFilter(category.id);
              }}
              className={`${CHIP} ${active ? 'border-brand bg-brand text-white' : 'border-border-strong bg-surface text-ink-strong hover:border-brand hover:text-brand'}`}
            >
              {category.label}
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
        {shown.length} committees shown
      </p>

      {/* ---------------- cards ---------------- */}
      <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {shown.map((committee) => (
          <li key={committee.id} id={committee.id}>
            <button
              type="button"
              onClick={() => {
                show(committee.id);
              }}
              aria-haspopup="dialog"
              className={`group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-[8px] border border-border bg-surface text-left ${LIFT}`}
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 z-10 h-1 origin-left scale-x-0 bg-accent-surface transition-transform duration-700 ease-out group-hover:scale-x-100"
              />
              <span className="relative block aspect-3/2 overflow-hidden bg-surface-inverse">
                {committee.photo ? (
                  <Image
                    src={committee.photo.src}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 390px, (min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
                    className="object-cover object-[center_25%] transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
                  />
                ) : (
                  <Monogram name={committee.name} />
                )}
                <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-950 backdrop-blur">
                  {label(committee.category)}
                </span>
              </span>

              <span className="flex flex-1 flex-col p-6">
                <span className="text-xs font-semibold tracking-[0.16em] text-accent-700 uppercase">
                  {committee.focus}
                </span>
                <span className="mt-2 font-serif text-2xl leading-tight text-ink-strong transition-colors duration-300 group-hover:text-brand">
                  {committee.name}
                </span>
                {committee.fullName ? (
                  <span className="mt-1 text-sm leading-snug text-ink-muted">
                    {committee.fullName}
                  </span>
                ) : null}
                <span className="mt-4 flex-1">
                  <span className="line-clamp-3 text-[0.9375rem] leading-relaxed text-ink">
                    {committee.body[0]}
                  </span>
                </span>

                <span className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  {committee.lead ? (
                    <>
                      <span className="relative block size-10 shrink-0 overflow-hidden rounded-full ring-2 ring-accent-100 transition-shadow duration-500 group-hover:ring-accent-surface">
                        <Image
                          src={committee.lead.photo}
                          alt=""
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-ink-strong">
                          {committee.lead.name}
                        </span>
                        <span className="block truncate text-xs text-ink-muted">
                          {committee.lead.role}
                        </span>
                      </span>
                    </>
                  ) : (
                    <span className="flex-1 text-sm text-ink-muted">
                      {committee.email ?? labels.readMore}
                    </span>
                  )}
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border-strong text-brand transition-colors duration-500 group-hover:border-accent-surface group-hover:bg-accent-surface group-hover:text-brand-950">
                    <ArrowRightIcon size={16} aria-hidden="true" />
                    <span className="sr-only">Read more about {committee.name}</span>
                  </span>
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* ---------------- detail ---------------- */}
      <dialog
        ref={dialog}
        aria-labelledby={open ? `${open.id}-title` : undefined}
        onClose={close}
        className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-3xl overflow-hidden rounded-[12px] bg-surface p-0 shadow-raised transition-[opacity,translate,display,overlay] transition-discrete duration-300 ease-out backdrop:bg-brand-950/60 backdrop:backdrop-blur-sm starting:open:translate-y-4 starting:open:opacity-0"
      >
        {open ? (
          // Keyed so stepping to another committee starts at its top.
          <div
            key={open.id}
            className="max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain"
          >
            <div className="relative aspect-16/9 bg-surface-inverse">
              {open.photo ? (
                <Image
                  key={open.id}
                  src={open.photo.src}
                  alt={open.photo.alt}
                  fill
                  sizes="(min-width: 800px) 768px, 100vw"
                  className="object-cover object-[center_30%]"
                />
              ) : (
                <Monogram name={open.name} large />
              )}
              <button
                type="button"
                onClick={close}
                className="absolute top-4 right-4 flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/90 text-brand-950 shadow-raised backdrop-blur transition-colors duration-300 hover:bg-accent-surface"
              >
                <CloseIcon size={18} aria-hidden="true" />
                <span className="sr-only">Close</span>
              </button>
            </div>

            <div className="p-6 md:p-10">
              <p className="text-sm font-semibold tracking-[0.16em] text-accent-700 uppercase">
                {label(open.category)} · {open.focus}
              </p>
              <h3
                id={`${open.id}-title`}
                className="mt-2 font-serif text-[clamp(1.875rem,4vw,2.5rem)] leading-tight text-ink-strong"
              >
                {open.name}
              </h3>
              {open.fullName ? <p className="mt-1 text-ink-muted">{open.fullName}</p> : null}
              <span aria-hidden="true" className="mt-5 block h-[3px] w-10 bg-accent-surface" />

              {open.motto ? (
                <p className="mt-6 border-l-4 border-accent-surface pl-4 font-serif text-xl text-brand italic">
                  “{open.motto}”
                </p>
              ) : null}

              {open.lead || open.email ? (
                <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4 rounded-[8px] border border-border bg-surface-subtle p-5">
                  {open.lead ? (
                    <div className="flex items-center gap-4">
                      <Avatar name={open.lead.name} photo={open.lead.photo} size="sm" />
                      <div>
                        <p className="font-semibold text-ink-strong">{open.lead.name}</p>
                        <p className="text-sm text-ink-muted">{open.lead.role}</p>
                      </div>
                    </div>
                  ) : null}
                  {open.email ? (
                    <a
                      href={`mailto:${open.email}`}
                      className="text-sm font-semibold break-all text-brand underline decoration-accent-surface decoration-2 underline-offset-4 hover:text-brand-950 sm:ml-auto"
                    >
                      {open.email}
                    </a>
                  ) : null}
                </div>
              ) : null}

              <div className="mt-7 flex flex-col gap-4 text-[1.0625rem] leading-[1.75] text-ink">
                {open.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>

              {open.list ? (
                <div className="mt-6">
                  {open.listTitle ? (
                    <p className="font-semibold text-ink-strong">{open.listTitle}</p>
                  ) : null}
                  <ul className="mt-3 flex flex-col gap-3">
                    {open.list.map((item) => (
                      <li key={item} className="flex gap-3 leading-relaxed text-ink">
                        <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-surface text-brand-950">
                          <CheckIcon size={12} aria-hidden="true" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {/* Step through the committees in the current filter. */}
              <div className="mt-10 flex items-center gap-3 border-t border-border pt-6">
                <button
                  type="button"
                  disabled={openIndex <= 0}
                  onClick={() => {
                    const previous = shown[openIndex - 1];
                    if (previous) show(previous.id);
                  }}
                  aria-label="Previous committee"
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
                  aria-label="Next committee"
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
