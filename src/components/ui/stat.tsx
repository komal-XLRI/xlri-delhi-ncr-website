import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

export interface StatProps {
  /** The figure itself, e.g. "97%" or "1949". */
  value: ReactNode;
  /** What the figure measures. Always required — a number without a label is noise. */
  label: ReactNode;
  /** Optional qualifier: the cohort, year, or source behind the figure. */
  detail?: ReactNode;
  tone?: 'default' | 'inverse';
  className?: string;
}

/**
 * A single key figure.
 *
 * Rendered as a description list pair so the number and its meaning are
 * programmatically associated — a screen-reader user hearing "97%" in isolation
 * learns nothing. `tabular-nums` keeps figures aligned when several sit in a row.
 *
 * Deliberately static. Count-up-on-scroll animations are a reliable tell of a
 * template site and add client JS to what is fundamentally a piece of text.
 */
export function Stat({ value, label, detail, tone = 'default', className }: StatProps) {
  const inverse = tone === 'inverse';
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <dt className="sr-only">{label}</dt>
      <dd className="contents">
        <span
          className={cn(
            'font-serif text-4xl tabular-nums md:text-5xl',
            inverse ? 'text-ink-inverse' : 'text-ink-strong',
          )}
        >
          {value}
        </span>
        <span
          aria-hidden="true"
          className={cn('text-base font-medium', inverse ? 'text-ink-inverse' : 'text-ink')}
        >
          {label}
        </span>
        {detail ? (
          <span className={cn('text-sm', inverse ? 'text-ink-inverse/80' : 'text-ink-muted')}>
            {detail}
          </span>
        ) : null}
      </dd>
    </div>
  );
}

/** Stats must live in a description list for the dt/dd pairing to be valid. */
export function StatGroup({ children, className }: { children: ReactNode; className?: string }) {
  return <dl className={cn('grid gap-8 sm:grid-cols-2 lg:grid-cols-4', className)}>{children}</dl>;
}
