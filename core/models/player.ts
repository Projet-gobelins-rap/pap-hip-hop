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
    toggleRun: boolean = true
    emote: boolean = false
    currentAction: string
    raycaster: Raycaster

    // temporary data
    walkDirection = new Vector3()
    rotateAngle = new Vector3(0, 1, 0)
    rotateQuarternion: Quaternion = new Quaternion()
    cameraTarget = new Vector3()
    blocked: Boolean = false

    // constants
    fadeDuration: number = 0.2
    runVelocity = 5
    walkVelocity = 2

    constructor(playerGltf: Object3D, name: string, currentAction: string, camera: Camera, control: OrbitControls) {
        super(playerGltf, name, currentAction)

        this.camera = camera
        this.orbitControl = control
    }

    public setParamsByName() {
        // super.setParamsByName()
        console.log("enfant");
        this.outfitParams = outfitsData.player

        Helpers.traverse(this.outfitParams, (key, value) => {
            if (typeof value == "object") {
                if (value.color) value.colorMap = getTextureColorSpec(value.color)
            }
        })

        this.loadOutfit()
    }

    public updateControls(delta: number, keysPressed: any) {
        this._displacements(keysPressed)
        super.update(delta)
    }

    private _displacements(keysPressed) {
        const directionPressed = DIRECTIONS.some(key => keysPressed[key] == true)

        // console.log(directionPressed);
        
        // TODO : actions
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
}