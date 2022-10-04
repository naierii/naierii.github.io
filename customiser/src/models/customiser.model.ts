import { MaterialTextureModel } from '@models';

export interface CustomiserModelParts {
  nodeId: string;
  texture: MaterialTextureModel;
}

export interface CustomiserModel {
  url: string;
  parts: CustomiserModelParts[];
}
