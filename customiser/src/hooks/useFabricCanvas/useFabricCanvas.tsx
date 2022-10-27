import { CanvasHTMLAttributes, useCallback, useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import { FabricObject, useCustomiserStore } from '@store/customiser';
import { EDIT_MODE } from '@store/constants';

interface UseFabricCanvasProps {
  fabricObject: FabricObject;
  contextObject: FabricObject;
}

export const useFabricCanvas = ({ fabricObject, contextObject }: UseFabricCanvasProps) => {
  const { material } = fabricObject;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas>();
  const dimension = useCustomiserStore((state) => state.canvas);

  const renderFabric = useCallback(() => {
    if (fabricRef.current) {
      fabricRef.current.renderAll();

      if (material && material.map) material.map.needsUpdate = true;
    }
  }, [fabricRef, material]);

  /**
   * Initialize FabricJS
   */
  useEffect(() => {
    console.log(canvasRef, fabricRef, fabricObject);
    if (canvasRef.current && !fabricRef.current) {
      const fCanvas = new fabric.Canvas(canvasRef.current);

      fCanvas.setBackgroundColor('transparent', fCanvas.renderAll.bind(fCanvas));

      fabricRef.current = fCanvas;
      fabricObject.canvas = canvasRef.current;
    }
  }, [canvasRef, fabricRef]);

  /**
   * Make sure the dimension of FabricJS canvas gets updated
   * on screen resize
   */
  useEffect(() => {
    if (fabricRef.current && dimension) {
      const { width, height } = dimension;

      fabricRef.current.setDimensions({
        width,
        height,
      });

      renderFabric();
    }
  }, [dimension, fabricRef]);

  /**
   * Ensure fabric selection controls do not get rendered in
   * 3D material
   */
  useEffect(() => {
    if (contextObject && contextObject.editMode && fabricRef.current) {
      if (contextObject.editMode === EDIT_MODE.EDIT_3D) {
        fabricRef.current.discardActiveObject();

        renderFabric();
      }
    }
  }, [contextObject?.editMode, fabricRef]);

  const FabricCanvas = useRef(({ ...rest }: CanvasHTMLAttributes<HTMLCanvasElement>) => {
    return <canvas ref={canvasRef} {...rest}></canvas>;
  });

  return {
    renderFabric,
    canvasRef,
    fabricRef,
    FabricCanvas: FabricCanvas.current,
  };
};
