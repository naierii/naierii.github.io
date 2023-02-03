import { useCustomiserStore } from '@store/customiser';
import { BufferGeometry } from 'three';
import DecalGraphic from '../DecalGraphic';
import DecalText from '../DecalText';

export interface ModelDecalsProps {
  geom: BufferGeometry;
}

const ModelDecals = ({ geom }: ModelDecalsProps) => {
  const flags = useCustomiserStore((state) => state.flags);
  const texts = useCustomiserStore((state) => state.texts);
  const graphics = useCustomiserStore((state) => state.graphics);
  return (
    <mesh geometry={geom}>
      <meshStandardMaterial transparent colorWrite={false} />
      {flags.map((flag) => {
        if (flag.decalPosition && flag.decalOrientation)
          return (
            <DecalGraphic
              key={flag.key}
              flag={flag}
              position={flag.decalPosition}
              orientation={flag.decalOrientation}
              scale={flag.decalScale}
            />
          );
      })}
      {graphics.map((graphic) => {
        if (graphic.decalPosition && graphic.decalOrientation)
          return (
            <DecalGraphic
              key={graphic.key}
              graphic={graphic}
              position={graphic.decalPosition}
              orientation={graphic.decalOrientation}
              scale={graphic.decalScale}
            />
          );
      })}
      {texts.map((text) => {
        if (text.decalPosition && text.decalOrientation)
          return (
            <DecalText
              key={text.key}
              text={text}
              position={text.decalPosition}
              orientation={text.decalOrientation}
              scale={text.decalScale}
            />
          );
      })}
    </mesh>
  );
};

export default ModelDecals;
