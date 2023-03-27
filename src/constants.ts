import quarterNote from './assets/quarter-note.svg';
import dottedHalfNote from './assets/dotted-half-note.svg';
import doubleEighthNote from './assets/double-eighth-note.svg';
import halfNote from './assets/half-note.svg';
import wholeNote from './assets/whole-note.svg';
import quarterRest from './assets/quarter-rest.svg';

import piano from './assets/piano.mp3';
import castanets from './assets/castanets.wav';

export const sounds = {
  piano: new Audio(piano),
  castanets: new Audio(castanets)
}

sounds.castanets.volume = 0.3;

export const svgs = {
  'half-note': halfNote,
  'quarter-note': quarterNote,
  'double-eighth-note': doubleEighthNote,
  'dotted-half-note': dottedHalfNote,
  'whole-note': wholeNote,
  'quarter-rest': quarterRest,
};
