/**
 * Structured data (schema.org, as JSON-LD).
 *
 * Search engines read these to understand what a page is — the campus as an
 * organisation, a trail of breadcrumbs, an event, a news story, a person, a
 * course — and may show it as a rich result. Each builder takes plain facts
 * and returns a schema.org object; `JsonLd` (components/seo) writes it into
 * the page.
 *
 * Pure and framework-free, like `metadata.ts`: site facts come in as
 * arguments, so this stays in the `lib` layer and is testable as is. URLs may
 * be root-relative; every builder makes them absolute against `origin`.
 */
import { absoluteUrl } from './metadata';

type Thing = Record<string, unknown>;

export interface OrganizationFacts {
  readonly origin: string;
  readonly name: string;
  readonly legalName: string;
  readonly alternateName: string;
  readonly description: string;
  readonly logo: string;
  readonly image?: string;
  readonly email: string;
  readonly telephone: string;
  /** The postal address's lines: street, locality, region and postcode, country. */
  readonly address: {
    readonly streetAddress: string;
    readonly addressLocality: string;
    readonly addressRegion: string;
    readonly postalCode: string;
    readonly addressCountry: string;
  };
  readonly sameAs: readonly string[];
  readonly parent: { readonly name: string; readonly url: string };
}

/** The campus's stable identifier, so other blocks can point at it. */
export const organizationId = (origin: string) => `${absoluteUrl(origin, '/')}#organization`;

/**
 * The Delhi-NCR campus, as a `CollegeOrUniversity` that is part of XLRI —
 * modelled as a campus rather than the institute, so this site and
 * xlri.ac.in do not compete in search for the same entity.
 */
export function organization(facts: OrganizationFacts): Thing {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollegeOrUniversity',
    '@id': organizationId(facts.origin),
    name: facts.name,
    legalName: facts.legalName,
    alternateName: facts.alternateName,
    description: facts.description,
    url: absoluteUrl(facts.origin, '/'),
    logo: absoluteUrl(facts.origin, facts.logo),
    ...(facts.image ? { image: absoluteUrl(facts.origin, facts.image) } : {}),
    email: facts.email,
    telephone: facts.telephone,
    address: { '@type': 'PostalAddress', ...facts.address },
    sameAs: facts.sameAs,
    parentOrganization: {
      '@type': 'CollegeOrUniversity',
      name: facts.parent.name,
      url: facts.parent.url,
    },
  };
}

/** The site itself, published by the campus. */
export function website(origin: string, name: string, description: string): Thing {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${absoluteUrl(origin, '/')}#website`,
    name,
    description,
    url: absoluteUrl(origin, '/'),
    inLanguage: 'en-IN',
    publisher: { '@id': organizationId(origin) },
  };
}

/**
 * A breadcrumb trail. Steps without an address (a menu heading such as
 * "Campus Life") are left out, since every step but the last must link; the
 * last, the page itself, needs none.
 */
export function breadcrumbList(
  origin: string,
  crumbs: readonly { readonly label: string; readonly href?: string }[],
): Thing | undefined {
  const steps = crumbs.filter((crumb, index) => crumb.href || index === crumbs.length - 1);
  if (steps.length < 2) return undefined;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: steps.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      ...(crumb.href ? { item: absoluteUrl(origin, crumb.href) } : {}),
    })),
  };
}

/** A one-day event on the campus. */
export function event(
  origin: string,
  facts: {
    readonly name: string;
    readonly path: string;
    readonly startDate: string;
    readonly image: string;
    readonly description: string;
    readonly place: { readonly name: string; readonly address: OrganizationFacts['address'] };
  },
): Thing {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: facts.name,
    url: absoluteUrl(origin, facts.path),
    startDate: facts.startDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    image: [absoluteUrl(origin, facts.image)],
    description: facts.description,
    location: {
      '@type': 'Place',
      name: facts.place.name,
      address: { '@type': 'PostalAddress', ...facts.place.address },
    },
    organizer: { '@id': organizationId(origin) },
  };
}

/** A news story published by the campus. */
export function newsArticle(
  origin: string,
  facts: {
    readonly headline: string;
    readonly path: string;
    readonly datePublished: string;
    readonly images: readonly string[];
    readonly description?: string;
  },
): Thing {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: facts.headline,
    url: absoluteUrl(origin, facts.path),
    mainEntityOfPage: absoluteUrl(origin, facts.path),
    datePublished: facts.datePublished,
    image: facts.images.map((image) => absoluteUrl(origin, image)),
    ...(facts.description ? { description: facts.description } : {}),
    author: { '@id': organizationId(origin) },
    publisher: { '@id': organizationId(origin) },
  };
}

/** A member of faculty. */
export function person(
  origin: string,
  facts: {
    readonly name: string;
    readonly path: string;
    readonly jobTitle?: string;
    readonly image?: string;
    readonly email?: string;
    readonly knowsAbout?: readonly string[];
    /** Their profiles elsewhere: LinkedIn, Google Scholar, ORCID. */
    readonly sameAs?: readonly string[];
  },
): Thing {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: facts.name,
    url: absoluteUrl(origin, facts.path),
    ...(facts.jobTitle ? { jobTitle: facts.jobTitle } : {}),
    ...(facts.image ? { image: absoluteUrl(origin, facts.image) } : {}),
    ...(facts.email ? { email: facts.email } : {}),
    ...(facts.knowsAbout?.length ? { knowsAbout: facts.knowsAbout } : {}),
    ...(facts.sameAs?.length ? { sameAs: facts.sameAs } : {}),
    worksFor: { '@id': organizationId(origin) },
  };
}

/** A programme, as a course the campus provides. */
export function course(
  origin: string,
  facts: {
    readonly name: string;
    readonly path: string;
    readonly description: string;
    readonly image?: string;
  },
): Thing {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: facts.name,
    url: absoluteUrl(origin, facts.path),
    description: facts.description,
    ...(facts.image ? { image: absoluteUrl(origin, facts.image) } : {}),
    provider: { '@id': organizationId(origin) },
  };
}

/**
 * JSON for a `<script type="application/ld+json">`. `<` is escaped so no
 * value — a title, a description — can close the script tag early.
 */
export function serializeJsonLd(data: Thing | readonly Thing[]): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
