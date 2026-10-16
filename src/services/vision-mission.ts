import visionMissionJson from '@/content/vision-mission.json';
import type { VisionMission } from '@/types/vision-mission';
import { fromJson } from '@/lib/validation/json-content';

const visionMission = fromJson<VisionMission>(visionMissionJson);

/**
 * "Vision & Mission" repository — the same seam as `services/homepage`.
 * Async now so the Payload query that replaces it is not a signature change.
 */
export async function getVisionMission(): Promise<VisionMission> {
  return Promise.resolve(visionMission);
}
