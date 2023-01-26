/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  CustomProductFragment,
  CustomProductPartFragment,
  FlagFragment,
  GraphicFragment,
  MaterialFragment,
  Maybe,
  ModelFragment,
  Scalars,
} from '@graphql/generated/graphql';
import {
  ShopifyProductVariantFragment,
  ShopifyShopifyGetProductByIdQuery,
} from '@graphql/generated/graphql-shopify';
import { MaterialTextureModel } from '@models';
import produce from 'immer';
import { v4 as uuidv4 } from 'uuid';
import create, { StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { UNIT } from './constants';
interface SelectedModel {
  optionId: Scalars['ID'];
  model?: Maybe<ModelFragment>;
}

interface Part {
  part: CustomProductPartFragment;
  material: MaterialFragment;
}

export type Vector3Array = [number, number, number];
export type EulerArray = number[];

export interface FlagCustomiser {
  key?: string;
  flag?: FlagFragment;
  canvasJSON?: any;
  materialJSON?: any;
  decalPosition?: Vector3Array;
  decalOrientation?: EulerArray;
  decalRotation?: number;
  decalScale?: number;
  decalFreeze?: boolean;
  edit?: boolean;
  basePrice?: AddonPrice;
  size?: string;
}

export interface GraphicCustomiser {
  key?: string;
  graphic?: GraphicFragment;
  decalPosition?: Vector3Array;
  decalOrientation?: EulerArray;
  decalRotation?: number;
  decalScale?: number;
  decalFreeze?: boolean;
  edit?: boolean;
  basePrice?: AddonPrice;
  size?: string;
}

interface AddonPrice {
  price?: number;
  quantity: number;
  shopifyVariantId?: Maybe<Scalars['String']>;
}

export interface TextCustomiser {
  key?: string;
  text?: string;
  decalPosition?: Vector3Array;
  decalOrientation?: EulerArray;
  decalRotation?: number;
  decalScale?: number;
  decalFreeze?: boolean;
  edit?: boolean;
  font?: string;
  material?: MaterialFragment;
  outline?: MaterialFragment;
  nameType?: {
    id?: Maybe<Scalars['ID']>;
    name?: Maybe<Scalars['String']>;
  };
  basePrice?: AddonPrice;
  letterPrice?: AddonPrice;
  outlinePrice?: AddonPrice;
  puffPrice?: AddonPrice;
  crystalPrice?: AddonPrice;
  totalPrice?: number;
}
export interface NavItem {
  id?: Scalars['ID'];
  name: Maybe<Scalars['String']>;
  type: 'option' | 'part' | 'fitting' | 'size' | 'flags' | 'names';
  index?: number;
  required?: boolean;
}
interface SizingMeasurement {
  value?: number;
  unit?: string;
}
export interface CustomiserState {
  canvas?: {
    width: number;
    height: number;
  };
  customProduct?: CustomProductFragment;
  selectedModels: SelectedModel[];
  savedModels: SelectedModel[];
  selectedPart: Maybe<CustomProductPartFragment>;
  navItems: NavItem[];
  selectedNav: Maybe<NavItem>;
  parts: Part[];
  savedParts: Part[];
  flags: FlagCustomiser[];
  graphics: GraphicCustomiser[];
  texts: TextCustomiser[];
  variations: Array<ShopifyProductVariantFragment>;
  sizing?: {
    height?: SizingMeasurement;
    weight?: SizingMeasurement;
    size?: string;
    variation?: ShopifyProductVariantFragment;
  };
}

export interface CustomiserActions {
  total: () => string;
  setSelectedModel: (optionId: Scalars['ID'], model?: Maybe<ModelFragment>) => void;
  setCustomProduct: (
    customProduct: CustomProductFragment,
    shopifyProduct: ShopifyShopifyGetProductByIdQuery,
  ) => void;
  setSelectedPart: (data: CustomProductPartFragment) => void;
  setPart: (part: CustomProductPartFragment, material: MaterialFragment) => void;
  setSelectedNav: (index: number, save?: boolean) => void;
  setCanvasSize: (width: number, height: number) => void;
  setSizing: (
    height?: SizingMeasurement,
    weight?: SizingMeasurement,
    variation?: ShopifyProductVariantFragment,
  ) => void;
  cancelPartChange: () => void;
  addFlag: (flag: FlagCustomiser) => void;
  updateFlag: (key: string, flag: FlagCustomiser) => void;
  deleteFlag: (key: string) => void;
  addText: (text: TextCustomiser) => void;
  updateText: (key: string, text: TextCustomiser) => void;
  deleteText: (key: string) => void;
  resetNav: () => void;
  texture: (nodeId: string) => { materials: MaterialTextureModel; hex: string };
  optional: (nodeId: string) => boolean;
  tassels: (nodeId: string) => boolean;
  reset: () => void;
}

const initialState: CustomiserState = {
  selectedModels: [],
  savedModels: [],
  selectedPart: null,
  navItems: [],
  selectedNav: null,
  parts: [],
  savedParts: [],
  flags: [],
  graphics: [],
  texts: [],
  variations: [],
  sizing: {
    height: {
      unit: UNIT.HEIGHT.CM,
    },
    weight: {
      unit: UNIT.WEIGHT.KG,
    },
  },
};

const createCustomiser: StateCreator<
  CustomiserState & CustomiserActions,
  [['zustand/devtools', never], ['zustand/persist', unknown]],
  []
> = (set, get) => ({
  ...initialState,
  total: () => {
    let total = 0;
    const variation = get().sizing?.variation;
    if (variation?.price.amount) {
      total = total + Number(variation.price.amount);
    }

    get().parts.forEach((part) => {
      const priceAdjust = part.part.areaSize?.data?.attributes?.priceAdjust ?? 1;
      const price = part.material.attributes?.price?.data?.attributes?.price ?? 0;
      const sum = priceAdjust * price;
      total = total + sum;
    });

    get().texts.forEach((text) => {
      if (text.totalPrice) {
        total = total + text.totalPrice;
      }
    });

    get().flags.forEach((flag) => {
      if (flag.basePrice?.price) {
        total = total + flag.basePrice.price;
      }
    });

    return total.toFixed(2);
  },
  setCustomProduct: (customProduct, shopifyProduct) => {
    let dataToSet: {
      customProduct: CustomProductFragment;
      selectedModels?: SelectedModel[];
      savedModels?: SelectedModel[];
      navItems?: NavItem[];
      selectedNav?: NavItem;
      variations?: Array<ShopifyProductVariantFragment>;
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
        required: true,
      };

      const navParts: NavItem[] =
        customProduct.attributes.parts?.map((o) => ({
          id: o?.id ?? '',
          name: o?.name ?? '',
          type: 'part',
          required: !o?.optional,
        })) ?? [];

      const navSize: NavItem = {
        name: 'Size',
        type: 'size',
        required: true,
      };

      const navFlags: NavItem = {
        name: 'Flags',
        type: 'flags',
      };

      const navNames: NavItem = {
        name: 'Text',
        type: 'names',
      };

      const navItems = [navFitting, ...navParts, navNames, navFlags, navSize].map((i, index) => {
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
  setCanvasSize: (width, height) => {
    set(
      produce((state: CustomiserState) => {
        state.canvas = { width, height };
      }),
    );
  },
  setSizing: (height, weight, variation) => {
    set(
      produce((state: CustomiserState) => {
        if (height) {
          state.sizing = { ...state.sizing, height };
        }
        if (weight) {
          state.sizing = { ...state.sizing, weight };
        }
        if (variation) {
          state.sizing = { ...state.sizing, variation, size: variation.title };
        }
      }),
    );
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
    let hex = '';
    for (const p of parts) {
      const test = p.part.modelParts?.data.map((mp) => mp?.attributes?.nodeId).indexOf(nodeId);
      if (test != -1 && p?.material?.attributes?.images) {
        hex = p.material.attributes.hex ?? '';
        p.material.attributes.images?.forEach((image) => {
          materials = {
            ...materials,
            [image?.mapType as string]: image?.image?.data?.attributes?.url as string,
          };
        });

        break;
      }
    }
    return {
      materials,
      hex,
    };
  },
  optional: (nodeId) => {
    let isOptional = false;
    const parts = get().parts;
    const customProduct = get().customProduct;
    if (customProduct?.attributes?.parts?.length) {
      const optionalParts = customProduct.attributes.parts.filter((p) => p?.optional);
      for (const part of optionalParts) {
        const test = part?.modelParts?.data.map((mp) => mp?.attributes?.nodeId).indexOf(nodeId);
        if (test != -1) {
          isOptional = true;
          break;
        }
      }
    }

    for (const p of parts) {
      const test = p.part.modelParts?.data.map((mp) => mp?.attributes?.nodeId).indexOf(nodeId);
      if (test != -1) {
        isOptional = false;
        break;
      }
    }

    return isOptional;
  },
  tassels: (nodeId) => {
    let isTassels = false;
    const customProduct = get().customProduct;
    if (customProduct?.attributes?.parts?.length) {
      const tasselParts = customProduct.attributes.parts.filter((p) => p?.tassels);
      for (const part of tasselParts) {
        const test = part?.modelParts?.data.map((mp) => mp?.attributes?.nodeId).indexOf(nodeId);
        if (test != -1) {
          isTassels = true;
          break;
        }
      }
    }

    return isTassels;
  },
  addFlag: (flag) => {
    set(
      produce((state: CustomiserState) => {
        const newKey = flag.key ?? uuidv4();
        state.flags = [...state.flags, { ...flag, key: newKey, edit: true, decalFreeze: false }];
      }),
    );
  },
  updateFlag: (key, flag) => {
    set(
      produce((state: CustomiserState) => {
        state.flags = [
          ...state.flags.map((f) => {
            if (f.key === key) {
              return { ...f, ...flag };
            }
            return f;
          }),
        ];
      }),
    );
  },
  deleteFlag: (key) => {
    set(
      produce((state: CustomiserState) => {
        state.flags = [...state.flags.filter((f) => f.key !== key)];
      }),
    );
  },
  addText: (text) => {
    set(
      produce((state: CustomiserState) => {
        const newKey = text.key ?? uuidv4();
        state.texts = [...state.texts, { ...text, key: newKey, edit: true, decalFreeze: false }];
      }),
    );
  },
  updateText: (key, text) => {
    set(
      produce((state: CustomiserState) => {
        state.texts = [
          ...state.texts.map((f) => {
            if (f.key === key) {
              let letterPrice;
              if (f.letterPrice && f.text) {
                letterPrice = f.letterPrice;
                letterPrice.quantity = f.text.length;
              }
              const basePriceTotal = f.basePrice?.price
                ? f.basePrice.price * f.basePrice?.quantity
                : 0;
              const letterPriceTotal = f.letterPrice?.price
                ? f.letterPrice.price * f.letterPrice?.quantity
                : 0;
              const outlinePriceTotal = f.outlinePrice?.price
                ? f.outlinePrice.price * f.outlinePrice?.quantity
                : 0;
              const puffPriceTotal = f.puffPrice?.price
                ? f.puffPrice.price * f.puffPrice?.quantity
                : 0;
              const crystalPriceTotal = f.crystalPrice?.price
                ? f.crystalPrice.price * f.crystalPrice?.quantity
                : 0;
              const totalPrice =
                basePriceTotal +
                letterPriceTotal +
                outlinePriceTotal +
                puffPriceTotal +
                crystalPriceTotal;
              return { ...f, ...text, letterPrice, totalPrice };
            }
            return f;
          }),
        ];
      }),
    );
  },
  deleteText: (key) => {
    set(
      produce((state: CustomiserState) => {
        state.texts = [...state.texts.filter((f) => f.key !== key)];
      }),
    );
  },
  reset: () => {
    set(() => {
      useCustomiserStore.persist.clearStorage();
      return {
        ...initialState,
      };
    });
  },
});

export const useCustomiserStore = create<CustomiserState & CustomiserActions>()(
  devtools(
    persist(
      (...a) => ({
        ...createCustomiser(...a),
      }),
      {
        name: '',
      },
    ),
  ),
);
