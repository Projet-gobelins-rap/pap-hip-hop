import { gsap } from 'gsap'
import $socket from "../../plugins/socket.io"

export default class Scope {
    public sensor: any
    public grafCanvas: HTMLCanvasElement
    public landscape: HTMLElement
    public markers: any
    public baseX: number
    public latestX: number
    public normalizePosition: { x: number, y: number }
    public rotation: any
    public size: { width: number; height: number; }
    public clientSizes: { width: number; height: number; } = { height: 1440, width: 780 }
    public mobileSizes: { width: number; height: number; } = { height: window.innerHeight, width: window.innerWidth }
    public places: any
    public debugX: HTMLElement
    public debugY: HTMLElement
    public focusTimeOut: any
    public focusTarget: boolean = false
    public focusTimeline: any 

    private MAX_Y_ANGLE: number = 50
    private MAX_X_ANGLE: number = 50
    private colideRange: number = 0.05

    constructor() {

        this.landscape = document.querySelector('.mobileScope-wrapper')
        this.markers = [...document.querySelectorAll('.mobileScope-marker')]
        this.debugX = document.querySelector('.mobileScope-debug--x')
        this.debugY = document.querySelector('.mobileScope-debug--y')

        this.latestX = 0

        this.size = {
            width: window.innerWidth,
            height: window.innerHeight,
        }

        this.focusTimeline = gsap.timeline()
        this.focusTimeline.to('.mobileScope-progress--bar', {
            width: '100%',
            duration: 1,
            ease: 'none'
        })
        this.focusTimeline.pause()
        
        this.init()
    }

    init() {
        // this.initSensor()
        this.normalizePosition = { x: 0, y: 0 }
        this.initPlaces()
        this.deviceOrientation()
        this.animationLoop()
        this.calibrateYRotation()
    }

    initPlaces() {
        this.places = [
            {
                id: 1,
                x: 0.07,
                y: 0.07,
                found: false,
                icon: this.markers[1],
                slug: "good"
            }, {
                id: 2,
                x: -0.85,
                y: 0.40,
                found: false,
                icon: this.markers[0],
                slug: "bad-1"
            }, {
                id: 3,
                x: 0.60,
                y: 0.55,
                found: false,
                icon: this.markers[2],
                slug: "bad-2"
            }
        ]
    }

    deviceOrientation() {
        window.addEventListener('deviceorientation', (data: Event) => {
            this.handleDeviceOrientation(data)
        }, false)
    }

    calibrateYRotation() {
        document.addEventListener('click', e => {
            this.baseX = this.latestX
            console.log(this.latestX);

        })
    }

    moveScope() {
        gsap.set(this.landscape, {
            y: -this.normalizePosition.x * (this.clientSizes.width / 2),
            x: -this.normalizePosition.y * (this.clientSizes.height / 2 - this.mobileSizes.width)
        })
    }

    findPlace() {
        for (const key in this.places) {
            const place = this.places[key];

            if (this.normalizePosition.y <= (place.y + this.colideRange) && this.normalizePosition.y > (place.y - this.colideRange)) {
                if (this.normalizePosition.x <= (place.x + this.colideRange) && this.normalizePosition.x > (place.x - this.colideRange)) {
                    if (!this.focusTarget && !this.focusTimeOut) {
                        this.focusTimeline.play()

                        this.focusTimeOut = setTimeout(() => {
                            console.log('2');

                            gsap.set(place.icon, {
                                fill: "#00ff00"
                            })
                            if (!place.found) {
                                $socket.io.emit('scope-focus', place.slug)
                            }
                            place.found = true
                            
                        }, 1000);
                    }
                    this.focusTarget = true
                } else {
                    if (this.focusTarget) {
                        this.focusTimeline.restart()
                        this.focusTimeline.pause()
                        clearTimeout(this.focusTimeOut)
                        this.focusTimeOut = null

                        this.focusTarget = false
                    }
                }
            }
        }
    }

    handleDeviceOrientation(data) {
        let x,
            y,
            alpha = (this.latestX = data.alpha),
            beta = data.beta,
            gamma = data.gamma

        if (this.baseX !== null) {

            alpha = alpha - this.baseX
            alpha += 360
            alpha %= 360
        }

        // Left/right rotation.
        if (alpha > 360 - this.MAX_X_ANGLE) {
            // phone is rotating right:
            x = (100 / this.MAX_X_ANGLE) * (360 - alpha)
        } else if (alpha < this.MAX_X_ANGLE) {
            // phone is rotating left:
            x = (100 / this.MAX_X_ANGLE) * (0 - alpha)
        } else {

            // Stop rotation at max angle.
            if (alpha > this.MAX_X_ANGLE && alpha < 180) {
                x = -100
            } else {
                x = 100
            }
        }

        // gamma += orientationCorrections.gamma

        // gamma += 180
        // gamma %= 180

        if ((gamma < 0 && gamma >= this.MAX_Y_ANGLE * -1)) {
            y = (100 / this.MAX_Y_ANGLE) * gamma * -1
        } else {
            if (gamma < -this.MAX_Y_ANGLE) {
                y = 100
            } else {
                y = 0
            }
        }

        this.normalizePosition.x = x * 0.01
        this.normalizePosition.y = (y * 0.01 - 0.5) * 2


        this.debugX.innerHTML = this.normalizePosition.x.toFixed(2)
        this.debugY.innerHTML = this.normalizePosition.y.toFixed(2)
    }

    animationLoop() {
        this.moveScope()
        this.findPlace()
        requestAnimationFrame(this.animationLoop.bind(this))
    }

    // setRatio() {
    //     gsap.set(this.landscape, {
    //         width: this.clientSizes.width * 2,
    //         height: this.clientSizes.height * 2,
    //     })
    // }

    stepRotate() {
        if (
            (this.rotation.z >= Math.PI / 2 && this.rotation.z < Math.PI) ||
            (this.rotation.z <= -Math.PI / 2 && this.rotation.z > -Math.PI)
        ) {
            //   console.log("Tel rotate : Vamos !");
        }
    }

    normalize(val: number, max: number, min: number): number {
        return (val - min) / (max - min);
    }
}