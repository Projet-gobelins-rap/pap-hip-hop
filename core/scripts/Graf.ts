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
      self.ctx.drawImage(self.img, 0, 0, self.size.width, self.size.height);
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
    this.grafCanvas.style.background = "url('/images/wall-2.png')"
    this.imgUrl = '/images/sky.jpeg'
    this.img.src = this.imgUrl
    let self = this
    gsap.to(this.grafImg,{opacity:0})
    this.img.onload = () => {
      this.ctx.globalCompositeOperation = "source-over";
      self.ctx.drawImage(self.img, 0, 0, self.size.width, self.size.height);
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

  resize() {

  }
}
