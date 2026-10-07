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

export interface MandatoryDisclosure {
  readonly title: string;
  readonly subtitle: string;
  readonly documents: readonly DisclosureDocument[];
}
