export interface Format {
  url: string;
  name?: string;
  hash?: string;
  width?: number;
  height?: number;
  size?: number;
  path?: null;
  mime?: 'image/jpg' | 'image/png' | 'image/webp';
  ext?: '.jpg' | '.png' | '.webp';
}

export type Formats = {
  ['base64']?: Format;
  [breakpoint: number]: Format;
};
