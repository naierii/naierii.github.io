import { Maybe, ModelEntity } from '@graphql/generated/graphql';
import { useGLTF } from '@react-three/drei';
import { Suspense } from 'react';
import { GLTF } from 'three-stdlib';
import CustomiserMesh from '../CustomiserMesh';

export interface CustomiserModelProps {
  model?: Maybe<ModelEntity>;
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
          <>
            {part?.attributes?.nodeId && (
              <Suspense key={part.attributes.nodeId} fallback={null}>
                <CustomiserMesh
                  node={nodes[part.attributes.nodeId]}
                  nodeId={part.attributes.nodeId}
                />
              </Suspense>
            )}
          </>
        );
      })}
    </>
  );
};

export default Model;
