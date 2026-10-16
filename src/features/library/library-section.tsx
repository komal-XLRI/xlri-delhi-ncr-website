import type { LibraryContent } from '@/types/library';

import { libraryNav } from './library-nav';
import { LibrarySubnav } from './library-subnav';

/**
 * Every library page: the library's submenu under the site header, then the
 * page. The library's pages sit at the live site's addresses — the home at
 * `/resources/library-home-new`, the rest at top-level addresses such as
 * `/library-services` — so they share no route folder, and each route wraps
 * itself in this instead of a layout.
 */
export function LibrarySection({
  content,
  children,
}: {
  content: LibraryContent;
  children: React.ReactNode;
}) {
  return (
    <>
      <LibrarySubnav
        groups={libraryNav(content)}
        catalogue={content.catalogue.href}
        title={content.title}
        subtitle={content.subtitle}
        labels={content.nav}
      />
      {children}
    </>
  );
}
