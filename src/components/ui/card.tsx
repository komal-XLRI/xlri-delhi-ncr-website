import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

/**
 * Card, as composable parts rather than a component with fourteen boolean props.
 *
 * Composition wins here because cards are the most-varied surface on a content
 * site — a programme card, a news card, and a faculty card share a frame and
 * almost nothing else. Exposing `CardMedia`/`CardBody`/`CardFooter` lets each
 * feature assemble what it needs without this file growing a flag per case.
 *
 * Visually: a hairline border, not a shadow. §10 prefers a 1px rule over
 * elevation in almost every case — shadows on every card is what makes a page
 * read as a dashboard rather than a publication.
 */
export interface CardProps {
  children: ReactNode;
  /** `interactive` adds hover feedback. Only use it when the whole card is a link. */
  variant?: 'default' | 'interactive' | 'plain';
  as?: 'div' | 'article' | 'li';
  className?: string;
}

export function Card({
  children,
  variant = 'default',
  as: Component = 'div',
  className,
}: CardProps) {
  return (
    <Component
      className={cn(
        'group flex flex-col overflow-hidden bg-surface',
        variant !== 'plain' && 'rounded-sm border border-border',
        variant === 'interactive' &&
          'transition-colors duration-150 focus-within:border-brand hover:border-border-strong',
        className,
      )}
    >
      {children}
    </Component>
  );
}

/**
 * Fixed-ratio media slot. The aspect ratio is mandatory rather than optional:
 * an image without reserved space is the most common source of CLS, and the
 * budget in §5 is 0.02.
 */
export function CardMedia({
  children,
  ratio = '3/2',
  className,
}: {
  children: ReactNode;
  ratio?: '3/2' | '4/3' | '16/9' | '1/1';
  className?: string;
}) {
  const ratios = {
    '3/2': 'aspect-3/2',
    '4/3': 'aspect-4/3',
    '16/9': 'aspect-video',
    '1/1': 'aspect-square',
  } as const;

  return (
    <div
      className={cn('relative w-full overflow-hidden bg-surface-subtle', ratios[ratio], className)}
    >
      {children}
    </div>
  );
}

export function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('flex flex-1 flex-col gap-3 p-6', className)}>{children}</div>;
}

export function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('mt-auto border-t border-border px-6 py-4', className)}>{children}</div>
  );
}
