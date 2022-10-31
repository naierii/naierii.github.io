import { Center } from '@react-three/drei';
import { ThreeElements } from '@react-three/fiber';
import { CustomiserState, useCustomiserStore } from '@store/customiser';
import { useCurrentGraphics } from '@context/CurrentGraphicsContext';
import GraphicMaterial from '../GraphicMaterial';
import Model from '../Model';

// export interface SceneProps {}

const models = (state: CustomiserState) => state.selectedModels;

const Scene = () => {
  const selectedModels = useCustomiserStore(models);
  const { graphic } = useCurrentGraphics();

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
