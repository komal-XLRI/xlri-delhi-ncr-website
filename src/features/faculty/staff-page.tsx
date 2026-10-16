import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { routes } from '@/constants/routes';
import type { StaffDirectory } from '@/types/faculty';

import { StaffGrid } from './staff-grid';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';

/**
 * Faculty & Research › Staff.
 *
 * The header matches the faculty listings — breadcrumbs, title, lime rule —
 * and the cards follow the faculty cards' look (photograph, name, a line
 * under it, a lime bar on hover), four to a row because there is less to say
 * about each person. A search box filters by name or role (`StaffGrid`).
 *
 * Content comes from `content/faculty/staff.json`, in the institute's order.
 */
export function StaffPage({ directory }: { directory: StaffDirectory }) {
  return (
    <article aria-labelledby="staff-heading" className="bg-surface">
      <div className={`${MEASURE} pt-8 pb-16 md:pt-10 md:pb-24`}>
        <Breadcrumbs
          items={[
            { label: 'Home', href: routes.home },
            { label: directory.breadcrumb.section },
            { label: directory.breadcrumb.page },
          ]}
        />

        <h1
          id="staff-heading"
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

        <div className="mt-6 md:mt-8">
          <StaffGrid staff={directory.staff} labels={directory.labels} />
        </div>
      </div>
    </article>
  );
}
