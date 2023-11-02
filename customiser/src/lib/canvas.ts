import type { MaterialFragment } from '@graphql/generated/graphql';

// TO IMPROVE? - Make this a reusable function if needed
async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export class Canvas2d {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  public clear(){
    this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public async drawImage(src: string){
    const baseImage = await loadImage(src);
    this.ctx?.drawImage(baseImage, 0, 0, this.canvas.width, this.canvas.height);
  }

  public async drawMaterialImg(material: MaterialFragment | undefined) {
    const materialImgSrc = material
      ?.attributes
      ?.images
      ?.find(imgMap => imgMap?.mapType === 'map')
      ?.image
      .data
      ?.attributes
      ?.formats
      .large
      .url;

    await this.drawImage(materialImgSrc);
  }

  public async maskMaterialImg(material: MaterialFragment | undefined) {
    this.ctx.globalCompositeOperation = 'source-in';
    await this.drawMaterialImg(material);
    this.ctx.globalCompositeOperation = 'source-over'; // reset to default
  }

  public drawPreviewText(text: string) {
    this.ctx.font = '45px testFont';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(text, this.canvas.width/2, this.canvas.height/2);
  }

  public drawPreviewOutlineText(text: string) {
    this.ctx.font = '45px testFont';
    this.ctx.textAlign = 'center';
    this.ctx.lineWidth = 4;
    this.ctx.strokeText(text, this.canvas.width/2, this.canvas.height/2);
  }

  getCanvas(){
    return this.canvas;
  }
  getCtx(){
    return this.ctx;
  }
}