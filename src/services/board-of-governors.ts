import boardOfGovernorsJson from '@/content/board-of-governors.json';
import type { BoardOfGovernors } from '@/types/board-of-governors';
import { fromJson } from '@/lib/validation/json-content';

const boardOfGovernors = fromJson<BoardOfGovernors>(boardOfGovernorsJson);

/**
 * "Board of Governors" repository — the same seam as `services/homepage`.
 * Async now so the Payload query that replaces it is not a signature change.
 */
export async function getBoardOfGovernors(): Promise<BoardOfGovernors> {
  return Promise.resolve(boardOfGovernors);
}
