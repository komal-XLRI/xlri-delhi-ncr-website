import Image from 'next/image';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ArrowRightIcon } from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import type { BiographyBlock, FacultyProfile } from '@/types/faculty';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';

/**
 * Faculty & Research › Full Time Faculty › one person — the institute's
 * faculty profile (xlri.ac.in › About › Full Time Faculty › a name) with
 * Delhi-NCR's content.
 *
 *  - **Left column** — the photograph, name, campus, scholarly links, and the
 *    Brief Profile table (designation, full qualification, functional area,
 *    email). On a large, tall enough screen it stays in view while the
 *    biography scrolls; on a short one it scrolls too, so nothing is cut off.
 *  - **Right column** — the biography's sections in the order the Delhi
 *    profile gives them, lists marked with the institute's lime plus.
 *
 * Everything comes from `content/faculty/full-time.json` (the card data) and
 * `content/faculty/full-time-biographies.json` (the long form). Server
 * Component; no client JavaScript.
 */
export function FacultyProfilePage({ profile }: { profile: FacultyProfile }) {
  const { member, biography } = profile;
  const links = [
    { label: 'LinkedIn', href: biography.links.linkedin },
    { label: 'Google Scholar', href: biography.links.scholar },
    { label: 'ORCID', href: biography.links.orcid },
  ].filter((l): l is { label: string; href: string } => Boolean(l.href));

  // The left column fits a screen 880px tall or more with the four standard rows and a
  // qualification of up to about three lines; extra rows or a long
  // qualification make it too tall to stick.
  const sticks = (biography.facts?.length ?? 0) === 0 && biography.qualification.length <= 140;

  const facts = [
    { label: 'Designation', value: member.designation },
    { label: 'Qualification', value: biography.qualification },
    { label: 'Functional Area', value: member.areas.join(', ') },
    ...(biography.facts ?? []),
  ];

  return (
    <article
      aria-labelledby="profile-heading"
      // The triangle cluster, bottom-left — see the "Brand motif" block in base.css.
      data-motif="profile"
      className="relative isolate overflow-clip bg-surface"
    >
      <div className={`${MEASURE} pt-8 pb-16 md:pt-10 md:pb-24`}>
        <Breadcrumbs
          items={[
            { label: 'Home', href: routes.home },
            { label: 'Faculty & Research' },
            { label: 'Full Time Faculty', href: routes.faculty.fullTime },
            { label: member.name },
          ]}
        />

        <div className="mt-8 grid grid-cols-1 gap-12 md:mt-10 lg:grid-cols-[minmax(0,21rem)_minmax(0,1fr)] lg:gap-16 xl:gap-20">
          {/* ---------------- left: photo and brief profile ---------------- */}
          <aside aria-label="Brief profile" className="rise-in">
            <div
              className={
                // A sticky column taller than the screen hides its own foot, so
                // it only sticks when it is short enough to show whole.
                sticks
                  ? '[@media(min-width:1024px)_and_(min-height:880px)]:sticky [@media(min-width:1024px)_and_(min-height:880px)]:top-[8.5rem]'
                  : undefined
              }
            >
              <div className="group relative max-w-[14rem]">
                <span
                  aria-hidden="true"
                  className="absolute -right-3 -bottom-3 hidden h-full w-full rounded-[8px] border-2 border-accent-surface/70 transition-[translate,border-color] duration-700 ease-out group-hover:translate-x-1.5 group-hover:translate-y-1.5 group-hover:border-accent-surface sm:block"
                />
                <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] bg-surface-subtle">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    // Above the fold — the LCP element. `preload` replaces the
                    // deprecated `priority` in Next 16.
                    preload
                    sizes="224px"
                    className="object-cover object-[center_20%] transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
                  />
                </div>
              </div>

              <h1
                id="profile-heading"
                className="mt-6 font-serif text-[1.75rem] leading-tight tracking-[-0.02em] text-brand"
              >
                {member.name}
              </h1>
              <p className="mt-1.5 text-sm text-ink-muted">XLRI Delhi-NCR</p>

              {links.length > 0 ? (
                <ul className="mt-5 flex flex-col items-start gap-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-ink-strong"
                      >
                        <span className="border-b-2 border-accent-surface pb-0.5 transition-colors duration-300 group-hover/link:border-brand group-hover/link:text-brand">
                          {link.label}
                        </span>
                        <ArrowRightIcon
                          size={14}
                          aria-hidden="true"
                          className="text-accent-700 transition-transform duration-300 motion-safe:group-hover/link:translate-x-1"
                        />
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}

              <div className="mt-6 border-t border-border pt-6">
                <h2 className="font-serif text-2xl leading-tight text-ink-strong">Brief Profile</h2>
                <span aria-hidden="true" className="mt-3 block h-[3px] w-10 bg-accent-surface" />
                <dl className="mt-5 space-y-3.5 text-sm">
                  {facts.map((fact) => (
                    <div key={fact.label} className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-3">
                      <dt className="text-ink-muted">{fact.label}</dt>
                      <dd className="leading-relaxed font-semibold text-ink-strong">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                  <div className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-3">
                    <dt className="text-ink-muted">Email</dt>
                    <dd className="font-semibold">
                      <a
                        href={`mailto:${member.email}`}
                        className="break-all text-brand underline decoration-accent-surface decoration-2 underline-offset-4 hover:text-brand-950"
                      >
                        {member.email}
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </aside>

          {/* ---------------- right: the biography ---------------- */}
          <div className="rise-in min-w-0" style={{ ['--rise-delay' as string]: '200ms' }}>
            {biography.sections.length > 0 ? (
              <div className="space-y-12">
                {biography.sections.map((section, i) => (
                  <section key={i}>
                    <h2 className="font-serif text-[1.625rem] leading-tight tracking-[-0.01em] text-ink-strong">
                      {section.heading}
                    </h2>
                    <span
                      aria-hidden="true"
                      className="mt-3 block h-[3px] w-10 bg-accent-surface"
                    />
                    <div className="mt-5 space-y-4">
                      {section.blocks.map((block, index) => (
                        <Block key={index} block={block} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <p className="text-base text-ink-muted">A detailed biography will be added soon.</p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function Block({ block }: { block: BiographyBlock }) {
  if (block.type === 'subheading') {
    return <h3 className="pt-2 text-[0.9375rem] font-semibold text-ink-strong">{block.text}</h3>;
  }
  if (block.type === 'paragraph') {
    return <p className="text-[0.9375rem] leading-[1.8] text-ink">{block.text}</p>;
  }
  return (
    <ul className="space-y-3">
      {block.items.map((item, i) => (
        <li key={i} className="flex gap-3.5 text-[0.9375rem] leading-[1.75] text-ink">
          {/* The institute's lime plus. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 12 12"
            className="mt-[0.45em] size-3 shrink-0 text-accent-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          >
            <path d="M6 1v10M1 6h10" />
          </svg>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
