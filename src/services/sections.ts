import sectionsJson from '@/content/sections.json';
import { PRIMARY_NAV } from '@/config/navigation';
import { fromJson } from '@/lib/validation/json-content';
import type { NavNode } from '@/types/navigation';
import type { SectionHub, StoredSections } from '@/types/sections';

const stored = fromJson<StoredSections>(sectionsJson);

/** The links under a menu group, flattened: a link, or a heading's children. */
const linksOf = (node: NavNode): NavNode[] =>
  node.href ? [node] : (node.children ?? []).flatMap(linksOf);

/**
 * Section home pages repository. Content lives in `content/sections.json`.
 * A hub that names a menu item (`nav`) takes its groups and links from the
 * main menu, so the hub and the menu cannot drift apart; the Students page
 * lists its own. Each link gets its one-line note from the hub's `notes`.
 *
 * An unknown hub id, or a `nav` that names no menu item, fails the build.
 */
export async function getSectionHub(id: string): Promise<SectionHub> {
  const hub = stored.hubs[id];
  if (!hub) throw new Error(`sections.json: no hub "${id}"`);

  let groups: SectionHub['groups'];
  if (hub.nav !== undefined) {
    const item = PRIMARY_NAV.find((node) => node.id === hub.nav);
    if (!item) throw new Error(`sections.json: hub "${id}" names no menu item "${hub.nav}"`);
    groups = (item.children ?? []).map((group) => ({
      label: group.label,
      links: linksOf(group).map((link) => ({ label: link.label, href: link.href ?? '#' })),
    }));
  } else if (hub.groups) {
    groups = hub.groups;
  } else {
    throw new Error(`sections.json: hub "${id}" needs "nav" or "groups"`);
  }

  const { nav: _nav, groups: _groups, ...copy } = hub;
  return Promise.resolve({
    ...copy,
    labels: stored.labels,
    groups: groups.map((group) => ({
      ...group,
      links: group.links.map((link) => {
        const note = hub.notes[link.href];
        return note === undefined ? link : { ...link, note };
      }),
    })),
  });
}
