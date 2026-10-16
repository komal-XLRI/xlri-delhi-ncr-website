import { libraryNav } from '@/features/library/library-nav';
import { LibrarySubnav } from '@/features/library/library-subnav';
import { getLibrary } from '@/services/library';

/** Every library page carries the library's submenu under the site header. */
export default async function LibrarySectionLayout({ children }: { children: React.ReactNode }) {
  const content = await getLibrary();

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
