import { GraphicsContextGraphic, useGraphics } from '@context/GraphicsContext';
import { Maybe, ModelFragment } from '@graphql/generated/graphql';
import { useGLTF } from '@react-three/drei';
import { ThreeElements, ThreeEvent } from '@react-three/fiber';
import { EDIT_MODE } from '@store/constants';
import { useCustomiserStore } from '@store/customiser';
import { Dispatch, Fragment, SetStateAction, useEffect, useMemo, useRef } from 'react';
import { BufferGeometry, DoubleSide, Mesh } from 'three';
import { GLTF } from 'three-stdlib';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils';
import CustomiserMesh from '../CustomiserMesh';
import DecalGraphic from '../DecalGraphic';
export interface CustomiserModelProps {
  model?: Maybe<ModelFragment>;
  setMerged: Dispatch<SetStateAction<BufferGeometry[]>>;
}

type GLTFResult = GLTF & {
  nodes: { [name: string]: THREE.Mesh };
  materials: { [name: string]: THREE.Material };
};

const getGraphicProps = (graphic: GraphicsContextGraphic, geom: BufferGeometry) => {
  if (graphic?.material && graphic.editMode === EDIT_MODE.EDIT_2D && !graphic.freeze) {
    graphic.material.opacity = 0;
  } else if (graphic?.material) {
    graphic.material.opacity = 1;
  }

  const graphicProps: ThreeElements['mesh'] = {
    geometry: geom,
    material: graphic?.material ?? undefined,
  };

  return graphicProps;
};

const Model = ({ model, setMerged }: CustomiserModelProps) => {
  const meshRef = useRef<Mesh>(null);
  const { graphics } = useGraphics();
  const decalPosition = useCustomiserStore((state) => state.decalPosition);
  const decalRotation = useCustomiserStore((state) => state.decalRotation);
  const decalFreeze = useCustomiserStore((state) => state.decalFreeze);
  const { nodes } = useGLTF(
    model?.attributes?.model?.data?.attributes?.url as string,
  ) as unknown as GLTFResult;

  const geom = useMemo(() => {
    const geometries = [];
    for (const [, node] of Object.entries(nodes)) {
      if (node.isMesh) {
        geometries.push(node.geometry);
      }
    }

    const merged = BufferGeometryUtils.mergeBufferGeometries(geometries);

    return merged;
  }, [nodes]);

  useEffect(() => {
    const geometries: BufferGeometry[] = [];
    for (const [, node] of Object.entries(nodes)) {
      if (node.isMesh) {
        geometries.push(node.geometry);
      }
    }
    setMerged((merged) => [...merged, ...geometries]);
    // const mergedNodes = BufferGeometryUtils.mergeBufferGeometries(geometries);
  }, [nodes]);

  const graphicProps: ThreeElements['mesh'] = {
    geometry: geom,
  };

  const graphicMaterialProps: ThreeElements['meshStandardMaterial'] = {
    transparent: true,
    colorWrite: false,
  };

  return (
    <>
      {model?.attributes?.parts?.data.map((part) => {
        return (
          <Fragment key={part.id}>
            {part?.attributes?.nodeId && (
              <CustomiserMesh
                key={part.attributes.nodeId}
                node={nodes[part.attributes.nodeId]}
                nodeId={part.attributes.nodeId}
              />
            )}
          </Fragment>
        );
      })}
      {graphics?.map((graphic) => (
        <mesh
          key={graphic.key}
          name={'texture'}
          scale={[1, 1, 1]}
          {...getGraphicProps(graphic, geom)}
        ></mesh>
      ))}
      <mesh
        {...graphicProps}
        ref={meshRef}
        onPointerMove={(event: ThreeEvent<globalThis.PointerEvent>) => console.log(event.object)}
      >
        <meshStandardMaterial {...graphicMaterialProps} />
        {decalPosition && decalRotation && decalFreeze && (
          <DecalGraphic position={decalPosition} rotation={decalRotation} />
        )}
      </mesh>
    </>
  );
};

export default Model;
