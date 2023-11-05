import { CanvasText, getMaterialUrl } from '@lib/canvas';
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

// TO IMPROVE? - Make this a reusable function if needed
async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    if (!src) resolve(img);
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

const NavTextPreview = ({ editText }: NavTextSelectProps) => {
  const previewImgRef = useRef<HTMLImageElement | null>(null);
  const [fontFamily, setFontFamily] = useState<string | undefined>(editText?.font);
  const [isVisiblePreview, setIsVisiblePreview] = useState(false);

  const { updateText } = useCustomiserStore();

  const portalRef = usePortalRef('NavHeaderAfter');

  /**
   * Save image here
   */
  const materialImgMemo = useMemo<Promise<HTMLImageElement>>(() => {
    return loadImage(getMaterialUrl(editText?.material));
  }, [editText?.material]);
  const outlineImgMemo = useMemo<Promise<HTMLImageElement>>(() => {
    return loadImage(getMaterialUrl(editText?.outline));
  }, [editText?.outline]);

  useEffect(() => {
    const previewImgDom = previewImgRef.current as HTMLImageElement;

    (async () => {
      const canvasText = new CanvasText();

      if (!editText || !editText.key || !isVisiblePreview) {
        canvasText.clear();
        return;
      }

      if (!editText.text) {
        canvasText.clear();
        updateText(editText.key, {
          preview: new CanvasTexture(canvasText.getOutlineCanvas()),
        });
        return;
      }

      // Adjust this once preloading fonts has been implemented
      if (fontFamily !== editText?.font) {
        setFontFamily(editText?.font);
        await loadFonts(editText?.font as string);
      }

      const img = editText?.material && (await materialImgMemo);
      const outlineImg = editText?.outline && (await outlineImgMemo);

      await canvasText.previewText({
        text: editText.text,
        material: img,
        outline: outlineImg,
        previewImg: previewImgDom,
      });

      updateText(editText.key, {
        preview: new CanvasTexture(canvasText.getOutlineCanvas()),
      });
    })();
  }, [editText?.text, editText?.material, editText?.outline, editText?.font, isVisiblePreview]);

  if (!portalRef) {
    return null;
  }

  return createPortal(
    <div id='testPreview' className={styles.textPreview}>
      {!editText?.text ? (
        <div className={styles.noText}>Enter text to show preview</div>
      ) : (
        <>
          <div className={styles.textPreview__imgContainer}>
            <img
              height={80}
              width={640}
              ref={(el) => {
                previewImgRef.current = el;
                setIsVisiblePreview(!!el);
              }}
            />
          </div>
        </>
      )}
    </div>,
    portalRef,
  );
};

export default NavTextPreview;
