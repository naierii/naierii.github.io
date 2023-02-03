import { Maybe, ModelFragment } from '@graphql/generated/graphql';
import { useGLTF } from '@react-three/drei';
import { useCustomiserStore } from '@store/customiser';
import { Fragment, useMemo, useRef } from 'react';
import { Material, Mesh } from 'three';
import { GLTF } from 'three-stdlib';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils';
import CustomiserMesh from '../CustomiserMesh';
import DecalGraphic from '../DecalGraphic';
import DecalText from '../DecalText';
export interface CustomiserModelProps {
  model?: Maybe<ModelFragment>;
}

type GLTFResult = GLTF & {
  nodes: { [name: string]: Mesh };
  materials: { [name: string]: Material };
};

const Model = ({ model }: CustomiserModelProps) => {
  const meshRef = useRef<Mesh>(null);
  const flags = useCustomiserStore((state) => state.flags);
  const texts = useCustomiserStore((state) => state.texts);
  const graphics = useCustomiserStore((state) => state.graphics);
  const { nodes } = useGLTF(
    model?.attributes?.model?.data?.attributes?.url as string,
  ) as unknown as GLTFResult;

  const geom = useMemo(() => {
    const geometries = [];

    for (const [, node] of Object.entries(nodes)) {
      if (node.isMesh) {
        geometries.push(node.geometry.clone());
      }
    }

    return BufferGeometryUtils.mergeBufferGeometries(geometries);
  }, [nodes]);

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
      <mesh geometry={geom} ref={meshRef}>
        <meshStandardMaterial transparent colorWrite={false} />
        {flags.map((flag) => {
          if (flag.decalPosition && flag.decalOrientation)
            return (
              <DecalGraphic
                key={flag.key}
                flag={flag}
                position={flag.decalPosition}
                orientation={flag.decalOrientation}
                scale={flag.decalScale}
              />
            );
        })}
        {graphics.map((graphic) => {
          if (graphic.decalPosition && graphic.decalOrientation)
            return (
              <DecalGraphic
                key={graphic.key}
                graphic={graphic}
                position={graphic.decalPosition}
                orientation={graphic.decalOrientation}
                scale={graphic.decalScale}
              />
            );
        })}
        {texts.map((text) => {
          if (text.decalPosition && text.decalOrientation)
            return (
              <DecalText
                key={text.key}
                text={text}
                position={text.decalPosition}
                orientation={text.decalOrientation}
                scale={text.decalScale}
              />
            );
        })}
      </mesh>
    </>
  );
};

export default Model;
