import { gsap } from 'gsap'
import $socket from "../../plugins/socket.io"
import Helpers from '../utils/Helpers'

export default class Graf {

  public grafCanvas: HTMLCanvasElement
  public ctx: CanvasRenderingContext2D
  public display: Element
  public cursor: Element
  public img: HTMLImageElement
  public revealImg: HTMLImageElement
  private size: {
    width: number
    height: number
  }
  public erasedPercentage: number
  public position: {
    x: number,
    y: number,
  }
  public lastPosition: {
    x: number,
    y: number,
  }

  public radius: number
  public imgUrl: string
  public canvasUpdated: boolean
  public isPushed: boolean
  public gridBlocks: any[]
  public dirtyBlocks: any[]
  public layers: any[]

  public layerCount: number = 0

  private _onStepChangeCallback: Function

  constructor(layerList: any, stepChangeCallback: Function) {

    this.display = document.querySelector('.graffDraw-display')!
    this.grafCanvas = document.querySelector('.graffDraw-canvas')!
    this.cursor = document.querySelector('.graffDraw-cursor')!
    this.layers = layerList

    this.imgUrl = this.layers[0].layer.url
    this.img = new Image()
    this.img.src = this.imgUrl
    this.img.crossOrigin = "Anonymous";

    this.ctx = this.grafCanvas.getContext('2d')!
    this.revealImg = document.querySelector('.graffDraw-img')!

    this.erasedPercentage = 0
    this.canvasUpdated = false

    this.radius = 50
    this.size = {
      width: this.grafCanvas.offsetWidth,
      height: this.grafCanvas.offsetHeight,
    }

    this.position = {
      x: 0,
      y: 0,
    }
    this.lastPosition = {
      x: 0,
      y: 0,
    }

    this._onStepChangeCallback = stepChangeCallback || function () {
    }

    this.init()
  }

  init() {
    this.ctx = this.grafCanvas.getContext("2d")!
    this.grafCanvas.width = this.size.width
    this.grafCanvas.height = this.size.height
    this.setupCanvas()
    this.bindEvents()
    this.nextLayer()
    this._onStepChangeCallback('start')
    // this.renderLoop()

    gsap.ticker.fps(30);
    gsap.ticker.add(this.renderLoop.bind(this));
  }

  setupCanvas() {
    let self = this
    this.img.onload = () => {
      
      this.drawImageProp(this.ctx, self.img, 0, 0, this.grafCanvas.width, self.size.height / 2, 0, 0)
      self.ctx.globalCompositeOperation = "destination-out";
    }
  }

  bindEvents() {
    $socket.io.on('graffValues', data => {
      let params = data.split(":")
      this.isPushed = (params[2] === 'true')

      this.position = {
        x: parseFloat(params[0]) * window.innerWidth,
        y: parseFloat(params[1]) * window.innerHeight,
      }
    })
  }

  erase() {
    if (this.erasedPercentage <= 90) {
      this.ctx.beginPath();
      let nPos = {
        x: Helpers.mapRange(
          this.position.x,
          (window.innerWidth - this.size.width) / 2,
          window.innerWidth - (this.size.width / 2),
          0,
          window.innerWidth,
        ) / 2,
        y: Helpers.mapRange(
          this.position.y,
          (window.innerHeight - this.size.height) / 2,
          window.innerHeight - (this.size.height / 2),
          0,
          window.innerHeight,
        ) / 2,
      }
      this.ctx.arc(nPos.x, nPos.y, this.radius, 0, 2 * Math.PI);
      this.ctx.closePath();
      this.ctx.fill();
    }
    else {
      if (!this.canvasUpdated) {
        this.displayFinalGraf()
      }
    }

    this.getErasedPercent()
  }

  displayFinalGraf() {
    // gsap.to(this.grafImg, { opacity: 1 })
  }

  layerEnded() {
    if (this.layerCount < this.layers.length - 2) {
      this._onStepChangeCallback('nextLayer')
    } else {
      this._onStepChangeCallback('finish')
    }
  }

  nextLayer() {
    this.canvasUpdated = true
    this.revealImg.src = this.layers[this.layerCount + 1].layer.url
    this.imgUrl = this.layers[this.layerCount].layer.url
    this.img.src = this.imgUrl
    gsap.to(this.revealImg, {
      opacity: 1
    })

    this.layerCount++
    this.updateCanvasBackground()
  }

  updateCanvasBackground() {
  
    let self = this
    // gsap.to(this.revealImg, { opacity: 0 })

    this.img.onload = () => {
      this.ctx.globalCompositeOperation = "source-over";
      this.drawImageProp(this.ctx, self.img, 0, 0, self.size.width, self.size.height, 0, 0)
      // self.ctx.drawImage(self.img, 0, 0, self.size.width, self.size.height);
      self.ctx.globalCompositeOperation = "destination-out";
    }
    this.erasedPercentage = 0
  }

  getErasedPercent() {
    const imgData = this.ctx.getImageData(0, 0, this.size.width, this.size.height)
 
    const pixelCount = this.size.width * this.size.height;
    const arrayElemsCount = pixelCount * 4; // for components (rgba) per pixel.
    const dataArray = imgData.data;
    // 0 is completely transparent, set to 0.5 to
    // allow for instance semi transparent pixels to be accounted for
    let threshold = 0;
    let transparentPixelCount = 0;
    // remember fourth (index = 3) byte is alpha
    for (let i = 3; i < arrayElemsCount; i += 4) {
      let alphaValue = dataArray[i];
      if (alphaValue <= threshold) {
        transparentPixelCount++;
      }
    }
    this.erasedPercentage = Math.floor((transparentPixelCount / pixelCount) * 100);

    this.display.innerText = this.erasedPercentage.toString()

    if (this.erasedPercentage > 62) {
      this.layerEnded()
    }
  }

  drawImageProp(ctx: any, img: any, x: number, y: number, w: number, h: number, offsetX: number, offsetY: number) {

    if (arguments.length === 2) {
      x = y = 0;
      w = ctx.canvas.width;
      h = ctx.canvas.height;
    }

    // default offset is center
    offsetX = typeof offsetX === "number" ? offsetX : 0.5;
    offsetY = typeof offsetY === "number" ? offsetY : 0.5;

    // keep bounds [0.0, 1.0]
    if (offsetX < 0) offsetX = 0;
    if (offsetY < 0) offsetY = 0;
    if (offsetX > 1) offsetX = 1;
    if (offsetY > 1) offsetY = 1;

    let iw = img.width,
      ih = img.height,
      r = Math.min(w / iw, h / ih),
      nw = iw * r,   // new prop. width
      nh = ih * r,   // new prop. height
      cx, cy, cw, ch, ar = 1;

    // decide which gap to fill
    if (nw < w) ar = w / nw;
    if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
    nw *= ar;
    nh *= ar;

    // calc source rectangle
    cw = iw / (nw / w);
    ch = ih / (nh / h);

    cx = (iw - cw) * offsetX;
    cy = (ih - ch) * offsetY;

    // make sure source rectangle is valid
    if (cx < 0) cx = 0;
    if (cy < 0) cy = 0;
    if (cw > iw) cw = iw;
    if (ch > ih) ch = ih;

    // fill image in dest. rectangle
    ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
  }

  renderLoop() {

    gsap.set(this.cursor, {
      x: Helpers.lerp(this.position.x, this.lastPosition.x, 0.5),
      y: Helpers.lerp(this.position.y, this.lastPosition.y, 0.5),
    })
    this.lastPosition = this.position

    if (this.isPushed) {
      this.erase()
    }
  }
}
