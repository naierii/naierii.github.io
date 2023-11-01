import { useCustomiserStore } from '@store/customiser';
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
  const { customProduct } = useCustomiserStore();

  const geom = useMemo(() => {
    const geometries = [];
    if (nodes) {
      for (const [nodeId, node] of Object.entries(nodes)) {
        const optionalPart = (customProduct?.attributes?.parts ?? [])
          .filter((p) => p?.optional)
          .map((p) => p?.modelParts?.data)
          .flat()
          .find((p) => p?.attributes?.nodeId === nodeId);

        if (node.isMesh && !optionalPart) {
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
