/**
 * Sustainability › Government Committees page shape. In `types/` so the
 * feature can describe its props without importing `content/` (§7).
 */

import type { PageBreadcrumb, PageMeta } from './page-copy';

export interface CommitteeAppointment {
  /** Unique within the page — the React key. */
  readonly id: string;
  readonly committee: string;
  /** The faculty member's role on it: "Member", "Chairperson" … */
  readonly role: string;
  /** Who convenes the committee, when it is not in the committee's name. */
  readonly organisation?: string;
  /** A short label: "Corporate board", "Standards body", "State government" … */
  readonly sector: string;
  /** A sentence on its remit, when the name does not say it. */
  readonly detail?: string;
  /** "August 2023 onwards", "Ongoing" … — when the source gives one. */
  readonly period?: string;
  /** False once the appointment has ended. */
  readonly current: boolean;
}

export interface GovernmentCommitteeMember {
  readonly id: string;
  readonly name: string;
  /**
   * Set when the person is in the Sustainability core team
   * (`content/sustainability-team.ts`): their portrait, designation and
   * profile link come from there.
   */
  readonly teamId?: string;
  readonly appointments: readonly CommitteeAppointment[];
}

/** The page's own wording, shared by the content and the resolved page. */
export interface GovernmentCommitteesCopy {
  readonly meta: PageMeta;
  readonly breadcrumb: PageBreadcrumb;
  /** The kicker above the title. */
  readonly eyebrow: string;
  readonly title: string;
  /** Labels for the figures beside the title, which are counted from the members. */
  readonly facts: {
    readonly appointments: string;
    readonly faculty: string;
    readonly current: string;
  };
  readonly labels: {
    readonly viewProfile: string;
    /** The tag on an appointment that is current, and on one that has ended. */
    readonly current: string;
    readonly concluded: string;
  };
}

export interface GovernmentCommitteesPage extends GovernmentCommitteesCopy {
  readonly members: readonly GovernmentCommitteeMember[];
}

/** What the page renders: each member with their core-team details resolved. */
export interface ResolvedGovernmentCommitteeMember extends GovernmentCommitteeMember {
  readonly portrait?: string;
  readonly designation?: string;
  readonly profile?: { readonly href: string; readonly internal: boolean };
}

export interface ResolvedGovernmentCommitteesPage extends GovernmentCommitteesCopy {
  readonly members: readonly ResolvedGovernmentCommitteeMember[];
}
