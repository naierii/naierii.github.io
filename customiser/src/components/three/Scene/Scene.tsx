import { Center, useHelper } from '@react-three/drei';
import { ThreeElements, useThree } from '@react-three/fiber';
import { CustomiserState, useCustomiserStore } from '@store/customiser';
import { useCurrentGraphics } from '@context/CurrentGraphicsContext';
import GraphicMaterial from '../GraphicMaterial';
import Model from '../Model';
import { CameraHelper } from 'three';
import { useEffect, useRef } from 'react';
import { EDIT_MODE } from '@store/constants';

// export interface SceneProps {}

const models = (state: CustomiserState) => state.selectedModels;

const Scene = () => {
  const selectedModels = useCustomiserStore(models);
  const { graphic } = useCurrentGraphics();
  const { camera } = useThree();

  const cameraRef = useRef(camera);
  // useHelper(cameraRef, CameraHelper);

  return (
    <Center>
      <group name='meshGroup'>
        {graphic && graphic.imageurl && <GraphicMaterial />}

        {selectedModels.map((m) => (
          <Model key={m.model?.id} model={m.model} />
        ))}
      </group>
    </Center>
  );
};

export default Scene;
