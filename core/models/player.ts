import { Character } from "./character";
import { A, D, DIRECTIONS, S, W } from '../utils/KeyDisplay'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Camera, Mesh, Object3D, Quaternion, Raycaster, Vector3 } from "three";

import * as outfitsData from '../../data/outfitsData.json';
import Helpers from "../utils/Helpers";
import { getTextureColorSpec } from "../config/global/textureColorMapping";

export class Player extends Character {

    // properties
    colliders: Mesh[]
    orbitControl: OrbitControls
    camera: Camera

    // state
    toggleRun: boolean = false
    emote: boolean = false
    currentAction: string
    raycaster: Raycaster

    // temporary data
    walkDirection = new Vector3()
    camDirection = new Vector3()
    rotateAngle = new Vector3(0, 1, 0)
    rotateQuarternion: Quaternion = new Quaternion()
    cameraTarget = new Vector3()
    blocked: Boolean = false
    walkTimeOut: number = 0
    _keysPressed: Object

    // constants
    fadeDuration: number = 0.2
    runVelocity = 22
    walkVelocity = 6

    constructor(playerGltf: Object3D, name: string, currentAction: string, camera: Camera, control: OrbitControls) {
        super(playerGltf, name, currentAction)

        this.camera = camera
        this.orbitControl = control
    }

    public setParamsByName() {
        // super.setParamsByName()
        this.outfitParams = outfitsData.player

        Helpers.traverse(this.outfitParams, (key, value) => {
            if (typeof value == "object") {
                if (value.color) value.colorMap = getTextureColorSpec(value.color)
            }
        })

        this.loadOutfit()
    }

    public updateControls(delta: number, keysPressed: any) {
        this._keysPressed = keysPressed
        this._keypressedHandler()
        super.update(delta)
        this._displacements(delta)
    }

    private _keypressedHandler() {
        const directionPressed = DIRECTIONS.some(key => this._keysPressed[key] == true)

        // TODO : actions handle
        if (directionPressed && this.toggleRun) {
            this.animationPlayed = 'run'
        } else if (directionPressed) {
            this.animationPlayed = 'walk'
        } else if (this.emote) {
            this.animationPlayed = 'tpose'
        } else {
            this.animationPlayed = 'idle'
        }
    }

    private _displacements(delta) {

        if (this.currentAction == 'run' || this.currentAction == 'walk') {
            this.walkTimeOut += delta
            
            // calculate towards camera direction
            var direction = this._directionOffset()

            this.model.getWorldDirection(this.walkDirection);
            this.camera.getWorldDirection(this.camDirection);
            this.walkDirection.y = 0
            this.walkDirection.normalize()
            this.walkDirection.negate()

            // run/walk velocity
            const velocity = this.currentAction == 'run' ? this.runVelocity : this.walkVelocity

            this.model.rotation.y -= direction.orientation * delta * 5

            this.model.translateZ(direction.move * delta * velocity)

            this.orbitControl.enableRotate = false
            this._updateCameraPosition()
            if (this.walkTimeOut > 1.5 && !this.toggleRun) {
                this.toggleRun = true
            }
        } else {
            this.orbitControl.enableRotate = true
            this.walkTimeOut = 0
            this.toggleRun = false
        }

        this._updateCameraTarget()
    }

    private _updateCameraPosition() {
        this.camera.position.x = Helpers.lerp(this.camera.position.x, this.model.position.x - Math.sin(this.model.rotation.y) * 25, 0.06)
        this.camera.position.z = Helpers.lerp(this.camera.position.z, this.model.position.z - Math.cos(this.model.rotation.y) * 25, 0.06)
        this.camera.position.y = Helpers.lerp(this.camera.position.y, 15, 0.03)
    }

    private _updateCameraTarget() {
        // update camera target
        this.cameraTarget.x = this.model.position.x
        this.cameraTarget.y = this.model.position.y + 1
        this.cameraTarget.z = this.model.position.z
        this.orbitControl.target = this.cameraTarget
    }

    private _directionOffset() {
        var direction = {
            move: 0,
            orientation: 0
        }

        if (this._keysPressed[W]) {
            direction.move = 1

            if (this._keysPressed[A]) {
                direction.orientation = -Math.PI / 4 // w+a
            } else if (this._keysPressed[D]) {
                direction.orientation =  Math.PI / 4 // w+d
            }
        } else if (this._keysPressed[S]) {
            direction.move = -1

            if (this._keysPressed[A]) {
                direction.orientation = -Math.PI / 4 + Math.PI / 2 // s+a
            } else if (this._keysPressed[D]) {
                direction.orientation = Math.PI / 4 - Math.PI / 2 // s+d
            }
        } else if (this._keysPressed[A]) {
            direction.orientation = -Math.PI / 4 // a
        } else if (this._keysPressed[D]) {
            direction.orientation = Math.PI / 4 // d
        }
        return direction
    }
}