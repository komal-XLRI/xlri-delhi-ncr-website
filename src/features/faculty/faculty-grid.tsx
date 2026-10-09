'use client';

import Image from 'next/image';
import NextLink from 'next/link';
import { useId, useMemo, useState } from 'react';

import { ArrowRightIcon, ChevronDownIcon, SearchIcon } from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import { cn } from '@/lib/cn';
import type { FacultyMember } from '@/types/faculty';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

/** "Dr. Faisal Ahsan" → "F": the first name decides the letter, not the title. */
const initial = (name: string) =>
  name
    .replace(/^(Dr|Fr|Prof|Mr|Ms|Mrs)\.?\s+/i, '')
    .charAt(0)
    .toUpperCase();

/**
 * The faculty cards with the institute page's three filters — a letter row,
 * a name search and a functional-area menu. They combine: a letter and an area
 * narrow together. Letters nobody's name starts with are shown but disabled,
 * so the row keeps its shape and still tells the visitor there is no one there.
 *
 * Without JavaScript every card is still in the HTML; the filters only hide.
 */
export function FacultyGrid({ faculty }: { faculty: readonly FacultyMember[] }) {
  const [letter, setLetter] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [area, setArea] = useState('');
  const searchId = useId();
  const areaId = useId();

  const areas = useMemo(() => [...new Set(faculty.flatMap((f) => f.areas))].sort(), [faculty]);
  const present = useMemo(() => new Set(faculty.map((f) => initial(f.name))), [faculty]);

  const q = query.trim().toLowerCase();
  const shown = faculty.filter(
    (f) =>
      (!letter || initial(f.name) === letter) &&
      (!q || f.name.toLowerCase().includes(q)) &&
      (!area || f.areas.includes(area)),
  );
  const filtered = letter !== null || q !== '' || area !== '';

  const reset = () => {
    setLetter(null);
    setQuery('');
    setArea('');
  };

  const letterButton = (active: boolean) =>
    cn(
      'flex h-9 min-w-9 items-center justify-center rounded-[4px] border px-2 text-sm font-semibold transition-colors duration-300',
      active
        ? 'border-accent-surface bg-accent-surface text-brand-950'
        : 'border-border bg-surface text-ink-strong hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:border-border/60 disabled:text-ink-muted/40 disabled:hover:border-border/60',
    );

  return (
    <div>
      {/* ---------------- filters ---------------- */}
      <div className="rise-in flex flex-col gap-4" style={{ ['--rise-delay' as string]: '300ms' }}>
        <div role="group" aria-label="Filter by first letter" className="flex flex-wrap gap-1.5">
          <button
            type="button"
            aria-pressed={letter === null}
            onClick={() => {
              setLetter(null);
            }}
            className={letterButton(letter === null)}
          >
            All
          </button>
          {LETTERS.map((l) => (
            <button
              key={l}
              type="button"
              aria-pressed={letter === l}
              disabled={!present.has(l)}
              onClick={() => {
                setLetter(letter === l ? null : l);
              }}
              className={letterButton(letter === l)}
            >
              {l}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p aria-live="polite" className="order-last text-sm text-ink-muted sm:order-first">
            Showing <span className="font-semibold text-ink-strong">{shown.length}</span> of{' '}
            {faculty.length} faculty
            {filtered ? (
              <>
                {' · '}
                <button
                  type="button"
                  onClick={reset}
                  className="font-semibold text-brand underline decoration-accent-surface decoration-2 underline-offset-4 hover:text-brand-950"
                >
                  Clear filters
                </button>
              </>
            ) : null}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor={searchId} className="relative block">
              <span className="sr-only">Search by name</span>
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
                placeholder="Search name"
                className="h-11 w-full rounded-[4px] border border-border-strong bg-surface pr-4 pl-10 text-[0.9375rem] text-ink-strong transition-colors duration-300 placeholder:text-ink-muted hover:border-brand focus:border-brand sm:w-60"
              />
            </label>
            <label htmlFor={areaId} className="relative block">
              <span className="sr-only">Functional area</span>
              <select
                id={areaId}
                value={area}
                onChange={(event) => {
                  setArea(event.target.value);
                }}
                className="h-11 w-full appearance-none rounded-[4px] border border-border-strong bg-surface pr-10 pl-4 text-[0.9375rem] text-ink-strong transition-colors duration-300 hover:border-brand focus:border-brand sm:w-72"
              >
                <option value="">All functional areas</option>
                {areas.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
              <ChevronDownIcon
                size={16}
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-ink-muted"
              />
            </label>
          </div>
        </div>
      </div>

      {/* ---------------- cards ---------------- */}
      {shown.length > 0 ? (
        <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {shown.map((member, index) => (
            <li
              key={member.id}
              className={filtered ? undefined : 'rise-in'}
              style={
                filtered
                  ? undefined
                  : { ['--rise-delay' as string]: `${400 + Math.min(index, 5) * 100}ms` }
              }
            >
              <FacultyCard member={member} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-10 rounded-[8px] border border-dashed border-border-strong px-6 py-14 text-center">
          <p className="font-serif text-xl text-ink-strong">No faculty match these filters.</p>
          <button
            type="button"
            onClick={reset}
            className="mt-4 text-[0.9375rem] font-semibold text-brand underline decoration-accent-surface decoration-2 underline-offset-4 hover:text-brand-950"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

function FacultyCard({ member }: { member: FacultyMember }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[8px] border border-border bg-surface transition-[translate,box-shadow,border-color] duration-500 ease-out hover:border-brand/40 hover:shadow-raised motion-safe:hover:-translate-y-1">
      <div className="relative aspect-[5/4] overflow-hidden bg-surface-subtle">
        <Image
          src={member.photo}
          alt={member.name}
          fill
          sizes="(min-width: 1280px) 384px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 100vw"
          className="object-cover object-[center_20%] transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
        />
        {/* A lime bar that sweeps across the foot of the photograph on hover. */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-accent-surface transition-transform duration-700 ease-out group-hover:scale-x-100"
        />
      </div>

      <div className="flex flex-1 flex-col px-6 pt-5 pb-6">
        <h3 className="font-serif text-xl leading-snug text-ink-strong transition-colors duration-500 group-hover:text-brand">
          {member.name}
        </h3>
        <p className="mt-2 text-sm text-ink-muted">{member.designation}</p>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-strong">
          {member.qualification}
        </p>

        <p className="mt-4 text-sm text-ink-muted">Functional Area:</p>
        <p className="mt-1 text-sm leading-relaxed text-ink-strong">{member.areas.join(', ')}</p>

        {/* The link stretches over the whole card (after:inset-0), so the photo and name click through too. */}
        <NextLink
          href={routes.faculty.fullTimeProfile(member.id)}
          className="group/bio mt-auto inline-flex items-center gap-1.5 self-start pt-5 text-[0.9375rem] font-semibold text-ink-strong after:absolute after:inset-0"
        >
          <span className="border-b-2 border-accent-surface pb-0.5 transition-colors duration-300 group-hover:border-brand group-hover:text-brand">
            Biography
          </span>
          <ArrowRightIcon
            size={14}
            aria-hidden="true"
            className="text-accent-700 transition-transform duration-300 motion-safe:group-hover:translate-x-1"
          />
          <span className="sr-only"> of {member.name}</span>
        </NextLink>
      </div>
    </article>
  );
}
