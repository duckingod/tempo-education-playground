import quarterNote from './assets/quarter-note.svg';
import dottedHalfNote from './assets/dotted-half-note.svg';
import doubleEighthNote from './assets/double-eighth-note.svg';
import halfNote from './assets/half-note.svg';
import wholeNote from './assets/whole-note.svg';
import quarterRest from './assets/quarter-rest.svg';
import { Howl } from 'howler';

export const sounds = {
  piano: new Howl({ src: ['./piano.m4a', './piano.wav'] }),
  castanets: new Howl({ src: ['./castanets.m4a', './castanets.wav'] }),
} as Record<string, Howl>;

export const svgs = {
  'half-note': halfNote,
  'quarter-note': quarterNote,
  'double-eighth-note': doubleEighthNote,
  'dotted-half-note': dottedHalfNote,
  'whole-note': wholeNote,
  'quarter-rest': quarterRest,
};

export const beats = {
  quarterPiano: { length: 1 / 4, sound: 'piano' },
  eighthPiano: { length: 1 / 8, sound: 'piano' },
  halfPiano: { length: 1 / 2, sound: 'piano' },
  dottedHalfPiano: { length: 1 / 2 + 1 / 4, sound: 'piano' },
  wholePiano: { length: 1, sound: 'piano' },
  quarterRest: { length: 1 / 4, sound: 'rest' },
  quarterCastanets: { length: 1 / 4, sound: 'castanets' },
};
