import { ThreeElements } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { MeshPhongMaterial } from 'three';
import { useCurrentGraphics } from '../../../context/CurrentGraphicsContext';
import ProjectedMaterial from '../ProjectedMaterial/ProjectedMaterial';

export interface GraphicMaterialProps {
  test?: string;
}

const GraphicMaterial = ({ ...rest }: GraphicMaterialProps) => {
  const materialRef = useRef<MeshPhongMaterial>(null);
  const { graphic, setGraphic } = useCurrentGraphics();

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.needsUpdate = true;
    }

    if (graphic && !graphic.material && materialRef.current) {
      setGraphic({ material: materialRef.current });
    }
  }, [materialRef, graphic]);

  if (!graphic) {
    return null;
  }

  const textureProps: ThreeElements['canvasTexture'] = graphic?.canvas
    ? {
        image: graphic.canvas,
        needsUpdate: true,
        attach: 'map',
      }
    : {};

  if (!graphic.canvas) {
    return null;
  }

  return (
    <ProjectedMaterial ref={materialRef} transparent={true} {...rest} freeze={graphic.freeze}>
      <canvasTexture {...textureProps} />
    </ProjectedMaterial>
  );
};

export default GraphicMaterial;
