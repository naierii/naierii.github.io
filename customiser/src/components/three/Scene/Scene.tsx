import { ThreeEvent } from '@react-three/fiber';
import { CustomiserState, useCustomiserStore } from '@store/customiser';
import { useDesignStore } from '@store/design';
import { forwardRef, useEffect } from 'react';
import { Group, MathUtils } from 'three';
import Model from '../Model';

const models = (state: CustomiserState) => state.selectedModels;

export interface SceneProps {
  onPointerMove?: (event: ThreeEvent<PointerEvent>) => void;
  onPointerDown?: (event: ThreeEvent<PointerEvent>) => void;
  onPointerup?: (event: ThreeEvent<PointerEvent>) => void;
}

const Scene = forwardRef<Group, SceneProps>(
  ({ onPointerMove, onPointerDown, onPointerup }: SceneProps, groupRef) => {
    const selectedModels = useCustomiserStore(models);
    const modelRotation = useDesignStore((state) => state.modelRotation);
    const addingToCart = useDesignStore((state) => state.addingToCart);

    useEffect(() => {
      if (addingToCart && typeof groupRef !== 'function' && groupRef?.current) {
        groupRef.current.rotateY(MathUtils.degToRad(modelRotation));
      }
    }, [addingToCart, modelRotation]);

    return (
      <group
        name='meshGroup'
        ref={groupRef}
        // onPointerMove={onPointerMove}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerup}
      >
        {selectedModels.map((m) => (
          <Model key={m.model?.id} model={m.model} />
        ))}
        {/* <Tassels /> */}
      </group>
    );
  },
);
Scene.displayName = 'Scene';

export default Scene;
