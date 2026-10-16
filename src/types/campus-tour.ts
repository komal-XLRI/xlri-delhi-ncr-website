/**
 * Campus Life › Campus Tour page shape. In `types/` so the feature can
 * describe its props without importing `content/` (§7).
 */
import type { PageMeta } from './page-copy';

export interface TourStop {
  /** The YouTube video id — also the React key and the poster's file name. */
  readonly youtubeId: string;
  readonly title: string;
  /** Self-hosted copy of the video's thumbnail, under `public/`. */
  readonly poster: string;
}

/** A part of the campus, holding its stops in walking order. */
export interface TourArea {
  readonly id: string;
  readonly label: string;
  readonly stops: readonly TourStop[];
}

/** The player's own words. `{number}`, `{area}` and `{total}` are filled in. */
export interface TourLabels {
  /** Over the poster: "Stop {number} · {area}". */
  readonly stopCaption: string;
  /** Atop the side panel: "Stop {number} of {total}". */
  readonly stopCount: string;
  /** The link to the video on YouTube. */
  readonly youtube: string;
  readonly upNext: string;
  /** The heading over every stop's card. */
  readonly allStops: string;
  /** The filter chip that shows every area. */
  readonly filterAll: string;
  /** The badge on the card that is playing. */
  readonly nowShowing: string;
  /** The link to the channel, under the cards. */
  readonly channelLink: string;
}

export interface CampusTourPage {
  readonly meta: PageMeta;
  /** The kicker over the title: "Campus Life". */
  readonly eyebrow: string;
  readonly title: string;
  readonly intro: string;
  /** The campus YouTube channel, for more videos. */
  readonly channel: string;
  readonly labels: TourLabels;
  /** In tour order; stops are numbered straight through all areas. */
  readonly areas: readonly TourArea[];
}
