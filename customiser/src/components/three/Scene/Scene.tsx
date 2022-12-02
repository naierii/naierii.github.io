import { useGraphics } from '@context/GraphicsContext';
import { Center } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { CustomiserState, useCustomiserStore } from '@store/customiser';
import { useDesignStore } from '@store/design';
import { forwardRef, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { BufferGeometry, Group, MathUtils } from 'three';
import GraphicMaterial from '../GraphicMaterial';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils';
import Model from '../Model';

const models = (state: CustomiserState) => state.selectedModels;

export interface SceneProps {
  onPointerMove?: (event: ThreeEvent<PointerEvent>) => void;
  onPointerDown?: (event: ThreeEvent<PointerEvent>) => void;
  onPointerup?: (event: ThreeEvent<PointerEvent>) => void;
}

const Scene = forwardRef<Group, SceneProps>(
  ({ onPointerMove, onPointerDown, onPointerup }: SceneProps, groupRef) => {
    const [merged, setMerged] = useState<BufferGeometry[]>([]);
    const selectedModels = useCustomiserStore(models);
    const { graphics } = useGraphics();
    const modelRotation = useDesignStore((state) => state.modelRotation);
    const addingToCart = useDesignStore((state) => state.addingToCart);
    console.log(merged);

    const geom = useMemo(() => {
      return BufferGeometryUtils.mergeBufferGeometries(merged);
    }, [merged]);

    useEffect(() => {
      if (addingToCart && typeof groupRef !== 'function' && groupRef?.current) {
        groupRef.current.rotateY(MathUtils.degToRad(modelRotation));
      }
    }, [addingToCart, modelRotation]);

    const graphicProps: ThreeElements['mesh'] = {
      geometry: geom,
    };

    const graphicMaterialProps: ThreeElements['meshStandardMaterial'] = {
      transparent: true,
      colorWrite: false,
    };

    return (
      <Center>
        <group
          name='meshGroup'
          ref={groupRef}
          onPointerMove={onPointerMove}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerup}
        >
          {graphics?.map((graphic) => (
            <GraphicMaterial key={graphic.key} graphic={graphic} />
          ))}
          {selectedModels.map((m) => (
            <Model key={m.model?.id} model={m.model} setMerged={setMerged} />
          ))}
          {/* <Tassels /> */}
        </group>
      </Center>
    );
  },
);
Scene.displayName = 'Scene';

export default Scene;
