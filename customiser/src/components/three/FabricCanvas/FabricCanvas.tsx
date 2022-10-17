import cn from 'classnames';
import { CanvasHTMLAttributes, useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import styles from './FabricCanvas.module.scss';

export interface FabricCanvasProps extends CanvasHTMLAttributes<HTMLCanvasElement> {
  className?: string;
}

const FabricCanvas = ({ className, ...props }: FabricCanvasProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas>();
  const rootClassName = cn(styles.root, className);

  /**
   * Initialize FabricJS
   */
  useEffect(() => {
    if (canvasRef.current && !fabricRef.current) {
      const fCanvas = new fabric.Canvas(canvasRef.current);
      fCanvas.setBackgroundColor('transparent', fCanvas.renderAll.bind(fCanvas));
      fabricRef.current = fCanvas;
    }
  }, [canvasRef, fabricRef]);

  const fImageRef = useRef<unknown>();

  /**
   * Initialize fabric object
   */
  useEffect(() => {
    if (fabricRef.current && canvasRef.current && !fImageRef.current) {
      fImageRef.current = 'loading';

      fabric.Image.fromURL(
        '/sample.jpeg',
        function (oImg) {
          if (fabricRef.current) {
            fabricRef.current.add(oImg);
          }
          fImageRef.current = oImg;
        },
        {
          left: canvasRef.current.width / 2,
          top: canvasRef.current.height / 2,
          originX: 'center',
          originY: 'center',
          width: 100,
          height: 100,
        },
      );
    }
  }, [fabricRef]);

  return (
    <div className={rootClassName} ref={wrapperRef}>
      <canvas className={styles.canvas} ref={canvasRef} {...props}></canvas>
    </div>
  );
};

export default FabricCanvas;
