import quarterNote from './assets/quarter-note.svg';
import dottedHalfNote from './assets/dotted-half-note.svg';
import doubleEighthNote from './assets/double-eighth-note.svg';
import halfNote from './assets/half-note.svg';
import wholeNote from './assets/whole-note.svg';
import quarterRest from './assets/quarter-rest.svg';
import { Howl } from 'howler';

export const sounds = {
  piano: new Howl({ src: './piano.wav' }),
  castanets: new Howl({ src: './castanets.wav' }),
} as Record<string, Howl>;

export const svgs = {
  'half-note': halfNote,
  'quarter-note': quarterNote,
  'double-eighth-note': doubleEighthNote,
  'dotted-half-note': dottedHalfNote,
  'whole-note': wholeNote,
  'quarter-rest': quarterRest,
};
