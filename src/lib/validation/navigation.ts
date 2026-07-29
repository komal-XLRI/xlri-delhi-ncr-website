import { z } from 'zod';

import type { NavNode } from '@/types/navigation';

/**
 * Runtime validation for the navigation tree.
 *
 * The tree is the highest-leverage data structure in the codebase — six
 * surfaces render from it (§8.1) — and it will eventually be edited in a CMS by
 * people who are not looking at TypeScript. A malformed tree should fail the
 * build with a precise message, not render a broken menu in production.
 *
 * Beyond shape, two invariants are enforced that types cannot express:
 *
 *   • **Unique ids across the whole tree.** Ids are used for `aria-controls`
 *     and `aria-labelledby`, so a duplicate produces silently broken ARIA
 *     wiring — the kind of defect that passes every automated check and only
 *     shows up in a screen reader.
 *
 *   • **Every leaf is reachable.** A node with neither `href` nor `children` is
 *     dead weight: it renders as unclickable text in a menu. Almost always a
 *     typo or an unfinished edit.
 */

const featuredSchema = z.object({
  eyebrow: z.string().min(1).optional(),
  title: z.string().min(1),
  description: z.string().min(1).optional(),
  href: z.string().min(1),
});

const baseNodeSchema = z.object({
  id: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, 'ids must be lowercase kebab-case — they appear in ARIA attributes'),
  label: z.string().min(1),
  href: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  layout: z.enum(['columns-2', 'columns-3', 'columns-4', 'split-feature']).optional(),
  featured: featuredSchema.optional(),
  audience: z
    .array(z.enum(['prospective', 'student', 'faculty', 'alumni', 'recruiter']))
    .optional(),
});

/**
 * Annotated as `ZodType<unknown>` rather than a precisely-inferred recursive
 * type. Zod's recursive inference and `exactOptionalPropertyTypes` disagree
 * about whether `children?: T[]` accepts `undefined`, and the resulting error is
 * several screens long. Nothing here needs the inferred type — callers pass
 * `unknown` in and the validated tree is narrowed to `NavNode[]` on the way out,
 * with `NavNode` in `types/navigation.ts` remaining the single source of truth
 * for the shape.
 */
export const navNodeSchema: z.ZodType<unknown> = baseNodeSchema
  .extend({
    get children() {
      return z.array(navNodeSchema).min(1).optional();
    },
  })
  .refine(
    (node) => Boolean(node.href) || Boolean(node.children),
    'a node needs an href or children, otherwise it renders as unclickable text',
  );

export const navTreeSchema = z.array(navNodeSchema).min(1);

/** Walk every node in the tree, depth-first. */
export function walkNavTree(nodes: readonly NavNode[]): NavNode[] {
  return nodes.flatMap((node) => [node, ...(node.children ? walkNavTree(node.children) : [])]);
}

export interface NavTreeProblem {
  readonly kind: 'duplicate-id' | 'invalid-shape' | 'depth';
  readonly message: string;
}

/**
 * Validate a tree and return every problem found, rather than throwing on the
 * first. A content editor fixing five typos should see five messages, not five
 * consecutive failed builds.
 */
export function findNavTreeProblems(tree: unknown): NavTreeProblem[] {
  const problems: NavTreeProblem[] = [];

  const parsed = navTreeSchema.safeParse(tree);
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      problems.push({
        kind: 'invalid-shape',
        message: `${issue.path.join('.') || '(root)'}: ${issue.message}`,
      });
    }
    return problems;
  }

  const nodes = walkNavTree(parsed.data as readonly NavNode[]);

  const seen = new Map<string, number>();
  for (const node of nodes) {
    seen.set(node.id, (seen.get(node.id) ?? 0) + 1);
  }
  for (const [id, count] of seen) {
    if (count > 1) {
      problems.push({
        kind: 'duplicate-id',
        message: `id "${id}" appears ${count} times — ids are used for aria-controls and must be unique`,
      });
    }
  }

  // Three levels is the practical ceiling for a mega menu: a fourth is
  // unusable with a mouse and cannot be presented coherently on mobile.
  const tooDeep = (list: readonly NavNode[], depth: number): void => {
    for (const node of list) {
      if (depth > 3) {
        problems.push({
          kind: 'depth',
          message: `"${node.id}" sits at depth ${depth}; the tree is capped at 3 levels`,
        });
      }
      if (node.children) tooDeep(node.children, depth + 1);
    }
  };
  tooDeep(parsed.data as readonly NavNode[], 1);

  return problems;
}

/** Throwing wrapper, for use at module load so a bad tree fails the build. */
export function assertValidNavTree(tree: unknown): void {
  const problems = findNavTreeProblems(tree);
  if (problems.length > 0) {
    throw new Error(
      `Invalid navigation tree:\n${problems.map((p) => `  • [${p.kind}] ${p.message}`).join('\n')}`,
    );
  }
}
