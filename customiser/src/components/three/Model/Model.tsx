import { Maybe, ModelFragment } from '@graphql/generated/graphql';
import { useGLTF } from '@react-three/drei';
import { Fragment } from 'react';
import { GLTF } from 'three-stdlib';
import CustomiserMesh from '../CustomiserMesh';

export interface CustomiserModelProps {
  model?: Maybe<ModelFragment>;
}

type GLTFResult = GLTF & {
  nodes: { [name: string]: THREE.Mesh };
  materials: { [name: string]: THREE.Material };
};

const Model = ({ model }: CustomiserModelProps) => {
  const { nodes } = useGLTF(
    model?.attributes?.model?.data?.attributes?.url as string,
  ) as unknown as GLTFResult;

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
    </>
  );
};

export default Model;
