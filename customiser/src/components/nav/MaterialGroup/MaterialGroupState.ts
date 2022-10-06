import create, { StateCreator } from 'zustand';
import produce from 'immer';
import { devtools } from 'zustand/middleware';
import { MaterialColourGroupEntity } from '@graphql/generated/graphql';
import { uniqBy } from 'lodash';

interface MaterialGroupInitialState {
  colourGroups: MaterialColourGroupEntity[];
}

const uniqueColourGroups = (array: MaterialColourGroupEntity[]) => uniqBy(array, 'id');

export interface MaterialGroupState extends MaterialGroupInitialState {
  resetMaterialGroup: () => void;
  setColourGroups: (colourGroup: MaterialColourGroupEntity[]) => void;
}

const initialState: MaterialGroupInitialState = {
  colourGroups: [],
};

const createMaterialGroup: StateCreator<MaterialGroupState, [['zustand/devtools', never]], []> = (
  set,
  get,
) => ({
  ...initialState,
  resetMaterialGroup: () => set(initialState),
  setColourGroups: (colourGroups: MaterialColourGroupEntity[]) => {
    set(
      produce((state: MaterialGroupState) => {
        state.colourGroups = uniqueColourGroups([...state.colourGroups, ...colourGroups]);
      }),
    );
  },
});

export const useMaterialGroupStore = create<MaterialGroupState>()(devtools(createMaterialGroup));
