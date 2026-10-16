import type { PageMeta } from './page-copy';

/** Website policy pages — Privacy, Terms & Conditions, Help — and the Sitemap. */

/** A run of a section's text, in order: a subheading, a paragraph or a list. */
export type PolicyBlock =
  | { readonly kind: 'h'; readonly text: string }
  | { readonly kind: 'p'; readonly text: string }
  | { readonly kind: 'list'; readonly items: readonly string[] };

/**
 * A numbered section. A short one gives `paragraphs`, then `points`; one that
 * mixes subheadings, paragraphs and lists gives `blocks`, shown in order after
 * them.
 */
export interface PolicySection {
  readonly heading: string;
  readonly paragraphs?: readonly string[];
  readonly points?: readonly string[];
  readonly blocks?: readonly PolicyBlock[];
}

/**
 * A policy page. Only `meta` and `title` are required: a page with no
 * `sections` yet shows the shared `emptyNote` instead of a text.
 */
export interface PolicyPage {
  readonly meta: PageMeta;
  readonly title: string;
  /** ISO date the text last changed. */
  readonly updated?: string;
  readonly intro?: string;
  /** Paragraphs that open the text, before the first numbered section. */
  readonly preamble?: readonly string[];
  readonly sections?: readonly PolicySection[];
}

export interface PolicyContact {
  readonly heading: string;
  readonly text: string;
  readonly address: string;
  readonly phone: string;
  readonly email: string;
}

export type PolicyId = 'privacy' | 'terms' | 'help';

export interface Policies {
  readonly eyebrow: string;
  /** "Last updated {date}". */
  readonly updatedLabel: string;
  readonly tocHeading: string;
  /** Shown on a policy page that has no text yet. */
  readonly emptyNote: string;
  readonly contact: PolicyContact;
  readonly pages: Readonly<Record<PolicyId, PolicyPage>>;
  readonly sitemap: {
    readonly meta: PageMeta;
    readonly eyebrow: string;
    readonly title: string;
    readonly intro: string;
    /** The column for pages outside the main menu. */
    readonly otherHeading: string;
  };
}

/** One policy page with the copy every policy page shares. */
export type ResolvedPolicyPage = PolicyPage &
  Pick<Policies, 'eyebrow' | 'updatedLabel' | 'tocHeading' | 'emptyNote' | 'contact'>;
