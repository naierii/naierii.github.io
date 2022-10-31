import { useFabricCanvas } from '@hooks';
import { EDIT_MODE } from '@store/constants';
import { useCustomiserStore } from '@store/customiser';
import { fabric } from 'fabric';
import { useEffect, useRef } from 'react';
import { CurrentGraphic } from '@context/CurrentGraphicsContext';

export interface GraphicsCanvasProps {
  className?: string;
  graphic: CurrentGraphic;
}

const GraphicsCanvas = ({ className, graphic }: GraphicsCanvasProps) => {
  const fImageRef = useRef<fabric.Image | string>();
  const dimension = useCustomiserStore((state) => state.canvas);

  const { FabricCanvas, fabricRef } = useFabricCanvas({
    fabricObject: graphic,
    contextObject: graphic,
  });

  /**
   * Initialize fabric object
   */
  useEffect(() => {
    if (fabricRef.current && !fImageRef.current && dimension && graphic.imageurl) {
      const { width, height } = dimension;

      fabric.Image.fromURL(
        graphic.imageurl,
        function (oImg) {
          if (fabricRef.current && !fImageRef.current) {
            oImg.scaleToHeight(100);
            fabricRef.current.add(oImg);
            fImageRef.current = oImg;
          }
        },
        {
          left: width / 2,
          top: height / 2,
          originX: 'center',
          originY: 'center',
          crossOrigin: 'anonymous',
        },
      );
    }
  }, [fabricRef, fImageRef, dimension, graphic]);

  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        zIndex: 1000,
        display: graphic && graphic.editMode == EDIT_MODE.EDIT_2D ? 'block' : 'none',
      }}
    >
      <FabricCanvas></FabricCanvas>
    </div>
  );
};

export default GraphicsCanvas;
