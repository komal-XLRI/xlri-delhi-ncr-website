import Image from 'next/image';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { routes } from '@/constants/routes';
import type { BoardMember, BoardOfGovernors } from '@/types/board-of-governors';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';
const GRID = 'grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4 lg:gap-x-7';

/**
 * "Board of Governors".
 *
 * A port of the Jamshedpur page (xlri.ac.in/about/board-of-governors) —
 * content, portraits and layout:
 *
 *  1. The four office-bearers, each card under its position in bold:
 *     Chairman, Secretary, Vice Chairman, Treasurer (Jamshedpur's order).
 *  2. **Members**, then **Permanent Invitees**, in the same card grid.
 *
 * The card is Jamshedpur's: a hairline border, the photograph on top with a
 * rule beneath it, name and designation below. Two departures, both for
 * consistency with the other About pages rather than for looks:
 *
 *  - Portraits are cropped square toward the face, as on Leadership and
 *    Founding Fathers, so a 22-person board is not five rows of 330px-tall
 *    photographs.
 *  - Designations are real lines (role / organisation / place) rather than an
 *    HTML string, so no markup from the CMS is injected into the page.
 *
 * The text block has a minimum height so the rule beneath each card lines up
 * across a row even when one designation runs to four lines and the next to
 * two. Server Component; no client JavaScript.
 */
export function BoardOfGovernorsPage({ content }: { content: BoardOfGovernors }) {
  const { officeBearers, members, invitees } = content;

  return (
    <article aria-labelledby="board-heading" className="bg-surface">
      <div className={`${MEASURE} pt-10 pb-16 md:pt-14 md:pb-24`}>
        <Breadcrumbs
          items={[
            { label: 'Home', href: routes.home },
            { label: 'About', href: routes.about.index },
            { label: content.title },
          ]}
        />

        <h1
          id="board-heading"
          className="mt-8 font-serif text-[clamp(2rem,4.4vw,3.25rem)] leading-[1.05] tracking-[-0.035em] text-brand"
        >
          {content.title}
        </h1>

        {/* ---------------- office-bearers ---------------- */}
        <ul aria-label="Office-bearers" className={`${GRID} mt-8 md:mt-10`}>
          {officeBearers.map(({ position, member }, index) => (
            <li key={position} className="flex flex-col">
              <p className="mb-3 font-serif text-lg text-ink-strong md:text-xl">{position}</p>
              <MemberCard member={member} preload={index === 0} />
            </li>
          ))}
        </ul>

        {/* ---------------- members ---------------- */}
        <section aria-labelledby="board-members-heading" className="mt-14 md:mt-16">
          <h2
            id="board-members-heading"
            className="font-serif text-2xl leading-tight text-ink-strong md:text-[1.75rem]"
          >
            {members.heading}
          </h2>
          <ul className={`${GRID} mt-6 md:mt-8`}>
            {members.people.map((member) => (
              <li key={member.id} className="flex">
                <MemberCard member={member} />
              </li>
            ))}
          </ul>
        </section>

        {/* ---------------- permanent invitees ---------------- */}
        {invitees.people.length > 0 ? (
          <section aria-labelledby="board-invitees-heading" className="mt-14 md:mt-16">
            <h2
              id="board-invitees-heading"
              className="font-serif text-2xl leading-tight text-ink-strong md:text-[1.75rem]"
            >
              {invitees.heading}
            </h2>
            <ul className={`${GRID} mt-6 md:mt-8`}>
              {invitees.people.map((member) => (
                <li key={member.id} className="flex">
                  <MemberCard member={member} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </article>
  );
}

function MemberCard({ member, preload = false }: { member: BoardMember; preload?: boolean }) {
  return (
    <div className="group flex w-full flex-1 flex-col overflow-hidden rounded-[5px] border border-border bg-surface">
      <div className="overflow-hidden border-b border-border bg-surface-subtle">
        <Image
          src={member.portrait.src}
          width={member.portrait.width}
          height={member.portrait.height}
          alt={`Portrait of ${member.name}`}
          {...(preload ? { preload: true } : {})}
          sizes="(min-width: 1280px) 280px, (min-width: 1024px) 23vw, (min-width: 768px) 30vw, 46vw"
          className="aspect-square w-full object-cover object-[center_25%] transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex-1 p-4 md:min-h-[8.75rem] md:p-5">
        <p className="text-[0.9375rem] leading-snug font-semibold text-ink-strong md:text-base">
          {member.name}
        </p>
        <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-ink-muted md:text-sm">
          {member.lines.map((line, index) => (
            <span key={`${index}-${line}`} className="block">
              {line}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
