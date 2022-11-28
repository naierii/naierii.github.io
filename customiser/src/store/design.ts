import produce from 'immer';
import create, { StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface DesignState {
  addingToCart: boolean;
  modelRotation: number;
  setAddingToCart: () => void;
  setModelRotation: (rotation: number) => void;
}

const createDesign: StateCreator<DesignState, [['zustand/devtools', never]], []> = (set, get) => ({
  addingToCart: false,
  modelRotation: 0,
  setAddingToCart: () => {
    set(
      produce((state: DesignState) => {
        state.addingToCart = true;
        state.modelRotation = 0;
      }),
    );
  },
  setModelRotation: (rotation) => {
    set(
      produce((state: DesignState) => {
        state.modelRotation = rotation;
      }),
    );
  },
});

export const useDesignStore = create<DesignState>()(devtools(createDesign));
