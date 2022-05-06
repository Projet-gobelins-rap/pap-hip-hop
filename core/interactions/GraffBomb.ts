import $socket from "../../plugins/socket.io"
import Helpers from "../utils/Helpers"

export default class GraffBomb {
    public baseX: number
    public latestX: number
    public normalizePosition: { x: number, y: number }
    public rotation: any
    public button: any
    public buttonPressed: boolean

    public debugX: HTMLElement
    public debugY: HTMLElement

    constructor() {

        this.button = document.querySelector('.graffBomb-button')
        this.debugX = document.querySelector('.graffBomb-debug--x')
        this.debugY = document.querySelector('.graffBomb-debug--y')
        this.buttonPressed = false
        this.latestX = 0

        this.init()
    }

    init() {
        this.normalizePosition = { x: 0, y: 0 }
        this.deviceOrientation()
        this.buttonHandler()
        this.animationLoop()
    }

    deviceOrientation() {
        window.addEventListener('deviceorientation', (data: Event) => {
            this.handleDeviceOrientation(data)
        }, false)
    }

    sendValues() {
        $socket.io.emit('graffValues', this.normalizePosition.x + ':' + this.normalizePosition.y)
    }

    handleDeviceOrientation(data) {
        let x,
            y,
            beta = data.beta,
            gamma = (this.latestX = data.gamma)

        if (this.baseX !== null) {
            gamma = gamma - this.baseX
            gamma += 0
            gamma %= 180
        }

        x = Helpers.normalize(gamma, 30, -30);
        y = Helpers.normalize(beta, 90, 50);

        if (x <= 1 && x >= 0) {
            this.normalizePosition.x = x * -1 + 1
        }
        if (y <= 1 && y >= 0) {
            this.normalizePosition.y = y * -1 + 1
        }

        this.debugX.innerHTML = this.normalizePosition.x.toFixed(2)
        this.debugY.innerHTML = this.normalizePosition.y.toFixed(2)
    }

    animationLoop() {
        if (this.buttonPressed) {
            this.sendValues()
        }
        requestAnimationFrame(this.animationLoop.bind(this))
    }

    buttonHandler() {
        this.button.addEventListener('touchstart', () => {
            this.baseX = this.latestX
            this.buttonPressed = true
        })
        this.button.addEventListener('touchend', () => {
            this.buttonPressed = false
        })
    }
}
