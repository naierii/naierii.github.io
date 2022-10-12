import type { Texture } from 'three';

export interface MaterialTextureMapModel {
  [k: string]: Texture;
}

export interface MaterialTextureModel {
  [k: string]: string;
}
