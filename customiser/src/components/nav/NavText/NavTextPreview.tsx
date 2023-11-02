import { CanvasText } from '@lib/canvas';
import { useCustomiserStore } from '@store/customiser';
import { useEffect, useMemo, useRef, useState } from 'react';
import { CanvasTexture } from 'three';
import type { NavTextSelectProps } from './NavTextSelect';
import { usePortalRef } from '@hooks';
import { createPortal } from 'react-dom';

import styles from './NavText.module.scss';

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

  const portalRef = usePortalRef('NavHeaderAfter');

  /**
   * Save image here
   */
  const materialImg = useMemo<Promise<HTMLImageElement>>(() => {
    return new Promise((res) => res(new Image()));
  }, [editText?.material]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const outlineCanvas = outlineCanvasRef.current;

    if (!canvas || !outlineCanvas) {
      return;
    }

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
  }, [editText?.text, editText?.material, editText?.outline, editText?.font]); // TO IMPROVE? - update only on certain value changes

  if (!portalRef) {
    return null;
  }

  return createPortal(
    <div className={styles.textPreview}>
      {!editText?.text ? (
        <div className={styles.noText}>Enter text to show preview</div>
      ) : (
        <>
          <canvas height={50} style={{ width: '100%', display: 'none' }} ref={canvasRef} />
          <canvas height={50} style={{ width: '100%' }} ref={outlineCanvasRef} />
        </>
      )}
    </div>,
    portalRef,
  );
};

export default NavTextPreview;
