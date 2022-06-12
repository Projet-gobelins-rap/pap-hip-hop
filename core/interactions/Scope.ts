import { gsap } from 'gsap'
import $socket from "../../plugins/socket.io"

export default class Scope {
    // DOM elements
    public landscape: HTMLElement
    public pointer: HTMLElement
    public markers: Element[]

    public debugX: HTMLElement
    public debugY: HTMLElement

    // properties
    public places: Array<{
        id: number,
        x: number,
        y: number,
        found: boolean,
        isFocus: boolean,
        icon: Element,
        progressTl: gsap.core.Timeline,
        slug: string
    }>
    public pointerTimeline: gsap.core.Timeline
    public size: { width: number; height: number; }
    public mobileSizes: { width: number; height: number; } = { height: window.innerHeight, width: window.innerWidth }

    // const
    private MAX_Y_ANGLE: number = 50
    private MAX_X_ANGLE: number = 20
    private colideRange: number = 0.05
    private landscapeSizes: { width: number; height: number; } = { height: 2320, width: 1294 }
   
    // temporary data
    public baseX: number
    public latestX: number
    public normalizePosition: { x: number, y: number }
    public focusTimeOut: NodeJS.Timeout
    // TODO : create type for "place" object
    public focusTarget: any | null = null

    //callback
    private _onFocusCallback: Function

    constructor(focusCallback: Function) {

        this._onFocusCallback = focusCallback || function ()  {}

        this.landscape = document.querySelector('.mobileScope-wrapper')
        this.pointer = document.querySelector('.mobileScope-pointer')
        this.markers = [...document.querySelectorAll('.mobileScope-marker')]
        this.debugX = document.querySelector('.mobileScope-debug--x')
        this.debugY = document.querySelector('.mobileScope-debug--y')

        this.init()
    }

    init() {
        this.latestX = 0

        this.size = {
            width: window.innerWidth,
            height: window.innerHeight,
        }

        this.pointerTimeline = gsap.timeline()
        this.pointerTimeline.to(this.pointer, {
            scale: 2,
            duration: 0.2
        })
        this.pointerTimeline.pause()

        this.normalizePosition = { x: 0, y: 0.5 }

    }

    start() {
        this.initPlaces()
        this.deviceOrientation()
        this.animationLoop()
        this.calibrateYRotation()
    }

    initPlaces() {
        this.places = [
            {
                id: 1,
                x: -0.05,
                y: -0.02,
                found: false,
                isFocus: true,
                icon: this.markers[1],
                progressTl: this.setProgressTimeline(this.markers[1]),
                slug: "good"
            }, {
                id: 2,
                x: 0.47,
                y: -0.50,
                found: false,
                isFocus: true,
                icon: this.markers[0],
                progressTl: this.setProgressTimeline(this.markers[0]),
                slug: "bad-1"
            }, {
                id: 3,
                x: -1,
                y: 0.40,
                found: false,
                isFocus: true,
                icon: this.markers[2],
                progressTl: this.setProgressTimeline(this.markers[2]),
                slug: "bad-2"
            }
        ]
    }

    setProgressTimeline(marker: Element): gsap.core.Timeline {
        const progressCircle = marker.querySelector('.mobileScope-marker--progress')
        const focusTimeline = gsap.timeline()
        focusTimeline.to(progressCircle, {
            strokeDashoffset: 0,
            duration: 1,
            ease: 'none'
        })
        focusTimeline.pause()
        return focusTimeline
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
            y: -this.normalizePosition.x * (this.landscapeSizes.height - (this.mobileSizes.height * 2.2)),
            x: -this.normalizePosition.y * (this.landscapeSizes.width - (this.mobileSizes.width * 2.2))
        })
    }

    findPlace() {
        for (const key in this.places) {
            const place = this.places[key];

            if (this.normalizePosition.y <= (place.y + this.colideRange) && this.normalizePosition.y > (place.y - this.colideRange)) {
                if (this.normalizePosition.x <= (place.x + this.colideRange) && this.normalizePosition.x > (place.x - this.colideRange)) {

                    if (!this.focusTarget && !this.focusTimeOut && !place.found) {

                        console.log(place.slug);
                        place.progressTl.play()
                        this.pointerTimeline.play()
                        place.isFocus = true

                        this.focusTimeOut = setTimeout(() => {
                            const bg = place.icon.querySelector('.mobileScope-marker--bg')
                            gsap.set(bg, {
                                fill: "#22D175"
                            })
                            $socket.io.emit('scope:focus', place.slug)
                            place.found = true
                            this._onFocusCallback()
                        }, 1000);
                    }
                    this.focusTarget = place
                } else {
                    place.isFocus = false
                    if (this.focusTarget) {
                        this.resetAnim()
                    }
                }
            } else {
                place.isFocus = false
            }
        }
    }

    resetAnim() {
        if (this.focusTarget) {
            this.focusTarget.progressTl.restart()
            this.focusTarget.progressTl.pause()
            this.pointerTimeline.reverse()

            clearTimeout(this.focusTimeOut)
            this.focusTimeOut = null
            this.focusTarget = null
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

        // up/down rotation
        if ((gamma < 0 && gamma >= this.MAX_Y_ANGLE * -1)) {
            y = (100 / this.MAX_Y_ANGLE) * gamma * -1
        } else {
            // Stop rotation at max angle.
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
}
