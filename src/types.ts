interface Beat {
  length: number;
  svg: string;
}

interface Tempo {
  id: string;
  images: string[];
  beats: Beat[];
};