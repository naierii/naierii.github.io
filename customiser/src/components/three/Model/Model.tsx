import { Maybe, ModelFragment } from '@graphql/generated/graphql';
import { useGLTF } from '@react-three/drei';
import { Fragment, useEffect } from 'react';
import { Material, Mesh } from 'three';
import { GLTF } from 'three-stdlib';
import CustomiserMesh from '../CustomiserMesh';
import { ModelMergeNodes } from '../ModelMerge/ModelMerge';
export interface CustomiserModelProps {
  model?: Maybe<ModelFragment>;
  addNodes: (newNodes: ModelMergeNodes, remove?: boolean) => void;
}

type GLTFResult = GLTF & {
  nodes: { [name: string]: Mesh };
  materials: { [name: string]: Material };
};

const Model = ({ model, addNodes }: CustomiserModelProps) => {
  const { nodes } = useGLTF(
    model?.attributes?.model?.data?.attributes?.url as string,
  ) as unknown as GLTFResult;

  useEffect(() => {
    delete nodes['Scene'];
    addNodes(nodes);

    return () => {
      addNodes(nodes, true);
    };
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
    </>
  );
};

export default Model;
