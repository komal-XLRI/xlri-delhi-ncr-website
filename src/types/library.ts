/**
 * Campus Life › Library page shapes. In `types/` so the features can describe
 * their props without importing `content/` (§7).
 */
import type { PageMeta } from './page-copy';

export interface LibraryPhoto {
  /** Path under `public/`. */
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

/** How a resource is reached: openly, with XLRI sign-in (OpenAthens), or only on campus. */
export type ResourceAccess = 'open' | 'sign-in' | 'on-campus';

export interface LibraryResource {
  readonly name: string;
  readonly description: string;
  readonly access: ResourceAccess;
  /** Absent for software installed on campus machines. */
  readonly href?: string;
}

/** One e-resource page — eDatabases, eJournals … */
export interface LibraryCollection {
  /** Kebab-case; the page's slug under `/campus-life/library/`. */
  readonly id: string;
  readonly label: string;
  readonly intro: string;
  readonly items: readonly LibraryResource[];
}

/** A committee member or librarian, as stored: a faculty or staff directory id. */
export interface StoredLibraryPerson {
  readonly kind: 'faculty' | 'staff';
  readonly id: string;
  readonly role: string;
  readonly email: string;
}

/** The same, resolved against the directory. */
export interface LibraryPerson {
  readonly name: string;
  readonly role: string;
  readonly email: string;
  readonly photo: string;
  /** Their faculty profile, or their card on the Staff page. */
  readonly href: string;
}

export interface LibraryService {
  readonly title: string;
  readonly text?: string;
  readonly points?: readonly string[];
}

export interface ExternalLibraryLink {
  readonly label: string;
  readonly href: string;
  readonly note: string;
}

/** A section's small kicker line and its heading. */
export interface LibraryHeading {
  readonly eyebrow: string;
  readonly title: string;
}

/** A sub-page's hero and its browser-tab title and description. */
export interface LibrarySubpage {
  readonly meta: PageMeta;
  readonly title: string;
  readonly intro: string;
}

/** The library's submenu: the bar's own words and the four groups. */
export interface LibraryNavCopy {
  /** The bar's catalogue button. */
  readonly searchCatalogue: string;
  /** The phone button, on a page outside the menu (the library home). */
  readonly menuButton: string;
  /** The feature card's kicker, before "01/04". */
  readonly menuCounter: string;
  /** Under the feature card's count: "link in this group" / "links in this group". */
  readonly linkCount: { readonly one: string; readonly other: string };
  readonly groups: {
    readonly about: LibraryNavGroupCopy & {
      readonly links: { readonly services: string; readonly committee: string };
    };
    /** Its links are the e-resource collections, by their labels. */
    readonly eresources: LibraryNavGroupCopy;
    readonly access: LibraryNavGroupCopy & {
      readonly links: { readonly catalogue: string; readonly remote: string };
    };
    readonly more: LibraryNavGroupCopy & {
      readonly links: { readonly gallery: string; readonly contact: string };
    };
  };
}

export interface LibraryNavGroupCopy {
  readonly label: string;
  /** One line on what the group is for. */
  readonly note: string;
}

/** The library home's section headings and lines. */
export interface LibraryHomeCopy {
  readonly hero: {
    readonly catalogueButton: string;
    readonly remoteButton: string;
    /** Under the buttons; `{remote}` is the remote-access service's name. */
    readonly accessNote: string;
  };
  readonly glance: { readonly title: string };
  readonly floors: LibraryHeading;
  readonly hours: {
    /** Set large in the blue box: "24×7". */
    readonly badge: string;
    readonly title: string;
  };
  readonly arrangements: LibraryHeading;
  readonly print: LibraryHeading & {
    readonly newspapers: string;
    readonly magazines: string;
    /** After a magazine's frequency: "{issues}/yr". */
    readonly perYear: string;
  };
  readonly newArrivals: LibraryHeading & {
    /** After the count: "new titles". */
    readonly countLabel: string;
    readonly note: string;
    /** The tag on each cover. */
    readonly badge: string;
  };
  readonly gallery: LibraryHeading & {
    /** The link to the Gallery page: "All {count} photos". */
    readonly allLink: string;
  };
}

/** The sub-pages under the library's menu. */
export interface LibraryPagesCopy {
  readonly services: LibrarySubpage & {
    readonly borrowing: {
      readonly title: string;
      /** Under a borrower's limit: "at a time, for {period}". */
      readonly perLoan: string;
      readonly note: string;
    };
    readonly servicesTitle: string;
    readonly otherTitle: string;
  };
  readonly committee: LibrarySubpage & {
    readonly committeeTitle: string;
    readonly personnelTitle: string;
  };
  readonly gallery: LibrarySubpage;
  readonly contact: LibrarySubpage & {
    readonly email: string;
    readonly phone: string;
    readonly phoneNote: string;
    readonly hours: string;
    /** `{remote}` is the remote-access service's name. */
    readonly remoteLink: string;
  };
  /** Every e-resource page; each collection gives its own title and intro. */
  readonly collection: {
    /**
     * `{label}` is the collection's; `{items}` lists its first few resources,
     * then `andMore` ("and more") when there are others.
     */
    readonly meta: PageMeta & { readonly andMore: string };
    /** After the count of resources. */
    readonly countLabel: string;
    /** Beside the sign-in tag, when a resource needs it. */
    readonly signInNote: string;
    /** The tag on each card, by how it is reached. */
    readonly access: Readonly<Record<ResourceAccess, string>>;
    /** On a card with no link. */
    readonly installed: string;
  };
}

interface LibraryBase<Person> {
  readonly meta: PageMeta;
  readonly title: string;
  readonly subtitle: string;
  readonly intro: string;
  readonly photos: readonly LibraryPhoto[];
  readonly facts: readonly { readonly value: string; readonly label: string }[];
  readonly floors: readonly {
    /** Set large beside the level: "G", "1", "2–3". */
    readonly badge: string;
    readonly level: string;
    readonly title: string;
    readonly text: string;
  }[];
  readonly hours: {
    readonly always: string;
    readonly week: readonly { readonly days: string; readonly time: string }[];
  };
  readonly arrangements: readonly string[];
  readonly newspapers: readonly string[];
  readonly magazines: readonly {
    readonly title: string;
    readonly frequency: string;
    /** Issues a year. */
    readonly issues: number;
  }[];
  readonly newArrivals: readonly {
    readonly title: string;
    readonly author: string;
    readonly cover: LibraryPhoto;
  }[];
  readonly services: readonly LibraryService[];
  readonly otherServices: readonly string[];
  readonly circulation: readonly {
    readonly who: string;
    readonly books: string;
    readonly period: string;
  }[];
  readonly committee: readonly Person[];
  readonly personnel: readonly Person[];
  readonly collections: readonly LibraryCollection[];
  /** The OPAC — on the campus network only. */
  readonly catalogue: ExternalLibraryLink;
  readonly remote: ExternalLibraryLink;
  readonly gallery: readonly LibraryPhoto[];
  readonly contact: { readonly email: string; readonly extensions: readonly string[] };
  readonly nav: LibraryNavCopy;
  readonly home: LibraryHomeCopy;
  readonly pages: LibraryPagesCopy;
}

export type StoredLibraryContent = LibraryBase<StoredLibraryPerson>;
export type LibraryContent = LibraryBase<LibraryPerson>;
