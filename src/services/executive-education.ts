import emdpJson from '@/content/executive-education/emdp.json';
import icpJson from '@/content/executive-education/icp.json';
import mdpJson from '@/content/executive-education/mdp.json';
import type { EmdpPage } from '@/types/emdp';
import type { IcpPage } from '@/types/icp';
import type { MdpPage } from '@/types/mdp';
import { fromJson } from '@/lib/validation/json-content';

const emdp = fromJson<EmdpPage>(emdpJson);
const icp = fromJson<IcpPage>(icpJson);
const mdp = fromJson<MdpPage>(mdpJson);

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
