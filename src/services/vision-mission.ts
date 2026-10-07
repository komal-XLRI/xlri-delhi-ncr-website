import { visionMission } from '@/content/vision-mission';
import type { VisionMission } from '@/types/vision-mission';

/**
 * "Vision & Mission" repository — the same seam as `services/homepage`.
 * Async now so the Payload query that replaces it is not a signature change.
 */
export async function getVisionMission(): Promise<VisionMission> {
  return Promise.resolve(visionMission);
}
