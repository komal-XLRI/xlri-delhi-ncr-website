import type { Metadata } from 'next';

import { AccreditationPage } from '@/features/about/accreditation';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getAccreditation } from '@/services/accreditation';

export const metadata: Metadata = buildMetadata(site, {
  title: 'Accreditation',
  description:
    'XLRI holds AMBA accreditation for the third consecutive time and BGA accreditation for the first time, each for 2025–2030. View the certificates.',
  path: routes.about.accreditation,
  image: '/media/vision-mission/campus-i-love-xlri.jpg',
  imageAlt: 'The XLRI Delhi-NCR campus',
});

export default async function AccreditationRoute() {
  const content = await getAccreditation();

  return (
    <main id="main">
      <AccreditationPage content={content} />
    </main>
  );
}
