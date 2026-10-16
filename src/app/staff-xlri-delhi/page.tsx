import type { Metadata } from 'next';

import { StaffPage } from '@/features/faculty/staff-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getStaff } from '@/services/faculty';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getStaff();
  return buildMetadata(site, { ...meta, path: routes.faculty.staff });
}

export default async function StaffRoute() {
  const directory = await getStaff();

  return (
    <main id="main">
      <StaffPage directory={directory} />
    </main>
  );
}
