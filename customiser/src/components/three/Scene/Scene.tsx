import { useGraphics } from '@context/GraphicsContext';
import { Center } from '@react-three/drei';
import { ThreeElements, useFrame, useThree } from '@react-three/fiber';
import { CustomiserState, useCustomiserStore } from '@store/customiser';
import { useEffect, useRef } from 'react';
import { Group, MathUtils } from 'three';
import GraphicMaterial from '../GraphicMaterial';
import Model from '../Model';
import Tassels from '../Tassels';

// export interface SceneProps {}

const models = (state: CustomiserState) => state.selectedModels;

const Scene = () => {
  const groupRef = useRef<Group>(null);
  const selectedModels = useCustomiserStore(models);
  const { graphics } = useGraphics();
  const { camera } = useThree();
  const modelRotation = useCustomiserStore((state) => state.modelRotation);
  const addingToCart = useCustomiserStore((state) => state.addingToCart);

  // const cameraRef = useRef(camera);
  // useHelper(cameraRef, CameraHelper);

  // const groupProps: ThreeElements['group'] = {
  //   rotation:
  // };

  useEffect(() => {
    if (addingToCart && groupRef.current) {
      groupRef.current.rotateY(MathUtils.degToRad(modelRotation));
    }
  }, [addingToCart, modelRotation]);

  return (
    <Center>
      <group name='meshGroup' ref={groupRef}>
        {graphics?.map((graphic) => (
          <GraphicMaterial key={graphic.key} graphic={graphic} />
        ))}

        {selectedModels.map((m) => (
          <Model key={m.model?.id} model={m.model} />
        ))}
        {/* <Tassels /> */}
      </group>
    </Center>
  );
};

export default Scene;
