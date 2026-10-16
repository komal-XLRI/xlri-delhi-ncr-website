'use client';

import Image from 'next/image';
import { useDeferredValue, useId, useState } from 'react';

import { SearchIcon } from '@/components/ui/icon';
import { fillNodes } from '@/components/ui/fill-nodes';
import type { StaffDirectoryLabels, StaffMember } from '@/types/faculty';

const normalise = (value: string) => value.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

/**
 * The staff cards with a search box — nearly sixty people, so finding one by
 * name or by what they do ("accounts", "IT", "librarian") is worth a field.
 * Every word typed must match the name or the designation. The count is
 * announced as it changes. Without JavaScript every card is still in the
 * HTML; the search only hides. The visible words come from
 * `content/faculty/staff.json` (`labels`).
 */
export function StaffGrid({
  staff,
  labels,
}: {
  staff: readonly StaffMember[];
  labels: StaffDirectoryLabels;
}) {
  const [query, setQuery] = useState('');
  const deferred = useDeferredValue(query);
  const searchId = useId();

  const words = normalise(deferred).split(/\s+/).filter(Boolean);
  const shown = staff.filter((member) => {
    const haystack = normalise(`${member.name} ${member.designation}`);
    return words.every((word) => haystack.includes(word));
  });
  const filtered = words.length > 0;

  return (
    <div>
      <div
        className="rise-in flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        style={{ ['--rise-delay' as string]: '200ms' }}
      >
        <p aria-live="polite" className="order-last text-sm text-ink-muted sm:order-first">
          {fillNodes(labels.showing, {
            shown: <span className="font-semibold text-ink-strong">{shown.length}</span>,
            total: staff.length,
          })}
          {filtered ? (
            <>
              {' · '}
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                }}
                className="font-semibold text-brand underline decoration-accent-surface decoration-2 underline-offset-4 hover:text-brand-950"
              >
                {labels.clearSearch}
              </button>
            </>
          ) : null}
        </p>
        <label htmlFor={searchId} className="relative block">
          <span className="sr-only">Search staff by name or role</span>
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
            className="h-11 w-full rounded-[4px] border border-border-strong bg-surface pr-4 pl-10 text-[0.9375rem] text-ink-strong transition-colors duration-300 placeholder:text-ink-muted hover:border-brand focus:border-brand sm:w-72"
          />
        </label>
      </div>

      {shown.length > 0 ? (
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {shown.map((member, index) => (
            // rise-in on the item, the hover lift on the card: both set a transform.
            <li
              key={member.id}
              id={member.id}
              className={filtered ? 'scroll-mt-36' : 'rise-in scroll-mt-36'}
              style={
                filtered
                  ? undefined
                  : { ['--rise-delay' as string]: `${300 + Math.min(index, 7) * 70}ms` }
              }
            >
              <StaffCard member={member} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-10 rounded-[8px] border border-dashed border-border-strong px-6 py-14 text-center">
          <p className="font-serif text-xl text-ink-strong">{labels.noMatch}</p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
            }}
            className="mt-4 text-[0.9375rem] font-semibold text-brand underline decoration-accent-surface decoration-2 underline-offset-4 hover:text-brand-950"
          >
            {labels.clearSearch}
          </button>
        </div>
      )}
    </div>
  );
}

function StaffCard({ member }: { member: StaffMember }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[8px] border border-border bg-surface transition-[translate,box-shadow,border-color] duration-500 ease-out hover:border-accent-surface hover:shadow-raised motion-safe:hover:-translate-y-1">
      <div className="relative aspect-[4/5] overflow-hidden bg-surface-subtle">
        <Image
          src={member.photo}
          alt={member.name}
          fill
          sizes="(min-width: 1280px) 284px, (min-width: 1024px) 23vw, (min-width: 768px) 31vw, 46vw"
          className="object-cover object-top transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
        />
        {/* A lime bar that sweeps across the foot of the photograph on hover. */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-accent-surface transition-transform duration-700 ease-out group-hover:scale-x-100"
        />
      </div>
      <div className="flex-1 px-4 pt-4 pb-5 md:px-5">
        <h2 className="font-serif text-lg leading-snug text-ink-strong transition-colors duration-500 group-hover:text-brand">
          {member.name}
        </h2>
        <p className="mt-1.5 text-sm leading-snug text-ink-muted">{member.designation}</p>
      </div>
    </article>
  );
}
