import { Mesh, Object3D, Vector3 } from "three"

export default class CameraConfig {
    public name: string
    public target: Object3D | Mesh | null = null
    private _relativePosition: Vector3
    public lookAt: Vector3 = new Vector3()
    public newCameraPosition: Vector3

    constructor(name: string, target: Object3D | Mesh | null, relativePosition: Vector3) {
        this.name = name
        this.target = target
        this._relativePosition = relativePosition
        this._init()
    }

    private _init() {
        this.target?.getWorldPosition(this.lookAt)
        // TODO : use vector add
        this.newCameraPosition = new Vector3(
            this.lookAt.x + this._relativePosition.x,
            this.lookAt.y + this._relativePosition.y,
            this.lookAt.z + this._relativePosition.z,
        )
    }

    public coords() {
        const lookAtPosition = new Vector3()
        this.target?.getWorldPosition(lookAtPosition)

        // TODO : use vector add
        const newCameraPosition = new Vector3(
            lookAtPosition.x + this._relativePosition.x,
            lookAtPosition.y + this._relativePosition.y,
            lookAtPosition.z + this._relativePosition.z,
        )

        return { newCameraPosition, lookAtPosition }
    }
}