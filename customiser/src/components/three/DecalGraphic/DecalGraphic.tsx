import { GraphicsContextGraphic } from '@context/GraphicsContext';
import { Decal, useTexture } from '@react-three/drei';
import { ThreeElements } from '@react-three/fiber';
import { DoubleSide } from 'three';

export interface DecalGraphicProps {
  graphic?: GraphicsContextGraphic;
}

const DecalGraphic = ({ graphic }: DecalGraphicProps) => {
  const [image] = useTexture([
    'https://boxxer-api-dev.nyc3.cdn.digitaloceanspaces.com/flag_1531579805314_iq_f53587bd5e.png',
  ]);

  console.log({ image });

  // const textureProps: ThreeElements['canvasTexture'] = {
  //   image: graphic.canvas,
  //   needsUpdate: true,
  //   attach: 'map',
  // };

  // const materialProps: ThreeElements['meshPhongMaterial'] = {
  //   transparent: true,
  //   side: DoubleSide,
  // };

  // console.log(graphic);

  return (
    <Decal position={[-1.1071517066036387, -5.8812294024124867, -1.250402941840271]} map={image} />
    // <Decal
    //   position={[0, 0, 0]}
    //   rotation={0}
    //   scale={1}
    //   map={image}
    //   // map-anisotropy={16}
    //   // wireframe={true}
    //   // depthTest={true}
    //   // depthWrite={false}
    //   // side={DoubleSide}
    // >
    //   <meshPhongMaterial {...materialProps}>
    //     <canvasTexture {...textureProps} />
    //   </meshPhongMaterial>
    // </Decal>
  );
};

export default DecalGraphic;
