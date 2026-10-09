import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { routes } from '@/constants/routes';
import { FoundingFathersGrid } from '@/features/about/founding-fathers-grid';
import type { FoundingFathers } from '@/types/founding-fathers';

/**
 * "Jesuit Founding Fathers".
 *
 * A port of the Jamshedpur page (xlri.ac.in/about/jesuit-founding-fathers) —
 * content, portraits and layout: a centred title, the "Who is who" line and a
 * short introduction, then the portrait grid, each card opening a dialog with
 * the father's biography. The grid and dialog are the client half; see
 * `founding-fathers-grid.tsx`.
 */
export function FoundingFathersPage({ content }: { content: FoundingFathers }) {
  return (
    <article aria-labelledby="founding-fathers-heading" className="bg-surface">
      <div className="mx-auto w-full max-w-[80rem] px-6 pt-10 pb-12 md:px-8 md:pt-14 md:pb-16 lg:px-12">
        <Breadcrumbs
          items={[
            { label: 'Home', href: routes.home },
            { label: 'About', href: routes.about.index },
            { label: content.title },
          ]}
        />

        <header className="mx-auto mt-6 max-w-[44rem] text-center md:mt-8">
          <h1
            id="founding-fathers-heading"
            className="font-serif text-[clamp(2rem,4.4vw,3.25rem)] leading-[1.05] tracking-[-0.035em] text-brand"
          >
            {content.title}
          </h1>
          <span
            aria-hidden="true"
            className="rule-draw mx-auto mt-4 block h-[3px] w-14 bg-accent-surface"
          />
          <p className="mt-4 text-lg font-semibold text-ink-strong md:text-xl">
            {content.subtitle}
          </p>
          <p className="mt-2 text-base leading-[1.75] text-ink md:text-[1.0625rem]">
            {content.intro}
          </p>
        </header>

        <div className="mt-8 md:mt-10">
          <FoundingFathersGrid fathers={content.fathers} />
        </div>
      </div>
    </article>
  );
}
