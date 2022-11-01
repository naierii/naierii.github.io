import { Maybe, ModelFragment } from '@graphql/generated/graphql';
import { useGLTF } from '@react-three/drei';
import { Fragment, useMemo } from 'react';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils';
import { GLTF } from 'three-stdlib';
import CustomiserMesh from '../CustomiserMesh';
import { useCurrentGraphics } from '@context/CurrentGraphicsContext';
import { ThreeElements } from '@react-three/fiber';
import { EDIT_MODE } from '@store/constants';
export interface CustomiserModelProps {
  model?: Maybe<ModelFragment>;
}

type GLTFResult = GLTF & {
  nodes: { [name: string]: THREE.Mesh };
  materials: { [name: string]: THREE.Material };
};

const Model = ({ model }: CustomiserModelProps) => {
  const { graphic } = useCurrentGraphics();
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

  if (graphic?.material && graphic.editMode === EDIT_MODE.EDIT_2D && !graphic.freeze) {
    graphic.material.opacity = 0;
  } else if (graphic?.material) {
    graphic.material.opacity = 1;
  }

  const graphicProps: ThreeElements['mesh'] = {
    geometry: geom,
    material: graphic?.material ?? undefined,
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
      {graphic?.material && <mesh name={'texture'} scale={[1, 1, 1]} {...graphicProps}></mesh>}
    </>
  );
};

export default Model;
