import { Rhythm } from "./types";

export const state = {
  draggingRhythm: { beats: [], svg: '' } as unknown as Rhythm,
  barLength: 4,
  baseBeat: 4,
  bpm: 120,
};
