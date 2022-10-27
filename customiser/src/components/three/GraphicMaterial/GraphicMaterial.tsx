/* eslint-disable react/no-unknown-property */
import { ThreeElements } from '@react-three/fiber';
import { useCustomiserStore } from '@store/customiser';

export interface GraphicMaterialProps {
  test?: string;
}

const GraphicMaterial = ({ test }: GraphicMaterialProps) => {
  const graphic = useCustomiserStore((state) => state.graphic);

  if (!graphic) {
    return null;
  }

  const textureProps: ThreeElements['canvasTexture'] = graphic
    ? {
        image: graphic.canvas,
        needsUpdate: true,
      }
    : {};

  // const meshProps: ThreeElements['mesh'] = {
  //   position: [0, 5, 0],
  // };

  return (
    <mesh>
      {/* <projectedMaterial ref={shaderMat} camera={camera} texture={texture} /> */}
      {/* <canvasTexture ref={textureRef} {...textureProps} /> */}
    </mesh>
  );
};

export default GraphicMaterial;
