import { useEffect, useRef, useState } from 'react';
import type { NavTextSelectProps } from './NavTextSelect';
import { CanvasText } from '@lib/canvas';

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
  
  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const outlineCanvas = outlineCanvasRef.current as HTMLCanvasElement;
    
    (async()=>{
      const canvasText = new CanvasText(canvas, outlineCanvas);

      if (!editText || !editText.text) {
        canvasText.clear();
        return;
      };

      // Adjust this once preloading fonts has been implemented
      if (fontFamily !== editText?.font) {
        setFontFamily(editText?.font);
        await loadFonts(editText?.font as string);
      }

      await canvasText.previewText({
        text: editText.text,
        material: editText.material,
        outline: editText.outline,
      });
    })()
  }, [editText]); // TO IMPROVE? - update only on certain value changes

  return (
    <div>
      <canvas height={200} style={{width: '100%', display: 'none'}} ref={canvasRef}/>
      <canvas height={200} style={{width: '100%'}} ref={outlineCanvasRef}/>
    </div>
  );
}

export default NavTextPreview;
