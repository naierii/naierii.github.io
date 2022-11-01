import create, { StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface DesignState {}

const createDesign: StateCreator<DesignState, [['zustand/devtools', never]], []> = (
  set,
  get,
) => ({});

export const useCustomiserStore = create<DesignState>()(
  devtools(
    createDesign,
    // persist((...a) => ({
    //   ...createDesign(...a),
    // })),
  ),
);
