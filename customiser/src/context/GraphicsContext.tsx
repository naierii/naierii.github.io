/* eslint-disable @typescript-eslint/no-explicit-any */
import { FlagFragment } from '@graphql/generated/graphql';
import { EDIT_MODE } from '@store/constants';
import { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { IUniform, MeshPhongMaterial } from 'three';
import { v4 as uuidv4 } from 'uuid';

export interface GraphicsContextGraphic {
  key?: string;
  flag?: FlagFragment;
  canvas?: HTMLCanvasElement;
  freeze?: boolean;
  material?: MeshPhongMaterial | null;
  edit?: boolean;
  editMode?: string;
  uniforms?: {
    [uniform: string]: IUniform<any>;
  };
}

interface GraphicsContextInterface {
  graphics?: GraphicsContextGraphic[];
  addGraphic: (graphic: GraphicsContextGraphic) => void;
  updateGraphic: (key: string, graphic: GraphicsContextGraphic) => void;
  deleteGraphic: (key: string) => void;
}

interface GraphicsContextProviderProps {
  children: ReactNode;
}

export const GraphicsContext = createContext<GraphicsContextInterface>({
  graphics: [],
  addGraphic: () => console.log(''),
  updateGraphic: () => console.log(''),
  deleteGraphic: () => console.log(''),
});

const GraphicsContextProvider = ({ children }: GraphicsContextProviderProps) => {
  const [graphics, setGraphics] = useState<GraphicsContextGraphic[]>([]);

  const addGraphic = useCallback(
    (graphic: GraphicsContextGraphic) => {
      const newKey = uuidv4();
      setGraphics([
        ...graphics,
        { ...graphic, key: newKey, freeze: false, editMode: EDIT_MODE.EDIT_2D, edit: true },
      ]);
    },
    [graphics],
  );

  const updateGraphic = useCallback(
    (key: string, graphic: GraphicsContextGraphic) => {
      setGraphics((graphics) =>
        graphics.map((g) => {
          if (g.key === key) {
            return { ...g, ...graphic };
          }
          return { ...g, freeze: true };
        }),
      );
    },
    [graphics],
  );

  const deleteGraphic = useCallback(
    (key: string) => {
      setGraphics((graphics) => graphics.filter((g) => g.key !== key));
    },
    [graphics],
  );

  return (
    <GraphicsContext.Provider value={{ graphics, addGraphic, updateGraphic, deleteGraphic }}>
      {children}
    </GraphicsContext.Provider>
  );
};

export default GraphicsContextProvider;

export function useGraphics() {
  return useContext(GraphicsContext);
}
