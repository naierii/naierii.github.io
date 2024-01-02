/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  CustomProductFragment,
  CustomProductPartFragment,
  FlagFragment,
  GraphicFragment,
  MaterialFragment,
  Maybe,
  ModelFragment,
  NameEntity,
  Scalars,
} from '@graphql/generated/graphql';
import {
  ShopifyProductVariantFragment,
  ShopifyShopifyGetProductByIdQuery,
} from '@graphql/generated/graphql-shopify';
import { MaterialTextureModel } from '@models';
import produce from 'immer';
import { v4 as uuidv4 } from 'uuid';
import { create, StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { UNIT } from './constants';
import { Texture } from 'three';
interface SelectedModel {
  optionId: Scalars['ID'];
  model?: Maybe<ModelFragment>;
}

interface Part {
  part: CustomProductPartFragment;
  material: MaterialFragment;
}

export type Vector3Array = [number, number, number];
export type EulerArray = (string | number | undefined)[];

export interface FlagCustomiser {
  key?: string;
  flag?: FlagFragment;
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
  selectedName?: NameEntity;
  basePrice?: AddonPrice;
  letterPrice?: AddonPrice;
  outlinePrice?: AddonPrice;
  puffPrice?: AddonPrice;
  crystalPrice?: AddonPrice;
  totalPrice?: number;
  preview?: Texture;
  normalMap?: Texture;
  emissiveMap?: Texture;
}
export interface NavItem {
  id?: Scalars['ID'];
  name: Maybe<Scalars['String']>;
  type: 'option' | 'part' | 'fitting' | 'size' | 'flags' | 'names' | 'images';
  index?: number;
  required?: boolean;
  hasActions?: boolean;
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
  removePart: (part: CustomProductPartFragment) => void;
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
  addGraphic: (graphic: GraphicCustomiser) => void;
  updateGraphic: (key: string, graphic: GraphicCustomiser) => void;
  deleteGraphic: (key: string) => void;
  addText: (text: TextCustomiser) => void;
  updateText: (key: string, text: TextCustomiser) => void;
  deleteText: (key: string) => void;
  resetNav: () => void;
  texture: (nodeId: string) => {
    id?: Maybe<Scalars['ID']>;
    materials: MaterialTextureModel;
    hex: string;
  };
  optional: (nodeId: string) => boolean;
  tassels: (nodeId: string) => boolean;
  reset: () => void;
  designComplete: () => boolean;
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
  designComplete: () => {
    const navItems = get().navItems;
    let isComplete = true;

    const sizing = navItems.find((i) => i.type === 'size');
    if (sizing && !get().sizing?.variation) return false;

    const requiredParts = navItems.filter((i) => i.type === 'part' && i.required);
    for (const part of requiredParts) {
      if (!get().savedParts.find((p) => p.part.id === part.id)) {
        isComplete = false;
        break;
      }
    }

    return isComplete;
  },
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
        hasActions: true,
      };

      const navParts: NavItem[] =
        customProduct.attributes.parts?.map((o) => ({
          id: o?.id ?? '',
          name: o?.name ?? '',
          type: 'part',
          required: !o?.optional,
          hasActions: true,
        })) ?? [];

      const navSize: NavItem = {
        name: 'Size',
        type: 'size',
        required: true,
        hasActions: true,
      };

      const navFlags: NavItem = {
        name: 'Flags',
        type: 'flags',
        hasActions: true,
      };

      const navImages: NavItem = {
        name: 'Images',
        type: 'images',
        hasActions: true,
      };

      const navNames: NavItem = {
        name: 'Text',
        type: 'names',
        hasActions: true,
      };

      const navItems = [navFitting, ...navParts, navNames, navFlags, navImages, navSize].map(
        (i, index) => {
          i.index = index;
          return i;
        },
      );

      dataToSet = {
        ...dataToSet,
        selectedModels: models,
        savedModels: models,
        navItems: navItems,
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
  removePart: (part) => {
    set(
      produce((state: CustomiserState) => {
        state.parts = state.parts.filter((p) => p.part.id !== part.id);
        state.savedParts = state.savedParts.filter((p) => p.part.id !== part.id);
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

        state.savedParts = state.parts;
        state.savedModels = state.selectedModels;

        state.flags = state.flags.map((f) => {
          f.decalFreeze = false;
          f.edit = false;
          return f;
        });

        state.texts = state.texts.map((f) => {
          f.decalFreeze = false;
          f.edit = false;
          return f;
        });

        state.graphics = state.graphics.map((f) => {
          f.decalFreeze = false;
          f.edit = false;
          return f;
        });
      }),
    ),
  resetNav: () => set({ selectedPart: null, selectedNav: null }),
  cancelPartChange: () =>
    set(
      produce((state: CustomiserState) => {
        state.parts = state.savedParts;
        state.selectedModels = state.savedModels;
        state.selectedPart = null;
        state.selectedNav = null;
      }),
    ),
  texture: (nodeId) => {
    const parts = get().parts;
    let materials: MaterialTextureModel = {};
    let hex = '';
    let id;
    for (const p of parts) {
      const test = p.part.modelParts?.data.map((mp) => mp?.attributes?.nodeId).indexOf(nodeId);
      if (test != -1 && p?.material?.attributes?.images) {
        hex = p.material.attributes.hex ?? '';
        id = p.material.id;
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
      id,
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
  addGraphic: (graphic) => {
    set(
      produce((state: CustomiserState) => {
        const newKey = graphic.key ?? uuidv4();
        state.graphics = [
          ...state.graphics,
          { ...graphic, key: newKey, edit: true, decalFreeze: false },
        ];
      }),
    );
  },
  updateGraphic: (key, graphic) => {
    set(
      produce((state: CustomiserState) => {
        state.graphics = [
          ...state.graphics.map((f) => {
            if (f.key === key) {
              return { ...f, ...graphic };
            }
            return f;
          }),
        ];
      }),
    );
  },
  deleteGraphic: (key) => {
    set(
      produce((state: CustomiserState) => {
        state.graphics = [...state.graphics.filter((f) => f.key !== key)];
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
              const updateText = { ...f, ...text };
              let letterPrice;
              if (updateText.letterPrice && updateText.text) {
                letterPrice = updateText.letterPrice;
                letterPrice.quantity = updateText.text.length;
              }
              const basePriceTotal = updateText.basePrice?.price
                ? updateText.basePrice.price * updateText.basePrice?.quantity
                : 0;
              const letterPriceTotal = updateText.letterPrice?.price
                ? updateText.letterPrice.price * updateText.letterPrice?.quantity
                : 0;
              const outlinePriceTotal = updateText.outlinePrice?.price
                ? updateText.outlinePrice.price * updateText.outlinePrice?.quantity
                : 0;
              const puffPriceTotal = updateText.puffPrice?.price
                ? updateText.puffPrice.price * updateText.puffPrice?.quantity
                : 0;
              const crystalPriceTotal = updateText.crystalPrice?.price
                ? updateText.crystalPrice.price * updateText.crystalPrice?.quantity
                : 0;
              const totalPrice =
                basePriceTotal +
                letterPriceTotal +
                outlinePriceTotal +
                puffPriceTotal +
                crystalPriceTotal;
              return { ...updateText, letterPrice, totalPrice };
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
    set((state) => {
      useCustomiserStore.persist.clearStorage();
      return {
        ...state,
        parts: [],
        savedParts: [],
        texts: [],
        flags: [],
        graphics: [],
        sizing: undefined,
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
        onRehydrateStorage: () => (state) => {
          if (state) {
            // if (state.selectedPart) {
            //   const partNavItem = state.navItems.find(
            //     (navItem) => navItem.id === state.selectedPart?.id,
            //   );
            //   if (partNavItem && partNavItem.index) {
            //     state.setSelectedNav(partNavItem.index);
            //   }
            // } else {
            //   state.selectedNav = null;
            // }
          }
        },
      },
    ),
  ),
);
