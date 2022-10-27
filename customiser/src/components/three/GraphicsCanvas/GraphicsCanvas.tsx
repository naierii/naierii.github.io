import { useFabricCanvas } from '@hooks';
import { fabric } from 'fabric';
import { useEffect, useRef } from 'react';
import { FabricObject, useCustomiserStore } from '@store/customiser';

export interface GraphicsCanvasProps {
  className?: string;
  graphic: FabricObject;
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
    if (fabricRef.current && !fImageRef.current && dimension) {
      const { width, height } = dimension;

      fImageRef.current = 'loading';

      fabric.Image.fromURL(
        '/sample.jpeg',
        function (oImg) {
          if (fabricRef.current) fabricRef.current.add(oImg);
          fImageRef.current = oImg;
        },
        {
          left: width / 2,
          top: height / 2,
          originX: 'center',
          originY: 'center',
          width: 100,
          height: 100,
        },
      );
    }
  }, [fabricRef]);

  return <FabricCanvas className={className}></FabricCanvas>;
};

export default GraphicsCanvas;
