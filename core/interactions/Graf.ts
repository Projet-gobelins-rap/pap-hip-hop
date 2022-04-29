import {gsap} from 'gsap'
export default class Graf {

  public grafCanvas:HTMLCanvasElement
  public ctx:CanvasRenderingContext2D
  public display:HTMLElement
  public img:HTMLImageElement
  public grafImg:HTMLImageElement
  public resetStepBtn:HTMLElement
  private size: {
    width:number
    height:number
  }
  public erasedPercentage:number

  public radius:number
  public imgUrl:string
  public canvasUpdated:boolean
  public gridBlocks:any[]
  public dirtyBlocks:any[]

  constructor() {

    this.display = document.querySelector('.display')!
    this.grafCanvas = document.querySelector('.canvas-graf')!
    this.imgUrl = '/images/wall-0.png'
    this.ctx = this.grafCanvas.getContext('2d')!
    this.grafImg = document.querySelector('.grafImg')!
    this.resetStepBtn = document.querySelector('.canvas-reset')!
    this.img = new Image()
    this.erasedPercentage = 0
    this.canvasUpdated = false
    this.img.src = this.imgUrl
    this.radius = 50
    this.size = {
      width: window.innerWidth,
      height: window.innerHeight,
    }

    this.init()
  }

  init() {
    this.ctx = this.grafCanvas.getContext("2d")!
    this.grafCanvas.width = this.size.width
    this.grafCanvas.height = this.size.height
    this.setupCanvas()
    this.bindEvents()

  }

  setupCanvas() {
    let self = this
    this.img.onload = () => {
      // self.ctx.drawImage(self.img, 0, 0, self.size.width, self.size.height);

      this.drawImageProp(this.ctx,self.img,0,0, self.size.width, self.size.height,0,0)
      self.ctx.globalCompositeOperation = "destination-out";
    }
  }

  bindEvents() {
    this.grafCanvas.addEventListener('mousemove', (evt) => {
      this.erase(evt)
    })
    this.resetStepBtn.addEventListener('click',()=>{
      this.updateCanvasBackground()
    })

  }

  erase(pos: MouseEvent) {

    if (this.erasedPercentage <=90){
      this.ctx.beginPath();
      this.ctx.arc(pos.x, pos.y, this.radius, 0, 2 * Math.PI);
      this.ctx.closePath();
      this.ctx.fill();
    }
    else {
      if (!this.canvasUpdated){
        this.displayFinalGraf()
      }
    }

    this.getErasedPercent()
  }

  displayFinalGraf() {
    gsap.to(this.grafImg,{opacity:1})
  }

  updateCanvasBackground() {
    this.canvasUpdated = true
    this.grafCanvas.style.backgroundImage = "url('/images/wall-2.png')"
    this.imgUrl = '/images/wall-1.png'
    this.img.src = this.imgUrl
    let self = this
    gsap.to(this.grafImg,{opacity:0})
    this.img.onload = () => {
      this.ctx.globalCompositeOperation = "source-over";
      this.drawImageProp(this.ctx,self.img,0,0, self.size.width, self.size.height,0,0)
      // self.ctx.drawImage(self.img, 0, 0, self.size.width, self.size.height);
      self.ctx.globalCompositeOperation = "destination-out";
    }
    this.erasedPercentage = 0
  }

  getErasedPercent() {
    const imgData = this.ctx.getImageData(0,0,this.size.width,this.size.height)
    // console.log(imgData)
    const pixelCount = this.size.width * this.size.height;
    const arrayElemsCount = pixelCount * 4; // for components (rgba) per pixel.
    const dataArray = imgData.data;
    // 0 is completely transparent, set to 0.5 to
    // allow for instance semi transparent pixels to be accounted for
    let threshold = 0;
    let transparentPixelCount = 0;
    // remember fourth (index = 3) byte is alpha
    for (let i = 3; i < arrayElemsCount; i+= 4) {
      let alphaValue = dataArray[i];
      if (alphaValue <= threshold) {
        transparentPixelCount++;
      }
    }
    this.erasedPercentage = Math.floor( (transparentPixelCount / pixelCount) * 100);

    this.display.innerText = this.erasedPercentage.toString()

  }

  drawImageProp(ctx:any, img:any, x:number, y:number, w:number, h:number, offsetX:number, offsetY:number) {

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
    ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
  }



  resize() {

  }
}
