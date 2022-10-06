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

interface NavItem {
  id?: Scalars['ID'];
  name: Maybe<Scalars['String']>;
  type: 'option' | 'part';
  index?: number;
}

export interface CustomiserState {
  customProduct: Maybe<CustomProductEntity>;
  selectedModels: SelectedModel[];
  selectedOption: Maybe<ComponentCustomiserCustomOption>;
  selectedPart: Maybe<ComponentCustomiserCustomParts>;
  navItems: NavItem[];
  selectedNav: Maybe<NavItem>;
  parts: Part[];
  setSelectedModel: (optionId: Scalars['ID'], model?: Maybe<ModelEntity>) => void;
  setCustomProduct: (data: CustomProductEntity) => void;
  setOption: (data: ComponentCustomiserCustomOption) => void;
  setSelectedPart: (data: ComponentCustomiserCustomParts) => void;
  setPart: (part: ComponentCustomiserCustomParts, material: MaterialEntity) => void;
  setSelectedNav: (index: number) => void;
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
  navItems: [],
  selectedNav: null,
  parts: [],
  setCustomProduct: (data) => {
    let dataToSet: {
      customProduct: CustomProductEntity;
      selectedModels?: SelectedModel[];
      selectedOption?: Maybe<ComponentCustomiserCustomOption>;
      navItems?: NavItem[];
      selectedNav?: NavItem;
    } = {
      customProduct: data,
    };

    if (!get().selectedModels.length && data.attributes?.options) {
      const models: SelectedModel[] = [];
      data.attributes.options.forEach((option) => {
        if (option?.models?.length && option?.models[0]?.model?.data) {
          models.push({ optionId: option.id, model: option?.models[0]?.model?.data });
        }
      });

      const navOptions: NavItem[] =
        data.attributes.options?.map((o) => ({
          id: o?.id ?? '',
          name: o?.name ?? '',
          type: 'option',
        })) ?? [];

      const navParts: NavItem[] =
        data.attributes.parts?.map((o) => ({
          id: o?.id ?? '',
          name: o?.name ?? '',
          type: 'part',
        })) ?? [];

      const navItems = [...navOptions, ...navParts].map((i, index) => {
        i.index = index;
        return i;
      });

      dataToSet = {
        ...dataToSet,
        selectedModels: models,
        selectedOption: data.attributes.options[0],
        navItems: navItems,
        selectedNav: navItems[0],
      };
    }

    set(dataToSet);
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
  setSelectedNav: (index) =>
    set(
      produce((state: CustomiserState) => {
        const navItem = state.navItems.find((n) => n.index === index);

        if (navItem) {
          state.selectedNav = navItem;

          if (navItem.type === 'option') {
            const option = state.customProduct?.attributes?.options?.find(
              (o) => o?.id === navItem.id,
            );
            if (option) {
              state.selectedOption = option;
              state.selectedPart = null;
            }
          }

          if (navItem.type === 'part') {
            const part = state.customProduct?.attributes?.parts?.find((o) => o?.id === navItem.id);
            if (part) {
              state.selectedOption = null;
              state.selectedPart = part;
            }
          }
        }
      }),
    ),
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
