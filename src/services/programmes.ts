import pgdmBmJson from '@/content/programmes/pgdm-bm.json';
import pgdmIevJson from '@/content/programmes/pgdm-iev.json';
import type { PgdmIevPage } from '@/types/pgdm-iev';
import type { ProgrammePage } from '@/types/programme';
import { fromJson } from '@/lib/validation/json-content';

const pgdmBm = fromJson<ProgrammePage>(pgdmBmJson);
const pgdmIev = fromJson<PgdmIevPage>(pgdmIevJson);

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
