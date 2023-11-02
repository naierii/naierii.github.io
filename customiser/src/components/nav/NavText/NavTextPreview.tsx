import { useEffect, useRef, useState } from 'react';
import type { NavTextSelectProps } from './NavTextSelect';
import { Canvas2d } from '@lib/canvas';

// TODO - Pre load the fonts somewhere
async function loadFonts(fontUrl: string) {
  const font = new FontFace('testFont', `url(${fontUrl})`);
  await font.load();
  document.fonts.add(font);
}

const NavTextPreview = ({ editText }: NavTextSelectProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const outlineCanvasRef = useRef<HTMLCanvasElement>(null);
  const [fontFamily, setFontFamily] = useState<string | undefined>(editText?.font);
  console.log('editText', editText)
  
  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const canvas2d = new Canvas2d(canvas);
    const ctx = canvas2d.getCtx();

    const outlineCanvas = outlineCanvasRef.current as HTMLCanvasElement;
    const outlineCanvas2d = new Canvas2d(outlineCanvas);
    const outlineCtx = outlineCanvas2d.getCtx();
    
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    (async()=>{
      if (!editText || !editText.text) {
        canvas2d.clear();
        outlineCanvas2d.clear();
        return;
      };

      if (fontFamily !== editText?.font) {
        setFontFamily(editText?.font);
        await loadFonts(editText?.font as string);
      }

      canvas2d.clear();
      outlineCanvas2d.clear();

      canvas2d.drawPreviewText(editText.text);
      outlineCanvas2d.drawPreviewOutlineText(editText.text);

      await canvas2d.maskMaterialImg(editText.material);
      await outlineCanvas2d.maskMaterialImg(editText.outline);

      outlineCtx.drawImage(canvas, 0, 0);
    })()
  }, [editText]); // TO IMPROVE? - update only on certain value changes

  return (
    <div>
      <canvas height={200} style={{width: '100%'}} ref={canvasRef}/>
      <canvas height={200} style={{width: '100%'}} ref={outlineCanvasRef}/>
    </div>
  );
}

export default NavTextPreview;
