import { GraphicsContextGraphic, useGraphics } from '@context/GraphicsContext';
import { EDIT_MODE } from '@store/constants';
import { useCustomiserStore } from '@store/customiser';
import { fabric } from 'fabric';
import { CanvasHTMLAttributes, useCallback, useEffect, useRef } from 'react';

interface UseFabricCanvasProps {
  fabricObject: GraphicsContextGraphic;
  contextObject: GraphicsContextGraphic;
}

export const useFabricCanvas = ({ fabricObject, contextObject }: UseFabricCanvasProps) => {
  const { material } = fabricObject;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas>();
  const dimension = useCustomiserStore((state) => state.canvas);
  const { updateGraphic } = useGraphics();

  const renderFabric = useCallback(() => {
    console.log('renderFabric');

    if (fabricRef.current) {
      fabricRef.current.renderAll();
      if (material && material.map) {
        material.map.needsUpdate = true;
      }
    }
  }, [fabricRef, material]);

  /**
   * Initialize FabricJS
   */
  useEffect(() => {
    if (canvasRef.current && !fabricRef.current) {
      const fCanvas = new fabric.Canvas(canvasRef.current);

      fCanvas.setBackgroundColor('transparent', fCanvas.renderAll.bind(fCanvas));

      fabricRef.current = fCanvas;
      if (fabricObject.key) {
        updateGraphic(fabricObject.key, { canvas: canvasRef.current });
      }
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
