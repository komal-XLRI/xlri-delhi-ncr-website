import type { PageMeta } from './page-copy';

/**
 * Section home pages — Academics, Executive Education, Faculty & Research,
 * Sustainability, Campus Life, and the Students quick-links page.
 */

export interface SectionPhoto {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

/** A hub link, as stored by the Students page. */
export interface SectionLinkSource {
  readonly label: string;
  readonly href: string;
}

interface SectionHubBase {
  readonly meta: PageMeta;
  readonly eyebrow: string;
  readonly title: string;
  readonly intro: string;
  readonly image: SectionPhoto;
  /** One line under each link, keyed by its href. */
  readonly notes: Readonly<Record<string, string>>;
}

/**
 * A hub draws its groups either from the main menu (`nav`: the menu item's
 * id, so adding a page to the menu adds it here) or from its own `groups`.
 */
export interface StoredSectionHub extends SectionHubBase {
  readonly nav?: string;
  readonly groups?: readonly {
    readonly label: string;
    readonly links: readonly SectionLinkSource[];
  }[];
}

export interface StoredSections {
  readonly labels: { readonly pageCount: { readonly one: string; readonly other: string } };
  readonly hubs: Readonly<Record<string, StoredSectionHub>>;
}

export interface SectionLink extends SectionLinkSource {
  readonly note?: string;
}

/** A hub resolved for the page: its groups and their links, with notes. */
export interface SectionHub extends SectionHubBase {
  readonly groups: readonly { readonly label: string; readonly links: readonly SectionLink[] }[];
  readonly labels: StoredSections['labels'];
}
