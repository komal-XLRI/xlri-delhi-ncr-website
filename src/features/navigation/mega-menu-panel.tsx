import NextLink from 'next/link';

import { Link } from '@/components/ui/link';
import { site } from '@/config/site';
import { cn } from '@/lib/cn';
import type { NavNode, PrimaryNavItem } from '@/types/navigation';

/**
 * A mega-menu panel — a Server Component.
 *
 * Every panel for every primary item is rendered into the HTML on first load
 * and hidden with CSS until opened (§8.2). That is a deliberate trade:
 *
 *   • every navigation link is a real crawlable `<a>` in the initial markup
 *   • the site is fully navigable before hydration and with JS disabled
 *   • opening a panel is instant — no fetch, no spinner, no loading state
 *   • panels are absolutely positioned, so opening one never reflows the page
 *
 * The cost is roughly 15–25 kB gzipped of extra HTML. Harvard, Stanford, and
 * Oxford all make the same trade, and it is the right one: the alternative
 * spends a network round trip on a hover.
 *
 * Because this is a Server Component passed as a `panel` prop to the client
 * controller, none of this markup enters the JavaScript bundle.
 */

const layoutColumns = {
  'columns-2': 'md:grid-cols-2',
  'columns-3': 'md:grid-cols-3',
  'columns-4': 'md:grid-cols-2 lg:grid-cols-4',
  'split-feature': 'md:grid-cols-3',
} as const;

function DropdownColumn({ section, index }: { section: NavNode; index: number }) {
  return (
    // `--stagger` drives the entrance delay in base.css. Each column arrives
    // ~70ms after the one before it, which reads as the panel unfolding rather
    // than snapping into place — the "gentle reveal" the brief asks for, at a
    // scale small enough that nobody consciously notices it.
    <div className="mega-column" style={{ '--stagger': index } as React.CSSProperties}>
      {/*
        A real heading element, not a styled div. The panel is a labelled group
        rather than a `role="menu"` (§8.3), so its internal structure is browsed
        as ordinary content and headings are how a screen-reader user navigates
        it quickly.

        Set in the serif display face rather than small uppercase sans. Two
        reasons: it separates the column title from the links beneath it by
        *typeface* instead of only by size and colour, which is a clearer
        hierarchy than shrinking grey text; and it echoes the page headings, so a
        panel reads as editorial content rather than as an application menu.

        The short accent rule beneath picks up the green from the active
        indicator in the bar above, tying the open panel back to the item that
        opened it. Green as a non-informational rule is one of the two roles it
        is legal in (§2.5) — it carries emphasis, never meaning.
      */}
      <div className="mb-4">
        <h3 className="font-serif text-lg leading-snug text-ink-strong">
          {section.href ? (
            <NextLink href={section.href} className="rounded-xs hover:text-brand">
              {section.label}
            </NextLink>
          ) : (
            section.label
          )}
        </h3>
        <span aria-hidden="true" className="mt-2.5 block h-[3px] w-8 bg-accent-surface" />
      </div>
      <ul className="space-y-1">
        {section.children?.map((child) => (
          <li key={child.id}>
            <Link
              href={child.href ?? '#'}
              siteUrl={site.url}
              variant="standalone"
              className="block py-1 text-sm text-ink hover:text-brand"
            >
              {child.label}
            </Link>
            {child.description ? (
              <span className="block pb-1 text-xs text-ink-muted">{child.description}</span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MegaMenuPanel({ item }: { item: PrimaryNavItem }) {
  if (!item.children) return null;

  return (
    <div className="border-t border-border bg-surface shadow-raised">
      <div className="mx-auto w-full max-w-[80rem] px-6 py-10 md:px-8 lg:px-12">
        <div
          className={cn(
            'grid gap-x-10 gap-y-8',
            layoutColumns[item.layout ?? 'columns-3'],
            item.featured ? 'lg:grid-cols-4' : '',
          )}
        >
          {item.children.map((section, index) => (
            <DropdownColumn key={section.id} section={section} index={index} />
          ))}

          {item.featured ? (
            <div
              className="mega-column rounded-sm border border-border bg-surface-subtle p-5"
              style={{ '--stagger': item.children.length } as React.CSSProperties}
            >
              {item.featured.eyebrow ? (
                <p className="mb-2 text-2xs font-medium tracking-widest text-ink-muted uppercase">
                  {item.featured.eyebrow}
                </p>
              ) : null}
              <h3 className="mb-2 font-serif text-lg leading-snug text-ink-strong">
                {item.featured.title}
              </h3>
              {item.featured.description ? (
                <p className="mb-3 text-sm text-ink-muted">{item.featured.description}</p>
              ) : null}
              <Link
                href={item.featured.href}
                siteUrl={site.url}
                variant="standalone"
                className="text-sm"
              >
                Find out more
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
