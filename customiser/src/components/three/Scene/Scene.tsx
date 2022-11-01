import { useGraphics } from '@context/GraphicsContext';
import { Center } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { CustomiserState, useCustomiserStore } from '@store/customiser';
import { useRef } from 'react';
import GraphicMaterial from '../GraphicMaterial';
import Model from '../Model';

// export interface SceneProps {}

const models = (state: CustomiserState) => state.selectedModels;

const Scene = () => {
  const selectedModels = useCustomiserStore(models);
  const { graphics } = useGraphics();
  const { camera } = useThree();

  const cameraRef = useRef(camera);
  // useHelper(cameraRef, CameraHelper);

  return (
    <Center>
      <group name='meshGroup'>
        {graphics?.map((graphic) => (
          <GraphicMaterial key={graphic.key} graphic={graphic} />
        ))}

        {selectedModels.map((m) => (
          <Model key={m.model?.id} model={m.model} />
        ))}
      </group>
    </Center>
  );
};

export default Scene;
