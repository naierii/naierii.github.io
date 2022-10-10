import type { Texture } from 'three';

export interface MaterialTextureMapModel {
  [k: string]: Texture;
}

export interface MaterialTextureModel {
  map?: string; // Diffuse
  normalMap?: string;
  roughnessMap?: string;
  aoMap?: string; // Occlusion
  specularMap?: string;
}
