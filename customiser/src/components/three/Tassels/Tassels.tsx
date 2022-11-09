/* eslint-disable react/no-unknown-property */
import { useGLTF, useTexture } from '@react-three/drei';
import { extend, MaterialNode, ThreeElements } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import {
  DoubleSide,
  Mesh,
  MeshStandardMaterial,
  RepeatWrapping,
  ShaderMaterial,
  Texture,
  Vector2,
  Vector3,
} from 'three';
import { GLTF } from 'three-stdlib';
import TasselsMaterial from './TasselsMaterial';

extend({ TasselsMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    tasselsMaterial: MaterialNode<ShaderMaterial, typeof TasselsMaterial>;
  }
}

type GLTFResult = GLTF & {
  nodes: { [name: string]: THREE.Mesh };
  materials: { [name: string]: THREE.Material };
};

const Tassels = () => {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<MeshStandardMaterial>(null);
  const { nodes } = useGLTF('./waist-tassels.glb') as unknown as GLTFResult;

  const baseGeom = useMemo(() => nodes['waist-tassels'].geometry, [nodes]);
  const textures = useTexture(
    {
      bumpMap: './tassels-bump.jpg',
      alphaMap: './tassels-opacity.jpg',
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

  useEffect(() => {
    if (materialRef.current) materialRef.current.needsUpdate = true;
  }, [textures]);

  const MeshProps: ThreeElements['mesh'] = {
    geometry: baseGeom,
    scale: new Vector3(1, 1, 1),
    position: new Vector3(0, 0, 0),
  };

  const MaterialProps: ThreeElements['meshStandardMaterial'] = {
    color: '#FFFFFF',
    emissive: '#000000',
    emissiveIntensity: 1,
    metalness: -0.3,
    normalScale: new Vector2(0, 0),
    side: DoubleSide,
    bumpScale: 0.15,
    roughness: 0.8,
    ...textures,
    transparent: true,
  };

  return (
    <mesh ref={meshRef} {...MeshProps}>
      <meshStandardMaterial ref={materialRef} {...MaterialProps} />
    </mesh>
  );
};

useGLTF.preload('./waist-tassels.glb');

export default Tassels;
