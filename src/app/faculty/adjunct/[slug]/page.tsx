import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { FacultyProfilePage } from '@/features/faculty/faculty-profile-page';
import { fill } from '@/lib/format/template';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getAdjunctFacultyIds, getAdjunctProfile } from '@/services/faculty';

/** Every profile is built ahead of time; an unknown slug is a 404. */
export const dynamicParams = false;

export async function generateStaticParams() {
  const ids = await getAdjunctFacultyIds();
  return ids.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const profile = await getAdjunctProfile(slug);
  if (!profile) return {};
  const { member } = profile;
  return buildMetadata(site, {
    title: member.name,
    description: fill(profile.copy.metaDescription, {
      name: member.name,
      designation: member.designation,
      areas: member.areas.join(', '),
    }),
    path: routes.faculty.adjunctProfile(slug),
  });
}

export default async function AdjunctFacultyProfileRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const profile = await getAdjunctProfile(slug);
  if (!profile) notFound();

  return (
    <main id="main">
      <FacultyProfilePage
        profile={profile}
        listing={{ label: profile.breadcrumb.page, href: routes.faculty.adjunct }}
      />
    </main>
  );
}
