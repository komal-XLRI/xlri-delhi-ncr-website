import type { PageMeta } from './page-copy';

/** Website policy pages — Privacy, Terms & Conditions, Copyright, Help — and the Sitemap. */

export interface PolicySection {
  readonly heading: string;
  readonly paragraphs?: readonly string[];
  readonly points?: readonly string[];
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
  readonly sections?: readonly PolicySection[];
}

export interface PolicyContact {
  readonly heading: string;
  readonly text: string;
  readonly address: string;
  readonly phone: string;
  readonly email: string;
}

export type PolicyId = 'privacy' | 'terms' | 'copyright' | 'help';

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
