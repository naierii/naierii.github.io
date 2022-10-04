import { useTexture } from '@react-three/drei';
import { useCustomiserStore } from '@store/customiser';
import { useRef, useCallback } from 'react';
import { DoubleSide, Mesh, MeshStandardMaterial } from 'three';
import type { ThreeElements } from '@react-three/fiber';
export interface CustomiserMeshProps {
  node: Mesh;
  nodeId: string;
}

const CustomiserMesh = ({ node, nodeId }: CustomiserMeshProps) => {
  const materialRef = useRef<MeshStandardMaterial>(null);
  const texture = useCustomiserStore(useCallback((state) => state.texture(nodeId), [nodeId]));
  const materialTexture = useTexture({ ...texture }, () => {
    if (materialRef.current) {
      materialRef.current.needsUpdate = true;
    }
  });

  const meshProps: ThreeElements['mesh'] = {
    geometry: node.geometry,
  };

  const materialProps: ThreeElements['meshStandardMaterial'] = {
    side: DoubleSide,
    roughness: 0.4,
    metalness: 0.05,
    ...materialTexture,
  };

  console.log(materialTexture);

  return (
    <mesh {...meshProps}>
      <meshStandardMaterial {...materialProps} ref={materialRef} />
    </mesh>
  );
};

export default CustomiserMesh;
