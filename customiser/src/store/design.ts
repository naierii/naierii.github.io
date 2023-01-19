import produce from 'immer';
import create, { StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface DesignState {
  show: boolean;
  addingToCart: boolean;
  modelRotation: number;
  setAddingToCart: () => void;
  setModelRotation: (rotation: number) => void;
  setShow: (show: boolean) => void;
}

const createDesign: StateCreator<DesignState, [['zustand/devtools', never]], []> = (set, get) => ({
  addingToCart: false,
  modelRotation: 0,
  show: false,
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
  setShow: (show) => {
    set(
      produce((state: DesignState) => {
        state.show = show;
      }),
    );
  },
});

export const useDesignStore = create<DesignState>()(devtools(createDesign));
