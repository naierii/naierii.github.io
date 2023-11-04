import type { MaterialFragment } from '@graphql/generated/graphql';

export function getMaterialUrl(material: MaterialFragment | undefined): string {
  return material?.attributes?.images?.find((imgMap) => imgMap?.mapType === 'map')?.image.data
    ?.attributes?.formats.large.url;
}

interface PreviewText {
  text: string;
  material: HTMLImageElement | undefined;
  outline: HTMLImageElement | undefined;
  previewImg: HTMLImageElement;
}

export class CanvasText {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  outlineCanvas: HTMLCanvasElement;
  outlineCtx: CanvasRenderingContext2D;

  fontSize: number;

  constructor() {
    this.fontSize = 360;

    this.canvas = document.createElement('canvas');
    this.canvas.height = 1600;
    this.canvas.width = 1600;
    this.canvas.style.display = 'none';
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    this.outlineCanvas = document.createElement('canvas');
    this.outlineCanvas.height = 1600;
    this.outlineCanvas.width = 1600;
    // this.outlineCanvas.style.zIndex = '100'; // TEST ONLY, TO BE REMOVED
    // this.outlineCanvas.style.position = 'absolute'; // TEST ONLY, TO BE REMOVED
    // this.outlineCanvas.style.top = '0'; // TEST ONLY, TO BE REMOVED
    // this.outlineCanvas.style.left = '0'; // TEST ONLY, TO BE REMOVED
    // this.outlineCanvas.style.background = 'rgba(0, 0, 0, 0.5)'; // TEST ONLY, TO BE REMOVED
    this.outlineCtx = this.outlineCanvas.getContext('2d') as CanvasRenderingContext2D;
  }

  public clear() {
    this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.outlineCtx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  public async drawImg(ctx: CanvasRenderingContext2D, src: HTMLImageElement) {
    ctx.drawImage(src, 0, 0, this.canvas.width, this.canvas.height);
  }

  public async maskImage(ctx: CanvasRenderingContext2D, img: HTMLImageElement) {
    ctx.globalCompositeOperation = 'source-in';
    await this.drawImg(ctx, img);
    ctx.globalCompositeOperation = 'source-over'; // reset to default
  }

  public drawPreviewText(text: string) {
    this.ctx.font = `${this.fontSize}px testFont`;
    this.ctx.textAlign = 'center';
    this.ctx.fillText(text, this.canvas.width / 2, this.canvas.height / 2 + 15 + this.fontSize / 4);
  }

  public drawPreviewOutlineText(text: string) {
    this.outlineCtx.font = `${this.fontSize}px testFont`;
    this.outlineCtx.textAlign = 'center';
    this.outlineCtx.lineWidth = 20;
    this.outlineCtx.strokeText(
      text,
      this.canvas.width / 2,
      this.canvas.height / 2 + 15 + this.fontSize / 4,
    );
  }

  public async previewText({ text, material, outline, previewImg }: PreviewText) {
    this.clear();
    // const testPreviewDom = document.getElementById('testPreview'); // TEST ONLY, TO BE REMOVED
    // testPreviewDom?.innerHTML || ((testPreviewDom as unknown as HTMLElement).innerHTML = ''); // TEST ONLY, TO BE REMOVED
    // testPreviewDom?.appendChild(this.outlineCanvas); // TEST ONLY, TO BE REMOVED

    if (outline) {
      this.drawPreviewOutlineText(text);
      await this.maskImage(this.outlineCtx, outline);
    }

    this.drawPreviewText(text);

    if (material) {
      await this.maskImage(this.ctx, material);
    }

    this.outlineCtx.drawImage(this.canvas, 0, 0);
    previewImg.src = this.outlineCanvas.toDataURL();
  }

  public mergeCanvas() {
    this.outlineCtx.drawImage(this.canvas, 0, 0);
  }

  getCanvas() {
    return this.canvas;
  }
  getOutlineCanvas() {
    return this.outlineCanvas;
  }

  getCtx() {
    return this.ctx;
  }
  getOutlineCtx() {
    return this.outlineCtx;
  }
}
