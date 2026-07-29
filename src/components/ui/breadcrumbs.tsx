import NextLink from 'next/link';

import { cn } from '@/lib/cn';

export interface Crumb {
  label: string;
  /** Omitted on the final crumb — the current page is not a link to itself. */
  href?: string;
}

/**
 * Breadcrumb trail.
 *
 * An ordered list inside a labelled `<nav>`, because the sequence is meaningful.
 * The current page is marked with `aria-current="page"` and rendered as text
 * rather than a link — linking a page to itself is a common and pointless
 * pattern that wastes a tab stop.
 *
 * Separators are `aria-hidden`; a screen reader announcing "slash" between every
 * item is noise. The corresponding `BreadcrumbList` JSON-LD (§6.3) is emitted
 * separately from the same navigation tree, so the visual trail and the
 * structured data cannot disagree.
 */
export function Breadcrumbs({
  items,
  className,
  label = 'Breadcrumb',
}: {
  items: Crumb[];
  className?: string;
  label?: string;
}) {
  if (items.length === 0) return null;

  return (
    <nav aria-label={label} className={cn('text-sm', className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <NextLink
                  href={item.href}
                  className="rounded-xs text-ink-muted underline-offset-[3px] hover:text-brand hover:underline"
                >
                  {item.label}
                </NextLink>
              ) : (
                <span className="text-ink-strong" aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
              {isLast ? null : (
                <span aria-hidden="true" className="text-border-strong select-none">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
