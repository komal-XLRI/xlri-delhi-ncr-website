import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';
import { Container, type ContainerWidth } from '@/components/layout/container';

/**
 * A full-width horizontal band of the page, with vertical rhythm and an optional
 * surface treatment.
 *
 * Vertical spacing lives here rather than on individual sections so the rhythm
 * down a long page stays consistent no matter who assembles it. Getting this
 * wrong is the most common reason a content site reads as cramped or arbitrary.
 *
 * Surfaces come from semantic tokens, so the high-contrast theme flattens the
 * tinted variants automatically (§11.2) without any component change.
 */
const spacing = {
  none: '',
  sm: 'py-10 md:py-14',
  md: 'py-16 md:py-24',
  lg: 'py-24 md:py-32',
} as const;

const surfaces = {
  default: 'bg-surface text-ink',
  subtle: 'bg-surface-subtle text-ink',
  inverse: 'bg-surface-inverse text-ink-inverse',
} as const;

export interface SectionProps {
  children: ReactNode;
  /** Vertical rhythm. Default `md` suits most content sections. */
  spacing?: keyof typeof spacing;
  surface?: keyof typeof surfaces;
  width?: ContainerWidth;
  /** Skip the inner Container when the section manages its own full-bleed layout. */
  bleed?: boolean;
  /** Anchor target — pairs with the `scroll-padding-top` set in base.css. */
  id?: string;
  'aria-labelledby'?: string;
  className?: string;
}

export function Section({
  children,
  spacing: space = 'md',
  surface = 'default',
  width = 'content',
  bleed = false,
  id,
  className,
  ...rest
}: SectionProps) {
  return (
    <section
      {...(id ? { id } : {})}
      {...rest}
      className={cn(spacing[space], surfaces[surface], className)}
    >
      {bleed ? children : <Container width={width}>{children}</Container>}
    </section>
  );
}
