import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { FacultyProfilePage } from '@/features/faculty/faculty-profile-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getFullTimeFacultyIds, getFullTimeProfile } from '@/services/faculty';

/** Every profile is built ahead of time; an unknown slug is a 404. */
export const dynamicParams = false;

export async function generateStaticParams() {
  const ids = await getFullTimeFacultyIds();
  return ids.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const profile = await getFullTimeProfile(slug);
  if (!profile) return {};
  const { member } = profile;
  return buildMetadata(site, {
    title: member.name,
    description: `${member.name}, ${member.designation}, XLRI Delhi-NCR — ${member.areas.join(', ')}. Qualifications, experience, research and publications.`,
    path: routes.faculty.fullTimeProfile(slug),
  });
}

export default async function FullTimeFacultyProfileRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const profile = await getFullTimeProfile(slug);
  if (!profile) notFound();

  return (
    <main id="main">
      <FacultyProfilePage profile={profile} />
    </main>
  );
}
