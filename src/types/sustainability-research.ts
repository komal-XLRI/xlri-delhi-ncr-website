/**
 * Sustainability › Research Projects page shape. In `types/` so the feature
 * can describe its props without importing `content/` (§7).
 */

import type { PageBreadcrumb, PageMeta } from './page-copy';

export interface ResearchProjectLead {
  /**
   * Set when the lead is in the Sustainability core team
   * (`content/sustainability-team.ts`): name, portrait and profile come from there.
   */
  readonly teamId?: string;
  /** The lead's name when there is no `teamId` — a person, or a centre. */
  readonly name?: string;
  /** "Principal investigator", "Researcher", "Completed by" … */
  readonly role: string;
}

export interface ResearchProject {
  /** Unique — the React key and the anchor id. */
  readonly id: string;
  readonly title: string;
  /** A one- or two-word tag: "Circular economy", "Biodiversity" … */
  readonly theme: string;
  readonly summary: string;
  /** "October 2022 – October 2023", "Multi-year" … — when the source gives one. */
  readonly period?: string;
  /** Sponsors, funders or clients, under the label that fits. */
  readonly partners: { readonly label: string; readonly names: readonly string[] };
  readonly lead: ResearchProjectLead;
}

/** The page's own wording, shared by the content and the resolved page. */
export interface ResearchProjectsCopy {
  readonly meta: PageMeta;
  readonly breadcrumb: PageBreadcrumb;
  /** The kicker above the title. */
  readonly eyebrow: string;
  readonly title: string;
  /** Labels for the figures beside the title, which are counted from the projects. */
  readonly facts: {
    readonly projects: string;
    readonly researchers: string;
    readonly partners: string;
  };
  /** `profile`: the link to a lead's profile. */
  readonly labels: { readonly profile: string };
}

export interface ResearchProjectsPage extends ResearchProjectsCopy {
  readonly projects: readonly ResearchProject[];
}

/** What the page renders: each lead resolved to a name, and a portrait and profile where known. */
export interface ResolvedResearchProject extends Omit<ResearchProject, 'lead'> {
  readonly lead: {
    readonly name: string;
    readonly role: string;
    /** True for a person; false for a centre or chair, which gets an emblem, not a monogram. */
    readonly person: boolean;
    readonly portrait?: string;
    readonly profile?: { readonly href: string; readonly internal: boolean };
  };
}

export interface ResolvedResearchProjectsPage extends ResearchProjectsCopy {
  readonly projects: readonly ResolvedResearchProject[];
}
