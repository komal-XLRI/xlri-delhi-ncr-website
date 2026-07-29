import { z } from 'zod';

/**
 * Environment validation.
 *
 * Parsed once at module load, so a missing or malformed variable fails the
 * build — not a user's request at 3am. This matters more than usual under D3
 * (self-hosting): with Vercel, a missing env var is caught by the platform;
 * on our own infrastructure, nothing catches it but this.
 */

const serverSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

  /**
   * Canonical origin, no trailing slash. Every absolute URL the site emits —
   * canonicals, Open Graph, sitemap entries, JSON-LD — derives from this, so it
   * must be correct per environment or the SEO work in §6 quietly breaks.
   */
  SITE_URL: z
    .string()
    .url()
    .refine((value) => !value.endsWith('/'), 'SITE_URL must not have a trailing slash'),

  /**
   * Shared secret for the CMS publish webhook that triggers on-demand
   * revalidation (§4). Required in production; absent in local development,
   * where revalidation is not exercised.
   */
  REVALIDATE_SECRET: z.string().min(32).optional(),
});

/**
 * Client-visible variables. Anything here is compiled into the browser bundle,
 * so it must contain nothing secret. The `NEXT_PUBLIC_` prefix is required by
 * Next for inlining; listing them explicitly keeps the public surface auditable.
 */
const clientSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
});

function parse<T extends z.ZodType>(schema: T, source: unknown, label: string): z.infer<T> {
  const result = schema.safeParse(source);

  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `  • ${issue.path.join('.') || '(root)'}: ${issue.message}`)
      .join('\n');
    throw new Error(`Invalid ${label} environment variables:\n${issues}`);
  }

  return result.data;
}

const rawServer = {
  NODE_ENV: process.env.NODE_ENV,
  SITE_URL: process.env.SITE_URL ?? 'http://localhost:3000',
  REVALIDATE_SECRET: process.env.REVALIDATE_SECRET,
};

export const env = parse(serverSchema, rawServer, 'server');

export const publicEnv = parse(
  clientSchema,
  { NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL },
  'client',
);

export const isProduction = env.NODE_ENV === 'production';
export const isDevelopment = env.NODE_ENV === 'development';
