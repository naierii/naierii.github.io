/* eslint-disable @typescript-eslint/no-explicit-any */
import { EDIT_MODE } from '@store/constants';
import { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { IUniform, MeshPhongMaterial } from 'three';
import { v4 as uuidv4 } from 'uuid';

export interface NamesContextName {
  key?: string;
  text?: string;
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
  names?: NamesContextName[];
  addName: (graphic: NamesContextName) => void;
  updateName: (key: string, name: NamesContextName) => void;
  deleteName: (key: string) => void;
}

interface NamesContextProviderProps {
  children: ReactNode;
}

export const NamesContext = createContext<GraphicsContextInterface>({
  names: [],
  addName: () => console.log(''),
  updateName: () => console.log(''),
  deleteName: () => console.log(''),
});

const GraphicsContextProvider = ({ children }: NamesContextProviderProps) => {
  const [names, setNames] = useState<NamesContextName[]>([]);

  const addName = useCallback(
    (name: NamesContextName) => {
      const newKey = uuidv4();
      setNames([
        ...names,
        { ...name, key: newKey, freeze: false, editMode: EDIT_MODE.EDIT_2D, edit: true },
      ]);
    },
    [names],
  );

  const updateName = useCallback(
    (key: string, name: NamesContextName) => {
      setNames((names) =>
        names.map((g) => {
          if (g.key === key) {
            return { ...g, ...name };
          }
          return { ...g, freeze: true };
        }),
      );
    },
    [names],
  );

  const deleteName = useCallback(
    (key: string) => {
      setNames((names) => names.filter((g) => g.key !== key));
    },
    [names],
  );

  return (
    <NamesContext.Provider value={{ names, addName, updateName, deleteName }}>
      {children}
    </NamesContext.Provider>
  );
};

export default GraphicsContextProvider;

export function useGraphics() {
  return useContext(NamesContext);
}
