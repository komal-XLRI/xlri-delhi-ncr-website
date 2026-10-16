import designOfAutomobilesJson from '@/content/centres/design-of-automobiles.json';
import genderEqualityJson from '@/content/centres/gender-equality.json';
import healthcareManagementJson from '@/content/centres/healthcare-management.json';
import publicPolicyJson from '@/content/centres/public-policy.json';
import type { AutomobileDesignCentre } from '@/types/automobile-design';
import type { Centre, CentreBrief } from '@/types/centre';
import type { HealthcareCentre } from '@/types/healthcare-centre';
import { fromJson } from '@/lib/validation/json-content';

const automobileDesignCentre = fromJson<AutomobileDesignCentre>(designOfAutomobilesJson);
const genderEqualityCentre = fromJson<Centre>(genderEqualityJson);
const healthcareCentre = fromJson<HealthcareCentre>(healthcareManagementJson);
const publicPolicyCentre = fromJson<CentreBrief>(publicPolicyJson);

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
