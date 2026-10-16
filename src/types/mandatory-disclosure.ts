import type { PageMeta } from './page-copy';

/**
 * "Mandatory Disclosure" content shape. In `types/` so the feature can describe
 * its props without importing `content/` (§7).
 */

export interface DisclosureDocument {
  readonly id: string;
  /** Tab label and document heading, e.g. "Mandatory Disclosure – November 2025". */
  readonly title: string;
  /** Root-relative path to the self-hosted PDF. */
  readonly src: string;
  /** Shown beside the download link so nobody is surprised by a 2 MB file. */
  readonly sizeLabel: string;
  readonly pages: number;
}

export interface DisclosureViewerLabels {
  readonly openInNewTab: string;
  readonly download: string;
  readonly previewHeading: string;
  /** After the page count, e.g. "16 pages · scroll to read". */
  readonly pagesSuffix: string;
  readonly fullScreen: string;
}

export interface MandatoryDisclosure {
  readonly meta: PageMeta;
  readonly title: string;
  readonly subtitle: string;
  /** The words on the document card and the preview frame. */
  readonly viewer: DisclosureViewerLabels;
  readonly documents: readonly DisclosureDocument[];
}
