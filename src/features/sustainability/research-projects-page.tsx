import Image from 'next/image';
import NextLink from 'next/link';
import type { ReactNode } from 'react';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ArrowRightIcon, ExternalIcon, LandmarkIcon, LeafIcon } from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import { Avatar } from '@/features/sustainability/avatar';
import type {
  ResolvedResearchProject,
  ResolvedResearchProjectsPage,
} from '@/types/sustainability-research';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';
/** A slow lift with a soft shadow — the cards' shared hover, as on the Team page. */
const LIFT =
  'transition-[translate,box-shadow,border-color] duration-500 ease-out hover:border-accent-surface hover:shadow-raised motion-safe:hover:-translate-y-1';
const delay = (ms: number) => ({ ['--rise-delay' as string]: `${ms}ms` });

/**
 * Sustainability › Research Projects.
 *
 * ## The model
 *
 *  1. **Hero** — the title and the page's figures, light, in the layout of
 *     the other Sustainability pages, with the triangle motif in the margin.
 *  2. **One card per project**, two to a row on grey, the last spanning the
 *     row when the count is odd. Each card is a theme tag and period, the
 *     project, a line on it, its sponsors or partners as chips, and — at the
 *     foot — who leads it: a core-team member with their portrait and a link
 *     to their profile, or a centre with an emblem.
 *
 * The Delhi page writes each project as one sentence with the investigator's
 * name in it; here the name is pulled out to the foot of the card, so every
 * card reads the same way.
 *
 * Motion is light and slow, in the brand colours: the title rule draws and
 * the hero rises in on load; the cards rise as they scroll into view
 * (`.reveal`, CSS only) and lift on hover with a lime bar. None of it plays
 * under `prefers-reduced-motion`.
 *
 * Content and page copy come from `content/sustainability/research-projects.json`. Server
 * Component; no client JavaScript.
 */
export function ResearchProjects({ content }: { content: ResolvedResearchProjectsPage }) {
  const { projects } = content;
  const researchers = new Set(projects.filter((p) => p.lead.person).map((p) => p.lead.name));
  const partners = new Set(projects.flatMap((p) => p.partners.names));
  const facts = [
    { id: 'projects', value: String(projects.length), label: content.facts.projects },
    { id: 'researchers', value: String(researchers.size), label: content.facts.researchers },
    { id: 'partners', value: String(partners.size), label: content.facts.partners },
  ];
  const odd = projects.length % 2 === 1;

  return (
    <article aria-labelledby="research-heading">
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
                id="research-heading"
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

      {/* ---------------- projects ---------------- */}
      <section aria-label="Projects" className="bg-surface-subtle">
        <div className={`${MEASURE} py-16 md:py-20 lg:py-24`}>
          <ul className="grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-2">
            {projects.map((project, index) => (
              // `.reveal` on the item, the hover lift on the card: both set a transform.
              <li
                key={project.id}
                id={project.id}
                className={`reveal scroll-mt-36 ${odd && index === projects.length - 1 ? 'lg:col-span-2' : ''}`}
                style={{ ['--reveal-start' as string]: `${String(4 + (index % 2) * 6)}%` }}
              >
                <ProjectCard project={project} profileLabel={content.labels.profile} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}

function ProjectCard({
  project,
  profileLabel,
}: {
  project: ResolvedResearchProject;
  profileLabel: string;
}) {
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-[8px] border border-border bg-surface ${LIFT}`}
    >
      {/* A lime bar that sweeps across the top on hover. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-10 h-1 origin-left scale-x-0 bg-accent-surface transition-transform duration-700 ease-out group-hover:scale-x-100"
      />

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="rounded-full bg-accent-surface/25 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-accent-700 uppercase">
            {project.theme}
          </span>
          {project.period ? (
            <span className="text-sm font-medium text-ink-muted">{project.period}</span>
          ) : null}
        </p>
        <h2 className="mt-4 font-serif text-[clamp(1.25rem,2vw,1.625rem)] leading-snug text-ink-strong transition-colors duration-500 group-hover:text-brand">
          {project.title}
        </h2>
        <p className="mt-3 text-[0.9375rem] leading-[1.8] text-ink md:text-base">
          {project.summary}
        </p>

        <div className="mt-5">
          <p className="text-xs font-semibold tracking-[0.16em] text-ink-muted uppercase">
            {project.partners.label}
          </p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {project.partners.names.map((name) => (
              <li
                key={name}
                className="rounded-full border border-border-strong/60 px-3 py-1 text-sm text-ink-strong transition-colors duration-500 group-hover:border-accent-surface"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ---- who leads it ---- */}
      <div className="mt-auto flex items-center gap-4 border-t border-border bg-surface-subtle/60 px-6 py-4 md:px-8">
        <LeadEmblem lead={project.lead} />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-[0.14em] text-accent-700 uppercase">
            {project.lead.role}
          </p>
          <p className="mt-0.5 leading-snug font-semibold text-ink-strong">{project.lead.name}</p>
        </div>
        {project.lead.profile ? (
          <ProfileLink
            name={project.lead.name}
            profile={project.lead.profile}
            label={profileLabel}
          />
        ) : null}
      </div>
    </article>
  );
}

function LeadEmblem({ lead }: { lead: ResolvedResearchProject['lead'] }) {
  if (lead.portrait) {
    return (
      <span className="relative block size-12 shrink-0 overflow-hidden rounded-full ring-2 ring-accent-100 transition-shadow duration-500 group-hover:ring-accent-surface">
        <Image
          src={lead.portrait}
          alt=""
          fill
          sizes="48px"
          className="object-cover object-[center_20%]"
        />
      </span>
    );
  }
  if (lead.person) return <Avatar name={lead.name} size="sm" />;
  return (
    <span
      aria-hidden="true"
      className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand text-white ring-2 ring-accent-100 transition-shadow duration-500 group-hover:ring-accent-surface"
    >
      <LandmarkIcon size={20} />
    </span>
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
    'group/link relative z-20 inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand transition-colors duration-500 hover:text-brand-950';
  const label: ReactNode = (
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
