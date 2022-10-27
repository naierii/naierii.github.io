import { Center } from '@react-three/drei';
import { CustomiserState, useCustomiserStore } from '@store/customiser';
import GraphicMaterial from '../GraphicMaterial';
import Model from '../Model';

// export interface SceneProps {}

const models = (state: CustomiserState) => state.selectedModels;

const Scene = () => {
  const selectedModels = useCustomiserStore(models);

  return (
    <Center>
      <group name='meshGroup'>
        {selectedModels.map((m) => (
          <Model key={m.model?.id} model={m.model} />
        ))}
        <GraphicMaterial />
      </group>
    </Center>
  );
};

export default Scene;
