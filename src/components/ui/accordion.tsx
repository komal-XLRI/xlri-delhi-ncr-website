import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

/**
 * Accordion built on native `<details>` / `<summary>`.
 *
 * No `'use client'`, no state, no JavaScript at all. The browser handles
 * expand/collapse, keyboard operation (Enter and Space), and the correct
 * `aria-expanded` semantics — and it works before hydration and with JS
 * disabled entirely.
 *
 * A hand-rolled React accordion would ship perhaps 1–2 kB of client JS to
 * reproduce, usually imperfectly, behaviour the platform already gets right.
 * Given the RSC-by-default policy (§5) and the accessibility obligations under
 * D9, using the native element is not a shortcut — it is the better component.
 *
 * The one real trade-off is that open/close cannot be animated to `height: auto`
 * without JS. §10 calls for restrained motion anyway, so the instant toggle is
 * acceptable and arguably preferable.
 */
export interface AccordionItemProps {
  summary: ReactNode;
  children: ReactNode;
  /** Open on load. Use for the first item of an FAQ so the pattern is discoverable. */
  defaultOpen?: boolean;
  /** Group name — set the same value on siblings to make only one open at a time. */
  name?: string;
  className?: string;
}

export function AccordionItem({
  summary,
  children,
  defaultOpen = false,
  name,
  className,
}: AccordionItemProps) {
  return (
    <details
      {...(name ? { name } : {})}
      {...(defaultOpen ? { open: true } : {})}
      className={cn('group border-b border-border', className)}
    >
      <summary
        className={cn(
          'flex cursor-pointer items-center justify-between gap-4 py-5 pr-1',
          'text-lg font-medium text-ink-strong',
          'transition-colors duration-150 hover:text-brand',
          // Remove the default disclosure triangle; we render our own indicator
          // so it can be positioned and sized deliberately.
          'list-none [&::-webkit-details-marker]:hidden',
        )}
      >
        <span>{summary}</span>
        <span
          aria-hidden="true"
          className="shrink-0 text-xl leading-none text-brand transition-transform duration-150 group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <div className="pb-6 text-ink [&>*+*]:mt-4">{children}</div>
    </details>
  );
}

export function Accordion({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('border-t border-border', className)}>{children}</div>;
}
