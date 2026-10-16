import type { Metadata } from 'next';

import { BoardOfGovernorsPage } from '@/features/about/board-of-governors';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getBoardOfGovernors } from '@/services/board-of-governors';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getBoardOfGovernors();
  return buildMetadata(site, { ...meta, path: routes.about.boardOfGovernors });
}

export default async function BoardOfGovernorsRoute() {
  const content = await getBoardOfGovernors();

  return (
    <main id="main">
      <BoardOfGovernorsPage content={content} />
    </main>
  );
}
