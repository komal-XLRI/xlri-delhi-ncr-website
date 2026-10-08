import {
  finalPlacements,
  placementsArchive,
  placementsOverview,
  summerInternships,
} from '@/content/placements';
import type { PlacementReport, PlacementsArchive, PlacementsOverview } from '@/types/placements';

/**
 * Placements repository — the same seam as `services/homepage`. Async so
 * the Payload query that replaces it is not a signature change.
 */
export async function getPlacementsOverview(): Promise<PlacementsOverview> {
  return Promise.resolve(placementsOverview);
}

export async function getFinalPlacements(): Promise<PlacementReport> {
  return Promise.resolve(finalPlacements);
}

export async function getSummerInternships(): Promise<PlacementReport> {
  return Promise.resolve(summerInternships);
}

export async function getPlacementsArchive(): Promise<PlacementsArchive> {
  return Promise.resolve(placementsArchive);
}
