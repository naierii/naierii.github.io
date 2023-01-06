import create, { StateCreator, StoreApi } from 'zustand';
import createContext from 'zustand/context';
import produce from 'immer';
import { devtools } from 'zustand/middleware';
import {
  MaterialColourGroupEntity,
  MaterialEntity,
  MaterialTypeEntity,
  Maybe,
} from '@graphql/generated/graphql';
import { uniqBy } from 'lodash';

const uniqueColourGroups = (array: MaterialColourGroupEntity[]) => uniqBy(array, 'id');
const uniqueMaterialTypes = (array: MaterialTypeEntity[]) => uniqBy(array, 'id');
const uniqueMaterials = (array: MaterialEntity[]) => uniqBy(array, 'id');
interface MaterialGroupInitialState {
  colourGroups: MaterialColourGroupEntity[];
  materialTypes: MaterialTypeEntity[];
  materials: MaterialEntity[];
  selectedColourGroup?: MaterialColourGroupEntity;
  selectedMaterialType?: MaterialTypeEntity;
}
export interface MaterialGroupState extends MaterialGroupInitialState {
  resetMaterialGroup: () => void;
  setMaterials: (
    materials: MaterialEntity[],
    materialType?: Maybe<MaterialTypeEntity>,
    colourGroup?: Maybe<MaterialColourGroupEntity>,
  ) => void;
  filteredMaterials: () => MaterialEntity[];
  setColourGroup: (colourGroup: MaterialColourGroupEntity) => void;
  setMaterialType: (materialType: MaterialTypeEntity) => void;
}

const initialState: MaterialGroupInitialState = {
  colourGroups: [],
  materialTypes: [],
  materials: [],
};

const createMaterialGroup: StateCreator<MaterialGroupState, [['zustand/devtools', never]], []> = (
  set,
  get,
) => ({
  ...initialState,
  filteredMaterials: () => {
    const materials = get().materials;
    const colourGroup = get().selectedColourGroup;
    const materialType = get().selectedMaterialType;
    const filteredMaterials = materials.filter(
      (m) =>
        m.attributes?.type?.data?.id === materialType?.id &&
        m.attributes?.colourGroups?.data.find((g) => g.id === colourGroup?.id),
    );
    return filteredMaterials;
  },
  resetMaterialGroup: () => set(initialState),
  setMaterials: (
    materials: MaterialEntity[],
    materialType?: Maybe<MaterialTypeEntity>,
    colourGroup?: Maybe<MaterialColourGroupEntity>,
  ) => {
    set(
      produce((state: MaterialGroupState) => {
        const colourGroups = materials.flatMap(
          (d) => d.attributes?.colourGroups?.data,
        ) as MaterialColourGroupEntity[];
        state.colourGroups = uniqueColourGroups(colourGroups);
        if (colourGroup) {
          state.selectedColourGroup = colourGroup;
        } else {
          state.selectedColourGroup = state.colourGroups[0];
        }

        const materialTypes = materials
          .filter((m) =>
            m.attributes?.colourGroups?.data.find((g) => g.id === state.selectedColourGroup?.id),
          )
          .map((m) => m.attributes?.type?.data) as MaterialTypeEntity[];
        state.materialTypes = uniqueMaterialTypes(materialTypes);

        if (materialType) {
          state.selectedMaterialType = materialType;
        } else {
          state.selectedMaterialType = state.materialTypes[0];
        }

        state.materials = uniqueMaterials(materials);
      }),
    );
  },
  setColourGroup: (colourGroup: MaterialColourGroupEntity) => {
    set(
      produce((state: MaterialGroupState) => {
        state.selectedColourGroup = colourGroup;
        const materialTypes = state.materials
          .filter((m) =>
            m.attributes?.colourGroups?.data.find((g) => g.id === state.selectedColourGroup?.id),
          )
          .map((m) => m.attributes?.type?.data) as MaterialTypeEntity[];
        state.materialTypes = uniqueMaterialTypes(materialTypes);
        state.selectedMaterialType = state.materialTypes[0];
      }),
    );
  },
  setMaterialType: (materialType: MaterialTypeEntity) => {
    set(
      produce((state: MaterialGroupState) => {
        state.selectedMaterialType = materialType;
      }),
    );
  },
});

export const { Provider, useStore: useMaterialGroupStore } =
  createContext<StoreApi<MaterialGroupState>>();

export const createStore = () => create<MaterialGroupState>()(devtools(createMaterialGroup));
