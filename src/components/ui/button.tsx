import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/cn';

/**
 * Button.
 *
 * Restrained on purpose: a solid brand fill, a bordered secondary, and a quiet
 * text button. Institutional sites drift toward a dozen button styles as
 * different teams add pages; three is enough, and the constraint is the point.
 *
 * The accent green is deliberately absent. At 1.74:1 on white it cannot carry
 * label text (§2.5), and a green button with dark text reads as a warning in
 * most contexts. Green stays a background accent elsewhere.
 */
const variants = {
  primary: 'bg-brand text-ink-inverse hover:bg-brand-hover border border-transparent',
  secondary: 'bg-surface text-ink-strong border border-border-strong hover:bg-surface-subtle',
  ghost:
    'bg-transparent text-brand hover:text-brand-hover hover:bg-brand-surface border border-transparent',
} as const;

/**
 * Heights meet the WCAG 2.2 target-size minimum. `sm` is 36px, below the 44px
 * comfortable target, so it is reserved for dense UI where an equivalent larger
 * control exists nearby — never as the only way to perform an action.
 */
const sizes = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-5 text-base',
  lg: 'h-13 px-7 text-lg',
} as const;

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  children: ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  fullWidth?: boolean;
  className?: string;
}

export const buttonClasses = (
  variant: keyof typeof variants = 'primary',
  size: keyof typeof sizes = 'md',
  fullWidth = false,
  className?: string,
) =>
  cn(
    'inline-flex items-center justify-center gap-2 rounded-sm font-medium no-underline',
    'transition-colors duration-150',
    'disabled:pointer-events-none disabled:opacity-50',
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    className,
  );

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  type = 'button',
  className,
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={buttonClasses(variant, size, fullWidth, className)} {...rest}>
      {children}
    </button>
  );
}
