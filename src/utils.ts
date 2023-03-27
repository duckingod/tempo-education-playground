import { state } from './globals';
import { sumBy } from 'lodash';

export const dragToLengthCheck = (e) => {
  const { list: rhythms } = e.relatedContext;
  const length = rhythms.reduce((acc, rhythm) => acc + sumBy(rhythm.beats, 'length'), 0);
  const draggingLength = sumBy(state.draggingRhythm.beats, 'length');

  return length * state.baseBeat + draggingLength * state.baseBeat <= state.barLength;

};