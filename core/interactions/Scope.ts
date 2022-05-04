import { gsap } from 'gsap'
import { Euler, Quaternion } from 'three';
import {
    AbsoluteOrientationSensor,
    RelativeOrientationSensor,
} from "../polyfill/motion-sensor.js";

export default class Scope {
    public sensor: any
    public grafCanvas: HTMLCanvasElement
    public landscape: HTMLElement
    public markers: HTMLElement
    public baseX: number
    public latestX: number
    public normalizePosition: { x: number, y: number }
    public rotation: any
    public size: { width: number; height: number; }
    public clientSizes: { width: number; height: number; } = { height: 1440, width: 780 }
    public mobileSizes: { width: number; height: number; } = { height: window.innerHeight, width: window.innerWidth }

    public debugX: HTMLElement
    public debugY: HTMLElement

    private MAX_Y_ANGLE: number = 50
    private MAX_X_ANGLE: number = 50

    constructor() {

        this.landscape = document.querySelector('.mobileScope-wrapper')
        this.markers = document.querySelector('.display')
        this.debugX = document.querySelector('.mobileScope-debug--x')
        this.debugY = document.querySelector('.mobileScope-debug--y')

        this.latestX = 0



        this.size = {
            width: window.innerWidth,
            height: window.innerHeight,
        }

        this.init()
    }

    init() {
        // this.initSensor()
        this.normalizePosition = { x: 0, y: 0 }
        this.deviceOrientation()
        this.animationLoop()
        this.calibrateYRotation()
    }

    deviceOrientation() {
        window.addEventListener('deviceorientation', (data: Event) => {
            this.handleDeviceOrientation(data)
        }, false)
    }


    // initSensor() {
    //     // TODO : user test, switch with RelativeOrientationSensor + calibration step ?
    //     this.sensor = new AbsoluteOrientationSensor({ frequency: 60, referenceFrame: "device" });

    //     // sensor loop
    //     this.sensor.onreading = () => {
    //         let quarternion = new Quaternion(
    //             this.sensor.quaternion[0],
    //             this.sensor.quaternion[1],
    //             this.sensor.quaternion[2],
    //             this.sensor.quaternion[3]
    //         );
    //         this.rotation = new Euler().setFromQuaternion(quarternion);

    //         // TODO : Step + onboarding steps
    //         this.stepRotate();



    //         // Finally not working well (:
    //         let angleY = (this.latestX = this.rotation.y)

    //         if (this.baseX !== null) {

    //             angleY = angleY - this.baseX
    //             angleY -= 0
    //             angleY %= Math.PI * 2
    //         }

    //         let nY = this.normalize(this.rotation.x, Math.PI / 2, 0);
    //         let nX =  this.normalize(angleY, Math.PI / 6, -Math.PI / 6);


    //         if (nX <= 1 && nX >= 0) {

    //             this.normalizePosition.x = (nX - 0.5) * 2
    //         }

    //         if (nY <= 1 && nY >= 0) {
    //             this.normalizePosition.y = (nY - 0.5) * 2
    //         }

    //         this.moveScope()

    //         this.debugX.innerHTML = angleY.toFixed(2)
    //         this.debugY.innerHTML = this.normalizePosition.x.toFixed(2)
    //         // debugPos.innerHTML = y.toFixed(2) + " : " + x.toFixed(2)
    //     };


    //     this.sensor.onerror = (event: any) => {
    //         if (event.error.name == "NotReadableError") {
    //             console.log("Sensor is not available.");
    //         }
    //     };
    //     this.sensor.start();
    // }

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
    }

    animationLoop() {
        this.moveScope()
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
