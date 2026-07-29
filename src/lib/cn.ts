import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind classes so that later utilities reliably win over earlier ones.
 *
 * Needed because plain string concatenation leaves both `p-4` and `p-8` in the
 * class list and the winner is decided by stylesheet order rather than by intent
 * — which makes variant props on primitives behave unpredictably.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
