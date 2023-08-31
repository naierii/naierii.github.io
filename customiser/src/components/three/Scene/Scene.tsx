import { EventHandlers } from '@react-three/fiber/dist/declarations/src/core/events';
import { CustomiserState, useCustomiserStore } from '@store/customiser';
import { useDesignStore } from '@store/design';
import { forwardRef, useEffect } from 'react';
import { Group, MathUtils } from 'three';
import Model from '../Model';
import ModelDecals from '../ModelDecals';
import ModelMerge from '../ModelMerge';

const models = (state: CustomiserState) => state.selectedModels;

export interface SceneProps {
  onPointerDown?: EventHandlers['onPointerDown'];
  onPointerUp?: EventHandlers['onPointerUp'];
  onPointerMove?: EventHandlers['onPointerMove'];
  onClick?: EventHandlers['onClick'];
}

const Scene = forwardRef<Group, SceneProps>(
  ({ onPointerDown, onPointerUp, onPointerMove, onClick }: SceneProps, groupRef) => {
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
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerMove={onPointerMove}
        onClick={onClick}
        dispose={null}
      >
        <ModelMerge>
          {({ addNodes, geom }) => (
            <>
              {selectedModels.map((m) => (
                <Model key={m.model?.id} model={m.model} addNodes={addNodes} />
              ))}
              {geom && <ModelDecals geom={geom} />}
            </>
          )}
        </ModelMerge>
      </group>
    );
  },
);
Scene.displayName = 'Scene';

export default Scene;
