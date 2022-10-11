import type {
  ComponentCustomiserCustomParts,
  CustomProductEntity,
  MaterialEntity,
  Maybe,
  ModelEntity,
  Scalars,
} from '@graphql/generated/graphql';
import {
  ShopifyProductVariant,
  ShopifyShopifyGetProductByIdQuery,
} from '@graphql/generated/graphql-shopify';
import { MaterialTextureModel } from '@models';
import produce from 'immer';
import create, { StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

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
  type: 'option' | 'part' | 'fitting' | 'size';
  index?: number;
}

export type CustomiserProductVariant = Pick<
  ShopifyProductVariant,
  '__typename' | 'id' | 'title' | 'sku' | 'price'
>;
export interface CustomiserState {
  customProduct: Maybe<CustomProductEntity>;
  selectedModels: SelectedModel[];
  savedModels: SelectedModel[];
  selectedPart: Maybe<ComponentCustomiserCustomParts>;
  navItems: NavItem[];
  selectedNav: Maybe<NavItem>;
  parts: Part[];
  savedParts: Part[];
  variations: Array<CustomiserProductVariant>;
  setSelectedModel: (optionId: Scalars['ID'], model?: Maybe<ModelEntity>) => void;
  setCustomProduct: (
    customProduct: CustomProductEntity,
    shopifyProduct: ShopifyShopifyGetProductByIdQuery,
  ) => void;
  setSelectedPart: (data: ComponentCustomiserCustomParts) => void;
  setPart: (part: ComponentCustomiserCustomParts, material: MaterialEntity) => void;
  setSelectedNav: (index: number, save?: boolean) => void;
  cancelPartChange: () => void;
  resetNav: () => void;
  texture: (nodeId: string) => MaterialTextureModel;
}

const createCustomiser: StateCreator<
  CustomiserState,
  [['zustand/devtools', never], ['zustand/persist', unknown]],
  []
> = (set, get) => ({
  selectedModels: [],
  savedModels: [],
  customProduct: null,
  selectedPart: null,
  navItems: [],
  selectedNav: null,
  parts: [],
  savedParts: [],
  variations: [],
  setCustomProduct: (customProduct, shopifyProduct) => {
    let dataToSet: {
      customProduct: CustomProductEntity;
      selectedModels?: SelectedModel[];
      savedModels?: SelectedModel[];
      navItems?: NavItem[];
      selectedNav?: NavItem;
      variations?: Array<CustomiserProductVariant>;
    } = {
      customProduct,
      variations: shopifyProduct.product?.variants.nodes,
    };

    if (!get().selectedModels.length && customProduct.attributes?.options) {
      const models: SelectedModel[] = [];
      customProduct.attributes.options.forEach((option) => {
        if (option?.models?.length && option?.models[0]?.model?.data) {
          models.push({ optionId: option.id, model: option?.models[0]?.model?.data });
        }
      });

      const navFitting: NavItem = {
        name: 'Fitting',
        type: 'fitting',
      };

      const navParts: NavItem[] =
        customProduct.attributes.parts?.map((o) => ({
          id: o?.id ?? '',
          name: o?.name ?? '',
          type: 'part',
        })) ?? [];

      const navSize: NavItem = {
        name: 'Size',
        type: 'size',
      };

      const navItems = [navFitting, ...navParts, navSize].map((i, index) => {
        i.index = index;
        return i;
      });

      dataToSet = {
        ...dataToSet,
        selectedModels: models,
        savedModels: models,
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
  setSelectedPart: (data) => set({ selectedPart: data }),
  setSelectedNav: (index, save) =>
    set(
      produce((state: CustomiserState) => {
        const navItem = state.navItems.find((n) => n.index === index);

        if (navItem) {
          state.selectedNav = navItem;

          if (navItem.type === 'part') {
            const part = state.customProduct?.attributes?.parts?.find((o) => o?.id === navItem.id);
            if (part) {
              state.selectedPart = part;
            }
          } else {
            state.selectedPart = null;
          }
        }

        if (save) {
          state.savedParts = state.parts;
          state.savedModels = state.selectedModels;
        }
      }),
    ),
  resetNav: () => set({ selectedPart: null }),
  cancelPartChange: () =>
    set(
      produce((state: CustomiserState) => {
        state.parts = state.savedParts;
        state.selectedModels = state.savedModels;
      }),
    ),
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
