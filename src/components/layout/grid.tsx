import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

/**
 * Responsive column grid.
 *
 * Deliberately not a general-purpose 12-column system with span props on every
 * child — that reproduces Bootstrap and invites layout logic to leak into
 * content components. The common institutional cases are "n equal columns that
 * collapse on small screens", so those are what this exposes.
 */
const columns = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  /** Editorial split: narrow rail plus main column. */
  sidebar: 'grid-cols-1 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]',
  /** Reversed split, for a main column with a right-hand rail. */
  'sidebar-end': 'grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,18rem)]',
} as const;

const gaps = {
  sm: 'gap-4',
  md: 'gap-6 md:gap-8',
  lg: 'gap-8 md:gap-12',
} as const;

export interface GridProps {
  children: ReactNode;
  cols?: keyof typeof columns;
  gap?: keyof typeof gaps;
  as?: 'div' | 'ul' | 'ol';
  className?: string;
}

export function Grid({
  children,
  cols = 3,
  gap = 'md',
  as: Component = 'div',
  className,
}: GridProps) {
  return (
    <Component className={cn('grid', columns[cols], gaps[gap], className)}>{children}</Component>
  );
}
