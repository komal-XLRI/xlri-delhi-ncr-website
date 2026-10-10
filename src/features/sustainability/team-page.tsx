import Image from 'next/image';
import NextLink from 'next/link';
import type { ReactNode } from 'react';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ArrowRightIcon, ExternalIcon, LeafIcon } from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import type {
  ResolvedCommitteeMember,
  ResolvedCoreTeamMember,
  ResolvedSustainabilityTeamPage,
} from '@/types/sustainability-team';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';
const H2 =
  'font-serif text-[clamp(1.75rem,3.2vw,2.5rem)] leading-tight tracking-[-0.02em] text-ink-strong';
/** A slow lift with a soft shadow — the cards' shared hover. */
const LIFT =
  'transition-[translate,box-shadow,border-color] duration-500 ease-out hover:border-brand/40 hover:shadow-raised motion-safe:hover:-translate-y-1';
const delay = (ms: number) => ({ ['--rise-delay' as string]: `${ms}ms` });

/** "Dr. Sakshi Singhal" → "SS", "Fr. J. Dayal, SJ" → "JD": title and suffix dropped. */
const initials = (name: string) => {
  const parts = name
    .replace(/,.*$/, '')
    .split(/\s+/)
    .filter((part) => !/^(Dr|Fr|Mr|Ms|Mrs|Prof)\.$/.test(part));
  return `${parts[0]?.[0] ?? ''}${parts.length > 1 ? (parts.at(-1)?.[0] ?? '') : ''}`;
};

/**
 * Sustainability › Team.
 *
 * ## The model
 *
 * Two groups, as on the Delhi page, and they are different kinds of thing:
 *
 *  1. **Hero** — the title, the Sustainability contact address, and the two
 *     group sizes, so the way to reach the team is on screen before anything
 *     else. Light, like the other pages.
 *  2. **Core Team** — faculty, so they get faculty cards: a portrait,
 *     designation, their area as tags, and a link to the full profile — on
 *     this site for those in the Full Time Faculty directory, on the
 *     institute's site for the rest.
 *  3. **Campus Sustainability Committee** — a committee, so it reads as a
 *     roster: the Convenor first and wider, then the members. Anyone in the
 *     faculty directory gets its photograph and links to their profile; the
 *     rest get a monogram rather than a silhouette, which would look like a
 *     missing image.
 *
 * Motion is light and slow, in the brand colours: the title rule draws and
 * the blocks rise in on load; cards lift on hover with a lime bar. None of it
 * plays under `prefers-reduced-motion`.
 *
 * Server Component; no client JavaScript.
 */
export function SustainabilityTeam({ content }: { content: ResolvedSustainabilityTeamPage }) {
  const { coreTeam, committee } = content;
  const byId = new Map(coreTeam.members.map((member) => [member.id, member]));
  const [convenor, ...members] = committee.members;

  return (
    <article aria-labelledby="team-heading">
      {/* ---------------- hero ---------------- */}
      <section className="bg-surface">
        <div className={`${MEASURE} pt-8 pb-14 md:pt-10 md:pb-16`}>
          <Breadcrumbs
            items={[
              { label: 'Home', href: routes.home },
              { label: 'Sustainability' },
              { label: 'Team' },
            ]}
          />

          <div className="mt-8 grid grid-cols-1 items-end gap-10 md:mt-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <p className="flex items-center gap-2.5 text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase">
                <LeafIcon size={18} aria-hidden="true" />
                Sustainability
              </p>
              <h1
                id="team-heading"
                className="mt-3 font-serif text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.03] tracking-[-0.03em] text-balance text-brand"
              >
                {content.title}
              </h1>
              <span
                aria-hidden="true"
                className="rule-draw mt-6 block h-[3px] w-14 origin-left bg-accent-surface"
              />
              <a
                href={`mailto:${content.contactEmail}`}
                className="rise-in group mt-8 inline-flex items-center gap-3 rounded-full border border-border-strong bg-surface py-2 pr-5 pl-2 text-[0.9375rem] text-ink-strong transition-[border-color,box-shadow] duration-500 hover:border-accent-surface hover:shadow-raised"
                style={delay(150)}
              >
                <span className="flex size-9 items-center justify-center rounded-full bg-accent-surface text-brand-950 transition-transform duration-500 ease-out motion-safe:group-hover:scale-110">
                  <ArrowRightIcon size={15} aria-hidden="true" />
                </span>
                <span>
                  <span className="text-ink-muted">Contact us: </span>
                  <span className="font-semibold transition-colors duration-500 group-hover:text-brand">
                    {content.contactEmail}
                  </span>
                </span>
              </a>
            </div>

            <dl
              className="rise-in grid grid-cols-2 overflow-hidden rounded-[8px] border border-border"
              style={delay(250)}
            >
              {[
                { id: 'core', value: coreTeam.members.length, label: 'Faculty in the core team' },
                {
                  id: 'committee',
                  value: committee.members.length,
                  label: 'Members of the campus committee',
                },
              ].map((fact, index) => (
                // Label first in the DOM (a <dt> must precede its <dd>), figure
                // first on screen.
                <div
                  key={fact.id}
                  className={`group relative flex flex-col-reverse justify-end bg-surface-subtle px-6 py-6 transition-colors duration-500 hover:bg-surface ${index === 1 ? 'border-l border-border' : ''}`}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent-surface transition-transform duration-700 ease-out group-hover:scale-x-100"
                  />
                  <dt className="mt-2 text-sm leading-snug text-ink-muted">{fact.label}</dt>
                  <dd className="font-serif text-[clamp(2.5rem,5vw,3.25rem)] leading-none text-brand">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ---------------- core team ---------------- */}
      <section aria-labelledby="core-heading" className="bg-surface-subtle">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <h2 id="core-heading" className={H2}>
            {coreTeam.heading}
          </h2>
          <span aria-hidden="true" className="mt-4 block h-[3px] w-10 bg-accent-surface" />

          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-12 lg:grid-cols-3 lg:gap-8">
            {coreTeam.members.map((member, index) => (
              // rise-in sits on the item, the hover lift on the card inside:
              // both use `translate`, so they cannot share an element.
              <li key={member.id} className="rise-in" style={delay(300 + index * 120)}>
                <CoreTeamCard member={member} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- committee ---------------- */}
      <section aria-labelledby="committee-heading" className="bg-surface">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <h2 id="committee-heading" className={H2}>
            {committee.heading}
          </h2>
          <span aria-hidden="true" className="mt-4 block h-[3px] w-10 bg-accent-surface" />

          <div className="mt-10 grid grid-cols-1 gap-6 md:mt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-8">
            {convenor ? (
              <PersonLink
                href={convenor.href}
                className={`group relative flex flex-col items-center justify-center overflow-hidden rounded-[8px] border border-t-[3px] border-border border-t-accent-surface bg-surface p-8 text-center shadow-raised md:p-10 ${convenor.href ? `${LIFT} hover:border-t-accent-surface` : ''}`}
              >
                <Avatar name={convenor.name} photo={convenor.photo} size="lg" />
                <span className="mt-5 block font-serif text-2xl leading-tight text-ink-strong transition-colors duration-500 group-hover:text-brand">
                  {convenor.name}
                </span>
                <span className="mt-2 block text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase">
                  {convenor.role}
                </span>
                {convenor.href ? <ProfileCue name={convenor.name} /> : null}
              </PersonLink>
            ) : null}

            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {members.map((member) => (
                <li key={member.id}>
                  <CommitteeRow
                    member={member}
                    inCore={Boolean(member.coreTeamId && byId.has(member.coreTeamId))}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </article>
  );
}

/** A link when the person has a profile here, otherwise a plain block. */
function PersonLink({
  href,
  className,
  children,
}: {
  href: string | undefined;
  className: string;
  children: ReactNode;
}) {
  return href ? (
    <NextLink href={href} className={className}>
      {children}
    </NextLink>
  ) : (
    <div className={className}>{children}</div>
  );
}

function ProfileCue({ name }: { name: string }) {
  return (
    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
      View profile
      <ArrowRightIcon
        size={13}
        aria-hidden="true"
        className="text-accent-700 transition-transform duration-500 motion-safe:group-hover:translate-x-1"
      />
      <span className="sr-only"> of {name}</span>
    </span>
  );
}

function CommitteeRow({ member, inCore }: { member: ResolvedCommitteeMember; inCore: boolean }) {
  return (
    <PersonLink
      href={member.href}
      className={`group flex h-full items-center gap-4 rounded-[8px] border border-border bg-surface p-4 md:p-5 ${member.href ? `${LIFT} hover:border-accent-surface` : ''}`}
    >
      <Avatar name={member.name} photo={member.photo} size="sm" />
      <span className="min-w-0 flex-1">
        <span className="block font-serif text-lg leading-snug text-ink-strong transition-colors duration-500 group-hover:text-brand">
          {member.name}
        </span>
        <span className="mt-0.5 block text-sm text-ink-muted">
          {member.role}
          {inCore ? <span className="text-accent-700"> · Also in the core team</span> : null}
        </span>
      </span>
      {member.href ? (
        <ArrowRightIcon
          size={15}
          aria-hidden="true"
          className="shrink-0 text-accent-700 opacity-0 transition-[opacity,translate] duration-500 group-hover:opacity-100 motion-safe:group-hover:translate-x-0.5"
        />
      ) : null}
    </PersonLink>
  );
}

function CoreTeamCard({ member }: { member: ResolvedCoreTeamMember }) {
  const className = `group relative grid h-full grid-cols-[7rem_minmax(0,1fr)] overflow-hidden rounded-[8px] border border-border bg-surface sm:flex sm:flex-col ${LIFT}`;
  const body = (
    <>
      {/* A lime bar that sweeps across the top on hover. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-10 h-1 origin-left scale-x-0 bg-accent-surface transition-transform duration-700 ease-out group-hover:scale-x-100"
      />
      <span className="relative block aspect-square self-start overflow-hidden bg-surface-subtle sm:aspect-[5/4] sm:w-full sm:self-stretch">
        <Image
          src={member.portrait.src}
          alt=""
          fill
          sizes="(min-width: 1280px) 373px, (min-width: 1024px) 30vw, (min-width: 640px) 46vw, 112px"
          className="object-cover object-[center_30%] transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
        />
      </span>
      <span className="flex flex-1 flex-col p-4 sm:p-6">
        <span className="font-serif text-xl leading-tight text-ink-strong transition-colors duration-500 group-hover:text-brand">
          {member.name}
        </span>
        <span className="mt-1.5 text-[0.9375rem] font-medium text-ink-muted">
          {member.designation}
        </span>
        <span className="mt-5 text-xs font-semibold tracking-[0.14em] text-accent-700 uppercase">
          {member.focus.label}
        </span>
        <span className="mt-2 flex flex-wrap gap-2">
          {member.focus.items.map((item) => (
            <span
              key={item}
              className="rounded-full border border-border-strong/60 px-3 py-1 text-sm text-ink-strong transition-colors duration-500 group-hover:border-accent-surface"
            >
              {item}
            </span>
          ))}
        </span>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-brand sm:pt-6">
          View profile
          {member.internal ? (
            <ArrowRightIcon
              size={13}
              aria-hidden="true"
              className="text-accent-700 transition-transform duration-500 motion-safe:group-hover:translate-x-1"
            />
          ) : (
            <ExternalIcon size={13} aria-hidden="true" className="text-accent-700" />
          )}
          <span className="sr-only">
            {' '}
            of {member.name}
            {member.internal ? '' : ' (opens in a new tab)'}
          </span>
        </span>
      </span>
    </>
  );

  return member.internal ? (
    <NextLink href={member.href} className={className}>
      {body}
    </NextLink>
  ) : (
    <a href={member.href} target="_blank" rel="noopener noreferrer" className={className}>
      {body}
    </a>
  );
}

function Avatar({
  name,
  photo,
  size,
}: {
  name: string;
  photo: string | undefined;
  size: 'sm' | 'lg';
}) {
  const box = size === 'lg' ? 'size-28 text-3xl ring-4' : 'size-14 text-lg ring-2';
  if (photo) {
    return (
      <span
        className={`relative block shrink-0 overflow-hidden rounded-full ring-accent-100 transition-shadow duration-500 group-hover:ring-accent-surface ${box}`}
      >
        <Image
          src={photo}
          alt=""
          fill
          sizes={size === 'lg' ? '112px' : '56px'}
          className="object-cover object-[center_20%] transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.06]"
        />
      </span>
    );
  }
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full bg-brand font-serif text-white ring-accent-100 transition-shadow duration-500 group-hover:ring-accent-surface ${box}`}
    >
      {initials(name)}
    </span>
  );
}
