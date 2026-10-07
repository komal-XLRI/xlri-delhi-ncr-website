/**
 * "Vision & Mission" content shape. In `types/` so the feature can describe its
 * props without importing `content/` (§7).
 */

export interface VisionMissionImage {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  /** Empty when decorative — see the call site for which ones are. */
  readonly alt: string;
}

export interface InstitutionalValue {
  readonly id: string;
  readonly title: string;
  /**
   * The photograph shown beside the value. The Delhi site has none per value,
   * so these reuse the three campus photographs for now; replace each with a
   * picture of the value in practice when the communications team supplies one.
   */
  readonly image: VisionMissionImage;
}

export interface EducationObjective {
  readonly id: string;
  /** e.g. "PEO 1". */
  readonly label: string;
  readonly body: string;
}

export interface VisionMission {
  /** The page's name — breadcrumb and `<title>`. */
  readonly title: string;
  /** The tagline set as the h1 above the photograph. */
  readonly headline: string;
  readonly heroImage: VisionMissionImage;
  readonly vision: {
    readonly heading: string;
    readonly body: string;
  };
  readonly mission: {
    readonly heading: string;
    readonly points: readonly string[];
  };
  readonly values: {
    readonly heading: string;
    readonly intro: string;
    readonly items: readonly InstitutionalValue[];
  };
  readonly objectives: {
    readonly heading: string;
    readonly items: readonly EducationObjective[];
  };
}
