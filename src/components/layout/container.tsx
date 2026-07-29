import type { ElementType, ReactNode } from 'react';

import { cn } from '@/lib/cn';

/**
 * Horizontal container: max width, responsive gutters, centred.
 *
 * Width is a named intent rather than a number, so "how wide is a content page"
 * is answered in one place. `prose` caps the measure at ~68 characters — the
 * single most effective thing we do for long-form readability on ultra-wide
 * displays, which is where institutional sites usually fall apart.
 */
const widths = {
  prose: 'max-w-prose',
  content: 'max-w-[80rem]', // 1280px — standard page content
  wide: 'max-w-[90rem]', // 1440px — full-bleed media, wide tables
  full: 'max-w-none',
} as const;

export type ContainerWidth = keyof typeof widths;

export interface ContainerProps {
  children: ReactNode;
  width?: ContainerWidth;
  /** Renders a different element. Use `article`/`aside` where it carries meaning. */
  as?: ElementType;
  className?: string;
}

export function Container({
  children,
  width = 'content',
  as: Component = 'div',
  className,
}: ContainerProps) {
  return (
    <Component className={cn('mx-auto w-full px-6 md:px-8 lg:px-12', widths[width], className)}>
      {children}
    </Component>
  );
}
