import type { MaterialFragment } from '@graphql/generated/graphql';
// eslint-disable-next-line
// @ts-ignore
import { NormalMapGenerator } from 'normalmap-online';

export function getMaterialUrl(material: MaterialFragment | undefined): string {
  return material?.attributes?.images?.find((imgMap) => imgMap?.mapType === 'map')?.image.data
    ?.attributes?.formats.large.url;
}

const normalMapGenerator = NormalMapGenerator.instance();
async function imgToNormalMap(img: HTMLImageElement | HTMLCanvasElement) {
  return normalMapGenerator.generateFromImage(img, {
    strength: 0.5,
    blur: 7,
    level: 1,
  });
}

interface PreviewText {
  text: string;
  material: HTMLImageElement | undefined;
  outline: HTMLImageElement | undefined;
  previewImg: HTMLImageElement;
  normalMapPatternImg?: HTMLImageElement;
}

export class CanvasText {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  outlineCanvas: HTMLCanvasElement;
  outlineCtx: CanvasRenderingContext2D;
  normalMapTextureCanvas: HTMLCanvasElement;
  normalMapTextureCtx: CanvasRenderingContext2D;
  normalMapCanvas: HTMLCanvasElement;
  normalMapCtx: CanvasRenderingContext2D;
  normalMapOutlineTextureCanvas: HTMLCanvasElement;
  normalMapOutlineTextureCtx: CanvasRenderingContext2D;
  normalMapOutlineCanvas: HTMLCanvasElement;
  normalMapOutlineCtx2: CanvasRenderingContext2D;

  canvasHeight: number;
  canvasWidth: number;
  fontSize: number;

  constructor() {
    this.fontSize = 360;
    this.canvasHeight = 400;
    this.canvasWidth = 3200;

    this.canvas = document.createElement('canvas');
    this.canvas.height = this.canvasHeight;
    this.canvas.width = this.canvasWidth;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    this.outlineCanvas = document.createElement('canvas');
    this.outlineCanvas.height = this.canvasHeight;
    this.outlineCanvas.width = this.canvasWidth;
    this.outlineCtx = this.outlineCanvas.getContext('2d') as CanvasRenderingContext2D;

    // Normal map section

    this.normalMapTextureCanvas = document.createElement('canvas');
    this.normalMapTextureCanvas.height = this.canvasHeight;
    this.normalMapTextureCanvas.width = this.canvasWidth;
    this.normalMapTextureCtx = this.normalMapTextureCanvas.getContext(
      '2d',
    ) as CanvasRenderingContext2D;

    this.normalMapCanvas = document.createElement('canvas');
    this.normalMapCanvas.height = this.canvasHeight;
    this.normalMapCanvas.width = this.canvasWidth;
    this.normalMapCtx = this.normalMapCanvas.getContext('2d') as CanvasRenderingContext2D;

    this.normalMapOutlineTextureCanvas = document.createElement('canvas');
    this.normalMapOutlineTextureCanvas.height = this.canvasHeight;
    this.normalMapOutlineTextureCanvas.width = this.canvasWidth;
    this.normalMapOutlineTextureCtx = this.normalMapOutlineTextureCanvas.getContext(
      '2d',
    ) as CanvasRenderingContext2D;

    this.normalMapOutlineCanvas = document.createElement('canvas');
    this.normalMapOutlineCanvas.height = this.canvasHeight;
    this.normalMapOutlineCanvas.width = this.canvasWidth;
    this.normalMapOutlineCtx2 = this.normalMapOutlineCanvas.getContext(
      '2d',
    ) as CanvasRenderingContext2D;
  }

  public clear() {
    this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.outlineCtx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  public async drawImg(ctx: CanvasRenderingContext2D, src: HTMLImageElement) {
    ctx.drawImage(src, 0, 0, this.canvas.width, this.canvas.height);
  }

  public showTestCanvas(canvas: HTMLCanvasElement) {
    const testPreviewDom = document.getElementById('testPreview'); // TEST ONLY, TO BE REMOVED
    (testPreviewDom as unknown as HTMLElement).innerHTML = ''; // TEST ONLY, TO BE REMOVED
    // testPreviewDom?.appendChild(canvas); // TEST ONLY, TO BE REMOVED
    // testPreviewDom?.appendChild(this.normalMapCanvas); // TEST ONLY, TO BE REMOVED
    // testPreviewDom?.appendChild(this.normalMapOutlineTextureCanvas); // TEST ONLY, TO BE REMOVED
    // testPreviewDom?.appendChild(this.normalMapOutlineCanvas); // TEST ONLY, TO BE REMOVED
  }

  public async maskImage(ctx: CanvasRenderingContext2D, img: HTMLImageElement) {
    ctx.globalCompositeOperation = 'source-in';
    await this.drawImg(ctx, img);
    ctx.globalCompositeOperation = 'source-over'; // reset to default
  }

  public drawPreviewText(ctx: CanvasRenderingContext2D, text: string) {
    ctx.font = `${this.fontSize}px testFont`;
    ctx.textAlign = 'center';
    ctx.fillText(text, this.canvas.width / 2, this.canvas.height / 2 + 15 + this.fontSize / 4);
  }

  public drawPreviewOutlineText(text: string) {
    this.outlineCtx.font = `${this.fontSize}px testFont`;
    this.outlineCtx.textAlign = 'center';
    this.outlineCtx.lineWidth = 30;
    this.outlineCtx.strokeText(
      text,
      this.canvas.width / 2,
      this.canvas.height / 2 + 15 + this.fontSize / 4,
    );
  }

  public drawPreviewOutlineOnlyText(ctx: CanvasRenderingContext2D, text: string) {
    ctx.font = `${this.fontSize}px testFont`;
    ctx.textAlign = 'center';
    ctx.lineWidth = 30;
    ctx.fillStyle = 'green';
    ctx.strokeText(text, this.canvas.width / 2, this.canvas.height / 2 + 15 + this.fontSize / 4);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillText(text, this.canvas.width / 2, this.canvas.height / 2 + 15 + this.fontSize / 4);
    ctx.globalCompositeOperation = 'source-over'; // reset to default
  }

  private async drawNormalMap(text: string, normalMapPatternImg: HTMLImageElement | undefined) {
    if (!normalMapPatternImg) return;
    this.drawPreviewText(this.normalMapTextureCtx, text);
    const pattern = this.normalMapTextureCtx.createPattern(normalMapPatternImg, 'repeat');

    if (!pattern) return;

    this.normalMapTextureCtx.globalCompositeOperation = 'source-in';
    this.normalMapTextureCtx.rect(0, 0, this.canvasWidth, this.canvasHeight);
    this.normalMapTextureCtx.fillStyle = pattern;
    this.normalMapTextureCtx.fill();
    this.normalMapTextureCtx.globalCompositeOperation = 'source-over';

    const normalMap = await imgToNormalMap(this.normalMapTextureCanvas);
    this.normalMapCtx.drawImage(normalMap, 0, 0);
  }

  private async drawOutlineNormalMap(
    text: string,
    normalMapPatternImg: HTMLImageElement | undefined,
  ) {
    if (!normalMapPatternImg) return;
    this.drawPreviewOutlineOnlyText(this.normalMapOutlineTextureCtx, text);

    const pattern = this.normalMapOutlineTextureCtx.createPattern(normalMapPatternImg, 'repeat');

    if (!pattern) return;

    this.normalMapOutlineTextureCtx.globalCompositeOperation = 'source-in';
    this.normalMapOutlineTextureCtx.rect(0, 0, this.canvasWidth, this.canvasHeight);
    this.normalMapOutlineTextureCtx.fillStyle = pattern;
    this.normalMapOutlineTextureCtx.fill();
    this.normalMapOutlineTextureCtx.globalCompositeOperation = 'source-over';

    const normalMap = await imgToNormalMap(this.normalMapOutlineTextureCanvas);
    this.normalMapOutlineCtx2.drawImage(normalMap, 0, 0);
  }

  private printTextMapToStrokeMap() {
    this.normalMapCtx.globalCompositeOperation = 'destination-in';
    this.normalMapCtx.drawImage(this.normalMapTextureCanvas, 0, 0);
    this.normalMapCtx.globalCompositeOperation = 'source-over'; // reset to default
    this.normalMapOutlineCtx2.drawImage(this.normalMapCanvas, 0, 0);
  }

  public async previewText({
    text,
    material,
    outline,
    previewImg,
    normalMapPatternImg,
  }: PreviewText) {
    this.clear();
    this.showTestCanvas(this.normalMapTextureCanvas);

    // Map should have a flag
    await this.drawNormalMap(text, normalMapPatternImg);

    // outline map should have a flag
    await this.drawOutlineNormalMap(text, normalMapPatternImg);

    this.printTextMapToStrokeMap();

    if (outline) {
      this.drawPreviewOutlineText(text);
      await this.maskImage(this.outlineCtx, outline);
    }

    this.drawPreviewText(this.ctx, text);

    if (material) {
      await this.maskImage(this.ctx, material);
    }

    this.outlineCtx.drawImage(this.canvas, 0, 0);
    previewImg.src = this.outlineCanvas.toDataURL();
  }

  public mergeCanvas() {
    this.outlineCtx.drawImage(this.canvas, 0, 0);
  }

  getOutlineCanvas() {
    return this.outlineCanvas;
  }
  getNormalMapTextureCanvas() {
    return this.normalMapTextureCanvas;
  }
  getNormalMapOutlineCanvas() {
    return this.normalMapOutlineCanvas;
  }
}
