import type { ElementType, ReactNode } from 'react';

import { cn } from '@/lib/cn';

const sizes = {
  lead: 'text-lg',
  body: 'text-base',
  small: 'text-sm',
  caption: 'text-xs',
} as const;

const tones = {
  default: 'text-ink',
  /**
   * The lightest grey that is still legal for text — neutral-700 at 6.03:1.
   * The brand grey #9d9e9e measures 2.69:1 and is a hairline colour only (§2.5).
   */
  muted: 'text-ink-muted',
  strong: 'text-ink-strong',
  inverse: 'text-ink-inverse',
} as const;

export interface TextProps {
  children: ReactNode;
  size?: keyof typeof sizes;
  tone?: keyof typeof tones;
  /** Cap the measure. Use for any paragraph of running prose. */
  measure?: boolean;
  as?: ElementType;
  className?: string;
}

export function Text({
  children,
  size = 'body',
  tone = 'default',
  measure = false,
  as: Component = 'p',
  className,
}: TextProps) {
  return (
    <Component className={cn(sizes[size], tones[tone], measure && 'max-w-prose', className)}>
      {children}
    </Component>
  );
}
