import create, { StateCreator } from 'zustand';
import produce from 'immer';
import { devtools, persist } from 'zustand/middleware';
import { MaterialTextureModel } from '@models';
import {
  Scalars,
  Maybe,
  ModelEntity,
  ComponentCustomiserCustomParts,
  MaterialEntity,
  CustomProductEntity,
  ComponentCustomiserCustomOption,
} from '@graphql/generated/graphql';

interface SelectedModel {
  optionId: Scalars['ID'];
  model?: Maybe<ModelEntity>;
}

interface Part {
  part: ComponentCustomiserCustomParts;
  material: MaterialEntity;
}

export interface CustomiserState {
  customProduct: Maybe<CustomProductEntity>;
  selectedModels: SelectedModel[];
  selectedOption: Maybe<ComponentCustomiserCustomOption>;
  selectedPart: Maybe<ComponentCustomiserCustomParts>;
  parts: Part[];
  setSelectedModel: (optionId: Scalars['ID'], model?: Maybe<ModelEntity>) => void;
  setCustomProduct: (data: CustomProductEntity) => void;
  setOption: (data: ComponentCustomiserCustomOption) => void;
  setSelectedPart: (data: ComponentCustomiserCustomParts) => void;
  setPart: (part: ComponentCustomiserCustomParts, material: MaterialEntity) => void;
  resetNav: () => void;
  texture: (nodeId: string) => MaterialTextureModel;
}

const createCustomiser: StateCreator<
  CustomiserState,
  [['zustand/devtools', never], ['zustand/persist', unknown]],
  []
> = (set, get) => ({
  selectedModels: [],
  customProduct: null,
  selectedOption: null,
  selectedPart: null,
  parts: [],
  setCustomProduct: (data) => {
    if (!get().selectedModels.length && data.attributes?.options) {
      const models: SelectedModel[] = [];
      data.attributes.options.forEach((option) => {
        if (option?.models?.length && option?.models[0]?.model?.data) {
          models.push({ optionId: option.id, model: option?.models[0]?.model?.data });
        }
      });
      set({ customProduct: data, selectedModels: models });
    } else {
      set({ customProduct: data });
    }
  },
  setSelectedModel: (id, model) => {
    set(
      produce((state: CustomiserState) => {
        const option = state.selectedModels.find((m) => m.optionId === id);

        if (option) {
          option.model = model;
        }
      }),
    );
  },
  setPart: (part, material) => {
    set(
      produce((state: CustomiserState) => {
        const findPart = state.parts.find((p) => p.part.id === part.id);
        if (findPart) {
          findPart.material = material;
        } else {
          state.parts.push({ part, material });
        }
      }),
    );
  },
  setOption: (data) => set({ selectedOption: data }),
  setSelectedPart: (data) => set({ selectedPart: data }),
  resetNav: () => set({ selectedOption: null, selectedPart: null }),
  texture: (nodeId) => {
    const parts = get().parts;

    let materials: MaterialTextureModel = {};
    for (const p of parts) {
      const test = p.part.modelParts?.data.map((mp) => mp?.attributes?.nodeId).indexOf(nodeId);
      if (test != -1 && p?.material?.attributes?.images) {
        materials = p.material.attributes.images?.reduce(
          (obj, cur) => ({
            [cur?.mapType as string]: cur?.image?.data?.attributes?.url as string,
          }),
          {},
        );
        break;
      }
    }
    return materials;
  },
});

export const useCustomiserStore = create<CustomiserState>()(
  devtools(
    persist((...a) => ({
      ...createCustomiser(...a),
    })),
  ),
);
