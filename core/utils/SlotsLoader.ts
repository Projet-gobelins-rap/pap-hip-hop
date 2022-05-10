import { Group, Object3D, Mesh } from "three"

export default class SlotsLoader {
    private _scene:any
    public slots: Map<string, object>
    constructor(scene: any) {
        this._scene = scene
        this.slots = new Map()
    }
    public findSlots(scene: any) {
        this._scene.traverse(child => {
            if(child.name.includes('slot-') ) {
                this.slots.set(child.name, child)
            }
        })
    }

    // public appendInSlot(modelInstance: Object3D | Group | Mesh) {
    //     let selectedInstance = this.slots.get(modelInstance) 
    // }
}