import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { BookIcon } from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import type { LibraryContent } from '@/types/library';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';

/**
 * The frame of every library sub-page: a compact hero (breadcrumbs, title,
 * one line), then the page's own content. The library menu is the submenu bar
 * above, from the section layout.
 */
export function LibraryLayout({
  content,
  title,
  intro,
  children,
}: {
  content: LibraryContent;
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <article aria-labelledby="library-page-heading">
      <section data-motif="hero" className="relative isolate overflow-hidden bg-surface">
        <div className={`${MEASURE} pt-8 pb-12 md:pt-10 md:pb-14`}>
          <Breadcrumbs
            items={[
              { label: 'Home', href: routes.home },
              { label: 'Campus Life' },
              { label: content.title, href: routes.campusLife.library },
              { label: title },
            ]}
          />
          <div className="mt-8 max-w-3xl md:mt-10">
            <p className="flex items-center gap-2.5 text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase">
              <BookIcon size={18} aria-hidden="true" />
              {content.title} · {content.subtitle}
            </p>
            <h1
              id="library-page-heading"
              className="mt-3 font-serif text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.03em] text-balance text-brand"
            >
              {title}
            </h1>
            <span
              aria-hidden="true"
              className="rule-draw mt-6 block h-[3px] w-14 origin-left bg-accent-surface"
            />
            <p
              className="rise-in mt-6 text-lg leading-[1.75] text-ink"
              style={{ ['--rise-delay' as string]: '150ms' }}
            >
              {intro}
            </p>
          </div>
        </div>
      </section>

      <div className="bg-surface-subtle">
        <div className={`${MEASURE} py-10 md:py-14 lg:py-16`}>{children}</div>
      </div>
    </article>
  );
}
