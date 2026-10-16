import { routes } from '@/constants/routes';
import type { LibraryContent } from '@/types/library';

export interface LibraryNavGroup {
  readonly label: string;
  /** One line on what the group is for. */
  readonly note: string;
  readonly links: readonly {
    readonly label: string;
    readonly href: string;
    /** For a link that leaves the site: where it works. */
    readonly external?: string;
  }[];
}

/**
 * The library's own menu, as on the Delhi site — About, eResources, Access,
 * More — built from the content so a new e-resource page appears in it by
 * itself. It drives the submenu bar on every library page. The groups' and
 * links' words are in `library.json` under `nav.groups`.
 */
export function libraryNav(content: LibraryContent): readonly LibraryNavGroup[] {
  const { about, eresources, access, more } = content.nav.groups;
  return [
    {
      label: about.label,
      note: about.note,
      links: [
        { label: about.links.services, href: routes.campusLife.libraryPage('services') },
        { label: about.links.committee, href: routes.campusLife.libraryPage('committee') },
      ],
    },
    {
      label: eresources.label,
      note: eresources.note,
      links: content.collections.map((collection) => ({
        label: collection.label,
        href: routes.campusLife.libraryPage(collection.id),
      })),
    },
    {
      label: access.label,
      note: access.note,
      links: [
        {
          label: access.links.catalogue,
          href: content.catalogue.href,
          external: content.catalogue.note,
        },
        { label: access.links.remote, href: content.remote.href, external: content.remote.note },
      ],
    },
    {
      label: more.label,
      note: more.note,
      links: [
        { label: more.links.gallery, href: routes.campusLife.libraryPage('gallery') },
        { label: more.links.contact, href: routes.campusLife.libraryPage('contact') },
      ],
    },
  ];
}
