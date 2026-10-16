import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Link } from '@/components/ui/link';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import type { Policies } from '@/types/policies';
import type { NavNode, UtilityNavItem } from '@/types/navigation';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';

/** A menu node's links: its own destination, then its children, nested. */
function Tree({ nodes }: { nodes: readonly NavNode[] }) {
  return (
    <ul className="flex flex-col gap-1.5">
      {nodes.map((node) => (
        <li key={node.id}>
          {node.href ? (
            <Link
              href={node.href}
              siteUrl={site.url}
              variant="bare"
              className="text-[0.9375rem] text-ink transition-colors duration-300 hover:text-brand hover:underline"
            >
              {node.label}
            </Link>
          ) : (
            <span className="text-xs font-semibold tracking-[0.14em] text-ink-muted uppercase">
              {node.label}
            </span>
          )}
          {node.children?.length ? (
            <div className="mt-1.5 mb-2 border-l border-border pl-4">
              <Tree nodes={node.children} />
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

/**
 * The HTML sitemap — every page, by section. It is the main menu itself
 * (`config/navigation.json`), so a page added to the menu appears here too,
 * followed by the pages that sit outside the menu.
 */
export function SitemapPage({
  copy,
  primary,
  more,
}: {
  copy: Policies['sitemap'];
  primary: readonly NavNode[];
  more: readonly UtilityNavItem[];
}) {
  return (
    <article aria-labelledby="sitemap-heading">
      <section data-motif="hero" className="relative isolate overflow-hidden bg-surface">
        <div className={`${MEASURE} pt-8 pb-12 md:pt-10 md:pb-14`}>
          <Breadcrumbs items={[{ label: 'Home', href: routes.home }, { label: copy.title }]} />
          <div className="mt-8 max-w-3xl md:mt-10">
            <p className="text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase">
              {copy.eyebrow}
            </p>
            <h1
              id="sitemap-heading"
              className="mt-3 font-serif text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.03em] text-brand"
            >
              {copy.title}
            </h1>
            <span
              aria-hidden="true"
              className="rule-draw mt-6 block h-[3px] w-14 origin-left bg-accent-surface"
            />
            <p className="mt-6 text-lg leading-[1.75] text-ink">{copy.intro}</p>
          </div>
        </div>
      </section>

      <div className="bg-surface-subtle">
        <div className={`${MEASURE} py-12 md:py-16 lg:py-20`}>
          <ul className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4">
            {[
              ...primary,
              { id: 'sitemap-more', label: copy.otherHeading, children: more } as NavNode,
            ].map((section) => (
              <li
                key={section.id}
                className="mb-6 break-inside-avoid rounded-[8px] border border-t-[3px] border-border border-t-accent-surface bg-surface p-6"
              >
                <h2 className="font-serif text-xl text-ink-strong">
                  {section.href ? (
                    <Link
                      href={section.href}
                      siteUrl={site.url}
                      variant="bare"
                      className="transition-colors duration-300 hover:text-brand"
                    >
                      {section.label}
                    </Link>
                  ) : (
                    section.label
                  )}
                </h2>
                {section.children?.length ? (
                  <div className="mt-4">
                    <Tree nodes={section.children} />
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
