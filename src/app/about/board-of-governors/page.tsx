import type { Metadata } from 'next';

import { BoardOfGovernorsPage } from '@/features/about/board-of-governors';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getBoardOfGovernors } from '@/services/board-of-governors';

export const metadata: Metadata = buildMetadata(site, {
  title: 'Board of Governors',
  description:
    'The Board of Governors of XLRI – Xavier School of Management: Chairman, office-bearers, members and permanent invitees.',
  path: routes.about.boardOfGovernors,
  image: '/media/board-of-governors/t-v-narendran.jpg',
  imageAlt: 'T V Narendran, Chairman of the XLRI Board of Governors',
});

export default async function BoardOfGovernorsRoute() {
  const content = await getBoardOfGovernors();

  return (
    <main id="main">
      <BoardOfGovernorsPage content={content} />
    </main>
  );
}
