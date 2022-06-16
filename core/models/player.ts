import { Character } from "./character";
import { A, D, DIRECTIONS, W } from '../utils/KeyDisplay'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Camera, Mesh, Object3D, Quaternion, Raycaster, Vector3 } from "three";

import * as outfitsData from '../../data/outfitsData.json';
import Helpers from "../utils/Helpers";
import { getTextureColorSpec } from "../config/global/textureColorMapping";

export class Player extends Character {

    // properties
    // colliders: {env: Mesh[], collectibles: Mesh[]}
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
    runVelocity = 18
    // runVelocity = 30
    walkVelocity = 6

    constructor(playerGltf: Object3D, name: string, currentAction: string, camera: Camera, control: OrbitControls) {
        super(playerGltf, name, currentAction)

        this.camera = camera
        this.orbitControl = control
        this._initRaycast()
        this._initCameraPosition()
    }

    // overide parent methode
    public setParamsByName(): void {
        this.outfitParams = outfitsData.player

        Helpers.traverse(this.outfitParams, (key, value) => {
            if (typeof value == "object") {
                if (value.color) value.colorMap = getTextureColorSpec(value.color)
            }
        })

        this.loadOutfit()
    }

    private _initRaycast(): void {
        // init raycast from player to forwards
        this.raycaster = new Raycaster(
            new Vector3().copy(this.model.position),
            this.walkDirection.negate()
        )
    }

    // animation loop
    public updateControls(delta: number, keysPressed: any): void {
        this._keysPressed = keysPressed
        this._keypressedHandler()
        super.update(delta)
        this._displacements(delta)
    }

    private _keypressedHandler(): void {
        const directionPressed = DIRECTIONS.some(key => this._keysPressed[key] == true)

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

    private _displacements(delta): void {

        if (this.currentAction == 'run' || this.currentAction == 'walk') {
            this.walkTimeOut += delta

            // calculate towards camera direction
            var direction = this._directionOffset()

            // get model and camera world direction to define walk direction and camera direction vectors 3
            this.model.getWorldDirection(this.walkDirection);
            this.camera.getWorldDirection(this.camDirection);
            this.walkDirection.y = 0
            this.walkDirection.normalize()
            // fix walk direction
            this.walkDirection.negate()

            // run/walk velocity
            const velocity = this.currentAction == 'run' ? this.runVelocity : this.walkVelocity

            // udpate player rotation
            this.model.rotation.y -= direction.orientation * delta * 5

            // if player's forward raycast collide with environement, player can't move forward
            // rotation isn't blocked to not be stuck in collision
            if (!this.blocked) {
                this.model.translateZ(direction.move * delta * velocity)
            }

            // disable orbit control when player is in motion
            this.orbitControl.enableRotate = false
            this._updateCameraPosition()

            // run faster after 1.5s, like in Battlefield game eheh
            if (this.walkTimeOut > 1.5 && !this.toggleRun) {
                this.toggleRun = true
            }
        } else {
            // motionless, enable orbit control and reset run
            this.orbitControl.enableRotate = true
            this.walkTimeOut = 0
            this.toggleRun = false
        }

        this._updateCameraTarget()
        this._updateRaycast()
    }

    private _updateRaycast(): void {
        // copy model position to keep raycast's origin on player position
        this.raycaster.ray.origin.copy(this.model.position)
        // copy allow to modify y position, without copy, player fly away
        this.raycaster.ray.origin.y += 3
        this.raycaster.ray.direction = this.walkDirection.negate()
    }
 
    private _initCameraPosition(): void {
        this.camera.position.set(
            this.model.position.x - Math.sin(this.model.rotation.y),
            this.model.position.z - Math.cos(this.model.rotation.y),
            15
        )
    }

    private _updateCameraPosition(): void {
        // create smooth camera moves
        this.camera.position.x = Helpers.lerp(this.camera.position.x, this.model.position.x - Math.sin(this.model.rotation.y) * 25, 0.06)
        this.camera.position.z = Helpers.lerp(this.camera.position.z, this.model.position.z - Math.cos(this.model.rotation.y) * 25, 0.06)
        this.camera.position.y = Helpers.lerp(this.camera.position.y, 15, 0.03)
    }

    private _updateCameraTarget(): void {
        // update camera target
        this.cameraTarget.x = this.model.position.x
        this.cameraTarget.y = this.model.position.y + 10
        this.cameraTarget.z = this.model.position.z
        this.orbitControl.target = this.cameraTarget
    }

    private _directionOffset(): {
        move: number,
        orientation: number
    } {
        const direction = {
            move: 0,
            orientation: 0
        }

        // set move value for moving foward and orientation value for player rotation
        if (this._keysPressed[W]) {
            direction.move = 1
            if (this._keysPressed[A]) {
                direction.orientation = -Math.PI / 4 // w+a
            } else if (this._keysPressed[D]) {
                direction.orientation = Math.PI / 4 // w+d
            }
        } else if (this._keysPressed[A]) {
            direction.orientation = -Math.PI / 4 // a
        } else if (this._keysPressed[D]) {
            direction.orientation = Math.PI / 4 // d
        }
        return direction
    }
}