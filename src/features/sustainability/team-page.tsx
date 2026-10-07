import Image from 'next/image';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ArrowRightIcon, ExternalIcon, LeafIcon } from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import type { CoreTeamMember, SustainabilityTeamPage } from '@/types/sustainability-team';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';
const H2 =
  'font-serif text-[clamp(1.75rem,3.2vw,2.5rem)] leading-tight tracking-[-0.02em] text-ink-strong';

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
 *  1. **Hero** (navy) — the title, the two group sizes, and the
 *     Sustainability contact address, so the way to reach the team is on
 *     screen before anything else.
 *  2. **Core Team** — faculty, so they get faculty cards: a square portrait,
 *     designation, their area as tags, and a link to the full profile.
 *  3. **Campus Sustainability Committee** — a committee, so it reads as a
 *     roster: the Convenor first and wider, then the members. Only two members
 *     have photographs (both are also in the core team, and their portraits
 *     are reused); the rest get a monogram rather than a silhouette, which
 *     would look like a missing image.
 *
 * Server Component; no client JavaScript.
 */
export function SustainabilityTeam({ content }: { content: SustainabilityTeamPage }) {
  const { coreTeam, committee } = content;
  const byId = new Map(coreTeam.members.map((member) => [member.id, member]));
  const [convenor, ...members] = committee.members;

  return (
    <article aria-labelledby="team-heading">
      {/* ---------------- hero ---------------- */}
      <section className="purpose-band text-ink-inverse">
        <div className={`${MEASURE} pt-8 pb-14 md:pt-10 md:pb-16`}>
          <Breadcrumbs
            className="[&_a]:text-white/70 [&_a:hover]:text-white [&_span]:text-white"
            items={[
              { label: 'Home', href: routes.home },
              { label: 'Sustainability' },
              { label: 'Team' },
            ]}
          />

          <div className="mt-10 grid grid-cols-1 items-end gap-10 md:mt-14 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <p className="flex items-center gap-2.5 text-sm font-semibold tracking-[0.18em] text-accent-surface uppercase">
                <LeafIcon size={18} aria-hidden="true" />
                Sustainability
              </p>
              <h1
                id="team-heading"
                className="mt-4 font-serif text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.03] tracking-[-0.03em] text-balance text-white"
              >
                {content.title}
              </h1>
              <span aria-hidden="true" className="mt-7 block h-[3px] w-14 bg-accent-surface" />
              <a
                href={`mailto:${content.contactEmail}`}
                className="group mt-8 inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/[0.06] py-2.5 pr-5 pl-2.5 text-[0.9375rem] text-white transition-colors duration-200 hover:border-accent-surface hover:bg-white/10"
              >
                <span className="flex size-8 items-center justify-center rounded-full bg-accent-surface text-brand-950">
                  <ArrowRightIcon size={15} aria-hidden="true" />
                </span>
                <span>
                  <span className="text-white/70">Contact us: </span>
                  <span className="font-semibold">{content.contactEmail}</span>
                </span>
              </a>
            </div>

            <dl className="grid grid-cols-2 border-t border-white/15 lg:border-t-0 lg:border-l lg:pl-10">
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
                  className={`flex flex-col-reverse justify-end pt-6 lg:pt-0 ${index === 1 ? 'border-l border-white/15 pl-6 lg:pl-10' : 'pr-6'}`}
                >
                  <dt className="mt-2 text-sm leading-snug text-white/70">{fact.label}</dt>
                  <dd className="font-serif text-[clamp(2.5rem,5vw,3.5rem)] leading-none text-white">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ---------------- core team ---------------- */}
      <section aria-labelledby="core-heading" className="bg-surface">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <h2 id="core-heading" className={H2}>
            {coreTeam.heading}
          </h2>
          <span aria-hidden="true" className="mt-4 block h-[3px] w-10 bg-accent-surface" />

          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-12 lg:grid-cols-3 lg:gap-8">
            {coreTeam.members.map((member) => (
              <li key={member.id}>
                <CoreTeamCard member={member} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- committee ---------------- */}
      <section aria-labelledby="committee-heading" className="bg-surface-subtle">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <h2 id="committee-heading" className={H2}>
            {committee.heading}
          </h2>
          <span aria-hidden="true" className="mt-4 block h-[3px] w-10 bg-accent-surface" />

          <div className="mt-10 grid grid-cols-1 gap-6 md:mt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-8">
            {convenor ? (
              <div className="flex flex-col items-center justify-center rounded-[8px] border border-t-[3px] border-border border-t-accent-surface bg-surface p-8 text-center shadow-raised md:p-10">
                <Avatar name={convenor.name} photo={undefined} size="lg" />
                <p className="mt-5 font-serif text-2xl leading-tight text-ink-strong">
                  {convenor.name}
                </p>
                <p className="mt-2 text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase">
                  {convenor.role}
                </p>
              </div>
            ) : null}

            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {members.map((member) => {
                const core = member.coreTeamId ? byId.get(member.coreTeamId) : undefined;
                return (
                  <li
                    key={member.id}
                    className="flex items-center gap-4 rounded-[8px] border border-border bg-surface p-4 md:p-5"
                  >
                    <Avatar name={member.name} photo={core?.portrait.src} size="sm" />
                    <div className="min-w-0">
                      <p className="font-serif text-lg leading-snug text-ink-strong">
                        {member.name}
                      </p>
                      <p className="mt-0.5 text-sm text-ink-muted">
                        {member.role}
                        {core ? (
                          <span className="text-accent-700"> · Also in the core team</span>
                        ) : null}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </article>
  );
}

function CoreTeamCard({ member }: { member: CoreTeamMember }) {
  return (
    <a
      href={member.profileHref}
      target="_blank"
      rel="noopener noreferrer"
      className="group grid h-full grid-cols-[7rem_minmax(0,1fr)] overflow-hidden rounded-[8px] border border-border bg-surface transition-[border-color,box-shadow] duration-300 hover:border-brand hover:shadow-raised sm:flex sm:flex-col"
    >
      <span className="relative block aspect-square self-start overflow-hidden bg-surface-subtle sm:aspect-[5/4]">
        <Image
          src={member.portrait.src}
          alt=""
          fill
          sizes="(min-width: 1280px) 373px, (min-width: 1024px) 30vw, (min-width: 640px) 46vw, 112px"
          className="object-cover object-[center_30%] transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
        />
      </span>
      <span className="flex flex-1 flex-col p-4 sm:p-6">
        <span className="font-serif text-xl leading-tight text-ink-strong group-hover:text-brand">
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
              className="rounded-full border border-border-strong/60 px-3 py-1 text-sm text-ink-strong"
            >
              {item}
            </span>
          ))}
        </span>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-brand sm:pt-6">
          View profile
          <ExternalIcon size={13} aria-hidden="true" className="text-accent-700" />
          <span className="sr-only"> of {member.name} (opens in a new tab)</span>
        </span>
      </span>
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
        className={`relative block shrink-0 overflow-hidden rounded-full ring-accent-100 ${box}`}
      >
        <Image
          src={photo}
          alt=""
          fill
          sizes={size === 'lg' ? '112px' : '56px'}
          className="object-cover"
        />
      </span>
    );
  }
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full bg-brand-950 font-serif text-white ring-accent-100 ${box}`}
    >
      {initials(name)}
    </span>
  );
}
