import Image from 'next/image';
import NextLink from 'next/link';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ArrowRightIcon, ExternalIcon, LeafIcon } from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import { Avatar } from '@/features/sustainability/avatar';
import type {
  CommitteeAppointment,
  ResolvedGovernmentCommitteeMember,
  ResolvedGovernmentCommitteesPage,
} from '@/types/sustainability-government';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';
const delay = (ms: number) => ({ ['--rise-delay' as string]: `${ms}ms` });

/**
 * Sustainability › Government Committees.
 *
 * ## The model
 *
 *  1. **Hero** — the title and the page's figures, light, in the layout of
 *     the other Sustainability pages, with the triangle motif in the margin.
 *  2. **One card per faculty member**, on grey. The Delhi page is a flat list
 *     of sentences that repeat each name; here the person is said once — with
 *     their portrait, designation and profile link from the core team where
 *     they are in it, a monogram where not — and their appointments are listed
 *     beside them: the committee, their role, who convenes it, and a period,
 *     tagged by kind and whether it is current.
 *
 * Motion is light and slow, in the brand colours: the title rule draws and
 * the hero rises in on load; the cards rise as they scroll into view
 * (`.reveal`, CSS only); each appointment draws a lime bar on hover and the
 * portrait zooms. None of it plays under `prefers-reduced-motion`.
 *
 * Content and page copy come from `content/sustainability/government-committees.json`.
 * Server Component; no client JavaScript.
 */
export function GovernmentCommittees({ content }: { content: ResolvedGovernmentCommitteesPage }) {
  const { members } = content;
  const appointments = members.flatMap((member) => member.appointments);
  const facts = [
    {
      id: 'appointments',
      value: String(appointments.length),
      label: content.facts.appointments,
    },
    { id: 'faculty', value: String(members.length), label: content.facts.faculty },
    {
      id: 'current',
      value: String(appointments.filter((a) => a.current).length),
      label: content.facts.current,
    },
  ];

  return (
    <article aria-labelledby="government-heading">
      {/* ---------------- hero ---------------- */}
      <section data-motif="hero" className="relative isolate overflow-hidden bg-surface">
        <div className={`${MEASURE} pt-8 pb-12 md:pt-10 md:pb-14`}>
          <Breadcrumbs
            items={[
              { label: 'Home', href: routes.home },
              { label: content.breadcrumb.section },
              { label: content.breadcrumb.page },
            ]}
          />

          <div className="mt-8 grid grid-cols-1 items-end gap-10 md:mt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-16">
            <div>
              <p className="flex items-center gap-2.5 text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase">
                <LeafIcon size={18} aria-hidden="true" />
                {content.eyebrow}
              </p>
              <h1
                id="government-heading"
                className="mt-3 font-serif text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.03] tracking-[-0.03em] text-balance text-brand"
              >
                {content.title}
              </h1>
              <span
                aria-hidden="true"
                className="rule-draw mt-6 block h-[3px] w-14 origin-left bg-accent-surface"
              />
            </div>

            <dl
              className="rise-in grid grid-cols-3 overflow-hidden rounded-[8px] border border-border"
              style={delay(200)}
            >
              {facts.map((fact, index) => (
                // Label first in the DOM (a <dt> must precede its <dd>), figure
                // first on screen.
                <div
                  key={fact.id}
                  className={`group relative flex flex-col-reverse justify-end bg-surface-subtle px-4 py-5 transition-colors duration-500 hover:bg-surface sm:px-6 sm:py-6 ${index > 0 ? 'border-l border-border' : ''}`}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent-surface transition-transform duration-700 ease-out group-hover:scale-x-100"
                  />
                  <dt className="mt-2 text-sm leading-snug text-ink-muted">{fact.label}</dt>
                  <dd className="font-serif text-[clamp(2rem,4vw,2.75rem)] leading-none text-brand">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ---------------- members ---------------- */}
      <section aria-label="Faculty and their committees" className="bg-surface-subtle">
        <div className={`${MEASURE} py-16 md:py-20 lg:py-24`}>
          <ul className="flex flex-col gap-6 md:gap-8">
            {members.map((member) => (
              <li key={member.id} id={member.id} className="reveal scroll-mt-36">
                <MemberCard member={member} labels={content.labels} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}

type Labels = ResolvedGovernmentCommitteesPage['labels'];

function MemberCard({
  member,
  labels,
}: {
  member: ResolvedGovernmentCommitteeMember;
  labels: Labels;
}) {
  const headingId = `${member.id}-heading`;
  return (
    <article
      aria-labelledby={headingId}
      className="grid grid-cols-1 overflow-hidden rounded-[8px] border border-border bg-surface md:grid-cols-[15rem_minmax(0,1fr)] lg:grid-cols-[17rem_minmax(0,1fr)]"
    >
      {/* ---- the person ---- */}
      <div className="group flex items-center gap-5 border-b border-border p-6 md:flex-col md:items-start md:border-r md:border-b-0 md:p-8">
        {member.portrait ? (
          <span className="relative block size-24 shrink-0 overflow-hidden rounded-[8px] bg-surface-subtle ring-1 ring-border transition-shadow duration-500 group-hover:ring-2 group-hover:ring-accent-surface md:aspect-square md:size-auto md:w-full">
            <Image
              src={member.portrait}
              alt=""
              fill
              sizes="(min-width: 1024px) 208px, (min-width: 768px) 176px, 96px"
              className="object-cover object-[center_25%] transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
            />
          </span>
        ) : (
          <Avatar name={member.name} size="lg" />
        )}
        <div className="min-w-0">
          <h2
            id={headingId}
            className="font-serif text-xl leading-tight text-ink-strong md:text-2xl"
          >
            {member.name}
          </h2>
          {member.designation ? (
            <p className="mt-1.5 text-[0.9375rem] font-medium text-ink-muted">
              {member.designation}
            </p>
          ) : null}
          {member.profile ? (
            <ProfileLink name={member.name} profile={member.profile} label={labels.viewProfile} />
          ) : null}
        </div>
      </div>

      {/* ---- their appointments ---- */}
      <ul className="divide-y divide-border">
        {member.appointments.map((appointment) => (
          <li key={appointment.id}>
            <Appointment appointment={appointment} labels={labels} />
          </li>
        ))}
      </ul>
    </article>
  );
}

function ProfileLink({
  name,
  profile,
  label: text,
}: {
  name: string;
  profile: { href: string; internal: boolean };
  label: string;
}) {
  const className =
    'group/link mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors duration-500 hover:text-brand-950';
  const label = (
    <>
      {text}
      <span className="sr-only"> of {name}</span>
    </>
  );
  return profile.internal ? (
    <NextLink href={profile.href} className={className}>
      {label}
      <ArrowRightIcon
        size={13}
        aria-hidden="true"
        className="text-accent-700 transition-transform duration-500 motion-safe:group-hover/link:translate-x-1"
      />
    </NextLink>
  ) : (
    <a href={profile.href} target="_blank" rel="noopener noreferrer" className={className}>
      {label}
      <span className="sr-only"> (opens in a new tab)</span>
      <ExternalIcon size={13} aria-hidden="true" className="text-accent-700" />
    </a>
  );
}

function Appointment({
  appointment,
  labels,
}: {
  appointment: CommitteeAppointment;
  labels: Labels;
}) {
  return (
    <div className="group relative px-6 py-6 transition-colors duration-500 hover:bg-surface-subtle/60 md:px-8 md:py-7">
      {/* A lime bar that draws down the left edge on hover. */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-accent-surface transition-transform duration-700 ease-out group-hover:scale-y-100"
      />
      <p className="flex flex-wrap gap-2">
        <span className="rounded-full border border-border-strong/70 px-3 py-0.5 text-xs font-semibold tracking-[0.1em] text-ink-muted uppercase">
          {appointment.sector}
        </span>
        <span
          className={`rounded-full px-3 py-0.5 text-xs font-semibold tracking-[0.1em] uppercase ${appointment.current ? 'bg-accent-surface/25 text-accent-700' : 'bg-surface-subtle text-ink-muted'}`}
        >
          {appointment.current ? labels.current : labels.concluded}
        </span>
      </p>
      <h3 className="mt-3 font-serif text-xl leading-snug text-ink-strong transition-colors duration-500 group-hover:text-brand md:text-[1.375rem]">
        {appointment.committee}
      </h3>
      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink">
        <span className="font-semibold text-ink-strong">{appointment.role}</span>
        {appointment.organisation ? <> · {appointment.organisation}</> : null}
      </p>
      {appointment.detail ? (
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">{appointment.detail}</p>
      ) : null}
      {appointment.period ? (
        <p className="mt-3 text-sm font-medium text-accent-700">{appointment.period}</p>
      ) : null}
    </div>
  );
}
