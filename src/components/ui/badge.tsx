import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

/**
 * Small status or category label.
 *
 * `accent` is the canonical legal use of the brand green: as a *background*
 * behind strong ink, measuring 8.67:1 (§2.5). It never appears as the label
 * colour.
 */
const tones = {
  neutral: 'bg-surface-subtle text-ink border-border',
  brand: 'bg-brand-surface text-brand border-transparent',
  accent: 'bg-accent-surface text-ink-strong border-transparent',
  outline: 'bg-transparent text-ink-muted border-border-strong',
} as const;

export interface BadgeProps {
  children: ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}

export function Badge({ children, tone = 'neutral', className }: BadgeProps) {
  return (
    <span
      className={cn(
        // `w-fit` matters: as a child of a flex column (CardBody) the default
        // `align-items: stretch` makes an inline-flex element span the full
        // width, so the badge reads as a banner rather than a label.
        'inline-flex w-fit items-center rounded-xs border px-2 py-0.5 text-2xs font-medium tracking-wide',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
