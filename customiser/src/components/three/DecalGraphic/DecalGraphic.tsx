import { Decal, useTexture } from '@react-three/drei';
import { ThreeElements } from '@react-three/fiber';
import { FlagCustomiser } from '@store/customiser';
import { useMemo } from 'react';
import { Euler, MathUtils, Vector3 } from 'three';
export interface DecalGraphicProps {
  flag?: FlagCustomiser;
  position: Vector3;
  orientation: Euler;
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
    const orientationCopy = orientation.clone();
    const currentAngle = MathUtils.radToDeg(orientationCopy.z);
    const newAngle = currentAngle + (flag?.decalRotation ?? 0);
    orientationCopy.z = MathUtils.degToRad(newAngle);
    return orientationCopy;
  }, [flag?.decalRotation, orientation]);

  const scaleModifier = useMemo(() => {
    return new Vector3(1 * ratio * scale, 1 * scale, 1 * scale);
  }, [scale]);

  if (!position || !rotationModifier || !image) {
    return null;
  }

  const materialProps: ThreeElements['meshPhongMaterial'] = {
    map: image,
    transparent: true,
    depthTest: true,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -4,
    wireframe: false,
  };

  return (
    <Decal position={position} rotation={rotationModifier} scale={scaleModifier}>
      <meshPhongMaterial {...materialProps} />
    </Decal>
  );
};

export default DecalGraphic;
