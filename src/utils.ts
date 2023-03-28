import { state } from './globals';
import { sumBy } from 'lodash';
import { sounds } from './constants';

import piano from './assets/piano.wav';
import castanets from './assets/castanets.wav';

export const dragToLengthCheck = (e) => {
  const { list: rhythms } = e.relatedContext;
  const length = rhythms.reduce((acc, rhythm) => acc + sumBy(rhythm.beats, 'length'), 0);
  const draggingLength = sumBy(state.draggingRhythm.beats, 'length');

  return length * state.baseBeat + draggingLength * state.baseBeat <= state.barLength;
};

export const initSounds = () => {
  if (sounds.piano) return;
  sounds.piano = new Audio(piano);
  sounds.castanets = new Audio(castanets);
  sounds.castanets.volume = 0.3;
}