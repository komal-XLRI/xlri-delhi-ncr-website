import { emdp } from '@/content/executive-education/emdp';
import { icp } from '@/content/executive-education/icp';
import { mdp } from '@/content/executive-education/mdp';
import type { EmdpPage } from '@/types/emdp';
import type { IcpPage } from '@/types/icp';
import type { MdpPage } from '@/types/mdp';

/**
 * Executive Education repository — the same seam as `services/homepage`.
 * Async so the Payload query that replaces it is not a signature change.
 */
export async function getEmdp(): Promise<EmdpPage> {
  return Promise.resolve(emdp);
}

export async function getMdp(): Promise<MdpPage> {
  return Promise.resolve(mdp);
}

export async function getIcp(): Promise<IcpPage> {
  return Promise.resolve(icp);
}
