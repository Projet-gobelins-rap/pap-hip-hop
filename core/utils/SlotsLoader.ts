import { Group, Object3D, Mesh } from "three"

export default class SlotsLoader {
    private _scene: any
    public slots: Map<string, object>
    // public populateSlots: () => void

    public static findSlots(scene: any) {
        // this._scene.traverse(child => {
        //     if(child.name.includes('slot-') ) {
        //         this.slots.set(child.name, child)
        //     }
        // })
    }

    public static populateSlots(slots: Object3D[], baseObject: Object3D | Group | Mesh) {
        slots.forEach(object => {
            // -Lead- : dispose ? remove ?
            object.children = []
            object.add(baseObject.clone())
        });
    }
}