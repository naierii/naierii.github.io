import { MaterialTextureMapModel } from '@models';
import { useTexture } from '@react-three/drei';
import { TextCustomiser, useCustomiserStore } from '@store/customiser';
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

  const [isPointerDown, setIsPointerDown] = useState(false);
  const [isPointerMoved, setIsPointerMoved] = useState(false);

  const clonedTextures = useMemo(
    () => Object.fromEntries(Object.entries(texture).map(([k, v]) => [k, v.clone()])),
    [texture],
  );

  const { navItems, customProduct, setSelectedNav, texts, updateText } = useCustomiserStore();

  const editText = useMemo(() => texts.find((t) => t.edit), [texts]);

  const part = useMemo(
    () =>
      customProduct?.attributes?.parts?.find((p) =>
        p?.modelParts?.data.find(
          (mp) =>
            mp.attributes?.nodeId === node.userData.name || mp.attributes?.nodeId === node.name,
        ),
      ),
    [customProduct, node],
  );
  const navItem = useMemo(
    () => navItems.find((navItem) => navItem.id === part?.id),
    [part, navItems],
  );

  const navItemText = useMemo(
    () => navItems.find((navItem) => navItem.type === 'names'),
    [navItems],
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
        clone.repeat.set(0.0005 * area, 0.0005 * area);
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
      <mesh
        name={node.name}
        geometry={node.geometry}
        ref={meshRef}
        userData={{
          name: node.userData.name,
        }}
        onPointerDown={(e) => {
          setIsPointerDown(true);
        }}
        onPointerMove={(e) => {
          if (isPointerDown) {
            setIsPointerMoved(true);
          }
        }}
        onClick={(e) => {
          setIsPointerDown(false);
          setIsPointerMoved(false);

          if (!isPointerDown || isPointerMoved) {
            return;
          }

          if (editText?.key) {
            return;
          }

          const intersectedText = e.intersections.find(
            (intersection) => intersection.object.userData.text,
          )?.object.userData.text as TextCustomiser | undefined;

          /**
           * If text is clicked, go to NavItem to text
           */
          if (
            navItemText &&
            navItemText.index !== undefined &&
            intersectedText &&
            intersectedText.key
          ) {
            setSelectedNav(navItemText.index);
            updateText(intersectedText.key, { edit: true });

            return;
          }

          /**
           * If mesh part is clicked, go to NavItem of part
           */
          if (
            navItem &&
            navItem.index !== undefined &&
            e.intersections[0].object.name === node.name
          ) {
            e.stopPropagation();

            setSelectedNav(navItem.index);
          }
        }}
      >
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
      alphaMap.repeat.set(1.5, 1);
      alphaMap.needsUpdate = true;
      bumpMap.wrapS = bumpMap.wrapT = RepeatWrapping;
      bumpMap.flipY = false;
      bumpMap.repeat.set(1.5, 1);
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
