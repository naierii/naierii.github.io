import { usePortalRef } from '@hooks';
import { Decal, PerspectiveCamera, RenderTexture, Text, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { EulerArray, TextCustomiser, Vector3Array, useCustomiserStore } from '@store/customiser';
import { useEffect, useMemo, useRef } from 'react';
import {
  Euler,
  EulerOrder,
  MathUtils,
  MeshStandardMaterial,
  Object3D,
  Texture,
  Vector3,
  WebGLRenderTarget,
} from 'three';

export interface DecalTextProps {
  text?: TextCustomiser;
  position: Vector3Array;
  orientation: EulerArray;
  scale?: number;
}

const DecalText = ({ text = {}, position, orientation, scale = 1 }: DecalTextProps) => {
  const { updateText } = useCustomiserStore();

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

  const textPreviewRef = useRef(null);
  const matRef = useRef(null);
  const decalRef = useRef(null);
  const camRef = useRef(null);

  // useEffect(() => {
  //   console.log('text changed');
  //   if (text.key && text.preview !== textPreviewRef.current) {
  //     console.log('update text');
  //     (window as any).preview = textPreviewRef.current;

  //     updateText(text.key, {
  //       preview: decalRef,
  //     });
  //   }
  // }, [text]);
  const view = usePortalRef('TestView');

  useFrame(({ gl, scene, camera }) => {
    if (text.edit && decalRef.current && camRef.current && textPreviewRef.current) {
      gl.render(textPreviewRef.current, camRef.current);
      // gl.render(textPreviewRef.current as Object3D<Event>, camera);

      const img = view?.querySelector('img');

      if (img) {
        img.src = gl.domElement.toDataURL();
        // img.src = (textPreviewRef.current as any).image.toDataURL();
        // console.log()
      }
    }
  });

  (window as any).textPreviewRef = textPreviewRef;

  return (
    <Decal ref={decalRef} position={position} rotation={rotationModifier} scale={scaleModifier}>
      <meshStandardMaterial ref={matRef} transparent depthTest depthWrite={false}>
        <RenderTexture attach='map'>
          <PerspectiveCamera ref={camRef} makeDefault manual aspect={4 / 2} position={[0, 0, 5]} />
          <Text
            ref={textPreviewRef}
            fontSize={2}
            anchorX='center'
            anchorY='middle'
            outlineColor={outlineColour}
            outlineWidth={outline}
            color={!image ? '#000000' : undefined}
            font={text?.font}
            name={['decalText', text?.key].join('-')}
            userData={{
              text,
            }}
            /**
             * onClick event in Text is required to be able to detect
             * click event on text for parent event
             */
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onClick={() => {}}
          >
            {image && <meshStandardMaterial attach='material' map={image} />}
            {text?.text}
          </Text>
        </RenderTexture>
      </meshStandardMaterial>
    </Decal>
  );
};

export default DecalText;
