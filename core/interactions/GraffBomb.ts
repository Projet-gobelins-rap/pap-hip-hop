import $socket from "../../plugins/socket.io"
import Helpers from "../utils/Helpers"
import gsap from "gsap/all"
import Gimbal from "../utils/gimbal"

export default class GraffBomb {
    public baseX: number
    public baseAlpha: number
    public latestX: number
    public latestAlpha: number
    public normalizePosition: { x: number, y: number }
    public rotation: any
    public button: any
    public buttonCalibrate: any
    public buttonPressed: boolean
    public started: boolean
    public gimbal: Gimbal

    public MAX_X_ANGLE: number = 30

    public debugX: HTMLElement
    public debugY: HTMLElement

    constructor() {

        this.button = document.querySelector('.graffBomb-button')
        this.buttonCalibrate = document.querySelector('.graffBomb-button--calibrate')
        this.debugX = document.querySelector('.graffBomb-debug--x')
        this.debugY = document.querySelector('.graffBomb-debug--y')
        this.buttonPressed = false
        this.latestX = 0
        this.latestAlpha = 0
        this.gimbal = new Gimbal();
        this.started = false

        this.rotation = {
            yaw: 0,
            pitch: 0,
            roll: 0
        }

        this.init()
    }

    init() {
        this.normalizePosition = { x: 0, y: 0 }
        // this.getDeviceOrientation()
        this.buttonHandler()
        // this.animationLoop()
    }

    startTicker() {
        this.gimbal.enable();
        gsap.ticker.fps(30);
        gsap.ticker.add(this.getDeviceOrientation.bind(this));
    }

    sendValues() {
      if(this.rotation.yaw >= -0.6 && this.rotation.yaw <= 0.6 && this.rotation.pitch >= -0.6 && this.rotation.pitch <= 0.6) {
        $socket.io.emit('graffValues', 
        Helpers.normalize(this.rotation.yaw, 0.6, -0.6).toFixed(2)
        + ':' + 
        Helpers.normalize(this.rotation.pitch, 0.6, -0.6).toFixed(2)
        + ':' + 
        this.buttonPressed)
      }
    }

    getDeviceOrientation() {
        this.gimbal.update();
        this.rotation = {
            yaw: this.gimbal.yaw,
            pitch: this.gimbal.pitch,
            roll: this.gimbal.roll
        } 
        this.debugX.innerHTML = this.rotation.yaw.toFixed(2) + " : " + this.rotation.pitch.toFixed(2) + " : " + this.rotation.roll.toFixed(2)
        this.sendValues()
    }

    buttonHandler() {
        this.buttonCalibrate.addEventListener('touchstart', () => {
            this.gimbal.recalibrate();
        })
        this.button.addEventListener('touchstart', () => {
            this.baseX = this.latestX
            this.buttonPressed = true
        })
        this.button.addEventListener('touchend', () => {
            this.buttonPressed = false
        })
    }
}
