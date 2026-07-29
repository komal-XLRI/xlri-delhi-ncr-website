import { cn } from '@/lib/cn';

export interface DividerProps {
  /**
   * `accent` uses the brand green as a short rule — one of the two roles the
   * accent is permitted in (§2.5). It is decorative and carries no meaning.
   */
  variant?: 'hairline' | 'accent';
  className?: string;
}

/**
 * A rule. Rendered as a presentational element rather than a semantic separator
 * because a visual divider between layout blocks is not a meaningful boundary
 * for a screen reader — announcing it is noise.
 */
export function Divider({ variant = 'hairline', className }: DividerProps) {
  if (variant === 'accent') {
    return <div aria-hidden="true" className={cn('h-1 w-16 bg-accent-surface', className)} />;
  }
  return <hr className={cn('border-t border-border', className)} />;
}
