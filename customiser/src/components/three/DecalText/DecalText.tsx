import { Decal } from '@react-three/drei';
import { EulerArray, TextCustomiser, Vector3Array } from '@store/customiser';
import { useMemo, useRef } from 'react';
import { Euler, EulerOrder, MathUtils, Vector3 } from 'three';

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

  const scaleModifier = useMemo(() => {
    return new Vector3(2 * scale, 1 * scale, 4);
  }, [scale]);

  const matRef = useRef(null);
  const decalRef = useRef(null);

  return (
    <Decal ref={decalRef} position={position} rotation={rotationModifier} scale={scaleModifier}>
      <meshStandardMaterial
        ref={matRef}
        transparent
        depthTest
        depthWrite={false}
        color={'yellow'}
        map={text.preview}
      ></meshStandardMaterial>
    </Decal>
  );
};

export default DecalText;
