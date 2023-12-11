import type { MaterialFragment } from '@graphql/generated/graphql';
import type { Falsey } from 'lodash';
// eslint-disable-next-line
// @ts-ignore
import { NormalMapGenerator } from 'normalmap-online';

export function getMaterialUrl(material: MaterialFragment | undefined): string {
  return material?.attributes?.images?.find((imgMap) => imgMap?.mapType === 'map')?.image.data
    ?.attributes?.formats.large.url;
}

// TODO - Relocate this
interface ImgToNormalMapParams {
  img: HTMLImageElement | HTMLCanvasElement;
  hasPuff?: boolean;
  blur?: number;
}
const normalMapGenerator = NormalMapGenerator.instance();
async function imgToNormalMap({ img, hasPuff, blur }: ImgToNormalMapParams) {
  const blurAmount = hasPuff ? blur || 7 : 1;
  return normalMapGenerator.generateFromImage(img, {
    strength: 0.5,
    blur: blurAmount,
    level: 1,
  });
}

interface PreviewText {
  material: HTMLImageElement | undefined;
  outline: HTMLImageElement | undefined;
  previewImg: HTMLImageElement;
  normalMapPatternImg?: HTMLImageElement | false;
}

export type PatternType = 'crystals' | 'embroidery' | Falsey;

interface CanvasTextConstructor {
  hasPuff: boolean;
  toNormalMap: boolean;
  patternType: PatternType;
  text?: string;
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

  hasPuff: boolean;
  toNormalMap: boolean;
  patternType: PatternType;
  text?: string;

  canvasHeight: number;
  canvasWidth: number;
  fontSize: number;
  outlineWidth: number;

  constructor({ hasPuff, toNormalMap, text, patternType }: CanvasTextConstructor) {
    this.hasPuff = hasPuff;
    this.toNormalMap = toNormalMap;
    this.patternType = patternType;
    this.text = text;

    this.fontSize = 360;
    this.canvasHeight = 400;
    this.canvasWidth = 3200;
    this.outlineWidth = 20;

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

  public drawPreviewText(ctx: CanvasRenderingContext2D) {
    if (!this.text) return;

    ctx.font = `${this.fontSize}px testFont`;
    ctx.textAlign = 'center';
    ctx.fillText(this.text, this.canvas.width / 2, this.canvas.height / 2 + 15 + this.fontSize / 4);
  }

  public drawPreviewOutlineText() {
    if (!this.text) return;

    this.outlineCtx.font = `${this.fontSize}px testFont`;
    this.outlineCtx.textAlign = 'center';
    this.outlineCtx.lineWidth = this.outlineWidth;
    this.outlineCtx.strokeText(
      this.text,
      this.canvas.width / 2,
      this.canvas.height / 2 + 15 + this.fontSize / 4,
    );
  }

  public drawPreviewOutlineOnlyText(ctx: CanvasRenderingContext2D) {
    if (!this.text) return;

    ctx.font = `${this.fontSize}px testFont`;
    ctx.textAlign = 'center';
    ctx.lineWidth = 30;
    ctx.fillStyle = 'green';
    ctx.strokeText(
      this.text,
      this.canvas.width / 2,
      this.canvas.height / 2 + 15 + this.fontSize / 4,
    );
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillText(this.text, this.canvas.width / 2, this.canvas.height / 2 + 15 + this.fontSize / 4);
    ctx.globalCompositeOperation = 'source-over'; // reset to default
  }

  private async drawNormalMap(normalMapPatternImg: HTMLImageElement | Falsey) {
    this.drawPreviewText(this.normalMapTextureCtx);

    if (normalMapPatternImg) {
      const pattern = this.normalMapTextureCtx.createPattern(normalMapPatternImg, 'repeat');

      if (!pattern) return;

      this.normalMapTextureCtx.globalCompositeOperation = 'source-in';
      this.normalMapTextureCtx.rect(0, 0, this.canvasWidth, this.canvasHeight);
      this.normalMapTextureCtx.fillStyle = pattern;
      this.normalMapTextureCtx.fill();
      this.normalMapTextureCtx.globalCompositeOperation = 'source-over';
    }

    console.log('toNormalMap', this.toNormalMap);
    const normalMap = this.toNormalMap
      ? await imgToNormalMap({
          img: this.normalMapTextureCanvas,
          hasPuff: this.hasPuff,
        })
      : this.normalMapTextureCanvas;

    this.normalMapCtx.drawImage(normalMap, 0, 0);
  }

  private async drawOutlineNormalMap(normalMapPatternImg: HTMLImageElement | Falsey) {
    this.drawPreviewOutlineOnlyText(this.normalMapOutlineTextureCtx);

    if (normalMapPatternImg) {
      const pattern = this.normalMapOutlineTextureCtx.createPattern(normalMapPatternImg, 'repeat');

      if (!pattern) return;

      this.normalMapOutlineTextureCtx.globalCompositeOperation = 'source-in';
      this.normalMapOutlineTextureCtx.rect(0, 0, this.canvasWidth, this.canvasHeight);
      if (this.patternType !== 'crystals') {
        this.normalMapOutlineTextureCtx.fillStyle = pattern;
      }
      this.normalMapOutlineTextureCtx.fill();
      this.normalMapOutlineTextureCtx.globalCompositeOperation = 'source-over';
    }

    const normalMap =
      this.toNormalMap || this.patternType === 'crystals'
        ? await imgToNormalMap({
            img: this.normalMapOutlineTextureCanvas,
            hasPuff: this.patternType === 'crystals' ? true : this.hasPuff,
            blur: 4,
          })
        : this.normalMapOutlineTextureCanvas;
    this.normalMapOutlineCtx2.drawImage(normalMap, 0, 0);
  }

  private printTextMapToStrokeMap() {
    this.normalMapCtx.globalCompositeOperation = 'destination-in';
    this.normalMapCtx.drawImage(this.normalMapTextureCanvas, 0, 0);
    this.normalMapCtx.globalCompositeOperation = 'source-over'; // reset to default
    this.normalMapOutlineCtx2.drawImage(this.normalMapCanvas, 0, 0);
  }

  public async previewText({ material, outline, previewImg, normalMapPatternImg }: PreviewText) {
    if (!this.text) return;

    this.clear();
    this.showTestCanvas(this.normalMapTextureCanvas);

    await this.drawNormalMap(normalMapPatternImg);
    await this.drawOutlineNormalMap(normalMapPatternImg);

    this.printTextMapToStrokeMap();

    if (outline) {
      this.drawPreviewOutlineText();
      await this.maskImage(this.outlineCtx, outline);
    }

    this.drawPreviewText(this.ctx);

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
