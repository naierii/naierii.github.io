import { useTexture } from '@react-three/drei';
import { useCustomiserStore } from '@store/customiser';
import { useRef, useCallback, useEffect, useState, useMemo } from 'react';
import { Box3, DoubleSide, Mesh, MeshStandardMaterial, RepeatWrapping, Vector3 } from 'three';
import type { ThreeElements } from '@react-three/fiber';
import { MaterialTextureMapModel } from '@models';
export interface ClonedTextureMeshProps {
  node: Mesh;
  texture: MaterialTextureMapModel;
}

const ClonedTextureMesh = ({ node, texture }: ClonedTextureMeshProps) => {
  const [textures, setTextures] = useState<MaterialTextureMapModel>();
  const materialRef = useRef<MeshStandardMaterial>(null);
  const meshRef = useRef<Mesh>(null);
  const clonedTextures = useMemo(
    () => Object.fromEntries(Object.entries(texture).map(([k, v]) => [k, v.clone()])),
    [texture],
  );

  useEffect(() => {
    if (clonedTextures && meshRef.current) {
      let updatedTextures: MaterialTextureMapModel = {};
      for (const [key, clone] of Object.entries(clonedTextures)) {
        clone.wrapS = clone.wrapT = RepeatWrapping;
        const boundingBox = new Box3().setFromObject(meshRef.current);
        const boxSize = new Vector3();
        const dimensions = boundingBox.getSize(boxSize);
        const area = dimensions.x * dimensions.y;
        clone.repeat.set(0.001 * area, 0.001 * area);
        updatedTextures = { ...updatedTextures, [key]: clone };
      }

      setTextures(updatedTextures);
    }
  }, [clonedTextures]);

  if (materialRef.current) {
    materialRef.current.needsUpdate = true;
  }

  const meshProps: ThreeElements['mesh'] = {
    geometry: node.geometry,
  };

  const materialProps: ThreeElements['meshStandardMaterial'] = {
    side: DoubleSide,
    roughness: 0.4,
    metalness: 0.05,
    ...textures,
  };

  return (
    <mesh {...meshProps} ref={meshRef}>
      <meshStandardMaterial {...materialProps} ref={materialRef} />
    </mesh>
  );
};
export interface CustomiserMeshProps {
  node: Mesh;
  nodeId: string;
}

const CustomiserMesh = ({ node, nodeId }: CustomiserMeshProps) => {
  const texture = useCustomiserStore(useCallback((state) => state.texture(nodeId), [nodeId]));
  const materialTexture = useTexture({ ...texture });

  return <ClonedTextureMesh node={node} texture={materialTexture} />;
};

export default CustomiserMesh;
