import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

/**
 * Heading with semantic level decoupled from visual size.
 *
 * This separation is the single most useful thing a heading primitive can do.
 * Document outline is an accessibility requirement — one `h1`, no skipped
 * levels (WCAG 1.3.1, and a GIGW checklist item) — while visual weight is a
 * design decision. Coupling them forces a choice between a correct outline and
 * a correct-looking page, and the outline always loses.
 *
 * So: `level` controls the tag, `size` controls the appearance, and a section
 * heading can be an `h2` that looks small without anyone cheating.
 */
const sizes = {
  display: 'text-5xl md:text-6xl',
  '2xl': 'text-4xl md:text-5xl',
  xl: 'text-3xl md:text-4xl',
  lg: 'text-2xl md:text-3xl',
  md: 'text-xl md:text-2xl',
  sm: 'text-lg',
  xs: 'text-base font-semibold',
} as const;

/** Default visual size per level, so most call sites need only `level`. */
const defaultSizeForLevel = {
  1: '2xl',
  2: 'xl',
  3: 'lg',
  4: 'md',
  5: 'sm',
  6: 'xs',
} as const satisfies Record<HeadingLevel, keyof typeof sizes>;

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize = keyof typeof sizes;

export interface HeadingProps {
  children: ReactNode;
  /** Semantic level. Drives the tag and, by default, the visual size. */
  level: HeadingLevel;
  /** Override the visual size without changing the document outline. */
  size?: HeadingSize;
  /** Muted heading for supporting blocks. */
  tone?: 'default' | 'inverse';
  id?: string;
  className?: string;
}

export function Heading({ children, level, size, tone = 'default', id, className }: HeadingProps) {
  const Tag = `h${level}` as const;
  return (
    <Tag
      {...(id ? { id } : {})}
      className={cn(
        'font-serif',
        sizes[size ?? defaultSizeForLevel[level]],
        tone === 'inverse' ? 'text-ink-inverse' : 'text-ink-strong',
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/**
 * The small uppercase label that sits above a heading. Rendered as a plain
 * element, never as a heading tag — an eyebrow is styling, and putting it in the
 * outline creates a phantom level.
 */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('text-2xs font-medium tracking-widest text-ink-muted uppercase', className)}>
      {children}
    </p>
  );
}
