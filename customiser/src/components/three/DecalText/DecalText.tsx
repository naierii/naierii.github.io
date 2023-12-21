import { Decal } from '@react-three/drei';
import { EulerArray, TextCustomiser, Vector3Array } from '@store/customiser';
import { useEffect, useMemo, useRef } from 'react';
import {
  Euler,
  EulerOrder,
  MathUtils,
  MeshStandardMaterial,
  Texture,
  Vector2,
  Vector3,
} from 'three';

export interface DecalTextProps {
  text?: TextCustomiser;
  position: Vector3Array;
  orientation: EulerArray;
  scale?: number;
}

const DecalText = ({ text = {}, position, orientation, scale = 1 }: DecalTextProps) => {
  const rotationModifier = useMemo(() => {
    const orientationCopy = new Euler().fromArray(
      orientation as [number, number, number, (EulerOrder | undefined)?, ...any[]],
    );
    const currentAngle = MathUtils.radToDeg(orientationCopy.z);
    const newAngle = currentAngle + (text?.decalRotation ?? 0);
    orientationCopy.z = MathUtils.degToRad(newAngle);
    return orientationCopy;
  }, [text?.decalRotation, orientation]);

  const texture =
    text?.material?.attributes?.images?.length &&
    text.material.attributes.images[0]?.image.data?.attributes?.url
      ? [text.material.attributes.images[0].image.data.attributes.url]
      : [];

  const shouldNormalMap =
    text.normalMap instanceof Texture && text.selectedName?.attributes?.name === 'Luxury';
  const normalMap = shouldNormalMap ? text.normalMap : null;

  // const isShiny = shouldNormalMap ? false : true;

  const isLuxury: boolean = text.selectedName?.id === '2' ? true : false;
  const hasPuff: boolean = text.puffPrice ? true : false;
  const hasCrystals: boolean = text.crystalPrice ? true : false;

  let normalScale = 1;
  if (hasCrystals) {
    normalScale = 4;
  } else if (isLuxury && !hasPuff) {
    normalScale = 0.5;
  } else if (isLuxury && hasPuff) {
    normalScale = 3;
  }

  const scaleModifier = useMemo(() => {
    return new Vector3(3.2 * scale, 0.4 * scale, 4);
  }, [scale]);

  const matRef = useRef<MeshStandardMaterial>(null);
  const decalRef = useRef(null);

  useEffect(() => {
    if (text.preview && matRef.current && text.preview instanceof Texture) {
      text.preview.needsUpdate = true;
      matRef.current.needsUpdate = true;
    }
  }, [text.preview]);

  return (
    <Decal ref={decalRef} position={position} rotation={rotationModifier} scale={scaleModifier}>
      <meshStandardMaterial
        ref={matRef}
        transparent
        roughness={isLuxury && !hasCrystals ? 1 : 0}
        depthTest
        depthWrite={false}
        map={text.preview instanceof Texture ? text.preview : null}
        normalMap={normalMap}
        normalScale={new Vector2(normalScale, normalScale)}
        emissiveMap={text.emissiveMap}
        emissive={'red'}
      ></meshStandardMaterial>
    </Decal>
  );
};

export default DecalText;
