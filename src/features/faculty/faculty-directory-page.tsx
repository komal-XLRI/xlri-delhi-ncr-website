import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { routes } from '@/constants/routes';
import type { FacultyDirectory } from '@/types/faculty';

import { FacultyGrid } from './faculty-grid';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';

/**
 * Faculty & Research › a faculty listing — the institute's Full Time Faculty
 * page (xlri.ac.in › About › Full Time Faculty) with Delhi-NCR's people: the
 * title, the A–Z, search and functional-area filters, and a card per person
 * with photograph, designation, qualification, functional area and a link to
 * the biography.
 *
 * The people come from a JSON file in `content/faculty/`, so a new joiner or
 * a changed designation is an edit to that file alone.
 */
export function FacultyDirectoryPage({ directory }: { directory: FacultyDirectory }) {
  return (
    <article aria-labelledby="faculty-heading" className="bg-surface">
      <div className={`${MEASURE} pt-8 pb-16 md:pt-10 md:pb-24`}>
        <Breadcrumbs
          items={[
            { label: 'Home', href: routes.home },
            { label: 'Faculty & Research' },
            { label: directory.title },
          ]}
        />

        <div className="mt-6 md:mt-8">
          <div>
            <h1
              id="faculty-heading"
              className="font-serif text-[clamp(2rem,3.6vw,2.75rem)] leading-[1.05] tracking-[-0.03em] text-brand"
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
          </div>
        </div>

        <div className="mt-6 md:mt-8">
          <FacultyGrid faculty={directory.faculty} />
        </div>
      </div>
    </article>
  );
}
