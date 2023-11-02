import { CanvasText } from '@lib/canvas';
import { useCustomiserStore } from '@store/customiser';
import { useEffect, useMemo, useRef, useState } from 'react';
import { CanvasTexture } from 'three';
import type { NavTextSelectProps } from './NavTextSelect';

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

  const { updateText } = useCustomiserStore();

  /**
   * Save image here
   */
  const materialImg = useMemo<Promise<HTMLImageElement>>(() => {
    return new Promise((res) => res(new Image()));
  }, [editText?.material]);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const outlineCanvas = outlineCanvasRef.current as HTMLCanvasElement;

    (async () => {
      const canvasText = new CanvasText(canvas, outlineCanvas);

      if (!editText || !editText.text || !editText.key) {
        canvasText.clear();
        return;
      }

      // Adjust this once preloading fonts has been implemented
      if (fontFamily !== editText?.font) {
        setFontFamily(editText?.font);
        await loadFonts(editText?.font as string);
      }

      const img = await materialImg;

      await canvasText.previewText({
        text: editText.text,
        /**
         * material: img
         */
        material: editText.material,
        outline: editText.outline,
      });

      updateText(editText.key, {
        preview: new CanvasTexture(outlineCanvas),
      });
    })();
  }, [editText?.text, editText?.material, editText?.outline]); // TO IMPROVE? - update only on certain value changes

  return (
    <div>
      <canvas height={200} style={{ width: '100%', display: 'none' }} ref={canvasRef} />
      <canvas height={200} style={{ width: '100%' }} ref={outlineCanvasRef} />
    </div>
  );
};

export default NavTextPreview;
