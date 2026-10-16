/**
 * Campus Life › Mobility Within Campus page shape — the services on campus.
 * In `types/` so the feature can describe its props without importing
 * `content/` (§7).
 */
import type { PageMeta } from './page-copy';

/** A section's small kicker line and its heading. */
export interface SectionHeading {
  readonly eyebrow: string;
  readonly title: string;
}

export type ServiceIcon =
  'dumbbell' | 'bank' | 'bus' | 'scissors' | 'gamepad' | 'ball' | 'users' | 'utensils' | 'coffee';

export interface ServicePhoto {
  /** Path under `public/`. */
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

export interface CampusService {
  /** Kebab-case; the section's anchor. */
  readonly id: string;
  readonly title: string;
  /** A one-word kind, shown as the eyebrow: Fitness, Banking … */
  readonly category: string;
  readonly icon: ServiceIcon;
  readonly description: string;
  /** Where it is, when the source says. */
  readonly location?: string;
  readonly photos: readonly ServicePhoto[];
}

export interface CampusServicesPage {
  readonly meta: PageMeta;
  /** The kicker over the title: "Campus Life". */
  readonly eyebrow: string;
  readonly title: string;
  readonly intro: string;
  readonly facts: readonly { readonly value: string; readonly label: string }[];
  readonly services: readonly CampusService[];
  /** The closing link to the Campus Tour: its kicker and its line. */
  readonly tourLink: SectionHeading;
  /** The heading over `related`; given whenever `related` is. */
  readonly relatedHeading?: SectionHeading;
  /** Neighbouring pages, shown after the Campus Tour link. */
  readonly related?: CampusFacilityPage['related'];
}

export type FacilityIcon =
  | 'sun'
  | 'car'
  | 'leaf'
  | 'stethoscope'
  | 'pill'
  | 'users'
  | 'tree'
  | 'path'
  | 'dumbbell'
  | 'bed'
  | 'home'
  | 'basket'
  | 'utensils'
  | 'sparkle'
  | 'shirt'
  | 'briefcase';

/**
 * A Campus Life facility page — Parking Areas, Medical Facilities: photos
 * beside the title, a few highlights, related pages, and an optional notice.
 */
export interface CampusFacilityPage {
  readonly meta: PageMeta;
  /** The kicker over the title: "Campus Life". */
  readonly eyebrow: string;
  readonly title: string;
  readonly intro: string;
  readonly photos: readonly ServicePhoto[];
  /** The kicker over the highlights heading: "At a glance". */
  readonly highlightsEyebrow: string;
  /** The highlights section's heading, e.g. "Parking on campus". */
  readonly highlightsTitle: string;
  readonly highlights: readonly {
    readonly icon: FacilityIcon;
    readonly title: string;
    readonly text: string;
  }[];
  /** Longer text, after the highlights — e.g. IT Infrastructure's four paragraphs. */
  readonly about?: {
    readonly eyebrow: string;
    readonly title: string;
    readonly paragraphs: readonly string[];
  };
  /** The label over `documents` ("Policies"); given whenever `documents` is. */
  readonly documentsTitle?: string;
  /** Policies and other PDFs, linked after `about`. */
  readonly documents?: readonly { readonly title: string; readonly href: string }[];
  /** More photos, as a mosaic after the highlights. */
  readonly gallery?: {
    readonly eyebrow: string;
    readonly title: string;
    readonly photos: readonly ServicePhoto[];
  };
  /** A boxed note after the highlights — e.g. what to do in an emergency. */
  readonly notice?: {
    readonly title: string;
    readonly text: string;
    readonly contacts: readonly {
      readonly label: string;
      readonly value: string;
      /** `tel:` or `mailto:`. */
      readonly href: string;
    }[];
  };
  /** The heading over `related`: "Explore more of the campus". */
  readonly relatedHeading: SectionHeading;
  /** Neighbouring pages, internal paths only. */
  readonly related: readonly {
    readonly label: string;
    readonly description: string;
    readonly href: string;
  }[];
}
