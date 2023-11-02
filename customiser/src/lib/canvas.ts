import type { MaterialFragment } from '@graphql/generated/graphql';

// TO IMPROVE? - Make this a reusable function if needed
async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function getMaterialUrl(material: MaterialFragment | undefined): string {
  return material?.attributes?.images?.find((imgMap) => imgMap?.mapType === 'map')?.image.data
    ?.attributes?.formats.large.url;
}

interface PreviewText {
  text: string;
  material: MaterialFragment | undefined;
  outline: MaterialFragment | undefined;
}

export class CanvasText {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  outlineCanvas: HTMLCanvasElement;
  outlineCtx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement, outlineCanvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.outlineCanvas = outlineCanvas;
    this.outlineCtx = this.outlineCanvas.getContext('2d') as CanvasRenderingContext2D;
  }

  public clear() {
    this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.outlineCtx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  public async drawImg(ctx: CanvasRenderingContext2D, src: string) {
    const baseImage = await loadImage(src);
    ctx.drawImage(baseImage, 0, 0, this.canvas.width, this.canvas.height);
  }

  public async maskImage(ctx: CanvasRenderingContext2D, material: MaterialFragment | undefined) {
    const src = getMaterialUrl(material);
    ctx.globalCompositeOperation = 'source-in';
    await this.drawImg(ctx, src);
    ctx.globalCompositeOperation = 'source-over'; // reset to default
  }

  public drawPreviewText(text: string) {
    this.ctx.font = '45px testFont';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(text, this.canvas.width / 2, this.canvas.height / 2);
  }

  public drawPreviewOutlineText(text: string) {
    this.outlineCtx.font = '45px testFont';
    this.outlineCtx.textAlign = 'center';
    this.outlineCtx.lineWidth = 4;
    this.outlineCtx.strokeText(text, this.canvas.width / 2, this.canvas.height / 2);
  }

  public async previewText({ text, material, outline }: PreviewText) {
    this.clear();

    if (outline) {
      this.drawPreviewOutlineText(text);
      await this.maskImage(this.outlineCtx, outline);
    }

    this.drawPreviewText(text);

    if (material) {
      await this.maskImage(this.ctx, material);
    }

    this.outlineCtx.drawImage(this.canvas, 0, 0);
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
