import { ReactElement, useMemo, useState } from 'react';
import { BufferGeometry, Material, Mesh } from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils';

export type ModelMergeNodes = {
  [name: string]: Mesh<BufferGeometry, Material | Material[]>;
};

export interface ModelMergeProps {
  children(addNodes: {
    addNodes: (newNodes: ModelMergeNodes, remove?: boolean) => void;
    geom: BufferGeometry | null;
  }): ReactElement;
}

const ModelMerge = ({ children }: ModelMergeProps) => {
  const [nodes, setNodes] = useState<ModelMergeNodes>();

  const geom = useMemo(() => {
    const geometries = [];
    if (nodes) {
      for (const [, node] of Object.entries(nodes)) {
        if (node.isMesh) {
          geometries.push(node.geometry.clone());
        }
      }
    }

    return geometries.length ? BufferGeometryUtils.mergeBufferGeometries(geometries) : null;
  }, [nodes]);

  function addNodes(newNodes: ModelMergeNodes, remove?: boolean) {
    if (remove) {
      const cleanNodes = { ...nodes };
      for (const k in newNodes) {
        delete cleanNodes[k];
      }
      setNodes({ ...cleanNodes });
    } else {
      setNodes((prev) => ({ ...prev, ...newNodes }));
    }
  }

  return children({
    addNodes,
    geom,
  });
};

export default ModelMerge;
