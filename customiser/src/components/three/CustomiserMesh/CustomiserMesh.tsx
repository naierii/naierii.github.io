import { MaterialTextureMapModel } from '@models';
import { useTexture } from '@react-three/drei';
import { useCustomiserStore } from '@store/customiser';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Box3,
  DoubleSide,
  Mesh,
  MeshStandardMaterial,
  RepeatWrapping,
  Texture,
  Vector3,
} from 'three';
export interface ClonedTextureMeshProps {
  node: Mesh;
  texture: MaterialTextureMapModel;
  tasselsTexture: MaterialTextureMapModel;
  tassels: boolean;
  hex: string;
}

const ClonedTextureMesh = ({
  node,
  texture,
  tasselsTexture,
  tassels,
  hex,
}: ClonedTextureMeshProps) => {
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
        clone.repeat.set(0.0015 * area, 0.0015 * area);
        updatedTextures = { ...updatedTextures, [key]: clone };
      }

      setTextures(updatedTextures);
    }
  }, [clonedTextures]);

  if (materialRef.current) {
    materialRef.current.needsUpdate = true;
  }

  return (
    <>
      <mesh geometry={node.geometry} ref={meshRef}>
        {tassels ? (
          <meshStandardMaterial
            ref={materialRef}
            {...tasselsTexture}
            transparent
            bumpScale={0.15}
            color={hex}
            side={DoubleSide}
            metalness={-0.5}
          />
        ) : (
          <meshStandardMaterial
            side={DoubleSide}
            {...textures}
            displacementScale={textures?.displacementMap ? 0 : undefined}
            roughness={textures?.map ? undefined : 0.4}
            metalness={textures?.map ? undefined : 0.05}
            ref={materialRef}
          />
        )}
      </mesh>
    </>
  );
};
export interface CustomiserMeshProps {
  node: Mesh;
  nodeId: string;
}

const CustomiserMesh = ({ node, nodeId }: CustomiserMeshProps) => {
  const texture = useCustomiserStore(useCallback((state) => state.texture(nodeId), [nodeId]));
  const optional = useCustomiserStore(useCallback((state) => state.optional(nodeId), [nodeId]));
  const tassels = useCustomiserStore(useCallback((state) => state.tassels(nodeId), [nodeId]));

  const materialTexture = useTexture({ ...texture.materials });
  const tasselsTexture = useTexture(
    {
      alphaMap:
        'https://boxxer-api-dev.nyc3.cdn.digitaloceanspaces.com/tassels/tassels-opacity.jpg',
      bumpMap: 'https://boxxer-api-dev.nyc3.cdn.digitaloceanspaces.com/tassels/tassels-bump.jpg',
    },
    (textures) => {
      const [bumpMap, alphaMap] = textures as Texture[];
      alphaMap.wrapS = alphaMap.wrapT = RepeatWrapping;
      alphaMap.flipY = false;
      alphaMap.repeat.set(1, 1);
      alphaMap.needsUpdate = true;
      bumpMap.wrapS = bumpMap.wrapT = RepeatWrapping;
      bumpMap.flipY = false;
      bumpMap.repeat.set(1, 1);
      bumpMap.needsUpdate = true;
    },
  );

  if (optional) {
    return null;
  }

  return (
    <ClonedTextureMesh
      node={node}
      texture={materialTexture}
      tasselsTexture={tasselsTexture}
      tassels={tassels}
      hex={texture.hex}
    />
  );
};

export default CustomiserMesh;
