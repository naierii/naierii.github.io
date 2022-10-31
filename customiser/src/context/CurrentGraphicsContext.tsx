import { EDIT_MODE } from '@store/constants';
import { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { MeshPhongMaterial } from 'three';

export interface CurrentGraphic {
  imageurl?: string;
  canvas?: HTMLCanvasElement;
  freeze?: boolean;
  material?: MeshPhongMaterial | null;
  editMode?: string;
}

interface CurrentGraphicsContextInterface {
  graphic?: CurrentGraphic;
  setGraphic: (graphic: CurrentGraphic) => void;
}

interface CurrentGraphicsProviderProps {
  children: ReactNode;
}

export const CurrentGraphicsContext = createContext<CurrentGraphicsContextInterface>({
  setGraphic: () => console.log(''),
});

const CurrentGraphicsContextProvider = ({ children }: CurrentGraphicsProviderProps) => {
  const [currentGraphic, setCurrentGraphic] = useState<CurrentGraphic>({
    freeze: false,
    editMode: EDIT_MODE.EDIT_2D,
  });

  const setGraphic = useCallback(
    (graphic: CurrentGraphic) => {
      console.log('setGraphic');
      console.log(graphic);
      console.log({ ...currentGraphic, ...graphic });
      setCurrentGraphic({ ...currentGraphic, ...graphic });
    },
    [currentGraphic],
  );

  return (
    <CurrentGraphicsContext.Provider value={{ graphic: currentGraphic, setGraphic }}>
      {children}
    </CurrentGraphicsContext.Provider>
  );
};

export default CurrentGraphicsContextProvider;

export function useCurrentGraphics() {
  return useContext(CurrentGraphicsContext);
}
