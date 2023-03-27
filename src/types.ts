export interface Rhythm {
  beats: Beat[];
  svg: string;
}

export interface Beat {
  length: number;
  sound: string;
}
