/** Which group a search result is listed under. */
export type SearchKind = 'page' | 'person' | 'elsewhere';

/** One searchable destination. Built once, on the server, and searched in the browser. */
export interface SearchEntry {
  /** Unique within the index — also the React key. */
  id: string;
  kind: SearchKind;
  title: string;
  href: string;
  /** Where it sits: "About › Leadership & Governance", "Full Time Faculty". */
  trail: string;
  /** One line under the title, when there is something useful to say. */
  summary?: string;
  /** Extra words that should find this entry but are not shown. */
  keywords: string;
  /** For `elsewhere` entries: the host the link leaves for, e.g. "xlri.ac.in". */
  destination?: string;
}
