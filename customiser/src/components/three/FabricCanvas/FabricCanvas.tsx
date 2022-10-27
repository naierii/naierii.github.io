import cn from 'classnames';
import { CanvasHTMLAttributes, useEffect, useRef, useTransition } from 'react';
import { fabric } from 'fabric';
import styles from './FabricCanvas.module.scss';
import { useCustomiserStore } from '@store/customiser';

export interface FabricCanvasProps extends CanvasHTMLAttributes<HTMLCanvasElement> {
  className?: string;
}

const FabricCanvas = ({ className, ...props }: FabricCanvasProps) => {
  const canvas = useCustomiserStore((state) => state.canvas);
  const setGraphic = useCustomiserStore((state) => state.setGraphic);
  const [isPending, startTransition] = useTransition();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas>();
  const rootClassName = cn(styles.root, className);

  // /**
  //  * Initialize FabricJS
  //  */
  // useEffect(() => {
  //   if (canvasRef.current && !fabricRef.current && canvas) {
  //     const fCanvas = new fabric.Canvas(canvasRef.current, {
  //       width: canvas.width,
  //       height: canvas.height,
  //     });
  //     fCanvas.setBackgroundColor('transparent', fCanvas.renderAll.bind(fCanvas));
  //     fabricRef.current = fCanvas;
  //     fCanvas.on('object:modified', () => {
  //       startTransition(() => {
  //         setGraphic(fCanvas.getElement());
  //       });
  //     });
  //   }
  // }, [canvasRef, fabricRef, canvas]);

  // const fImageRef = useRef<unknown>();

  // /**
  //  * Initialize fabric object
  //  */
  // useEffect(() => {
  //   if (fabricRef.current && canvas && !fImageRef.current) {
  //     fImageRef.current = 'loading';
  //     fabric.Image.fromURL(
  //       '/sample.jpeg',
  //       function (oImg) {
  //         if (fabricRef.current) {
  //           fabricRef.current.add(oImg);
  //           setGraphic(fabricRef.current.getElement());
  //         }
  //         fImageRef.current = oImg;
  //       },
  //       {
  //         left: canvas.width / 2,
  //         top: canvas.height / 2,
  //         originX: 'center',
  //         originY: 'center',
  //         width: 100,
  //         height: 100,
  //       },
  //     );
  //   }
  // }, [fabricRef, canvas, fImageRef]);

  return (
    <div className={rootClassName} ref={wrapperRef}>
      <canvas className={styles.canvas} ref={canvasRef} {...props}></canvas>
    </div>
  );
};

export default FabricCanvas;
