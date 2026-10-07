import { automobileDesignCentre } from '@/content/centres/design-of-automobiles';
import { genderEqualityCentre } from '@/content/centres/gender-equality';
import { healthcareCentre } from '@/content/centres/healthcare-management';
import { publicPolicyCentre } from '@/content/centres/public-policy';
import type { AutomobileDesignCentre } from '@/types/automobile-design';
import type { Centre, CentreBrief } from '@/types/centre';
import type { HealthcareCentre } from '@/types/healthcare-centre';

/**
 * Centres of Excellence repository — the same seam as `services/homepage`.
 * One getter per centre for now; when the others are built this becomes a
 * lookup by slug. Async so the Payload query that replaces it is not a
 * signature change.
 */
export async function getGenderEqualityCentre(): Promise<Centre> {
  return Promise.resolve(genderEqualityCentre);
}

export async function getPublicPolicyCentre(): Promise<CentreBrief> {
  return Promise.resolve(publicPolicyCentre);
}

export async function getAutomobileDesignCentre(): Promise<AutomobileDesignCentre> {
  return Promise.resolve(automobileDesignCentre);
}

export async function getHealthcareCentre(): Promise<HealthcareCentre> {
  return Promise.resolve(healthcareCentre);
}
