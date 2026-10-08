import { pgdmBm } from '@/content/programmes/pgdm-bm';
import { pgdmIev } from '@/content/programmes/pgdm-iev';
import type { PgdmIevPage } from '@/types/pgdm-iev';
import type { ProgrammePage } from '@/types/programme';

/**
 * Academic programmes repository — the same seam as `services/homepage`.
 * Async so the Payload query that replaces it is not a signature change.
 */
export async function getPgdmBm(): Promise<ProgrammePage> {
  return Promise.resolve(pgdmBm);
}

export async function getPgdmIev(): Promise<PgdmIevPage> {
  return Promise.resolve(pgdmIev);
}
