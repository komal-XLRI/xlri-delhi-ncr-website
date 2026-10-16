import Image from 'next/image';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { routes } from '@/constants/routes';
import type { VisitingFacultyDirectory, VisitingFacultyMember } from '@/types/faculty';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';

/**
 * Faculty & Research › Visiting Faculty.
 *
 * The header matches the Full Time and Adjunct listings — breadcrumbs, title,
 * lime rule — but the cards do not: visiting faculty have no biography here,
 * and the Delhi listing gives only their role and where they come from. Each
 * card is a small square portrait beside the name, role and organisation.
 * The photographs the Delhi site has for them are small (139–480px), so they
 * are shown at a size where they stay sharp rather than stretched to a
 * full-width card.
 *
 * Cards rise in on load, staggered, and lift on hover with a lime bar and a
 * lime frame on the portrait. None of it plays under `prefers-reduced-motion`.
 *
 * Content and page copy come from `content/faculty/visiting.json`. Server Component; no
 * client JavaScript.
 */
export function VisitingFacultyPage({ directory }: { directory: VisitingFacultyDirectory }) {
  return (
    <article aria-labelledby="faculty-heading" className="bg-surface">
      <div className={`${MEASURE} pt-8 pb-16 md:pt-10 md:pb-24`}>
        <Breadcrumbs
          items={[
            { label: 'Home', href: routes.home },
            { label: directory.breadcrumb.section },
            { label: directory.breadcrumb.page },
          ]}
        />

        <h1
          id="faculty-heading"
          className="mt-6 font-serif text-[clamp(2rem,3.6vw,2.75rem)] leading-[1.05] tracking-[-0.03em] text-brand md:mt-8"
        >
          {directory.title}
        </h1>
        <span
          aria-hidden="true"
          className="rule-draw mt-4 block h-[3px] w-10 origin-left bg-accent-surface"
        />
        {directory.intro.length > 0 ? (
          <div
            className="rise-in mt-6 max-w-[48rem] space-y-4 text-base leading-[1.85] text-ink md:text-[1.0625rem]"
            style={{ ['--rise-delay' as string]: '150ms' }}
          >
            {directory.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        ) : null}

        <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-10 lg:grid-cols-3 lg:gap-6">
          {directory.faculty.map((member, index) => (
            // rise-in on the item, the hover lift on the card: both set a transform.
            <li
              key={member.id}
              id={member.id}
              className="rise-in scroll-mt-36"
              style={{ ['--rise-delay' as string]: `${300 + Math.min(index, 5) * 100}ms` }}
            >
              <VisitingCard member={member} />
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function VisitingCard({ member }: { member: VisitingFacultyMember }) {
  return (
    <article className="group relative flex h-full items-center gap-5 overflow-hidden rounded-[8px] border border-border bg-surface p-5 transition-[translate,box-shadow,border-color] duration-500 ease-out hover:border-accent-surface hover:shadow-raised motion-safe:hover:-translate-y-1 md:p-6">
      {/* A lime bar that draws down the left edge on hover. */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-accent-surface transition-transform duration-700 ease-out group-hover:scale-y-100"
      />
      <span className="relative block size-24 shrink-0 overflow-hidden rounded-[8px] bg-surface-subtle ring-1 ring-border transition-shadow duration-500 group-hover:ring-2 group-hover:ring-accent-surface">
        <Image
          src={member.photo}
          alt={member.name}
          fill
          sizes="96px"
          className="object-cover object-top transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.06]"
        />
      </span>
      <div className="min-w-0">
        <h2 className="font-serif text-xl leading-snug text-ink-strong transition-colors duration-500 group-hover:text-brand">
          {member.name}
        </h2>
        <p className="mt-1.5 text-[0.9375rem] font-medium text-ink-strong">{member.designation}</p>
        <p className="mt-0.5 text-sm leading-relaxed text-ink-muted">{member.organisation}</p>
      </div>
    </article>
  );
}
