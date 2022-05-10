import { Character } from "./character";
import { A, D, DIRECTIONS, S, W } from '../utils/KeyDisplay'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Camera, Mesh, Object3D, Quaternion, Raycaster, Vector3 } from "three";

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

    constructor(model: Object3D, name: string, camera: Camera) {
       super(model, name)

       this.camera = camera
        this.orbitControl = new OrbitControls(this.camera, )
    }
}