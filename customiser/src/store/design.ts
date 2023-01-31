import produce from 'immer';
import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface DesignState {
  show: boolean;
  resetCamera: boolean;
  addingToCart: boolean;
  modelRotation: number;
  setResetCamera: () => void;
  setAddingToCart: () => void;
  setModelRotation: (rotation: number) => void;
  setShow: (show: boolean) => void;
}

const createDesign: StateCreator<DesignState, [['zustand/devtools', never]], []> = (set) => ({
  resetCamera: false,
  addingToCart: false,
  modelRotation: 0,
  show: false,
  setResetCamera: () => {
    set(
      produce((state: DesignState) => {
        state.resetCamera = true;
        state.addingToCart = false;
      }),
    );
  },
  setAddingToCart: () => {
    set(
      produce((state: DesignState) => {
        state.resetCamera = false;
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
