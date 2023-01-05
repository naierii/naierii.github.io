import { Decal, PerspectiveCamera, RenderTexture, Text } from '@react-three/drei';
import { TextCustomiser } from '@store/customiser';
import { useMemo } from 'react';
import { Euler, MathUtils, Vector3 } from 'three';

export interface DecalTextProps {
  text?: TextCustomiser;
  position: Vector3;
  orientation: Euler;
  scale?: number;
}

const DecalText = ({ text, position, orientation, scale = 1 }: DecalTextProps) => {
  const rotationModifier = useMemo(() => {
    const orientationCopy = orientation.clone();
    const currentAngle = MathUtils.radToDeg(orientationCopy.z);
    const newAngle = currentAngle + (text?.decalRotation ?? 0);
    orientationCopy.z = MathUtils.degToRad(newAngle);
    return orientationCopy;
  }, [text?.decalRotation, orientation]);

  const scaleModifier = useMemo(() => {
    return new Vector3(2 * scale, 1 * scale, 4);
  }, [scale]);

  return (
    <Decal position={position} rotation={rotationModifier} scale={scaleModifier}>
      <meshStandardMaterial transparent depthTest depthWrite={false}>
        <RenderTexture attach='map'>
          <PerspectiveCamera makeDefault manual aspect={4 / 2} position={[0, 0, 5]} />
          <Text fontSize={2} anchorX='center' anchorY='middle' color='red'>
            {text?.text}
          </Text>
        </RenderTexture>
      </meshStandardMaterial>
    </Decal>
  );
};

export default DecalText;
