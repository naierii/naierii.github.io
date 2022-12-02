import { GraphicsContextGraphic } from '@context/GraphicsContext';
import { Decal, useTexture } from '@react-three/drei';
import { ThreeElements } from '@react-three/fiber';
import { DoubleSide, Euler, Mesh, Vector2, Vector3 } from 'three';

export interface DecalGraphicProps {
  graphic?: GraphicsContextGraphic;
  position: Vector3;
  rotation: Euler;
}

const size = new Vector3(1, 1, 1);

const DecalGraphic = ({ graphic, position, rotation }: DecalGraphicProps) => {
  const [image] = useTexture([
    'https://boxxer-api-dev.nyc3.cdn.digitaloceanspaces.com/medium_flag_1537280997640_union_jack_26119_960_720_clipped_rev_1_075bac69c6.png',
  ]);

  const materialProps: ThreeElements['meshPhongMaterial'] = {
    map: image,
    shininess: 30,
    transparent: true,
    depthTest: true,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -4,
    wireframe: false,
  };

  return (
    <Decal position={position} rotation={rotation} scale={size}>
      <meshPhongMaterial {...materialProps} />
    </Decal>
  );
};

export default DecalGraphic;
