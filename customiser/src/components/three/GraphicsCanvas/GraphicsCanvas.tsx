import { GraphicsContextGraphic } from '@context/GraphicsContext';
import { useFabricCanvas } from '@hooks';
import { EDIT_MODE } from '@store/constants';
import { useCustomiserStore } from '@store/customiser';
import { fabric } from 'fabric';
import { useEffect } from 'react';

export interface GraphicsCanvasProps {
  className?: string;
  graphic: GraphicsContextGraphic;
}

const GraphicsCanvas = ({ className, graphic }: GraphicsCanvasProps) => {
  const dimension = useCustomiserStore((state) => state.canvas);

  const { FabricCanvas, fabricRef, fImageRef } = useFabricCanvas({
    fabricObject: graphic,
    contextObject: graphic,
  });

  /**
   * Initialize fabric object
   */
  useEffect(() => {
    if (fabricRef.current && !fImageRef.current && dimension && graphic.flag) {
      const { width, height } = dimension;
      const imageurl = graphic.flag ? graphic.flag.attributes?.image.data?.attributes?.url : '';

      if (imageurl) {
        fabric.Image.fromURL(
          imageurl,
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
    }
  }, [fabricRef, fImageRef, dimension, graphic]);

  useEffect(() => {
    if (fImageRef.current && graphic.flag && fabricRef.current) {
      const imageurl = graphic.flag ? graphic.flag.attributes?.image.data?.attributes?.url : '';
      if (imageurl) {
        fImageRef.current.setSrc(
          imageurl,
          () => {
            fabricRef.current?.renderAll();
          },
          { crossOrigin: 'anonymous' },
        );
      }
    }
  }, [fImageRef, fabricRef, graphic.flag]);

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
