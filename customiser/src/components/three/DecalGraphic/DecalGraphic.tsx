import { Decal, useTexture } from '@react-three/drei';
import { EulerArray, FlagCustomiser, Vector3Array } from '@store/customiser';
import { useMemo } from 'react';
import { Euler, MathUtils, Vector3 } from 'three';
export interface DecalGraphicProps {
  flag?: FlagCustomiser;
  position: Vector3Array;
  orientation: EulerArray;
  scale?: number;
}

const DecalGraphic = ({ flag, position, orientation, scale = 1 }: DecalGraphicProps) => {
  const texture = flag?.flag?.attributes?.image.data?.attributes?.url
    ? [flag.flag.attributes.image.data.attributes.url]
    : [];

  const [image] = useTexture(texture);

  const ratio = useMemo(() => {
    const width = image.source.data.width ?? 1;
    const height = image.source.data.height ?? 1;
    return width / height;
  }, [image]);

  const rotationModifier = useMemo(() => {
    const orientationCopy = new Euler().fromArray(orientation);
    const currentAngle = MathUtils.radToDeg(orientationCopy.z);
    const newAngle = currentAngle + (flag?.decalRotation ?? 0);
    orientationCopy.z = MathUtils.degToRad(newAngle);
    return orientationCopy;
  }, [flag?.decalRotation, orientation]);

  const scaleModifier = useMemo(() => {
    return new Vector3(1 * ratio * scale, 1 * scale, 4);
  }, [scale]);

  if (!image) {
    return null;
  }

  return (
    <Decal position={position} rotation={rotationModifier} scale={scaleModifier}>
      <meshPhongMaterial
        map={image}
        transparent
        depthTest
        depthWrite={false}
        polygonOffset
        polygonOffsetFactor={-20}
        needsUpdate
      />
    </Decal>
  );
};

export default DecalGraphic;
