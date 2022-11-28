/* eslint-disable @typescript-eslint/no-explicit-any */
import { FlagFragment } from '@graphql/generated/graphql';
import { EDIT_MODE } from '@store/constants';
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { MeshPhongMaterial } from 'three';
import { v4 as uuidv4 } from 'uuid';
import { fabric } from 'fabric';
import { useCustomiserStore } from '@store/customiser';

export interface GraphicsContextGraphic {
  key?: string;
  flag?: FlagFragment;
  canvas?: HTMLCanvasElement;
  fabricCanvas?: fabric.Canvas;
  canvasJSON?: any;
  freeze?: boolean;
  material?: MeshPhongMaterial | null;
  materialJSON?: any;
  edit?: boolean;
  editMode?: string;
}

interface GraphicsContextInterface {
  graphics?: GraphicsContextGraphic[];
  loadGraphic: (graphic: GraphicsContextGraphic) => void;
  addGraphic: (graphic: GraphicsContextGraphic) => void;
  updateGraphic: (key: string, graphic: GraphicsContextGraphic) => void;
  deleteGraphic: (key: string) => void;
}

interface GraphicsContextProviderProps {
  children: ReactNode;
}

export const GraphicsContext = createContext<GraphicsContextInterface>({
  graphics: [],
  loadGraphic: () => console.log(''),
  addGraphic: () => console.log(''),
  updateGraphic: () => console.log(''),
  deleteGraphic: () => console.log(''),
});

const GraphicsContextProvider = ({ children }: GraphicsContextProviderProps) => {
  const addFlag = useCustomiserStore((state) => state.addFlag);
  const updateFlag = useCustomiserStore((state) => state.updateFlag);
  const deleteFlag = useCustomiserStore((state) => state.deleteFlag);
  const [graphics, setGraphics] = useState<GraphicsContextGraphic[]>([]);
  const [flagKey, setFlagKey] = useState<string>();

  const loadGraphic = useCallback(
    (graphic: GraphicsContextGraphic) => {
      console.log('loadGraphic');

      setGraphics([
        ...graphics,
        {
          ...graphic,
        },
      ]);
    },
    [graphics],
  );

  const addGraphic = useCallback(
    (graphic: GraphicsContextGraphic) => {
      const newKey = graphic.key ?? uuidv4();
      setGraphics([
        ...graphics,
        {
          ...graphic,
          key: newKey,
          freeze: false,
          editMode: EDIT_MODE.EDIT_2D,
          edit: true,
        },
      ]);
      addFlag({ flag: graphic.flag, key: newKey });
    },
    [graphics],
  );

  useEffect(() => {
    if (flagKey) {
      const getGraphic = graphics.find((g) => g.key === flagKey);
      if (getGraphic) {
        updateFlag({
          key: flagKey,
          flag: getGraphic.flag,
          canvasJSON: getGraphic.canvasJSON,
          materialJSON: getGraphic.materialJSON,
        });
      }
      setFlagKey(undefined);
    }
  }, [graphics, flagKey]);

  const updateGraphic = useCallback(
    (key: string, graphic: GraphicsContextGraphic) => {
      setGraphics((graphics) =>
        graphics.map((g) => {
          g.canvasJSON = g.fabricCanvas?.toJSON();
          g.materialJSON = g.material?.toJSON();

          if (g.key === key) {
            return { ...g, ...graphic };
          }
          return { ...g, freeze: true };
        }),
      );
      setFlagKey(key);
    },
    [graphics],
  );

  const deleteGraphic = useCallback(
    (key: string) => {
      setGraphics((graphics) => graphics.filter((g) => g.key !== key));
      console.log(key);

      deleteFlag(key);
    },
    [graphics],
  );

  return (
    <GraphicsContext.Provider
      value={{ graphics, loadGraphic, addGraphic, updateGraphic, deleteGraphic }}
    >
      {children}
    </GraphicsContext.Provider>
  );
};

export default GraphicsContextProvider;

export function useGraphics() {
  return useContext(GraphicsContext);
}
