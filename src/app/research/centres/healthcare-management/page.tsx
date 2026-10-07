import type { Metadata } from 'next';

import { HealthcareCentrePage } from '@/features/centres/healthcare-centre-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getHealthcareCentre } from '@/services/centres';

export const metadata: Metadata = buildMetadata(site, {
  title: 'XLRI Centre for Healthcare Management',
  description:
    'XLRI’s Centre for Healthcare Management partners with CMC Vellore, SRIHER, St. John’s and other leading institutions on academic, executive education and skill development programmes and collaborative research in healthcare management.',
  path: routes.research.centre('healthcare-management'),
  image: '/media/centres/healthcare-management/cmc-vellore.jpg',
  imageAlt:
    'XLRI and Christian Medical College Vellore representatives with the signed partnership documents',
});

export default async function HealthcareCentreRoute() {
  const centre = await getHealthcareCentre();

  return (
    <main id="main">
      <HealthcareCentrePage centre={centre} />
    </main>
  );
}
