import type { ElementType, ReactNode } from 'react';

import { cn } from '@/lib/cn';

const gaps = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-10',
} as const;

const alignments = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
} as const;

export interface StackProps {
  children: ReactNode;
  gap?: keyof typeof gaps;
  align?: keyof typeof alignments;
  as?: ElementType;
  className?: string;
}

/** Vertical rhythm between siblings. The workhorse of every content block. */
export function Stack({
  children,
  gap = 'md',
  align,
  as: Component = 'div',
  className,
}: StackProps) {
  return (
    <Component className={cn('flex flex-col', gaps[gap], align && alignments[align], className)}>
      {children}
    </Component>
  );
}

/**
 * Horizontal grouping that wraps instead of overflowing.
 *
 * Wrapping is the default rather than an option because the alternative — a row
 * that overflows at 200% zoom — is a WCAG 1.4.10 reflow failure, and this is a
 * compliance project (D9).
 */
export function Cluster({
  children,
  gap = 'sm',
  align = 'center',
  as: Component = 'div',
  className,
}: StackProps) {
  return (
    <Component className={cn('flex flex-wrap', gaps[gap], alignments[align], className)}>
      {children}
    </Component>
  );
}
