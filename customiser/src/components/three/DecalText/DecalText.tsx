import { Decal, PerspectiveCamera, RenderTexture, Text, useTexture } from '@react-three/drei';
import { EulerArray, TextCustomiser, Vector3Array } from '@store/customiser';
import { useMemo } from 'react';
import { Euler, EulerOrder, MathUtils, Vector3 } from 'three';

export interface DecalTextProps {
  text?: TextCustomiser;
  position: Vector3Array;
  orientation: EulerArray;
  scale?: number;
}

const DecalText = ({ text, position, orientation, scale = 1 }: DecalTextProps) => {
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

  const [image] = useTexture(texture);

  const scaleModifier = useMemo(() => {
    return new Vector3(2 * scale, 1 * scale, 4);
  }, [scale]);

  const outline = text?.outline?.attributes?.hex ? 0.06 : 0;
  const outlineColour = text?.outline?.attributes?.hex ?? '#FFFFFF';

  return (
    <Decal position={position} rotation={rotationModifier} scale={scaleModifier}>
      <meshStandardMaterial transparent depthTest depthWrite={false}>
        <RenderTexture attach='map'>
          <PerspectiveCamera makeDefault manual aspect={4 / 2} position={[0, 0, 5]} />
          <Text
            fontSize={2}
            anchorX='center'
            anchorY='middle'
            outlineColor={outlineColour}
            outlineWidth={outline}
            color={!image ? '#000000' : undefined}
            font={text?.font}
            userData={{
              text,
            }}
          >
            {image && <meshBasicMaterial attach='material' map={image} />}
            {text?.text}
          </Text>
        </RenderTexture>
      </meshStandardMaterial>
    </Decal>
  );
};

export default DecalText;
