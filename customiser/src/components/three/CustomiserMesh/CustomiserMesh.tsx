import { useCurrentGraphics } from '@context/CurrentGraphicsContext';
import { MaterialTextureMapModel } from '@models';
import { useTexture } from '@react-three/drei';
import type { ThreeElements } from '@react-three/fiber';
import { EDIT_MODE } from '@store/constants';
import { useCustomiserStore } from '@store/customiser';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Box3, DoubleSide, Mesh, MeshStandardMaterial, RepeatWrapping, Vector3 } from 'three';
export interface ClonedTextureMeshProps {
  node: Mesh;
  texture: MaterialTextureMapModel;
}

const ClonedTextureMesh = ({ node, texture }: ClonedTextureMeshProps) => {
  const { graphic } = useCurrentGraphics();
  // const [hovered, setHovered] = useState(false);
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
    ...textures,
  };

  if (textures?.displacementMap) {
    materialProps.displacementScale = 0.01;
  }

  if (!textures?.roughnessMap) {
    materialProps.roughness = 0.4;
  }

  if (!textures?.metalnessMap) {
    materialProps.metalness = 0.05;
  }

  // const onPointerEnter = (e: ThreeEvent<PointerEvent>) => {
  //   e.stopPropagation();
  //   setHovered(true);
  // };

  // const onPointerLeave = (e: ThreeEvent<PointerEvent>) => {
  //   e.stopPropagation();
  //   setHovered(false);
  // };

  if (graphic?.material && graphic.editMode === EDIT_MODE.EDIT_2D && !graphic.freeze) {
    graphic.material.opacity = 0;
  } else if (graphic?.material) {
    graphic.material.opacity = 1;
  }

  const graphicProps: ThreeElements['mesh'] = {
    geometry: node.geometry,
    material: graphic?.material ?? undefined,
  };

  console.log(graphic?.material?.opacity);

  return (
    <>
      <mesh {...meshProps} ref={meshRef}>
        <meshStandardMaterial {...materialProps} ref={materialRef} />
      </mesh>
      {graphic?.material && (
        <mesh name={`texture_${node.id}`} scale={[1, 1, 1]} {...graphicProps}></mesh>
      )}
    </>
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
